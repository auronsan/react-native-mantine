export interface PropDefinition {
  name: string;
  type: string;
  description: string;
  default?: string;
  required?: boolean;
}

export const menubarProps: PropDefinition[] = [
  {
    name: 'children',
    type: 'ReactNode',
    description: 'Menubar.Menu components',
    required: true,
  },
  {
    name: 'openIndex',
    type: 'number | null',
    description:
      'Controlled index of the opened menu, null when all menus are closed',
    required: false,
  },
  {
    name: 'defaultOpenIndex',
    type: 'number | null',
    description: 'Initially opened menu index for uncontrolled usage',
    default: 'null',
    required: false,
  },
  {
    name: 'onOpenChange',
    type: '(index: number | null) => void',
    description: 'Called with the opened menu index or null when menus close',
    required: false,
  },
];

export const menubarMenuProps: PropDefinition[] = [
  {
    name: 'target',
    type: 'ReactElement',
    description: 'Element that toggles the menu, for example a Button',
    required: true,
  },
  {
    name: 'children',
    type: 'ReactNode',
    description:
      'Dropdown content (Menubar.Item, Menubar.Label, Menubar.Divider)',
    required: true,
  },
  {
    name: '...menuProps',
    type: 'MenuProps',
    description:
      'All other Menu props (width, position, shadow, radius) are forwarded to the underlying Menu',
    required: false,
  },
];

export const menubarItemProps: PropDefinition[] = [
  {
    name: 'children',
    type: 'ReactNode',
    description: 'Item content',
    required: true,
  },
  {
    name: 'icon',
    type: 'ReactNode',
    description: 'Icon displayed on the left side',
    required: false,
  },
  {
    name: 'color',
    type: 'MantineColor',
    description: 'Item color from theme',
    required: false,
  },
  {
    name: 'onPress',
    type: '() => void',
    description: 'Called when item is pressed',
    required: false,
  },
  {
    name: 'disabled',
    type: 'boolean',
    description: 'Disabled state',
    default: 'false',
    required: false,
  },
];
