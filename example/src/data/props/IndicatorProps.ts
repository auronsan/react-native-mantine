// Generated from src/components/Indicator/index.tsx by scripts/generate-props.ts.
// Safe to edit: the generator does not overwrite this file unless run with --force.

export interface PropDefinition {
  name: string;
  type: string;
  description: string;
  default?: string;
  required?: boolean;
}

export const indicatorProps: PropDefinition[] = [
  {
    name: 'color',
    type: 'MantineColor',
    description: 'Indicator color from theme',
    default: "'red'",
    required: false,
  },
  {
    name: 'size',
    type: 'MantineSize | number',
    description: 'Indicator size',
    default: "'md'",
    required: false,
  },
  {
    name: 'radius',
    type: 'MantineNumberSize',
    description: 'Indicator border radius',
    default: "'xl'",
    required: false,
  },
  {
    name: 'withBorder',
    type: 'boolean',
    description: 'If true, indicator will have a border',
    default: 'false',
    required: false,
  },
  {
    name: 'position',
    type: "'top-start' | 'top-end' | 'bottom-start' | 'bottom-end' | 'top-center' | 'bottom-center' | 'middle-start' | 'middle-end' | 'middle-center'",
    description: 'Indicator position',
    default: "'top-end'",
    required: false,
  },
  {
    name: 'offset',
    type: 'number',
    description: 'Indicator offset',
    default: '0',
    required: false,
  },
  {
    name: 'label',
    type: 'React.ReactNode',
    description: 'Indicator label',
    required: false,
  },
  {
    name: 'disabled',
    type: 'boolean',
    description: 'Disable indicator',
    default: 'false',
    required: false,
  },
  {
    name: 'inline',
    type: 'boolean',
    description: 'If true, only the indicator is rendered without wrapping children',
    default: 'false',
    required: false,
  },
  {
    name: 'processing',
    type: 'boolean',
    description: 'Marks the indicator as processing (accepted for Mantine parity, no visual effect yet)',
    default: 'false',
    required: false,
  },
  {
    name: 'withPulse',
    type: 'boolean',
    description: 'If true, indicator will have a pulsing animation',
    default: 'false',
    required: false,
  },
  {
    name: 'children',
    type: 'React.ReactNode',
    description: 'Children wrapped by indicator',
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
