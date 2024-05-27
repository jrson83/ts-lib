import { inspect } from 'node:util'

const colors = inspect.colors
const stdout = process.stdout

const noColorSupport = stdout.isTTY && !stdout.hasColors()

// biome-ignore lint/suspicious/noConstEnum: removed during compilation
const enum Colors {
  reset,
  bold,
  dim,
  italic,
  underline,
  blink,
  inverse,
  hidden,
  strikethrough,
  doubleunderline,
  black,
  red,
  green,
  yellow,
  blue,
  magenta,
  cyan,
  white,
  bgBlack,
  bgRed,
  bgGreen,
  bgYellow,
  bgBlue,
  bgMagenta,
  bgCyan,
  bgWhite,
  framed,
  overlined,
  gray,
  redBright,
  greenBright,
  yellowBright,
  blueBright,
  magentaBright,
  cyanBright,
  whiteBright,
  bgGray,
  bgRedBright,
  bgGreenBright,
  bgYellowBright,
  bgBlueBright,
  bgMagentaBright,
  bgCyanBright,
  bgWhiteBright,
}

type Colorize = {
  [k in keyof typeof Colors]: (
    input: string | number | null | undefined
  ) => string
}

const colorize = Object.fromEntries(
  Object.entries(colors).map(([color, code]) => [
    color,
    (str) => {
      if (noColorSupport || !code) return str
      return `\x1b[${code[0]}m${str}\x1b[${code[1]}m`
    },
  ])
) as Colorize

export { colorize }
