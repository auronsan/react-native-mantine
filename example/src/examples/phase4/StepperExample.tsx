import { ExampleWrapper, ExampleSection } from '../../components/ExampleWrapper';
import { Text , Paper } from 'react-native-mantine';

export const StepperExample = () => {
  return (
    <ExampleWrapper
      title="Stepper"
      description="Multi-step form navigation"
    >
      <ExampleSection
        title="Basic Usage"
        description="Stepper component"
      >
        <Paper p="md" radius="md">
          <Text>Stepper component for multi-step forms - see interactive example</Text>
        </Paper>
      </ExampleSection>
    </ExampleWrapper>
  );
};
