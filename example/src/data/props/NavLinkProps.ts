// Generated from src/components/NavLink/index.tsx by scripts/generate-props.ts.
// Safe to edit: the generator does not overwrite this file unless run with --force.

export interface PropDefinition {
  name: string;
  type: string;
  description: string;
  default?: string;
  required?: boolean;
}

export const navLinkProps: PropDefinition[] = [
  {
    name: 'label',
    type: 'React.ReactNode',
    description: 'Link label',
    required: false,
  },
  {
    name: 'description',
    type: 'React.ReactNode',
    description: 'Link description',
    required: false,
  },
  {
    name: 'icon',
    type: 'React.ReactNode',
    description: 'Icon displayed on the left side',
    required: false,
  },
  {
    name: 'rightSection',
    type: 'React.ReactNode',
    description: 'Section displayed on the right side',
    required: false,
  },
  {
    name: 'color',
    type: 'MantineColor',
    description: 'Link color from theme',
    default: "'blue'",
    required: false,
  },
  {
    name: 'variant',
    type: "Variants<'filled' | 'light' | 'subtle'>",
    description: 'Link variant',
    default: "'light'",
    required: false,
  },
  {
    name: 'active',
    type: 'boolean',
    description: 'Active state',
    default: 'false',
    required: false,
  },
  {
    name: 'disabled',
    type: 'boolean',
    description: 'Disabled state',
    default: 'false',
    required: false,
  },
  {
    name: 'children',
    type: 'React.ReactNode',
    description: 'Children NavLinks',
    required: false,
  },
  {
    name: 'onPress',
    type: '() => void',
    description: 'Called when link is pressed',
    required: false,
  },
  {
    name: 'accessibilityLabel',
    type: 'string',
    description: 'Accessibility label for the link',
    required: false,
  },
  {
    name: 'style',
    type: 'any',
    description: 'Additional styles',
    required: false,
  },
  {
    name: 'disableIfNoPress',
    type: 'boolean',
    description: 'Disable link if no onPress handler is provided',
    default: 'true',
    required: false,
  },
  {
    name: 'testID',
    type: 'string',
    description: 'Test identifier used by testing frameworks',
    required: false,
  },
  {
    name: 'withTextWrapper',
    type: 'boolean',
    description: 'If false, children will not be wrapped in a Text component. This is useful when the children contain non-text elements like icons or custom components.',
    default: 'true',
    required: false,
  },
];
