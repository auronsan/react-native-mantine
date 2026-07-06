export interface PropDefinition {
  name: string;
  type: string;
  description: string;
  default?: string;
  required?: boolean;
}

export const fileButtonProps: PropDefinition[] = [
  {
    name: 'children',
    type: '({ onPress, loading }) => React.ReactNode',
    description:
      'Function that renders the trigger element, receives onPress handler and loading state',
    required: true,
  },
  {
    name: 'onChange',
    type: '(payload: PickedFile | PickedFile[] | null) => void',
    description:
      'Called when files are picked, receives an array with multiple and a single file otherwise',
    required: true,
  },
  {
    name: 'multiple',
    type: 'boolean',
    description: 'Determines whether user can pick more than one file',
    default: 'false',
    required: false,
  },
  {
    name: 'accept',
    type: 'string | string[]',
    description: 'Mime type(s) of the files that can be picked, e.g. "application/pdf"',
    required: false,
  },
  {
    name: 'disabled',
    type: 'boolean',
    description: 'Disables the file picker',
    default: 'false',
    required: false,
  },
  {
    name: 'resetRef',
    type: 'React.ForwardedRef<() => void>',
    description: 'Ref of the function that should be called to reset the last selection',
    required: false,
  },
];
