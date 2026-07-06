export interface PropDefinition {
  name: string;
  type: string;
  description: string;
  default?: string;
  required?: boolean;
}

export const splitterProps: PropDefinition[] = [
  {
    name: 'children',
    type: 'ReactNode',
    description: 'Splitter.Pane components',
    required: true,
  },
  {
    name: 'orientation',
    type: "'horizontal' | 'vertical'",
    description: 'Direction in which panes are laid out',
    default: '"horizontal"',
    required: false,
  },
  {
    name: 'onSizeChange',
    type: '(sizes: number[]) => void',
    description: 'Called with pane sizes in percent when they change',
    required: false,
  },
  {
    name: 'onResizeStart',
    type: '() => void',
    description: 'Called when the user starts dragging a handle',
    required: false,
  },
  {
    name: 'onResizeEnd',
    type: '(sizes: number[]) => void',
    description: 'Called when the user stops dragging a handle',
    required: false,
  },
  {
    name: 'lineSize',
    type: 'number',
    description: 'Separator line thickness in px',
    default: '2',
    required: false,
  },
  {
    name: 'handleSize',
    type: 'number',
    description: 'Touchable area of the handle in px',
    default: '16',
    required: false,
  },
  {
    name: 'withHandle',
    type: 'boolean',
    description:
      'Determines whether the grip indicator should be displayed on the handle',
    default: 'true',
    required: false,
  },
];

export const splitterPaneProps: PropDefinition[] = [
  {
    name: 'defaultSize',
    type: 'number',
    description: 'Initial pane size in percent, 0-100',
    required: true,
  },
  {
    name: 'min',
    type: 'number',
    description: 'Minimum pane size in percent',
    default: '0',
    required: false,
  },
  {
    name: 'max',
    type: 'number',
    description: 'Maximum pane size in percent',
    default: '100',
    required: false,
  },
  {
    name: 'children',
    type: 'ReactNode',
    description: 'Pane content',
    required: false,
  },
];
