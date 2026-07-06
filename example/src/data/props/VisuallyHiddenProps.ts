export interface PropDefinition {
  name: string;
  type: string;
  description: string;
  default?: string;
  required?: boolean;
}

export const visuallyHiddenProps: PropDefinition[] = [
  {
    name: 'children',
    type: 'React.ReactNode',
    description: 'Content hidden from the screen but announced by screen readers',
    required: true,
  },
  {
    name: 'accessibilityLabel',
    type: 'string',
    description: 'Accessibility label announced by screen readers',
    required: false,
  },
  {
    name: 'style',
    type: 'ViewStyle',
    description: 'Additional styles to apply to the hidden container',
    required: false,
  },
];
