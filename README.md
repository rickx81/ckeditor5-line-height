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

Use it in your application:

```js
import { LineHeight } from '@rickx/ckeditor5-line-height'
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
        1.2,
        1.5,
        'default',
        '14px',
        '16px',
        '18px',
        {
          title: 'Normal',
          model: '1',
        },
        {
          title: 'Huge',
          model: '36px'
        },
      ],
    },
    toolbar: [
      /* ..., */
      'lineHeight', // add the button to your toolbar
    ],
  })
  .then(/* ... */)
  .catch(/* ... */)
```

## License

Licensed under the terms of [GNU General Public License Version 2 or later](http://www.gnu.org/licenses/gpl.html).
