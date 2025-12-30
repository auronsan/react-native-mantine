export interface PropDefinition {
  name: string;
  type: string;
  description: string;
  default?: string;
  required?: boolean;
}

export const notificationProps: PropDefinition[] = [
  {
    name: 'title',
    type: 'React.ReactNode',
    description: 'Notification title displayed at the top in bold',
    required: false,
  },
  {
    name: 'message',
    type: 'React.ReactNode',
    description: 'Main notification message content',
    required: false,
  },
  {
    name: 'children',
    type: 'React.ReactNode',
    description: 'Alternative to message prop for custom notification content',
    required: false,
  },
  {
    name: 'color',
    type: 'MantineColor',
    description: 'Notification color from theme, affects the left border color when withBorder is true',
    default: '"blue"',
    required: false,
  },
  {
    name: 'radius',
    type: 'number | "xs" | "sm" | "md" | "lg" | "xl"',
    description: 'Key of theme.radius or any valid number to set border-radius',
    default: '"sm"',
    required: false,
  },
  {
    name: 'icon',
    type: 'React.ReactNode',
    description: 'Icon displayed on the left side of the notification',
    required: false,
  },
  {
    name: 'withCloseButton',
    type: 'boolean',
    description: 'If true, displays a close button on the right side',
    default: 'true',
    required: false,
  },
  {
    name: 'onClose',
    type: '() => void',
    description: 'Callback fired when close button is clicked. Close button only shows if this prop is provided',
    required: false,
  },
  {
    name: 'loading',
    type: 'boolean',
    description: 'If true, displays a loading indicator (currently not implemented in styles)',
    default: 'false',
    required: false,
  },
  {
    name: 'withBorder',
    type: 'boolean',
    description: 'If true, adds a border around notification with colored left border accent',
    default: 'true',
    required: false,
  },
  {
    name: 'withTextWrapper',
    type: 'boolean',
    description: 'Controls whether title and message are automatically wrapped in Text components',
    default: 'true',
    required: false,
  },
  {
    name: 'style',
    type: 'ViewStyle',
    description: 'Additional styles to apply to the notification container',
    required: false,
  },
];
