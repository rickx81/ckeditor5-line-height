import { defineConfig } from 'vitest/config'
import svg from 'vite-plugin-svgo'

export default defineConfig({
  plugins: [
    svg(),
  ],
  test: {
    browser: {
      enabled: true,
      name: 'chrome',
      provider: 'webdriverio',
      providerOptions: {},
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