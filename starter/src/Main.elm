port module Main exposing (main)

import Browser exposing (Document)
import Browser.Navigation as Nav exposing (Key)
import FancyForms.FormState exposing (Error(..), FieldStatus(..))
import Html
import JSCommand exposing (JSCommand(..), emptyFlags, flagsDecoder)
import Json.Decode as D
import Json.Encode exposing (Value)
import Page.Home as Home
import Page.Landing as Landing
import Page.Login as Login
import Page.NotFound as NotFound
import Page.Preferences as Preferences
import Page.Signup as Signup
import Pico
    exposing
        ( Layout(..)
        )
import Pico.Theme exposing (ColorScheme(..), Theme(..))
import Route exposing (Route)
import Session exposing (Preferences, Session)
import Url exposing (Url)


{-| We use localStorage to store the user's preferences
and remember that the user has logged in.
-}
port sendToJs : ( String, Value ) -> Cmd msg


type PageModel
    = OnLanding Landing.Model
    | OnLogin Login.Model
    | OnNotFound NotFound.Model
    | OnHome Home.Model
    | OnSignup Signup.Model
    | OnPreferences Preferences.Model


type alias Model =
    { pageModel : PageModel
    , key : Key
    , session : Maybe Session
    }


type Msg
    = ChangedUrl Url
    | ClickedLink Browser.UrlRequest
    | ForLanding Landing.Msg
    | ForLogin Login.Msg
    | ForNotFound NotFound.Msg
    | ForHome Home.Msg
    | ForSignup Signup.Msg
    | ForPreferences Preferences.Msg


main : Program Value Model Msg
main =
    Browser.application
        { init = init
        , view = view
        , update = update
        , subscriptions = \_ -> Sub.none
        , onUrlRequest = ClickedLink
        , onUrlChange = ChangedUrl
        }


init : Value -> Url -> Key -> ( Model, Cmd Msg )
init flagsValue url key =
    { pageModel = OnLanding Landing.init
    , key = key
    , session =
        D.decodeValue flagsDecoder flagsValue
            |> Result.withDefault emptyFlags
            |> JSCommand.toSession
    }
        |> changeRouteTo (Route.fromUrl url)


view : Model -> Document Msg
view ({ session } as model) =
    case model.pageModel of
        OnLanding m ->
            Landing.view session m
                |> documentMap ForLanding

        OnLogin m ->
            Login.view m
                |> documentMap ForLogin

        OnSignup m ->
            Signup.view m
                |> documentMap ForSignup

        OnNotFound m ->
            NotFound.view m
                |> documentMap ForNotFound

        OnHome m ->
            Home.view session m
                |> documentMap ForHome

        OnPreferences m ->
            Preferences.view session m
                |> documentMap ForPreferences


documentMap : (msg -> Msg) -> Document msg -> Document Msg
documentMap toMsg { title, body } =
    { title = title
    , body = List.map (Html.map toMsg) body
    }


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    let
        forMain toModel toMsg ( subModel, cmd ) =
            ( { model | pageModel = toModel subModel }
            , Cmd.map toMsg cmd
            )
    in
    case ( msg, model.pageModel ) of
        ( ClickedLink urlRequest, _ ) ->
            case urlRequest of
                Browser.Internal url ->
                    ( model
                    , Nav.pushUrl model.key (Url.toString url)
                    )

                Browser.External href ->
                    ( model
                    , Nav.load href
                    )

        ( ChangedUrl url, _ ) ->
            changeRouteTo (Route.fromUrl url) model

        ( ForLanding subMsg, OnLanding subModel ) ->
            Landing.update subMsg subModel
                |> forMain OnLanding ForLanding

        ( ForLogin (Login.LoginSuccess authResponse), OnLogin subModel ) ->
            Login.rememberMeSelected subModel
                |> login model authResponse

        ( ForLogin subMsg, OnLogin subModel ) ->
            Login.update subMsg subModel
                |> forMain OnLogin ForLogin

        ( ForSignup (Signup.SignupSuccess authResponse), _ ) ->
            login model authResponse False

        ( ForSignup subMsg, OnSignup subModel ) ->
            Signup.update subMsg subModel
                |> forMain OnSignup ForSignup

        ( ForPreferences subMsg, OnPreferences subModel ) ->
            let
                ( model_, updatedPreferences ) =
                    Preferences.update subMsg subModel

                ( session, cmd ) =
                    case model.session of
                        Just oldSession ->
                            if oldSession.preferences == updatedPreferences then
                                ( model.session, Cmd.none )

                            else
                                ( Just <| { oldSession | preferences = updatedPreferences }
                                , StorePreferences updatedPreferences
                                    |> JSCommand.encode
                                    |> sendToJs
                                )

                        Nothing ->
                            ( Nothing, Cmd.none )
            in
            ( { model
                | pageModel = OnPreferences model_
                , session = session
              }
            , cmd
            )

        _ ->
            ( model, Cmd.none )


changeRouteTo : Maybe Route -> Model -> ( Model, Cmd Msg )
changeRouteTo maybeRoute model =
    case ( maybeRoute, model.session ) of
        ( Nothing, _ ) ->
            ( { model | pageModel = OnNotFound <| NotFound.init }
            , Cmd.none
            )

        ( Just Route.Landing, _ ) ->
            ( { model | pageModel = OnLanding <| Landing.init }
            , Cmd.none
            )

        ( Just Route.Login, _ ) ->
            ( { model
                | pageModel = OnLogin Login.init
                , session = Nothing
              }
            , Cmd.none
            )

        ( Just Route.Signup, _ ) ->
            ( { model | pageModel = OnSignup Signup.init }
            , Cmd.none
            )

        ( Just Route.Logout, _ ) ->
            ( { model
                | pageModel = OnLanding Landing.init
                , session = Nothing
              }
            , RemoveRememberMe
                |> JSCommand.encode
                |> sendToJs
            )

        ( Just Route.Home, Just _ ) ->
            ( { model | pageModel = OnHome <| Home.init }
            , Cmd.none
            )

        ( Just Route.Preferences, Just session ) ->
            ( { model | pageModel = OnPreferences <| Preferences.init session }
            , Cmd.none
            )

        _ ->
            ( model
            , Nav.pushUrl model.key <| Route.routeToString Route.Login
            )


login model authResponse shouldRememberMe =
    let
        model_ =
            { model
                | pageModel = OnLogin Login.init
                , session = Just <| Session.init authResponse
            }

        storeRememberMe =
            StoreRememberMe authResponse
                |> JSCommand.encode
                |> sendToJs

        andStoreRememberMe =
            if shouldRememberMe then
                \( m, c ) -> ( m, Cmd.batch [ c, storeRememberMe ] )

            else
                identity

        andSetUrlToHome ( m, c ) =
            ( m
            , Cmd.batch [ c, Nav.pushUrl model.key <| Route.routeToString Route.Home ]
            )
    in
    changeRouteTo (Just Route.Home) model_
        |> andStoreRememberMe
        |> andSetUrlToHome
