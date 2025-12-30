export interface PropDefinition {
  name: string;
  type: string;
  description: string;
  default?: string;
  required?: boolean;
}

export const loaderProps: PropDefinition[] = [
  {
    name: 'size',
    type: 'number | "xs" | "sm" | "md" | "lg" | "xl"',
    description: 'Defines width of loader as predefined size (xs: 18px, sm: 22px, md: 36px, lg: 44px, xl: 58px) or custom number in pixels',
    default: '"md"',
    required: false,
  },
  {
    name: 'color',
    type: 'MantineColor',
    description: 'Loader color from theme (e.g., "blue", "red", "green"). Uses theme.primaryColor if not specified',
    required: false,
  },
  {
    name: 'variant',
    type: 'any',
    description: 'Loader appearance variant (currently uses React Native ActivityIndicator)',
    required: false,
  },
];
