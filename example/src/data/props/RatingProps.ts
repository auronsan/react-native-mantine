export interface PropDefinition {
  name: string;
  type: string;
  description: string;
  default?: string;
  required?: boolean;
}

export const ratingProps: PropDefinition[] = [
  {
    name: 'value',
    type: 'number',
    description: 'Rating value (controlled) - current rating value',
    required: false,
  },
  {
    name: 'defaultValue',
    type: 'number',
    description: 'Default value (uncontrolled) - initial rating value',
    default: '0',
    required: false,
  },
  {
    name: 'onChange',
    type: '(value: number) => void',
    description: 'Called when rating value changes',
    required: false,
  },
  {
    name: 'count',
    type: 'number',
    description: 'Number of rating items to display',
    default: '5',
    required: false,
  },
  {
    name: 'size',
    type: "'xs' | 'sm' | 'md' | 'lg' | 'xl'",
    description: 'Rating size that controls symbol size',
    default: '"md"',
    required: false,
  },
  {
    name: 'color',
    type: 'MantineColor',
    description: 'Rating color from theme for filled symbols',
    default: '"yellow"',
    required: false,
  },
  {
    name: 'emptyColor',
    type: 'MantineColor',
    description: 'Empty symbol color from theme',
    default: '"gray"',
    required: false,
  },
  {
    name: 'symbol',
    type: 'React.ReactNode',
    description: 'Custom symbol for filled state (e.g., custom icon)',
    required: false,
  },
  {
    name: 'emptySymbol',
    type: 'React.ReactNode',
    description: 'Custom symbol for empty state',
    required: false,
  },
  {
    name: 'fractions',
    type: 'number',
    description: 'Allow fractional ratings for display (not input)',
    default: '1',
    required: false,
  },
  {
    name: 'readOnly',
    type: 'boolean',
    description: 'Read-only mode - prevents user interaction',
    default: 'false',
    required: false,
  },
  {
    name: 'highlightSelectedOnly',
    type: 'boolean',
    description: 'Highlight only selected items, not hovered items',
    default: 'false',
    required: false,
  },
  {
    name: 'style',
    type: 'ViewStyle',
    description: 'Additional styles to apply to the rating container',
    required: false,
  },
];
