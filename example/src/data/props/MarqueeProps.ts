export interface PropDefinition {
  name: string;
  type: string;
  description: string;
  default?: string;
  required?: boolean;
}

export const marqueeProps: PropDefinition[] = [
  {
    name: 'children',
    type: 'React.ReactNode',
    description: 'Content that is scrolled',
    required: true,
  },
  {
    name: 'reverse',
    type: 'boolean',
    description: 'If set, the content is scrolled in the opposite direction',
    default: 'false',
    required: false,
  },
  {
    name: 'orientation',
    type: "'horizontal' | 'vertical'",
    description: 'Scroll orientation',
    default: '"horizontal"',
    required: false,
  },
  {
    name: 'repeat',
    type: 'number',
    description: 'Number of content copies rendered to create a seamless loop',
    default: '4',
    required: false,
  },
  {
    name: 'duration',
    type: 'number',
    description: 'Duration of one full loop in ms',
    default: '100000',
    required: false,
  },
  {
    name: 'gap',
    type: 'number | "xs" | "sm" | "md" | "lg" | "xl"',
    description: 'Key of theme.spacing or number, gap between content copies',
    default: '"md"',
    required: false,
  },
  {
    name: 'fadeEdges',
    type: 'boolean',
    description: 'Determines whether edges should be faded with a gradient',
    default: 'true',
    required: false,
  },
  {
    name: 'fadeEdgeColor',
    type: 'MantineColor',
    description: 'Color of the fade gradient, should match the background the component is rendered on',
    required: false,
  },
  {
    name: 'fadeEdgeSize',
    type: 'number | string',
    description: 'Size of the fade gradient',
    default: '"10%"',
    required: false,
  },
  {
    name: 'style',
    type: 'ViewStyle',
    description: 'Additional styles to apply to the root element',
    required: false,
  },
];
