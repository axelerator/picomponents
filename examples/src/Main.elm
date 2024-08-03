module Main exposing (main)

import Browser exposing (Document)
import Browser.Navigation exposing (Key)
import Date exposing (Date)
import FancyForms.Form as Form exposing (Form, Variants, extract, field, fieldWithVariants, form, listField, render, validate)
import FancyForms.FormState exposing (Error(..), FormState, Validator, alwaysValid, withBlur)
import FancyForms.Widgets.Int exposing (greaterThan)
import FancyForms.Widgets.Text exposing (notBlank)
import Html exposing (Html, a, article, aside, button, code, div, em, fieldset, footer, h1, h2, h3, header, input, li, node, p, pre, section, small, span, td, text, tr, ul, wbr)
import Html.Attributes exposing (attribute, class, classList, disabled, href, id, name, rel, step, type_)
import Html.Events exposing (onClick, onInput)
import Html.Lazy
import Json.Encode as E exposing (Value)
import List.Nonempty
import Markdown
import Parser
import Pico
    exposing
        ( Layout(..)
        , abbr
        , accordion
        , aria
        , asButton
        , bold
        , br
        , busy
        , contrastButton
        , contrastLink
        , deleted
        , emphasis
        , errorView
        , grid
        , hr
        , includeFromCDN
        , inserted
        , italic
        , kbd
        , main_
        , mark
        , nav
        , outline
        , primaryButton
        , primaryLink
        , role
        , secondaryButton
        , secondaryLink
        , strikethrough
        , subscript
        , superscript
        , switch
        , table
        , tooltip
        , tooltipBottom
        , tooltipLeft
        , tooltipRight
        , underline
        )
import Pico.Form exposing (dropdown)
import Pico.Modal as Modal exposing (ModalState)
import Pico.Theme exposing (ColorScheme(..), Theme(..), themeName)
import String exposing (fromFloat, fromInt)
import Svg exposing (path, svg)
import Svg.Attributes as SvgAttr
import SyntaxHighlight as SH
import Url exposing (Url)


main : Program () Model Msg
main =
    Browser.document
        { init = init
        , update = update
        , subscriptions = subscriptions
        , view = view
        }


type alias Model =
    { count : Int
    , mainArgs : FormState
    , buttonOutline : Bool
    , linksAsButtons : Bool
    , exampleFormState : FormState
    , listFormState : FormState
    , variantFormState : FormState
    , combinedFormState : FormState
    , testModal : { state : ModalState, content : ModalContent }
    }


type Msg
    = Noop
    | ForForm FormId Form.Msg
    | ToggleOutline
    | ToggleLinksAsButtons
    | ShowModalExample
    | CloseModal
    | SubmitForm
    | ForModal Modal.Msg


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        Noop ->
            ( model
            , Cmd.none
            )

        ShowModalExample ->
            ( { model
                | testModal =
                    { state = Modal.open model.testModal.state
                    , content = ModalExample
                    }
              }
            , Cmd.none
            )

        CloseModal ->
            let
                modal_ =
                    model.testModal
            in
            ( { model | testModal = { modal_ | state = Modal.close modal_.state } }
            , Cmd.none
            )

        ForModal modalMsg ->
            let
                modal_ =
                    model.testModal
            in
            ( { model | testModal = { modal_ | state = Modal.update modalMsg modal_.state } }
            , Cmd.none
            )

        ForForm formId fMsg ->
            let
                model_ =
                    case formId of
                        MainArgsForm ->
                            { model | mainArgs = Form.update mainArgsForm fMsg model.mainArgs }

                        ExampleForm ->
                            { model | exampleFormState = Form.update exampleForm fMsg model.exampleFormState }

                        ListForm ->
                            { model | listFormState = Form.update listForm fMsg model.listFormState }

                        VariantForm ->
                            { model | variantFormState = Form.update variantForm fMsg model.variantFormState }

                        ComboForm ->
                            { model | combinedFormState = Form.update combinedForm fMsg model.combinedFormState }
            in
            ( model_
            , Cmd.none
            )

        SubmitForm ->
            if Form.isValid exampleForm model.exampleFormState then
                ( { model
                    | testModal =
                        { state = Modal.open model.testModal.state
                        , content = FormResult <| Form.extract exampleForm model.exampleFormState
                        }
                  }
                , Cmd.none
                )

            else
                ( { model
                    | exampleFormState = FancyForms.FormState.blurAll model.exampleFormState
                  }
                , Cmd.none
                )

        ToggleOutline ->
            ( { model | buttonOutline = not model.buttonOutline }
            , Cmd.none
            )

        ToggleLinksAsButtons ->
            ( { model | linksAsButtons = not model.linksAsButtons }
            , Cmd.none
            )


type ModalContent
    = NothingYet
    | ModalExample
    | FormResult ExampleInputs


init : () -> ( Model, Cmd Msg )
init _ =
    ( { count = 0
      , mainArgs = Form.init mainArgsForm initMainArgs
      , exampleFormState = Form.init exampleForm initExampleForm
      , listFormState = Form.init listForm [ "Get out of bed!" ]
      , variantFormState = Form.init variantForm initVariantForm
      , combinedFormState = Form.init combinedForm [ Email "bFQpR@example.com" ]
      , buttonOutline = False
      , linksAsButtons = False
      , testModal = { state = Modal.init, content = NothingYet }
      }
    , Cmd.none
    )


leftNav model =
    aside []
        [ contrastLink [] [ text "Getting started" ]
        , ul []
            [ li [] [ secondaryLink [] [ text "Introduction" ] ]
            , li [] [ secondaryLink [] [ text "Installation" ] ]
            , li [] [ secondaryLink [] [ text "Usage" ] ]
            ]
        , contrastLink [ href "#layout" ] [ text "Layout" ]
        , ul []
            [ li [] [ secondaryLink [ href "#containers" ] [ text "Container" ] ]
            , li [] [ secondaryLink [ href "#darkmode" ] [ text "Dark mode" ] ]
            , li [] [ secondaryLink [ href "#themes" ] [ text "Themes" ] ]
            ]
        , contrastLink [ href "#theContent" ] [ text "Content" ]
        , ul []
            [ li [] [ secondaryLink [ href "#typography" ] [ text "Typography" ] ]
            , li [] [ secondaryLink [ href "#buttons" ] [ text "Buttons" ] ]
            , li [] [ secondaryLink [ href "#links" ] [ text "Links" ] ]
            ]
        , span [] [ text "Forms" ]
        , ul []
            [ li [] [ secondaryLink [ href "#inputs" ] [ text "Inputs" ] ]
            , li [] [ secondaryLink [ href "#lists" ] [ text "Lists" ] ]
            , li [] [ secondaryLink [ href "#variants" ] [ text "Variants" ] ]
            , li [] [ secondaryLink [ href "#combo" ] [ text "Combinations" ] ]
            ]
        , span [] [ text "Components" ]
        , ul []
            [ li [] [ secondaryLink [ href "#accordion" ] [ text "Accordion" ] ]
            , li [] [ secondaryLink [ href "#modals" ] [ text "Modal" ] ]
            , li [] [ secondaryLink [ href "#tooltips" ] [ text "Tooltip" ] ]
            , li [] [ secondaryLink [ href "#loading" ] [ text "Loading" ] ]
            ]
        ]


view : Model -> Document Msg
view model =
    let
        { layout, colorScheme, theme } =
            extract mainArgsForm model.mainArgs
    in
    { title = "Picomponents"
    , body =
        [ Modal.view model.testModal.state (modalContent model.testModal)
        , includeFromCDN theme
        , codeStyle model
        , header []
            [ div [ containerClass model ]
                [ nav
                    [ [ [ picomponentsSvg ] ]
                    , [ [ secondaryLink [ href "https://github.com/axelerator/picomponents" ] [ githubSvg ] ]
                      , [ secondaryLink [ href "https://package.elm-lang.org/packages/axelerator/picomponents/latest" ] [ elmSvg ] ]
                      ]
                    ]
                ]
            ]
        , main_ layout colorScheme [] <|
            [ leftNav model
            , div [ id "content" ] <|
                List.concat
                    [ withAnchors viewGettingStarted
                    , [ a [ name "layout" ] []
                      , viewTheme model.mainArgs
                      , a [ name "theContent" ] []
                      , viewContent
                      , a [ name "typography" ] []
                      , viewTypography
                      , a [ name "buttons" ] []
                      , viewButtons model
                      , a [ name "links" ] []
                      , viewLinks model
                      , a [ name "inputs" ] []
                      , viewForms model
                      , a [ name "lists" ] []
                      , viewLists model
                      , a [ name "variants" ] []
                      , viewVariants model
                      , a [ name "combo" ] []
                      , viewCombo model
                      , a [ name "accordion" ] []
                      , viewAccordions
                      , a [ name "modals" ] []
                      , viewModal
                      , a [ name "tooltips" ] []
                      , viewTooltips
                      , a [ name "loading" ] []
                      , viewLoading
                      ]
                    ]
            ]
        ]
    }


withAnchors : List ( String, Html msg ) -> List (Html msg)
withAnchors =
    List.concatMap
        (\( name, html ) -> [ a [ href <| "#" ++ name ] [], html ])


viewGettingStarted : List ( String, Html Msg )
viewGettingStarted =
    [ markdownWithAnchor "getting-started" """
## Getting started

**Picomponents** is an Elm package that provides a set of reusable
components using the [Pico.css](https://picocss.com/) framework.
Pico.css is a __Minimal CSS Framework for Semantic HTML__. 

The goal is to make it as easy as possible to build good looking Elm applications.

We combine the the semantic beauty of [Pico.css](https://picocss.com/) with the modularity of
[FancyForms](https://blog.axelerator.de/fancy-forms/) to provide an
easy-to-use UI toolkit to build modern web applications.
"""
    , markdownWithAnchor "setup-started" """
### Setup

First you install `picomponents` like any other elm package:

```
$ elm install axelerator/picomponents
```

To include the CSS in your HTML page you can either follow the instructions in
the [Pico docs](https://picocss.com/docs#install-manually) or use the `includeFromCDN` function
in the `Pico` module."""
    , markdownWithAnchor "setup-started" """

### JS interop

The _"modal"_ and the _"color scheme"_ functionality of Pico depends on attributes on the `html` element.
This is usually a bit tricky since Elm applications internally only have access
to the part of the DOM that they control.

`Picomponents` comes with a small webcomponent that manages the interactions with 
the HTML element. 

For those to work you need to include the webcomponent (`picomponent.js`) from the package's repository root.
"""
    ]


markdownWithAnchor : String -> String -> ( String, Html msg )
markdownWithAnchor anchor src =
    ( anchor, markdown src )


type MyError
    = NotEven


mainArgsForm : Form MainArgs MyError
mainArgsForm =
    form
        (\errors_ html -> html)
        alwaysValid
        "mainargs"
        (\layout colorScheme theme ->
            { view =
                \formState _ ->
                    List.concat
                        [ layout.view formState
                        , darkModeInfo (colorScheme.view formState)
                        , themeInfo (theme.view formState) (theme.value formState)
                        ]
            , combine =
                \formState ->
                    { layout = layout.value formState
                    , colorScheme = colorScheme.value formState
                    , theme = theme.value formState
                    }
            }
        )
        |> field .layout (dropdown "Layout" layoutVariants)
        |> field .colorScheme (dropdown "Color Scheme" colorSchemeVariants)
        |> field .theme (dropdown "" themeVariants)


darkModeInfo select_ =
    [ a [ name "darkmode" ] []
    , h3 [] [ text "Dark mode" ]
    , markdown """
Pico.css comes with a dark mode option to enable it.
The second argument to the `main_` function is the color scheme.

We need to add attributes to the `<html>` element. To be able to do that _picomponents_
comes with a small webcomponent.

> The script is in the `picomponent.js` in the packages root. You just need to include it in your Html
> before initializing your Elm app.
    """
    ]
        ++ select_


themeInfo select_ currentTheme =
    [ a [ name "themes" ] []
    , h3 [] [ text "Themes" ]
    , markdown """
Pico.css comes with [a variety of color themes](https://picocss.com/docs/color-schemes).

Each has a dedicated CSS file that needs to be included.
You can use the `includeFromCDN` function to include the CSS for the given theme from a CDN.
"""
    , grid ""
        [ select_
        , [ viewCode False <| String.join " " [ "includeFromCDN ", themeName currentTheme ] ]
        ]
    , markdown "Of course you can also download the CSS yourself and serve it yourself."
    ]


toNonEmpty : ( a, List a ) -> List.Nonempty.Nonempty a
toNonEmpty ( x, xs ) =
    List.Nonempty.fromList (x :: xs)
        |> Maybe.withDefault (List.Nonempty.singleton x)


layoutVariants : Variants Layout
layoutVariants =
    toNonEmpty <|
        ( { value = Pico.Centered
          , id = "centered"
          , label = "Centered"
          }
        , [ { value = Pico.FullWidth
            , id = "full"
            , label = "FullWidth"
            }
          ]
        )


colorSchemeVariants : Variants ColorScheme
colorSchemeVariants =
    toNonEmpty <|
        ( { value = Pico.Theme.SystemScheme
          , id = "system"
          , label = "System"
          }
        , [ { value = Pico.Theme.Light
            , id = "light"
            , label = "Light"
            }
          , { value = Pico.Theme.Dark
            , id = "dark"
            , label = "Dark"
            }
          ]
        )


themeVariants : Variants Theme
themeVariants =
    let
        mkVariant theme =
            { value = theme
            , id = themeName theme
            , label = themeName theme
            }
    in
    Pico.Theme.themes
        |> List.map mkVariant
        |> List.Nonempty.fromList
        |> Maybe.withDefault (List.Nonempty.singleton <| mkVariant Pico.Theme.Amber)


type FormId
    = MainArgsForm
    | ExampleForm
    | ListForm
    | VariantForm
    | ComboForm


subscriptions : Model -> Sub Msg
subscriptions model =
    Modal.subscription ForModal model.testModal.state


type alias MainArgs =
    { layout : Layout
    , theme : Theme
    , colorScheme : ColorScheme
    }


initMainArgs : MainArgs
initMainArgs =
    { layout = Centered
    , theme = Amber
    , colorScheme = SystemScheme
    }


isLight : Model -> Bool
isLight model =
    case .colorScheme <| extract mainArgsForm model.mainArgs of
        Pico.Theme.Light ->
            True

        _ ->
            False


containerClass model =
    case .layout <| extract mainArgsForm model.mainArgs of
        Pico.Centered ->
            class "container"

        Pico.FullWidth ->
            class "container-fluid"


codeStyle model =
    SH.useTheme <|
        if isLight model then
            SH.gitHub

        else
            SH.oneDark


modalContent modal =
    case modal.content of
        NothingYet ->
            [ text "" ]

        ModalExample ->
            [ exampleModelContent ]

        FormResult inputs ->
            [ sumbitFormContent inputs ]


exampleModelContent =
    article []
        [ header []
            [ text "Modal"
            , button [ onClick CloseModal, aria "label" "Close", rel "prev" ] []
            ]
        , viewCode True modalExampleCode
        , footer [] [ button [ onClick CloseModal ] [ text "Close" ] ]
        ]


viewTheme : FormState -> Html Msg
viewTheme mainArgs =
    section [] <|
        List.concat
            [ [ a [ name "containers" ] []
              , h2 [] [ text "Layout" ]
              , markdown """
Pico.css is relatively unopinionated what content areas to have on a page. It does offer a few light options to control the layout.
                """
              ]
            , layoutView mainArgs
            , render (ForForm MainArgsForm) mainArgsForm mainArgs
            ]


layoutView mainArgs =
    let
        { layout, colorScheme } =
            extract mainArgsForm mainArgs

        currentLayoutName =
            case layout of
                Pico.Centered ->
                    "Centered"

                Pico.FullWidth ->
                    "FullWidth"

        currentColorSchemeName =
            case colorScheme of
                Pico.Theme.Light ->
                    "Light"

                Pico.Theme.Dark ->
                    "Dark"

                Pico.Theme.SystemScheme ->
                    "SystemScheme"
    in
    [ markdown """
### Containers

The `main_` function creates the central content area. It takes two arguments:
The first one determines whether the content should be rendered in a centered or full width layout.
The second one determins light or dark mode.
"""
    , viewCode False <| String.join " " [ "main_", currentLayoutName, currentColorSchemeName, "[ ]", "[...]" ]
    ]


viewButtons : Model -> Html Msg
viewButtons { buttonOutline } =
    let
        ( buttonAttrs, outlineTxt ) =
            if buttonOutline then
                ( [ outline ]
                , "[ outline ] "
                )

            else
                ( []
                , "[] "
                )
    in
    section []
        [ h3 [] [ text "Buttons" ]
        , p []
            [ text "Buttons come in three styles:"
            , mark "primary"
            , text ", "
            , mark "secondary"
            , text " and "
            , mark "contrast"
            ]
        , p []
            [ text "Optionally each of them can be rendered in an alternative outline style:"
            , switch [ onInput (\_ -> ToggleOutline) ] [ text "Outline" ]
            ]
        , table []
            []
            [ [ [ primaryButton buttonAttrs [ text "Primary" ] ]
              , [ viewCode False <| String.join " " [ "primaryButton", outlineTxt, "[ text \"Primary\" ]" ] ]
              ]
            , [ [ secondaryButton buttonAttrs [ text "Secondary" ] ]
              , [ viewCode False <| String.join " " [ "secondaryButton ", outlineTxt, "[ text \"Secondary\" ]" ] ]
              ]
            , [ [ contrastButton buttonAttrs [ text "Contrast" ] ]
              , [ viewCode False <| String.join " " [ "contrastButton ", outlineTxt, "[ text \"Contrast\" ]" ] ]
              ]
            ]
        ]


viewLinks : Model -> Html Msg
viewLinks { linksAsButtons } =
    let
        ( linkAttrs, outlineTxt ) =
            if linksAsButtons then
                ( [ asButton, href "#" ]
                , "[ href \"#\", asButton ] "
                )

            else
                ( [ href "#" ]
                , "[href \"#\"] "
                )
    in
    section []
        [ h3 [] [ text "Links" ]
        , p []
            [ text "Links come in three styles:"
            , mark "primary"
            , text ", "
            , mark "secondary"
            , text " and "
            , mark "contrast"
            ]
        , p []
            [ asLinkExplanation
            , switch [ onInput (\_ -> ToggleLinksAsButtons) ] [ text "Links as buttons" ]
            ]
        , table []
            []
            [ [ [ primaryLink linkAttrs [ text "Primary" ] ]
              , [ viewCode False <| String.join " " [ "primaryLink ", outlineTxt, "[ text \"Primary\" ]" ] ]
              ]
            , [ [ secondaryLink linkAttrs [ text "Secondary" ] ]
              , [ viewCode False <| String.join " " [ "secondaryLink ", outlineTxt, "[ text \"Secondary\" ]" ] ]
              ]
            , [ [ contrastLink linkAttrs [ text "Contrast" ] ]
              , [ viewCode False <| String.join " " [ "contrastLink ", outlineTxt, "[ text \"Contrast\" ]" ] ]
              ]
            ]
        ]


inlineExamples : List (List ( Html msg, String ))
inlineExamples =
    [ [ ( abbr "tldr" "too long didn't  read", "abbr \"tldr\" \"too long didn't  read\"" )
      , ( bold "bold", "bold \"bold\"" )
      ]
    , [ ( italic "italic", "italic \"italic\"" )
      , ( emphasis "emphasis", "emphasis \"emphasis\"" )
      ]
    , [ ( deleted "deleted", "deleted \"deleted\"" )
      , ( inserted "inserted", "inserted \"inserted\"" )
      ]
    , [ ( kbd "kbd", "kbd \"kbd\"" )
      , ( mark "mark", "mark \"mark\"" )
      ]
    , [ ( strikethrough "strikethrough", "strikethrough \"strikethrough\"" )
      , ( underline "underline", "underline \"underline\"" )
      ]
    , [ ( span [] [ text "Text ", superscript "up high" ], "superscript \"up high\"" )
      , ( span [] [ text "Text ", subscript "down low" ], "subscript \"down low\"" )
      ]
    ]


viewInlineExample : ( Html msg, String ) -> Html msg
viewInlineExample ( example, code ) =
    div [] [ example, viewCode False code ]


viewInlineExamplePair : List ( Html msg, String ) -> Html msg
viewInlineExamplePair examples =
    div [ class "grid" ] <| List.map viewInlineExample examples


viewContent : Html Msg
viewContent =
    markdown """
## Content

Pico has great styling for a lot of the most common HTML elements. And while it is pretty straightforward
to use these in Elm we offer a few convience functions that cut down on the boilerplate. There are a few 
elements that never have content like the `<br>` element, while others nearly always contain exactly one
text node.

"""


viewTypography : Html Msg
viewTypography =
    section []
        [ h3 [] [ text "Typography" ]
        , p [] [ text "Especially for the inline text elements you will often just pass in a single text node, so we offer the following shortcuts:" ]
        , div [ class "inline-examples" ] <|
            List.map viewInlineExamplePair inlineExamples
        , markdownInfo
        ]


markdownInfo =
    markdown """
### Markdown
Since pico.css is a (mostly) **classless** CSS framework we can also use [Markdown](https://package.elm-lang.org/packages/elm-explorations/markdown/latest/) and it "looks good" per default.

- Here is a link to [Pico CSS](https://picocss.com/) `[Pico CSS](https://picocss)`.
- Here is **some bold text** `**some bold text**`
- Here is _some italic text_ `*some italic text*`
"""


type alias ExampleInputs =
    { stringInput : String
    , integerInput : Int
    , floatInput : Float
    , dateInput : Date
    }


initExampleForm : ExampleInputs
initExampleForm =
    { stringInput = ""
    , integerInput = 0
    , floatInput = 1.0
    , dateInput = Date.fromOrdinalDate 2024 15
    }


exampleForm : Form ExampleInputs MyError
exampleForm =
    form
        (errorView errorToString)
        alwaysValid
        "example-form"
        (\stringInput integerInput floatInput dateInput ->
            { view =
                \formState _ ->
                    [ grid "numberInputs"
                        [ integerInput.view formState
                        , floatInput.view formState
                        ]
                    , grid ""
                        [ stringInput.view formState
                        , dateInput.view formState
                        ]
                    ]
            , combine =
                \formState ->
                    { stringInput = stringInput.value formState
                    , integerInput = integerInput.value formState
                    , floatInput = floatInput.value formState
                    , dateInput = dateInput.value formState
                    }
            }
        )
        |> field .stringInput (Pico.Form.textInput "String input" |> validate [ notBlank ])
        |> field .integerInput (Pico.Form.integerInput "Integer input" |> validate [ evenValidator ])
        |> field .floatInput (Pico.Form.floatInput "Float input" [ step "0.1" ])
        |> field .dateInput (Pico.Form.dateInput "Date input")


evenValidator : Validator Int MyError
evenValidator i =
    if modBy 2 i == 0 then
        []

    else
        [ CustomError NotEven ]


errorToString : Error MyError -> String
errorToString e =
    case e of
        NotValid ->
            ""

        MustBeGreaterThan x ->
            "Must be greater than " ++ x

        MustBeLesserThan x ->
            "Must be lesser than " ++ x

        MustNotBeBlank ->
            "Please enter a value"

        CustomError myError ->
            case myError of
                NotEven ->
                    "Please give an even number"


viewForms : Model -> Html Msg
viewForms { exampleFormState } =
    section [] <|
        [ h3 [] [ text "Forms" ]
        , markdown """Providing a modern UX for forms comes with a lot of little challenges.
[FancyForms](https://blog.axelerator.de/fancy-forms/) comes with good defaults without compromising on customization.
We provide helpers that produce markup so that Pico makes your forms look great!
"""
        , accordion [ asButton, class "secondary" ] [ text "View code" ] [ viewCode True formCodeStr ]
        , article
            []
            (render (ForForm ExampleForm) exampleForm exampleFormState
                ++ [ footer []
                        [ primaryButton [ onClick SubmitForm ] [ text "Check the input value" ]
                        , if Form.isValid exampleForm exampleFormState then
                            text ""

                          else
                            text " The form input is not valid yet"
                        ]
                   ]
            )
        ]


sumbitFormContent { stringInput, integerInput, floatInput, dateInput } =
    article []
        [ header []
            [ text "Form submission"
            , footer [] [ button [ onClick CloseModal, aria "label" "Close", rel "prev" ] [] ]
            ]
        , viewCode False <|
            String.join "\n"
                [ "extracted : ExampleForm"
                , "extracted = { stringInput = \"" ++ stringInput ++ "\""
                , "            , integerInput = " ++ fromInt integerInput
                , "            , floatInput = " ++ fromFloat floatInput
                , "            , dateInput = " ++ Date.toIsoString dateInput
                , "            }"
                ]
        ]


formCodeStr =
    """ type alias ExampleInputs =
    { stringInput : String
    , integerInput : Int
    , floatInput : Float
    , dateInput : Date
    }

initExampleForm : ExampleInputs
initExampleForm =
    { stringInput = ""
    , integerInput = 0
    , floatInput = 1.0
    , dateInput = Date.fromOrdinalDate 2024 15
    }

exampleForm : Form ExampleInputs MyError
exampleForm =
    form
        (errorView errorToString) -- defines how to render errors
        alwaysValid -- this form doesn't have "form level" validations
        "example-form"
        (\\stringInput integerInput floatInput dateInput ->
            { view = -- specifies how the input fields are layed out
                \\formState _ ->
                        [ grid "numberInputs"
                                [ integerInput.view formState
                                , floatInput.view formState
                                ]
                        , grid "" 
                            [ stringInput.view formState
                            , dateInput.view formState
                            ]
                        ]
            , combine = -- turns the input values into a single output value
                \\formState ->
                    { stringInput = stringInput.value formState
                    , integerInput = integerInput.value formState
                    , floatInput = floatInput.value formState
                    , dateInput = dateInput.value formState
                    }
            }
        ) -- finally we add the individual inputs and their validations
        |> field .stringInput (Pico.Form.textInput "String input" |> validate [ notBlank ])
        |> field .integerInput (Pico.Form.integerInput "Integer input" |> validate [ evenValidator ])
        |> field .floatInput (Pico.Form.floatInput "Float input" [ step "0.1" ])
        |> field .dateInput (Pico.Form.dateInput "Date input")
-- example of a custom validation using a custom error type
evenValidator : Validator Int MyError
evenValidator i =
    if modBy 2 i == 0 then
        []
    else
        [ CustomError NotEven ]
-- we need to supply a functino to convert errors into human readable strings
errorToString : Error MyError -> String
errorToString e =
    case e of
        NotValid ->
            ""
        MustBeGreaterThan x ->
            "Must be greater than " ++ x
        MustBeLesserThan x ->
            "Must be lesser than " ++ x
        MustNotBeBlank ->
            "Please enter a value"
        CustomError myError ->
            case myError of
                NotEven ->
                    "Please give an even number"
"""


viewLists : Model -> Html Msg
viewLists model =
    section [] <|
        List.concat
            [ [ h3 [] [ text "Lists" ]
              , markdown """
_FancyForms comes with a function to add a `listField` to your form. This lets the user provide multiple values of the type
of the given widget.

We also have to specify the UI elements for adding and removing values.
Here is an example that collects a list of `String` values.
"""
              ]
            , [ accordion [ asButton, class "secondary" ] [ text "View code" ] [ viewCode True listFormCodeStr ] ]
            , render (ForForm ListForm) listForm model.listFormState
            ]


listFormCodeStr =
    """listForm : Form (List String) MyError
listForm =
    Form.form
        (\\_ html -> html) -- no validations, no errors to display
        alwaysValid -- no custom validations
        "lists-example"
        (\\todos ->
            { view = \\formState _ -> todos.view formState
            , combine = \\formState -> todos.value formState
            }
        )
        |> listField -- this makes it a list instead of a single field
            listWithAddButton     -- defines where to position the add button
            fieldWithRemoveButton -- defines where to position the remove button
            "a new todo"          -- default content for new element
            identity              -- how to get the list out of the form value
            (FancyForms.Widgets.Text.textInput []) -- the widget to collect a single item


fieldWithRemoveButton removeMsg input =
    [ fieldset [ role "group" ] <|
        input
            ++ [ button [ onClick removeMsg ] [ text "Remove" ] ]
    ]


listWithAddButton addMsg items =
    [ div [] <|
        items
            ++ [ button [ onClick addMsg ] [ text "Add todo" ] ]
    ]
"""


listForm : Form (List String) MyError
listForm =
    Form.form
        (\_ html -> html)
        -- omitting errors for brevity
        alwaysValid
        -- no custom validations
        "lists-example"
        (\todos ->
            { view = \formState _ -> todos.view formState
            , combine = \formState -> todos.value formState
            }
        )
        |> listField
            listWithAddButton
            fieldWithRemoveButton
            "a new todo"
            identity
            (FancyForms.Widgets.Text.textInput [])


fieldWithRemoveButton removeMsg input =
    [ fieldset [ role "group" ] <|
        input
            ++ [ button [ onClick removeMsg ] [ text "Remove" ] ]
    ]


listWithAddButton addMsg items =
    [ div [] <|
        items
            ++ [ button [ onClick addMsg ] [ text "Add todo" ] ]
    ]


viewVariants : Model -> Html Msg
viewVariants model =
    section [] <|
        List.concat
            [ [ h3 [] [ text "Variants" ] ]
            , [ grid ""
                    [ [ markdown """Consider this example where we want to collect a `Contact` that can be either an `Email` or a `Phone`.
In this case the form will look different depending on which variant is selected.
""" ]
                    , [ viewCode False """type Contact
    = Email String
    | Phone { countryCode: Int, number: Int }
""" ]
                    ]
              ]
            , [ accordion [ asButton, class "secondary" ] [ text "View full code" ] [ viewCode True variantFormCodeStr ] ]
            , render (ForForm VariantForm) variantForm model.variantFormState
            ]


initVariantForm : Contact
initVariantForm =
    Email ""


type Contact
    = Email String
    | Phone { countryCode : Int, number : Int }


variantForm : Form Contact MyError
variantForm =
    Form.form
        (\_ html -> html)
        -- no custom errors to display
        alwaysValid
        -- any contact is valid
        "variant-example"
        (\contact ->
            { view = \formState _ -> contact.view formState
            , combine = \formState -> contact.value formState
            }
        )
        |> fieldWithVariants identity
            (dropdown "Contact")
            ( "E-Mail", emailForm )
            [ ( "Phone number", phoneForm ) ]
            (\c ->
                case c of
                    Email _ ->
                        "E-Mail"

                    Phone _ ->
                        "Phone number"
            )


emailForm : Form Contact MyError
emailForm =
    Form.form
        (\_ html -> html)
        -- no custom errors to display
        alwaysValid
        -- no custom validations
        "email-form"
        (\email ->
            { view = \formState _ -> [ div [] <| email.view formState ]
            , combine = \formState -> Email <| email.value formState
            }
        )
        |> field emailOrEmpty (Pico.Form.textInput "E-Mail address")


emailOrEmpty : Contact -> String
emailOrEmpty c =
    case c of
        Email email ->
            email

        _ ->
            ""


phoneForm : Form Contact MyError
phoneForm =
    Form.form
        (\_ html -> html)
        -- no custom errors to display
        alwaysValid
        -- no custom validations
        "email-form"
        (\countryCode number ->
            { view =
                \formState _ ->
                    [ div [ class "grid" ]
                        [ div [] <| countryCode.view formState
                        , div [] <| number.view formState
                        ]
                    ]
            , combine =
                \formState ->
                    Phone
                        { countryCode = countryCode.value formState
                        , number = number.value formState
                        }
            }
        )
        |> field (numberDetails >> .countryCode) (Pico.Form.integerInput "Country code")
        |> field (numberDetails >> .number) (Pico.Form.integerInput "Number")


numberDetails : Contact -> { countryCode : Int, number : Int }
numberDetails c =
    case c of
        Email _ ->
            { countryCode = 0, number = 0 }

        Phone details ->
            details


variantFormCodeStr : String
variantFormCodeStr =
    """variantForm : Form Contact MyError
Form.form
    (\\_ html -> html) -- no custom errors to display
    alwaysValid -- any contact is valid
    "variant-example"
    (\\contact ->
        { view = \\formState _ -> contact.view formState
        , combine = \\formState -> contact.value formState
        }
    )
    |> fieldWithVariants identity (dropdown "Contact")
        ( "E-Mail", emailForm )
        [ ( "Phone number", phoneForm ) ]
        (\\c ->
            case c of
                Email _ ->
                    "E-Mail"

                Phone _ ->
                    "Phone number"
        )

emailForm : Form Contact MyError
emailForm =
    Form.form
        (\\_ html -> html) -- no custom errors to display
        alwaysValid -- no custom validations
        "email-form"
        (\\email ->
            { view = \\formState _ -> email.view formState
            , combine = \\formState -> Email <| email.value formState
            }
        )
        |> field emailOrEmpty (Pico.Form.textInput "E-Mail address")

emailOrEmpty : Contact -> String
emailOrEmpty c =
    case c of
        Email email -> email
        _ -> ""

phoneForm : Form Contact MyError
phoneForm =
    Form.form
        (\\_ html -> html) -- no custom errors to display
        alwaysValid -- no custom validations
        "email-form"
        (\\countryCode number ->
            { view =
                \\formState _ ->
                    [ div [ class "grid" ]
                        [ div [] <| countryCode.view formState
                        , div [] <| number.view formState
                        ]
                    ]
            , combine = \\formState -> Phone 
                { countryCode = (countryCode.value formState)
                , number = (number.value formState)
                }
            }
        )
        |> field (numberDetails >> .countryCode) (Pico.Form.integerInput "Country code")
        |> field (numberDetails >> .number) (Pico.Form.integerInput "Number")

numberDetails : Contact -> { countryCode: Int, number: Int }
numberDetails c =
    case c of
        Email _ -> { countryCode = 0 , number = 0 }
        Phone details-> details
"""


viewCombo : Model -> Html Msg
viewCombo model =
    section [] <|
        List.concat
            [ [ h3 [] [ text "Combinations" ] ]
            , [ markdown """Consider this example """ ]
            , [ accordion [ asButton, class "secondary" ] [ text "View full code" ] [ viewCode True combinedFormCodeStr ] ]
            , render (ForForm ComboForm) combinedForm model.combinedFormState
            ]


combinedForm : Form (List Contact) MyError
combinedForm =
    Form.form
        (\_ html -> html)
        -- no custom errors to display
        alwaysValid
        -- any contact is valid
        "variant-example"
        (\contact ->
            { view = \formState _ -> contact.view formState
            , combine = \formState -> contact.value formState
            }
        )
        |> listField
            contactsWithAddButton
            contactWithRemoveButton
            (Email "")
            identity
            (Form.toWidget variantForm)


contactsWithAddButton addMsg items =
    [ div [] <|
        items
            ++ [ secondaryButton [ onClick addMsg ] [ text "Add contact" ] ]
    ]


contactWithRemoveButton removeMsg input =
    [ article [] <|
        input
            ++ [ footer [] [ secondaryButton [ onClick removeMsg, outline ] [ text "Remove" ] ] ]
    ]


combinedFormCodeStr : String
combinedFormCodeStr =
    """combinedForm : Form (List Contact) MyError combinedForm =
    Form.form
        (\\_ html -> html) -- no custom errors to display
        alwaysValid -- any contact is valid
        "variant-example"
        (\\contact ->
            { view = \\formState _ -> contact.view formState
            , combine = \\formState -> contact.value formState
            }
        )
        |> listField
            contactsWithAddButton
            contactWithRemoveButton
            (Email "")
            identity
            (Form.toWidget variantForm)

contactsWithAddButton addMsg items =
    [ div [] <|
        items
            ++ [ button [ onClick addMsg ] [ text "Add contact" ] ]
    ]
contactWithRemoveButton removeMsg input =
    [ article [] <|
        input
            ++ [ secondaryButton [ onClick removeMsg ] [ text "Remove" ] ]
    ]"""


asLinkExplanation : Html Msg
asLinkExplanation =
    markdown """
Sometimes you need a link element to trigger a change, but you still want it to look like a button.

For this you can use the **TODO**[asButton](https://picocss.com/docs/button) attribute.
"""


viewAccordions : Html Msg
viewAccordions =
    section []
        [ h3 [] [ text "Accordion" ]
        , markdown """
Accordions are sections of content that can be toggled by the user.
They're implemented in Pico as pure HTML, without JavaScript/Elm/state.
"""
        , accordion []
            [ text "Basic accordion" ]
            [ text "Lorem ipsum .."
            , viewCode False """accordion [] 
    [text "Basic accordion"] 
    [text "Lorem ipsum .."
"""
            ]
        , hr
        , accordion [ asButton ]
            [ text "Button variant" ]
            [ text "Lorem ipsum .."
            , viewCode False """accordion [asButton] 
    [text "Basic accordion"] 
    [text "Lorem ipsum .."
"""
            ]
        ]


viewModal : Html Msg
viewModal =
    section []
        [ h3 [] [ text "Modal" ]
        , markdown """
Pico comes with everything you need to provide a beautiful modal UX. This includes 
pretty fade-in animations, proper locking of the viewport and the ability to 
use the escape key to close the modal.

The modal comes with its own lifecyle to support this. It also relies on a small
JS script that you need to include in your HTML to interact with the HTML element.

> The script is in the `picomponent.js` in the packages root. You just need to include it in your Html
> before initializing your Elm app.

Click the button below to check the content of this example modal to see how it works.
"""
        , primaryButton [ onClick ShowModalExample ] [ text "Open modal" ]
        ]


modalExampleCode =
    """
type alias Model = { modalState : ModalState }

init = { modalState = Modal.init }

type Msg = OpenModal | ForModal Modal.Msg

subscriptions model = Modal.subscriptions

update msg model =
    case msg of
        OpenModal ->
            { model | modalState = Modal.open model.modalState }
        ForModal msg ->
            { model 
            | modalState = Modal.update msg model.modalState
            }

view model =
    div []
        [ Modal.view model.modalState [text "modal content"]
        , button [onClick OpenModal] [text "open modal"]
        ]
"""


viewTooltips : Html Msg
viewTooltips =
    section []
        [ h3 [] [ text "Tooltips" ]
        , p [] [ text "Tooltips can be added as `Html.Attribute` to arbitrary elements." ]
        , table []
            []
            [ [ [ text "tooltip on ", a [ href "#", tooltip "I'm a tooltip" ] [ text "a link" ] ]
              , [ viewCode False "a [href \"#\", tooltip \"I'm a tooltip\"] [ text \"tooltip on a link\" ] " ]
              ]
            , [ [ primaryButton [ tooltip "I'm a tooltip" ] [ text "tooltip on a link" ] ]
              , [ viewCode False "primaryButton [tooltip \"I'm a tooltip\"] [ text \"tooltip on a link\" ] " ]
              ]
            ]
        , p [] [ text "Positioning can be controlled by using one of the variants:" ]
        , table []
            []
            [ [ [ em (tooltipRight "I'm a tooltip") [ text "tooltip on the right" ] ]
              , [ viewCode False "em (tooltipRight \"I'm a tooltip\") [ text \"tooltip on the right\" ]" ]
              ]
            , [ [ em (tooltipLeft "I'm a tooltip") [ text "tooltip on the left" ] ]
              , [ viewCode False "em (tooltipLeft \"I'm a tooltip\") [ text \"tooltip on the left\" ]" ]
              ]
            , [ [ em (tooltipBottom "I'm a tooltip") [ text "tooltip on the bottom" ] ]
              , [ viewCode False "em (tooltipBottom \"I'm a tooltip\") [ text \"tooltip on the bottom\" ]" ]
              ]
            ]
        ]


viewLoading : Html Msg
viewLoading =
    section []
        [ h3 [] [ text "Loading" ]
        , markdown "Add the `busy` attribute to any element to show a loading indicator."
        , table []
            []
            [ [ [ span [ busy ] [ text "Generating something" ] ]
              , [ viewCode False "span [busy] [text \"Generating something\"] ]" ]
              ]
            , [ [ secondaryButton [ busy ] [ text "On a button" ] ]
              , [ viewCode False "secondaryButton [busy] [text \"On a button\"] ]" ]
              ]
            ]
        ]


markdown : String -> Html msg
markdown =
    Markdown.toHtml []


type alias HighlightModel =
    { mode : Maybe SH.Highlight
    , start : Int
    , end : Int
    }


codeToHtml : Maybe Int -> String -> HighlightModel -> Html msg
codeToHtml maybeStart str hlModel =
    SH.elm str
        |> Result.map (SH.highlightLines hlModel.mode hlModel.start hlModel.end)
        |> Result.map (SH.toBlockHtml maybeStart)
        |> Result.mapError Parser.deadEndsToString
        |> (\result ->
                case result of
                    Result.Ok a ->
                        a

                    Result.Err x ->
                        text x
           )


viewCode showLineNrs code =
    div
        [ classList [ ( "elmsh", True ), ( "with-line-numbers", showLineNrs ) ] ]
        [ div
            [ class "view-container" ]
            [ Html.Lazy.lazy3 codeToHtml
                (Just 1)
                code
                defaultHighlightModel
            ]
        ]


defaultHighlightModel : HighlightModel
defaultHighlightModel =
    { mode = Nothing
    , start = 0
    , end = 0
    }


githubSvg : Html msg
githubSvg =
    svg
        [ SvgAttr.height "24"
        , SvgAttr.width "24.25"
        , SvgAttr.viewBox "0 0 496 512"
        , SvgAttr.class "icon-github"
        ]
        [ path
            [ SvgAttr.d "M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"
            ]
            []
        ]


elmSvg =
    svg
        [ SvgAttr.height "24"
        , SvgAttr.viewBox "0 0 600 600"
        ]
        [ Svg.polygon
            [ SvgAttr.fill "currentColor"
            , SvgAttr.points "0,20 280,300 0,580"
            ]
            []
        , Svg.polygon
            [ SvgAttr.fill "currentColor"
            , SvgAttr.points "20,600 300,320 580,600"
            ]
            []
        , Svg.polygon
            [ SvgAttr.fill "currentColor"
            , SvgAttr.points "320,0 600,0 600,280"
            ]
            []
        , Svg.polygon
            [ SvgAttr.fill "currentColor"
            , SvgAttr.points "20,0 280,0 402,122 142,122"
            ]
            []
        , Svg.polygon
            [ SvgAttr.fill "currentColor"
            , SvgAttr.points "170,150 430,150 300,280"
            ]
            []
        , Svg.polygon
            [ SvgAttr.fill "currentColor"
            , SvgAttr.points "320,300 450,170 580,300 450,430"
            ]
            []
        , Svg.polygon
            [ SvgAttr.fill "currentColor"
            , SvgAttr.points "470,450 600,320 600,580"
            ]
            []
        ]


picomponentsSvg =
    svg
        [ SvgAttr.height "32"
        , SvgAttr.version "1.1"
        , SvgAttr.viewBox "0 0 27.476 4.1656"
        ]
        [ path
            [ SvgAttr.d "m3.0624 0.10375c-0.050667 0-0.099579 0.009973-0.14625 0.029973-0.043333 0.018667-0.082123 0.045433-0.11679 0.080099-0.033333 0.033333-0.060099 0.073224-0.080099 0.11989-0.019333 0.044-0.028939 0.091445-0.028939 0.14211l-0.00103 0.001034c0 0.050667 0.00997 0.099579 0.029973 0.14625 0.02 0.043333 0.046766 0.082123 0.080099 0.11679 0.034667 0.033333 0.073456 0.060099 0.11679 0.080099 0.046667 0.02 0.095579 0.029973 0.14625 0.029973 0.051333 0 0.098628-0.009973 0.14263-0.029973 0.046667-0.02 0.086557-0.046766 0.11989-0.080099 0.034667-0.034667 0.061433-0.073456 0.080099-0.11679 0.02-0.046667 0.029973-0.095579 0.029973-0.14625 0-0.051333-0.00997-0.099145-0.029973-0.14315-0.01867-0.046667-0.045436-0.086558-0.080103-0.11989-0.033333-0.034667-0.073224-0.061433-0.11989-0.080099-0.044-0.02-0.091295-0.029973-0.14263-0.029973zm3.6277 1.0232c-0.16333 0-0.31454 0.025298-0.45321 0.075965-0.13667 0.051333-0.25502 0.12188-0.35502 0.21188-0.099333 0.088-0.17655 0.19323-0.23255 0.31523-0.056 0.11867-0.084233 0.24773-0.084233 0.38706 0 0.15333 0.028233 0.29295 0.084233 0.41962 0.056 0.124 0.13263 0.23143 0.22996 0.32143 0.099333 0.09 0.21732 0.15907 0.35399 0.20774 0.13667 0.048667 0.28531 0.072864 0.44597 0.072864 0.16267 0 0.31336-0.024198 0.45269-0.072864 0.14067-0.048667 0.26122-0.11679 0.36122-0.20412 0.1-0.09 0.1781-0.19545 0.2341-0.31678 0.058667-0.12467 0.087851-0.26165 0.087851-0.41031s-0.028233-0.2833-0.084233-0.40463c-0.056-0.12467-0.13505-0.231-0.23771-0.31833-0.1-0.09-0.21945-0.15944-0.35812-0.20877-0.13667-0.050667-0.28494-0.075965-0.44494-0.075965zm-5.2788 0.010852c-0.24333 0-0.4359 0.088803-0.57723 0.26614v-0.20826h-0.66095v2.8081h0.66095v-1.1167c0.156 0.16133 0.35098 0.24185 0.58498 0.24185 0.134 0 0.25807-0.025665 0.37207-0.076999 0.11467-0.051333 0.21344-0.12188 0.29611-0.21188 0.084667-0.09 0.15022-0.19486 0.19689-0.3142 0.048667-0.11933 0.072864-0.24876 0.072864-0.38809 0-0.13867-0.024198-0.26831-0.072864-0.38964-0.046-0.122-0.11156-0.22833-0.19689-0.31833-0.085333-0.09-0.18668-0.16054-0.30334-0.21188-0.11467-0.053333-0.23859-0.080099-0.37259-0.080099zm3.405 0c-0.146 0-0.28408 0.025299-0.41342 0.075965-0.12667 0.049333-0.23563 0.11929-0.32763 0.20929-0.093333 0.087333-0.16681 0.19278-0.22014 0.31678-0.053333 0.122-0.080099 0.25751-0.080099 0.40618s0.028233 0.28366 0.084233 0.40566c0.055333 0.11867 0.12939 0.22206 0.22273 0.31006 0.094667 0.084667 0.20305 0.15074 0.32505 0.19741 0.124 0.046667 0.25416 0.069764 0.39016 0.069764 0.14667 0 0.30139-0.035271 0.46406-0.10594v-0.56328c-0.10667 0.085333-0.22224 0.12816-0.34624 0.12816-0.064 0-0.12384-0.011073-0.17984-0.033073s-0.10491-0.052285-0.14625-0.090951c-0.038667-0.042-0.069902-0.089812-0.094569-0.14314-0.022-0.056-0.033073-0.11657-0.033073-0.1819 0-0.068667 0.011073-0.1296 0.033073-0.18294 0.024667-0.056 0.05737-0.10344 0.098703-0.14211 0.041333-0.042 0.088778-0.073752 0.14211-0.095085 0.056-0.022 0.11547-0.032556 0.1788-0.032556 0.11733 0 0.23327 0.03879 0.34727 0.11679v-0.56276c-0.13667-0.068-0.28494-0.10232-0.44494-0.10232zm-2.0831 0.057878v1.8743h0.66198v-1.8743zm3.9569 0.50437c0.058 0 0.11248 0.01144 0.16382 0.034107 0.053333 0.021333 0.099094 0.051251 0.13643 0.089918 0.038667 0.039333 0.068585 0.085678 0.089918 0.13901 0.024667 0.051333 0.036691 0.10618 0.036691 0.16485 0 0.060667-0.012024 0.11772-0.036691 0.17105-0.021333 0.051333-0.051618 0.096577-0.090951 0.13591-0.036667 0.038667-0.08206 0.068951-0.13539 0.090951-0.051333 0.022-0.10582 0.033073-0.16382 0.033073-0.058667 0-0.11462-0.01144-0.16795-0.034107-0.051333-0.021333-0.096577-0.051251-0.13591-0.089918-0.036-0.039333-0.066285-0.084577-0.090951-0.13591-0.021333-0.053333-0.03204-0.11185-0.03204-0.17518h-0.00103c0-0.058667 0.01144-0.11315 0.034107-0.16382 0.024-0.051333 0.053918-0.096577 0.089918-0.13591 0.039333-0.038667 0.084577-0.068951 0.13591-0.090951 0.053333-0.022 0.10928-0.033073 0.16795-0.033073zm-5.4498 0.00775c0.060667 0 0.11662 0.012541 0.16795 0.037207 0.053333 0.021333 0.099311 0.051251 0.13798 0.089918 0.038667 0.039333 0.067851 0.085678 0.087851 0.13901 0.022 0.051333 0.033073 0.10618 0.033073 0.16485 0 0.056-0.012541 0.10953-0.037207 0.1602-0.021333 0.051333-0.051618 0.096577-0.090951 0.13591-0.036667 0.038667-0.080076 0.068951-0.13074 0.090951-0.051333 0.022-0.10618 0.033073-0.16485 0.033073-0.058667 0-0.11513-0.01144-0.16847-0.034107-0.050667-0.024-0.095543-0.053918-0.13488-0.089918-0.038667-0.039333-0.068951-0.084577-0.090951-0.13591-0.022-0.050667-0.033073-0.10567-0.033073-0.16433 0-0.058667 0.011073-0.11315 0.033073-0.16382 0.024-0.054 0.054285-0.10034 0.090951-0.13901 0.039333-0.039333 0.08421-0.069985 0.13488-0.091985 0.051333-0.021333 0.1067-0.03204 0.16537-0.03204z"
            , SvgAttr.stopColor "#000000"
            , SvgAttr.style "-inkscape-stroke:none;font-variation-settings:normal"
            ]
            []
        , path
            [ SvgAttr.d "m24.293 0.63396v0.56173h-0.22014v0.55243h0.22014v1.3219h0.65991v-1.3219h0.37672v-0.55243h-0.37672v-0.56173zm-8.7964 0.493c-0.16333 0-0.31402 0.025298-0.45269 0.075965-0.13667 0.051333-0.25502 0.12188-0.35502 0.21188-0.09933 0.088-0.17706 0.19323-0.23306 0.31523-0.056 0.11867-0.08423 0.24773-0.08423 0.38706 0 0.15333 0.02823 0.29295 0.08423 0.41962 0.056 0.124 0.13263 0.23143 0.22996 0.32143 0.09933 0.09 0.21732 0.15907 0.35399 0.20774 0.13667 0.048667 0.28531 0.072864 0.44597 0.072864 0.16267 0 0.31387-0.024198 0.45321-0.072864 0.14067-0.048667 0.2607-0.11679 0.3607-0.20412 0.1-0.09 0.1781-0.19545 0.2341-0.31678 0.05867-0.12467 0.08785-0.26165 0.08785-0.41031s-0.02772-0.2833-0.08372-0.40463c-0.056-0.12467-0.13556-0.231-0.23823-0.31833-0.1-0.09-0.21894-0.15944-0.3576-0.20877-0.13667-0.050667-0.28546-0.075965-0.44546-0.075965zm4.8985 0c-0.16067 0-0.30579 0.024198-0.43512 0.072864-0.12667 0.046-0.23505 0.11302-0.32505 0.20102-0.09 0.087333-0.15959 0.19425-0.20826 0.32091-0.04867 0.124-0.07287 0.26413-0.07287 0.42013 0 0.15133 0.02567 0.28743 0.077 0.40876 0.05067 0.122 0.12231 0.22723 0.21498 0.31523 0.09533 0.087333 0.2087 0.15546 0.34003 0.20412 0.13133 0.046667 0.27645 0.069764 0.43512 0.069764 0.516 0 0.83858-0.21419 0.96791-0.64286h-0.63976c-0.07267 0.11667-0.18105 0.17518-0.32505 0.17518-0.268 0-0.40205-0.1427-0.40205-0.42737h1.3917v-0.069764c0-0.16333-0.0231-0.30955-0.06976-0.43822-0.046-0.13133-0.11266-0.24213-0.19999-0.3328-0.088-0.089333-0.19528-0.15746-0.32195-0.20412-0.12667-0.048667-0.26885-0.072864-0.42685-0.072864zm6.0638 0c-0.12667 0-0.24209 0.015693-0.34675 0.047026-0.102 0.032-0.1897 0.076877-0.26304 0.13488-0.07333 0.058667-0.12928 0.13068-0.16795 0.21601-0.03867 0.082667-0.0584 0.17646-0.0584 0.28112 0 0.144 0.04041 0.25737 0.12041 0.34003 0.08267 0.08 0.22632 0.14094 0.43098 0.18294 0.06067 0.012 0.10906 0.024174 0.14573 0.036174 0.03867 0.01 0.06785 0.022024 0.08785 0.036691 0.01933 0.012 0.03187 0.026225 0.03721 0.042892 0.0067 0.014667 0.0098 0.034762 0.0098 0.059429 0 0.041333-0.01921 0.075137-0.05788 0.1018-0.03933 0.026667-0.0892 0.039791-0.14986 0.039791-0.166 0-0.3414-0.062988-0.52607-0.18965l-0.24185 0.46768c0.24667 0.144 0.4965 0.21601 0.74983 0.21601 0.13133 0 0.25174-0.01701 0.36174-0.051677 0.10933-0.031333 0.20276-0.076727 0.28009-0.13539 0.078-0.060667 0.13894-0.13473 0.18294-0.22273 0.044-0.087333 0.06615-0.18574 0.06615-0.29508 0-0.14667-0.04488-0.26612-0.13488-0.35812-0.09-0.095333-0.22646-0.16126-0.4098-0.19792l-0.1602-0.036174c-0.03933-0.01-0.06998-0.020557-0.09199-0.032556-0.01933-0.012-0.03297-0.024541-0.04031-0.037207-0.0047-0.014667-0.0067-0.032928-0.0067-0.054261 0-0.042 0.01811-0.074703 0.05478-0.098703 0.03867-0.024667 0.08905-0.037207 0.15038-0.037207 0.11667 0 0.2356 0.031752 0.3576 0.095085l0.22222-0.43099c-0.19467-0.08-0.39537-0.11989-0.60204-0.11989zm-13.337 0.010852c-0.24333 0-0.4359 0.088803-0.57723 0.26614v-0.20826h-0.66095v2.8081h0.66095v-1.1167c0.156 0.16133 0.35098 0.24185 0.58498 0.24185 0.13333 0 0.25741-0.025665 0.37207-0.076999 0.11467-0.051333 0.21344-0.12188 0.29611-0.21188 0.08467-0.09 0.15022-0.19486 0.19689-0.3142 0.04867-0.11933 0.07287-0.24876 0.07287-0.38809 0-0.13867-0.0242-0.26831-0.07287-0.38964-0.046-0.122-0.11156-0.22833-0.19689-0.31833-0.08533-0.09-0.18668-0.16054-0.30334-0.21188-0.11467-0.053333-0.23859-0.080099-0.37259-0.080099zm5.1398 0.018087c-0.12467 0-0.23305 0.019212-0.32505 0.057878-0.09267 0.036667-0.18426 0.11014-0.27492 0.22014v-0.23823h-0.65991v1.8743h0.66095v-1.001c0-0.124 0.02882-0.21926 0.08682-0.28526 0.06133-0.068 0.14794-0.1018 0.25994-0.1018 0.04133 0 0.08064 0.00609 0.11731 0.018087 0.036 0.012667 0.06834 0.033346 0.09767 0.062012 0.034 0.034667 0.05761 0.081011 0.07028 0.13901 0.01467 0.056 0.02171 0.13006 0.02171 0.22273v0.9462h0.66146v-1.1912c0-0.099333-0.01-0.18814-0.02997-0.26614-0.01933-0.078-0.05607-0.14854-0.11007-0.21188-0.06533-0.078-0.14563-0.13747-0.2403-0.1788-0.09267-0.044-0.20457-0.066146-0.3359-0.066146zm4.7889 0c-0.12467 0-0.23305 0.019212-0.32505 0.057878-0.09267 0.036667-0.18389 0.11014-0.27389 0.22014v-0.23823h-0.66198v1.8743h0.66198v-1.001c0-0.124 0.02882-0.21926 0.08682-0.28526 0.06133-0.068 0.14845-0.1018 0.26045-0.1018 0.04133 0 0.07976 0.00609 0.11576 0.018087 0.03667 0.012667 0.06989 0.033346 0.09922 0.062012 0.034 0.034667 0.0571 0.081011 0.06976 0.13901 0.014 0.056 0.02119 0.13006 0.02119 0.22273v0.9462h0.66198v-1.1912c0-0.099333-0.01-0.18814-0.02997-0.26614-0.01933-0.078-0.05607-0.14854-0.11007-0.21188-0.06533-0.078-0.14563-0.13747-0.2403-0.1788-0.09267-0.044-0.20457-0.066146-0.3359-0.066146zm-12.318 0.00723c-0.27467 0-0.48644 0.11799-0.63511 0.35399-0.146-0.23333-0.35814-0.35036-0.63614-0.35036-0.224 0-0.42602 0.086752-0.60669 0.25942v-0.23048h-0.66043v1.8743h0.66095v-0.92502c0-0.099333 0.00755-0.17963 0.022221-0.2403 0.016667-0.064 0.038446-0.1124 0.065113-0.14573 0.029333-0.036667 0.062036-0.060864 0.098703-0.072864 0.036667-0.012667 0.075973-0.01912 0.11731-0.01912 0.048667 0 0.091492 0.00704 0.12816 0.021704 0.036667 0.012667 0.065484 0.037381 0.086817 0.073381 0.024667 0.036667 0.042778 0.08653 0.054778 0.14986 0.012667 0.060667 0.01912 0.13876 0.01912 0.2341v0.92398h0.66095v-0.92398c0-0.30933 0.10596-0.46406 0.3173-0.46406 0.03933 0 0.07555 0.00609 0.10956 0.018087 0.034 0.012667 0.0637 0.035764 0.08837 0.069764 0.02667 0.034 0.04588 0.081445 0.05788 0.14211 0.01533 0.060667 0.02274 0.13876 0.02274 0.2341v0.92398h0.66043v-1.216c0-0.12467-0.01716-0.231-0.05116-0.31833-0.03133-0.088-0.07511-0.15854-0.13178-0.21188-0.05533-0.056-0.12199-0.096257-0.19999-0.12092-0.078-0.026667-0.16108-0.039791-0.24908-0.039791zm9.6796 0.39068c0.09733 0 0.18042 0.028233 0.24908 0.084233 0.068 0.056 0.11339 0.13006 0.13539 0.22273h-0.75603c0.01667-0.098 0.05656-0.17353 0.11989-0.22686 0.066-0.053333 0.14967-0.080099 0.25167-0.080099zm-4.916 0.14625c0.058 0 0.113 0.01144 0.16433 0.034107 0.05333 0.021333 0.09858 0.051251 0.13591 0.089918 0.03867 0.039333 0.06858 0.085678 0.08992 0.13901 0.02467 0.051333 0.03721 0.10618 0.03721 0.16485 0 0.060667-0.01254 0.11772-0.03721 0.17105-0.02133 0.051333-0.05162 0.096577-0.09095 0.13591-0.03667 0.038667-0.08154 0.068951-0.13488 0.090951-0.05133 0.022-0.10633 0.033073-0.16433 0.033073-0.05867 0-0.11462-0.01144-0.16795-0.034107-0.05133-0.021333-0.09658-0.051251-0.13591-0.089918-0.036-0.039333-0.06629-0.084577-0.09095-0.13591-0.022-0.053333-0.03307-0.11185-0.03307-0.17518 0-0.058667 0.01144-0.11315 0.03411-0.16382 0.024-0.051333 0.05392-0.096577 0.08992-0.13591 0.03933-0.038667 0.08458-0.068951 0.13591-0.090951 0.05333-0.022 0.10928-0.033073 0.16795-0.033073zm-2.5456 0.00775c0.06067 0 0.11662 0.012541 0.16795 0.037207 0.05333 0.021333 0.09931 0.051251 0.13798 0.089918 0.03867 0.039333 0.06785 0.085678 0.08785 0.13901 0.022 0.051333 0.03307 0.10618 0.03307 0.16485 0 0.056-0.01254 0.10953-0.03721 0.1602-0.02133 0.051333-0.05162 0.096577-0.09095 0.13591-0.03667 0.038667-0.08008 0.068951-0.13074 0.090951-0.05133 0.022-0.10618 0.033073-0.16485 0.033073-0.05867 0-0.11513-0.01144-0.16847-0.034107-0.05133-0.024-0.09621-0.053918-0.13488-0.089918-0.03867-0.039333-0.06895-0.084577-0.09095-0.13591-0.022-0.050667-0.03307-0.10567-0.03307-0.16433 0-0.058667 0.01107-0.11315 0.03307-0.16382 0.024-0.054 0.05428-0.10034 0.09095-0.13901 0.03867-0.039333 0.08354-0.069985 0.13488-0.091985 0.05133-0.021333 0.1067-0.03204 0.16537-0.03204z"
            , SvgAttr.fill "none"
            , SvgAttr.stopColor "#000000"
            , SvgAttr.stroke "var(--pico-primary)"
            , SvgAttr.strokeWidth ".1"
            ]
            []
        ]


moonSvg =
    svg
        [ SvgAttr.width "32"
        , SvgAttr.height "32"
        , SvgAttr.viewBox "0 0 32 32"
        , SvgAttr.fill "currentColor"
        , SvgAttr.class "icon-theme-toggle  moon"
        ]
        [ Svg.clipPath
            [ SvgAttr.id "theme-toggle-cutout"
            ]
            [ path
                [ SvgAttr.d "M0-11h25a1 1 0 0017 13v30H0Z"
                ]
                []
            ]
        , Svg.g
            [ SvgAttr.clipPath "url(#theme-toggle-cutout)"
            ]
            [ Svg.circle
                [ SvgAttr.cx "16"
                , SvgAttr.cy "16"
                , SvgAttr.r "8.4"
                ]
                []
            , path
                [ SvgAttr.d "M18.3 3.2c0 1.3-1 2.3-2.3 2.3s-2.3-1-2.3-2.3S14.7.9 16 .9s2.3 1 2.3 2.3zm-4.6 25.6c0-1.3 1-2.3 2.3-2.3s2.3 1 2.3 2.3-1 2.3-2.3 2.3-2.3-1-2.3-2.3zm15.1-10.5c-1.3 0-2.3-1-2.3-2.3s1-2.3 2.3-2.3 2.3 1 2.3 2.3-1 2.3-2.3 2.3zM3.2 13.7c1.3 0 2.3 1 2.3 2.3s-1 2.3-2.3 2.3S.9 17.3.9 16s1-2.3 2.3-2.3zm5.8-7C9 7.9 7.9 9 6.7 9S4.4 8 4.4 6.7s1-2.3 2.3-2.3S9 5.4 9 6.7zm16.3 21c-1.3 0-2.3-1-2.3-2.3s1-2.3 2.3-2.3 2.3 1 2.3 2.3-1 2.3-2.3 2.3zm2.4-21c0 1.3-1 2.3-2.3 2.3S23 7.9 23 6.7s1-2.3 2.3-2.3 2.4 1 2.4 2.3zM6.7 23C8 23 9 24 9 25.3s-1 2.3-2.3 2.3-2.3-1-2.3-2.3 1-2.3 2.3-2.3z"
                ]
                []
            ]
        ]


sunSvg =
    svg
        [ SvgAttr.width "24"
        , SvgAttr.height "24"
        , SvgAttr.viewBox "0 0 32 32"
        , SvgAttr.fill "currentColor"
        , SvgAttr.class "icon-theme-toggle "
        ]
        [ Svg.clipPath
            [ SvgAttr.id "theme-toggle-cutout"
            ]
            [ path
                [ SvgAttr.d "M0-11h25a1 1 0 0017 13v30H0Z"
                ]
                []
            ]
        , Svg.g
            [ SvgAttr.clipPath "url(#theme-toggle-cutout)"
            ]
            [ Svg.circle
                [ SvgAttr.cx "16"
                , SvgAttr.cy "16"
                , SvgAttr.r "8.4"
                ]
                []
            , path
                [ SvgAttr.d "M18.3 3.2c0 1.3-1 2.3-2.3 2.3s-2.3-1-2.3-2.3S14.7.9 16 .9s2.3 1 2.3 2.3zm-4.6 25.6c0-1.3 1-2.3 2.3-2.3s2.3 1 2.3 2.3-1 2.3-2.3 2.3-2.3-1-2.3-2.3zm15.1-10.5c-1.3 0-2.3-1-2.3-2.3s1-2.3 2.3-2.3 2.3 1 2.3 2.3-1 2.3-2.3 2.3zM3.2 13.7c1.3 0 2.3 1 2.3 2.3s-1 2.3-2.3 2.3S.9 17.3.9 16s1-2.3 2.3-2.3zm5.8-7C9 7.9 7.9 9 6.7 9S4.4 8 4.4 6.7s1-2.3 2.3-2.3S9 5.4 9 6.7zm16.3 21c-1.3 0-2.3-1-2.3-2.3s1-2.3 2.3-2.3 2.3 1 2.3 2.3-1 2.3-2.3 2.3zm2.4-21c0 1.3-1 2.3-2.3 2.3S23 7.9 23 6.7s1-2.3 2.3-2.3 2.4 1 2.4 2.3zM6.7 23C8 23 9 24 9 25.3s-1 2.3-2.3 2.3-2.3-1-2.3-2.3 1-2.3 2.3-2.3z"
                ]
                []
            ]
        ]
