// Generated from src/components/MediaQuery/index.tsx by scripts/generate-props.ts.
// Safe to edit: the generator does not overwrite this file unless run with --force.

export interface PropDefinition {
  name: string;
  type: string;
  description: string;
  default?: string;
  required?: boolean;
}

export const mediaQueryProps: PropDefinition[] = [
  {
    name: 'minWidth',
    type: 'number',
    description: 'Minimum width for the query to match',
    required: false,
  },
  {
    name: 'maxWidth',
    type: 'number',
    description: 'Maximum width for the query to match',
    required: false,
  },
  {
    name: 'minHeight',
    type: 'number',
    description: 'Minimum height for the query to match',
    required: false,
  },
  {
    name: 'maxHeight',
    type: 'number',
    description: 'Maximum height for the query to match',
    required: false,
  },
  {
    name: 'largerThan',
    type: 'number | string',
    description: 'Shorthand for minWidth (convenience prop)',
    required: false,
  },
  {
    name: 'smallerThan',
    type: 'number | string',
    description: 'Shorthand for maxWidth (convenience prop)',
    required: false,
  },
  {
    name: 'orientation',
    type: "'portrait' | 'landscape'",
    description: 'Orientation to match',
    required: false,
  },
  {
    name: 'children',
    type: 'React.ReactNode',
    description: 'Children to render when query matches',
    required: false,
  },
  {
    name: 'query',
    type: "'window' | 'screen'",
    description: 'Query type - window or screen',
    default: "'window'",
    required: false,
  },
  {
    name: 'style',
    type: 'StyleProp<ViewStyle>',
    description: 'Additional styles applied to the root element',
    required: false,
  },
  {
    name: 'testID',
    type: 'string',
    description: 'Test identifier used by testing frameworks',
    required: false,
  },
];
