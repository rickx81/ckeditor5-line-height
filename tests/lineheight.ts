import { ClassicEditor } from 'ckeditor5'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'

import { LineHeight, LineHeightEditing, LineHeightUI } from '../src/index.js'

describe('LineHeight', () => {
  it('requires LineHeightEditing & LineHeightUI', () => {
    expect(LineHeight.requires).to.deep.equal([LineHeightEditing, LineHeightUI])
  })

  it('should be named', () => {
    expect(LineHeight.pluginName).to.equal('LineHeight')
  })

  describe('init()', () => {
    let domElement: HTMLElement, editor: ClassicEditor

    beforeEach(async () => {
      domElement = document.createElement('div')
      document.body.appendChild(domElement)

      editor = await ClassicEditor.create(domElement, {
        licenseKey: 'GPL',
        plugins: [
          LineHeight,
        ],
        toolbar: [
          'lineHeight',
        ],
      })
    })

    afterEach(() => {
      domElement.remove()
      return editor.destroy()
    })

    it('should be named', () => {
      expect(LineHeight.pluginName).to.equal('LineHeight')
    })

    it('should load LineHeight', () => {
      expect(editor.plugins.get('LineHeight')).to.be.an.instanceof(LineHeight)
    })

    it('should register UI components', () => {
      expect(editor.ui.componentFactory.has('lineHeight')).to.equal(true)
      expect(editor.ui.componentFactory.has('menuBar:lineHeight')).to.equal(true)
    })
  })
})
