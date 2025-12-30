export interface PropDefinition {
  name: string;
  type: string;
  description: string;
  default?: string;
  required?: boolean;
}

export const unstyledButtonProps: PropDefinition[] = [
  {
    name: 'onPress',
    type: '(payload: any) => void',
    description: 'Callback function fired when button is pressed',
    required: false,
  },
  {
    name: 'disabled',
    type: 'boolean',
    description: 'If true, disables button interaction and touch events',
    default: 'false',
    required: false,
  },
  {
    name: 'activeOpacity',
    type: 'number',
    description: 'Determines opacity of button when pressed. Value between 0 and 1',
    default: '0.7',
    required: false,
  },
  {
    name: 'variant',
    type: 'string',
    description: 'Optional variant identifier for custom styling (currently not implemented in default styles)',
    required: false,
  },
  {
    name: 'children',
    type: 'React.ReactNode',
    description: 'Button content, typically Text or View components',
    required: false,
  },
  {
    name: 'style',
    type: 'ViewStyle',
    description: 'Custom styles to apply to the button container. Use this to style your button as needed',
    required: false,
  },
];
