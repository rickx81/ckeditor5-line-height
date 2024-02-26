/**
 * @license Copyright (c) 2003-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

'use strict'

/* eslint-env node */

const process = require('node:process')
const { builds } = require('@ckeditor/ckeditor5-dev-utils')
const webpack = require('webpack')

const config = builds.getDllPluginWebpackConfig(webpack, {
  themePath: require.resolve('@ckeditor/ckeditor5-theme-lark'),
  packagePath: __dirname,
  manifestPath: require.resolve('ckeditor5/build/ckeditor5-dll.manifest.json'),
  isDevelopmentMode: process.argv.includes('--mode=development'),
  tsconfigPath: require.resolve('./tsconfig.json'),
})

config.output.filename = 'line-height.js'

module.exports = config
