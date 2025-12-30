export interface PropDefinition {
  name: string;
  type: string;
  description: string;
  default?: string;
  required?: boolean;
}

export const actionIconProps: PropDefinition[] = [
  {
    name: 'onPress',
    type: '(payload: any) => void',
    description: 'Function called when the action icon is pressed',
    required: false,
  },
  {
    name: 'children',
    type: 'React.ReactNode',
    description: 'Icon or content to display inside the action icon button (typically an icon component)',
    required: false,
  },
  {
    name: 'color',
    type: 'string',
    description: 'Custom color for the action icon background or border',
    required: false,
  },
  {
    name: 'variant',
    type: "'filled' | 'light' | 'outline' | 'transparent' | 'default'",
    description: 'Controls action icon appearance - filled (solid background), light (subtle background), outline (border only), transparent (no background), or default (theme-based)',
    default: '"default"',
    required: false,
  },
  {
    name: 'size',
    type: "'xs' | 'sm' | 'md' | 'lg' | 'xl' | number",
    description: 'Action icon size as predefined value (xs: 18px, sm: 22px, md: 28px, lg: 34px, xl: 44px) or custom number in pixels',
    default: '"md"',
    required: false,
  },
  {
    name: 'style',
    type: 'ViewStyle',
    description: 'Additional styles to apply to the action icon container',
    required: false,
  },
];
