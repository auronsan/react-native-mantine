export interface PropDefinition {
  name: string;
  type: string;
  description: string;
  default?: string;
  required?: boolean;
}

export const groupProps: PropDefinition[] = [
  {
    name: 'children',
    type: 'React.ReactNode',
    description: 'Components to be arranged horizontally in a row',
    required: true,
  },
  {
    name: 'spacing',
    type: 'number',
    description: 'Horizontal spacing (gap) between grouped children in pixels',
    default: '5',
    required: false,
  },
  {
    name: 'position',
    type: 'string',
    description: 'Horizontal distribution: "apart" (space-between), "center" (centered), "right" (flex-end), or default (flex-start)',
    required: false,
  },
  {
    name: 'align',
    type: "'start' | 'center' | 'end' | 'baseline' | 'stretch'",
    description: 'Vertical alignment of children using flexbox alignItems values',
    required: false,
  },
  {
    name: 'alignCenter',
    type: 'boolean',
    description: 'If true, vertically centers children (shorthand for align="center")',
    default: 'true',
    required: false,
  },
  {
    name: 'alignBottom',
    type: 'boolean',
    description: 'If true, aligns children to bottom (shorthand for align="end")',
    default: 'false',
    required: false,
  },
  {
    name: 'noWrap',
    type: 'boolean',
    description: 'If true, prevents children from wrapping to next line (flexWrap: "nowrap")',
    default: 'false',
    required: false,
  },
  {
    name: 'style',
    type: 'ViewStyle',
    description: 'Additional styles applied to the group container',
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
