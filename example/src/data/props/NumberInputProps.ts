// Generated from src/components/NumberInput/index.tsx by scripts/generate-props.ts.
// Safe to edit: the generator does not overwrite this file unless run with --force.

export interface PropDefinition {
  name: string;
  type: string;
  description: string;
  default?: string;
  required?: boolean;
}

export const numberInputProps: PropDefinition[] = [
  {
    name: 'label',
    type: 'React.ReactNode',
    description: 'Input label',
    required: false,
  },
  {
    name: 'description',
    type: 'React.ReactNode',
    description: 'Input description',
    required: false,
  },
  {
    name: 'error',
    type: 'React.ReactNode',
    description: 'Input error message',
    required: false,
  },
  {
    name: 'size',
    type: 'MantineSize',
    description: 'Input size',
    default: "'sm'",
    required: false,
  },
  {
    name: 'radius',
    type: 'MantineNumberSize',
    description: 'Border radius',
    default: "'sm'",
    required: false,
  },
  {
    name: 'variant',
    type: "'default' | 'filled' | 'unstyled'",
    description: 'Input variant',
    default: "'default'",
    required: false,
  },
  {
    name: 'fullWidth',
    type: 'boolean',
    description: 'If true, input will take full width',
    default: 'false',
    required: false,
  },
  {
    name: 'min',
    type: 'number',
    description: 'Minimum value',
    required: false,
  },
  {
    name: 'max',
    type: 'number',
    description: 'Maximum value',
    required: false,
  },
  {
    name: 'step',
    type: 'number',
    description: 'Step for increment/decrement',
    default: '1',
    required: false,
  },
  {
    name: 'precision',
    type: 'number',
    description: 'Number of decimal places',
    default: '0',
    required: false,
  },
  {
    name: 'hideControls',
    type: 'boolean',
    description: 'If true, controls will be hidden',
    default: 'false',
    required: false,
  },
  {
    name: 'value',
    type: "number | ''",
    description: 'Current value',
    required: false,
  },
  {
    name: 'defaultValue',
    type: "number | ''",
    description: 'Default value',
    required: false,
  },
  {
    name: 'onChange',
    type: "(value: number | '') => void",
    description: 'Called when value changes',
    required: false,
  },
  {
    name: 'disabled',
    type: 'boolean',
    description: 'If true, input will be disabled',
    default: 'false',
    required: false,
  },
  {
    name: 'placeholder',
    type: 'string',
    description: 'Placeholder',
    required: false,
  },
  {
    name: 'icon',
    type: 'React.ReactNode',
    description: 'Icon on the left',
    required: false,
  },
  {
    name: 'style',
    type: 'any',
    description: 'Additional styles',
    required: false,
  },
  {
    name: 'wrapperStyle',
    type: 'any',
    description: 'Wrapper style',
    required: false,
  },
  {
    name: 'accessibilityLabel',
    type: 'string',
    description: 'Accessibility label for the input',
    required: false,
  },
  {
    name: 'accessibilityHint',
    type: 'string',
    description: 'Accessibility hint for the input',
    required: false,
  },
  {
    name: 'testID',
    type: 'string',
    description: 'Test identifier used by testing frameworks',
    required: false,
  },
];
