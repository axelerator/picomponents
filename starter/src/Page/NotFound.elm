module Page.NotFound exposing (..)
import Layout exposing (layout)
import Browser exposing (Document)
import Html exposing (text)

type alias Model =
    ()

type alias Msg =
    ()

init : Model
init = ()

view : Model -> Document msg
view model = 
    layout Nothing [text "page not found"]
