export interface PropDefinition {
  name: string;
  type: string;
  description: string;
  default?: string;
  required?: boolean;
}

export const fileInputProps: PropDefinition[] = [
  {
    name: 'value',
    type: 'PickedFile | PickedFile[] | null',
    description:
      'Value for controlled component, array with multiple and a single file otherwise',
    required: false,
  },
  {
    name: 'defaultValue',
    type: 'PickedFile | PickedFile[] | null',
    description: 'Default value for uncontrolled component',
    required: false,
  },
  {
    name: 'onChange',
    type: '(value: PickedFile | PickedFile[] | null) => void',
    description: 'Called when the selection changes',
    required: false,
  },
  {
    name: 'multiple',
    type: 'boolean',
    description: 'Determines whether user can pick more than one file',
    default: 'false',
    required: false,
  },
  {
    name: 'accept',
    type: 'string | string[]',
    description: 'Mime type(s) of the files that can be picked, e.g. "application/pdf"',
    required: false,
  },
  {
    name: 'placeholder',
    type: 'string',
    description: 'Displayed when no file is selected',
    required: false,
  },
  {
    name: 'clearable',
    type: 'boolean',
    description: 'Adds a clear button to the right section when a file is selected',
    default: 'false',
    required: false,
  },
  {
    name: 'clearButtonLabel',
    type: 'string',
    description: 'Clear button accessibility label',
    default: '"Clear"',
    required: false,
  },
  {
    name: 'valueComponent',
    type: '({ value }) => React.ReactNode',
    description: 'Custom component to render the selected value',
    required: false,
  },
  {
    name: 'label',
    type: 'React.ReactNode',
    description: 'Input label, inherited from InputBase',
    required: false,
  },
  {
    name: 'description',
    type: 'React.ReactNode',
    description: 'Input description, inherited from InputBase',
    required: false,
  },
  {
    name: 'error',
    type: 'React.ReactNode',
    description: 'Error message, inherited from InputBase',
    required: false,
  },
  {
    name: 'required',
    type: 'boolean',
    description: 'Displays required asterisk, inherited from InputBase',
    required: false,
  },
  {
    name: 'disabled',
    type: 'boolean',
    description: 'Disables interaction and dims the input, inherited from InputBase',
    required: false,
  },
];
