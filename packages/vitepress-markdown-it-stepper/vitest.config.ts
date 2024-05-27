import { defineProject } from 'vitest/config'

export default defineProject({
  test: {
    name: 'vitepress-markdown-it-stepper',
    isolate: false,
    mockReset: true,
    restoreMocks: true,
    unstubGlobals: true,
    environment: 'node',
    pool: 'threads',
    poolOptions: {
      threads: {
        singleThread: true,
      },
    },
  },
})
