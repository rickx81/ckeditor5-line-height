import type { MatcherPattern, ViewElementDefinition } from '@ckeditor/ckeditor5-engine';
import type { ArrayOrItem } from '@ckeditor/ckeditor5-utils';
import type { LineHeightOption } from './lineheightconfig';
/**
 * The name of the lineHeight plugin.
 */
export declare const LINE_HEIGHT = "lineHeight";
export declare function normalizeOptions(configuredOptions: Array<string | number | LineHeightOption>): Array<LineHeightOption>;
export declare function buildDefinition(modelAttributeKey: string, options: LineHeightOption[]): LineHeightConverterDefinition;
export interface LineHeightConverterDefinition {
    model: {
        key: string;
        values: Array<string>;
    };
    view: Record<string, ViewElementDefinition>;
    upcastAlso: Record<string, ArrayOrItem<MatcherPattern>>;
}
