import type { PropDefinition } from './ButtonProps';

export const centerProps: PropDefinition[] = [
  {
    name: 'children',
    type: 'React.ReactNode',
    description: 'Content that should be centered horizontally and vertically',
    required: false,
  },
  {
    name: 'inline',
    type: 'boolean',
    description: 'Inline center (not applicable in React Native, prop exists for API compatibility)',
    required: false,
  },
  {
    name: 'style',
    type: 'ViewStyle',
    description: 'Additional styles to apply to the center container',
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
  {
    name: 'fullWidth',
    type: 'boolean',
    description: 'Takes 100% width (inherited from BoxView)',
    required: false,
  },
  {
    name: 'fullHeight',
    type: 'boolean',
    description: 'Takes 100% height (inherited from BoxView)',
    required: false,
  },
];
