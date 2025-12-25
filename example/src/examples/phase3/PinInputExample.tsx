import { ExampleWrapper, ExampleSection } from '../../components/ExampleWrapper';
import { PinInput , Paper } from 'react-native-mantine';

export const PinInputExample = () => {
  return (
    <ExampleWrapper
      title="PinInput"
      description="PIN or OTP input with auto-focus"
    >
      <ExampleSection
        title="Basic Usage"
        description="PinInput component"
      >
        <Paper p="md" radius="md">
          <PinInput length={4} />
        </Paper>
      </ExampleSection>
    </ExampleWrapper>
  );
};
