// Generated from src/components/Collapse/index.tsx by scripts/generate-props.ts.
// Safe to edit: the generator does not overwrite this file unless run with --force.

export interface PropDefinition {
  name: string;
  type: string;
  description: string;
  default?: string;
  required?: boolean;
}

export const collapseProps: PropDefinition[] = [
  {
    name: 'children',
    type: 'React.ReactNode',
    description: 'Content that should be collapsed',
    required: true,
  },
  {
    name: 'in',
    type: 'boolean',
    description: 'Opened state',
    required: true,
  },
  {
    name: 'transitionDuration',
    type: 'number',
    description: 'Transition duration in ms',
    default: '200',
    required: false,
  },
  {
    name: 'transitionTimingFunction',
    type: "'linear' | 'ease' | 'ease-in' | 'ease-out' | 'ease-in-out'",
    description: 'Transition timing function',
    default: "'ease'",
    required: false,
  },
  {
    name: 'onTransitionEnd',
    type: '() => void',
    description: 'Called when transition ends',
    required: false,
  },
  {
    name: 'animateOpacity',
    type: 'boolean',
    description: 'If true, content opacity is animated together with its height',
    default: 'true',
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
