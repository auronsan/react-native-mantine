// Generated from src/components/TransferList/index.tsx by scripts/generate-props.ts.
// Safe to edit: the generator does not overwrite this file unless run with --force.

export interface PropDefinition {
  name: string;
  type: string;
  description: string;
  default?: string;
  required?: boolean;
}

export const transferListProps: PropDefinition[] = [
  {
    name: 'value',
    type: '[TransferListData, TransferListData]',
    description: 'Current data state',
    required: true,
  },
  {
    name: 'onChange',
    type: '(value: [TransferListData, TransferListData]) => void',
    description: 'Called when data changes',
    required: true,
  },
  {
    name: 'titles',
    type: '[React.ReactNode, React.ReactNode]',
    description: 'Titles for both lists',
    default: "['', '']",
    required: false,
  },
  {
    name: 'searchPlaceholder',
    type: 'string',
    description: 'Placeholder for search inputs',
    default: "'Search...'",
    required: false,
  },
  {
    name: 'searchable',
    type: 'boolean',
    description: 'If true, lists will have search',
    default: 'false',
    required: false,
  },
  {
    name: 'color',
    type: 'MantineColor',
    description: 'Transfer list color',
    default: "'blue'",
    required: false,
  },
  {
    name: 'size',
    type: 'MantineSize',
    description: 'Transfer list size',
    default: "'md'",
    required: false,
  },
  {
    name: 'radius',
    type: 'MantineNumberSize',
    description: 'Border radius',
    default: "'sm'",
    required: false,
  },
  {
    name: 'listHeight',
    type: 'number',
    description: 'List height',
    default: '300',
    required: false,
  },
  {
    name: 'transferAllMatchingFilter',
    type: 'boolean',
    description: 'If true, transfer-all moves only the items matching the current search filter (accepted for Mantine parity, not yet applied)',
    default: 'false',
    required: false,
  },
  {
    name: 'itemComponent',
    type: 'React.ComponentType<{ data: TransferListDataItem; selected: boolean }>',
    description: 'Render custom item',
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
];
