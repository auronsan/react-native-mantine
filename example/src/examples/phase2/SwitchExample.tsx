import { ExampleWrapper, ExampleSection } from '../../components/ExampleWrapper';
import { Stack, Switch , Paper } from 'react-native-mantine';

export const SwitchExample = () => {
  return (
    <ExampleWrapper
      title="Switch"
      description="Toggle switch with labels"
    >
      <ExampleSection
        title="Basic Usage"
        description="Switch component"
      >
        <Paper p="md" radius="md">
          <Stack spacing={16}>
            <Switch label="Enable notifications" />
            <Switch label="Dark mode" defaultChecked />
          </Stack>
        </Paper>
      </ExampleSection>
    </ExampleWrapper>
  );
};
