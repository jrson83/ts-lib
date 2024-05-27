# colorize-node

![npm](https://img.shields.io/npm/v/colorize-node)
![node-current](https://img.shields.io/node/v/colorize-node)
![npm package minimized gzipped size (select exports)](https://deno.bundlejs.com/?q=colorize-node&badge=detailed)

> A lightweight library to color Node.js terminal output.

- ✅ Zero dependencies
- ✅ TypeScript support
- ✅ Node.js v18.12.0+ support
- ✅ **3x** smaller then `picocolors`

## Installation

```sh
npm install --save-dev colorize-node
```

## Usage

```js
// use named export, no default export
import { colorize } from 'colorize-node'

colorize.red('This string is red')

colorize.green(colorize.bold('This string is green & bold'))

colorize.bgGreen(`This string has green background and ${colorize.bold('this string is bold')}`)
```

## Supported colors

Uses modifiers, foreground & background colors from nodes `util.inspect.colors`.

Taken from the [Node.js docs](https://nodejs.org/api/util.html#customizing-utilinspect-colors):

| Foreground colors | Background colors | Modifiers       |
| ----------------- | ----------------- | --------------- |
| black             | bgBlack           | reset           |
| red               | bgRed             | bold            |
| green             | bgGreen           | italic          |
| yellow            | bgYellow          | underline       |
| blue              | bgBlue            | strikethrough   |
| magenta           | bgMagenta         | hidden          |
| cyan              | bgCyan            | dim             |
| white             | bgWhite           | overlined       |
| gray              | bgGray            | blink           |
| redBright         | bgRedBright       | inverse         |
| greenBright       | bgGreenBright     | doubleunderline |
| yellowBright      | bgYellowBright    | framed          |
| blueBright        | bgBlueBright      |                 |
| magentaBright     | bgMagentaBright   |                 |
| cyanBright        | bgCyanBright      |                 |
| whiteBright       | bgWhiteBright     |                 |

## License

Licensed under the [MIT license](https://github.com/jrson83/ts-lib/blob/main/packages/colorize-node/LICENSE).

The `colorize.test.ts` file bundles portions of [picocolors (ISC License)](https://github.com/alexeyraspopov/picocolors).
