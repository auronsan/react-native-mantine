// Generated from src/components/Accordion/index.tsx by scripts/generate-props.ts.
// Safe to edit: the generator does not overwrite this file unless run with --force.

export interface PropDefinition {
  name: string;
  type: string;
  description: string;
  default?: string;
  required?: boolean;
}

export const accordionProps: PropDefinition[] = [
  {
    name: 'children',
    type: 'React.ReactNode',
    description: 'Accordion items',
    required: true,
  },
  {
    name: 'multiple',
    type: 'boolean',
    description: 'Allow multiple items to be opened at once',
    required: false,
  },
  {
    name: 'defaultValue',
    type: 'string | string[]',
    description: 'Default opened items (uncontrolled)',
    required: false,
  },
  {
    name: 'value',
    type: 'string | string[]',
    description: 'Controlled opened items',
    required: false,
  },
  {
    name: 'onChange',
    type: '(value: string | string[]) => void',
    description: 'Called when opened items change',
    required: false,
  },
  {
    name: 'variant',
    type: "'default' | 'contained' | 'separated'",
    description: 'Accordion variant',
    required: false,
  },
  {
    name: 'radius',
    type: 'MantineNumberSize',
    description: 'Border radius',
    required: false,
  },
  {
    name: 'spacing',
    type: 'SpacingValue',
    description: 'Spacing between items (separated variant only)',
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
