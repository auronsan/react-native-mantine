import type { PropDefinition } from './ButtonProps';

export const titleProps: PropDefinition[] = [
  {
    name: 'order',
    type: '1 | 2 | 3 | 4 | 5 | 6',
    description: 'Heading order (h1-h6), determines the font size from theme.headings.sizes',
    default: '1',
    required: false,
  },
  {
    name: 'children',
    type: 'React.ReactNode',
    description: 'Text content to display in the heading',
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
    description: 'Additional styles to apply to the title text',
    required: false,
  },
  {
    name: 'size',
    type: 'string',
    description: 'Text size (inherited from Text, but typically controlled by order prop)',
    required: false,
  },
  {
    name: 'color',
    type: 'string',
    description: 'Text color - can be a theme color name or any valid color string',
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
    description: 'Applies bold font weight (headings are bold by default)',
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
