export interface PropDefinition {
  name: string;
  type: string;
  description: string;
  default?: string;
  required?: boolean;
}

export const buttonProps: PropDefinition[] = [
  {
    name: 'size',
    type: "'xs' | 'sm' | 'md' | 'lg' | 'xl'",
    description: 'Predefined button size that controls padding, font size, and height',
    default: "'sm'",
    required: false,
  },
  {
    name: 'variant',
    type: "'filled' | 'outline' | 'light' | 'white' | 'default' | 'subtle' | 'gradient'",
    description: 'Controls button appearance and visual style',
    default: "'filled'",
    required: false,
  },
  {
    name: 'color',
    type: 'MantineColor',
    description: 'Button color from theme (e.g., "blue", "red", "green", "orange", "grape")',
    default: 'theme.primaryColor',
    required: false,
  },
  {
    name: 'fullWidth',
    type: 'boolean',
    description: 'Sets button width to 100% of parent element',
    default: 'false',
    required: false,
  },
  {
    name: 'radius',
    type: 'number | "xs" | "sm" | "md" | "lg" | "xl"',
    description: 'Key of theme.radius or any valid number to set border-radius',
    default: 'theme.defaultRadius',
    required: false,
  },
  {
    name: 'leftIcon',
    type: 'React.ReactNode',
    description: 'Adds icon before button label',
    required: false,
  },
  {
    name: 'rightIcon',
    type: 'React.ReactNode',
    description: 'Adds icon after button label',
    required: false,
  },
  {
    name: 'uppercase',
    type: 'boolean',
    description: 'Set text-transform to uppercase',
    default: 'false',
    required: false,
  },
  {
    name: 'compact',
    type: 'boolean',
    description: 'Reduces vertical and horizontal spacing',
    default: 'false',
    required: false,
  },
  {
    name: 'loading',
    type: 'boolean',
    description: 'Indicate loading state with an activity indicator',
    default: 'false',
    required: false,
  },
  {
    name: 'loaderPosition',
    type: "'left' | 'right' | 'center'",
    description: 'Loader position relative to button label',
    default: "'left'",
    required: false,
  },
  {
    name: 'loaderProps',
    type: 'LoaderProps',
    description: 'Props spread to Loader component',
    required: false,
  },
  {
    name: 'disabled',
    type: 'boolean',
    description: 'Disabled state - prevents interaction and shows disabled styling',
    default: 'false',
    required: false,
  },
  {
    name: 'gradient',
    type: 'MantineGradient',
    description: 'Controls gradient settings in gradient variant only. Object with from, to, and deg properties',
    required: false,
  },
  {
    name: 'children',
    type: 'React.ReactNode',
    description: 'Button label content',
    required: false,
  },
  {
    name: 'onPress',
    type: '() => void',
    description: 'Function called when button is pressed',
    required: false,
  },
  {
    name: 'style',
    type: 'ViewStyle',
    description: 'Additional styles to apply to the button',
    required: false,
  },
];
