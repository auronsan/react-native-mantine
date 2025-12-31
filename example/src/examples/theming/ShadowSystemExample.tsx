import {
  ExampleWrapper,
  ExampleSection,
  CodeBlock,
} from '../../components/ExampleWrapper';
import { Paper, Text, Stack, Title } from 'react-native-mantine';

export const ShadowSystemExample = () => {
  return (
    <ExampleWrapper
      title="Shadow System"
      description="New shadow system aligned with Mantine web - xs, sm, md, lg, xl shadow variants"
    >
      <ExampleSection
        title="Shadow Sizes"
        description="All available shadow sizes from xs to xl"
        variant="showcase"
      >
        <Stack spacing={20}>
          <Paper p="md" shadow="xs" radius="md" style={{ backgroundColor: '#fff' }}>
            <Text weight="500">Extra Small (xs)</Text>
            <Text size="sm" color="dimmed">
              Subtle shadow for minimal elevation
            </Text>
          </Paper>

          <Paper p="md" shadow="sm" radius="md" style={{ backgroundColor: '#fff' }}>
            <Text weight="500">Small (sm)</Text>
            <Text size="sm" color="dimmed">
              Light shadow for cards and panels
            </Text>
          </Paper>

          <Paper p="md" shadow="md" radius="md" style={{ backgroundColor: '#fff' }}>
            <Text weight="500">Medium (md)</Text>
            <Text size="sm" color="dimmed">
              Standard shadow for elevated content
            </Text>
          </Paper>

          <Paper p="md" shadow="lg" radius="md" style={{ backgroundColor: '#fff' }}>
            <Text weight="500">Large (lg)</Text>
            <Text size="sm" color="dimmed">
              Prominent shadow for modals and dialogs
            </Text>
          </Paper>

          <Paper p="md" shadow="xl" radius="md" style={{ backgroundColor: '#fff' }}>
            <Text weight="500">Extra Large (xl)</Text>
            <Text size="sm" color="dimmed">
              Maximum shadow for high elevation
            </Text>
          </Paper>
        </Stack>
      </ExampleSection>

      <ExampleSection
        title="Shadow with Colors"
        description="Shadows work beautifully with colored backgrounds"
      >
        <Stack spacing={16}>
          <Paper p="md" shadow="md" radius="md" style={{ backgroundColor: '#e3f2fd' }}>
            <Text weight="500" color="blue">
              Blue background with shadow
            </Text>
          </Paper>

          <Paper p="md" shadow="md" radius="md" style={{ backgroundColor: '#f3e5f5' }}>
            <Text weight="500" color="grape">
              Grape background with shadow
            </Text>
          </Paper>

          <Paper p="md" shadow="md" radius="md" style={{ backgroundColor: '#e8f5e9' }}>
            <Text weight="500" color="green">
              Green background with shadow
            </Text>
          </Paper>
        </Stack>
      </ExampleSection>

      <ExampleSection
        title="Shadow Comparison"
        description="Side-by-side comparison of shadow depths"
        variant="showcase"
      >
        <Stack spacing={24}>
          <Title order={6}>No Shadow vs With Shadow</Title>
          <Stack spacing={12}>
            <Paper p="sm" radius="md" style={{ backgroundColor: '#fff' }}>
              <Text size="sm">No shadow - flat appearance</Text>
            </Paper>
            <Paper p="sm" shadow="lg" radius="md" style={{ backgroundColor: '#fff' }}>
              <Text size="sm">Large shadow - elevated appearance</Text>
            </Paper>
          </Stack>
        </Stack>
      </ExampleSection>

      <ExampleSection
        title="Usage Example"
        description="How to use the shadow system in your components"
      >
        <CodeBlock
          code={`import { Paper, Text } from 'react-native-mantine';

// Apply shadow sizes: xs, sm, md, lg, xl
<Paper p="md" shadow="md" radius="md">
  <Text>Content with medium shadow</Text>
</Paper>

// Shadows work great with colors
<Paper
  p="lg"
  shadow="lg"
  radius="md"
  style={{ backgroundColor: '#fff' }}
>
  <Text>Elevated card with large shadow</Text>
</Paper>`}
        />
      </ExampleSection>
    </ExampleWrapper>
  );
};
