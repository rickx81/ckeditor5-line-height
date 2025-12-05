import { describe, expect, it } from 'vitest'

import { LineHeight as LineHeightDll } from '../src/index.js'
import LineHeight from '../src/lineheight.js'

describe('CKEditor5 LineHeight DLL', () => {
  it('exports LineHeight', () => {
    expect(LineHeightDll).to.equal(LineHeight)
  })
})
