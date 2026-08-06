# CKEditor 5 Plugin Package

This is a CKEditor 5 plugin package generated using [ckeditor5-package-generator](https://ckeditor.com/docs/ckeditor5/latest/framework/develpment-tools/package-generator/using-package-generator.html), providing a `LineHeight` plugin. When asked to implement or extend functionality, **modify the existing plugin files** under `src/` rather than creating a new plugin alongside it. The plugin is already split into the standard Editing/UI glue structure (see below).

## Commands

| Command | Purpose |
|---------|---------|
| `pnpm start` | Start Vite dev server — opens `sample/index.html` with the editor and CKEditor Inspector |
| `pnpm test` | Run Vitest tests in headless Chrome (browser mode). **100% coverage enforced on `src/`** (lines/functions/branches/statements) |
| `pnpm test:debug` | Run tests with non-headless browser + inspector, for debugging |
| `pnpm lint` / `pnpm lint:fix` | Run ESLint / run ESLint with `--fix` |
| `pnpm build` | Full build = `build:types` (tsc declarations via `tsconfig.build.json`) + `build:npm` (ESM bundle) + `build:browser` (ESM + UMD). Build mode is selected via Vite's `--mode` flag (see `vite.config.ts`) |
| `pnpm translations:synchronize` | Sync translation files from `lang/contexts.json` |
| `pnpm translations:validate` | Validate translation files without writing (CI check) |

## Project Structure

```
src/
  index.ts              — Package entry point. Re-exports all plugins, the `icons` map, and the `LINE_HEIGHT` constant; side-effect imports augmentation.
  lineheight.ts         — Glue plugin (LineHeight): `requires` LineHeightEditing + LineHeightUI.
  lineheightediting.ts  — Schema rules + upcast/downcast converters for the lineHeight attribute; registers the command.
  lineheightcommand.ts  — Command that applies/removes the lineHeight model attribute on the selection.
  lineheightui.ts       — Toolbar dropdown UI + menubar integration; builds options from config.
  lineheightconfig.ts   — Types for `config.lineHeight` (options, supportAllValues, etc.).
  utils.ts              — Shared constants/helpers (e.g. `LINE_HEIGHT` model attribute name).
  augmentation.ts       — TypeScript module augmentation. `declare module '@ckeditor/ckeditor5-core'` to extend `EditorConfig`, `PluginsMap`, and `CommandsMap`.
tests/
  *.ts                  — Vitest tests, one file per src module (lineheight, lineheightcommand, lineheightediting, lineheightui, index).
sample/
  index.html            — Dev page with editor content.
  index.ts              — Dev editor setup with full plugin set + CKEditor Inspector.
theme/
  icons/                — SVG icons (imported as strings in plugin files via vite-plugin-svgo).
lang/
  contexts.json         — Translation context descriptions (keys = translatable strings).
  translations/         — Generated `.po` translation files.
ckeditor5-metadata.json — Plugin metadata for tooling/integrators.
vite.config.ts          — Build + test config. Vite `--mode` selects: default (dev/test) | npm (ESM bundle) | browser (ESM+UMD).
tsconfig.json           — Type-checking config for dev (bundler resolution, noEmit).
tsconfig.build.json     — Emit config used by `build:types`.
scripts/
  synchronize-translations.js — Backing script for `translations:synchronize` / `translations:validate`.
```

## Coding Conventions

**TypeScript.** All source is `.ts`. The CKEditor docs tutorials are in plain JS — adapt the patterns to TypeScript when following them.

**Internal imports use `.js` extensions.** Because `verbatimModuleSyntax: true` is set, every relative import must end with `.js` (e.g. `import X from './utils.js'`) and type-only imports must use `import type`. Importing without the extension will fail type-checking.

**Finish by verifying the package.** After implementing changes, run `pnpm test` (100% coverage is enforced — new code needs tests), `pnpm lint`, and `pnpm build`.

**Use `'ckeditor5'` for all CKEditor imports.** Do NOT import from individual `@ckeditor/*` packages in plugin source. The one exception is the type augmentation file (`augmentation.ts`), which must `declare module '@ckeditor/ckeditor5-core'` to extend `PluginsMap`, `CommandsMap`, and `EditorConfig`.

**Editing / UI split (for complex features).** Split into `MyFeatureEditing` (schema, converters, commands) + `MyFeatureUI` (toolbar buttons, dropdowns) + a glue `MyFeature` plugin:
```ts
export default class MyFeature extends Plugin {
  public static get pluginName() {
    return 'MyFeature' as const
  }

  public static get requires() {
    return [MyFeatureEditing, MyFeatureUI] as const
  }
}
```

**Event listeners in plugins.** Use `this.listenTo( emitter, event, callback )` instead of `emitter.on()`. Listeners registered with `listenTo` are automatically removed when the plugin is destroyed; `on()` listeners leak.

**Translations.** Use `editor.t('Label')` for user-visible strings. Add the string as a key in `lang/contexts.json` with a description for translators. Run `pnpm translations:synchronize` after editing `contexts.json` to regenerate the `.po` files under `lang/translations/`.

**Build system.** Builds are driven by a single `vite.config.ts` that branches on Vite's `--mode`: default mode runs the dev server / Vitest; `--mode npm` emits the ESM npm bundle to `dist/`; `--mode browser` emits minified ESM + UMD to `dist/browser/`. All three modes share the same plugin set (svgo, translations). Don't hand-edit `dist/` — it is a build artifact (gitignored).

## This Plugin's Specifics

- **Model attribute.** The line height is stored as a model attribute named by the `LINE_HEIGHT` constant in `src/utils.ts` (currently `'lineHeight'`), applied on block elements. Refer to this constant rather than hardcoding the string.
- **Public exports.** `src/index.ts` exports `LineHeight` (default glue), `LineHeightEditing`, `LineHeightUI`, the `LineHeightCommand` type, the `LineHeightConfig` type, the `icons` map, and `LINE_HEIGHT`. Keep new public API exported here so integrators can reach it.
- **Configuration.** `config.lineHeight` is typed by `LineHeightConfig` in `src/lineheightconfig.ts`: `options` (string / number / `{ title, model?, view? }`) and `supportAllValues`. See the file's JSDoc for examples.
- **UI surfaces.** `LineHeightUI` registers both the `'lineHeight'` toolbar dropdown and the menu bar entry — when changing the UI, check both registration paths.

## Documentation Links

### Crash Course (recommended reading order)
1. [Plugins](https://ckeditor.com/docs/ckeditor5/latest/framework/tutorials/crash-course/plugins.html) — what plugins are, registering a custom one
2. [Model and schema](https://ckeditor.com/docs/ckeditor5/latest/framework/tutorials/crash-course/model-and-schema.html) — model structure, schema rules
3. [Data conversion](https://ckeditor.com/docs/ckeditor5/latest/framework/tutorials/crash-course/data-conversion.html) — upcast, downcast, conversion helpers
4. [Commands](https://ckeditor.com/docs/ckeditor5/latest/framework/tutorials/crash-course/commands.html) — creating commands to modify the model
5. [UI](https://ckeditor.com/docs/ckeditor5/latest/framework/tutorials/crash-course/ui.html) — creating toolbar buttons and other UI components
6. [Events and keystrokes](https://ckeditor.com/docs/ckeditor5/latest/framework/tutorials/crash-course/events-and-keystrokes.html) — event system, keyboard shortcuts
7. [Plugin configuration](https://ckeditor.com/docs/ckeditor5/latest/framework/tutorials/crash-course/plugin-configuration.html) — making plugins configurable
8. [All tutorials](https://ckeditor.com/docs/ckeditor5/latest/framework/tutorials/index.html)

### Step-by-step Plugin Tutorials
- [Creating a basic plugin (timestamp)](https://ckeditor.com/docs/ckeditor5/latest/framework/tutorials/creating-simple-plugin-timestamp.html) — beginner-friendly, inserts text on button click
- Abbreviation plugin (3-part advanced tutorial):
  - [Part 1: Defining model and view](https://ckeditor.com/docs/ckeditor5/latest/framework/tutorials/abbreviation-plugin/abbreviation-plugin-level-1.html) — schema, upcast/downcast converters
  - [Part 2: Handling user input](https://ckeditor.com/docs/ckeditor5/latest/framework/tutorials/abbreviation-plugin/abbreviation-plugin-level-2.html) — balloon UI, forms
  - [Part 3: Commands and expanded UI](https://ckeditor.com/docs/ckeditor5/latest/framework/tutorials/abbreviation-plugin/abbreviation-plugin-level-3.html) — commands, toggle behavior

### Architecture
- [Plugins in CKEditor 5](https://ckeditor.com/docs/ckeditor5/latest/framework/architecture/plugins.html) — plugin types, packaging, HTML output
- [Core editor architecture — Plugins](https://ckeditor.com/docs/ckeditor5/latest/framework/architecture/core-editor-architecture.html#plugins) — `requires`, `init()`, `afterInit()`
- [Editing engine](https://ckeditor.com/docs/ckeditor5/latest/framework/architecture/editing-engine.html) — model, view, controller in depth
- [Conversion deep dive](https://ckeditor.com/docs/ckeditor5/latest/framework/deep-dive/conversion/intro.html) — advanced conversion topics

### API Reference
- [PluginInterface](https://ckeditor.com/docs/ckeditor5/latest/api/module_core_plugin-PluginInterface.html) — lifecycle methods
- [Framework overview](https://ckeditor.com/docs/ckeditor5/latest/framework/index.html)
- [Full API documentation](https://ckeditor.com/docs/ckeditor5/latest/api/index.html)
