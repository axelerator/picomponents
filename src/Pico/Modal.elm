module Pico.Modal exposing (ModalState, Msg, close, init, open, subscription, toggle, update, view)
{-| 

# Modal component

Uses the [styles from Pico](https://picocss.com/docs/modal) to display a modal.
The component comes with pretty animations and the functionality to "lock" scrolling
when the modal is open.

This does however require interaction with the page outside the modal.
You need to include the webcomponent that's in `picomponent.js` in the packages repository root.

## Setup

**There must be only one instance of the modal component.** 
since there can never be multiple modals open at the same time.

For the animation the component needs it's own state.
So it is implemented with the Elm architecture.

You need to: 

1. add a `ModalState` field to your model
2. initialize it with `Modal.init`
3. add a variant to your `Mgs` type that takes a `Modal.Msg` as an argument
4. forward the `Modal.Msg` to `Modal.update` and update your `ModalState` accordingly
5. subscribe to `Modal.subscription` (and tell it which of your `Msg` to use to wrap the `Modal.Msg`)
6. use `Modal.view` to render your modal

@docs ModalState,  init, Msg, update, subscription, view

## Control visibility

@docs open, close, toggle 
-}
import Browser.Events
import Html exposing (Html, div, node, text)
import Html.Attributes exposing (attribute, id)
import Json.Decode as D exposing (Decoder)
import Time

{-| The initial, closed state of the modal.
-}
init : ModalState
init =
    IsClosed


{-| The state of the modal.
-}
type ModalState
    = IsClosed
    | IsOpening
    | IsOpen
    | IsClosing


{-| The messages that will be sent to control the state of the modal.
-}
type Msg
    = OpeningDone
    | Close
    | ClosingDone



{-| Closes the modal.
-}
close : ModalState
close =
    IsClosing


{-| Opens the modal.
-}
open : ModalState
open =
    IsOpening

{-| Toggles the modal.
-}
toggle : ModalState -> ModalState
toggle modalState =
    case modalState of
        IsClosed ->
            IsOpening

        _ ->
            IsClosing

{-| Transitions the modal 
-}
update : Msg -> ModalState -> ModalState
update msg modalState =
    case msg of
        OpeningDone ->
            IsOpen

        ClosingDone ->
            IsClosed

        Close ->
            IsClosing

{-| Listens to the escape key to close the modal.
-}
subscription : (Msg -> msg) -> ModalState -> Sub msg
subscription toMsg modalState =
    case modalState of
        IsOpen ->
            Browser.Events.onKeyUp (modalEscape toMsg)

        IsClosed ->
            Sub.none

        _ ->
            case modalState of
                IsOpening ->
                    Time.every 800 (\_ -> toMsg OpeningDone)

                IsClosing ->
                    Time.every 800 (\_ -> toMsg ClosingDone)

                _ ->
                    Sub.none

{-| Render the modal.
-}
view : ModalState -> List (Html msg) -> Html msg
view state content =
    let
        attrs =
            case state of
                IsClosed ->
                    [ id "modal" ]

                _ ->
                    [ id "modal", attribute "open" "" ]

        classAttribute =
            attribute "data-attribute" "class"

        webComponent =
            node "pico-class-updater"
                (classAttribute
                    :: (case state of
                            IsOpening ->
                                [ attribute "data-value" "modal-is-opening modal-is-open" ]

                            IsOpen ->
                                [ attribute "data-value" "modal-is-open" ]

                            IsClosing ->
                                [ attribute "data-value" "modal-is-open modal-is-closing" ]

                            IsClosed ->
                                [ attribute "data-value" "" ]
                       )
                )
                []

        css =
            node "style" [] [ text styles ]
    in
    div [] [ css, webComponent, div attrs content ]


modalEscape : (Msg -> msg) -> Decoder msg
modalEscape toMsg =
    keyDecoder
        |> D.andThen
            (\key ->
                if key == Control "Escape" then
                    D.succeed (toMsg Close)

                else
                    D.fail "not escape"
            )


type Key
    = Character Char
    | Control String


keyDecoder : Decoder Key
keyDecoder =
    D.map toKey (D.field "key" D.string)


toKey : String -> Key
toKey string =
    case String.uncons string of
        Just ( char, "" ) ->
            Character char

        _ ->
            Control string


styles =
    """
:root {
  --pico-scrollbar-width: 0px;
}

#modal {
  display: flex;
  z-index: 999;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  align-items: center;
  justify-content: center;
  width: inherit;
  min-width: 100%;
  height: inherit;
  min-height: 100%;
  padding: 0;
  border: 0;
  -webkit-backdrop-filter: var(--pico-modal-overlay-backdrop-filter);
  backdrop-filter: var(--pico-modal-overlay-backdrop-filter);
  background-color: var(--pico-modal-overlay-background-color);
  color: var(--pico-color);
}
#modal article {
  width: 100%;
  max-height: calc(100vh - var(--pico-spacing) * 2);
  margin: var(--pico-spacing);
  overflow: auto;
}
@media (min-width: 576px) {
  #modal article {
    max-width: 510px;
  }
}
@media (min-width: 768px) {
  #modal article {
    max-width: 700px;
  }
}
#modal article > header > * {
  margin-bottom: 0;
}
#modal article > header .close, #modal article > header :is(a, button)[rel=prev] {
  margin: 0;
  margin-left: var(--pico-spacing);
  padding: 0;
  float: right;
}
#modal article > footer {
  text-align: right;
}
#modal article > footer button,
#modal article > footer [role=button] {
  margin-bottom: 0;
}
#modal article > footer button:not(:first-of-type),
#modal article > footer [role=button]:not(:first-of-type) {
  margin-left: calc(var(--pico-spacing) * 0.5);
}
#modal article .close, #modal article :is(a, button)[rel=prev] {
  display: block;
  width: 1rem;
  height: 1rem;
  margin-top: calc(var(--pico-spacing) * -1);
  margin-bottom: var(--pico-spacing);
  margin-left: auto;
  border: none;
  background-image: var(--pico-icon-close);
  background-position: center;
  background-size: auto 1rem;
  background-repeat: no-repeat;
  background-color: transparent;
  opacity: 0.5;
  transition: opacity var(--pico-transition);
}
#modal article .close:is([aria-current]:not([aria-current=false]), :hover, :active, :focus), #modal article :is(a, button)[rel=prev]:is([aria-current]:not([aria-current=false]), :hover, :active, :focus) {
  opacity: 1;
}
#modal:not([open]), #modal[open=false] {
  display: none;
}

.modal-is-open {
  padding-right: var(--pico-scrollbar-width, 0px);
  overflow: hidden;
  pointer-events: none;
  touch-action: none;
}
.modal-is-open #modal {
  pointer-events: auto;
  touch-action: auto;
}

:where(.modal-is-opening, .modal-is-closing) #modal,
:where(.modal-is-opening, .modal-is-closing) #modal > article {
  animation-duration: 0.2s;
  animation-timing-function: ease-in-out;
  animation-fill-mode: both;
}
:where(.modal-is-opening, .modal-is-closing) #modal {
  animation-duration: 0.8s;
  animation-name: modal-overlay;
}
:where(.modal-is-opening, .modal-is-closing) #modal > article {
  animation-delay: 0.2s;
  animation-name: modal;
}

.modal-is-closing #modal,
.modal-is-closing #modal > article {
  animation-delay: 0s;
  animation-direction: reverse;
}

@keyframes modal-overlay {
  from {
    -webkit-backdrop-filter: none;
    backdrop-filter: none;
    background-color: transparent;
  }
}
@keyframes modal {
  from {
    transform: translateY(-100%);
    opacity: 0;
  }
}
"""
