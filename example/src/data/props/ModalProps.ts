// Generated from src/components/Modal/index.tsx by scripts/generate-props.ts.
// Safe to edit: the generator does not overwrite this file unless run with --force.

export interface PropDefinition {
  name: string;
  type: string;
  description: string;
  default?: string;
  required?: boolean;
}

export const modalProps: PropDefinition[] = [
  {
    name: 'opened',
    type: 'boolean',
    description: 'Modal opened state',
    required: true,
  },
  {
    name: 'onClose',
    type: '() => void',
    description: 'Called when modal is closed',
    required: true,
  },
  {
    name: 'title',
    type: 'React.ReactNode',
    description: 'Modal title',
    required: false,
  },
  {
    name: 'children',
    type: 'React.ReactNode',
    description: 'Modal content',
    required: false,
  },
  {
    name: 'size',
    type: "MantineNumberSize | 'full'",
    description: 'Modal size',
    default: "'md'",
    required: false,
  },
  {
    name: 'padding',
    type: 'SpacingValue',
    description: 'Modal padding',
    default: "'md'",
    required: false,
  },
  {
    name: 'radius',
    type: 'MantineNumberSize',
    description: 'Modal border radius',
    default: "'md'",
    required: false,
  },
  {
    name: 'closeOnClickOutside',
    type: 'boolean',
    description: 'If true, pressing the overlay closes the modal',
    default: 'true',
    required: false,
  },
  {
    name: 'centered',
    type: 'boolean',
    description: 'If true, modal will be centered on screen',
    default: 'false',
    required: false,
  },
  {
    name: 'withOverlay',
    type: 'boolean',
    description: 'If true, modal will show overlay',
    default: 'true',
    required: false,
  },
  {
    name: 'overlayOpacity',
    type: 'number',
    description: 'Overlay opacity',
    default: '0.6',
    required: false,
  },
  {
    name: 'overlayColor',
    type: 'string',
    description: 'Overlay color',
    default: "'#000'",
    required: false,
  },
  {
    name: 'withCloseButton',
    type: 'boolean',
    description: 'If true, close button will be shown',
    default: 'true',
    required: false,
  },
  {
    name: 'fullScreen',
    type: 'boolean',
    description: 'If true, modal will take full screen',
    default: 'false',
    required: false,
  },
  {
    name: 'style',
    type: 'any',
    description: 'Additional styles',
    required: false,
  },
  {
    name: 'transitionDuration',
    type: 'number',
    description: 'Animation duration in ms',
    default: '200',
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
    name: 'accessibilityLabel',
    type: 'string',
    description: 'Accessibility label for the modal',
    required: false,
  },
  {
    name: 'testID',
    type: 'string',
    description: 'Test identifier used by testing frameworks',
    required: false,
  },
];
