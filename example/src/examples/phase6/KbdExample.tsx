import { ExampleWrapper, ExampleSection } from '../../components/ExampleWrapper';
import { Kbd, Text , Paper } from 'react-native-mantine';

export const KbdExample = () => {
  return (
    <ExampleWrapper
      title="Kbd"
      description="Keyboard shortcut display"
    >
      <ExampleSection
        title="Basic Usage"
        description="Kbd component"
      >
        <Paper p="md" radius="md">
          <Text>
            Press <Kbd>Ctrl</Kbd> + <Kbd>C</Kbd> to copy
          </Text>
        </Paper>
      </ExampleSection>
    </ExampleWrapper>
  );
};
