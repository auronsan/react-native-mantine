import { ExampleWrapper, ExampleSection } from '../../components/ExampleWrapper';
import { Skeleton, Stack , Paper } from 'react-native-mantine';

export const SkeletonExample = () => {
  return (
    <ExampleWrapper
      title="Skeleton"
      description="Loading placeholder with pulse animation"
    >
      <ExampleSection
        title="Basic Usage"
        description="Skeleton component"
      >
        <Paper p="md" radius="md">
          <Stack spacing={8}>
            <Skeleton height={20} />
            <Skeleton height={20} width="70%" />
            <Skeleton height={20} />
          </Stack>
        </Paper>
      </ExampleSection>
    </ExampleWrapper>
  );
};
