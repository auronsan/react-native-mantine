import {
  ExampleWrapper,
  ExampleSection,
  CodeBlock,
} from '../../components/ExampleWrapper';
import { PropsTable } from '../../components/PropsTable';
import { paperProps } from '../../data/props/PaperProps';
import { Text, Paper, Stack } from 'react-native-mantine';

export const PaperExample = () => {
  return (
    <ExampleWrapper
      title="Paper"
      description="Container component with shadow and border radius for cards and sections"
    >
      <ExampleSection
        title="Shadow Variants"
        description="Different shadow elevations"
      >
        <Stack spacing={16}>
          <Paper p="md" shadow="xs" radius="md">
            <Text>Shadow: xs</Text>
          </Paper>
          <Paper p="md" shadow="sm" radius="md">
            <Text>Shadow: sm</Text>
          </Paper>
          <Paper p="md" shadow="md" radius="md">
            <Text>Shadow: md</Text>
          </Paper>
          <Paper p="md" shadow="lg" radius="md">
            <Text>Shadow: lg</Text>
          </Paper>
          <Paper p="md" shadow="xl" radius="md">
            <Text>Shadow: xl</Text>
          </Paper>
        </Stack>
      </ExampleSection>

      <ExampleSection
        title="Border Radius"
        description="Different radius options"
      >
        <Stack spacing={16}>
          <Paper p="md" shadow="sm" radius="xs">
            <Text>Radius: xs</Text>
          </Paper>
          <Paper p="md" shadow="sm" radius="sm">
            <Text>Radius: sm</Text>
          </Paper>
          <Paper p="md" shadow="sm" radius="md">
            <Text>Radius: md</Text>
          </Paper>
          <Paper p="md" shadow="sm" radius="lg">
            <Text>Radius: lg</Text>
          </Paper>
          <Paper p="md" shadow="sm" radius="xl">
            <Text>Radius: xl</Text>
          </Paper>
        </Stack>
      </ExampleSection>

      <ExampleSection
        title="With Border"
        description="Paper with border option"
      >
        <Stack spacing={16}>
          <Paper p="md" radius="md" withBorder>
            <Text>Paper with border</Text>
          </Paper>
          <Paper p="lg" radius="md" shadow="sm" withBorder>
            <Text>Paper with border and shadow</Text>
          </Paper>
        </Stack>
      </ExampleSection>

      <ExampleSection
        title="Padding Options"
        description="Different padding sizes"
        variant="showcase"
      >
        <Stack spacing={16}>
          <Paper p="xs" shadow="sm" radius="md" withBorder>
            <Text>Padding: xs</Text>
          </Paper>
          <Paper p="sm" shadow="sm" radius="md" withBorder>
            <Text>Padding: sm</Text>
          </Paper>
          <Paper p="md" shadow="sm" radius="md" withBorder>
            <Text>Padding: md</Text>
          </Paper>
          <Paper p="lg" shadow="sm" radius="md" withBorder>
            <Text>Padding: lg</Text>
          </Paper>
          <Paper p="xl" shadow="sm" radius="md" withBorder>
            <Text>Padding: xl</Text>
          </Paper>
        </Stack>
      </ExampleSection>

      <ExampleSection
        title="Component Props"
        description="Complete reference of all available Paper props"
      >
        <PropsTable props={paperProps} />
      </ExampleSection>

      <ExampleSection
        title="Usage Example"
        description="Basic implementation code"
      >
        <CodeBlock
          code={`import { Paper, Text } from 'react-native-mantine';

// Basic paper
<Paper p="md" shadow="sm" radius="md">
  <Text>Content goes here</Text>
</Paper>

// Paper with border
<Paper p="lg" radius="md" withBorder>
  <Text>Card with border</Text>
</Paper>

// Elevated card
<Paper p="xl" shadow="lg" radius="lg">
  <Text>Elevated card</Text>
</Paper>`}
        />
      </ExampleSection>
    </ExampleWrapper>
  );
};
