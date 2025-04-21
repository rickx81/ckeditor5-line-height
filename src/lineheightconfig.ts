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
   *   options: ['default', '10px', 2, '150%', '8em', { title: 'Custom Title', model: '48px' }]
   * };
   * ```
   *
   * Also, you can define a label in the dropdown for numerical values:
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
   *   ]
   * };
   * ```
   *
   * Line height can be applied using the command API. To do that, use the `'lineHeight'` command and pass the desired line-height as a `value`.
   * For example, the following code will apply the `lineHeight` attribute with the **tiny** value to the current selection:
   *
   * ```ts
   * editor.execute('lineHeight', { value: 1.5 });
   * ```
   *
   * Executing the `lineHeight` command without value will remove the `lineHeight` attribute from the current selection.
   */
  options?: (string | number | LineHeightOption)[]

  /**
   * By default the plugin removes any `line-height` value that does not match the plugin's configuration.
   * It means that if you paste content with line heights that the editor does not understand, the `line-height` attribute
   * will be removed and the content will be displayed with the default height.
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
}
