export interface PropDefinition {
  name: string;
  type: string;
  description: string;
  default?: string;
  required?: boolean;
}

export const timelineProps: PropDefinition[] = [
  {
    name: 'color',
    type: 'MantineColor',
    description: 'Timeline color from theme for active items',
    default: '"blue"',
    required: false,
  },
  {
    name: 'align',
    type: "'left' | 'right'",
    description: 'Timeline alignment - controls whether bullets are on left or right',
    default: '"left"',
    required: false,
  },
  {
    name: 'lineWidth',
    type: 'number',
    description: 'Width of the connecting line in pixels',
    default: '2',
    required: false,
  },
  {
    name: 'bulletSize',
    type: 'number',
    description: 'Size of the bullet in pixels',
    default: '20',
    required: false,
  },
  {
    name: 'radius',
    type: 'number | "xs" | "sm" | "md" | "lg" | "xl"',
    description: 'Bullet border radius from theme.radius or number in pixels',
    default: '"xl"',
    required: false,
  },
  {
    name: 'children',
    type: 'React.ReactNode',
    description: 'Timeline items (Timeline.Item components)',
    required: true,
  },
  {
    name: 'reverseActive',
    type: 'boolean',
    description: 'Highlight active items in reverse order (from bottom to top)',
    default: 'false',
    required: false,
  },
  {
    name: 'active',
    type: 'number',
    description: 'Active item index - items up to this index will be highlighted',
    default: '-1',
    required: false,
  },
  {
    name: 'style',
    type: 'ViewStyle',
    description: 'Additional styles to apply to the timeline container',
    required: false,
  },
];

export const timelineItemProps: PropDefinition[] = [
  {
    name: 'title',
    type: 'React.ReactNode',
    description: 'Item title displayed above the content',
    required: false,
  },
  {
    name: 'children',
    type: 'React.ReactNode',
    description: 'Item content (description or details)',
    required: false,
  },
  {
    name: 'bullet',
    type: 'React.ReactNode',
    description: 'Custom bullet icon (e.g., icon component)',
    required: false,
  },
  {
    name: 'bulletSize',
    type: 'number',
    description: 'Item bullet size override in pixels',
    required: false,
  },
  {
    name: 'color',
    type: 'MantineColor',
    description: 'Item color override from theme',
    required: false,
  },
  {
    name: 'lineVariant',
    type: "'solid' | 'dashed' | 'dotted'",
    description: 'Line variant style for this item',
    default: '"solid"',
    required: false,
  },
  {
    name: 'style',
    type: 'ViewStyle',
    description: 'Additional styles to apply to the timeline item',
    required: false,
  },
];
