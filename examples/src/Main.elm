module Main exposing (main)

import Browser
import Html exposing (Html, button, div, h1, text)
import Html.Events exposing (onClick)
import Pico exposing (Theme(..), includeFromCDN, main_, Layout(..), ColorScheme(..))


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
    , mainArgs : MainArgs
    }


init : () -> ( Model, Cmd Msg )
init _ =
    ( { count = 0 
      , mainArgs = initMainArgs
    }
    , Cmd.none
    )


type Msg
    = Increment


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        Increment ->
            ( { model | count = model.count + 1 }
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
view {mainArgs} =
    main_ mainArgs.layout mainArgs.colorScheme []
        [ includeFromCDN mainArgs.theme 
        ]

