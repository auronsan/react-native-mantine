export interface PropDefinition {
  name: string;
  type: string;
  description: string;
  default?: string;
  required?: boolean;
}

export const pillProps: PropDefinition[] = [
  {
    name: 'children',
    type: 'React.ReactNode',
    description: 'Pill content, typically text',
    required: false,
  },
  {
    name: 'size',
    type: "'xs' | 'sm' | 'md' | 'lg' | 'xl'",
    description: 'Controls pill height, font size and padding',
    default: '"md"',
    required: false,
  },
  {
    name: 'withRemoveButton',
    type: 'boolean',
    description: 'If set, the remove button is displayed',
    default: 'false',
    required: false,
  },
  {
    name: 'onRemove',
    type: '() => void',
    description: 'Called when the remove button is pressed',
    required: false,
  },
  {
    name: 'removeButtonProps',
    type: 'Record<string, any>',
    description: 'Props passed to the remove button',
    required: false,
  },
  {
    name: 'disabled',
    type: 'boolean',
    description: 'If set, pill is displayed with disabled styles',
    default: 'false',
    required: false,
  },
  {
    name: 'radius',
    type: 'number | "xs" | "sm" | "md" | "lg" | "xl"',
    description: 'Key of theme.radius or any valid value to set border-radius',
    default: '"xl"',
    required: false,
  },
  {
    name: 'style',
    type: 'ViewStyle',
    description: 'Additional styles to apply to the pill container',
    required: false,
  },
  {
    name: 'textStyle',
    type: 'TextStyle',
    description: 'Additional styles to apply to the pill text',
    required: false,
  },
];

export const pillGroupProps: PropDefinition[] = [
  {
    name: 'children',
    type: 'React.ReactNode',
    description: 'Pill components to be rendered within the group',
    required: true,
  },
  {
    name: 'size',
    type: "'xs' | 'sm' | 'md' | 'lg' | 'xl'",
    description: 'Controls size of all pills inside the group',
    required: false,
  },
  {
    name: 'gap',
    type: 'number | "xs" | "sm" | "md" | "lg" | "xl"',
    description: 'Gap between pills',
    default: '"xs"',
    required: false,
  },
  {
    name: 'disabled',
    type: 'boolean',
    description: 'If set, all pills inside the group are disabled',
    required: false,
  },
  {
    name: 'style',
    type: 'ViewStyle',
    description: 'Additional styles to apply to the group container',
    required: false,
  },
];
