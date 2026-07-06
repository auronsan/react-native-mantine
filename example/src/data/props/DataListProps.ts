export interface PropDefinition {
  name: string;
  type: string;
  description: string;
  default?: string;
  required?: boolean;
}

export const dataListProps: PropDefinition[] = [
  {
    name: 'children',
    type: 'React.ReactNode',
    description: 'DataList.Item components',
    required: false,
  },
  {
    name: 'size',
    type: "'xs' | 'sm' | 'md' | 'lg' | 'xl'",
    description: 'Controls font size of labels and values',
    default: '"sm"',
    required: false,
  },
  {
    name: 'gap',
    type: 'MantineNumberSize',
    description: 'Key of theme.spacing or number, gap between items',
    default: '"sm"',
    required: false,
  },
  {
    name: 'orientation',
    type: "'horizontal' | 'vertical'",
    description:
      'Orientation of items, horizontal renders label and value side by side',
    default: '"horizontal"',
    required: false,
  },
  {
    name: 'withDivider',
    type: 'boolean',
    description: 'Determines whether items should be separated with a divider',
    default: 'false',
    required: false,
  },
  {
    name: 'labelWidth',
    type: 'number',
    description: 'Width of the label column in horizontal orientation',
    default: '120',
    required: false,
  },
  {
    name: 'style',
    type: 'ViewStyle',
    description: 'Additional styles to apply to the root element',
    required: false,
  },
];
