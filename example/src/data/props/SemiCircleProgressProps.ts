export interface PropDefinition {
  name: string;
  type: string;
  description: string;
  default?: string;
  required?: boolean;
}

export const semiCircleProgressProps: PropDefinition[] = [
  {
    name: 'value',
    type: 'number',
    description: 'Progress value from 0 to 100',
    required: true,
  },
  {
    name: 'size',
    type: 'number',
    description: 'Diameter of the semicircle in px',
    default: '200',
    required: false,
  },
  {
    name: 'thickness',
    type: 'number',
    description: 'Ring thickness in px',
    default: '12',
    required: false,
  },
  {
    name: 'fillDirection',
    type: "'left-to-right' | 'right-to-left'",
    description: 'Direction from which the arc is filled',
    default: '"left-to-right"',
    required: false,
  },
  {
    name: 'orientation',
    type: "'up' | 'down'",
    description: 'Orientation of the semicircle',
    default: '"up"',
    required: false,
  },
  {
    name: 'filledSegmentColor',
    type: 'MantineColor',
    description: 'Color of the filled segment, key of theme.colors or any valid color',
    default: 'theme.primaryColor',
    required: false,
  },
  {
    name: 'emptySegmentColor',
    type: 'MantineColor',
    description: 'Color of the empty segment',
    required: false,
  },
  {
    name: 'innerBackgroundColor',
    type: 'MantineColor',
    description: 'Color of the inner area, should match the background the component is rendered on',
    required: false,
  },
  {
    name: 'transitionDuration',
    type: 'number',
    description: 'Transition duration of the filled segment in ms, 0 disables animation',
    default: '0',
    required: false,
  },
  {
    name: 'label',
    type: 'React.ReactNode',
    description: 'Label displayed inside the progress',
    required: false,
  },
  {
    name: 'labelPosition',
    type: "'center' | 'bottom'",
    description: 'Label position relative to the semicircle',
    default: '"bottom"',
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
