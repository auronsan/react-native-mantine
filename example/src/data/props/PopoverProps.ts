// Generated from src/components/Popover/index.tsx by scripts/generate-props.ts.
// Safe to edit: the generator does not overwrite this file unless run with --force.

export interface PropDefinition {
  name: string;
  type: string;
  description: string;
  default?: string;
  required?: boolean;
}

export const popoverProps: PropDefinition[] = [
  {
    name: 'position',
    type: "'top' | 'bottom' | 'left' | 'right' | 'top-start' | 'top-end' | 'bottom-start' | 'bottom-end'",
    description: 'Popover position relative to target',
    default: "'bottom'",
    required: false,
  },
  {
    name: 'width',
    type: "number | 'target'",
    description: 'Popover width',
    default: '260',
    required: false,
  },
  {
    name: 'radius',
    type: 'MantineNumberSize',
    description: 'Border radius',
    default: "'md'",
    required: false,
  },
  {
    name: 'shadow',
    type: "'xs' | 'sm' | 'md' | 'lg' | 'xl'",
    description: 'Popover shadow',
    default: "'md'",
    required: false,
  },
  {
    name: 'withArrow',
    type: 'boolean',
    description: 'If true, popover will have an arrow',
    default: 'false',
    required: false,
  },
  {
    name: 'arrowSize',
    type: 'number',
    description: 'Arrow size',
    default: '7',
    required: false,
  },
  {
    name: 'arrowOffset',
    type: 'number',
    description: 'Arrow offset',
    default: '5',
    required: false,
  },
  {
    name: 'closeOnClickOutside',
    type: 'boolean',
    description: 'If true, close on click outside',
    default: 'true',
    required: false,
  },
  {
    name: 'closeOnEscape',
    type: 'boolean',
    description: 'If true, close on escape key (web only)',
    default: 'true',
    required: false,
  },
  {
    name: 'opened',
    type: 'boolean',
    description: 'Controlled opened state',
    required: false,
  },
  {
    name: 'onChange',
    type: '(opened: boolean) => void',
    description: 'Called when popover state changes',
    required: false,
  },
  {
    name: 'zIndex',
    type: 'number',
    description: 'Z-index',
    default: '1000',
    required: false,
  },
  {
    name: 'children',
    type: 'React.ReactNode',
    description: 'Popover.Target and Popover.Dropdown elements',
    required: true,
  },
  {
    name: 'accessibilityLabel',
    type: 'string',
    description: 'Accessibility label for the popover',
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
