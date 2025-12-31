import { View } from 'react-native';
import {
  ExampleWrapper,
  ExampleSection,
  CodeBlock,
} from '../../components/ExampleWrapper';
import { Paper, Text, Stack, Title, Badge } from 'react-native-mantine';

export const ColorManipulationExample = () => {
  return (
    <ExampleWrapper
      title="Color Manipulation"
      description="New theme functions: lighten, darken, and dimmed for dynamic color adjustments"
    >
      <ExampleSection
        title="Color Function Overview"
        description="The theme provides three key color manipulation functions"
        variant="showcase"
      >
        <Stack spacing={12}>
          <Paper p="md" shadow="sm" radius="md" style={{ backgroundColor: '#fff' }}>
            <Text weight="600" size="lg">
              theme.fn.lighten(color, amount)
            </Text>
            <Text size="sm" color="dimmed" style={{ marginTop: 4 }}>
              Makes a color lighter by the specified amount (0-1)
            </Text>
            <View style={{ marginTop: 8 }}>
              <Badge color="blue">Example: lighten(blue, 0.2)</Badge>
            </View>
          </Paper>

          <Paper p="md" shadow="sm" radius="md" style={{ backgroundColor: '#fff' }}>
            <Text weight="600" size="lg">
              theme.fn.darken(color, amount)
            </Text>
            <Text size="sm" color="dimmed" style={{ marginTop: 4 }}>
              Makes a color darker by the specified amount (0-1)
            </Text>
            <View style={{ marginTop: 8 }}>
              <Badge color="grape">Example: darken(grape, 0.2)</Badge>
            </View>
          </Paper>

          <Paper p="md" shadow="sm" radius="md" style={{ backgroundColor: '#fff' }}>
            <Text weight="600" size="lg">
              theme.fn.dimmed()
            </Text>
            <Text size="sm" color="dimmed" style={{ marginTop: 4 }}>
              Returns the dimmed text color for secondary content
            </Text>
            <View style={{ marginTop: 8 }}>
              <Text color="dimmed">This is dimmed text</Text>
            </View>
          </Paper>
        </Stack>
      </ExampleSection>

      <ExampleSection
        title="Dimmed Text Usage"
        description="Perfect for secondary text and descriptions"
      >
        <Stack spacing={16}>
          <Paper p="md" shadow="sm" radius="md" style={{ backgroundColor: '#fff' }}>
            <Text weight="600" size="lg">
              Primary Text
            </Text>
            <Text color="dimmed" style={{ marginTop: 4 }}>
              This is dimmed secondary text - perfect for descriptions and
              captions
            </Text>
          </Paper>

          <Paper p="md" shadow="sm" radius="md" style={{ backgroundColor: '#fff' }}>
            <Text weight="600">Card Title</Text>
            <Text color="dimmed" size="sm" style={{ marginTop: 4 }}>
              Dimmed text for subtitles and metadata
            </Text>
          </Paper>
        </Stack>
      </ExampleSection>

      <ExampleSection
        title="Color Badges Showcase"
        description="All theme colors available for use"
        variant="showcase"
      >
        <Stack spacing={12}>
          <View>
            <Title order={6} style={{ marginBottom: 8 }}>
              Primary Colors
            </Title>
            <Stack spacing={8}>
              <Badge color="blue" size="lg">Blue</Badge>
              <Badge color="cyan" size="lg">Cyan</Badge>
              <Badge color="teal" size="lg">Teal</Badge>
              <Badge color="green" size="lg">Green</Badge>
              <Badge color="lime" size="lg">Lime</Badge>
            </Stack>
          </View>

          <View>
            <Title order={6} style={{ marginBottom: 8 }}>
              Warm Colors
            </Title>
            <Stack spacing={8}>
              <Badge color="yellow" size="lg">Yellow</Badge>
              <Badge color="orange" size="lg">Orange</Badge>
              <Badge color="red" size="lg">Red</Badge>
              <Badge color="pink" size="lg">Pink</Badge>
            </Stack>
          </View>

          <View>
            <Title order={6} style={{ marginBottom: 8 }}>
              Purple Spectrum
            </Title>
            <Stack spacing={8}>
              <Badge color="grape" size="lg">Grape</Badge>
              <Badge color="violet" size="lg">Violet</Badge>
              <Badge color="indigo" size="lg">Indigo</Badge>
            </Stack>
          </View>
        </Stack>
      </ExampleSection>

      <ExampleSection
        title="Usage Example"
        description="How to use color manipulation functions"
      >
        <CodeBlock
          code={`import { useTheme } from 'react-native-mantine';

function MyComponent() {
  const theme = useTheme();

  // Lighten a color (makes it lighter)
  const lighterBlue = theme.fn.lighten(
    theme.colors.blue[6],
    0.2  // 20% lighter
  );

  // Darken a color (makes it darker)
  const darkerBlue = theme.fn.darken(
    theme.colors.blue[6],
    0.2  // 20% darker
  );

  // Get dimmed text color
  const dimmedColor = theme.fn.dimmed();

  return (
    <View style={{ backgroundColor: lighterBlue }}>
      <Text style={{ color: dimmedColor }}>
        Secondary text
      </Text>
    </View>
  );
}

// Or use color prop directly
<Text color="dimmed">Dimmed text</Text>`}
        />
      </ExampleSection>
    </ExampleWrapper>
  );
};
