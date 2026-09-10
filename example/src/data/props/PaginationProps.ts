// Generated from src/components/Pagination/index.tsx by scripts/generate-props.ts.
// Safe to edit: the generator does not overwrite this file unless run with --force.

export interface PropDefinition {
  name: string;
  type: string;
  description: string;
  default?: string;
  required?: boolean;
}

export const paginationProps: PropDefinition[] = [
  {
    name: 'value',
    type: 'number',
    description: 'Current page (controlled)',
    required: false,
  },
  {
    name: 'defaultValue',
    type: 'number',
    description: 'Default page (uncontrolled)',
    required: false,
  },
  {
    name: 'onChange',
    type: '(page: number) => void',
    description: 'Called when page changes',
    required: false,
  },
  {
    name: 'total',
    type: 'number',
    description: 'Total number of pages',
    required: true,
  },
  {
    name: 'size',
    type: 'MantineSize',
    description: 'Pagination size',
    default: "'md'",
    required: false,
  },
  {
    name: 'color',
    type: 'MantineColor',
    description: 'Pagination color',
    default: "'blue'",
    required: false,
  },
  {
    name: 'radius',
    type: 'MantineNumberSize',
    description: 'Key of theme.radius or any valid value to set border-radius',
    default: "'sm'",
    required: false,
  },
  {
    name: 'siblings',
    type: 'number',
    description: 'Number of siblings on each side of selected page',
    default: '1',
    required: false,
  },
  {
    name: 'boundaries',
    type: 'number',
    description: 'Number of elements visible on each side of selected page',
    default: '1',
    required: false,
  },
  {
    name: 'withControls',
    type: 'boolean',
    description: 'Show previous/next controls',
    default: 'true',
    required: false,
  },
  {
    name: 'withEdges',
    type: 'boolean',
    description: 'Show first/last controls',
    default: 'false',
    required: false,
  },
  {
    name: 'disabled',
    type: 'boolean',
    description: 'Disabled state',
    default: 'false',
    required: false,
  },
  {
    name: 'previousIcon',
    type: 'React.ReactNode',
    description: 'Custom icon for the previous-page control',
    required: false,
  },
  {
    name: 'nextIcon',
    type: 'React.ReactNode',
    description: 'Custom icon for the next-page control',
    required: false,
  },
  {
    name: 'firstIcon',
    type: 'React.ReactNode',
    description: 'Custom icon for the first-page control',
    required: false,
  },
  {
    name: 'lastIcon',
    type: 'React.ReactNode',
    description: 'Custom icon for the last-page control',
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
