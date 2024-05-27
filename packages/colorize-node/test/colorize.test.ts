import { describe, expect, it } from 'vitest'
import { colorize } from '../src'

/**
 * The tests are based on picocolors:
 * https://github.com/alexeyraspopov/picocolors/blob/main/tests/test.js
 */

const COLORS = {
  reset: ['\x1b[0m', '\x1b[0m'],
  bold: ['\x1b[1m', '\x1b[22m'],
  dim: ['\x1b[2m', '\x1b[22m'],
  italic: ['\x1b[3m', '\x1b[23m'],
  underline: ['\x1b[4m', '\x1b[24m'],
  blink: ['\x1b[5m', '\x1b[25m'],
  inverse: ['\x1b[7m', '\x1b[27m'],
  hidden: ['\x1b[8m', '\x1b[28m'],
  strikethrough: ['\x1b[9m', '\x1b[29m'],
  doubleunderline: ['\x1b[21m', '\x1b[24m'],
  black: ['\x1b[30m', '\x1b[39m'],
  red: ['\x1b[31m', '\x1b[39m'],
  green: ['\x1b[32m', '\x1b[39m'],
  yellow: ['\x1b[33m', '\x1b[39m'],
  blue: ['\x1b[34m', '\x1b[39m'],
  magenta: ['\x1b[35m', '\x1b[39m'],
  cyan: ['\x1b[36m', '\x1b[39m'],
  white: ['\x1b[37m', '\x1b[39m'],
  bgBlack: ['\x1b[40m', '\x1b[49m'],
  bgRed: ['\x1b[41m', '\x1b[49m'],
  bgGreen: ['\x1b[42m', '\x1b[49m'],
  bgYellow: ['\x1b[43m', '\x1b[49m'],
  bgBlue: ['\x1b[44m', '\x1b[49m'],
  bgMagenta: ['\x1b[45m', '\x1b[49m'],
  bgCyan: ['\x1b[46m', '\x1b[49m'],
  bgWhite: ['\x1b[47m', '\x1b[49m'],
  framed: ['\x1b[51m', '\x1b[54m'],
  overlined: ['\x1b[53m', '\x1b[55m'],
  gray: ['\x1b[90m', '\x1b[39m'],
  redBright: ['\x1b[91m', '\x1b[39m'],
  greenBright: ['\x1b[92m', '\x1b[39m'],
  yellowBright: ['\x1b[93m', '\x1b[39m'],
  blueBright: ['\x1b[94m', '\x1b[39m'],
  magentaBright: ['\x1b[95m', '\x1b[39m'],
  cyanBright: ['\x1b[96m', '\x1b[39m'],
  whiteBright: ['\x1b[97m', '\x1b[39m'],
  bgGray: ['\x1b[100m', '\x1b[49m'],
  bgRedBright: ['\x1b[101m', '\x1b[49m'],
  bgGreenBright: ['\x1b[102m', '\x1b[49m'],
  bgYellowBright: ['\x1b[103m', '\x1b[49m'],
  bgBlueBright: ['\x1b[104m', '\x1b[49m'],
  bgMagentaBright: ['\x1b[105m', '\x1b[49m'],
  bgCyanBright: ['\x1b[106m', '\x1b[49m'],
  bgWhiteBright: ['\x1b[107m', '\x1b[49m'],
}

describe('colorize test', () => {
  it('should match colors', () => {
    for (let format in COLORS) {
      expect(
        colorize[format]('string'),
        `${COLORS[format][0]}string${COLORS[format][1]}`
      )
    }
  })

  it('should wrap properly', () => {
    expect(
      colorize.red(colorize.bold('==TEST==')),
      `${COLORS.red[0]}${COLORS.bold[0]}==TEST==${COLORS.bold[1]}${COLORS.red[1]}`
    )
  })

  it('should wrap complex cases properly', () => {
    expect(
      colorize.bold(
        colorize.yellow(colorize.bgRed(colorize.italic('==TEST==')))
      ),
      `${COLORS.bold[0]}${COLORS.yellow[0]}${COLORS.bgRed[0]}${COLORS.italic[0]}==TEST==${COLORS.italic[1]}${COLORS.bgRed[1]}${COLORS.yellow[1]}${COLORS.bold[1]}`
    )

    expect(
      colorize.cyan(colorize.bold(colorize.underline('==TEST=='))),
      `${COLORS.cyan[0]}${COLORS.bold[0]}${COLORS.underline[0]}==TEST==${COLORS.underline[1]}${COLORS.bold[1]}${COLORS.cyan[1]}`
    )
  })

  it('should ThrowError using non-string input', () => {
    // @ts-expect-error: Expected 1 arguments, but got 0.ts(2554)
    expect(colorize.red(), `${COLORS.red[0]}undefined${COLORS.red[1]}`)
    expect(colorize.red(undefined), `${COLORS.red[0]}undefined${COLORS.red[1]}`)
    expect(colorize.red(0), `${COLORS.red[0]}0${COLORS.red[1]}`)
    expect(colorize.red(NaN), `${COLORS.red[0]}NaN${COLORS.red[1]}`)
    expect(colorize.red(null), `${COLORS.red[0]}null${COLORS.red[1]}`)
    // @ts-expect-error: Argument of type 'true' is not assignable to parameter of type 'string | number | null | undefined'.ts(2345)
    expect(colorize.red(true), `${COLORS.red[0]}true${COLORS.red[1]}`)
    // @ts-expect-error: Argument of type 'false' is not assignable to parameter of type 'string | number | null | undefined'.ts(2345)
    expect(colorize.red(false), `${COLORS.red[0]}false${COLORS.red[1]}`)
    expect(colorize.red(Infinity), `${COLORS.red[0]}Infinity${COLORS.red[1]}`)
  })
})
