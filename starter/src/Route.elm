module Route exposing (Route(..), fromUrl, href, replaceUrl, routeToString)

import Browser.Navigation as Nav
import Html exposing (Attribute)
import Html.Attributes as Attr
import Url exposing (Url)
import Url.Parser as Parser exposing ((</>), Parser, oneOf, s)



-- ROUTING


type Route
    = Landing
    | Login
    | Logout
    | Signup
    | Home
    | Preferences


parser : Parser (Route -> a) a
parser =
    oneOf
        [ Parser.map Landing Parser.top
        , Parser.map Login (s "login")
        , Parser.map Logout (s "logout")
        , Parser.map Home (s "home")
        , Parser.map Signup (s "signup")
        , Parser.map Preferences (s "preferences")
        ]



-- PUBLIC HELPERS


href : Route -> Attribute msg
href targetRoute =
    Attr.href (routeToString targetRoute)


replaceUrl : Nav.Key -> Route -> Cmd msg
replaceUrl key route =
    Nav.replaceUrl key (routeToString route)


fromUrl : Url -> Maybe Route
fromUrl url =
    Parser.parse parser url

routeToString : Route -> String
routeToString page =
    "/" ++ String.join "/" (routeToPieces page)


-- INTERNAL


routeToPieces : Route -> List String
routeToPieces page =
    case page of
        Landing ->
            []

        Login ->
            [ "login" ]

        Logout ->
            [ "logout" ]

        Home ->
            [ "home" ]

        Signup ->
            [ "signup" ]

        Preferences ->
            [ "preferences" ]
