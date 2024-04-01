module Main exposing (main)

import Browser
import FancyForms.Form as Form exposing (Form, Variants, extract, field, form, render)
import FancyForms.FormState exposing (FormState, alwaysValid)
import FancyForms.Widgets.Dropdown exposing (dropdown)
import Html exposing (Html, button, div, h1, text)
import Html.Events exposing (onClick)
import Pico exposing (ColorScheme(..), Layout(..), Theme(..), includeFromCDN, main_, themeName, themes)


main : Program () Model Msg
main =
    Browser.element
        { init = init
        , update = update
        , subscriptions = subscriptions
        , view = view
        }


type alias Model =
    { count : Int
    , mainArgs : FormState
    }


init : () -> ( Model, Cmd Msg )
init _ =
    ( { count = 0
      , mainArgs = Form.init mainArgsForm initMainArgs
      }
    , Cmd.none
    )


type alias MyError =
    ()


mainArgsForm : Form MainArgs MyError
mainArgsForm =
    form "mainargs"
        alwaysValid
        -- no custom validations
        (\errors_ html -> html)
        -- omitting errors for brevity
        (\layout colorScheme theme ->
            { view =
                \formState _ ->
                    List.concat
                        [ layout.view formState
                        , colorScheme.view formState
                        , theme.view formState
                        ]
            , combine =
                \formState ->
                    { layout = layout.value formState
                    , colorScheme = colorScheme.value formState
                    , theme = theme.value formState
                    }
            }
        )
        |> field .layout (dropdown layoutVariants)
        |> field .colorScheme (dropdown colorSchemeVariants)
        |> field .theme (dropdown themeVariants)


layoutVariants : Variants Layout
layoutVariants =
    ( { value = Pico.Centered
      , id = "centered"
      , label = "Centered"
      }
    , [ { value = Pico.FullWidth
        , id = "full"
        , label = "FullWidth"
        }
      ]
    )


colorSchemeVariants : Variants ColorScheme
colorSchemeVariants =
    ( { value = Pico.SystemScheme
      , id = "system"
      , label = "System"
      }
    , [ { value = Pico.Light
        , id = "light"
        , label = "Light"
        }
      , { value = Pico.Dark
        , id = "dark"
        , label = "Dark"
        }
      ]
    )


themeVariants : Variants Theme
themeVariants =
    let
        mkVariant theme =
            { value = theme
            , id = themeName theme
            , label = themeName theme
            }
    in
    ( mkVariant Pico.Amber
    , List.map mkVariant <| List.drop 1 Pico.themes
    )


type Msg
    = ForForm Form.Msg


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        ForForm fMsg ->
            ( { model | mainArgs = Form.update mainArgsForm fMsg model.mainArgs }
            , Cmd.none
            )


subscriptions : Model -> Sub Msg
subscriptions _ =
    Sub.none


type alias MainArgs =
    { layout : Layout
    , theme : Theme
    , colorScheme : ColorScheme
    }


initMainArgs : MainArgs
initMainArgs =
    { layout = Centered
    , theme = Amber
    , colorScheme = SystemScheme
    }


view : Model -> Html Msg
view { mainArgs } =
    let
        { layout, colorScheme, theme } =
            extract mainArgsForm mainArgs
    in
    main_ layout
        colorScheme
        []
        (includeFromCDN theme
            :: render ForForm mainArgsForm mainArgs
        )
