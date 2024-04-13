module Pico exposing
    ( includeFromCDN
    , main_, Layout(..), grid
    , abbr, bold, italic, emphasis, deleted, inserted, kbd, mark, strikethrough, superscript, subscript, underline
    , primaryButton, secondaryButton, contrastButton, busy, outline
    , primaryLink, secondaryLink, contrastLink, asButton
    , accordion
    , tooltip, tooltipRight, tooltipLeft, tooltipBottom
    , switch, invalid
    , role, br, aria, hr
    , Cell, Row, Column, nav, table, errorView, dropdown, rtl, ltr
    )

{-| Picomponents is a UI componentn library using [pico](https://picocss.com)


## Setup

@docs includeFromCDN


## Layout

@docs main_, Layout, grid


## Content


### Typography

@docs abbr, bold, italic, emphasis, deleted, inserted, kbd, mark, strikethrough, superscript, subscript, underline


### Buttons

@docs primaryButton, secondaryButton, contrastButton, busy, outline


### Links

@docs primaryLink, secondaryLink, contrastLink, asButton

### Tables

@docs Row, Cell, table

### Components

@docs accordion, dropdown, nav, Column


### Tooltips

@docs tooltip, tooltipRight, tooltipLeft, tooltipBottom


### Inputs

@docs switch, invalid


# Utilities

@docs role, br, hr, aria, errorView, rtl, ltr

-}

import Html exposing (Attribute, Html, a, button, input, label, node, tbody, td, text, th, thead, tr)
import Html.Attributes exposing (attribute, class, href, rel, title, type_)
import Pico.Theme exposing (ColorScheme(..), Theme(..), themeName, themes)
import Html exposing (ul)
import Html exposing (li)
import FancyForms.FormState exposing (Error)
import Html exposing (small)


{-| Include the CSS for the given theme.
-}
includeFromCDN : Theme -> Html.Html msg
includeFromCDN theme =
    node "link" [ rel "stylesheet", href (cdnUrl theme) ] []


{-| Used to define the layout of the application
-}
type Layout
    = Centered
    | FullWidth


layoutClass : Layout -> String
layoutClass layout =
    case layout of
        Centered ->
            "container"

        FullWidth ->
            "container-fluid"


{-| The [main layout container](https://picocss.com/docs/container) of the application
-}
main_ : Layout -> ColorScheme -> List (Attribute msg) -> List (Html msg) -> Html msg
main_ layout colorScheme attrs children =
    let
        schemeClass =
            case colorScheme of
                Light ->
                    [ attribute "data-theme" "light" ]

                Dark ->
                    [ attribute "data-theme" "dark" ]

                SystemScheme ->
                    []

        attrs_ =
            List.concat
                [ [ class <| layoutClass layout ]
                , schemeClass
                , attrs
                ]

        themeAttribute =
            attribute "data-attribute" "data-theme"

        webComponent =
            node "pico-class-updater"
                (themeAttribute
                    :: (case colorScheme of
                            Light ->
                                [ attribute "data-value" "light" ]

                            Dark ->
                                [ attribute "data-value" "dark" ]

                            SystemScheme ->
                                []
                       )
                )
                []
    in
    Html.main_
        attrs_
        (webComponent :: children)


cdnUrl : Theme -> String
cdnUrl theme =
    String.join ""
        [ "https://cdn.jsdelivr.net/npm/@picocss/pico@2/"
        , "css/pico."
        , String.toLower <| themeName theme
        , ".min.css"
        ]


elemWithClass : (List (Attribute msg) -> List (Html msg) -> Html msg) -> String -> List (Attribute msg) -> List (Html msg) -> Html msg
elemWithClass node className attrs =
    node (class className :: attrs)


{-| Renders a [primary button](https://picocss.com/docs/button)
-}
primaryButton : List (Attribute msg) -> List (Html msg) -> Html msg
primaryButton =
    elemWithClass button "primary"


{-| Renders a [secondary button](https://picocss.com/docs/button)
-}
secondaryButton : List (Attribute msg) -> List (Html msg) -> Html msg
secondaryButton attrs =
    elemWithClass button "secondary" attrs


{-| Renders a [contrast button](https://picocss.com/docs/button)
-}
contrastButton : List (Attribute msg) -> List (Html msg) -> Html msg
contrastButton attrs =
    elemWithClass button "contrast" attrs


{-| Render this button in the "outline" style
-}
outline : Attribute msg
outline =
    class "outline"


{-| Add a [loading indicator](https://picocss.com/docs/loading) to an element
-}
busy : Attribute msg
busy =
    attribute "aria-busy" "true"


{-| Give an element (for example a link) the look of a button
a [asButton][text "Click me!"]
-}
asButton : Attribute msg
asButton =
    role "button"


{-| "role" attribute
-}
role : String -> Attribute msg
role kind =
    attribute "role" kind


{-| A checkbox rendered as a [switch](https://picocss.com/docs/forms/switch)
-}
switch : List (Attribute msg) -> List (Html msg) -> Html msg
switch attrs lbl =
    label []
        (input (role "switch" :: type_ "checkbox" :: attrs) []
            :: lbl
        )


{-| Renders a [primary link](https://picocss.com/docs/link)
-}
primaryLink : List (Attribute msg) -> List (Html msg) -> Html msg
primaryLink =
    elemWithClass a "primary"


{-| Renders a [secondary link](https://picocss.com/docs/link)
-}
secondaryLink : List (Attribute msg) -> List (Html msg) -> Html msg
secondaryLink attrs =
    elemWithClass a "secondary" attrs


{-| Renders a [contrast link](https://picocss.com/docs/link)
-}
contrastLink : List (Attribute msg) -> List (Html msg) -> Html msg
contrastLink attrs =
    elemWithClass a "contrast" attrs


inlineText : (List (Attribute msg) -> List (Html msg) -> Html msg) -> String -> Html msg
inlineText elem s =
    elem [] [ text s ]


{-| Abbreviation element
The first argument is the abbreviation and the second is the meaning.

    abbr "tldr" "too long didn't  read"

-}
abbr : String -> String -> Html msg
abbr abr meaning =
    Html.abbr [ title meaning ] [ text abr ]


{-| Bold element
-}
bold : String -> Html msg
bold =
    inlineText Html.b


{-| Italic element
-}
italic : String -> Html msg
italic =
    inlineText Html.i


{-| Emphasis element
-}
emphasis : String -> Html msg
emphasis =
    inlineText Html.em


{-| Deleted element
-}
deleted : String -> Html msg
deleted =
    inlineText Html.del


{-| Inserted element
-}
inserted : String -> Html msg
inserted =
    inlineText Html.ins


{-| Keyboard shortcut element
-}
kbd : String -> Html msg
kbd =
    inlineText Html.kbd


{-| Mark element
-}
mark : String -> Html msg
mark =
    inlineText Html.mark


{-| Strikethrough element
-}
strikethrough : String -> Html msg
strikethrough =
    inlineText <| Html.node "strikethrough"


{-| Subscript element
-}
subscript : String -> Html msg
subscript =
    inlineText Html.sub


{-| Superscript element
-}
superscript : String -> Html msg
superscript =
    inlineText Html.sup


{-| Underline element
-}
underline : String -> Html msg
underline =
    inlineText Html.u


{-| A shortcut for `br [] []`
-}
br : Html msg
br =
    Html.br [] []

{-| A shortcut for `hr [] []`
-}
hr : Html msg
hr =
    Html.hr [] []


{-| A shortcut for `attribute "aria-" ++ name` value
-}
aria : String -> String -> Attribute msg
aria name value =
    attribute ("aria-" ++ name) value


{-| Creates a [simple responseive grid](https://picocss.com/docs/grid)
with the given class name.
-}
grid : String -> Row msg -> Html msg
grid className cols =
    Html.div
        [ class "grid", class className ]
    <|
        List.map (Html.div []) cols


{-| A shortcut for `attribute "aria-invalid" "true"`
-}
invalid : Attribute msg
invalid =
    attribute "aria-invalid" "true"


{-| Renders an [accordion](https://picocss.com/docs/accordion).

    accordion [ asButton ] [ text "open me" ] [ text "the glorious details" ]

-}
accordion : List (Attribute msg) -> List (Html msg) -> List (Html msg) -> Html msg
accordion attrs sum content =
    Html.details [] <|
        Html.summary attrs sum
            :: content


{-| Adds a tooltip displaying on top of the element.
-}
tooltip : String -> Attribute msg
tooltip =
    attribute "data-tooltip"


{-| Adds a tooltip displaying to the right of the element.
-}
tooltipRight : String -> List (Attribute msg)
tooltipRight c =
    [ attribute "data-tooltip" c, attribute "data-placement" "right" ]


{-| Adds a tooltip displaying to the left of the element.
-}
tooltipLeft : String -> List (Attribute msg)
tooltipLeft c =
    [ attribute "data-tooltip" c, attribute "data-placement" "left" ]


{-| Adds a tooltip displaying at the bottom of the element.
-}
tooltipBottom : String -> List (Attribute msg)
tooltipBottom c =
    [ attribute "data-tooltip" c, attribute "data-placement" "bottom" ]


{-| A (table) cell can contain multiple Html elements.
    This is just an alias to make the type signature of
    functions that can receive it more readable.
-} 
type alias Cell msg =
    List (Html msg)

{-| A (table) row can contain multiple cells that 
    can contain multiple Html elements.
    This is just an alias to make the type signature of
    functions that can receive it more readable.
-}
type alias Row msg =
    List (Cell msg)


mkTr : List (Cell msg) -> Html msg
mkTr cells =
    tr [] <|
        List.map (\c -> td [] c) cells

{-| A helper to construct a table in a more concise way.
  It takes the attributes for the table, the header row and
  the list of rows.
-}
table : List (Attribute msg) -> Row msg -> List (Row msg) -> Html msg
table attrs header rows =
    Html.table attrs
        [ thead [] [ tr [] <| List.map (\h -> th [] h) header ]
        , tbody [] <| List.map mkTr rows
        ]

{-| A grid column can contain multiple cells that
    can contain multiple Html elements.
    This is just an alias to make the type signature of
    functions that can receive `Columns` more readable.
-}
type alias Column msg =
    List (Cell msg)

mkColumn : Column msg -> Html msg
mkColumn columns =
    ul [] <|
        List.map (\c -> li [] c) columns

{-| A helper to construct a `nav` element in a more concise way.
    In [Pico.css](https://picocss.com/docs/nav) the `nav` element
    is laid out as a list of columns.
-}
nav : List (Column msg) -> Html msg
nav columns =
    Html.nav [] 
        <| List.map mkColumn columns


{-| Displays errors next to an input field.
-}
errorView : (Error error -> String) -> List (Error error) -> List (Html msg) -> List (Html msg)
errorView errorToString errors input =
    input ++ [ small [] [ text <| String.join " " <| List.map errorToString errors ] ]

mkLi : Cell msg -> Html msg
mkLi cell =
    li [] cell

{-| Pico uses the [details element](https://picocss.com/docs/dropdown) as markdown for a dropdown.
This function lets you create a dropdown from the "collapsed" content and a multiple items to display in the expanded state.
-}
dropdown : Cell msg -> Column msg -> Html msg
dropdown summaryContent dropdownRows =
    Html.details 
        [ class "dropdown" ]
        [ Html.summary [] summaryContent
        , ul [] <| List.map mkLi dropdownRows
        ]

{-| A shortcut for dir="rtl" to set the text direction to right-to-left.
-}
rtl : Attribute msg
rtl =
    attribute "dir" "rtl"

{-| A shortcut for dir="ltr" to set the text direction to left-to-right.
-}
ltr : Attribute msg
ltr =
    attribute "dir" "ltr"
