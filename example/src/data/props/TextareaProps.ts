export interface PropDefinition {
  name: string;
  type: string;
  description: string;
  default?: string;
  required?: boolean;
}

export const textareaProps: PropDefinition[] = [
  {
    name: 'minRows',
    type: 'number',
    description: 'Minimum number of visible text lines. Controls the minimum height of the textarea',
    default: '3',
    required: false,
  },
  {
    name: 'maxRows',
    type: 'number',
    description: 'Maximum number of visible text lines. When autosize is enabled, textarea will not exceed this height',
    required: false,
  },
  {
    name: 'autosize',
    type: 'boolean',
    description: 'If true, textarea height automatically adjusts to fit content between minRows and maxRows',
    default: 'false',
    required: false,
  },
  {
    name: 'label',
    type: 'React.ReactNode',
    description: 'Input label displayed above the textarea field',
    required: false,
  },
  {
    name: 'description',
    type: 'React.ReactNode',
    description: 'Description text displayed below the label and above the textarea',
    required: false,
  },
  {
    name: 'error',
    type: 'React.ReactNode',
    description: 'Error message displayed below the textarea. When set, textarea border becomes red',
    required: false,
  },
  {
    name: 'size',
    type: "'xs' | 'sm' | 'md' | 'lg' | 'xl'",
    description: 'Textarea size that controls font size and padding',
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
    description: 'Icon displayed on the left side of the textarea field',
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
    description: 'Controls textarea appearance: default (outlined), filled (background), or unstyled (no borders)',
    default: "'default'",
    required: false,
  },
  {
    name: 'placeholder',
    type: 'string',
    description: 'Placeholder text displayed when textarea is empty',
    required: false,
  },
  {
    name: 'value',
    type: 'string',
    description: 'Textarea value for controlled component',
    required: false,
  },
  {
    name: 'onChangeText',
    type: '(text: string) => void',
    description: 'Callback fired when textarea value changes',
    required: false,
  },
  {
    name: 'onBlur',
    type: '() => void',
    description: 'Callback fired when textarea loses focus',
    required: false,
  },
  {
    name: 'editable',
    type: 'boolean',
    description: 'If false, textarea is read-only and cannot be edited',
    default: 'true',
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
    name: 'style',
    type: 'ViewStyle',
    description: 'Additional styles applied to the textarea element itself',
    required: false,
  },
  {
    name: 'wrapperStyle',
    type: 'ViewStyle',
    description: 'Additional styles applied to the wrapper container',
    required: false,
  },
];
