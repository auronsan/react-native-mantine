// Generated from src/components/LoadingOverlay/index.tsx by scripts/generate-props.ts.
// Safe to edit: the generator does not overwrite this file unless run with --force.

export interface PropDefinition {
  name: string;
  type: string;
  description: string;
  default?: string;
  required?: boolean;
}

export const loadingOverlayProps: PropDefinition[] = [
  {
    name: 'visible',
    type: 'boolean',
    description: 'Controls overlay visibility',
    default: 'false',
    required: true,
  },
  {
    name: 'overlayOpacity',
    type: 'number',
    description: 'Overlay opacity',
    default: '0.75',
    required: false,
  },
  {
    name: 'overlayColor',
    type: 'string',
    description: 'Overlay color',
    default: "'#fff'",
    required: false,
  },
  {
    name: 'overlayBlur',
    type: 'number',
    description: 'Overlay blur (not fully supported in React Native)',
    default: '0',
    required: false,
  },
  {
    name: 'loaderSize',
    type: "'xs' | 'sm' | 'md' | 'lg' | 'xl'",
    description: 'Loader size',
    default: "'md'",
    required: false,
  },
  {
    name: 'radius',
    type: 'MantineNumberSize',
    description: 'Border radius',
    default: '0',
    required: false,
  },
  {
    name: 'zIndex',
    type: 'number',
    description: 'Z-index',
    default: '1000',
    required: false,
  },
  {
    name: 'transitionDuration',
    type: 'number',
    description: 'Transition duration in ms',
    default: '200',
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
