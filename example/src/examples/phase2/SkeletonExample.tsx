import { ExampleWrapper, ExampleSection, CodeBlock } from '../../components/ExampleWrapper';
import { PropsTable } from '../../components/PropsTable';
import { skeletonProps } from '../../data/props/SkeletonProps';
import { Skeleton, Stack, Paper, Group } from 'react-native-mantine';

export const SkeletonExample = () => {
  return (
    <ExampleWrapper
      title="Skeleton"
      description="Loading placeholder with pulse animation"
    >
      <ExampleSection
        title="Basic Usage"
        description="Simple skeleton placeholders"
      >
        <Paper p="md" radius="md">
          <Stack spacing={8}>
            <Skeleton height={20} />
            <Skeleton height={20} width="70%" />
            <Skeleton height={20} />
          </Stack>
        </Paper>
      </ExampleSection>

      <ExampleSection
        title="Circle Skeleton"
        description="Perfect for avatar placeholders"
        variant="showcase"
      >
        <Group spacing={12}>
          <Skeleton height={40} circle />
          <Skeleton height={60} circle />
          <Skeleton height={80} circle />
        </Group>
      </ExampleSection>

      <ExampleSection
        title="With Custom Radius"
        description="Different border radius options"
      >
        <Stack spacing={12}>
          <Skeleton height={40} radius="xs" />
          <Skeleton height={40} radius="md" />
          <Skeleton height={40} radius="xl" />
        </Stack>
      </ExampleSection>

      <ExampleSection
        title="Component Props"
        description="Complete reference of all available Skeleton props"
      >
        <PropsTable props={skeletonProps} />
      </ExampleSection>

      <ExampleSection
        title="Usage Example"
        description="Basic implementation code"
      >
        <CodeBlock
          code={`import { Skeleton, Stack } from 'react-native-mantine';

<Stack spacing={8}>
  <Skeleton height={20} />
  <Skeleton height={20} width="70%" />
  <Skeleton height={60} circle />
</Stack>`}
        />
      </ExampleSection>
    </ExampleWrapper>
  );
};
