module Page.Login exposing (Model, Msg(..), init, rememberMeSelected, update, view)

import Api exposing (AuthResponse, Login)
import Browser exposing (Document)
import FancyForms.Form as Form exposing (Form, field, render, validate)
import FancyForms.FormState exposing (Error(..), FormState, alwaysValid, withInnerAttributes)
import FancyForms.Widgets.Text exposing (notBlank)
import Form exposing (FormError, form)
import Html exposing (article, fieldset, small, text)
import Html.Attributes exposing (autocomplete, disabled, type_)
import Html.Events exposing (onClick, onSubmit)
import Layout exposing (layout)
import Markdown
import Pico exposing (Layout(..), aria, busy, grid, primaryButton)
import Pico.Form
import Pico.Theme exposing (ColorScheme(..))


type alias Model =
    { loginFormState : FormState
    , submission : Submission
    }


type Submission
    = WaitingForInput
    | RequestPending
    | Failed String


type Msg
    = ForForm Form.Msg
    | Submit
    | LoginSuccess AuthResponse
    | LoginError String


init : Model
init =
    { loginFormState = Form.init loginForm { username = "", password = "", rememberMe = False }
    , submission = WaitingForInput
    }


rememberMeSelected : Model -> Bool
rememberMeSelected model =
    Form.extract loginForm model.loginFormState
        |> .rememberMe


view : Model -> Document Msg
view { loginFormState, submission } =
    let
        submitButtonAttrs =
            case ( submission, Form.isValid loginForm loginFormState ) of
                ( WaitingForInput, True ) ->
                    [ onClick Submit, type_ "submit" ]

                ( WaitingForInput, False ) ->
                    [ disabled True, type_ "submit" ]

                ( RequestPending, _ ) ->
                    [ busy, type_ "submit" ]

                ( Failed _, _ ) ->
                    [ type_ "submit" ]

        ( errorsView, invalidAttr ) =
            case submission of
                Failed e ->
                    ( small [] [ text e ]
                    , [ aria "invalid" "true" ]
                    )

                _ ->
                    ( text ""
                    , []
                    )
    in
    [ grid ""
        [ [ article [] [ loginMd ] ]
        , [ Html.form
                [ onSubmit Submit ]
                [ fieldset invalidAttr <| render ForForm loginForm loginFormState
                , errorsView
                , primaryButton submitButtonAttrs [ text "Log in" ]
                ]
          ]
        ]
    ]
        |> layout Nothing


loginMd : Html.Html msg
loginMd =
    Markdown.toHtml [] """
# Login

The login uses a mock API that will succeed if the username and password are the same
and return an error otherwise.
"""


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        ForForm formMsg ->
            ( { model
                | loginFormState = Form.update loginForm formMsg model.loginFormState
                , submission = WaitingForInput
              }
            , Cmd.none
            )

        Submit ->
            ( { model | submission = RequestPending }
            , Form.extract loginForm model.loginFormState
                |> Api.login LoginSuccess LoginError
            )

        LoginSuccess _ ->
            ( model
            , Cmd.none
            )

        LoginError error ->
            ( { model | submission = Failed error }
            , Cmd.none
            )


loginForm : Form Login FormError
loginForm =
    form
        alwaysValid
        "example-form"
        (\username password rememberMe ->
            { view =
                \formState _ ->
                    List.concat <|
                        [ username.view formState
                        , password.view formState
                        , rememberMe.view formState
                        ]
            , combine =
                \formState ->
                    { username = username.value formState
                    , password = password.value formState
                    , rememberMe = rememberMe.value formState
                    }
            }
        )
        |> field .username (Pico.Form.textInput "username" |> validate [ notBlank ])
        |> field .password (Pico.Form.textInput "password" |> validate [ notBlank ] |> withInnerAttributes passwordFieldAttrs)
        |> field .rememberMe (Pico.Form.switch "Remember me")


passwordFieldAttrs : a -> b -> List (Html.Attribute msg)
passwordFieldAttrs _ _ =
    [ type_ "password", autocomplete False ]
