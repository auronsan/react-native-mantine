export interface PropDefinition {
  name: string;
  type: string;
  description: string;
  default?: string;
  required?: boolean;
}

export const closeButtonProps: PropDefinition[] = [
  {
    name: 'onPress',
    type: '() => void',
    description: 'Called when button is pressed',
    required: false,
  },
  {
    name: 'size',
    type: "'xs' | 'sm' | 'md' | 'lg' | 'xl' | number",
    description: 'Button size - theme size or number in pixels',
    default: '"md"',
    required: false,
  },
  {
    name: 'radius',
    type: "'xs' | 'sm' | 'md' | 'lg' | 'xl'",
    description: 'Key of theme.radius to set border-radius',
    default: '"sm"',
    required: false,
  },
  {
    name: 'iconColor',
    type: 'string',
    description: 'Icon color - any valid color string',
    required: false,
  },
  {
    name: 'icon',
    type: 'React.ReactNode',
    description: 'Custom icon to replace default close icon',
    required: false,
  },
  {
    name: 'accessibilityLabel',
    type: 'string',
    description: 'Accessibility label for screen readers',
    default: '"Close"',
    required: false,
  },
  {
    name: 'disabled',
    type: 'boolean',
    description: 'Disabled state - prevents interaction and reduces opacity',
    default: 'false',
    required: false,
  },
  {
    name: 'style',
    type: 'ViewStyle',
    description: 'Additional styles to apply to the button container',
    required: false,
  },
];
