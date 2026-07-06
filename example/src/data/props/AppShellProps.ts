export interface PropDefinition {
  name: string;
  type: string;
  description: string;
  default?: string;
  required?: boolean;
}

export const appShellProps: PropDefinition[] = [
  {
    name: 'header',
    type: '{ height: number }',
    description: 'Header configuration, required when AppShell.Header is used',
    required: false,
  },
  {
    name: 'footer',
    type: '{ height: number }',
    description: 'Footer configuration, required when AppShell.Footer is used',
    required: false,
  },
  {
    name: 'navbar',
    type: '{ width: number; collapsed?: boolean }',
    description:
      'Navbar configuration, required when AppShell.Navbar is used. collapsed hides the navbar and removes its offset',
    required: false,
  },
  {
    name: 'aside',
    type: '{ width: number; collapsed?: boolean }',
    description:
      'Aside configuration, required when AppShell.Aside is used. collapsed hides the aside and removes its offset',
    required: false,
  },
  {
    name: 'padding',
    type: "'xs' | 'sm' | 'md' | 'lg' | 'xl' | number",
    description: 'Key of theme.spacing or number, padding of AppShell.Main',
    default: '"md"',
    required: false,
  },
  {
    name: 'children',
    type: 'ReactNode',
    description:
      'AppShell content: Header, Navbar, Aside, Footer and Main sections',
    required: false,
  },
];
