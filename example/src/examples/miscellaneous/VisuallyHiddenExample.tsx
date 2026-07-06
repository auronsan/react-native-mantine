import { ExampleWrapper, ExampleSection, CodeBlock } from '../../components/ExampleWrapper';
import { PropsTable } from '../../components/PropsTable';
import { visuallyHiddenProps } from '../../data/props/VisuallyHiddenProps';
import { Group, Paper, Stack, Text, VisuallyHidden } from 'react-native-mantine';

export const VisuallyHiddenExample = () => {
  return (
    <ExampleWrapper
      title="VisuallyHidden"
      description="Hide content visually, keep it for screen readers"
    >
      <ExampleSection
        title="Basic Usage"
        description="The hidden text below is not visible, but screen readers announce it"
      >
        <Paper p="md" radius="md">
          <Stack spacing={8}>
            <Text>This text is visible to everyone.</Text>
            <VisuallyHidden>
              <Text>This text is hidden from the screen but read by screen readers.</Text>
            </VisuallyHidden>
            <Text size="sm" color="dimmed">
              A VisuallyHidden element is rendered between these two lines.
            </Text>
          </Stack>
        </Paper>
      </ExampleSection>

      <ExampleSection
        title="Accessible Context for Compact UI"
        description="Provide extra context for icon-only or abbreviated content"
        variant="showcase"
      >
        <Paper p="md" radius="md">
          <Stack spacing={12}>
            <Group spacing={8}>
              <Text size="xl" weight="700">4.8 / 5</Text>
              <VisuallyHidden accessibilityLabel="Rated 4.8 out of 5 stars by 1240 users">
                <Text>Rated 4.8 out of 5 stars by 1240 users</Text>
              </VisuallyHidden>
            </Group>
            <Text size="sm" color="dimmed">
              Sighted users see the short rating, screen reader users hear the
              full description provided by VisuallyHidden.
            </Text>
          </Stack>
        </Paper>
      </ExampleSection>

      <ExampleSection
        title="Component Props"
        description="Complete reference of all available VisuallyHidden props"
      >
        <PropsTable props={visuallyHiddenProps} />
      </ExampleSection>

      <ExampleSection
        title="Usage Example"
        description="Basic implementation code"
      >
        <CodeBlock
          code={`import { Text, VisuallyHidden } from 'react-native-mantine';

<Group spacing={8}>
  <Text size="xl" weight="700">4.8 / 5</Text>

  <VisuallyHidden accessibilityLabel="Rated 4.8 out of 5 stars">
    <Text>Rated 4.8 out of 5 stars</Text>
  </VisuallyHidden>
</Group>`}
        />
      </ExampleSection>
    </ExampleWrapper>
  );
};
