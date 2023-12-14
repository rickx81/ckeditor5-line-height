import { resolve } from 'node:path'
import fs from 'fs-extra'

async function updatePackageEntryPoint() {
  const filePath = resolve('./package.json')
  const pkgJson = await fs.readJson(filePath)
  const { main } = pkgJson

  if (!main)
    return

  pkgJson.main = main.replace('src/index.ts', 'dist/index.js')

  return fs.writeJson(filePath, pkgJson, { encoding: 'UTF-8', spaces: 2 })
}

(async function () {
  console.log('update start')
  await updatePackageEntryPoint()
  console.log('update done')
})()
