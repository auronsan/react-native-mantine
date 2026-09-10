// Generated from src/components/Transition/index.tsx by scripts/generate-props.ts.
// Safe to edit: the generator does not overwrite this file unless run with --force.

export interface PropDefinition {
  name: string;
  type: string;
  description: string;
  default?: string;
  required?: boolean;
}

export const transitionProps: PropDefinition[] = [
  {
    name: 'mounted',
    type: 'boolean',
    description: 'If true, component will be mounted',
    required: true,
  },
  {
    name: 'transition',
    type: 'TransitionType',
    description: 'Transition type',
    default: "'fade'",
    required: false,
  },
  {
    name: 'duration',
    type: 'number',
    description: 'Transition duration in ms',
    default: '250',
    required: false,
  },
  {
    name: 'exitDuration',
    type: 'number',
    description: 'Exit transition duration in ms',
    required: false,
  },
  {
    name: 'timingFunction',
    type: "'linear' | 'ease' | 'ease-in' | 'ease-out' | 'ease-in-out'",
    description: 'Transition timing function',
    default: "'ease'",
    required: false,
  },
  {
    name: 'children',
    type: 'React.ReactNode',
    description: 'Children to transition',
    required: true,
  },
  {
    name: 'onExited',
    type: '() => void',
    description: 'Called when exit transition ends',
    required: false,
  },
  {
    name: 'onEntered',
    type: '() => void',
    description: 'Called when enter transition ends',
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
