import { useState } from 'react';
import { ExampleWrapper, ExampleSection, CodeBlock } from '../../components/ExampleWrapper';
import { Text, Paper, Stack, Button, Group, Progress } from 'react-native-mantine';

export const StepperExample = () => {
  const [activeStep, setActiveStep] = useState(0);
  const totalSteps = 3;

  const nextStep = () => {
    if (activeStep < totalSteps) {
      setActiveStep(activeStep + 1);
    }
  };

  const prevStep = () => {
    if (activeStep > 0) {
      setActiveStep(activeStep - 1);
    }
  };

  const reset = () => setActiveStep(0);

  return (
    <ExampleWrapper
      title="Stepper"
      description="Multi-step form navigation"
    >
      <ExampleSection
        title="Basic Stepper"
        description="Navigate through multiple steps"
        variant="showcase"
      >
        <Paper p="md" radius="md" withBorder>
          <Stack spacing={16}>
            <Progress
              value={(activeStep / totalSteps) * 100}
              size="sm"
              radius="xl"
            />

            <Text weight="600" size="lg">
              Step {activeStep + 1} of {totalSteps + 1}
            </Text>

            {activeStep === 0 && (
              <Stack spacing={8}>
                <Text weight="600">Step 1: Account Information</Text>
                <Text size="sm">
                  Enter your basic account details including email and password.
                </Text>
              </Stack>
            )}

            {activeStep === 1 && (
              <Stack spacing={8}>
                <Text weight="600">Step 2: Personal Details</Text>
                <Text size="sm">
                  Provide your name, phone number, and address information.
                </Text>
              </Stack>
            )}

            {activeStep === 2 && (
              <Stack spacing={8}>
                <Text weight="600">Step 3: Preferences</Text>
                <Text size="sm">
                  Choose your notification preferences and theme settings.
                </Text>
              </Stack>
            )}

            {activeStep === 3 && (
              <Stack spacing={8}>
                <Text weight="600" color="green">
                  Complete!
                </Text>
                <Text size="sm">
                  You've successfully completed all steps. Your account is ready!
                </Text>
              </Stack>
            )}

            <Group spacing={8}>
              {activeStep > 0 && (
                <Button
                  variant="outline"
                  onPress={prevStep}
                >
                  Back
                </Button>
              )}

              {activeStep < totalSteps ? (
                <Button onPress={nextStep}>
                  Next Step
                </Button>
              ) : (
                <Button onPress={reset} color="green">
                  Start Over
                </Button>
              )}
            </Group>
          </Stack>
        </Paper>
      </ExampleSection>

      <ExampleSection
        title="Usage Example"
        description="Simple stepper implementation"
      >
        <CodeBlock
          code={`import { useState } from 'react';
import { Button, Text, Progress } from 'react-native-mantine';

const MyStepper = () => {
  const [step, setStep] = useState(0);
  const totalSteps = 3;

  return (
    <>
      <Progress value={(step / totalSteps) * 100} />
      <Text>Step {step + 1} of {totalSteps + 1}</Text>

      <Button onPress={() => setStep(step - 1)}>
        Back
      </Button>
      <Button onPress={() => setStep(step + 1)}>
        Next
      </Button>
    </>
  );
};`}
        />
      </ExampleSection>
    </ExampleWrapper>
  );
};
