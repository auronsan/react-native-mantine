export interface PropDefinition {
  name: string;
  type: string;
  description: string;
  default?: string;
  required?: boolean;
}

export const jsonInputProps: PropDefinition[] = [
  {
    name: 'value',
    type: 'string',
    description: 'Value for controlled component',
    required: false,
  },
  {
    name: 'defaultValue',
    type: 'string',
    description: 'Default value for uncontrolled component',
    required: false,
  },
  {
    name: 'onChangeText',
    type: '(value: string) => void',
    description: 'Called when value changes',
    required: false,
  },
  {
    name: 'validationError',
    type: 'React.ReactNode',
    description: 'Error message displayed when the value cannot be parsed',
    default: '"Invalid JSON"',
    required: false,
  },
  {
    name: 'formatOnBlur',
    type: 'boolean',
    description: 'Determines whether valid JSON should be pretty-printed on blur',
    default: 'false',
    required: false,
  },
  {
    name: 'serialize',
    type: 'typeof JSON.stringify',
    description: 'Function to serialize value into a string',
    default: 'JSON.stringify',
    required: false,
  },
  {
    name: 'deserialize',
    type: 'typeof JSON.parse',
    description: 'Function to deserialize string value',
    default: 'JSON.parse',
    required: false,
  },
  {
    name: 'label',
    type: 'React.ReactNode',
    description: 'Input label, inherited from Textarea',
    required: false,
  },
  {
    name: 'description',
    type: 'React.ReactNode',
    description: 'Input description, inherited from Textarea',
    required: false,
  },
  {
    name: 'error',
    type: 'React.ReactNode',
    description: 'Error message, takes precedence over validationError',
    required: false,
  },
  {
    name: 'minRows',
    type: 'number',
    description: 'Minimum number of visible text lines, inherited from Textarea',
    default: '3',
    required: false,
  },
  {
    name: 'maxRows',
    type: 'number',
    description: 'Maximum number of visible text lines, inherited from Textarea',
    required: false,
  },
  {
    name: 'autosize',
    type: 'boolean',
    description: 'Auto-grow textarea to fit content, inherited from Textarea',
    default: 'false',
    required: false,
  },
];
