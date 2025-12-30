export interface PropDefinition {
  name: string;
  type: string;
  description: string;
  default?: string;
  required?: boolean;
}

export const overlayProps: PropDefinition[] = [
  {
    name: 'opacity',
    type: 'number',
    description: 'Controls overlay opacity, value between 0 (transparent) and 1 (opaque)',
    default: '0.6',
    required: false,
  },
  {
    name: 'color',
    type: 'string',
    description: 'Overlay background color, typically a hex color or named color',
    default: '"#000"',
    required: false,
  },
  {
    name: 'blur',
    type: 'number',
    description: 'Controls overlay blur effect (note: not fully supported in React Native)',
    required: false,
  },
  {
    name: 'zIndex',
    type: 'number',
    description: 'Controls overlay z-index for stacking order',
    default: '1000',
    required: false,
  },
  {
    name: 'radius',
    type: 'number | "xs" | "sm" | "md" | "lg" | "xl"',
    description: 'Key of theme.radius or any valid number to set border-radius',
    default: '0',
    required: false,
  },
  {
    name: 'children',
    type: 'React.ReactNode',
    description: 'Content to render inside the overlay',
    required: false,
  },
  {
    name: 'onPress',
    type: '() => void',
    description: 'Callback fired when overlay is pressed. If provided, overlay becomes touchable',
    required: false,
  },
  {
    name: 'fixed',
    type: 'boolean',
    description: 'If true, overlay will not block touches to underlying content',
    default: 'false',
    required: false,
  },
  {
    name: 'style',
    type: 'ViewStyle',
    description: 'Additional styles to apply to the overlay',
    required: false,
  },
];
