import { webdriverio } from '@vitest/browser-webdriverio'
import svg from 'vite-plugin-svgo'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [
    svg(),
  ],
  test: {
    dir: import.meta.dirname,
    include: [
      'tests/**/*.[jt]s',
    ],
    browser: {
      enabled: true,
      instances: [
        { browser: 'chrome' },
      ],
      provider: webdriverio(),
      headless: true,
      ui: false,
    },
    globals: true,
    watch: false,
    coverage: {
      allowExternal: true,
      thresholds: {
        lines: 100,
        functions: 100,
        branches: 100,
        statements: 100,
      },
      provider: 'istanbul',
      include: [
        'src/**/*.[jt]s',
      ],
    },
  },
})
