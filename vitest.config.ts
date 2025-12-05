import { webdriverio } from '@vitest/browser-webdriverio'
import svg from 'vite-plugin-svgo'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [
    svg(),
  ],
  test: {
    browser: {
      enabled: true,
      instances: [
        { browser: 'chrome' },
      ],
      provider: webdriverio(),
      headless: true,
      ui: false,
    },
    include: [
      'tests/**/*.[jt]s',
    ],
    globals: true,
    watch: false,
    coverage: {
      thresholds: {
        lines: 100,
        functions: 100,
        branches: 100,
        statements: 100,
      },
      provider: 'istanbul',
      include: [
        'src',
      ],
    },
  },
})
