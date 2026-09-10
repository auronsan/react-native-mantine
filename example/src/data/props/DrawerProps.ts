// Generated from src/components/Drawer/index.tsx by scripts/generate-props.ts.
// Safe to edit: the generator does not overwrite this file unless run with --force.

export interface PropDefinition {
  name: string;
  type: string;
  description: string;
  default?: string;
  required?: boolean;
}

export const drawerProps: PropDefinition[] = [
  {
    name: 'opened',
    type: 'boolean',
    description: 'Drawer opened state',
    required: true,
  },
  {
    name: 'onClose',
    type: '() => void',
    description: 'Called when drawer is closed',
    required: true,
  },
  {
    name: 'title',
    type: 'React.ReactNode',
    description: 'Drawer title',
    required: false,
  },
  {
    name: 'children',
    type: 'React.ReactNode',
    description: 'Drawer content',
    required: false,
  },
  {
    name: 'size',
    type: 'MantineNumberSize | number',
    description: 'Drawer size',
    default: "'md'",
    required: false,
  },
  {
    name: 'padding',
    type: 'SpacingValue',
    description: 'Drawer padding',
    default: "'md'",
    required: false,
  },
  {
    name: 'position',
    type: "'left' | 'right' | 'top' | 'bottom'",
    description: 'Drawer position',
    default: "'left'",
    required: false,
  },
  {
    name: 'closeOnClickOutside',
    type: 'boolean',
    description: 'If true, pressing the overlay closes the drawer',
    default: 'true',
    required: false,
  },
  {
    name: 'withOverlay',
    type: 'boolean',
    description: 'If true, drawer will show overlay',
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
    name: 'style',
    type: 'any',
    description: 'Additional styles',
    required: false,
  },
  {
    name: 'transitionDuration',
    type: 'number',
    description: 'Animation duration in ms',
    default: '250',
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
    description: 'Accessibility label for the drawer',
    required: false,
  },
  {
    name: 'testID',
    type: 'string',
    description: 'Test identifier used by testing frameworks',
    required: false,
  },
];
