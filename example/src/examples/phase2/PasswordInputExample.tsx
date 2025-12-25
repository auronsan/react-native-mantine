import { ExampleWrapper, ExampleSection } from '../../components/ExampleWrapper';
import { PasswordInput , Paper } from 'react-native-mantine';

export const PasswordInputExample = () => {
  return (
    <ExampleWrapper
      title="PasswordInput"
      description="Secure password input with visibility toggle"
    >
      <ExampleSection
        title="Basic Usage"
        description="PasswordInput component"
      >
        <Paper p="md" radius="md">
          <PasswordInput
            label="Password"
            placeholder="Enter password"
          />
        </Paper>
      </ExampleSection>
    </ExampleWrapper>
  );
};
