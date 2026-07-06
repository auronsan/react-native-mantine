export interface PropDefinition {
  name: string;
  type: string;
  description: string;
  default?: string;
  required?: boolean;
}

export const hoverCardProps: PropDefinition[] = [
  {
    name: 'openDelay',
    type: 'number',
    description: 'Open delay in ms, applied before the dropdown is shown',
    default: '0',
    required: false,
  },
  {
    name: 'closeDelay',
    type: 'number',
    description: 'Close delay in ms, applied before the dropdown is hidden',
    default: '150',
    required: false,
  },
  {
    name: 'initiallyOpened',
    type: 'boolean',
    description: 'Initial opened state',
    default: 'false',
    required: false,
  },
  {
    name: 'onChange',
    type: '(opened: boolean) => void',
    description: 'Called when the dropdown opened state changes',
    required: false,
  },
  {
    name: 'position',
    type: "'top' | 'bottom' | 'left' | 'right' | 'top-start' | 'top-end' | 'bottom-start' | 'bottom-end'",
    description: 'Dropdown position relative to the target',
    default: '"bottom"',
    required: false,
  },
  {
    name: 'width',
    type: "number | 'target'",
    description: "Dropdown width in px or 'target' to match the target width",
    default: '260',
    required: false,
  },
  {
    name: 'shadow',
    type: "'xs' | 'sm' | 'md' | 'lg' | 'xl'",
    description: 'Dropdown shadow from theme',
    default: '"md"',
    required: false,
  },
  {
    name: 'withArrow',
    type: 'boolean',
    description: 'Determines whether the dropdown should have an arrow',
    default: 'false',
    required: false,
  },
  {
    name: 'children',
    type: 'ReactNode',
    description: 'HoverCard.Target and HoverCard.Dropdown components',
    required: true,
  },
];
