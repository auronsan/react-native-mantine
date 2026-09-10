// Generated from src/components/Stepper/index.tsx by scripts/generate-props.ts.
// Safe to edit: the generator does not overwrite this file unless run with --force.

export interface PropDefinition {
  name: string;
  type: string;
  description: string;
  default?: string;
  required?: boolean;
}

export const stepperProps: PropDefinition[] = [
  {
    name: 'active',
    type: 'number',
    description: 'Active step index',
    required: true,
  },
  {
    name: 'onStepClick',
    type: '(stepIndex: number) => void',
    description: 'Called when step is clicked',
    required: false,
  },
  {
    name: 'orientation',
    type: "'horizontal' | 'vertical'",
    description: 'Stepper orientation',
    default: "'horizontal'",
    required: false,
  },
  {
    name: 'color',
    type: 'MantineColor',
    description: 'Stepper color',
    default: "'blue'",
    required: false,
  },
  {
    name: 'size',
    type: 'MantineSize',
    description: 'Stepper size',
    default: "'md'",
    required: false,
  },
  {
    name: 'iconSize',
    type: 'number',
    description: 'Icon size',
    required: false,
  },
  {
    name: 'radius',
    type: 'MantineNumberSize',
    description: 'Step icon border radius',
    default: "'xl'",
    required: false,
  },
  {
    name: 'allowNextStepsSelect',
    type: 'boolean',
    description: 'Allow selecting steps that are ahead of active step',
    default: 'true',
    required: false,
  },
  {
    name: 'children',
    type: 'React.ReactNode',
    description: 'Component children (Step components)',
    required: true,
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
