import type { PropDefinition } from './ButtonProps';

export const highlightProps: PropDefinition[] = [
  {
    name: 'highlight',
    type: 'string | string[]',
    description: 'Substring or array of substrings to highlight within the text',
    required: true,
  },
  {
    name: 'children',
    type: 'string',
    description: 'Text in which to highlight substrings (must be a string)',
    required: true,
  },
  {
    name: 'highlightColor',
    type: 'string',
    description: 'Color key from theme.colors for highlighted text background',
    default: "'yellow'",
    required: false,
  },
  {
    name: 'highlightStyles',
    type: '{ backgroundColor?: string; color?: string; }',
    description: 'Custom styles for highlighted text portions (overrides highlightColor)',
    required: false,
  },
  {
    name: 'style',
    type: 'TextStyle',
    description: 'Additional styles to apply to the entire text',
    required: false,
  },
  {
    name: 'size',
    type: 'string',
    description: 'Text size from theme (inherited from Text)',
    required: false,
  },
  {
    name: 'color',
    type: 'string',
    description: 'Text color for non-highlighted portions',
    required: false,
  },
  {
    name: 'white',
    type: 'boolean',
    description: 'Sets text color to white',
    default: 'false',
    required: false,
  },
  {
    name: 'bold',
    type: 'boolean',
    description: 'Applies bold font weight',
    default: 'false',
    required: false,
  },
  {
    name: 'semiBold',
    type: 'boolean',
    description: 'Applies semi-bold font weight',
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
    name: 'align',
    type: "'left' | 'center' | 'right' | 'justify'",
    description: 'Text alignment',
    required: false,
  },
];
