export interface PropDefinition {
  name: string;
  type: string;
  description: string;
  default?: string;
  required?: boolean;
}

export const switchProps: PropDefinition[] = [
  {
    name: 'label',
    type: 'React.ReactNode',
    description: 'Switch label displayed next to the switch toggle',
    required: false,
  },
  {
    name: 'size',
    type: "'xs' | 'sm' | 'md' | 'lg' | 'xl'",
    description: 'Switch size that controls the scale of the switch toggle',
    default: "'md'",
    required: false,
  },
  {
    name: 'color',
    type: 'MantineColor',
    description: 'Switch color from theme when enabled (e.g., "blue", "red", "green", "orange", "grape")',
    default: "'blue'",
    required: false,
  },
  {
    name: 'labelPosition',
    type: "'left' | 'right'",
    description: 'Position of the label relative to the switch toggle',
    default: "'right'",
    required: false,
  },
  {
    name: 'checked',
    type: 'boolean',
    description: 'Controlled checked state of the switch (controlled component)',
    required: false,
  },
  {
    name: 'onChange',
    type: '(value: boolean) => void',
    description: 'Callback fired when switch state changes, receives new checked state',
    required: false,
  },
  {
    name: 'disabled',
    type: 'boolean',
    description: 'Disabled state - prevents interaction',
    default: 'false',
    required: false,
  },
  {
    name: 'style',
    type: 'ViewStyle',
    description: 'Additional styles applied to the switch component itself',
    required: false,
  },
  {
    name: 'wrapperStyle',
    type: 'ViewStyle',
    description: 'Additional styles applied to the wrapper container (switch + label)',
    required: false,
  },
];
