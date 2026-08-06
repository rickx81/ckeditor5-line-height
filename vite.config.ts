import type { ViteUserConfig } from 'vitest/config'
import { extname, isAbsolute, resolve } from 'node:path'
import { translations } from '@ckeditor/ckeditor5-dev-build-tools'
import svg from 'vite-plugin-svgo'
import { defineConfig, mergeConfig } from 'vitest/config'
import pkgJson from './package.json' with { type: 'json' }

/**
 * This configuration file uses Vite's "mode" to differentiate between different builds. By default,
 * only the shared configuration is used (dev server + common plugins).
 *
 * However, when "--mode npm" is passed to Vite, the configuration for building the package
 * for npm is merged in. Similarly, when "--mode browser" is used, the configuration for
 * building the browser bundles is merged in.
 */
export default defineConfig(({ mode }) => {
  const entry = resolve(import.meta.dirname, 'src/index.ts')

  function externals(externalPackages: Record<string, string>): (id: string) => boolean {
    const externals = Object.keys(externalPackages)
    const extensions = ['.ts', '.mts', '.mjs', '.js', '.json', '.node']

    return (id: string) => {
      // Bundle relative and absolute imports.
      if (id.startsWith('.') || isAbsolute(id)) {
        return false
      }

      // Don't bundle imports that exactly match the `external` list.
      if (externals.includes(id)) {
        return true
      }

      const packageName = id
        .split('/')
        .slice(0, id.startsWith('@') ? 2 : 1)
        .join('/')

      const extension = extname(id)

      // Don't bundle, unless the import has non-JS or non-TS file extension (for example `.css`).
      return externals.includes(packageName) && (!extension || extensions.includes(extension))
    }
  }

  /**
   * Configuration shared between all builds.
   */
  const sharedConfig: ViteUserConfig = {
    root: resolve(import.meta.dirname, 'sample'),
    plugins: [
      svg(),
    ],

    build: {
      emptyOutDir: false,
      target: 'es2022',
    },
  }

  /**
   * Settings specific to the npm build (ESM).
   */
  const npmConfig: ViteUserConfig = {
    plugins: [
      translations({
        source: '**/*.po',
      }),
    ],
    build: {
      minify: false,
      outDir: resolve(import.meta.dirname, 'dist'),
      lib: {
        entry,
        formats: ['es'],
        cssFileName: 'index',
        fileName: (format: string, name: string) => `${name}.js`,
      },
      rolldownOptions: {
        external: externals({
          ...pkgJson.dependencies,
          ...pkgJson.peerDependencies,
        }),
      },
    },
  }

  /**
   * Settings specific to the browser builds (ESM and UMD).
   */
  const browserConfig: ViteUserConfig = {
    build: {
      minify: true,
      outDir: resolve(import.meta.dirname, 'dist/browser'),
      lib: {
        entry,
        name: 'CKLineHeight',
        formats: ['es', 'umd'],
        cssFileName: 'index',
        fileName: (format: string, name: string) => `${name}.${format}.js`,
      },
      rolldownOptions: {
        external: externals(pkgJson.peerDependencies),
        output: {
          codeSplitting: false,
          globals: {
            ckeditor5: 'CKEDITOR',
          },
        },
      },
    },
  }

  // Map of available build settings.
  const BUILD_SETTINGS: Record<string, ViteUserConfig> = {
    npm: npmConfig,
    browser: browserConfig,
  }

  return mergeConfig(
    sharedConfig,
    BUILD_SETTINGS[mode] || {},
  )
})
