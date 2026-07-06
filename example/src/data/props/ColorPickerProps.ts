export interface PropDefinition {
  name: string;
  type: string;
  description: string;
  default?: string;
  required?: boolean;
}

export const colorPickerProps: PropDefinition[] = [
  {
    name: 'value',
    type: 'string',
    description: 'Color value for controlled component, in one of the supported formats',
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
    description: 'Called when color changes',
    required: false,
  },
  {
    name: 'onChangeEnd',
    type: '(value: string) => void',
    description: 'Called when the user stops dragging or picks a swatch',
    required: false,
  },
  {
    name: 'onColorSwatchClick',
    type: '(color: string) => void',
    description: 'Called when a color swatch is pressed',
    required: false,
  },
  {
    name: 'format',
    type: "'hex' | 'hexa' | 'rgb' | 'rgba' | 'hsl' | 'hsla'",
    description: 'Color format, alpha slider is shown for hexa, rgba and hsla',
    default: '"hex"',
    required: false,
  },
  {
    name: 'withPicker',
    type: 'boolean',
    description: 'Determines whether the saturation/hue/alpha pickers should be displayed',
    default: 'true',
    required: false,
  },
  {
    name: 'swatches',
    type: 'string[]',
    description: 'Predefined colors displayed as swatches under the pickers',
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
    name: 'size',
    type: "'xs' | 'sm' | 'md' | 'lg' | 'xl'",
    description: 'Controls the size of the pickers',
    default: '"md"',
    required: false,
  },
  {
    name: 'fullWidth',
    type: 'boolean',
    description: 'Determines whether the picker should take 100% of available width',
    default: 'false',
    required: false,
  },
  {
    name: 'saturationLabel',
    type: 'string',
    description: 'Saturation area accessibility label',
    default: '"Saturation"',
    required: false,
  },
  {
    name: 'hueLabel',
    type: 'string',
    description: 'Hue slider accessibility label',
    default: '"Hue"',
    required: false,
  },
  {
    name: 'alphaLabel',
    type: 'string',
    description: 'Alpha slider accessibility label',
    default: '"Alpha"',
    required: false,
  },
];
