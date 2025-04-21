import CKEditorInspector from '@ckeditor/ckeditor5-inspector'
import {
  Autoformat,
  Base64UploadAdapter,
  BlockQuote,
  Bold,
  ClassicEditor,
  Code,
  CodeBlock,
  Essentials,
  Heading,
  Image,
  ImageCaption,
  ImageStyle,
  ImageToolbar,
  ImageUpload,
  Indent,
  Italic,
  Link,
  List,
  MediaEmbed,
  Paragraph,
  Table,
  TableToolbar,
} from 'ckeditor5'

import coreTranslations from 'ckeditor5/translations/zh-cn.js'

import LineHeight from '../src/lineheight.js'
// eslint-disable-next-line antfu/no-import-dist
import lineHeightTranslations from '../dist/translations/zh-cn.js'

import 'ckeditor5/ckeditor5.css'

declare global {
  interface Window {
    editor: ClassicEditor
  }
}

ClassicEditor
  .create(document.getElementById('editor')!, {
    plugins: [
      LineHeight,
      Essentials,
      Autoformat,
      BlockQuote,
      Bold,
      Heading,
      Image,
      ImageCaption,
      ImageStyle,
      ImageToolbar,
      ImageUpload,
      Indent,
      Italic,
      Link,
      List,
      MediaEmbed,
      Paragraph,
      Table,
      TableToolbar,
      CodeBlock,
      Code,
      Base64UploadAdapter,
    ],
    toolbar: [
      'undo',
      'redo',
      '|',
      'lineHeight',
      '|',
      'heading',
      '|',
      'bold',
      'italic',
      'link',
      'code',
      'bulletedList',
      'numberedList',
      '|',
      'outdent',
      'indent',
      '|',
      'uploadImage',
      'blockQuote',
      'insertTable',
      'mediaEmbed',
      'codeBlock',
    ],
    licenseKey: 'GPL',
    language: 'zh-CN',
    translations: [
      coreTranslations,
      lineHeightTranslations,
    ],
    lineHeight: {
      options: [
        'default',
        '10px',
        2,
        '150%',
        '8em',
        {
          model: '48px',
          title: 'Custom Title',
        },
      ],
      supportAllValues: true,
    },
    image: {
      toolbar: [
        'imageStyle:inline',
        'imageStyle:block',
        'imageStyle:side',
        '|',
        'imageTextAlternative',
      ],
    },
    table: {
      contentToolbar: [
        'tableColumn',
        'tableRow',
        'mergeTableCells',
      ],
    },
  })
  .then((editor) => {
    window.editor = editor
    CKEditorInspector.attach(editor)
    window.console.log('CKEditor 5 is ready.', editor)
  })
  .catch((err) => {
    window.console.error(err.stack)
  })
