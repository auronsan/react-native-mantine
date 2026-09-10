// Generated from src/components/Breadcrumbs/index.tsx by scripts/generate-props.ts.
// Safe to edit: the generator does not overwrite this file unless run with --force.

export interface PropDefinition {
  name: string;
  type: string;
  description: string;
  default?: string;
  required?: boolean;
}

export const breadcrumbsProps: PropDefinition[] = [
  {
    name: 'separator',
    type: 'React.ReactNode',
    description: 'Breadcrumb separator',
    default: "'/'",
    required: false,
  },
  {
    name: 'children',
    type: 'React.ReactNode',
    description: 'Breadcrumb items',
    required: false,
  },
  {
    name: 'accessibilityLabel',
    type: 'string',
    description: 'Accessibility label for the breadcrumbs navigation',
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
