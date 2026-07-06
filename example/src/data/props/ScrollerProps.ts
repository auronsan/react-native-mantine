export interface PropDefinition {
  name: string;
  type: string;
  description: string;
  default?: string;
  required?: boolean;
}

export const scrollerProps: PropDefinition[] = [
  {
    name: 'children',
    type: 'ReactNode',
    description: 'Scrollable content',
    required: false,
  },
  {
    name: 'scrollAmount',
    type: 'number',
    description: 'Number of px scrolled when a control is pressed',
    default: '200',
    required: false,
  },
  {
    name: 'controlSize',
    type: 'number',
    description: 'Size of the scroll controls in px',
    default: '32',
    required: false,
  },
  {
    name: 'edgeGradientColor',
    type: 'string',
    description: 'Color of the edge gradients, defaults to theme background',
    required: false,
  },
  {
    name: 'withEdgeGradients',
    type: 'boolean',
    description: 'Determines whether the edge gradients should be displayed',
    default: 'true',
    required: false,
  },
  {
    name: 'withControls',
    type: 'boolean',
    description: 'Determines whether the scroll controls should be displayed',
    default: 'true',
    required: false,
  },
  {
    name: 'startControlIcon',
    type: 'ReactNode',
    description: 'Icon of the start control',
    required: false,
  },
  {
    name: 'endControlIcon',
    type: 'ReactNode',
    description: 'Icon of the end control',
    required: false,
  },
  {
    name: 'startControlLabel',
    type: 'string',
    description: 'Start control accessibility label',
    default: '"Scroll back"',
    required: false,
  },
  {
    name: 'endControlLabel',
    type: 'string',
    description: 'End control accessibility label',
    default: '"Scroll forward"',
    required: false,
  },
];
