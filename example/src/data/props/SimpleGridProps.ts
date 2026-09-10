// Generated from src/components/SimpleGrid/index.tsx by scripts/generate-props.ts.
// Safe to edit: the generator does not overwrite this file unless run with --force.

export interface PropDefinition {
  name: string;
  type: string;
  description: string;
  default?: string;
  required?: boolean;
}

export const simpleGridProps: PropDefinition[] = [
  {
    name: 'cols',
    type: 'number',
    description: 'Number of columns',
    default: '1',
    required: false,
  },
  {
    name: 'spacing',
    type: 'MantineNumberSize',
    description: 'Spacing between columns and rows',
    default: "'md'",
    required: false,
  },
  {
    name: 'verticalSpacing',
    type: 'MantineNumberSize',
    description: 'Spacing between rows, defaults to spacing value',
    required: false,
  },
  {
    name: 'breakpoints',
    type: 'Array<{ maxWidth: number; cols: number; spacing?: MantineNumberSize }>',
    description: 'Breakpoints for responsive columns',
    required: false,
  },
  {
    name: 'children',
    type: 'React.ReactNode',
    description: 'Children to render in grid',
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
