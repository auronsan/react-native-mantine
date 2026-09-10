// Generated from src/components/Spoiler/index.tsx by scripts/generate-props.ts.
// Safe to edit: the generator does not overwrite this file unless run with --force.

export interface PropDefinition {
  name: string;
  type: string;
  description: string;
  default?: string;
  required?: boolean;
}

export const spoilerProps: PropDefinition[] = [
  {
    name: 'children',
    type: 'React.ReactNode',
    description: 'Content that will be hidden under spoiler',
    required: true,
  },
  {
    name: 'maxHeight',
    type: 'number',
    description: 'Max height after which spoiler is shown',
    default: '100',
    required: true,
  },
  {
    name: 'showLabel',
    type: 'string',
    description: 'Label for show button',
    default: "'Show more'",
    required: false,
  },
  {
    name: 'hideLabel',
    type: 'string',
    description: 'Label for hide button',
    default: "'Show less'",
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
    name: 'expanded',
    type: 'boolean',
    description: 'Controlled expanded state',
    required: false,
  },
  {
    name: 'onExpandedChange',
    type: '(expanded: boolean) => void',
    description: 'Called when expanded state changes',
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
