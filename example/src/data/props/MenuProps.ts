// Generated from src/components/Menu/index.tsx by scripts/generate-props.ts.
// Safe to edit: the generator does not overwrite this file unless run with --force.

export interface PropDefinition {
  name: string;
  type: string;
  description: string;
  default?: string;
  required?: boolean;
}

export const menuProps: PropDefinition[] = [
  {
    name: 'opened',
    type: 'boolean',
    description: 'Controlled opened state',
    required: false,
  },
  {
    name: 'onChange',
    type: '(opened: boolean) => void',
    description: 'Called when menu state changes',
    required: false,
  },
  {
    name: 'position',
    type: "'bottom' | 'top' | 'left' | 'right' | 'bottom-start' | 'bottom-end' | 'top-start' | 'top-end'",
    description: 'Menu position',
    required: false,
  },
  {
    name: 'width',
    type: "number | 'target'",
    description: 'Menu width',
    required: false,
  },
  {
    name: 'closeOnItemClick',
    type: 'boolean',
    description: 'Close menu on item click',
    required: false,
  },
  {
    name: 'closeOnClickOutside',
    type: 'boolean',
    description: 'Close menu on click outside',
    required: false,
  },
  {
    name: 'shadow',
    type: "'xs' | 'sm' | 'md' | 'lg' | 'xl'",
    description: 'Menu shadow',
    required: false,
  },
  {
    name: 'radius',
    type: 'MantineNumberSize',
    description: 'Border radius',
    required: false,
  },
  {
    name: 'zIndex',
    type: 'number',
    description: 'Z-index',
    required: false,
  },
  {
    name: 'children',
    type: 'React.ReactNode',
    description: 'Menu.Target and Menu.Dropdown elements',
    required: true,
  },
  {
    name: 'accessibilityLabel',
    type: 'string',
    description: 'Accessibility label for the menu',
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
