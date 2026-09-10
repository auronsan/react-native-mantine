// Generated from src/components/AspectRatio/index.tsx by scripts/generate-props.ts.
// Safe to edit: the generator does not overwrite this file unless run with --force.

export interface PropDefinition {
  name: string;
  type: string;
  description: string;
  default?: string;
  required?: boolean;
}

export const aspectRatioProps: PropDefinition[] = [
  {
    name: 'ratio',
    type: 'number',
    description: 'Aspect ratio, e.g., 16/9, 4/3, 1',
    default: '1',
    required: true,
  },
  {
    name: 'children',
    type: 'React.ReactNode',
    description: 'Children to render inside aspect ratio container',
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
