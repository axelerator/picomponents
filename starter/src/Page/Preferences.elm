module Page.Preferences exposing (..)

import Browser exposing (Document)
import FancyForms.Form as FancyForm exposing (Form, Variants, extract, field)
import FancyForms.FormState exposing (Error(..), FormState, alwaysValid)
import Form exposing (FormError)
import Html exposing (Html, article)
import Layout exposing (layout)
import Markdown
import Pico exposing (grid)
import Pico.Form
import Pico.Theme exposing (ColorScheme(..))
import Session exposing (Preferences, Session)


type alias Model =
    FormState


type alias Msg =
    FancyForm.Msg


init : Session -> Model
init session =
    FancyForm.init form session.preferences


update : Msg -> Model -> ( Model, Preferences )
update msg model =
    let
        formState =
            FancyForm.update form msg model
    in
    ( formState
    , extract form formState
    )


view : Maybe Session -> Model -> Document Msg
view session model =
    [ grid ""
        [ [ article [] [ preferencesMd ] ]
        , FancyForm.render identity form model
        ]
    ]
        |> layout session


preferencesMd : Html Msg
preferencesMd =
    Markdown.toHtml [] """
# Preferences

The preferences page is an example how to update shared state.
In this case we return it as part of the update result
(instead of returning a `Cmd`).

If more pages need to alter the shared state, then I like to
introduce a dedicated `UpdateResult` record type that contains
`Model`, `Cmd` and `Session` data as well as potential 
[global actions](https://sporto.github.io/elm-patterns/architecture/global-actions.html)

"""


form : Form Session.Preferences FormError
form =
    Form.form 
        alwaysValid
        "preferences-form"
        (\colorScheme ->
            { view =
                \formState _ -> colorScheme.view formState
            , combine =
                \formState ->
                    { colorScheme = colorScheme.value formState
                    }
            }
        )
        |> field .colorScheme (Pico.Form.dropdown "Color scheme" colorSchemeVariants)


colorSchemeVariants : Variants ColorScheme
colorSchemeVariants =
    ( { id = "System", label = "System", value = SystemScheme }
    , [ { id = "Light", label = "Light", value = Light }
      , { id = "Dark", label = "Dark", value = Dark }
      ]
    )
