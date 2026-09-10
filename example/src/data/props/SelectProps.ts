// Generated from src/components/Select/index.tsx by scripts/generate-props.ts.
// Safe to edit: the generator does not overwrite this file unless run with --force.

export interface PropDefinition {
  name: string;
  type: string;
  description: string;
  default?: string;
  required?: boolean;
}

export const selectProps: PropDefinition[] = [
  {
    name: 'data',
    type: '(string | SelectDataItem)[]',
    description: 'Select data',
    required: true,
  },
  {
    name: 'value',
    type: 'string',
    description: 'Selected value',
    required: false,
  },
  {
    name: 'defaultValue',
    type: 'string',
    description: 'Default value for uncontrolled component',
    required: false,
  },
  {
    name: 'onChange',
    type: '(value: string) => void',
    description: 'Called when value changes',
    required: false,
  },
  {
    name: 'placeholder',
    type: 'string',
    description: 'Placeholder',
    required: false,
  },
  {
    name: 'label',
    type: 'React.ReactNode',
    description: 'Select label',
    required: false,
  },
  {
    name: 'description',
    type: 'React.ReactNode',
    description: 'Select description',
    required: false,
  },
  {
    name: 'error',
    type: 'React.ReactNode',
    description: 'Error message',
    required: false,
  },
  {
    name: 'size',
    type: 'MantineSize',
    description: 'Select size',
    default: "'md'",
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
    name: 'color',
    type: 'MantineColor',
    description: 'Select color',
    default: "'blue'",
    required: false,
  },
  {
    name: 'disabled',
    type: 'boolean',
    description: 'If true, select will be disabled',
    default: 'false',
    required: false,
  },
  {
    name: 'searchable',
    type: 'boolean',
    description: 'If true, select will be searchable',
    default: 'false',
    required: false,
  },
  {
    name: 'searchPlaceholder',
    type: 'string',
    description: 'Search placeholder',
    default: "'Search...'",
    required: false,
  },
  {
    name: 'clearable',
    type: 'boolean',
    description: 'If true, clear button will be shown',
    default: 'false',
    required: false,
  },
  {
    name: 'clearButtonLabel',
    type: 'string',
    description: 'Clear button label',
    default: "'Clear'",
    required: false,
  },
  {
    name: 'maxDropdownHeight',
    type: 'number',
    description: 'Max dropdown height',
    default: '400',
    required: false,
  },
  {
    name: 'icon',
    type: 'React.ReactNode',
    description: 'Icon displayed on the left side',
    required: false,
  },
  {
    name: 'rightSection',
    type: 'React.ReactNode',
    description: 'Right section',
    required: false,
  },
  {
    name: 'accessibilityLabel',
    type: 'string',
    description: 'Accessibility label',
    required: false,
  },
  {
    name: 'accessibilityHint',
    type: 'string',
    description: 'Accessibility hint',
    required: false,
  },
  {
    name: 'style',
    type: 'any',
    description: 'Additional styles',
    required: false,
  },
  {
    name: 'testID',
    type: 'string',
    description: 'Test identifier used by testing frameworks',
    required: false,
  },
];
