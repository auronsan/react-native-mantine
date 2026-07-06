export interface PropDefinition {
  name: string;
  type: string;
  description: string;
  default?: string;
  required?: boolean;
}

export const pillsInputProps: PropDefinition[] = [
  {
    name: 'children',
    type: 'React.ReactNode',
    description: 'Pills and PillsInput.Field rendered inside the input',
    required: false,
  },
  {
    name: 'label',
    type: 'React.ReactNode',
    description: 'Input label displayed above the input',
    required: false,
  },
  {
    name: 'description',
    type: 'React.ReactNode',
    description: 'Input description displayed below the label',
    required: false,
  },
  {
    name: 'error',
    type: 'React.ReactNode',
    description: 'Error message displayed below the input',
    required: false,
  },
  {
    name: 'size',
    type: "'xs' | 'sm' | 'md' | 'lg' | 'xl'",
    description: 'Controls input height and horizontal padding',
    default: '"sm"',
    required: false,
  },
  {
    name: 'radius',
    type: 'number | "xs" | "sm" | "md" | "lg" | "xl"',
    description: 'Key of theme.radius or any valid value to set border-radius',
    default: '"sm"',
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
    name: 'required',
    type: 'boolean',
    description: 'Displays required asterisk next to the label',
    default: 'false',
    required: false,
  },
  {
    name: 'disabled',
    type: 'boolean',
    description: 'If set, the input is disabled',
    default: 'false',
    required: false,
  },
  {
    name: 'style',
    type: 'ViewStyle',
    description: 'Additional styles to apply to the input element',
    required: false,
  },
  {
    name: 'wrapperStyle',
    type: 'ViewStyle',
    description: 'Additional styles to apply to the input wrapper',
    required: false,
  },
];

export const pillsInputFieldProps: PropDefinition[] = [
  {
    name: 'placeholder',
    type: 'string',
    description: 'Field placeholder displayed when the field is empty',
    required: false,
  },
  {
    name: 'value',
    type: 'string',
    description: 'Controlled field value (inherited from TextInput)',
    required: false,
  },
  {
    name: 'onChangeText',
    type: '(text: string) => void',
    description: 'Called when the field text changes (inherited from TextInput)',
    required: false,
  },
  {
    name: 'onSubmitEditing',
    type: '() => void',
    description: 'Called when the field is submitted (inherited from TextInput)',
    required: false,
  },
  {
    name: 'editable',
    type: 'boolean',
    description: 'Controls whether the field can be edited, defaults to the PillsInput disabled state',
    required: false,
  },
  {
    name: 'style',
    type: 'TextStyle',
    description: 'Additional styles to apply to the field',
    required: false,
  },
];
