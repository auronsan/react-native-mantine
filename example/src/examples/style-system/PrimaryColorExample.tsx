import { View } from 'react-native';
import {
  ExampleWrapper,
  ExampleSection,
  CodeBlock,
} from '../../components/ExampleWrapper';
import {
  Paper,
  Text,
  Stack,
  Title,
  Button,
  Badge,
  Group,
  useTheme,
} from 'react-native-mantine';

export const PrimaryColorExample = () => {
  const theme = useTheme();

  return (
    <ExampleWrapper
      title="Primary Color System"
      description="Understanding and using the primaryColor and primaryShade configuration"
    >
      <ExampleSection
        title="Current Configuration"
        description="View your current theme's primary color settings"
        variant="showcase"
      >
        <Paper p="lg" shadow="md" radius="md" style={{ backgroundColor: '#fff' }}>
          <Stack spacing={16}>
            <View>
              <Text size="sm" color="dimmed" style={{ marginBottom: 4 }}>
                Primary Color
              </Text>
              <Badge
                color={theme.primaryColor}
                size="xl"
                variant="filled"
                style={{ alignSelf: 'flex-start' }}
              >
                {theme.primaryColor}
              </Badge>
            </View>

            <View>
              <Text size="sm" color="dimmed" style={{ marginBottom: 4 }}>
                Light Mode Shade
              </Text>
              <Text weight="700" size="xl">
                {typeof theme.primaryShade === 'number' ? theme.primaryShade : theme.primaryShade.light}
              </Text>
              <Text size="xs" color="dimmed">
                Color value: {theme.colors[theme.primaryColor]?.[typeof theme.primaryShade === 'number' ? theme.primaryShade : theme.primaryShade.light]}
              </Text>
            </View>

            <View>
              <Text size="sm" color="dimmed" style={{ marginBottom: 4 }}>
                Dark Mode Shade
              </Text>
              <Text weight="700" size="xl">
                {typeof theme.primaryShade === 'number' ? theme.primaryShade : theme.primaryShade.dark}
              </Text>
              <Text size="xs" color="dimmed">
                Color value: {theme.colors[theme.primaryColor]?.[typeof theme.primaryShade === 'number' ? theme.primaryShade : theme.primaryShade.dark]}
              </Text>
            </View>

            <View>
              <Text size="sm" color="dimmed" style={{ marginBottom: 4 }}>
                Current Primary Color Value
              </Text>
              <View
                style={{
                  width: 60,
                  height: 60,
                  backgroundColor: theme.fn.primaryColor(),
                  borderRadius: 8,
                  borderWidth: 1,
                  borderColor: '#ccc',
                }}
              />
              <Text size="xs" style={{ marginTop: 4 }}>
                {theme.fn.primaryColor()}
              </Text>
            </View>
          </Stack>
        </Paper>
      </ExampleSection>

      <ExampleSection
        title="Components Using Primary Color"
        description="When you don't specify a color, components use the primary color"
        variant="showcase"
      >
        <Stack spacing={12}>
          <Title order={6} style={{ marginBottom: 4 }}>
            Buttons
          </Title>
          <Stack spacing={8}>
            <Button variant="filled">Default Filled Button</Button>
            <Button variant="light">Default Light Button</Button>
            <Button variant="outline">Default Outline Button</Button>
            <Button variant="subtle">Default Subtle Button</Button>
          </Stack>

          <Title order={6} style={{ marginBottom: 4, marginTop: 8 }}>
            Badges
          </Title>
          <Group spacing={8}>
            <Badge variant="filled">Filled</Badge>
            <Badge variant="light">Light</Badge>
            <Badge variant="outline">Outline</Badge>
          </Group>
        </Stack>
      </ExampleSection>

      <ExampleSection
        title="Accessing Primary Color"
        description="Use theme functions to get primary color values"
      >
        <CodeBlock
          code={`import { useTheme } from 'react-native-mantine';

function MyComponent() {
  const theme = useTheme();

  // Get primary color at current shade
  // In light mode: returns blue[6]
  // In dark mode: returns blue[8]
  const primaryColor = theme.fn.primaryColor();

  // Get primary color for specific color scheme
  const lightPrimary = theme.fn.primaryColor('light');
  const darkPrimary = theme.fn.primaryColor('dark');

  // Get current primary shade
  const shade = theme.fn.primaryShade();
  // Returns 6 in light mode, 8 in dark mode

  // Get shade for specific color scheme
  const lightShade = theme.fn.primaryShade('light');  // 6
  const darkShade = theme.fn.primaryShade('dark');    // 8

  return (
    <View style={{ backgroundColor: primaryColor }}>
      <Text>Using primary color</Text>
    </View>
  );
}`}
        />
      </ExampleSection>

      <ExampleSection
        title="Different Primary Colors"
        description="Examples showing different primary color options"
        variant="showcase"
      >
        <Stack spacing={16}>
          <View>
            <Title order={6} style={{ marginBottom: 8 }}>
              Blue (Default)
            </Title>
            <Group spacing={8}>
              <Badge color="blue" variant="filled">Filled</Badge>
              <Badge color="blue" variant="light">Light</Badge>
              <Badge color="blue" variant="outline">Outline</Badge>
            </Group>
          </View>

          <View>
            <Title order={6} style={{ marginBottom: 8 }}>
              Violet
            </Title>
            <Group spacing={8}>
              <Badge color="violet" variant="filled">Filled</Badge>
              <Badge color="violet" variant="light">Light</Badge>
              <Badge color="violet" variant="outline">Outline</Badge>
            </Group>
          </View>

          <View>
            <Title order={6} style={{ marginBottom: 8 }}>
              Teal
            </Title>
            <Group spacing={8}>
              <Badge color="teal" variant="filled">Filled</Badge>
              <Badge color="teal" variant="light">Light</Badge>
              <Badge color="teal" variant="outline">Outline</Badge>
            </Group>
          </View>

          <View>
            <Title order={6} style={{ marginBottom: 8 }}>
              Orange
            </Title>
            <Group spacing={8}>
              <Badge color="orange" variant="filled">Filled</Badge>
              <Badge color="orange" variant="light">Light</Badge>
              <Badge color="orange" variant="outline">Outline</Badge>
            </Group>
          </View>

          <View>
            <Title order={6} style={{ marginBottom: 8 }}>
              Green
            </Title>
            <Group spacing={8}>
              <Badge color="green" variant="filled">Filled</Badge>
              <Badge color="green" variant="light">Light</Badge>
              <Badge color="green" variant="outline">Outline</Badge>
            </Group>
          </View>
        </Stack>
      </ExampleSection>

      <ExampleSection
        title="Setting Primary Color"
        description="Configure primary color in your theme"
      >
        <CodeBlock
          code={`import { ThemeProvider, createTheme } from 'react-native-mantine';

// Option 1: Use built-in color
const theme1 = createTheme({
  primaryColor: 'teal',
});

// Option 2: Use custom color
const theme2 = createTheme({
  primaryColor: 'brand',
  colors: {
    brand: [
      '#e6f7ff',
      '#bae7ff',
      '#91d5ff',
      '#69c0ff',
      '#40a9ff',
      '#1890ff',
      '#096dd9',
      '#0050b3',
      '#003a8c',
      '#002766',
    ],
  },
});

export default function App() {
  return (
    <ThemeProvider theme={theme1}>
      {/* Now all components use teal as primary */}
      <Button>Teal Button</Button>
    </ThemeProvider>
  );
}`}
        />
      </ExampleSection>

      <ExampleSection
        title="Customizing Primary Shade"
        description="Adjust which shade is used in light/dark modes"
      >
        <CodeBlock
          code={`const theme = createTheme({
  primaryColor: 'blue',
  primaryShade: {
    light: 5,  // Use lighter shade in light mode
    dark: 9,   // Use darker shade in dark mode
  },
});

// Default is { light: 6, dark: 8 }
// Lower numbers = lighter
// Higher numbers = darker

// Example configurations:
// Lighter theme: { light: 4, dark: 7 }
// Darker theme: { light: 7, dark: 9 }
// Consistent: { light: 6, dark: 6 }`}
        />
      </ExampleSection>

      <ExampleSection
        title="Understanding Shade Values"
        description="Visual guide to shade numbers"
        variant="showcase"
      >
        <Paper p="md" shadow="sm" radius="md" style={{ backgroundColor: '#fff' }}>
          <Text weight="600" style={{ marginBottom: 12 }}>
            Blue Color Shades (0-9)
          </Text>
          <Stack spacing={8}>
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((shade) => (
              <View
                key={shade}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 12,
                }}
              >
                <View
                  style={{
                    width: 40,
                    height: 40,
                    backgroundColor: theme.colors.blue?.[shade],
                    borderRadius: 8,
                    borderWidth: 1,
                    borderColor: '#ccc',
                  }}
                />
                <View style={{ flex: 1 }}>
                  <Text weight="600">Shade {shade}</Text>
                  <Text size="xs" color="dimmed">
                    {theme.colors.blue?.[shade]}
                  </Text>
                </View>
                {shade === 6 && (
                  <Badge size="sm" variant="outline">Light Default</Badge>
                )}
                {shade === 8 && (
                  <Badge size="sm" variant="outline">Dark Default</Badge>
                )}
              </View>
            ))}
          </Stack>
        </Paper>
      </ExampleSection>

      <ExampleSection
        title="Best Practices"
        description="Tips for using primary color effectively"
      >
        <Stack spacing={12}>
          <Paper p="md" shadow="sm" radius="md" style={{ backgroundColor: '#fff' }}>
            <Text weight="600" style={{ marginBottom: 8 }}>
              1. Choose Wisely
            </Text>
            <Text size="sm" color="dimmed">
              Your primary color should align with your brand and be used consistently across the app.
            </Text>
          </Paper>

          <Paper p="md" shadow="sm" radius="md" style={{ backgroundColor: '#fff' }}>
            <Text weight="600" style={{ marginBottom: 8 }}>
              2. Test Both Modes
            </Text>
            <Text size="sm" color="dimmed">
              Ensure your primary color looks good in both light and dark modes by testing both shades.
            </Text>
          </Paper>

          <Paper p="md" shadow="sm" radius="md" style={{ backgroundColor: '#fff' }}>
            <Text weight="600" style={{ marginBottom: 8 }}>
              3. Use Default When Possible
            </Text>
            <Text size="sm" color="dimmed">
              Let components use the primary color by default instead of specifying it explicitly.
            </Text>
          </Paper>

          <Paper p="md" shadow="sm" radius="md" style={{ backgroundColor: '#fff' }}>
            <Text weight="600" style={{ marginBottom: 8 }}>
              4. Provide Contrast
            </Text>
            <Text size="sm" color="dimmed">
              Ensure sufficient contrast between primary color and text for accessibility.
            </Text>
          </Paper>
        </Stack>
      </ExampleSection>
    </ExampleWrapper>
  );
};
