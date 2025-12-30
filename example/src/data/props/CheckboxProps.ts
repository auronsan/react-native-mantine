export interface PropDefinition {
  name: string;
  type: string;
  description: string;
  default?: string;
  required?: boolean;
}

export const checkboxProps: PropDefinition[] = [
  {
    name: 'label',
    type: 'React.ReactNode',
    description: 'Checkbox label displayed next to the checkbox',
    required: false,
  },
  {
    name: 'size',
    type: "'xs' | 'sm' | 'md' | 'lg' | 'xl'",
    description: 'Checkbox size that controls the dimensions of the checkbox box',
    default: "'md'",
    required: false,
  },
  {
    name: 'color',
    type: 'MantineColor',
    description: 'Checkbox color from theme (e.g., "blue", "red", "green", "orange", "grape")',
    default: "'blue'",
    required: false,
  },
  {
    name: 'checked',
    type: 'boolean',
    description: 'Controlled checked state of the checkbox',
    default: 'false',
    required: false,
  },
  {
    name: 'onChange',
    type: '(checked: boolean) => void',
    description: 'Callback fired when checkbox state changes, receives new checked state',
    required: false,
  },
  {
    name: 'indeterminate',
    type: 'boolean',
    description: 'If true, checkbox displays in indeterminate state (dash instead of checkmark)',
    default: 'false',
    required: false,
  },
  {
    name: 'disabled',
    type: 'boolean',
    description: 'Disabled state - prevents interaction and reduces opacity',
    default: 'false',
    required: false,
  },
  {
    name: 'style',
    type: 'ViewStyle',
    description: 'Additional styles applied to the checkbox box itself',
    required: false,
  },
  {
    name: 'wrapperStyle',
    type: 'ViewStyle',
    description: 'Additional styles applied to the wrapper container (checkbox + label)',
    required: false,
  },
];
