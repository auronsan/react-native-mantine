export interface PropDefinition {
  name: string;
  type: string;
  description: string;
  default?: string;
  required?: boolean;
}

export const maskInputProps: PropDefinition[] = [
  {
    name: 'mask',
    type: 'string | Array<string | RegExp>',
    description:
      'Mask pattern, e.g. "+1 (###) ###-####". Tokens: # digit, a letter, * alphanumeric',
    required: true,
  },
  {
    name: 'tokens',
    type: 'MaskInputTokens',
    description:
      'Custom token definitions, merged with defaults (# digit, a letter, * alphanumeric)',
    required: false,
  },
  {
    name: 'slotChar',
    type: 'string',
    description: 'Character used to render empty mask slots in the placeholder',
    default: '"_"',
    required: false,
  },
  {
    name: 'showMask',
    type: 'boolean',
    description: 'Displays the mask skeleton as placeholder when the input is empty',
    default: 'false',
    required: false,
  },
  {
    name: 'autoClear',
    type: 'boolean',
    description: 'Clears the value on blur if the mask is not completely filled',
    default: 'false',
    required: false,
  },
  {
    name: 'value',
    type: 'string',
    description: 'Masked value for controlled component',
    required: false,
  },
  {
    name: 'defaultValue',
    type: 'string',
    description: 'Default value for uncontrolled component',
    required: false,
  },
  {
    name: 'onChangeText',
    type: '(masked: string) => void',
    description: 'Called with the masked value',
    required: false,
  },
  {
    name: 'onChangeRaw',
    type: '(raw: string, masked: string) => void',
    description: 'Called with the raw (unmasked) and masked values',
    required: false,
  },
  {
    name: 'onComplete',
    type: '(masked: string, raw: string) => void',
    description: 'Called when the mask is completely filled',
    required: false,
  },
  {
    name: 'label',
    type: 'React.ReactNode',
    description: 'Input label, inherited from TextInput',
    required: false,
  },
  {
    name: 'error',
    type: 'React.ReactNode',
    description: 'Error message, inherited from TextInput',
    required: false,
  },
  {
    name: 'applyMask',
    type: '(input, mask, tokens?) => { masked, raw, complete }',
    description: 'Exported helper that applies a mask to an arbitrary string',
    required: false,
  },
  {
    name: 'getMaskPlaceholder',
    type: '(mask, slotChar?, tokens?) => string',
    description: 'Exported helper that builds the mask skeleton placeholder',
    required: false,
  },
];
