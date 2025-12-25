import { ExampleWrapper, ExampleSection } from '../../components/ExampleWrapper';
import { Radio, Stack , Paper } from 'react-native-mantine';

export const RadioExample = () => {
  return (
    <ExampleWrapper
      title="Radio"
      description="Radio button for exclusive selections"
    >
      <ExampleSection
        title="Basic Usage"
        description="Radio component"
      >
        <Paper p="md" radius="md">
          <Stack spacing={16}>
            <Radio label="Option 1" value="1" />
            <Radio label="Option 2" value="2" />
            <Radio label="Option 3" value="3" />
          </Stack>
        </Paper>
      </ExampleSection>
    </ExampleWrapper>
  );
};
