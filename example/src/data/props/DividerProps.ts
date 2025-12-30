export interface PropDefinition {
  name: string;
  type: string;
  description: string;
  default?: string;
  required?: boolean;
}

export const dividerProps: PropDefinition[] = [
  {
    name: 'orientation',
    type: "'horizontal' | 'vertical'",
    description: 'Line orientation - horizontal for separating content vertically, vertical for separating content horizontally',
    default: '"horizontal"',
    required: false,
  },
  {
    name: 'color',
    type: 'MantineColor',
    description: 'Line color from theme. If not provided, uses theme.colors.gray[3] in light mode and theme.colors.dark[4] in dark mode',
    required: false,
  },
  {
    name: 'size',
    type: 'number | "xs" | "sm" | "md" | "lg" | "xl"',
    description: 'Line thickness as predefined size or custom number in pixels',
    default: '"sm"',
    required: false,
  },
  {
    name: 'label',
    type: 'React.ReactNode',
    description: 'Label to display in the divider. Can be text or any React component. Divides the line with label in the middle',
    required: false,
  },
  {
    name: 'labelPosition',
    type: "'left' | 'center' | 'right'",
    description: 'Position of the label within the divider. Affects the length of lines on each side',
    default: '"center"',
    required: false,
  },
  {
    name: 'variant',
    type: "'solid' | 'dashed' | 'dotted'",
    description: 'Divider line style',
    default: '"solid"',
    required: false,
  },
  {
    name: 'style',
    type: 'ViewStyle',
    description: 'Additional styles to apply to the divider container',
    required: false,
  },
];
