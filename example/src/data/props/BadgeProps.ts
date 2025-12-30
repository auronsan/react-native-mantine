export interface PropDefinition {
  name: string;
  type: string;
  description: string;
  default?: string;
  required?: boolean;
}

export const badgeProps: PropDefinition[] = [
  {
    name: 'color',
    type: 'MantineColor',
    description: 'Badge color from theme (e.g., "blue", "red", "green", "orange", "grape")',
    default: '"blue"',
    required: false,
  },
  {
    name: 'variant',
    type: "'filled' | 'light' | 'outline' | 'dot'",
    description: 'Controls badge appearance - filled (solid background), light (subtle background), outline (border only), or dot (with colored dot indicator)',
    default: '"light"',
    required: false,
  },
  {
    name: 'size',
    type: "'xs' | 'sm' | 'md' | 'lg' | 'xl'",
    description: 'Badge size that controls font size, height, and padding',
    default: '"md"',
    required: false,
  },
  {
    name: 'radius',
    type: 'number | "xs" | "sm" | "md" | "lg" | "xl"',
    description: 'Key of theme.radius or any valid number to set border-radius',
    default: '"xl"',
    required: false,
  },
  {
    name: 'fullWidth',
    type: 'boolean',
    description: 'Sets badge width to 100% of parent element',
    default: 'false',
    required: false,
  },
  {
    name: 'leftSection',
    type: 'React.ReactNode',
    description: 'Section displayed on the left side of badge (e.g., icon or custom component)',
    required: false,
  },
  {
    name: 'rightSection',
    type: 'React.ReactNode',
    description: 'Section displayed on the right side of badge (e.g., icon or custom component)',
    required: false,
  },
  {
    name: 'children',
    type: 'React.ReactNode',
    description: 'Badge label content, usually text but can be any React node',
    required: false,
  },
  {
    name: 'withTextWrapper',
    type: 'boolean',
    description: 'Controls whether children are automatically wrapped in a Text component',
    default: 'true',
    required: false,
  },
  {
    name: 'style',
    type: 'ViewStyle',
    description: 'Additional styles to apply to the badge container',
    required: false,
  },
];
