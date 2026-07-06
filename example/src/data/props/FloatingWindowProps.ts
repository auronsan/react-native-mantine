export interface PropDefinition {
  name: string;
  type: string;
  description: string;
  default?: string;
  required?: boolean;
}

export const floatingWindowProps: PropDefinition[] = [
  {
    name: 'children',
    type: 'ReactNode',
    description: 'Window content',
    required: false,
  },
  {
    name: 'title',
    type: 'ReactNode',
    description: 'Title displayed in the draggable header bar',
    required: false,
  },
  {
    name: 'initialPosition',
    type: '{ x: number; y: number }',
    description: 'Initial window position',
    default: '{ x: 20, y: 80 }',
    required: false,
  },
  {
    name: 'onPositionChange',
    type: '(position: { x: number; y: number }) => void',
    description: 'Called with the new position while the window is dragged',
    required: false,
  },
  {
    name: 'onDragStart',
    type: '() => void',
    description: 'Called when dragging starts',
    required: false,
  },
  {
    name: 'onDragEnd',
    type: '(position: { x: number; y: number }) => void',
    description: 'Called when dragging ends',
    required: false,
  },
  {
    name: 'onClose',
    type: '() => void',
    description:
      'Called when the close button is pressed, the button is not rendered without it',
    required: false,
  },
  {
    name: 'width',
    type: 'number',
    description: 'Window width in px',
    default: '280',
    required: false,
  },
  {
    name: 'zIndex',
    type: 'number',
    description: 'Window z-index',
    default: '400',
    required: false,
  },
  {
    name: 'withinPortal',
    type: 'boolean',
    description: 'Determines whether the window should be rendered within Portal',
    default: 'true',
    required: false,
  },
  {
    name: 'portalTarget',
    type: 'string',
    description: 'Portal host name used when withinPortal is set',
    required: false,
  },
];
