export interface PropDefinition {
  name: string;
  type: string;
  description: string;
  default?: string;
  required?: boolean;
}

export const listProps: PropDefinition[] = [
  {
    name: 'type',
    type: "'ordered' | 'unordered'",
    description: 'List type - ordered (numbered) or unordered (bulleted)',
    default: '"unordered"',
    required: false,
  },
  {
    name: 'size',
    type: "'xs' | 'sm' | 'md' | 'lg' | 'xl'",
    description: 'List size that controls font size of list items',
    default: '"md"',
    required: false,
  },
  {
    name: 'spacing',
    type: 'SpacingValue',
    description: 'Spacing between list items - can be theme spacing key (xs, sm, md, lg, xl) or a number in pixels',
    default: '"xs"',
    required: false,
  },
  {
    name: 'center',
    type: 'boolean',
    description: 'Center items vertically with icon/marker',
    default: 'false',
    required: false,
  },
  {
    name: 'icon',
    type: 'React.ReactNode',
    description: 'Custom icon for unordered list (replaces default bullet)',
    required: false,
  },
  {
    name: 'withPadding',
    type: 'boolean',
    description: 'Add left padding to offset list from main content',
    default: 'false',
    required: false,
  },
  {
    name: 'listStyleType',
    type: "'decimal' | 'lower-alpha' | 'upper-alpha' | 'lower-roman' | 'upper-roman'",
    description: 'List style type for ordered lists - controls numbering format',
    default: '"decimal"',
    required: false,
  },
  {
    name: 'startIndex',
    type: 'number',
    description: 'Start index for ordered list (e.g., start from 1, 2, 3, etc.)',
    default: '1',
    required: false,
  },
  {
    name: 'children',
    type: 'React.ReactNode',
    description: 'List items (List.Item components)',
    required: false,
  },
  {
    name: 'style',
    type: 'ViewStyle',
    description: 'Additional styles to apply to the list container',
    required: false,
  },
];

export const listItemProps: PropDefinition[] = [
  {
    name: 'children',
    type: 'React.ReactNode',
    description: 'Item content, usually text but can be any React node',
    required: false,
  },
  {
    name: 'icon',
    type: 'React.ReactNode',
    description: 'Custom icon for this specific item (overrides list-level icon)',
    required: false,
  },
  {
    name: 'withTextWrapper',
    type: 'boolean',
    description: 'Controls whether children are automatically wrapped in a Text component',
    default: 'true',
    required: false,
  },
  {
    name: 'style',
    type: 'ViewStyle',
    description: 'Additional styles to apply to the list item',
    required: false,
  },
];
