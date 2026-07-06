export interface PropDefinition {
  name: string;
  type: string;
  description: string;
  default?: string;
  required?: boolean;
}

export const scrollAreaProps: PropDefinition[] = [
  {
    name: 'type',
    type: "'auto' | 'always' | 'scroll' | 'hover' | 'never'",
    description:
      "Scrollbar visibility behavior. 'never' hides scroll indicators, all other values show them",
    default: '"hover"',
    required: false,
  },
  {
    name: 'horizontal',
    type: 'boolean',
    description: 'Scroll horizontally instead of vertically',
    default: 'false',
    required: false,
  },
  {
    name: 'onScrollPositionChange',
    type: '(position: { x: number; y: number }) => void',
    description: 'Called with the current scroll position',
    required: false,
  },
  {
    name: 'children',
    type: 'ReactNode',
    description: 'Scrollable content',
    required: false,
  },
  {
    name: 'style',
    type: 'StyleProp<ViewStyle>',
    description:
      'Additional styles, set a fixed height or maxHeight to constrain the scrollable viewport',
    required: false,
  },
  {
    name: '...ScrollViewProps',
    type: 'ScrollViewProps',
    description:
      'All other React Native ScrollView props are forwarded to the underlying ScrollView',
    required: false,
  },
];

export const scrollAreaAutosizeProps: PropDefinition[] = [
  {
    name: 'maxHeight',
    type: 'number',
    description:
      'Maximum height of the scroll area, content grows naturally until it exceeds this value and becomes scrollable',
    required: true,
  },
];
