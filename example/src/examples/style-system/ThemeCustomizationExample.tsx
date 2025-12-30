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
  Button,
  Badge,
  useTheme,
} from 'react-native-mantine';

export const ThemeCustomizationExample = () => {
  const theme = useTheme();

  return (
    <ExampleWrapper
      title="Theme Customization"
      description="Complete guide to customizing the Mantine theme with primaryColor, primaryShade, and custom colors"
    >
      <ExampleSection
        title="Primary Color System"
        description="Control your app's primary color and shade configuration"
      >
        <Stack spacing={12}>
          <Paper p="md" shadow="sm" radius="md" style={{ backgroundColor: '#fff' }}>
            <Text weight="600" size="lg" style={{ marginBottom: 8 }}>
              Current Theme Settings
            </Text>
            <Stack spacing={8}>
              <View>
                <Text size="sm" color="dimmed">Primary Color:</Text>
                <Badge color={theme.primaryColor} size="lg" style={{ marginTop: 4 }}>
                  {theme.primaryColor}
                </Badge>
              </View>
              <View>
                <Text size="sm" color="dimmed">Primary Shade (Light Mode):</Text>
                <Text weight="600">{typeof theme.primaryShade === 'number' ? theme.primaryShade : theme.primaryShade.light}</Text>
              </View>
              <View>
                <Text size="sm" color="dimmed">Primary Shade (Dark Mode):</Text>
                <Text weight="600">{typeof theme.primaryShade === 'number' ? theme.primaryShade : theme.primaryShade.dark}</Text>
              </View>
            </Stack>
          </Paper>

          <Paper p="md" shadow="sm" radius="md" style={{ backgroundColor: '#fff' }}>
            <Text weight="600" style={{ marginBottom: 8 }}>
              Using Primary Color
            </Text>
            <Text size="sm" color="dimmed" style={{ marginBottom: 12 }}>
              The primary color is automatically used when no color prop is specified
            </Text>
            <Stack spacing={8}>
              <Button>Default Button (uses primary)</Button>
              <Badge>Default Badge (uses primary)</Badge>
            </Stack>
          </Paper>
        </Stack>
      </ExampleSection>

      <ExampleSection
        title="Custom Theme Example"
        description="How to create a custom theme with your brand colors"
      >
        <CodeBlock
          code={`import { ThemeProvider, createTheme } from 'react-native-mantine';

const customTheme = createTheme({
  // Set primary color
  primaryColor: 'teal',

  // Configure shade for light/dark modes
  primaryShade: {
    light: 6,  // Teal[6] in light mode
    dark: 8,   // Teal[8] in dark mode
  },

  // Customize typography
  fontFamily: 'Inter',
  fontSizes: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
  },

  // Adjust spacing
  spacing: {
    xs: 8,
    sm: 12,
    md: 16,
    lg: 24,
    xl: 32,
  },

  // Customize border radius
  radius: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
  },
});

export default function App() {
  return (
    <ThemeProvider theme={customTheme}>
      {/* Your app */}
    </ThemeProvider>
  );
}`}
        />
      </ExampleSection>

      <ExampleSection
        title="Adding Custom Colors"
        description="Extend the theme with your own color palettes"
      >
        <CodeBlock
          code={`const theme = createTheme({
  primaryColor: 'brand',
  colors: {
    // Add custom brand color with 10 shades
    brand: [
      '#e6f7ff', // 0 - Lightest
      '#bae7ff', // 1
      '#91d5ff', // 2
      '#69c0ff', // 3
      '#40a9ff', // 4
      '#1890ff', // 5
      '#096dd9', // 6 - Default (light mode)
      '#0050b3', // 7
      '#003a8c', // 8 - Default (dark mode)
      '#002766', // 9 - Darkest
    ],
    // Add more custom colors
    success: [
      '#f6ffed', '#d9f7be', '#b7eb8f', '#95de64', '#73d13d',
      '#52c41a', '#389e0d', '#237804', '#135200', '#092b00',
    ],
  },
});

// Use custom colors in components
<Button color="brand">Brand Button</Button>
<Badge color="success">Success</Badge>`}
        />
      </ExampleSection>

      <ExampleSection
        title="Primary Shade Explained"
        description="Understanding how primary shade affects your app"
        variant="showcase"
      >
        <Stack spacing={12}>
          <Paper p="md" shadow="sm" radius="md" style={{ backgroundColor: '#fff' }}>
            <Text weight="600" style={{ marginBottom: 8 }}>
              What is Primary Shade?
            </Text>
            <Text size="sm" color="dimmed" style={{ marginBottom: 12 }}>
              Each color has 10 shades (0-9). The primaryShade setting determines which shade is used as the default for that color.
            </Text>
            <View style={{ flexDirection: 'row', gap: 8, flexWrap: 'wrap' }}>
              <Badge color="blue" variant="filled">Shade 6 (Light)</Badge>
              <Badge color="blue" variant="outline">Shade 8 (Dark)</Badge>
            </View>
          </Paper>

          <Paper p="md" shadow="sm" radius="md" style={{ backgroundColor: '#fff' }}>
            <Text weight="600" style={{ marginBottom: 8 }}>
              Why Two Shades?
            </Text>
            <Text size="sm" color="dimmed">
              Light mode typically uses lighter shades (6) while dark mode uses darker shades (8) for better contrast and readability.
            </Text>
          </Paper>
        </Stack>
      </ExampleSection>

      <ExampleSection
        title="Using Theme Functions"
        description="Access theme values programmatically"
      >
        <CodeBlock
          code={`import { useMantineTheme } from 'react-native-mantine';

function MyComponent() {
  const theme = useMantineTheme();

  // Get primary color at current shade
  const primaryColor = theme.fn.themeColor(theme.primaryColor);
  // Returns blue[6] in light mode, blue[8] in dark mode

  // Get specific shade
  const lightBlue = theme.fn.themeColor('blue', 2);
  // Always returns blue[2]

  // Get primary color value
  const primary = theme.fn.primaryColor();
  // Same as theme.fn.themeColor(theme.primaryColor)

  // Get variant styles
  const buttonStyles = theme.fn.variant({
    variant: 'filled',
    color: 'blue',
  });
  // Returns { background, color, border }

  return (
    <View style={{ backgroundColor: primaryColor }}>
      <Text style={{ color: buttonStyles.color }}>
        Styled with theme
      </Text>
    </View>
  );
}`}
        />
      </ExampleSection>

      <ExampleSection
        title="Complete Theme Example"
        description="Full example with all customization options"
      >
        <CodeBlock
          code={`import { ThemeProvider, createTheme } from 'react-native-mantine';

const myTheme = createTheme({
  // Color System
  primaryColor: 'violet',
  primaryShade: { light: 6, dark: 8 },
  colorScheme: 'light',

  // Typography
  fontFamily: 'Inter',
  fontSizes: { xs: 12, sm: 14, md: 16, lg: 18, xl: 20 },
  lineHeight: 1.6,
  headings: {
    fontFamily: 'Inter-Bold',
    sizes: {
      h1: { fontSize: 32, lineHeight: 1.2 },
      h2: { fontSize: 28, lineHeight: 1.3 },
      h3: { fontSize: 24, lineHeight: 1.4 },
      h4: { fontSize: 20, lineHeight: 1.5 },
      h5: { fontSize: 18, lineHeight: 1.5 },
      h6: { fontSize: 16, lineHeight: 1.5 },
    },
  },

  // Spacing & Layout
  spacing: { xs: 8, sm: 12, md: 16, lg: 24, xl: 32 },
  radius: { xs: 4, sm: 8, md: 12, lg: 16, xl: 24 },

  // Custom Colors
  colors: {
    brand: [
      '#f0e7ff', '#d9c2ff', '#c29dff', '#ab78ff',
      '#9453ff', '#7d2eff', '#6609ff', '#5200cc',
      '#3d0099', '#290066',
    ],
  },

  // Shadows
  shadows: {
    xs: { shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 1 },
    sm: { shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 3 },
    md: { shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.15, shadowRadius: 6 },
    lg: { shadowColor: '#000', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.2, shadowRadius: 12 },
    xl: { shadowColor: '#000', shadowOffset: { width: 0, height: 16 }, shadowOpacity: 0.25, shadowRadius: 24 },
  },

  // Custom properties
  other: {
    accentColor: 'cyan',
    borderColor: '#e0e0e0',
  },
});

export default function App() {
  return (
    <ThemeProvider theme={myTheme}>
      {/* Your app components */}
    </ThemeProvider>
  );
}`}
        />
      </ExampleSection>

      <ExampleSection
        title="Theme Best Practices"
        description="Tips for effective theme customization"
      >
        <Stack spacing={12}>
          <Paper p="md" shadow="sm" radius="md" style={{ backgroundColor: '#fff' }}>
            <Text weight="600" style={{ marginBottom: 8 }}>
              1. Always Use 10 Shades
            </Text>
            <Text size="sm" color="dimmed">
              Custom colors must have exactly 10 shades (0-9) to work properly with the theme system.
            </Text>
          </Paper>

          <Paper p="md" shadow="sm" radius="md" style={{ backgroundColor: '#fff' }}>
            <Text weight="600" style={{ marginBottom: 8 }}>
              2. Test in Both Modes
            </Text>
            <Text size="sm" color="dimmed">
              Always test your custom theme in both light and dark modes to ensure good contrast.
            </Text>
          </Paper>

          <Paper p="md" shadow="sm" radius="md" style={{ backgroundColor: '#fff' }}>
            <Text weight="600" style={{ marginBottom: 8 }}>
              3. Use Theme Functions
            </Text>
            <Text size="sm" color="dimmed">
              Prefer theme.fn.themeColor() over direct palette access for better maintainability.
            </Text>
          </Paper>

          <Paper p="md" shadow="sm" radius="md" style={{ backgroundColor: '#fff' }}>
            <Text weight="600" style={{ marginBottom: 8 }}>
              4. Store Custom Values in 'other'
            </Text>
            <Text size="sm" color="dimmed">
              Use theme.other for custom properties that don't fit standard theme structure.
            </Text>
          </Paper>
        </Stack>
      </ExampleSection>
    </ExampleWrapper>
  );
};
