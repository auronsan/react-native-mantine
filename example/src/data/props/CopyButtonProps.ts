export interface PropDefinition {
  name: string;
  type: string;
  description: string;
  default?: string;
  required?: boolean;
}

export const copyButtonProps: PropDefinition[] = [
  {
    name: 'value',
    type: 'string',
    description: 'Value to copy to clipboard when copy function is called',
    required: true,
  },
  {
    name: 'timeout',
    type: 'number',
    description: 'Copied state timeout in milliseconds - how long the copied state persists',
    default: '1000',
    required: false,
  },
  {
    name: 'children',
    type: '(payload: { copied: boolean; copy: () => void }) => React.ReactNode',
    description: 'Function that returns JSX based on current state - receives copied state and copy function',
    required: true,
  },
];
