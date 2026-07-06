export interface PropDefinition {
  name: string;
  type: string;
  description: string;
  default?: string;
  required?: boolean;
}

export const floatingIndicatorProps: PropDefinition[] = [
  {
    name: 'target',
    type: 'FloatingIndicatorTarget | null',
    description:
      'Layout of the target element relative to the parent, null hides the indicator. Use onLayout of the target to measure it',
    required: false,
  },
  {
    name: 'transitionDuration',
    type: 'number',
    description: 'Transition duration in ms',
    default: '150',
    required: false,
  },
  {
    name: 'radius',
    type: 'number | "xs" | "sm" | "md" | "lg" | "xl"',
    description: 'Key of theme.radius or any valid value to set border-radius',
    default: '"sm"',
    required: false,
  },
  {
    name: 'color',
    type: 'MantineColor',
    description: 'Key of theme.colors or any valid color, controls background color',
    required: false,
  },
  {
    name: 'children',
    type: 'React.ReactNode',
    description: 'Indicator content',
    required: false,
  },
  {
    name: 'style',
    type: 'ViewStyle',
    description: 'Additional styles to apply to the indicator',
    required: false,
  },
];

export const floatingIndicatorTargetProps: PropDefinition[] = [
  {
    name: 'x',
    type: 'number',
    description: 'Offset from the left edge of the parent',
    required: true,
  },
  {
    name: 'y',
    type: 'number',
    description: 'Offset from the top edge of the parent',
    required: true,
  },
  {
    name: 'width',
    type: 'number',
    description: 'Target width',
    required: true,
  },
  {
    name: 'height',
    type: 'number',
    description: 'Target height',
    required: true,
  },
];
