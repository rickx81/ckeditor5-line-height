import { expect } from 'chai'

import { LineHeight as LineHeightDll, icons } from '../src/index.js'
import LineHeight from '../src/lineheight.js'

import lineHeightIcon from './../theme/icons/line-height.svg'

describe('CKEditor5 LineHeight DLL', () => {
  it('exports LineHeight', () => {
    expect(LineHeightDll).to.equal(LineHeight)
  })

  describe('icons', () => {
    it('exports the "lineHeight" icon', () => {
      expect(icons.lineHeight).to.equal(lineHeightIcon)
    })
  })
})
