export interface PropDefinition {
  name: string;
  type: string;
  description: string;
  default?: string;
  required?: boolean;
}

export const boxViewProps: PropDefinition[] = [
  {
    name: 'fullWidth',
    type: 'boolean',
    description: 'Sets width to 100% of parent container',
    default: 'false',
    required: false,
  },
  {
    name: 'fullHeight',
    type: 'boolean',
    description: 'Sets height to 100% of parent container',
    default: 'false',
    required: false,
  },
  {
    name: 'p',
    type: 'number | "xs" | "sm" | "md" | "lg" | "xl"',
    description: 'Padding on all sides. Uses theme spacing values: xs=4, sm=8, md=12, lg=16, xl=20',
    required: false,
  },
  {
    name: 'px',
    type: 'number | "xs" | "sm" | "md" | "lg" | "xl"',
    description: 'Horizontal padding (left and right)',
    required: false,
  },
  {
    name: 'py',
    type: 'number | "xs" | "sm" | "md" | "lg" | "xl"',
    description: 'Vertical padding (top and bottom)',
    required: false,
  },
  {
    name: 'pt',
    type: 'number | "xs" | "sm" | "md" | "lg" | "xl"',
    description: 'Padding top',
    required: false,
  },
  {
    name: 'pb',
    type: 'number | "xs" | "sm" | "md" | "lg" | "xl"',
    description: 'Padding bottom',
    required: false,
  },
  {
    name: 'pl',
    type: 'number | "xs" | "sm" | "md" | "lg" | "xl"',
    description: 'Padding left',
    required: false,
  },
  {
    name: 'pr',
    type: 'number | "xs" | "sm" | "md" | "lg" | "xl"',
    description: 'Padding right',
    required: false,
  },
  {
    name: 'm',
    type: 'number | "xs" | "sm" | "md" | "lg" | "xl"',
    description: 'Margin on all sides. Uses theme spacing values: xs=4, sm=8, md=12, lg=16, xl=20',
    required: false,
  },
  {
    name: 'mx',
    type: 'number | "xs" | "sm" | "md" | "lg" | "xl"',
    description: 'Horizontal margin (left and right)',
    required: false,
  },
  {
    name: 'my',
    type: 'number | "xs" | "sm" | "md" | "lg" | "xl"',
    description: 'Vertical margin (top and bottom)',
    required: false,
  },
  {
    name: 'mt',
    type: 'number | "xs" | "sm" | "md" | "lg" | "xl"',
    description: 'Margin top',
    required: false,
  },
  {
    name: 'mb',
    type: 'number | "xs" | "sm" | "md" | "lg" | "xl"',
    description: 'Margin bottom',
    required: false,
  },
  {
    name: 'ml',
    type: 'number | "xs" | "sm" | "md" | "lg" | "xl"',
    description: 'Margin left',
    required: false,
  },
  {
    name: 'mr',
    type: 'number | "xs" | "sm" | "md" | "lg" | "xl"',
    description: 'Margin right',
    required: false,
  },
  {
    name: 'style',
    type: 'ViewStyle',
    description: 'Additional styles to apply to the view container',
    required: false,
  },
  {
    name: 'children',
    type: 'React.ReactNode',
    description: 'Content to be rendered inside the box',
    required: false,
  },
  {
    name: 'pointerEvents',
    type: "'auto' | 'none' | 'box-none' | 'box-only'",
    description: 'Controls touch handling behavior of the view',
    default: "'auto'",
    required: false,
  },
];
