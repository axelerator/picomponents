module Page.Landing exposing (Model, Msg, init, update, view)

import Browser exposing (Document)
import Html exposing (h1)
import Layout exposing (layout)
import Markdown
import Pico exposing (mark)
import Pico.Theme exposing (ColorScheme(..))
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
    [ welcomeMd
    ]
        |> layout session


mdOptions =
    { githubFlavored = Just { tables = True, breaks = False }
    , defaultHighlighting = Nothing
    , sanitize = True
    , smartypants = False
    }


welcomeMd : Html.Html msg
welcomeMd =
    Markdown.toHtmlWith mdOptions [] """
# Welcome to the _picomponents_ starter template

This is the landing page intended for all users, even if they are not logged in.

## Code organization

You'll find all the pages in `src/Page`. Pages are modeled after the [nested TEA](https://sporto.github.io/elm-patterns/architecture/nested-tea.html) pattern.


| url  | src  | description  |
|------|------|--------------|
| `/`| `src/Page/Landing.elm` | This page  |
| `/login`| `src/Page/Login.elm` | Login page  |
| `/signup`| `src/Page/Signup.elm` | Signup page  |
| `/home`| `src/Page/Home.elm` | Home page for logged in users  |
| `/preferences`| `src/Page/Preferences.elm` | Toggle dark mode as an example for altering shared state  |
| `*` | `src/Page/NotFound.elm` | Page to be shown when URL could not be resolved   |


## Routing & Serving

Routing is implemented like in the [original Elm SPA](https://github.com/rtfeldman/elm-spa-example/blob/master/src/Route.elm) with the exception, that we use the actual URL path and not the fragments.

To use proper routing the app has to be served by a HTTP server (can't just open the index.html).
This project contains a `Caddyfile` to serve it with [Caddy](https://caddyserver.com/docs/install).
But you can also use any other HTTP server.

We have a _"fake API"_ that allows you to test the __sign up__ & __login__ flows.
To log in you can use any username. If you use the username as a password, you will be logged in.



"""


update : Msg -> Model -> ( Model, Cmd Msg )
update _ model =
    ( model, Cmd.none )
