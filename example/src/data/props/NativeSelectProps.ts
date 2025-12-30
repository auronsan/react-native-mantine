export interface PropDefinition {
  name: string;
  type: string;
  description: string;
  default?: string;
  required?: boolean;
}

export const nativeSelectProps: PropDefinition[] = [
  {
    name: 'data',
    type: '(string | SelectItem)[]',
    description: 'Select options data. Can be array of strings or objects with {value, label, disabled} structure',
    required: true,
  },
  {
    name: 'label',
    type: 'React.ReactNode',
    description: 'Input label displayed above the select',
    required: false,
  },
  {
    name: 'description',
    type: 'React.ReactNode',
    description: 'Description text displayed below the select',
    required: false,
  },
  {
    name: 'error',
    type: 'React.ReactNode',
    description: 'Error message displayed below the select, also adds error styling',
    required: false,
  },
  {
    name: 'size',
    type: "'xs' | 'sm' | 'md' | 'lg' | 'xl'",
    description: 'Controls select height and font size',
    default: '"sm"',
    required: false,
  },
  {
    name: 'radius',
    type: 'number | "xs" | "sm" | "md" | "lg" | "xl"',
    description: 'Key of theme.radius or any valid number to set border-radius',
    default: '"sm"',
    required: false,
  },
  {
    name: 'variant',
    type: "'default' | 'filled' | 'unstyled'",
    description: 'Controls select appearance - default (with border), filled (with background), or unstyled',
    default: '"default"',
    required: false,
  },
  {
    name: 'fullWidth',
    type: 'boolean',
    description: 'If true, select will take full width of parent container',
    default: 'false',
    required: false,
  },
  {
    name: 'value',
    type: 'string',
    description: 'Controlled selected value. If provided, select becomes a controlled component',
    required: false,
  },
  {
    name: 'defaultValue',
    type: 'string',
    description: 'Default selected value for uncontrolled mode',
    required: false,
  },
  {
    name: 'onChange',
    type: '(value: string) => void',
    description: 'Callback fired when selected value changes, receives new value as argument',
    required: false,
  },
  {
    name: 'disabled',
    type: 'boolean',
    description: 'If true, select will be disabled and not respond to user interactions',
    default: 'false',
    required: false,
  },
  {
    name: 'placeholder',
    type: 'string',
    description: 'Placeholder text displayed when no value is selected',
    required: false,
  },
  {
    name: 'icon',
    type: 'React.ReactNode',
    description: 'Icon element displayed on the left side of the select',
    required: false,
  },
  {
    name: 'required',
    type: 'boolean',
    description: 'If true, adds an asterisk (*) to the label to indicate required field',
    default: 'false',
    required: false,
  },
  {
    name: 'style',
    type: 'ViewStyle',
    description: 'Additional styles to apply to the select input container',
    required: false,
  },
  {
    name: 'wrapperStyle',
    type: 'ViewStyle',
    description: 'Additional styles to apply to the outer wrapper (includes label and description)',
    required: false,
  },
];
