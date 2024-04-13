module Api exposing (..)

import Process exposing (sleep)
import Task


type alias AuthResponse =
    { sessionId : String
    , username : String
    }


type alias Login =
    { username : String
    , password : String
    , rememberMe : Bool
    }


login : (AuthResponse -> msg) -> (String -> msg) -> Login -> Cmd msg
login onSuccess onFail { username, password } =
    let
        msg =
            if username == password then
                onSuccess 
                    { sessionId = "sessionId123", username = username }

            else
                onFail "Wrong password"
    in
    sleep 1000
        |> -- once the sleep is over, ignore its output (using `always`)
           -- and then we create a new task that simply returns a success, and the msg
           Task.andThen (always <| Task.succeed msg)
        |> -- finally, we ask Elm to perform the Task, which
           -- takes the result of the above task and
           -- returns it to our update function
           Task.perform identity


type alias SignUp =
    { username : String
    , password : String
    }


signup : (AuthResponse -> msg) -> (String -> msg) -> SignUp -> Cmd msg
signup onSuccess onFail { username, password } =
    let
        msg =
            if username == password then
                onSuccess 
                    { sessionId = "sessionId123", username = username }
            else
                onFail "Username already taken"
    in
    sleep 1000
        |> -- once the sleep is over, ignore its output (using `always`)
           -- and then we create a new task that simply returns a success, and the msg
           Task.andThen (always <| Task.succeed msg)
        |> -- finally, we ask Elm to perform the Task, which
           -- takes the result of the above task and
           -- returns it to our update function
           Task.perform identity
