export interface PropDefinition {
  name: string;
  type: string;
  description: string;
  default?: string;
  required?: boolean;
}

export const treeProps: PropDefinition[] = [
  {
    name: 'data',
    type: 'TreeNodeData[]',
    description: 'Tree data with label, value and optional children',
    required: true,
  },
  {
    name: 'tree',
    type: 'UseTreeReturnType',
    description:
      'Tree controller returned by the useTree hook, uses internal state if not set',
    required: false,
  },
  {
    name: 'levelOffset',
    type: 'MantineNumberSize',
    description: 'Key of theme.spacing or number, offset of nested levels',
    default: '"lg"',
    required: false,
  },
  {
    name: 'expandOnClick',
    type: 'boolean',
    description:
      'Determines whether the node is expanded/collapsed when it is pressed',
    default: 'true',
    required: false,
  },
  {
    name: 'selectOnClick',
    type: 'boolean',
    description: 'Determines whether the node is selected when it is pressed',
    default: 'false',
    required: false,
  },
  {
    name: 'renderNode',
    type: '(payload: RenderTreeNodePayload) => React.ReactNode',
    description:
      'Custom node renderer, receives node, level, expanded, hasChildren, selected, checked, indeterminate, tree controller and elementProps',
    required: false,
  },
  {
    name: 'style',
    type: 'ViewStyle',
    description: 'Additional styles to apply to the root element',
    required: false,
  },
];

export const treeNodeDataProps: PropDefinition[] = [
  {
    name: 'label',
    type: 'React.ReactNode',
    description: 'Node label',
    required: true,
  },
  {
    name: 'value',
    type: 'string',
    description: 'Unique node value',
    required: true,
  },
  {
    name: 'nodeProps',
    type: 'Record<string, any>',
    description: 'Props passed to the rendered node',
    required: false,
  },
  {
    name: 'children',
    type: 'TreeNodeData[]',
    description: 'Child nodes',
    required: false,
  },
];
