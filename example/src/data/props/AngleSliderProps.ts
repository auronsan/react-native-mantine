export interface PropDefinition {
  name: string;
  type: string;
  description: string;
  default?: string;
  required?: boolean;
}

export const angleSliderProps: PropDefinition[] = [
  {
    name: 'value',
    type: 'number',
    description: 'Controlled value in degrees, 0-359',
    required: false,
  },
  {
    name: 'defaultValue',
    type: 'number',
    description: 'Default value for uncontrolled component',
    required: false,
  },
  {
    name: 'onChange',
    type: '(value: number) => void',
    description: 'Called on value change',
    required: false,
  },
  {
    name: 'onChangeEnd',
    type: '(value: number) => void',
    description: 'Called after the dragging is finished',
    required: false,
  },
  {
    name: 'size',
    type: 'number',
    description: 'Slider diameter in px',
    default: '60',
    required: false,
  },
  {
    name: 'thumbSize',
    type: 'number',
    description: 'Thumb diameter in px, calculated based on size by default',
    required: false,
  },
  {
    name: 'step',
    type: 'number',
    description: 'Step between values in degrees',
    default: '1',
    required: false,
  },
  {
    name: 'withLabel',
    type: 'boolean',
    description: 'Determines whether the label should be displayed inside the slider',
    default: 'true',
    required: false,
  },
  {
    name: 'formatLabel',
    type: '(value: number) => React.ReactNode',
    description: 'Formats label based on the value',
    required: false,
  },
  {
    name: 'marks',
    type: '{ value: number; label?: string }[]',
    description: 'Marks displayed on the slider',
    required: false,
  },
  {
    name: 'restrictToMarks',
    type: 'boolean',
    description: 'If set, the value is always snapped to the closest mark',
    default: 'false',
    required: false,
  },
  {
    name: 'color',
    type: 'MantineColor',
    description: 'Key of theme.colors or any valid color, controls thumb and marks color',
    default: 'theme.primaryColor',
    required: false,
  },
  {
    name: 'disabled',
    type: 'boolean',
    description: 'If set, the slider is disabled',
    default: 'false',
    required: false,
  },
  {
    name: 'labelStyle',
    type: 'TextStyle',
    description: 'Label text style',
    required: false,
  },
  {
    name: 'style',
    type: 'ViewStyle',
    description: 'Additional styles to apply to the root element',
    required: false,
  },
];
