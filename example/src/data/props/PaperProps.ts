export interface PropDefinition {
  name: string;
  type: string;
  description: string;
  default?: string;
  required?: boolean;
}

export const paperProps: PropDefinition[] = [
  {
    name: 'shadow',
    type: "'xs' | 'sm' | 'md' | 'lg' | 'xl'",
    description: 'Key of theme.shadows to apply shadow elevation effect',
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
    name: 'p',
    type: 'number | "xs" | "sm" | "md" | "lg" | "xl"',
    description: 'Padding from theme.spacing (xs, sm, md, lg, xl), or number to set padding in pixels',
    default: '0',
    required: false,
  },
  {
    name: 'withBorder',
    type: 'boolean',
    description: 'Adds border with theme.colors.gray[3] in light mode and theme.colors.dark[4] in dark mode',
    default: 'false',
    required: false,
  },
  {
    name: 'children',
    type: 'React.ReactNode',
    description: 'Paper content',
    required: false,
  },
  {
    name: 'style',
    type: 'ViewStyle',
    description: 'Additional styles to apply to the paper container',
    required: false,
  },
];
