// Generated from src/components/RingProgress/index.tsx by scripts/generate-props.ts.
// Safe to edit: the generator does not overwrite this file unless run with --force.

export interface PropDefinition {
  name: string;
  type: string;
  description: string;
  default?: string;
  required?: boolean;
}

export const ringProgressProps: PropDefinition[] = [
  {
    name: 'sections',
    type: 'RingProgressSection[]',
    description: 'Sections of the ring',
    required: true,
  },
  {
    name: 'size',
    type: 'number',
    description: 'Size of the ring',
    default: '120',
    required: false,
  },
  {
    name: 'thickness',
    type: 'number',
    description: 'Ring thickness',
    default: '12',
    required: false,
  },
  {
    name: 'label',
    type: 'React.ReactNode',
    description: 'Label displayed in the center',
    required: false,
  },
  {
    name: 'rootColor',
    type: 'string',
    description: 'Root color from theme',
    required: false,
  },
  {
    name: 'roundCaps',
    type: 'boolean',
    description: 'If true, ring section ends are rounded (accepted for Mantine parity, not yet applied in React Native)',
    default: 'false',
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
