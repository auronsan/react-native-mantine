// Generated from src/components/Image/index.tsx by scripts/generate-props.ts.
// Safe to edit: the generator does not overwrite this file unless run with --force.

export interface PropDefinition {
  name: string;
  type: string;
  description: string;
  default?: string;
  required?: boolean;
}

export const imageProps: PropDefinition[] = [
  {
    name: 'source',
    type: 'ImageSourcePropType',
    description: 'Image source',
    required: true,
  },
  {
    name: 'width',
    type: 'number',
    description: 'Image width',
    required: false,
  },
  {
    name: 'height',
    type: 'number',
    description: 'Image height',
    required: false,
  },
  {
    name: 'fit',
    type: "'contain' | 'cover' | 'fill' | 'none' | 'scale-down'",
    description: 'Image fit',
    default: "'cover'",
    required: false,
  },
  {
    name: 'radius',
    type: 'MantineNumberSize',
    description: 'Key of theme.radius or any valid value to set border-radius',
    default: '0',
    required: false,
  },
  {
    name: 'placeholder',
    type: 'React.ReactNode',
    description: 'Placeholder to show when image is loading',
    required: false,
  },
  {
    name: 'errorMessage',
    type: 'string',
    description: 'Error message to show when image fails to load',
    default: "'Failed to load image'",
    required: false,
  },
  {
    name: 'errorPlaceholder',
    type: 'React.ReactNode',
    description: 'Custom error placeholder',
    required: false,
  },
  {
    name: 'alt',
    type: 'string',
    description: 'Image alt text for accessibility',
    required: false,
  },
  {
    name: 'onLoad',
    type: '() => void',
    description: 'Called when image loads',
    required: false,
  },
  {
    name: 'onError',
    type: '(error: NativeSyntheticEvent<ImageErrorEventData>) => void',
    description: 'Called when image fails to load',
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
