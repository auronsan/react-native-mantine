export interface PropDefinition {
  name: string;
  type: string;
  description: string;
  default?: string;
  required?: boolean;
}

export const textInputProps: PropDefinition[] = [
  {
    name: 'label',
    type: 'React.ReactNode',
    description: 'Input label displayed above the input field',
    required: false,
  },
  {
    name: 'description',
    type: 'React.ReactNode',
    description: 'Description text displayed below the label and above the input',
    required: false,
  },
  {
    name: 'error',
    type: 'React.ReactNode',
    description: 'Error message displayed below the input. When set, input border becomes red',
    required: false,
  },
  {
    name: 'size',
    type: "'xs' | 'sm' | 'md' | 'lg' | 'xl'",
    description: 'Input size that controls height, font size, and padding',
    default: "'sm'",
    required: false,
  },
  {
    name: 'radius',
    type: 'number | "xs" | "sm" | "md" | "lg" | "xl"',
    description: 'Key of theme.radius or any valid number to set border-radius',
    default: "'sm'",
    required: false,
  },
  {
    name: 'icon',
    type: 'React.ReactNode',
    description: 'Icon displayed on the left side of the input field',
    required: false,
  },
  {
    name: 'rightSection',
    type: 'React.ReactNode',
    description: 'Content displayed on the right side of the input (e.g., clear button, visibility toggle)',
    required: false,
  },
  {
    name: 'rightSectionWidth',
    type: 'number',
    description: 'Width of the right section in pixels. If not set, defaults to input height',
    required: false,
  },
  {
    name: 'required',
    type: 'boolean',
    description: 'Displays a red asterisk (*) after the label to indicate field is required',
    default: 'false',
    required: false,
  },
  {
    name: 'variant',
    type: "'default' | 'filled' | 'unstyled'",
    description: 'Controls input appearance: default (outlined), filled (background), or unstyled (no borders)',
    default: "'default'",
    required: false,
  },
  {
    name: 'style',
    type: 'ViewStyle',
    description: 'Additional styles applied to the input element itself',
    required: false,
  },
  {
    name: 'wrapperStyle',
    type: 'ViewStyle',
    description: 'Additional styles applied to the wrapper container',
    required: false,
  },
  {
    name: 'placeholder',
    type: 'string',
    description: 'Placeholder text displayed when input is empty',
    required: false,
  },
  {
    name: 'value',
    type: 'string',
    description: 'Input value for controlled component',
    required: false,
  },
  {
    name: 'onChangeText',
    type: '(text: string) => void',
    description: 'Callback fired when input value changes',
    required: false,
  },
  {
    name: 'editable',
    type: 'boolean',
    description: 'If false, input is read-only and cannot be edited',
    default: 'true',
    required: false,
  },
  {
    name: 'multiline',
    type: 'boolean',
    description: 'If true, input can contain multiple lines of text',
    default: 'false',
    required: false,
  },
  {
    name: 'secureTextEntry',
    type: 'boolean',
    description: 'If true, text input obscures the entered text (for passwords)',
    default: 'false',
    required: false,
  },
  {
    name: 'autoCapitalize',
    type: "'none' | 'sentences' | 'words' | 'characters'",
    description: 'Controls automatic capitalization behavior',
    default: "'sentences'",
    required: false,
  },
  {
    name: 'keyboardType',
    type: 'KeyboardTypeOptions',
    description: 'Determines which keyboard to open (e.g., numeric, email-address, phone-pad)',
    default: "'default'",
    required: false,
  },
];
