module Form exposing (FormError(..), errorToString, errorView, form)

import FancyForms.Form
import FancyForms.FormState exposing (Error(..))
import Html exposing (Html)
import Pico



form : (FancyForms.FormState.Validator data FormError) -> FancyForms.FormState.DomId -> a -> FancyForms.Form.PartialForm a FormError data
form =
    FancyForms.Form.form errorView


type FormError
    = ConfirmationMustMatch



{- Helper function to display form errors of our cutom error type -}


errorView : List (Error FormError) -> List (Html msg) -> List (Html msg)
errorView =
    Pico.errorView errorToString



{- we need to supply a functino to convert errors into human readable strings -}


errorToString : Error FormError -> String
errorToString e =
    case e of
        NotValid ->
            ""

        MustBeGreaterThan x ->
            "Must be greater than " ++ x

        MustBeLesserThan x ->
            "Must be lesser than " ++ x

        MustNotBeBlank ->
            "Please enter a value"

        CustomError ce ->
            case ce of
                ConfirmationMustMatch ->
                    "Passwords do not match"
