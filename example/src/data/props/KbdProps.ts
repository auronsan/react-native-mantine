// Generated from src/components/Kbd/index.tsx by scripts/generate-props.ts.
// Safe to edit: the generator does not overwrite this file unless run with --force.

export interface PropDefinition {
  name: string;
  type: string;
  description: string;
  default?: string;
  required?: boolean;
}

export const kbdProps: PropDefinition[] = [
  {
    name: 'size',
    type: 'MantineSize',
    description: 'Kbd size',
    default: "'md'",
    required: false,
  },
  {
    name: 'children',
    type: 'React.ReactNode',
    description: 'Kbd content',
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
