export interface PropDefinition {
  name: string;
  type: string;
  description: string;
  default?: string;
  required?: boolean;
}

export const colorInputProps: PropDefinition[] = [
  {
    name: 'value',
    type: 'string',
    description: 'Color value for controlled component',
    required: false,
  },
  {
    name: 'defaultValue',
    type: 'string',
    description: 'Default value for uncontrolled component',
    required: false,
  },
  {
    name: 'onChange',
    type: '(value: string) => void',
    description: 'Called when the color changes',
    required: false,
  },
  {
    name: 'onChangeEnd',
    type: '(value: string) => void',
    description: 'Called when the user stops interacting with the picker',
    required: false,
  },
  {
    name: 'format',
    type: "'hex' | 'hexa' | 'rgb' | 'rgba' | 'hsl' | 'hsla'",
    description: 'Color format used by the picker and produced values',
    default: '"hex"',
    required: false,
  },
  {
    name: 'withPicker',
    type: 'boolean',
    description: 'Determines whether the color picker should be displayed in the dropdown',
    default: 'true',
    required: false,
  },
  {
    name: 'withPreview',
    type: 'boolean',
    description:
      'Determines whether the current color preview swatch should be displayed on the left',
    default: 'true',
    required: false,
  },
  {
    name: 'disallowInput',
    type: 'boolean',
    description: 'Prevents typing, the dropdown opens when the input is pressed',
    default: 'false',
    required: false,
  },
  {
    name: 'fixOnBlur',
    type: 'boolean',
    description: 'Reverts to the last valid value on blur when the typed value is invalid',
    default: 'true',
    required: false,
  },
  {
    name: 'swatches',
    type: 'string[]',
    description: 'Predefined colors displayed as swatches in the dropdown',
    required: false,
  },
  {
    name: 'swatchesPerRow',
    type: 'number',
    description: 'Number of swatches per row',
    default: '7',
    required: false,
  },
  {
    name: 'closeOnColorSwatchClick',
    type: 'boolean',
    description: 'Closes the dropdown when a swatch is pressed',
    default: 'false',
    required: false,
  },
  {
    name: 'pickerButtonLabel',
    type: 'string',
    description: 'Accessibility label of the button that opens the dropdown',
    default: '"Open color picker"',
    required: false,
  },
  {
    name: 'disabled',
    type: 'boolean',
    description: 'Disables the input and the dropdown',
    required: false,
  },
  {
    name: 'label',
    type: 'React.ReactNode',
    description: 'Input label, inherited from TextInput',
    required: false,
  },
  {
    name: 'description',
    type: 'React.ReactNode',
    description: 'Input description, inherited from TextInput',
    required: false,
  },
  {
    name: 'error',
    type: 'React.ReactNode',
    description: 'Error message, inherited from TextInput',
    required: false,
  },
];
