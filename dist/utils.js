/**
 * The name of the lineHeight plugin.
 */
export const LINE_HEIGHT = 'lineHeight';
function getOptionDefinition(option) {
    if (typeof option === 'object')
        return option;
    // 'Default' lineHeight. It will be used to remove the lineHeight attribute.
    if (option === 'default') {
        return {
            model: undefined,
            title: 'Default',
        };
    }
    return generatePreset(option);
}
function generatePreset(size) {
    const sizeStr = String(size);
    return {
        title: sizeStr,
        model: sizeStr,
        view: {
            name: 'span',
            styles: {
                'line-height': sizeStr,
            },
            priority: 5,
        },
    };
}
export function normalizeOptions(configuredOptions) {
    return configuredOptions
        .map(getOptionDefinition)
        .filter(option => !!option);
}
export function buildDefinition(modelAttributeKey, options) {
    const definition = {
        model: {
            key: modelAttributeKey,
            values: [],
        },
        view: {},
        upcastAlso: {},
    };
    for (const option of options) {
        definition.model.values.push(option);
        definition.view[option] = {
            key: 'style',
            value: {
                'line-height': option,
            },
        };
    }
    return definition;
}
