export interface PropDefinition {
  name: string;
  type: string;
  description: string;
  default?: string;
  required?: boolean;
}

export const themeIconProps: PropDefinition[] = [
  {
    name: 'children',
    type: 'React.ReactNode',
    description: 'Icon component or element to display',
    required: true,
  },
  {
    name: 'color',
    type: 'MantineColor',
    description: 'Key of theme.colors to apply color',
    default: '"blue"',
    required: false,
  },
  {
    name: 'variant',
    type: "'filled' | 'light' | 'gradient' | 'outline'",
    description: 'Controls appearance - filled (solid background), light (subtle background), gradient (gradient background), or outline (border only)',
    default: '"filled"',
    required: false,
  },
  {
    name: 'gradient',
    type: 'MantineGradient',
    description: 'Controls gradient settings in gradient variant only - object with from, to, and deg properties',
    default: '{ from: "blue", to: "cyan", deg: 45 }',
    required: false,
  },
  {
    name: 'size',
    type: "'xs' | 'sm' | 'md' | 'lg' | 'xl' | number",
    description: 'Predefined size or number to set width and height in pixels',
    default: '"md"',
    required: false,
  },
  {
    name: 'radius',
    type: 'number | "xs" | "sm" | "md" | "lg" | "xl"',
    description: 'Key of theme.radius or number to set border-radius in pixels',
    default: '"sm"',
    required: false,
  },
  {
    name: 'style',
    type: 'ViewStyle',
    description: 'Additional styles to apply to the icon container',
    required: false,
  },
];
