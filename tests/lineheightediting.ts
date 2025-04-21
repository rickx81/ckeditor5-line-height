import type { Model } from 'ckeditor5'
import { describe, expect, it, beforeEach, afterEach } from 'vitest'
import { ClassicEditor, Paragraph, _getModelData, _setModelData } from 'ckeditor5'

import { LineHeightEditing } from '../src/index.js'

describe('LineHeight', () => {
  let domElement: HTMLElement,
    editor: ClassicEditor

  beforeEach(async () => {
    domElement = document.createElement('div')
    document.body.appendChild(domElement)

    editor = await ClassicEditor.create(domElement, {
      licenseKey: 'GPL',
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

        expect(editor.config.get('lineHeight.supportAllValues')).to.equal(false)
      })
    })

    describe('supportAllValues = true', () => {
      let domElement: HTMLElement,
        editor: ClassicEditor,
        model: Model

      beforeEach(async () => {
        domElement = document.createElement('div')
        document.body.appendChild(domElement)

        editor = await ClassicEditor.create(domElement, {
          licenseKey: 'GPL',
          plugins: [LineHeightEditing, Paragraph],
          lineHeight: {
            options: ['default'],
            supportAllValues: true,
          },
        })
        model = editor.model
      })

      afterEach(() => {
        domElement.remove()
        return editor.destroy()
      })

      describe('editing pipeline conversion', () => {
        it('should convert unknown lineHeight attribute values', () => {
          _setModelData(model, '<paragraph lineHeight="foo-bar">foo</paragraph>')

          expect(editor.getData()).to.equal('<p style="line-height:foo-bar;">foo</p>')
        })

        it('should convert defined lineHeight attribute values', () => {
          _setModelData(model, '<paragraph lineHeight="24pt">foo</paragraph>')

          expect(editor.getData()).to.equal('<p style="line-height:24pt;">foo</p>')
        })
      })

      describe('data pipeline conversions', () => {
        it('should convert from an element with defined style when with other styles', () => {
          const data = '<p style="line-height:24pt;font-size: 18px">foo</p>'

          editor.setData(data)

          expect(_getModelData(model)).to.equal('<paragraph lineHeight="24pt">[]foo</paragraph>')

          expect(editor.getData()).to.equal('<p style="line-height:24pt;">foo</p>')
        })

        it('should convert from a nested element', () => {
          const data = '<p style="line-height:24pt">f<span><span><span><span>o</span></span></span></span>o</p>'

          editor.setData(data)

          expect(_getModelData(model)).to.equal('<paragraph lineHeight="24pt">[]foo</paragraph>')

          expect(editor.getData()).to.equal('<p style="line-height:24pt;">foo</p>')
        })
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
        licenseKey: 'GPL',
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
