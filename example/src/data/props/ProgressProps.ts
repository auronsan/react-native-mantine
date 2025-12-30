export interface PropDefinition {
  name: string;
  type: string;
  description: string;
  default?: string;
  required?: boolean;
}

export const progressProps: PropDefinition[] = [
  {
    name: 'value',
    type: 'number',
    description: 'Progress value from 0 to 100. Animated with smooth transition when changed',
    default: '0',
    required: false,
  },
  {
    name: 'color',
    type: 'MantineColor',
    description: 'Progress bar color from theme (e.g., "blue", "red", "green", "teal")',
    default: '"blue"',
    required: false,
  },
  {
    name: 'size',
    type: "'xs' | 'sm' | 'md' | 'lg' | 'xl' | number",
    description: 'Progress bar height as predefined size or custom number in pixels',
    default: '"md"',
    required: false,
  },
  {
    name: 'radius',
    type: 'number | "xs" | "sm" | "md" | "lg" | "xl"',
    description: 'Key of theme.radius or any valid number to set border-radius',
    default: '"sm"',
    required: false,
  },
  {
    name: 'striped',
    type: 'boolean',
    description: 'Adds diagonal stripes pattern to the progress bar for visual interest',
    default: 'false',
    required: false,
  },
  {
    name: 'animate',
    type: 'boolean',
    description: 'Whether to animate striped progress bars (requires striped=true)',
    default: 'false',
    required: false,
  },
  {
    name: 'sections',
    type: 'ProgressSection[]',
    description: 'Array of sections to create multi-segment progress bar. Each section has value (0-100), color, and optional label. When provided, the value prop is ignored',
    required: false,
  },
  {
    name: 'style',
    type: 'ViewStyle',
    description: 'Additional styles to apply to the progress bar container',
    required: false,
  },
];
