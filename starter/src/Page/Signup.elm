module Page.Signup exposing (..)

import Api exposing (AuthResponse)
import Browser exposing (Document)
import FancyForms.Form as Form exposing (Form, extract, field, render, validate)
import FancyForms.FormState exposing (Error(..), FormState, Validator, withInnerAttributes)
import FancyForms.Widgets.Text exposing (notBlank)
import Form exposing (FormError(..), errorToString, form)
import Html exposing (Html, article, fieldset, small, text)
import Html.Attributes exposing (autocomplete, disabled, type_)
import Html.Events exposing (onSubmit)
import Layout exposing (layout)
import Markdown
import Pico exposing (Layout(..), aria, busy, grid, primaryButton)
import Pico.Form


type alias Model =
    { formState : FormState
    , submission : Submission
    }


type Msg
    = ForForm Form.Msg
    | Submit
    | SignupSuccess AuthResponse
    | SignupError String


type Submission
    = WaitingForInput
    | RequestPending
    | Failed String


init : Model
init =
    { formState =
        Form.init signUpForm
            { username = ""
            , password = ""
            , passwordConfirm = ""
            }
    , submission = WaitingForInput
    }


viewForm : Model -> Html Msg
viewForm { formState, submission } =
    let
        submitButtonAttrs =
            case ( submission, Form.isValid signUpForm formState ) of
                ( WaitingForInput, True ) ->
                    [ type_ "submit" ]

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
    [ fieldset invalidAttr <| render ForForm signUpForm formState
    , errorsView
    , primaryButton submitButtonAttrs [ text "Sign Up" ]
    ]
        |> Html.form [ onSubmit Submit ]


view : Model -> Document Msg
view model =
    [ grid ""
        [ [ article [] [ signupMd ] ]
        , [ viewForm model ]
        ]
    ]
        |> layout Nothing


signupMd : Html Msg
signupMd =
    Markdown.toHtml [] """
# Signup

The signup page uses a mock API call.let
If you submit the form with the username `taken` you will get an error `Username already taken`.
"""


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        ForForm formMsg ->
            ( { model | formState = Form.update signUpForm formMsg model.formState }
            , Cmd.none
            )

        Submit ->
            let
                { username, password } =
                    extract signUpForm model.formState
            in
            ( { model | submission = RequestPending }
            , Api.signup SignupSuccess SignupError { username = username, password = password }
            )

        SignupSuccess _ ->
            ( { model | submission = WaitingForInput }
            , Cmd.none
            )

        SignupError e ->
            ( { model | submission = Failed e }
            , Cmd.none
            )


type alias Signup =
    { username : String
    , password : String
    , passwordConfirm : String
    }


passwordsMustMatch : Validator Signup FormError
passwordsMustMatch { password, passwordConfirm } =
    if password == passwordConfirm || passwordConfirm == "" then
        []

    else
        [ CustomError ConfirmationMustMatch ]


signUpForm : Form Signup FormError
signUpForm =
    form
        passwordsMustMatch
        "signup-form"
        (\username password passwordConfirm ->
            { view =
                \formState errors ->
                    List.concat <|
                        [ username.view formState
                        , password.view formState
                        , passwordConfirm.view formState
                        , viewFormErrors errors
                        ]
            , combine =
                \formState ->
                    { username = username.value formState
                    , password = password.value formState
                    , passwordConfirm = passwordConfirm.value formState
                    }
            }
        )
        |> field .username (Pico.Form.textInput "username" |> validate [ notBlank ])
        |> field .password (Pico.Form.textInput "password" |> validate [ notBlank ] |> withInnerAttributes passwordFieldAttrs)
        |> field .passwordConfirm (Pico.Form.textInput "password confirmation" |> validate [ notBlank ] |> withInnerAttributes passwordFieldAttrs)


passwordFieldAttrs : a -> b -> List (Html.Attribute msg)
passwordFieldAttrs _ _ =
    [ type_ "password", autocomplete False ]


viewFormErrors : List (Error FormError) -> List (Html msg)
viewFormErrors errors =
    List.map (\e -> small [] [ text (errorToString e) ]) errors
