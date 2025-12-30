export interface PropDefinition {
  name: string;
  type: string;
  description: string;
  default?: string;
  required?: boolean;
}

export const stackProps: PropDefinition[] = [
  {
    name: 'children',
    type: 'React.ReactNode',
    description: 'Components to be stacked vertically',
    required: true,
  },
  {
    name: 'spacing',
    type: 'number',
    description: 'Vertical spacing (gap) between stacked children in pixels',
    default: '15',
    required: false,
  },
  {
    name: 'position',
    type: 'string',
    description: 'Horizontal alignment of children. Use "center" to center-align items',
    required: false,
  },
  {
    name: 'style',
    type: 'ViewStyle',
    description: 'Additional styles applied to the stack container',
    required: false,
  },
  {
    name: 'fullWidth',
    type: 'boolean',
    description: 'If true, sets width to 100% of parent container',
    required: false,
  },
  {
    name: 'fullHeight',
    type: 'boolean',
    description: 'If true, sets height to 100% of parent container',
    required: false,
  },
  {
    name: 'p',
    type: 'string | number',
    description: 'Padding on all sides (accepts "xs", "sm", "md", "lg", "xl" or number)',
    required: false,
  },
  {
    name: 'px',
    type: 'string | number',
    description: 'Horizontal padding (left and right)',
    required: false,
  },
  {
    name: 'py',
    type: 'string | number',
    description: 'Vertical padding (top and bottom)',
    required: false,
  },
  {
    name: 'pt',
    type: 'string | number',
    description: 'Padding top',
    required: false,
  },
  {
    name: 'pb',
    type: 'string | number',
    description: 'Padding bottom',
    required: false,
  },
  {
    name: 'pl',
    type: 'string | number',
    description: 'Padding left',
    required: false,
  },
  {
    name: 'pr',
    type: 'string | number',
    description: 'Padding right',
    required: false,
  },
  {
    name: 'm',
    type: 'string | number',
    description: 'Margin on all sides (accepts "xs", "sm", "md", "lg", "xl" or number)',
    required: false,
  },
  {
    name: 'mx',
    type: 'string | number',
    description: 'Horizontal margin (left and right)',
    required: false,
  },
  {
    name: 'my',
    type: 'string | number',
    description: 'Vertical margin (top and bottom)',
    required: false,
  },
  {
    name: 'mt',
    type: 'string | number',
    description: 'Margin top',
    required: false,
  },
  {
    name: 'mb',
    type: 'string | number',
    description: 'Margin bottom',
    required: false,
  },
  {
    name: 'ml',
    type: 'string | number',
    description: 'Margin left',
    required: false,
  },
  {
    name: 'mr',
    type: 'string | number',
    description: 'Margin right',
    required: false,
  },
];
