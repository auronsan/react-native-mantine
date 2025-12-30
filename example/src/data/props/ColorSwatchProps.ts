export interface PropDefinition {
  name: string;
  type: string;
  description: string;
  default?: string;
  required?: boolean;
}

export const colorSwatchProps: PropDefinition[] = [
  {
    name: 'color',
    type: 'string',
    description: 'Swatch background color in any CSS valid format (hex, rgb, rgba, etc.)',
    required: true,
  },
  {
    name: 'size',
    type: 'number',
    description: 'Width and height of the swatch in pixels',
    default: '25',
    required: false,
  },
  {
    name: 'radius',
    type: 'number | "xs" | "sm" | "md" | "lg" | "xl"',
    description: 'Key of theme.radius or number to set border-radius in pixels',
    default: '"xl"',
    required: false,
  },
  {
    name: 'children',
    type: 'React.ReactNode',
    description: 'ColorSwatch children, for example check icon or other overlay content',
    required: false,
  },
  {
    name: 'withShadow',
    type: 'boolean',
    description: 'Determines whether the swatch should have inner shadow',
    default: 'true',
    required: false,
  },
  {
    name: 'onPress',
    type: '() => void',
    description: 'Called when swatch is pressed - makes swatch interactive',
    required: false,
  },
  {
    name: 'style',
    type: 'ViewStyle',
    description: 'Additional styles to apply to the swatch container',
    required: false,
  },
];
