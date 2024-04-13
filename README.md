# Picomponents

[Package Docs](https://package.elm-lang.org/packages/axelerator/picomponents/latest) | [Documentation](https://blog.axelerator.de/picomponents) | [Starter Code Template](https://github.com/axelerator/picomponents-starter) | [Starter Demo](https://blog.axelerator.de/picomponents-starter)

Picomponents is a UI component library using the brilliant [pico CSS framework](https://picocss.com).

> Pico.css is a Minimal CSS Framework for Semantic HTML. 

Pico requires extremely little custom markup for a Html page to look beautiful to begin with.
So _picomponents_ really just provides a collection of helper functions to make the Elm code
that constructs the DOM more concise while having the output look beautiful.

It also provides customized widgets for the [FancyForms](https://blog.axelerator.de/fancy-forms/) library
to enable you to create beautiful forms _efficiently_ and _type safe_.

## Design goals/decisions

- Only add helpers _where helpful_. We're not implementing **all** of Pico as custom helpers since a lot is based on
    semantic HTML which can already efficiently be constructed with Elm core functions.
- **Except** for very frequently used elements! We make exceptions for elements like `primaryButton` and `br` that we
    think are used often enough to warrant a helper that just saves a few characters.
- Try to avoid extra dependencies/tooling
    Users should not have to install `npm` or have to run extra buildsteps to get going. 
    (We do have one static JS file with a webcomponent that you have to include though 😓)



