import { expect } from 'chai'
import { ClassicEditor } from 'ckeditor5'

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

    it('should load LineHeight', () => {
      const myPlugin = editor.plugins.get('LineHeight')

      expect(myPlugin).to.be.an.instanceof(LineHeight)
    })

    it('should add an icon to the toolbar', () => {
      expect(editor.ui.componentFactory.has('lineHeight')).to.equal(true)
    })
  })
})
