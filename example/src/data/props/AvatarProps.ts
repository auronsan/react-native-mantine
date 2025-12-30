export interface PropDefinition {
  name: string;
  type: string;
  description: string;
  default?: string;
  required?: boolean;
}

export const avatarProps: PropDefinition[] = [
  {
    name: 'src',
    type: 'string | null',
    description: 'Image URL to display in the avatar. If null or loading fails, placeholder will be shown',
    required: false,
  },
  {
    name: 'alt',
    type: 'string',
    description: 'Image alt text. Also used to generate initials for placeholder (e.g., "John Doe" becomes "JD")',
    required: false,
  },
  {
    name: 'size',
    type: "'xs' | 'sm' | 'md' | 'lg' | 'xl' | number",
    description: 'Avatar size as predefined value or custom number in pixels',
    default: '"md"',
    required: false,
  },
  {
    name: 'radius',
    type: 'number | "xs" | "sm" | "md" | "lg" | "xl"',
    description: 'Key of theme.radius or any valid number to set border-radius. Use "xl" for circular avatars',
    default: '"xl"',
    required: false,
  },
  {
    name: 'color',
    type: 'MantineColor',
    description: 'Avatar background color from theme, used when showing placeholder',
    default: '"gray"',
    required: false,
  },
  {
    name: 'children',
    type: 'React.ReactNode',
    description: 'Custom placeholder component to show when image is not available. Takes precedence over initials',
    required: false,
  },
  {
    name: 'imageProps',
    type: 'Partial<ImageProps>',
    description: 'Additional props passed to the React Native Image component',
    required: false,
  },
  {
    name: 'style',
    type: 'ViewStyle',
    description: 'Additional styles to apply to the avatar container',
    required: false,
  },
];
