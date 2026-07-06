export interface PropDefinition {
  name: string;
  type: string;
  description: string;
  default?: string;
  required?: boolean;
}

export const fieldsetProps: PropDefinition[] = [
  {
    name: 'children',
    type: 'React.ReactNode',
    description: 'Fieldset content, typically form fields',
    required: false,
  },
  {
    name: 'legend',
    type: 'React.ReactNode',
    description: 'Fieldset legend, displayed on top of the border',
    required: false,
  },
  {
    name: 'variant',
    type: "'default' | 'filled' | 'unstyled'",
    description: 'Visual variant - default (bordered), filled (subtle background), or unstyled (no border or padding)',
    default: '"default"',
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
    name: 'disabled',
    type: 'boolean',
    description: 'Disables all inputs and buttons inside the fieldset',
    default: 'false',
    required: false,
  },
  {
    name: 'legendStyle',
    type: 'TextStyle',
    description: 'Additional styles to apply to the legend text',
    required: false,
  },
  {
    name: 'style',
    type: 'ViewStyle',
    description: 'Additional styles to apply to the fieldset container',
    required: false,
  },
];
