module Page.Home exposing (..)

import Browser exposing (Document)
import Html exposing (article)
import Layout exposing (layout)
import Markdown
import Session exposing (Session)


type alias Model =
    ()


type alias Msg =
    ()


init : Model
init =
    ()


view : Maybe Session -> Model -> Document msg
view session _ =
    [ article [] [ homeMd ] ]
        |> layout session


homeMd : Html.Html msg
homeMd =
    Markdown.toHtml [] """
# Home

This is the home page for logged in users.
"""
