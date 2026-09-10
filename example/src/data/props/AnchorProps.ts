// Generated from src/components/Anchor/index.tsx by scripts/generate-props.ts.
// Safe to edit: the generator does not overwrite this file unless run with --force.

export interface PropDefinition {
  name: string;
  type: string;
  description: string;
  default?: string;
  required?: boolean;
}

export const anchorProps: PropDefinition[] = [
  {
    name: 'color',
    type: 'MantineColor',
    description: 'Anchor text color from theme',
    default: "'blue'",
    required: false,
  },
  {
    name: 'size',
    type: 'MantineSize',
    description: 'Anchor text size',
    default: "'md'",
    required: false,
  },
  {
    name: 'weight',
    type: "TextStyle['fontWeight']",
    description: 'Anchor text weight',
    default: "'400'",
    required: false,
  },
  {
    name: 'underline',
    type: 'boolean',
    description: 'If true, anchor text is underlined',
    default: 'true',
    required: false,
  },
  {
    name: 'variant',
    type: "Variants<'text' | 'link'>",
    description: 'Variant of anchor',
    default: "'link'",
    required: false,
  },
  {
    name: 'href',
    type: 'string',
    description: 'URL to open when anchor is pressed (opens in browser)',
    required: false,
  },
  {
    name: 'onPress',
    type: '() => void',
    description: 'Called when anchor is pressed',
    required: false,
  },
  {
    name: 'children',
    type: 'React.ReactNode',
    description: 'Anchor content',
    required: false,
  },
  {
    name: 'style',
    type: 'any',
    description: 'Additional styles',
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
