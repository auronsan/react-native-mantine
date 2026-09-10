// Generated from src/components/Gradient/index.tsx by scripts/generate-props.ts.
// Safe to edit: the generator does not overwrite this file unless run with --force.

export interface PropDefinition {
  name: string;
  type: string;
  description: string;
  default?: string;
  required?: boolean;
}

export const gradientProps: PropDefinition[] = [
  {
    name: 'gradient',
    type: 'MantineGradient',
    description: 'Gradient configuration with from/to colors and optional degrees',
    required: false,
  },
  {
    name: 'children',
    type: 'React.ReactNode',
    description: 'Children to render inside gradient',
    required: false,
  },
  {
    name: 'style',
    type: 'ViewStyle',
    description: 'Additional styles',
    required: false,
  },
  {
    name: 'fill',
    type: 'boolean',
    description: 'Whether to render as full width/height',
    default: 'true',
    required: false,
  },
];
