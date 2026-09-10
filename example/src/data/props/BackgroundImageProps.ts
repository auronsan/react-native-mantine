// Generated from src/components/BackgroundImage/index.tsx by scripts/generate-props.ts.
// Safe to edit: the generator does not overwrite this file unless run with --force.

export interface PropDefinition {
  name: string;
  type: string;
  description: string;
  default?: string;
  required?: boolean;
}

export const backgroundImageProps: PropDefinition[] = [
  {
    name: 'source',
    type: 'ImageSourcePropType',
    description: 'Background image source',
    required: true,
  },
  {
    name: 'radius',
    type: 'MantineNumberSize',
    description: 'Key of theme.radius or any valid value to set border-radius',
    default: '0',
    required: false,
  },
  {
    name: 'children',
    type: 'React.ReactNode',
    description: 'Background image children',
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
