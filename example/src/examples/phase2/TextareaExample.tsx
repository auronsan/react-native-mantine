import { ExampleWrapper, ExampleSection } from '../../components/ExampleWrapper';
import { Textarea , Paper } from 'react-native-mantine';

export const TextareaExample = () => {
  return (
    <ExampleWrapper
      title="Textarea"
      description="Multi-line text input with auto-resize"
    >
      <ExampleSection
        title="Basic Usage"
        description="Textarea component"
      >
        <Paper p="md" radius="md">
          <Textarea
            label="Description"
            placeholder="Enter your description..."
            minRows={3}
          />
        </Paper>
      </ExampleSection>
    </ExampleWrapper>
  );
};
