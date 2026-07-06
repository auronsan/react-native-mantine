export interface PropDefinition {
  name: string;
  type: string;
  description: string;
  default?: string;
  required?: boolean;
}

export const rollingNumberProps: PropDefinition[] = [
  {
    name: 'value',
    type: 'number | string',
    description: 'Value to display',
    required: true,
  },
  {
    name: 'prefix',
    type: 'string',
    description: 'Prefix added before the formatted value (e.g., "$")',
    required: false,
  },
  {
    name: 'suffix',
    type: 'string',
    description: 'Suffix added after the formatted value (e.g., " USD")',
    required: false,
  },
  {
    name: 'thousandSeparator',
    type: 'string | boolean',
    description: 'Thousands separator, true for "," or any string (e.g., " ", ".")',
    required: false,
  },
  {
    name: 'decimalSeparator',
    type: 'string',
    description: 'Decimal separator character',
    default: '"."',
    required: false,
  },
  {
    name: 'decimalScale',
    type: 'number',
    description: 'Limits the number of digits after the decimal point',
    required: false,
  },
  {
    name: 'fixedDecimalScale',
    type: 'boolean',
    description: 'If true, zeros are added to match decimalScale',
    default: 'false',
    required: false,
  },
  {
    name: 'animationDuration',
    type: 'number',
    description: 'Roll animation duration in ms, 0 disables animation',
    default: '600',
    required: false,
  },
  {
    name: 'timingFunction',
    type: "'ease' | 'linear' | 'ease-in' | 'ease-out' | 'ease-in-out'",
    description: 'Animation timing function',
    default: '"ease"',
    required: false,
  },
  {
    name: 'tabularNumbers',
    type: 'boolean',
    description: 'If set, digits use tabular figures to prevent layout shifts',
    default: 'true',
    required: false,
  },
  {
    name: 'textStyle',
    type: 'TextStyle',
    description: 'Text style applied to every character',
    required: false,
  },
  {
    name: 'style',
    type: 'ViewStyle',
    description: 'Additional styles to apply to the root element',
    required: false,
  },
];
