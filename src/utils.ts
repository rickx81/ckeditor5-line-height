import type { DowncastAttributeDescriptor } from 'ckeditor5'

import type { LineHeightOption } from './lineheightconfig.js'

/**
 * The name of the lineHeight plugin.
 */
export const LINE_HEIGHT = 'lineHeight'

function getOptionDefinition(option: string | number | LineHeightOption): LineHeightOption {
  // Check whether passed option is a full item definition provided by user in configuration.
  if (typeof option === 'object' && isFullItemDefinition(option))
    return option

  // 'Default' lineHeight. It will be used to remove the lineHeight attribute.
  if (option === 'default') {
    return {
      model: undefined,
      title: 'Default',
    }
  }

  return generatePreset(option)
}

function generatePreset(definition: string | number | LineHeightOption): LineHeightOption {
  if (typeof definition !== 'object') {
    definition = {
      title: String(definition),
      model: String(definition),
    }
  }

  return {
    title: definition.title,
    model: definition.model,
  }
}

export function normalizeOptions(configuredOptions: (string | number | LineHeightOption)[]): LineHeightOption[] {
  return configuredOptions
    .map(item => getOptionDefinition(item))
    .filter(option => !!option)
}

export function buildDefinition(modelAttributeKey: string, options: LineHeightOption[]): LineHeightConverterDefinition {
  const definition: LineHeightConverterDefinition = {
    model: {
      key: modelAttributeKey,
      values: [],
    },
    view: {},
  }

  for (const option of options) {
    if (option.view) {
      definition.model.values.push(option.model!)
      definition.view[option.model!] = option.view
    }
    else {
      definition.model.values.push(option.model!)
      definition.view[option.model!] = {
        key: 'style',
        value: `line-height:${option.model!};`,
      }
    }
  }

  return definition
}

/**
 * We treat `definition` as completed if it is an object that contains `title`, `model` and `view` values.
 */
function isFullItemDefinition(definition: Record<string, any>): boolean {
  return definition.title && definition.model && definition.view
}

export interface LineHeightConverterDefinition {
  model: {
    key: string
    values: Array<string>
  }
  view: Record<string, DowncastAttributeDescriptor>
}
