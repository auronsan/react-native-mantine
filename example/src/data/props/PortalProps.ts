export interface PropDefinition {
  name: string;
  type: string;
  description: string;
  default?: string;
  required?: boolean;
}

export const portalProps: PropDefinition[] = [
  {
    name: 'children',
    type: 'ReactNode',
    description: 'Content rendered inside the portal host',
    required: true,
  },
  {
    name: 'target',
    type: 'string',
    description:
      'Name of the PortalHost to render into, defaults to the provider overlay',
    default: '"default"',
    required: false,
  },
];

export const portalHostProps: PropDefinition[] = [
  {
    name: 'name',
    type: 'string',
    description: 'Host name, portals with a matching target render here',
    required: true,
  },
];

export const portalProviderProps: PropDefinition[] = [
  {
    name: 'children',
    type: 'ReactNode',
    description:
      'App subtree that can use portals, an absolute-fill overlay is rendered on top of it',
    required: true,
  },
];
