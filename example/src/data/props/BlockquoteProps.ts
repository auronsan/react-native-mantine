// Generated from src/components/Blockquote/index.tsx by scripts/generate-props.ts.
// Safe to edit: the generator does not overwrite this file unless run with --force.

export interface PropDefinition {
  name: string;
  type: string;
  description: string;
  default?: string;
  required?: boolean;
}

export const blockquoteProps: PropDefinition[] = [
  {
    name: 'color',
    type: 'MantineColor',
    description: 'Blockquote color from theme',
    default: "'blue'",
    required: false,
  },
  {
    name: 'icon',
    type: 'React.ReactNode',
    description: 'Icon to display on the left side',
    required: false,
  },
  {
    name: 'cite',
    type: 'React.ReactNode',
    description: 'Citation text',
    required: false,
  },
  {
    name: 'radius',
    type: 'MantineNumberSize',
    description: 'Border radius',
    default: "'sm'",
    required: false,
  },
  {
    name: 'children',
    type: 'React.ReactNode',
    description: 'Blockquote content',
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
  {
    name: 'withTextWrapper',
    type: 'boolean',
    description: 'If false, children will not be wrapped in a Text component. This is useful when the children contain non-text elements like icons or custom components.',
    default: 'true',
    required: false,
  },
];
