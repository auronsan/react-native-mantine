import { ExampleWrapper, ExampleSection } from '../../components/ExampleWrapper';
import { Progress, Stack , Paper } from 'react-native-mantine';

export const ProgressExample = () => {
  return (
    <ExampleWrapper
      title="Progress"
      description="Progress bar with animations"
    >
      <ExampleSection
        title="Basic Usage"
        description="Progress component"
      >
        <Paper p="md" radius="md">
          <Stack spacing={16}>
            <Progress value={25} />
            <Progress value={50} color="green" />
            <Progress value={75} color="orange" />
          </Stack>
        </Paper>
      </ExampleSection>
    </ExampleWrapper>
  );
};
