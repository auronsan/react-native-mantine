export interface PropDefinition {
  name: string;
  type: string;
  description: string;
  default?: string;
  required?: boolean;
}

export const comboboxProps: PropDefinition[] = [
  {
    name: 'children',
    type: 'ReactNode',
    description: 'Combobox.Target and Combobox.Dropdown',
    required: true,
  },
  {
    name: 'store',
    type: 'ComboboxStore',
    description:
      'Combobox store returned by useCombobox, created internally if not provided',
    required: false,
  },
  {
    name: 'onOptionSubmit',
    type: '(value: string) => void',
    description: 'Called with the option value when an option is submitted',
    required: false,
  },
  {
    name: 'closeOnOptionSubmit',
    type: 'boolean',
    description:
      'Determines whether the dropdown should close when an option is submitted',
    default: 'true',
    required: false,
  },
];

export const comboboxOptionProps: PropDefinition[] = [
  {
    name: 'value',
    type: 'string',
    description: 'Option value passed to onOptionSubmit',
    required: true,
  },
  {
    name: 'disabled',
    type: 'boolean',
    description: 'Disabled state',
    default: 'false',
    required: false,
  },
  {
    name: 'children',
    type: 'ReactNode',
    description: 'Option content',
    required: false,
  },
  {
    name: 'onPress',
    type: '() => void',
    description: 'Called when the option is pressed, in addition to onOptionSubmit',
    required: false,
  },
];

export const useComboboxOptions: PropDefinition[] = [
  {
    name: 'defaultOpened',
    type: 'boolean',
    description: 'Initial opened state for uncontrolled usage',
    default: 'false',
    required: false,
  },
  {
    name: 'opened',
    type: 'boolean',
    description: 'Controlled opened state',
    required: false,
  },
  {
    name: 'onOpenedChange',
    type: '(opened: boolean) => void',
    description: 'Called when opened state changes',
    required: false,
  },
];
