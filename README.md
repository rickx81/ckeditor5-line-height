@rickx/ckeditor5-line-height
============================

This package was created by the [ckeditor5-package-generator](https://www.npmjs.com/package/ckeditor5-package-generator) package.
# ckeditor5-line-height

The line height plugin for ckeditor5.

## Quick start

First, install the build from npm:

```bash
pnpm i @rickx/ckeditor5-line-height
# or
yarn add @rickx/ckeditor5-line-height
# or
npm i @rickx/ckeditor5-line-height
```

### [How to use your plugin in new installation methods?](https://ckeditor.com/docs/ckeditor5/latest/updating/nim-migration/custom-plugins.html#how-to-use-your-plugin-in-new-installation-methods)

Use it in your application:

```ts
// Importing ClassicEditor
import { ClassicEditor } from 'ckeditor5'

// Importing the plugin code.
import { LineHeight } from '@rickx/ckeditor5-line-height'

// Optionally importing the translations.
import lineHeightTranslations from '@rickx/ckeditor5-line-height/translations/zh-cn.js'
```

Add it to your editor:

```js
ClassicEditor
  .create(document.querySelector('#editor'), {
    plugins: [
      /* ..., */
      LineHeight, // add it to your plugins array
    ],
    lineHeight: {
      // specify your otions in the lineHeight config object.
      // Default values are ['default', 1, 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 2, 2.5]
      options: [
        'default',
        '10px',
        2,
        '150%',
        '8em',
        {
          title: 'Custom Title',
          model: '48px',
        },
      ],
    },
    toolbar: [
      /* ..., */
      'lineHeight', // add the button to your toolbar
    ],
    transitions: [
      /* ..., */
      lineHeightTranslations, // line-height translations
    ]
  })
  .then(/* ... */)
  .catch(/* ... */)
```

## License

The `@rickx/ckeditor5-line-height` package is available under [MIT license](https://opensource.org/licenses/MIT).
