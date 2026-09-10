// Generated from src/components/Grid/index.tsx by scripts/generate-props.ts.
// Safe to edit: the generator does not overwrite this file unless run with --force.

export interface PropDefinition {
  name: string;
  type: string;
  description: string;
  default?: string;
  required?: boolean;
}

export const gridProps: PropDefinition[] = [
  {
    name: 'columns',
    type: 'number',
    description: 'Number of columns in the grid',
    required: false,
  },
  {
    name: 'gutter',
    type: 'MantineNumberSize',
    description: 'Spacing between columns and rows',
    required: false,
  },
  {
    name: 'grow',
    type: 'boolean',
    description: 'Grow columns to fit available space',
    required: false,
  },
  {
    name: 'align',
    type: "'stretch' | 'center' | 'flex-start' | 'flex-end'",
    description: 'Align items vertically',
    required: false,
  },
  {
    name: 'justify',
    type: "'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around'",
    description: 'Justify items horizontally',
    required: false,
  },
  {
    name: 'children',
    type: 'React.ReactNode',
    description: 'Grid children',
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
