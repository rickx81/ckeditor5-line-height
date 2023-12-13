import type { MatcherPattern, ViewElementDefinition } from '@ckeditor/ckeditor5-engine';
export interface LineHeightConfig {
    options?: string[];
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
    /**
     * View element configuration.
     */
    view?: ViewElementDefinition;
    /**
     * An array with all matched elements that the view-to-model conversion should also accept.
     */
    upcastAlso?: Array<MatcherPattern>;
}
