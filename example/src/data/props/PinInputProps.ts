export interface PropDefinition {
  name: string;
  type: string;
  description: string;
  default?: string;
  required?: boolean;
}

export const pinInputProps: PropDefinition[] = [
  {
    name: 'length',
    type: 'number',
    description: 'Number of input fields to display',
    default: '4',
    required: false,
  },
  {
    name: 'size',
    type: "'xs' | 'sm' | 'md' | 'lg' | 'xl'",
    description: 'Controls input size - affects width, height, and font size of each input field',
    default: '"sm"',
    required: false,
  },
  {
    name: 'radius',
    type: 'number | "xs" | "sm" | "md" | "lg" | "xl"',
    description: 'Key of theme.radius or any valid number to set border-radius of each input',
    default: '"sm"',
    required: false,
  },
  {
    name: 'mask',
    type: 'boolean',
    description: 'If true, input values will be masked with bullet character (•) like a password input',
    default: 'false',
    required: false,
  },
  {
    name: 'type',
    type: "'number' | 'alphanumeric'",
    description: 'Type of input - "number" allows only digits, "alphanumeric" allows letters and numbers',
    default: '"number"',
    required: false,
  },
  {
    name: 'value',
    type: 'string',
    description: 'Controlled value of all inputs combined. If provided, component becomes controlled',
    required: false,
  },
  {
    name: 'defaultValue',
    type: 'string',
    description: 'Default value for uncontrolled mode',
    required: false,
  },
  {
    name: 'onChange',
    type: '(value: string) => void',
    description: 'Callback fired when any input value changes, receives the combined value of all inputs',
    required: false,
  },
  {
    name: 'onComplete',
    type: '(value: string) => void',
    description: 'Callback fired when all inputs are filled, receives the complete value',
    required: false,
  },
  {
    name: 'disabled',
    type: 'boolean',
    description: 'If true, all inputs will be disabled and not respond to user interactions',
    default: 'false',
    required: false,
  },
  {
    name: 'error',
    type: 'boolean',
    description: 'If true, inputs will display error state with red border',
    default: 'false',
    required: false,
  },
  {
    name: 'spacing',
    type: "'xs' | 'sm' | 'md' | 'lg' | 'xl'",
    description: 'Spacing between input fields',
    default: '"sm"',
    required: false,
  },
  {
    name: 'style',
    type: 'ViewStyle',
    description: 'Additional styles to apply to the container wrapping all inputs',
    required: false,
  },
  {
    name: 'inputStyle',
    type: 'TextInputStyle',
    description: 'Additional styles to apply to each individual input field',
    required: false,
  },
];
