import { ExampleWrapper, ExampleSection } from '../../components/ExampleWrapper';
import { Text , Paper } from 'react-native-mantine';

export const DialogExample = () => {
  return (
    <ExampleWrapper
      title="Dialog"
      description="Lightweight floating dialog"
    >
      <ExampleSection
        title="Basic Usage"
        description="Dialog component"
      >
        <Paper p="md" radius="md">
          <Text>Dialog component provides lightweight floating dialogs - see interactive example</Text>
        </Paper>
      </ExampleSection>
    </ExampleWrapper>
  );
};
