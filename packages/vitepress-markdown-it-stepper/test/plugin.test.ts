import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import MarkdownIt from 'markdown-it'
import { describe, expect, it } from 'vitest'

import { type MarkdownItStepperOptions, markdownItStepper } from '../src'

const cwd = process.cwd()
const resolvePath = (file: string) =>
  resolve(
    cwd,
    'packages',
    'vitepress-markdown-it-stepper',
    'test',
    'fixtures',
    file
  )

function createProcessor(options?: MarkdownItStepperOptions) {
  return MarkdownIt().use<MarkdownItStepperOptions>(markdownItStepper, options)
}

describe('vitepressPluginMarkdownItStepper', () => {
  it('renders empty string', () => {
    const data = createProcessor().render(
      readFileSync(resolvePath('empty.md'), { encoding: 'utf8' })
    )
    expect(data).toMatchSnapshot()
  })

  it('renders single container with title & custom options', () => {
    const data = createProcessor({
      wrapperTagName: 'section',
      wrapperClassName: 'my-wrapper-class',
      titleTagName: 'div',
      titleClassName: 'my-title-class',
    }).render(
      readFileSync(resolvePath('single-title.md'), { encoding: 'utf8' })
    )
    expect(data).toMatchSnapshot()
  })

  it('renders single container without title', () => {
    const data = createProcessor().render(
      readFileSync(resolvePath('single.md'), { encoding: 'utf8' })
    )
    expect(data).toMatchSnapshot()
  })

  it('renders single container with title', () => {
    const data = createProcessor().render(
      readFileSync(resolvePath('single-title.md'), { encoding: 'utf8' })
    )
    expect(data).toMatchSnapshot()
  })

  it('renders multiple containers without titles', () => {
    const data = createProcessor().render(
      readFileSync(resolvePath('multiple.md'), { encoding: 'utf8' })
    )
    expect(data).toMatchSnapshot()
  })

  it('renders multiple containers with titles', () => {
    const data = createProcessor().render(
      readFileSync(resolvePath('multiple-title.md'), { encoding: 'utf8' })
    )
    expect(data).toMatchSnapshot()
  })

  it('renders multiple containers with & without titles', () => {
    const data = createProcessor().render(
      readFileSync(resolvePath('multiple-both.md'), { encoding: 'utf8' })
    )
    expect(data).toMatchSnapshot()
  })

  it('renders nested containers without titles', () => {
    const data = createProcessor().render(
      readFileSync(resolvePath('nested.md'), { encoding: 'utf8' })
    )
    expect(data).toMatchSnapshot()
  })

  it('renders nested containers with titles', () => {
    const data = createProcessor().render(
      readFileSync(resolvePath('nested-title.md'), { encoding: 'utf8' })
    )
    expect(data).toMatchSnapshot()
  })
})
