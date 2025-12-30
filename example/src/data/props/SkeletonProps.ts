export interface PropDefinition {
  name: string;
  type: string;
  description: string;
  default?: string;
  required?: boolean;
}

export const skeletonProps: PropDefinition[] = [
  {
    name: 'height',
    type: 'number | string',
    description: 'Skeleton height in pixels (number) or any valid size string. When circle is true, this determines the circle diameter',
    default: '120',
    required: false,
  },
  {
    name: 'width',
    type: 'number | string',
    description: 'Skeleton width in pixels (number) or any valid size string. Ignored when circle is true',
    default: '"100%"',
    required: false,
  },
  {
    name: 'radius',
    type: 'number | "xs" | "sm" | "md" | "lg" | "xl"',
    description: 'Key of theme.radius or any valid number to set border-radius. Ignored when circle is true',
    default: '"sm"',
    required: false,
  },
  {
    name: 'circle',
    type: 'boolean',
    description: 'If true, skeleton will be rendered as a circle with equal width and height based on the height prop',
    default: 'false',
    required: false,
  },
  {
    name: 'animate',
    type: 'boolean',
    description: 'Controls whether to show the shimmer pulse animation effect',
    default: 'true',
    required: false,
  },
  {
    name: 'visible',
    type: 'boolean',
    description: 'If true, shows the skeleton. If false and children are provided, shows the children instead',
    default: 'true',
    required: false,
  },
  {
    name: 'children',
    type: 'React.ReactNode',
    description: 'Content to display when visible is false. Useful for conditional loading states',
    required: false,
  },
  {
    name: 'style',
    type: 'ViewStyle',
    description: 'Additional styles to apply to the skeleton container',
    required: false,
  },
];
