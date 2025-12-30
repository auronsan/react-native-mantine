import type { PropDefinition } from './ButtonProps';

export const markProps: PropDefinition[] = [
  {
    name: 'color',
    type: 'string',
    description: 'Background color key from theme.colors (e.g., "yellow", "blue") or color value',
    default: "'yellow'",
    required: false,
  },
  {
    name: 'children',
    type: 'React.ReactNode',
    description: 'Text content to highlight with background color',
    required: false,
  },
  {
    name: 'withTextWrapper',
    type: 'boolean',
    description: 'If false, returns children without wrapping in Text component',
    default: 'true',
    required: false,
  },
  {
    name: 'style',
    type: 'TextStyle',
    description: 'Additional styles to apply to the text',
    required: false,
  },
  {
    name: 'size',
    type: 'string',
    description: 'Text size from theme (inherited from Text)',
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
