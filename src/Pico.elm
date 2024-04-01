module Pico exposing
    ( includeFromCDN, Theme(..)
    , ColorScheme(..), Layout(..), main_, themeName, themes
    )

{-| Picomponents is a UI componentn library using [pico](https://picocss.com)


# Setup

@docs includeFromCDN, Theme

-}

import Html exposing (Html, node)
import Html.Attributes exposing (attribute, class, href, rel)


{-| The available [themes](https://picocss.com/docs/version-picker/)
-}
type Theme
    = Amber
    | Blue
    | Cyan
    | Fuchsia
    | Green
    | Grey
    | Indigo
    | Jade
    | Lime
    | Orange
    | Pink
    | Pumpkin
    | Purple
    | Red
    | Sand
    | Slate
    | Violet
    | Yellow
    | Zinc


{-| The available [themes](https://picocss.com/docs/version-picker/)
-}
themes : List Theme
themes =
    [ Amber
    , Blue
    , Cyan
    , Fuchsia
    , Green
    , Grey
    , Indigo
    , Jade
    , Lime
    , Orange
    , Pink
    , Pumpkin
    , Purple
    , Red
    , Sand
    , Slate
    , Violet
    , Yellow
    , Zinc
    ]


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


{-| Pico CSS comes with both Light and Dark color schemes, automatically enabled based on user preferences.
-}
type ColorScheme
    = Light
    | Dark
    | SystemScheme


main_ : Layout -> ColorScheme -> List (Html.Attribute msg) -> List (Html msg) -> Html msg
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
    in
    Html.main_
        attrs_
        children


cdnUrl : Theme -> String
cdnUrl theme =
    String.join ""
        [ "https://cdn.jsdelivr.net/npm/@picocss/pico@2/"
        , "css/pico."
        , themeName theme
        , ".min.css"
        ]


{-| The name of the theme
-}
themeName : Theme -> String
themeName theme =
    case theme of
        Amber ->
            "amber"

        Blue ->
            "blue"

        Cyan ->
            "cyan"

        Fuchsia ->
            "fuchsia"

        Green ->
            "green"

        Grey ->
            "grey"

        Indigo ->
            "indigo"

        Jade ->
            "jade"

        Lime ->
            "lime"

        Orange ->
            "orange"

        Pink ->
            "pink"

        Pumpkin ->
            "pumpkin"

        Purple ->
            "purple"

        Red ->
            "red"

        Sand ->
            "sand"

        Slate ->
            "slate"

        Violet ->
            "violet"

        Yellow ->
            "yellow"

        Zinc ->
            "zinc"
