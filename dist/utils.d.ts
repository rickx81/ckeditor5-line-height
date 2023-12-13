import type { AttributeDescriptor } from '@ckeditor/ckeditor5-engine';
import type { AttributeCreatorFunction } from '@ckeditor/ckeditor5-engine/src/conversion/downcasthelpers';
import type { ArrayOrItem, PriorityString } from '@ckeditor/ckeditor5-utils';
import type { LineHeightOption } from './lineheightconfig';
/**
 * The name of the lineHeight plugin.
 */
export declare const LINE_HEIGHT = "lineHeight";
export declare function normalizeOptions(configuredOptions: Array<string | number>): LineHeightOption[];
export declare function buildDefinition(modelAttributeKey: string, options: string[]): LineHeightConverterDefinition;
export type LineHeightConverterDefinition<T extends string = string> = {
    model: string | {
        key: string;
        name?: string;
    };
    view: string | (AttributeDescriptor & {
        name?: string;
    });
    upcastAlso?: ArrayOrItem<string | (AttributeDescriptor & {
        name?: string;
    }) | AttributeCreatorFunction>;
    converterPriority?: PriorityString;
} | {
    model: {
        key: string;
        name?: string;
        values: Array<T>;
    };
    view: Record<T, (AttributeDescriptor & {
        name?: string;
    })>;
    upcastAlso?: Record<T, (AttributeDescriptor & {
        name?: string;
    }) | AttributeCreatorFunction>;
    converterPriority?: PriorityString;
};
