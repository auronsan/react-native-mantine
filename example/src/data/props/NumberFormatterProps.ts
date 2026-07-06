export interface PropDefinition {
  name: string;
  type: string;
  description: string;
  default?: string;
  required?: boolean;
}

export const numberFormatterProps: PropDefinition[] = [
  {
    name: 'value',
    type: 'number | string',
    description: 'Value to format. Nothing is rendered if the value is empty or not a valid number',
    required: false,
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
    name: 'allowNegative',
    type: 'boolean',
    description: 'Determines whether negative values are allowed',
    default: 'true',
    required: false,
  },
  {
    name: 'style',
    type: 'TextStyle',
    description: 'Additional styles to apply to the rendered text',
    required: false,
  },
];
