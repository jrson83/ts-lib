# vitepress-markdown-it-stepper

> Display content divided into a steps sequence

## Installation

```sh
npm install --save-dev vitepress-markdown-it-stepper
```

## Usage

Register the markdown parsing plugin in `.vitepress/config.ts`

```ts
// .vitepress/config.ts or .vitepress/config.js
import { markdownItStepper } from 'vitepress-markdown-it-stepper'

export default {
  // ...
  markdown: {
    // ...
    config: (md) => {
      md.use(markdownItStepper)
    }
  }
}
```

Introduce the `stepper` style in `.vitepress/theme/index.ts`

```ts
// .vitepress/theme/index.ts or .vitepress/theme/index.js
import DefaultTheme from 'vitepress/theme'
import './custom.css'

// Add the following line of code to introduce the stepper style
import 'vitepress-markdown-it-stepper/theme'

export default {
  extends: DefaultTheme,
  enhanceApp(ctx) {
    Theme.enhanceApp(ctx)
  }
}
```

### Syntax

With this plugin you can create stepper containers with an optional `title` like:

```md
# Heading

::: stepper
Paragraph

- List item #1
- List item #2
:::

::: stepper This is a title
Another paragraph

- Another list item #1
- Another list item #2
:::
```

Outputs:

```html
<h1>Heading</h1>
<div class='stepper'>
  <div class='stepper-content'>
    <p>Paragraph</p>
    <ul>
      <li>List item #1</li>
      <li>List item #2</li>
    </ul>
  </div>
</div>
<div class='stepper'>
  <span class='stepper-title'>This is a title</span>
  <div class='stepper-content'>
    <p>Another paragraph</p>
    <ul>
      <li>Another list item #1</li>
      <li>Another list item #2</li>
    </ul>
  </div>
</div>
```

#### Nesting

Nestings can be done by increasing marker number `:` of outer container. Notice this example is just taken from the tests and would make more sense when using e.g. `code-blocks`.

```md
# Heading

:::: stepper This is a title
Paragraph

- List item #1
- List item #2

::: stepper This is another title
Nested paragraph

- Nested list item #1
- Nested list item #2
:::
::::
```

Outputs:

```html
<h1>Heading</h1>
<div class='stepper'>
  <span class='stepper-title'>This is a title</span>
  <div class='stepper-content'>
    <p>Paragraph</p>
    <ul>
      <li>List item #1</li>
      <li>List item #2</li>
    </ul>
    <div class='stepper'>
      <span class='stepper-title'>This is another title</span>
      <div class='stepper-content'>
        <p>Nested paragraph</p>
        <ul>
          <li>Nested list item #1</li>
          <li>Nested list item #2</li>
        </ul>
      </div>
    </div>
  </div>
</div>
```

### Styling

#### How to change styling

Override the [default styles](https://github.com/jrson83/ts-lib/blob/main/packages/vitepress-plugin-stepper/theme/stepper.css) or use the options to specify your own css classes.

#### Counter

To make the counter work, any parent element needs `counter-reset: section;` e.g. is added by default:

```css
body {
  counter-reset: section;
}
```

#### Last Step

To hide the last step vertical stripe add a step with empty content:

```md
::: stepper Can have a title
:::
```

#### Move content

To move additional classes left on specific screen width extend the media queries:

```css
@media only screen and (max-width: 768px) {
  /** add more styles */
  .stepper .card,
  /** default moves left */
  .stepper-content .vp-code-group {
    margin-left: -3rem;
  }
}
```

## API

- This package exports no identifiers or default export.
- The named export is `markdownItStepper`.

### `MarkdownIt().use<MarkdownItStepperOptions>(markdownItStepper,options?)`

#### `options`

Configuration (optional).

##### `options.wrapperTagName`

The wrapper Element `tagName`. (`string`, default: `div`).

##### `options.wrapperClassName`

The wrapper Element `class`. (`string`, default: `stepper`).

##### `options.titleTagName`

The title Element `tagName`. (`string`, default: `span`).

##### `options.titleClassName`

The title Element `class`. (`string`, default: `stepper-title`).

##### `options.contentTagName`

The content Element `tagName`. (`string`, default: `div`).

##### `options.contentClassName`

The content Element `class`. (`string`, default: `stepper-content`).

## Types

This package is fully typed with [TypeScript](https://www.typescriptlang.org/).
The additional interface `MarkdownItStepperOptions` is exported.

## Inspired by

- [supabase.com](https://supabase.com/) - Superbase.com docs
- [vitepress-markdown-timeline](https://github.com/HanochMa/vitepress-markdown-timeline) - Uses markdown to render timeline.

## License

Licensed under the [MIT license](https://github.com/jrson83/ts-lib/blob/main/packages/vitepress-markdown-it-stepper/LICENSE).
