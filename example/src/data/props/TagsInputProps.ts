export interface PropDefinition {
  name: string;
  type: string;
  description: string;
  default?: string;
  required?: boolean;
}

export const tagsInputProps: PropDefinition[] = [
  {
    name: 'data',
    type: 'string[]',
    description: 'Suggestions displayed in the dropdown',
    default: '[]',
    required: false,
  },
  {
    name: 'value',
    type: 'string[]',
    description: 'Controlled value. If provided, component becomes controlled',
    required: false,
  },
  {
    name: 'defaultValue',
    type: 'string[]',
    description: 'Default value for uncontrolled component',
    required: false,
  },
  {
    name: 'onChange',
    type: '(value: string[]) => void',
    description: 'Called when value changes, receives the new tags array',
    required: false,
  },
  {
    name: 'searchValue',
    type: 'string',
    description: 'Controlled search value',
    required: false,
  },
  {
    name: 'defaultSearchValue',
    type: 'string',
    description: 'Default search value for uncontrolled component',
    required: false,
  },
  {
    name: 'onSearchChange',
    type: '(value: string) => void',
    description: 'Called when search value changes',
    required: false,
  },
  {
    name: 'maxTags',
    type: 'number',
    description: 'Maximum number of tags that can be added',
    required: false,
  },
  {
    name: 'allowDuplicates',
    type: 'boolean',
    description: 'Determines whether duplicate tags are allowed',
    default: 'false',
    required: false,
  },
  {
    name: 'onDuplicate',
    type: '(value: string) => void',
    description: 'Called when user tries to submit a duplicated tag',
    required: false,
  },
  {
    name: 'splitChars',
    type: 'string[]',
    description: 'Characters that trigger tag split when typed',
    default: "[',']",
    required: false,
  },
  {
    name: 'clearable',
    type: 'boolean',
    description: 'Determines whether the clear button is displayed',
    default: 'false',
    required: false,
  },
  {
    name: 'onClear',
    type: '() => void',
    description: 'Called when the clear button is pressed',
    required: false,
  },
  {
    name: 'acceptValueOnBlur',
    type: 'boolean',
    description: 'If set, the typed value is accepted when the field loses focus',
    default: 'true',
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
    name: 'placeholder',
    type: 'string',
    description: 'Field placeholder displayed when the field is empty',
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
    required: false,
  },
  {
    name: 'disabled',
    type: 'boolean',
    description: 'If set, input is disabled',
    required: false,
  },
  {
    name: 'maxDropdownHeight',
    type: 'number',
    description: 'Maximum height of the suggestions list',
    default: '200',
    required: false,
  },
  {
    name: 'nothingFoundMessage',
    type: 'React.ReactNode',
    description: 'Message displayed when no suggestions match the search',
    required: false,
  },
  {
    name: 'style',
    type: 'ViewStyle',
    description: 'Additional styles to apply to the root element',
    required: false,
  },
];
