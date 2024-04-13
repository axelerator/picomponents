module Pico.Theme exposing (Theme(..), themes, ColorScheme(..), themeName)
{-| Provides access to [Themes](https://picocss.com/docs/version-picker)
    and [Color Schemes](https://picocss.com/docs/color-schemes)

@docs ColorScheme, Theme, themes, themeName
-}


{-| Pico CSS comes with both Light and Dark color schemes, automatically enabled based on user preferences.
-}
type ColorScheme
    = Light
    | Dark
    | SystemScheme

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


{-| The name of the theme
-}
themeName : Theme -> String
themeName theme =
    case theme of
        Amber ->
            "Amber"

        Blue ->
            "Blue"

        Cyan ->
            "Cyan"

        Fuchsia ->
            "Fuchsia"

        Green ->
            "Green"

        Grey ->
            "Grey"

        Indigo ->
            "Indigo"

        Jade ->
            "Jade"

        Lime ->
            "Lime"

        Orange ->
            "Orange"

        Pink ->
            "Pink"

        Pumpkin ->
            "Pumpkin"

        Purple ->
            "Purple"

        Red ->
            "Red"

        Sand ->
            "Sand"

        Slate ->
            "Slate"

        Violet ->
            "Violet"

        Yellow ->
            "Yellow"

        Zinc ->
            "Zinc"
