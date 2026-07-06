export interface PropDefinition {
  name: string;
  type: string;
  description: string;
  default?: string;
  required?: boolean;
}

export const overflowListProps: PropDefinition[] = [
  {
    name: 'data',
    type: 'T[]',
    description: 'Items to render',
    required: true,
  },
  {
    name: 'renderItem',
    type: '(item: T, index: number) => React.ReactNode',
    description: 'Renders a single item',
    required: true,
  },
  {
    name: 'renderOverflow',
    type: '(hiddenItems: T[]) => React.ReactNode',
    description:
      'Renders the overflow indicator, receives hidden items, defaults to a +N label',
    required: false,
  },
  {
    name: 'maxVisibleItems',
    type: 'number',
    description:
      'Maximum number of visible items regardless of available space',
    required: false,
  },
  {
    name: 'gap',
    type: 'MantineNumberSize',
    description: 'Key of theme.spacing or number, gap between items',
    default: '"xs"',
    required: false,
  },
  {
    name: 'collapseFrom',
    type: "'start' | 'end'",
    description:
      'Side from which items are collapsed when there is not enough space',
    default: '"end"',
    required: false,
  },
  {
    name: 'getItemKey',
    type: '(item: T, index: number) => string | number',
    description: 'Returns a unique key for the given item',
    required: false,
  },
  {
    name: 'style',
    type: 'ViewStyle',
    description: 'Additional styles to apply to the root element',
    required: false,
  },
];
