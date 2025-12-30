export interface PropDefinition {
  name: string;
  type: string;
  description: string;
  default?: string;
  required?: boolean;
}

export const iconProps: PropDefinition[] = [
  {
    name: 'name',
    type: 'string',
    description: 'Icon name from FontAwesome icon set (e.g., "heart", "star", "user", "cog")',
    required: true,
  },
  {
    name: 'size',
    type: 'number',
    description: 'Icon size in pixels',
    default: '16',
    required: false,
  },
  {
    name: 'color',
    type: 'string',
    description: 'Icon color as a hex code or color name. If useThemeColor is true, this will be overridden',
    required: false,
  },
  {
    name: 'useThemeColor',
    type: 'boolean',
    description: 'If true, uses theme-based color (dark mode: light color, light mode: dark color)',
    default: 'false',
    required: false,
  },
  {
    name: 'allowFontScaling',
    type: 'boolean',
    description: 'Whether to allow font scaling based on device accessibility settings',
    default: 'false',
    required: false,
  },
  {
    name: 'style',
    type: 'TextStyle',
    description: 'Additional styles to apply to the icon',
    required: false,
  },
];
