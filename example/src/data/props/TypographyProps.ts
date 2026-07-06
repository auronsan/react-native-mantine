export interface PropDefinition {
  name: string;
  type: string;
  description: string;
  default?: string;
  required?: boolean;
}

export const typographyProps: PropDefinition[] = [
  {
    name: 'children',
    type: 'React.ReactNode',
    description:
      'Content, string children are wrapped in styled Text, elements are rendered as-is',
    required: false,
  },
  {
    name: 'textStyle',
    type: 'StyleProp<TextStyle>',
    description: 'Text style applied to string children',
    required: false,
  },
  {
    name: 'style',
    type: 'ViewStyle',
    description: 'Additional styles to apply to the root element',
    required: false,
  },
];
