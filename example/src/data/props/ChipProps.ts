export interface PropDefinition {
  name: string;
  type: string;
  description: string;
  default?: string;
  required?: boolean;
}

export const chipProps: PropDefinition[] = [
  {
    name: 'children',
    type: 'React.ReactNode',
    description: 'Chip label content, typically text',
    required: true,
  },
  {
    name: 'size',
    type: "'xs' | 'sm' | 'md' | 'lg' | 'xl'",
    description: 'Controls chip size including height, font size, and horizontal padding',
    default: '"sm"',
    required: false,
  },
  {
    name: 'color',
    type: 'MantineColor',
    description: 'Chip color from theme, used when checked (e.g., "blue", "red", "green")',
    default: '"blue"',
    required: false,
  },
  {
    name: 'radius',
    type: 'number | "xs" | "sm" | "md" | "lg" | "xl"',
    description: 'Key of theme.radius or any valid number to set border-radius',
    default: '"xl"',
    required: false,
  },
  {
    name: 'variant',
    type: "'filled' | 'outline' | 'light'",
    description: 'Controls chip appearance when checked - filled (solid background), outline (border only), or light (subtle background)',
    default: '"filled"',
    required: false,
  },
  {
    name: 'checked',
    type: 'boolean',
    description: 'Controlled checked state. If provided, chip becomes a controlled component',
    required: false,
  },
  {
    name: 'defaultChecked',
    type: 'boolean',
    description: 'Default checked state for uncontrolled mode',
    required: false,
  },
  {
    name: 'onChange',
    type: '(checked: boolean) => void',
    description: 'Callback fired when checked state changes, receives new checked state as argument',
    required: false,
  },
  {
    name: 'disabled',
    type: 'boolean',
    description: 'If true, chip will be disabled and not respond to user interactions',
    default: 'false',
    required: false,
  },
  {
    name: 'icon',
    type: 'React.ReactNode',
    description: 'Icon to display on the left side when chip is checked',
    required: false,
  },
  {
    name: 'value',
    type: 'string',
    description: 'Value used when chip is part of Chip.Group for identification',
    required: false,
  },
  {
    name: 'type',
    type: "'checkbox' | 'radio'",
    description: 'Type of chip, affects behavior in Chip.Group',
    default: '"checkbox"',
    required: false,
  },
  {
    name: 'withTextWrapper',
    type: 'boolean',
    description: 'Controls whether children are automatically wrapped in a Text component',
    default: 'true',
    required: false,
  },
  {
    name: 'style',
    type: 'ViewStyle',
    description: 'Additional styles to apply to the chip container',
    required: false,
  },
  {
    name: 'textStyle',
    type: 'TextStyle',
    description: 'Additional styles to apply to the chip text',
    required: false,
  },
];

export const chipGroupProps: PropDefinition[] = [
  {
    name: 'children',
    type: 'React.ReactNode',
    description: 'Chip components to be rendered within the group',
    required: true,
  },
  {
    name: 'value',
    type: 'string | string[]',
    description: 'Controlled selected value(s). Single string for single selection, array for multiple selection',
    required: false,
  },
  {
    name: 'defaultValue',
    type: 'string | string[]',
    description: 'Default selected value(s) for uncontrolled mode',
    required: false,
  },
  {
    name: 'onChange',
    type: '(value: string | string[]) => void',
    description: 'Callback fired when selection changes, receives new value(s) as argument',
    required: false,
  },
  {
    name: 'multiple',
    type: 'boolean',
    description: 'If true, multiple chips can be selected simultaneously',
    default: 'false',
    required: false,
  },
  {
    name: 'spacing',
    type: "'xs' | 'sm' | 'md' | 'lg' | 'xl'",
    description: 'Spacing between chips in the group',
    default: '"sm"',
    required: false,
  },
  {
    name: 'style',
    type: 'ViewStyle',
    description: 'Additional styles to apply to the group container',
    required: false,
  },
];
