import { View } from 'react-native';
import {
  ExampleWrapper,
  ExampleSection,
  CodeBlock,
} from '../../components/ExampleWrapper';
import { Paper, Text, Stack, Title, Badge } from 'react-native-mantine';

export const ColorPaletteExample = () => {
  return (
    <ExampleWrapper
      title="Color Palette"
      description="Updated color system aligned with Mantine web - consistent colors across platforms"
    >
      <ExampleSection
        title="Primary Colors"
        description="Core theme colors available in all components"
        variant="showcase"
      >
        <Stack spacing={12}>
          <Title order={6} style={{ marginBottom: 4 }}>
            Blue Spectrum
          </Title>
          <Stack spacing={8}>
            <Badge color="blue" size="lg">Blue</Badge>
            <Badge color="cyan" size="lg">Cyan</Badge>
            <Badge color="teal" size="lg">Teal</Badge>
          </Stack>

          <Title order={6} style={{ marginBottom: 4, marginTop: 8 }}>
            Green Spectrum
          </Title>
          <Stack spacing={8}>
            <Badge color="green" size="lg">Green</Badge>
            <Badge color="lime" size="lg">Lime</Badge>
          </Stack>

          <Title order={6} style={{ marginBottom: 4, marginTop: 8 }}>
            Warm Colors
          </Title>
          <Stack spacing={8}>
            <Badge color="yellow" size="lg">Yellow</Badge>
            <Badge color="orange" size="lg">Orange</Badge>
            <Badge color="red" size="lg">Red</Badge>
          </Stack>

          <Title order={6} style={{ marginBottom: 4, marginTop: 8 }}>
            Purple Spectrum
          </Title>
          <Stack spacing={8}>
            <Badge color="pink" size="lg">Pink</Badge>
            <Badge color="grape" size="lg">Grape</Badge>
            <Badge color="violet" size="lg">Violet</Badge>
            <Badge color="indigo" size="lg">Indigo</Badge>
          </Stack>
        </Stack>
      </ExampleSection>

      <ExampleSection
        title="Primary Shade System"
        description="Understanding how color shades work"
      >
        <Stack spacing={12}>
          <Paper p="md" shadow="sm" radius="md" style={{ backgroundColor: '#fff' }}>
            <Text weight="600" style={{ marginBottom: 8 }}>
              Color Shades: 0-9
            </Text>
            <Text size="sm" color="dimmed" style={{ marginBottom: 12 }}>
              Each color has 10 shades from lightest (0) to darkest (9)
            </Text>
            <View>
              <Badge color="blue" size="sm">Shade 0 (Lightest)</Badge>
              <Text size="sm" style={{ marginVertical: 4 }}>...</Text>
              <Badge color="blue" size="sm">Shade 6 (Default)</Badge>
              <Text size="sm" style={{ marginVertical: 4 }}>...</Text>
              <Badge color="blue" size="sm">Shade 9 (Darkest)</Badge>
            </View>
          </Paper>

          <Paper p="md" shadow="sm" radius="md" style={{ backgroundColor: '#fff' }}>
            <Text weight="600" style={{ marginBottom: 8 }}>
              Primary Shade
            </Text>
            <Text size="sm" color="dimmed" style={{ marginBottom: 12 }}>
              Light mode uses shade 6, dark mode uses shade 8
            </Text>
            <View style={{ flexDirection: 'row', gap: 8 }}>
              <Badge color="blue">Light: 6</Badge>
              <Badge color="blue" variant="outline">
                Dark: 8
              </Badge>
            </View>
          </Paper>
        </Stack>
      </ExampleSection>

      <ExampleSection
        title="Color in Components"
        description="How colors are used across different components"
        variant="showcase"
      >
        <Stack spacing={16}>
          <View>
            <Title order={6} style={{ marginBottom: 8 }}>
              Blue Variants
            </Title>
            <Stack spacing={8}>
              <Badge color="blue" size="lg" variant="filled">
                Filled Badge
              </Badge>
              <Badge color="blue" size="lg" variant="outline">
                Outline Badge
              </Badge>
              <Badge color="blue" size="lg" variant="light">
                Light Badge
              </Badge>
              <Paper p="sm" radius="md" style={{ backgroundColor: '#e7f5ff' }}>
                <Text color="blue" weight="500">
                  Paper with blue background
                </Text>
              </Paper>
            </Stack>
          </View>

          <View>
            <Title order={6} style={{ marginBottom: 8 }}>
              Green Variants
            </Title>
            <Stack spacing={8}>
              <Badge color="green" size="lg" variant="filled">
                Filled Badge
              </Badge>
              <Badge color="green" size="lg" variant="outline">
                Outline Badge
              </Badge>
              <Badge color="green" size="lg" variant="light">
                Light Badge
              </Badge>
              <Paper p="sm" radius="md" style={{ backgroundColor: '#ebfbee' }}>
                <Text color="green" weight="500">
                  Paper with green background
                </Text>
              </Paper>
            </Stack>
          </View>

          <View>
            <Title order={6} style={{ marginBottom: 8 }}>
              Grape Variants
            </Title>
            <Stack spacing={8}>
              <Badge color="grape" size="lg" variant="filled">
                Filled Badge
              </Badge>
              <Badge color="grape" size="lg" variant="outline">
                Outline Badge
              </Badge>
              <Badge color="grape" size="lg" variant="light">
                Light Badge
              </Badge>
              <Paper p="sm" radius="md" style={{ backgroundColor: '#f8f0fc' }}>
                <Text color="grape" weight="500">
                  Paper with grape background
                </Text>
              </Paper>
            </Stack>
          </View>
        </Stack>
      </ExampleSection>

      <ExampleSection
        title="Neutral Colors"
        description="Dark and gray shades for UI elements"
      >
        <Stack spacing={12}>
          <Title order={6} style={{ marginBottom: 4 }}>
            Dark Shades
          </Title>
          <Stack spacing={8}>
            <Badge color="dark" size="lg" variant="filled">
              Dark
            </Badge>
            <Badge color="gray" size="lg" variant="filled">
              Gray
            </Badge>
          </Stack>

          <Paper p="md" shadow="sm" radius="md" style={{ backgroundColor: '#fff' }}>
            <Text size="sm" color="dimmed">
              Dark and gray colors are perfect for text, borders, and subtle UI
              elements
            </Text>
          </Paper>
        </Stack>
      </ExampleSection>

      <ExampleSection
        title="Usage Example"
        description="How to use the color system in your components"
      >
        <CodeBlock
          code={`import { Badge, Text, Paper } from 'react-native-mantine';

// Use color prop
<Badge color="green">Success</Badge>
<Text color="blue">Blue text</Text>

// Access theme colors programmatically
import { useTheme } from 'react-native-mantine';

function MyComponent() {
  const theme = useTheme();

  return (
    <View style={{
      backgroundColor: theme.colors.blue[6]
    }}>
      <Text>Blue background</Text>
    </View>
  );
}

// Available colors:
// blue, cyan, teal, green, lime,
// yellow, orange, red, pink,
// grape, violet, indigo, dark, gray

// Each color has shades 0-9:
// theme.colors.blue[0]  // Lightest
// theme.colors.blue[6]  // Default
// theme.colors.blue[9]  // Darkest`}
        />
      </ExampleSection>
    </ExampleWrapper>
  );
};
