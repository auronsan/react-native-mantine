export interface PropDefinition {
  name: string;
  type: string;
  description: string;
  default?: string;
  required?: boolean;
}

export const affixProps: PropDefinition[] = [
  {
    name: 'children',
    type: 'ReactNode',
    description: 'Affix content',
    required: false,
  },
  {
    name: 'position',
    type: '{ top?: number | string; left?: number | string; bottom?: number | string; right?: number | string }',
    description: 'Fixed position on the screen',
    default: '{ bottom: 0, right: 0 }',
    required: false,
  },
  {
    name: 'zIndex',
    type: 'number',
    description: 'zIndex of the root element',
    default: '300',
    required: false,
  },
  {
    name: 'withinPortal',
    type: 'boolean',
    description:
      'Determines whether the affix should render inside the PortalProvider overlay',
    default: 'true',
    required: false,
  },
  {
    name: 'portalTarget',
    type: 'string',
    description: 'Name of the PortalHost to render into',
    required: false,
  },
];
