#!/usr/bin/env node
import { createRequire } from 'node:module'
import process from 'node:process'
import upath from 'upath'
import chalk from 'chalk'
import { build } from '@ckeditor/ckeditor5-dev-build-tools'

function dist(path) {
  return upath.join('dist', path)
}

(async () => {
  const tsconfig = 'tsconfig.dist.ckeditor5.json'

  /**
   * Step 1
   */
  console.log(chalk.cyan('1/2: Generating NPM build...'))

  const require = createRequire(import.meta.url)
  const pkg = require(upath.resolve(process.cwd(), './package.json'))

  await build({
    input: 'src/index.ts',
    output: dist('./index.js'),
    tsconfig: 'tsconfig.dist.json',
    external: [
      'ckeditor5',
      'ckeditor5-premium-features',
      ...Object.keys({
        ...pkg.dependencies,
        ...pkg.peerDependencies,
      }),
    ],
    clean: true,
    sourceMap: true,
    declarations: true,
    translations: '**/*.po',
  })

  /**
   * Step 2
   */
  console.log(chalk.cyan('2/2: Generating browser build...'))

  await build({
    output: dist('browser/index.js'),
    tsconfig,
    sourceMap: true,
    minify: true,
    browser: true,
    name: '@rickx/ckeditor5-line-height',
    external: [
      'ckeditor5',
      'ckeditor5-premium-features',
    ],
  })
})()
