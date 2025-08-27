import type { DowncastAttributeDescriptor } from 'ckeditor5'

export interface LineHeightConfig {
  /**
   * The default value is:
   *
   * ```ts
   * const lineHeightConfig = {
   *   options: ['default', 1, 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 2, 2.5]
   * };
   * ```
   *
   * As an alternative, the line-height might be defined using numerical values (either as a `Number` or as a `String`):
   *
   * ```ts
   * const lineHeightConfig = {
   *   options: ['default', '10px', 2, '150%', '8em']
   * };
   * ```
   *
   * Also, you can define a label in the dropdown for each line-height option and customize how it will be rendered in the view:
   *
   * ```ts
   * const lineHeightConfig = {
   *   options: [
   *     'default',
   *     {
   *       title: 'Normal',
   *       model: '1',
   *     },
   *     {
   *        title: 'Custom Title',
   *        model: '48px'
   *     },
   *     {
   *       title: 'Double',
   *       model: 'double',
   *       view: {
   *         key: 'style',
   *         value: { 'line-height': '200%' },
   *       },
   *     },
   *     {
   *       title: 'Triple',
   *       model: 'triple',
   *       view: {
   *         key: 'class',
   *         value: ['line-height-triple', 'triple'],
   *       },
   *     },
   *   ]
   * };
   * ```
   *
   * Line height can be applied using the command API.
   * To do that, use the `'lineHeight'` command and pass the desired line-height as a `value`.
   *
   * ```ts
   * // For numerical values:
   * editor.execute('lineHeight', { value: 2 })
   * // For named presets:
   * editor.execute('lineHeight', { value: 'double' })
   * ```
   *
   * Executing the `lineHeight` command without value will remove the `lineHeight` attribute from the current selection.
   *
   * ```ts
   * editor.execute('lineHeight')
   * ```
   */
  options?: (string | number | LineHeightOption)[]

  /**
   * By default, all `line-height` values that are not specified in the `config.lineHeight.options` are stripped.
   * You can enable support for all line heights by using the `config.lineHeight.supportAllValues` option.
   *
   * You can preserve pasted line height values by switching the `supportAllValues` option to `true`:
   *
   * ```ts
   * const lineHeightConfig = {
   *   options: ['default', 1, 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 2, 2.5],
   *   supportAllValues: true
   * };
   * ```
   *
   * With this configuration line heights not specified in the editor configuration will not be removed when pasting the content.
   */
  supportAllValues?: boolean
}

export interface LineHeightOption {
  /**
   * The user-readable title of the option.
   */
  title: string

  /**
   * The attribute's unique value in the model.
   */
  model?: string

  /**
   * View element configuration.
   */
  view?: DowncastAttributeDescriptor
}
