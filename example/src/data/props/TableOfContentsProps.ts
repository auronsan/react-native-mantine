export interface PropDefinition {
  name: string;
  type: string;
  description: string;
  default?: string;
  required?: boolean;
}

export const tableOfContentsProps: PropDefinition[] = [
  {
    name: 'data',
    type: '{ id: string; value: ReactNode; depth: number }[]',
    description: 'Items to display',
    required: true,
  },
  {
    name: 'active',
    type: 'string',
    description: 'Controlled active item id',
    required: false,
  },
  {
    name: 'defaultActive',
    type: 'string',
    description: 'Initial active item id for uncontrolled usage',
    required: false,
  },
  {
    name: 'onActiveChange',
    type: '(id: string) => void',
    description: 'Called with the item id when a control is pressed',
    required: false,
  },
  {
    name: 'variant',
    type: "'filled' | 'light' | 'none'",
    description: 'Variant of the active control',
    default: '"light"',
    required: false,
  },
  {
    name: 'color',
    type: 'MantineColor',
    description: 'Color of the active control',
    required: false,
  },
  {
    name: 'size',
    type: "'xs' | 'sm' | 'md' | 'lg' | 'xl'",
    description: 'Controls font size and padding',
    default: '"md"',
    required: false,
  },
  {
    name: 'radius',
    type: 'MantineNumberSize',
    description: 'Border radius of controls',
    default: '"sm"',
    required: false,
  },
  {
    name: 'minDepthToOffset',
    type: 'number',
    description: 'Depth level that is rendered without offset',
    default: '1',
    required: false,
  },
  {
    name: 'depthOffset',
    type: 'number',
    description: 'Offset in px applied for every depth level',
    default: '20',
    required: false,
  },
  {
    name: 'getControlProps',
    type: '(payload: { active: boolean; data: TableOfContentsItem }) => Record<string, any>',
    description: 'Additional props passed down to every control',
    required: false,
  },
];
