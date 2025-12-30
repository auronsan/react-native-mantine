export interface PropDefinition {
  name: string;
  type: string;
  description: string;
  default?: string;
  required?: boolean;
}

export const cardProps: PropDefinition[] = [
  {
    name: 'padding',
    type: 'SpacingValue',
    description: 'Card padding - can be theme spacing key (xs, sm, md, lg, xl) or a number in pixels',
    default: '"md"',
    required: false,
  },
  {
    name: 'children',
    type: 'React.ReactNode',
    description: 'Card content, can include Card.Section components or any other React nodes',
    required: false,
  },
  {
    name: 'shadow',
    type: "'xs' | 'sm' | 'md' | 'lg' | 'xl'",
    description: 'Card shadow from theme.shadows (inherited from Paper)',
    required: false,
  },
  {
    name: 'radius',
    type: 'number | "xs" | "sm" | "md" | "lg" | "xl"',
    description: 'Key of theme.radius or number to set border-radius in pixels (inherited from Paper)',
    default: '"sm"',
    required: false,
  },
  {
    name: 'withBorder',
    type: 'boolean',
    description: 'Add border with theme color (inherited from Paper)',
    default: 'false',
    required: false,
  },
  {
    name: 'style',
    type: 'ViewStyle',
    description: 'Additional styles to apply to the card container',
    required: false,
  },
];

export const cardSectionProps: PropDefinition[] = [
  {
    name: 'children',
    type: 'React.ReactNode',
    description: 'Section content',
    required: false,
  },
  {
    name: 'inheritPadding',
    type: 'boolean',
    description: 'Inherit padding value from parent Card component',
    default: 'false',
    required: false,
  },
  {
    name: 'padding',
    type: 'SpacingValue',
    description: 'Section padding override - can be theme spacing key (xs, sm, md, lg, xl) or a number in pixels',
    required: false,
  },
  {
    name: 'withBorder',
    type: 'boolean',
    description: 'Add top and bottom border to section',
    default: 'false',
    required: false,
  },
  {
    name: 'style',
    type: 'ViewStyle',
    description: 'Additional styles to apply to the section container',
    required: false,
  },
];
