import type { Model } from 'ckeditor5'
import { expect } from 'chai'
import { ClassicEditor, Paragraph, _getModelData, _setModelData } from 'ckeditor5'

import { LineHeightEditing } from '../src/index.js'

describe('LineHeight', () => {
  let domElement: HTMLElement,
    editor: ClassicEditor

  beforeEach(async () => {
    domElement = document.createElement('div')
    document.body.appendChild(domElement)

    editor = await ClassicEditor.create(domElement, {
      plugins: [LineHeightEditing, Paragraph],
    })
  })

  afterEach(() => {
    domElement.remove()
    return editor.destroy()
  })

  describe('config', () => {
    describe('default value', () => {
      it('should be set', () => {
        expect(editor.config.get('lineHeight.options')).to.deep.equal(['default', 1, 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 2, 2.5])
      })
    })
  })

  describe('editing pipeline conversion', () => {
    let domElement: HTMLElement,
      editor: ClassicEditor,
      model: Model

    beforeEach(async () => {
      domElement = document.createElement('div')
      document.body.appendChild(domElement)

      editor = await ClassicEditor.create(domElement, {
        plugins: [LineHeightEditing, Paragraph],
        lineHeight: {
          options: [
            'default',
            '10px',
            2,
            '150%',
            '8em',
            {
              model: '48px',
              title: 'Huge',
            },
          ],
        },
      })
      model = editor.model
    })

    afterEach(() => {
      domElement.remove()
      return editor.destroy()
    })

    describe('convert different options', () => {
      it('should pass pixel lineHeight to data', () => {
        _setModelData(model, '<paragraph lineHeight="10px">[]foo</paragraph>')

        expect(editor.getData()).to.equal('<p style="line-height:10px;">foo</p>')
      })

      it('should pass number lineHeight to data', () => {
        _setModelData(model, '<paragraph lineHeight="2">[]foo</paragraph>')

        expect(editor.getData()).to.equal('<p style="line-height:2;">foo</p>')
      })

      it('should pass percentage lineHeight to data', () => {
        _setModelData(model, '<paragraph lineHeight="150%">[]foo</paragraph>')

        expect(editor.getData()).to.equal('<p style="line-height:150%;">foo</p>')
      })

      it('should pass em lineHeight to data', () => {
        _setModelData(model, '<paragraph lineHeight="8em">[]foo</paragraph>')

        expect(editor.getData()).to.equal('<p style="line-height:8em;">foo</p>')
      })
    })

    describe('data pipeline conversions', () => {
      it('should convert from an element with defined style when with other styles', () => {
        const data = '<p style="line-height:10px;">foo</p>'

        editor.setData(data)

        expect(_getModelData(model)).to.equal('<paragraph lineHeight="10px">[]foo</paragraph>')
        expect(editor.getData()).to.equal(data)
      })

      it('should convert from complex definition', () => {
        const data = '<p style="line-height:10px;">foo</p>'
          + '<p style="line-height:2;">foo</p>'
          + '<p style="line-height:150%;">foo</p>'
          + '<p style="line-height:8em;">foo</p>'

        editor.setData(data)

        expect(_getModelData(model)).to.equal(
          '<paragraph lineHeight="10px">[]foo</paragraph>'
          + '<paragraph lineHeight="2">foo</paragraph>'
          + '<paragraph lineHeight="150%">foo</paragraph>'
          + '<paragraph lineHeight="8em">foo</paragraph>',
        )

        expect(editor.getData()).to.equal(data)
      })
    })
  })
})
