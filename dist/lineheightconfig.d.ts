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
     *   options: [1, 1.5, 2, '14px', '16px', '18px', '20px', '22px', '24px']
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
     *        title: 'Huge',
     *        model: '36px'
     *     },
     *   ]
     * };
     * ```
     *
     * Font size can be applied using the command API. To do that, use the `'lineHeight'` command and pass the desired line-height as a `value`.
     * For example, the following code will apply the `lineHeight` attribute with the **tiny** value to the current selection:
     *
     * ```ts
     * editor.execute( 'lineHeight', { value: 1.5 } );
     * ```
     *
     * Executing the `lineHeight` command without value will remove the `lineHeight` attribute from the current selection.
     */
    options?: (string | number | LineHeightOption)[];
}
export interface LineHeightOption {
    /**
     * The user-readable title of the option.
     */
    title: string;
    /**
     * The attribute's unique value in the model.
     */
    model?: string;
}
