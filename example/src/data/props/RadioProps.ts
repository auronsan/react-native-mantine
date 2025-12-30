export interface PropDefinition {
  name: string;
  type: string;
  description: string;
  default?: string;
  required?: boolean;
}

export const radioProps: PropDefinition[] = [
  {
    name: 'label',
    type: 'React.ReactNode',
    description: 'Radio label displayed next to the radio button',
    required: false,
  },
  {
    name: 'size',
    type: "'xs' | 'sm' | 'md' | 'lg' | 'xl'",
    description: 'Radio size that controls the dimensions of the radio circle',
    default: "'md'",
    required: false,
  },
  {
    name: 'color',
    type: 'MantineColor',
    description: 'Radio color from theme (e.g., "blue", "red", "green", "orange", "grape")',
    default: "'blue'",
    required: false,
  },
  {
    name: 'value',
    type: 'string',
    description: 'Radio value used when part of a Radio.Group',
    required: false,
  },
  {
    name: 'checked',
    type: 'boolean',
    description: 'Controlled checked state when used standalone (not in Radio.Group)',
    default: 'false',
    required: false,
  },
  {
    name: 'onChange',
    type: '(value: string) => void',
    description: 'Callback fired when radio is selected, receives the radio value',
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
    description: 'Additional styles applied to the radio circle itself',
    required: false,
  },
  {
    name: 'wrapperStyle',
    type: 'ViewStyle',
    description: 'Additional styles applied to the wrapper container (radio + label)',
    required: false,
  },
];

export const radioGroupProps: PropDefinition[] = [
  {
    name: 'value',
    type: 'string',
    description: 'Currently selected radio value (controlled component)',
    required: false,
  },
  {
    name: 'onChange',
    type: '(value: string) => void',
    description: 'Callback fired when any radio in the group is selected',
    required: false,
  },
  {
    name: 'children',
    type: 'React.ReactNode',
    description: 'Radio components to be rendered within the group',
    required: true,
  },
  {
    name: 'name',
    type: 'string',
    description: 'Radio group name for accessibility purposes',
    required: false,
  },
  {
    name: 'size',
    type: "'xs' | 'sm' | 'md' | 'lg' | 'xl'",
    description: 'Radio size applied to all children radios in the group',
    required: false,
  },
  {
    name: 'color',
    type: 'MantineColor',
    description: 'Radio color applied to all children radios in the group',
    required: false,
  },
  {
    name: 'style',
    type: 'ViewStyle',
    description: 'Additional styles applied to the group wrapper container',
    required: false,
  },
  {
    name: 'spacing',
    type: 'number',
    description: 'Spacing between radio buttons in the group',
    default: '12',
    required: false,
  },
];
