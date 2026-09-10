import { useState } from 'react';
import { ExampleWrapper, ExampleSection, CodeBlock } from '../../components/ExampleWrapper';
import { PropsTable } from '../../components/PropsTable';
import { stepperProps } from '../../data/props/StepperProps';
import { Stepper, Text, Button, Group, Stack } from 'react-native-mantine';

const StepContent = ({ children }: { children: string }) => (
  <Text size="sm" color="dimmed">
    {children}
  </Text>
);

export const StepperExample = () => {
  const [active, setActive] = useState(1);
  const [vertical, setVertical] = useState(0);
  const [clickable, setClickable] = useState(0);

  return (
    <ExampleWrapper title="Stepper" description="Multi-step form navigation">
      <ExampleSection
        title="Horizontal"
        description="Steps with labels and descriptions, content for the active step, and a completed state"
        variant="showcase"
      >
        <Stack spacing={16}>
          <Stepper active={active} onStepClick={setActive}>
            <Stepper.Step label="Account" description="Create an account">
              <StepContent>Step 1: enter your email and password</StepContent>
            </Stepper.Step>
            <Stepper.Step label="Verify" description="Confirm email">
              <StepContent>Step 2: check your inbox for the code</StepContent>
            </Stepper.Step>
            <Stepper.Step label="Done" description="Get full access">
              <StepContent>Step 3: you are ready to go</StepContent>
            </Stepper.Step>
            <Stepper.Completed>
              <StepContent>All steps completed</StepContent>
            </Stepper.Completed>
          </Stepper>
          <Group position="right" spacing={8}>
            <Button variant="default" onPress={() => setActive((s) => Math.max(0, s - 1))}>
              Back
            </Button>
            <Button onPress={() => setActive((s) => Math.min(3, s + 1))}>Next</Button>
          </Group>
        </Stack>
      </ExampleSection>

      <ExampleSection title="Usage" description="Minimal copy-pasteable example">
        <CodeBlock
          code={`import { useState } from 'react';
import { Stepper, Button, Group } from 'react-native-mantine';

function Onboarding() {
  const [active, setActive] = useState(0);

  return (
    <>
      <Stepper active={active} onStepClick={setActive}>
        <Stepper.Step label="Account" description="Create an account">
          Step 1 content
        </Stepper.Step>
        <Stepper.Step label="Verify" description="Confirm email">
          Step 2 content
        </Stepper.Step>
        <Stepper.Completed>All done</Stepper.Completed>
      </Stepper>
      <Group position="right">
        <Button variant="default" onPress={() => setActive((s) => s - 1)}>Back</Button>
        <Button onPress={() => setActive((s) => s + 1)}>Next</Button>
      </Group>
    </>
  );
}`}
        />
      </ExampleSection>

      <ExampleSection title="Vertical" description="orientation=&quot;vertical&quot; stacks the steps">
        <Stepper active={vertical} onStepClick={setVertical} orientation="vertical">
          <Stepper.Step label="Order placed" description="We received your order" />
          <Stepper.Step label="Packed" description="Your items are on the way" />
          <Stepper.Step label="Delivered" description="Enjoy" />
        </Stepper>
      </ExampleSection>

      <ExampleSection title="Sizes and colors" description="size, color and iconSize props">
        <Stack spacing={16}>
          <Stepper active={1} size="xs" color="teal">
            <Stepper.Step label="First" />
            <Stepper.Step label="Second" />
            <Stepper.Step label="Third" />
          </Stepper>
          <Stepper active={1} size="lg" color="grape">
            <Stepper.Step label="First" />
            <Stepper.Step label="Second" />
            <Stepper.Step label="Third" />
          </Stepper>
        </Stack>
      </ExampleSection>

      <ExampleSection
        title="Restricted navigation"
        description="allowNextStepsSelect={false} only lets users go back to completed steps"
      >
        <Stepper active={clickable} onStepClick={setClickable} allowNextStepsSelect={false}>
          <Stepper.Step label="Cart" />
          <Stepper.Step label="Shipping" />
          <Stepper.Step label="Payment" />
        </Stepper>
      </ExampleSection>

      <ExampleSection title="Component Props" description="All available props">
        <PropsTable props={stepperProps} />
      </ExampleSection>
    </ExampleWrapper>
  );
};
