import type MarkdownIt from 'markdown-it'
import container from 'markdown-it-container'
import type { RenderRule } from 'markdown-it/lib/renderer.mjs'

export interface MarkdownItStepperOptions {
  /** The wrapper Element `tagName`. defaults to `div` */
  wrapperTagName?: string

  /** The wrapper Element `class`. defaults to `stepper` */
  wrapperClassName?: string

  /** The title Element `tagName`. defaults to `span` */
  titleTagName?: string

  /** The title Element `class`. defaults to `stepper-title` */
  titleClassName?: string

  /** The content Element `tagName`. defaults to `div` */
  contentTagName?: string

  /** The content Element `class`. defaults to `stepper-content` */
  contentClassName?: string
}

function markdownItStepper(
  md: MarkdownIt,
  options: MarkdownItStepperOptions = {}
): void {
  const opts: MarkdownItStepperOptions = {
    wrapperTagName: 'div',
    wrapperClassName: 'stepper',
    titleTagName: 'span',
    titleClassName: 'stepper-title',
    contentTagName: 'div',
    contentClassName: 'stepper-content',
    ...options,
  }

  createContainer(md, opts)
}

function createContainer(md: MarkdownIt, options: MarkdownItStepperOptions) {
  md.use(container, 'stepper', {
    validate(params) {
      return !!params.trim().match(/^stepper\s*(.*)$/)
    },
    render(tokens, idx) {
      const m = tokens[idx]?.info.trim().match(/^stepper\s*(.*)$/)
      if (tokens[idx]?.nesting === 1) {
        const title = m && m.length > 1 ? m[1] : undefined
        return (
          `<${options.wrapperTagName} class='${options.wrapperClassName}'>\n` +
          (title
            ? `<${options.titleTagName} class='${options.titleClassName}'>${title}</${options.titleTagName}>\n`
            : '') +
          `<${options.contentTagName} class='${options.contentClassName}'>\n`
        )
      } else {
        return (
          `</${options.contentTagName}>\n` + `</${options.wrapperTagName}>\n`
        )
      }
    },
  } satisfies { render: RenderRule; validate: (params: string) => boolean })
}

export { markdownItStepper }
