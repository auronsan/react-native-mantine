export interface PropDefinition {
  name: string;
  type: string;
  description: string;
  default?: string;
  required?: boolean;
}

export const treeSelectProps: PropDefinition[] = [
  {
    name: 'data',
    type: 'TreeNodeData[]',
    description: 'Tree data with label, value and optional children',
    required: true,
  },
  {
    name: 'mode',
    type: "'single' | 'multiple' | 'checkbox'",
    description:
      'Selection mode, in checkbox mode checking a parent checks all of its leaf nodes',
    default: '"single"',
    required: false,
  },
  {
    name: 'value',
    type: 'string | string[] | null',
    description:
      'Controlled value: string or null for single mode, string[] for multiple and checkbox modes',
    required: false,
  },
  {
    name: 'defaultValue',
    type: 'string | string[] | null',
    description: 'Default value for uncontrolled component',
    required: false,
  },
  {
    name: 'onChange',
    type: '(value: string | string[] | null) => void',
    description: 'Called when value changes',
    required: false,
  },
  {
    name: 'allowDeselect',
    type: 'boolean',
    description:
      'In single mode, determines whether pressing the selected node deselects it',
    default: 'true',
    required: false,
  },
  {
    name: 'maxValues',
    type: 'number',
    description: 'Maximum number of selected values in multiple and checkbox modes',
    required: false,
  },
  {
    name: 'maxDisplayedValues',
    type: 'number',
    description:
      'Maximum number of values displayed in the input, the rest is shown as +N',
    required: false,
  },
  {
    name: 'defaultExpandedValues',
    type: 'string[]',
    description: 'Node values that are expanded by default',
    required: false,
  },
  {
    name: 'defaultExpandAll',
    type: 'boolean',
    description: 'Determines whether all nodes should be expanded by default',
    default: 'false',
    required: false,
  },
  {
    name: 'searchable',
    type: 'boolean',
    description:
      'Determines whether the search input should be displayed in the dropdown',
    default: 'false',
    required: false,
  },
  {
    name: 'searchPlaceholder',
    type: 'string',
    description: 'Search input placeholder',
    default: '"Search..."',
    required: false,
  },
  {
    name: 'nothingFoundMessage',
    type: 'React.ReactNode',
    description: 'Message displayed when no nodes match the search',
    required: false,
  },
  {
    name: 'clearable',
    type: 'boolean',
    description: 'Determines whether the clear option should be displayed',
    default: 'false',
    required: false,
  },
  {
    name: 'clearButtonLabel',
    type: 'string',
    description: 'Clear option label',
    default: '"Clear"',
    required: false,
  },
  {
    name: 'onClear',
    type: '() => void',
    description: 'Called when the value is cleared',
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
    name: 'placeholder',
    type: 'string',
    description: 'Input placeholder',
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
    name: 'required',
    type: 'boolean',
    description: 'Displays required asterisk',
    required: false,
  },
  {
    name: 'disabled',
    type: 'boolean',
    description: 'If set, the input is disabled',
    required: false,
  },
  {
    name: 'maxDropdownHeight',
    type: 'number',
    description: 'Maximum height of the dropdown list',
    default: '400',
    required: false,
  },
];
