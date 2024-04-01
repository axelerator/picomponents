module Pico exposing (includeFromCDN, Theme(..), main_, ColorScheme(..), Layout(..))

{-| Picomponents is a UI componentn library using [pico](https://picocss.com)


# Setup

@docs includeFromCDN, Theme

-}

import Html exposing (node)
import Html.Attributes exposing (href, rel)
import Html exposing (Html)
import Html.Attributes exposing (class)


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


{-| Include the CSS for the given theme.
-}
includeFromCDN : Theme -> Html.Html msg
includeFromCDN theme =
    node "link" [ rel "stylesheet", href (cdnUrl theme) ] []

{-| Used to define the layout of the application
-}

type Layout = Centered | FullWidth

layoutClass : Layout -> String
layoutClass layout =
    case layout of
        Centered ->
            "container"

        FullWidth ->
            "container-fluid"

{-| Pico CSS comes with both Light and Dark color schemes, automatically enabled based on user preferences.
-}
type ColorScheme = Light | Dark | SystemScheme



main_ : Layout -> ColorScheme -> List (Html.Attribute msg) -> List (Html msg) -> Html msg
main_ layout colorScheme attrs children =
  let
      schemeClass =
        case colorScheme of
            Light ->
                ["light"]

            Dark ->
                ["dark"]

            SystemScheme ->
                []
      classes =
        ((layoutClass layout) :: schemeClass)
        |> String.join " " 
        |> class

  in

    Html.main_
      (classes :: attrs)
      children


cdnUrl : Theme -> String
cdnUrl theme =
    String.join ""
        [ "https://cdn.jsdelivr.net/npm/@picocss/pico@2/"
        , "css/pico."
        , themeName theme
        , ".min.css"
        ]


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
