module Pico.Form exposing (textInput, dropdown, integerInput, floatInput, dateInput, switch)

{-| This module provides [FancyForm](https://blog.axelerator.de/fancy-forms/) widgets that allow
you to build forms that use the markup of the [pico](https://picocss.com) CSS framework.


## Widgets

@docs textInput, dropdown, integerInput, floatInput, dateInput, switch

-}

import FancyForms.Form as Form
import FancyForms.FormState exposing (Widget, withInnerAttributes)
import FancyForms.Widgets.Checkbox as Checkbox
import FancyForms.Widgets.Date as Date
import FancyForms.Widgets.Dropdown as Dropdown
import FancyForms.Widgets.Float as Float
import FancyForms.Widgets.Int as Int
import FancyForms.Widgets.Text as Text
import Html exposing (text)
import Html.Attributes exposing (for)
import Pico exposing (invalid, role)
import FancyForms.Widgets.Dropdown exposing (SelectWidget)


{-| A `String` input with the given label
-}
textInput : String -> Text.TextInput customError
textInput labelText =
    Text.textInput []
        |> withLabel labelText
        |> withInnerAttributes markAsInvalid


markAsInvalid errors _ =
    if List.isEmpty errors then
        []

    else
        [ invalid ]


{-| A `Select` widget with the given label
-}
dropdown : String -> Form.Variants b -> SelectWidget b customError
dropdown labelText variants =
    Dropdown.dropdown variants
        |> withLabel labelText
        |> withInnerAttributes markAsInvalid


{-| An `Integer` input with the given label
-}
integerInput : String -> Int.IntInput customError
integerInput labelText =
    Int.integerInput []
        |> withLabel labelText
        |> withInnerAttributes markAsInvalid


{-| A `Float` input with the given labelText and attributes
-}
floatInput : String -> List (Html.Attribute Float.Msg) -> Float.FloatInput customError
floatInput labelText attrs =
    Float.floatInput attrs
        |> withLabel labelText
        |> withInnerAttributes markAsInvalid


{-| A `Date` input with the given label
-}
dateInput : String -> Date.DateInput customError
dateInput labelText =
    Date.dateInput []
        |> withLabel labelText
        |> withInnerAttributes markAsInvalid


{-| A `Checkbox` but styled as a [switch](https://picocss.com/docs/forms/switch)
-}
switch : String -> Checkbox.BoolInput customError
switch labelText =
    Checkbox.checkbox
        |> withLabel labelText
        |> withInnerAttributes markAsInvalid
        |> withInnerAttributes (\_ _ -> [ role "switch" ])


contentWithLabel : String -> String -> List (Html.Html msg) -> List (Html.Html msg)
contentWithLabel labelText domId content =
    Html.label [ for domId ] [ text labelText ] :: content


withLabel :
    String
    -> Widget widgetModel msg value customError
    -> Widget widgetModel msg value customError
withLabel labelText wrapped =
    Form.wrap wrapped <| contentWithLabel labelText
