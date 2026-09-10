// Generated from src/components/Tooltip/index.tsx by scripts/generate-props.ts.
// Safe to edit: the generator does not overwrite this file unless run with --force.

export interface PropDefinition {
  name: string;
  type: string;
  description: string;
  default?: string;
  required?: boolean;
}

export const tooltipProps: PropDefinition[] = [
  {
    name: 'label',
    type: 'React.ReactNode',
    description: 'Tooltip label',
    required: true,
  },
  {
    name: 'position',
    type: "'top' | 'bottom' | 'left' | 'right' | 'top-start' | 'top-end' | 'bottom-start' | 'bottom-end'",
    description: 'Tooltip position relative to target',
    default: "'top'",
    required: false,
  },
  {
    name: 'color',
    type: 'MantineColor',
    description: 'Tooltip color from theme',
    default: "'gray'",
    required: false,
  },
  {
    name: 'radius',
    type: 'MantineNumberSize',
    description: 'Border radius',
    default: "'sm'",
    required: false,
  },
  {
    name: 'multiline',
    type: 'boolean',
    description: 'If true, tooltip will be multiline',
    default: 'false',
    required: false,
  },
  {
    name: 'width',
    type: "number | 'auto'",
    description: 'Tooltip width in multiline mode',
    default: "'auto'",
    required: false,
  },
  {
    name: 'zIndex',
    type: 'number',
    description: 'Tooltip z-index',
    default: '1000',
    required: false,
  },
  {
    name: 'openDelay',
    type: 'number',
    description: 'Delay before tooltip opens in ms',
    default: '0',
    required: false,
  },
  {
    name: 'closeDelay',
    type: 'number',
    description: 'Delay before tooltip closes in ms',
    default: '0',
    required: false,
  },
  {
    name: 'opened',
    type: 'boolean',
    description: 'Controlled opened state',
    required: false,
  },
  {
    name: 'disabled',
    type: 'boolean',
    description: 'If true, tooltip will be disabled',
    default: 'false',
    required: false,
  },
  {
    name: 'trigger',
    type: "'press' | 'longPress'",
    description: 'Trigger mode - press or longPress',
    default: "'longPress'",
    required: false,
  },
  {
    name: 'withArrow',
    type: 'boolean',
    description: 'If true, tooltip renders an arrow pointing at the target',
    default: 'false',
    required: false,
  },
  {
    name: 'children',
    type: 'React.ReactElement',
    description: 'Target element',
    required: true,
  },
  {
    name: 'accessibilityLabel',
    type: 'string',
    description: 'Accessibility label for the tooltip content',
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
