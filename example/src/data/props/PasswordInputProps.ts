export interface PropDefinition {
  name: string;
  type: string;
  description: string;
  default?: string;
  required?: boolean;
}

export const passwordInputProps: PropDefinition[] = [
  {
    name: 'visible',
    type: 'boolean',
    description: 'Controlled visibility state. When true, password text is visible; when false, text is obscured',
    required: false,
  },
  {
    name: 'onVisibilityChange',
    type: '(visible: boolean) => void',
    description: 'Callback fired when the visibility toggle button is pressed, receives the new visibility state',
    required: false,
  },
  {
    name: 'visibilityToggleLabel',
    type: 'string',
    description: 'Accessibility label for the visibility toggle button',
    default: '"Toggle password visibility"',
    required: false,
  },
  {
    name: 'visibilityToggleIcon',
    type: '(visible: boolean) => React.ReactNode',
    description: 'Custom icon component for the visibility toggle. Receives current visibility state as parameter',
    required: false,
  },
  {
    name: 'label',
    type: 'React.ReactNode',
    description: 'Input label displayed above the password field',
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
    name: 'onBlur',
    type: '() => void',
    description: 'Callback fired when input loses focus',
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
    name: 'autoCapitalize',
    type: "'none' | 'sentences' | 'words' | 'characters'",
    description: 'Controls automatic capitalization behavior',
    default: "'none'",
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
];
