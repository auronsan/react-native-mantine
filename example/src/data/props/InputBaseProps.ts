export interface PropDefinition {
  name: string;
  type: string;
  description: string;
  default?: string;
  required?: boolean;
}

export const inputBaseProps: PropDefinition[] = [
  {
    name: 'children',
    type: 'React.ReactNode',
    description: 'Content rendered inside the input frame',
    required: false,
  },
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
    description: 'Error message',
    required: false,
  },
  {
    name: 'size',
    type: "'xs' | 'sm' | 'md' | 'lg' | 'xl'",
    description: 'Controls input height and font size',
    default: '"sm"',
    required: false,
  },
  {
    name: 'radius',
    type: 'MantineNumberSize',
    description: 'Key of theme.radius or any valid value to set border-radius',
    default: '"sm"',
    required: false,
  },
  {
    name: 'icon',
    type: 'React.ReactNode',
    description: 'Icon displayed on the left side of input',
    required: false,
  },
  {
    name: 'rightSection',
    type: 'React.ReactNode',
    description: 'Right section of input',
    required: false,
  },
  {
    name: 'rightSectionWidth',
    type: 'number',
    description: 'Right section width',
    required: false,
  },
  {
    name: 'required',
    type: 'boolean',
    description: 'Displays required asterisk',
    default: 'false',
    required: false,
  },
  {
    name: 'variant',
    type: "'default' | 'filled' | 'unstyled'",
    description: 'Input variant',
    default: '"default"',
    required: false,
  },
  {
    name: 'disabled',
    type: 'boolean',
    description: 'Disables interaction and dims the input',
    default: 'false',
    required: false,
  },
  {
    name: 'multiline',
    type: 'boolean',
    description: 'Allows the frame to grow with its content instead of a fixed height',
    default: 'false',
    required: false,
  },
  {
    name: 'onPress',
    type: '() => void',
    description: 'Called when the input frame is pressed, makes the frame pressable',
    required: false,
  },
  {
    name: 'wrapperStyle',
    type: 'StyleProp<ViewStyle>',
    description: 'Input wrapper style',
    required: false,
  },
  {
    name: 'accessibilityLabel',
    type: 'string',
    description: 'Accessibility label of the pressable frame',
    required: false,
  },
];
