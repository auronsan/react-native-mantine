import type { PropDefinition } from './ButtonProps';

export const spaceProps: PropDefinition[] = [
  {
    name: 'w',
    type: "'xs' | 'sm' | 'md' | 'lg' | 'xl' | number",
    description: 'Width - key of theme.spacing or number for width in px',
    required: false,
  },
  {
    name: 'h',
    type: "'xs' | 'sm' | 'md' | 'lg' | 'xl' | number",
    description: 'Height - key of theme.spacing or number for height in px',
    required: false,
  },
  {
    name: 'style',
    type: 'ViewStyle',
    description: 'Additional styles to apply to the space element',
    required: false,
  },
  {
    name: 'p',
    type: 'string | number',
    description: 'Padding on all sides (inherited from BoxView)',
    required: false,
  },
  {
    name: 'px',
    type: 'string | number',
    description: 'Padding horizontal (inherited from BoxView)',
    required: false,
  },
  {
    name: 'py',
    type: 'string | number',
    description: 'Padding vertical (inherited from BoxView)',
    required: false,
  },
  {
    name: 'pt',
    type: 'string | number',
    description: 'Padding top (inherited from BoxView)',
    required: false,
  },
  {
    name: 'pb',
    type: 'string | number',
    description: 'Padding bottom (inherited from BoxView)',
    required: false,
  },
  {
    name: 'pl',
    type: 'string | number',
    description: 'Padding left (inherited from BoxView)',
    required: false,
  },
  {
    name: 'pr',
    type: 'string | number',
    description: 'Padding right (inherited from BoxView)',
    required: false,
  },
  {
    name: 'm',
    type: 'string | number',
    description: 'Margin on all sides (inherited from BoxView)',
    required: false,
  },
  {
    name: 'mx',
    type: 'string | number',
    description: 'Margin horizontal (inherited from BoxView)',
    required: false,
  },
  {
    name: 'my',
    type: 'string | number',
    description: 'Margin vertical (inherited from BoxView)',
    required: false,
  },
  {
    name: 'mt',
    type: 'string | number',
    description: 'Margin top (inherited from BoxView)',
    required: false,
  },
  {
    name: 'mb',
    type: 'string | number',
    description: 'Margin bottom (inherited from BoxView)',
    required: false,
  },
  {
    name: 'ml',
    type: 'string | number',
    description: 'Margin left (inherited from BoxView)',
    required: false,
  },
  {
    name: 'mr',
    type: 'string | number',
    description: 'Margin right (inherited from BoxView)',
    required: false,
  },
];
