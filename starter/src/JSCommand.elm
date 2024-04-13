module JSCommand exposing (..)

import Json.Decode as D exposing (Decoder)
import Json.Encode exposing (Value)
import Pico.Theme exposing (ColorScheme(..))
import Session exposing (Preferences, Session, defaultPreferences)


type JSCommand
    = StorePreferences Preferences
    | StoreRememberMe RememberMe
    | RemoveRememberMe


encode : JSCommand -> ( String, Value )
encode cmd =
    case cmd of
        StorePreferences preferences ->
            ( "storePreferences", encodePreferences preferences )

        StoreRememberMe rememberMe ->
            ( "storeRememberMe", encodeRememberMe rememberMe )

        RemoveRememberMe ->
            ( "removeRememberMe", Json.Encode.null )


encodePreferences : Preferences -> Value
encodePreferences preferences =
    let
        colorScheme =
            case preferences.colorScheme of
                Light ->
                    "light"

                Dark ->
                    "dark"

                SystemScheme ->
                    "system"
    in
    Json.Encode.object
        [ ( "colorScheme", Json.Encode.string colorScheme )
        ]


encodeRememberMe : RememberMe -> Value
encodeRememberMe rememberMe =
    Json.Encode.object
        [ ( "sessionId", Json.Encode.string rememberMe.sessionId )
        , ( "username", Json.Encode.string rememberMe.username )
        ]


preferencesDecoder : Decoder Preferences
preferencesDecoder =
    D.map Preferences
        (D.field "colorScheme" D.string
            |> D.andThen
                (\schemeName ->
                    case schemeName of
                        "light" ->
                            D.succeed Light

                        "dark" ->
                            D.succeed Dark

                        "system" ->
                            D.succeed SystemScheme

                        _ ->
                            D.fail "unknown color scheme"
                )
        )


type alias Flags =
    { preferences : Maybe Preferences
    , rememberMe : Maybe RememberMe
    }


type alias RememberMe =
    { sessionId : String
    , username : String
    }


emptyFlags : Flags
emptyFlags =
    { preferences = Nothing
    , rememberMe = Nothing
    }


toSession : Flags -> Maybe Session
toSession flags =
    Maybe.map
        (\{ sessionId, username } ->
            { id = sessionId
            , username = username
            , preferences = Maybe.withDefault defaultPreferences flags.preferences
            }
        )
        flags.rememberMe


flagsDecoder : Decoder Flags
flagsDecoder =
    D.map2 Flags
        (D.maybe <| D.field "preferences" preferencesDecoder)
        (D.maybe <|
            D.field "rememberMe" <|
                D.map2 RememberMe
                    (D.field "sessionId" D.string)
                    (D.field "username" D.string)
        )
