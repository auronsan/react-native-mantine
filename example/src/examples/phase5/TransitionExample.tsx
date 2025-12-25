import { ExampleWrapper, ExampleSection } from '../../components/ExampleWrapper';
import { Text , Paper } from 'react-native-mantine';

export const TransitionExample = () => {
  return (
    <ExampleWrapper
      title="Transition"
      description="Animated mount/unmount transitions"
    >
      <ExampleSection
        title="Basic Usage"
        description="Transition component"
      >
        <Paper p="md" radius="md">
          <Text>Transition provides mount/unmount animations - see interactive example</Text>
        </Paper>
      </ExampleSection>
    </ExampleWrapper>
  );
};
