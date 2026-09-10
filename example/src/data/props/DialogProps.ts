// Generated from src/components/Dialog/index.tsx by scripts/generate-props.ts.
// Safe to edit: the generator does not overwrite this file unless run with --force.

export interface PropDefinition {
  name: string;
  type: string;
  description: string;
  default?: string;
  required?: boolean;
}

export const dialogProps: PropDefinition[] = [
  {
    name: 'opened',
    type: 'boolean',
    description: 'Dialog opened state',
    required: true,
  },
  {
    name: 'children',
    type: 'React.ReactNode',
    description: 'Dialog content',
    required: false,
  },
  {
    name: 'size',
    type: 'MantineNumberSize | number',
    description: 'Dialog size',
    default: "'md'",
    required: false,
  },
  {
    name: 'padding',
    type: 'SpacingValue',
    description: 'Dialog padding',
    default: "'md'",
    required: false,
  },
  {
    name: 'radius',
    type: 'MantineNumberSize',
    description: 'Dialog border radius',
    default: "'md'",
    required: false,
  },
  {
    name: 'position',
    type: '{ top?: number; left?: number; right?: number; bottom?: number; }',
    description: 'Dialog position',
    required: false,
  },
  {
    name: 'centered',
    type: 'boolean',
    description: 'If true, dialog will be centered on screen',
    required: false,
  },
  {
    name: 'withShadow',
    type: 'boolean',
    description: 'If true, dialog will show shadow',
    default: 'true',
    required: false,
  },
  {
    name: 'withBorder',
    type: 'boolean',
    description: 'If true, dialog will show border',
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
    name: 'transitionDuration',
    type: 'number',
    description: 'Animation duration in ms',
    default: '200',
    required: false,
  },
  {
    name: 'accessibilityLabel',
    type: 'string',
    description: 'Accessibility label for the dialog',
    required: false,
  },
  {
    name: 'testID',
    type: 'string',
    description: 'Test identifier used by testing frameworks',
    required: false,
  },
];
