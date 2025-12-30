import type { PropDefinition } from './ButtonProps';

export const textProps: PropDefinition[] = [
  {
    name: 'size',
    type: 'string',
    description: 'Predefined text size from theme (e.g., "xs", "sm", "md", "lg", "xl")',
    default: "'md'",
    required: false,
  },
  {
    name: 'color',
    type: 'string',
    description: 'Text color - can be a theme color name (e.g., "blue", "red") or any valid color string',
    default: 'theme.light.text',
    required: false,
  },
  {
    name: 'white',
    type: 'boolean',
    description: 'Sets text color to white, useful for dark backgrounds',
    default: 'false',
    required: false,
  },
  {
    name: 'bold',
    type: 'boolean',
    description: 'Applies bold font weight using theme font family',
    default: 'false',
    required: false,
  },
  {
    name: 'semiBold',
    type: 'boolean',
    description: 'Applies semi-bold font weight using theme font family',
    default: 'false',
    required: false,
  },
  {
    name: 'weight',
    type: "'100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900'",
    description: 'Font weight - numeric values from 100 (thin) to 900 (black)',
    required: false,
  },
  {
    name: 'fontSize',
    type: 'number',
    description: 'Custom font size in pixels, overrides the size prop',
    required: false,
  },
  {
    name: 'align',
    type: "'left' | 'center' | 'right' | 'justify'",
    description: 'Text alignment',
    required: false,
  },
  {
    name: 'questrial',
    type: 'boolean',
    description: 'Uses Questrial font family if available',
    default: 'false',
    required: false,
  },
  {
    name: 'style',
    type: 'TextStyle',
    description: 'Additional styles to apply to the text',
    required: false,
  },
  {
    name: 'children',
    type: 'React.ReactNode',
    description: 'Text content to display',
    required: false,
  },
];
