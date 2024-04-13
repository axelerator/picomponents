module Session exposing (..)

import Api exposing (AuthResponse)
import Pico.Theme exposing (ColorScheme(..))


type alias SessionId =
    String


type alias Session =
    { id : String
    , username : String
    , preferences : Preferences
    }


type alias Preferences =
    { colorScheme : ColorScheme
    }


init : AuthResponse -> Session
init { sessionId, username } =
    { id = sessionId
    , username = username
    , preferences = defaultPreferences
    }


defaultPreferences : Preferences
defaultPreferences =
    { colorScheme = SystemScheme
    }


preferredColorScheme : Maybe Session -> ColorScheme
preferredColorScheme mbSession =
    case mbSession of
        Nothing ->
            SystemScheme

        Just { preferences } ->
            preferences.colorScheme
