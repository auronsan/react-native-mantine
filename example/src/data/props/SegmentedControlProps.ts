// Generated from src/components/SegmentedControl/index.tsx by scripts/generate-props.ts.
// Safe to edit: the generator does not overwrite this file unless run with --force.

export interface PropDefinition {
  name: string;
  type: string;
  description: string;
  default?: string;
  required?: boolean;
}

export const segmentedControlProps: PropDefinition[] = [
  {
    name: 'value',
    type: 'string',
    description: 'Current selected value (controlled)',
    required: false,
  },
  {
    name: 'defaultValue',
    type: 'string',
    description: 'Default value (uncontrolled)',
    required: false,
  },
  {
    name: 'onChange',
    type: '(value: string) => void',
    description: 'Called when value changes',
    required: false,
  },
  {
    name: 'data',
    type: '(string | SegmentedControlItem)[]',
    description: 'Data for segments',
    required: true,
  },
  {
    name: 'size',
    type: 'MantineSize',
    description: 'SegmentedControl size',
    default: "'md'",
    required: false,
  },
  {
    name: 'color',
    type: 'MantineColor',
    description: 'SegmentedControl color',
    default: "'blue'",
    required: false,
  },
  {
    name: 'radius',
    type: 'MantineNumberSize',
    description: 'Key of theme.radius or any valid value to set border-radius',
    default: "'sm'",
    required: false,
  },
  {
    name: 'disabled',
    type: 'boolean',
    description: 'Disabled state',
    default: 'false',
    required: false,
  },
  {
    name: 'orientation',
    type: "'horizontal' | 'vertical'",
    description: 'Orientation of the segments',
    default: "'horizontal'",
    required: false,
  },
  {
    name: 'fullWidth',
    type: 'boolean',
    description: 'Sets width to 100% of parent',
    default: 'false',
    required: false,
  },
  {
    name: 'transitionDuration',
    type: 'number',
    description: 'Transition duration in ms',
    default: '200',
    required: false,
  },
  {
    name: 'style',
    type: 'any',
    description: 'Additional styles',
    required: false,
  },
  {
    name: 'testID',
    type: 'string',
    description: 'Test identifier used by testing frameworks',
    required: false,
  },
];
