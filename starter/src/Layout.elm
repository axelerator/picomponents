module Layout exposing (..)

import Browser exposing (Document)
import Html exposing (Html, h4, text)
import Phosphor as P
import Pico exposing (Layout(..), contrastLink, dropdown, main_, nav, secondaryLink)
import Pico.Theme exposing (ColorScheme(..))
import Route exposing (href)
import Session exposing (Session, preferredColorScheme)
import Pico exposing (Column)


layout : Maybe Session -> List (Html msg) -> Document msg
layout session content =
    { title = "Picomponents"
    , body =
        [ main_ Centered
            (preferredColorScheme session)
            []
            (nav
                [ [ [ h4 [] [ contrastLink [ href Route.Landing ] [ P.scribbleLoop P.Duotone |> P.toHtml [], text " Logo" ] ] ] ]
                , loginItems session
                ]
                :: content
            )
        ]
    }


loginItems : Maybe Session -> Column msg
loginItems mbSession =
    case mbSession of
        Nothing ->
            [ [ secondaryLink [ href Route.Signup ] [ text "Sign up" ] ]
            , [ secondaryLink [ href Route.Login ] [ text "Log in ", P.signIn P.Regular |> P.toHtml [] ] ]
            ]

        Just { username } ->
            [ [ dropdown
                    [ P.user P.Regular |> P.toHtml [], text " ", text username ]
                    [ [ contrastLink [ href Route.Home ] [ P.house P.Regular |> P.toHtml [], text " Home" ] ]
                    , [ contrastLink [ href Route.Preferences ] [ P.gear P.Regular |> P.toHtml [], text " Preferences" ] ]
                    , [ contrastLink [ href Route.Logout ] [ P.signOut P.Regular |> P.toHtml [], text " Logout" ] ]
                    ]
              ]
            ]
