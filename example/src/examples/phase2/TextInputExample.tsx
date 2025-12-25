import { ExampleWrapper, ExampleSection } from '../../components/ExampleWrapper';
import { TextInput , Paper } from 'react-native-mantine';

export const TextInputExample = () => {
  return (
    <ExampleWrapper
      title="TextInput"
      description="Single-line text input with validation"
    >
      <ExampleSection
        title="Basic Usage"
        description="TextInput component"
      >
        <Paper p="md" radius="md">
          <TextInput
            label="Email"
            placeholder="your@email.com"
          />
        </Paper>
      </ExampleSection>
    </ExampleWrapper>
  );
};
