import type { AttributeDescriptor } from 'ckeditor5/src/engine';
import type { LineHeightOption } from './lineheightconfig';
/**
 * The name of the lineHeight plugin.
 */
export declare const LINE_HEIGHT = "lineHeight";
export declare function normalizeOptions(configuredOptions: (string | number | LineHeightOption)[]): LineHeightOption[];
export declare function buildDefinition(modelAttributeKey: string, options: LineHeightOption[]): LineHeightConverterDefinition;
export interface LineHeightConverterDefinition {
    model: {
        key: string;
        values: Array<string>;
    };
    view: Record<string, AttributeDescriptor>;
}
