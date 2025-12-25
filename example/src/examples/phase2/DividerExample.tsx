import { ExampleWrapper, ExampleSection } from '../../components/ExampleWrapper';
import { Divider, Stack, Text , Paper } from 'react-native-mantine';

export const DividerExample = () => {
  return (
    <ExampleWrapper
      title="Divider"
      description="Visual separator with label support"
    >
      <ExampleSection
        title="Basic Usage"
        description="Divider component"
      >
        <Paper p="md" radius="md">
          <Stack spacing={16}>
            <Text>Content above divider</Text>
            <Divider />
            <Text>Content below divider</Text>
          </Stack>
        </Paper>
      </ExampleSection>
    </ExampleWrapper>
  );
};
