module Pico.Form exposing (textInput, dropdown, integerInput, floatInput, dateInput, switch)
{-|
-}


import Html exposing (text)
import FancyForms.Form as Form exposing (Form, Variants, extract, field, form, render)
import FancyForms.FormState exposing (FormState, alwaysValid, withInnerAttributes)
import FancyForms.FormState exposing (Widget)
import Html.Attributes exposing (for)
import FancyForms.Widgets.Text as FancyForms 
import FancyForms.Widgets.Int as FancyForms 
import FancyForms.Widgets.Float as FancyForms 
import FancyForms.Widgets.Date as FancyForms 
import FancyForms.Widgets.Checkbox as FancyForms 
import FancyForms.Widgets.Dropdown as FancyForms 
import Pico exposing (invalid)
import Pico exposing (role)


{-| A text input with the given Html.label
-}
textInput labelText =
            FancyForms.textInput [] 
                |> withLabel labelText
                |> withInnerAttributes markAsInvalid

markAsInvalid errors _ = 
        if List.isEmpty errors then 
            [] 
        else 
            [invalid]

dropdown labelText variants =
    FancyForms.dropdown variants 
        |> withLabel labelText
        |> withInnerAttributes markAsInvalid

integerInput labelText =
    FancyForms.integerInput [] 
        |> withLabel labelText
        |> withInnerAttributes markAsInvalid

floatInput labelText attrs =
    FancyForms.floatInput attrs
        |> withLabel labelText
        |> withInnerAttributes markAsInvalid

dateInput labelText =
    FancyForms.dateInput []
        |> withLabel labelText
        |> withInnerAttributes markAsInvalid

switch labelText =
    FancyForms.checkbox
        |> withLabel labelText
        |> withInnerAttributes markAsInvalid
        |> withInnerAttributes (\_ _ -> [role "switch"])

contentWithLabel : String -> String -> List (Html.Html msg) -> List (Html.Html msg)
contentWithLabel labelText domId content =
    Html.label [ for domId ] [ text labelText ] :: content

withLabel :
    String
    -> Widget widgetModel msg value customError
    -> Widget widgetModel msg value customError
withLabel labelText wrapped =
    Form.wrap wrapped <| contentWithLabel labelText

