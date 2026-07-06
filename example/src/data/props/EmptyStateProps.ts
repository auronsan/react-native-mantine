export interface PropDefinition {
  name: string;
  type: string;
  description: string;
  default?: string;
  required?: boolean;
}

export const emptyStateProps: PropDefinition[] = [
  {
    name: 'title',
    type: 'React.ReactNode',
    description: 'Title displayed below the icon',
    required: false,
  },
  {
    name: 'description',
    type: 'React.ReactNode',
    description: 'Description displayed below the title',
    required: false,
  },
  {
    name: 'icon',
    type: 'React.ReactNode',
    description: 'Icon displayed inside the indicator',
    required: false,
  },
  {
    name: 'size',
    type: "'xs' | 'sm' | 'md' | 'lg' | 'xl'",
    description: 'Controls icon, title and description sizes',
    default: '"md"',
    required: false,
  },
  {
    name: 'align',
    type: "'left' | 'center' | 'right'",
    description: 'Content alignment',
    default: '"center"',
    required: false,
  },
  {
    name: 'variant',
    type: "'filled' | 'light'",
    description: 'Controls indicator colors',
    default: '"light"',
    required: false,
  },
  {
    name: 'color',
    type: 'MantineColor',
    description: 'Key of theme.colors or any valid color, controls indicator color',
    required: false,
  },
  {
    name: 'withIndicatorBackground',
    type: 'boolean',
    description: 'Determines whether the indicator should have a background',
    default: 'false',
    required: false,
  },
  {
    name: 'children',
    type: 'React.ReactNode',
    description:
      'Content displayed below the description, usually EmptyState.Actions',
    required: false,
  },
  {
    name: 'style',
    type: 'ViewStyle',
    description: 'Additional styles to apply to the root element',
    required: false,
  },
];
