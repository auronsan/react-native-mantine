import { View, StyleSheet } from 'react-native';
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
  useTheme,
  colorSchemeValue,
} from 'react-native-mantine';

export const ColorSchemeConstantsExample = () => {
  const theme = useTheme();

  // Example: Define color scheme-aware constants
  const appColors = {
    text: colorSchemeValue('#000', '#fff'),
    background: colorSchemeValue('#FCFCFC', '#272727'),
    primaryButtonBackground: colorSchemeValue('#00203E', '#2581C4'),
    primaryButtonText: 'white', // Fixed value
    cardBackground: colorSchemeValue('#FFFFFF', '#1A1A1A'),
    border: colorSchemeValue('#E0E0E0', '#404040'),
  };

  // Resolve all constants based on current color scheme
  const colors = theme.fn.colorSchemeConstants(appColors);

  // Example: Single value resolution
  const textColor = theme.fn.colorSchemeValue(
    colorSchemeValue('#000000', '#FFFFFF')
  );

  return (
    <ExampleWrapper
      title="Color Scheme Constants"
      description="Define constants that automatically adapt to light and dark modes"
    >
      <ExampleSection
        title="Basic Usage"
        description="Use colorSchemeValue() to create theme-aware constants"
      >
        <Stack spacing={12}>
          <Paper
            p="md"
            shadow="sm"
            radius="md"
            style={{ backgroundColor: colors.cardBackground }}
          >
            <Text
              weight="600"
              size="lg"
              style={{ color: colors.text, marginBottom: 12 }}
            >
              Current Color Scheme: {theme.colorScheme}
            </Text>

            <Stack spacing={8}>
              <View style={styles.colorRow}>
                <Text size="sm" style={{ color: colors.text, flex: 1 }}>
                  Text Color:
                </Text>
                <View style={[styles.colorSwatch, { backgroundColor: colors.text }]} />
                <Text size="sm" style={{ color: colors.text }}>
                  {colors.text}
                </Text>
              </View>

              <View style={styles.colorRow}>
                <Text size="sm" style={{ color: colors.text, flex: 1 }}>
                  Background:
                </Text>
                <View style={[styles.colorSwatch, { backgroundColor: colors.background }]} />
                <Text size="sm" style={{ color: colors.text }}>
                  {colors.background}
                </Text>
              </View>

              <View style={styles.colorRow}>
                <Text size="sm" style={{ color: colors.text, flex: 1 }}>
                  Card Background:
                </Text>
                <View style={[styles.colorSwatch, { backgroundColor: colors.cardBackground }]} />
                <Text size="sm" style={{ color: colors.text }}>
                  {colors.cardBackground}
                </Text>
              </View>

              <View style={styles.colorRow}>
                <Text size="sm" style={{ color: colors.text, flex: 1 }}>
                  Primary Button:
                </Text>
                <View style={[styles.colorSwatch, { backgroundColor: colors.primaryButtonBackground }]} />
                <Text size="sm" style={{ color: colors.text }}>
                  {colors.primaryButtonBackground}
                </Text>
              </View>
            </Stack>
          </Paper>

          <Button
            style={{ backgroundColor: colors.primaryButtonBackground }}
            onPress={() => theme.toggleMode?.()}
          >
            <Text style={{ color: colors.primaryButtonText }}>
              Toggle to {theme.colorScheme === 'light' ? 'Dark' : 'Light'} Mode
            </Text>
          </Button>
        </Stack>

        <CodeBlock code={`import { colorSchemeValue, useTheme } from 'react-native-mantine';

// Define constants with different light/dark values
const appColors = {
  text: colorSchemeValue('#000', '#fff'),
  background: colorSchemeValue('#FCFCFC', '#272727'),
  primaryButtonBackground: colorSchemeValue('#00203E', '#2581C4'),
  primaryButtonText: 'white', // Fixed value
};

// In your component
const theme = useTheme();
const colors = theme.fn.colorSchemeConstants(appColors);

// Use the resolved colors
<View style={{ backgroundColor: colors.background }}>
  <Text style={{ color: colors.text }}>
    Adapts to light/dark mode!
  </Text>
</View>`} />
      </ExampleSection>

      <ExampleSection
        title="Single Value Resolution"
        description="Resolve individual color scheme values"
      >
        <Paper
          p="md"
          shadow="sm"
          radius="md"
          style={{ backgroundColor: colors.cardBackground }}
        >
          <Text
            weight="600"
            size="md"
            style={{ color: textColor, marginBottom: 8 }}
          >
            Single Value Example
          </Text>
          <Text size="sm" style={{ color: colors.text }}>
            The text color is: {textColor}
          </Text>
          <Text size="sm" style={{ color: colors.text, marginTop: 4 }}>
            This was resolved using theme.fn.colorSchemeValue()
          </Text>
        </Paper>

        <CodeBlock code={`const theme = useTheme();

// Resolve a single value
const textColor = theme.fn.colorSchemeValue(
  colorSchemeValue('#000000', '#FFFFFF')
);

// Or with inline object
const bgColor = theme.fn.colorSchemeValue({
  light: '#FCFCFC',
  dark: '#272727'
});`} />
      </ExampleSection>

      <ExampleSection
        title="Theme Configuration"
        description="Store constants in theme.other for global access"
      >
        <Paper
          p="md"
          shadow="sm"
          radius="md"
          style={{ backgroundColor: colors.cardBackground }}
        >
          <Text
            weight="600"
            size="md"
            style={{ color: colors.text, marginBottom: 8 }}
          >
            Theme.other Configuration
          </Text>
          <Text size="sm" style={{ color: colors.text }}>
            Store your app's color scheme-aware constants in the theme
            configuration for easy access throughout your app.
          </Text>
        </Paper>

        <CodeBlock code={`import { createTheme, colorSchemeValue } from 'react-native-mantine';

const theme = createTheme({
  other: {
    colors: {
      text: colorSchemeValue('#000', '#fff'),
      background: colorSchemeValue('#FCFCFC', '#272727'),
      primaryButtonBackground: colorSchemeValue('#00203E', '#2581C4'),
      primaryButtonText: 'white',
    },
    spacing: {
      small: colorSchemeValue(8, 12),
      medium: 16,
      large: colorSchemeValue(24, 32),
    },
  },
});

// In your component
const theme = useTheme();
const colors = theme.fn.colorSchemeConstants(theme.other.colors);
const spacing = theme.fn.colorSchemeConstants(theme.other.spacing);`} />
      </ExampleSection>

      <ExampleSection
        title="Nested Constants"
        description="Handle complex nested structures with color scheme values"
      >
        <Stack spacing={12}>
          {/* Example with nested structure */}
          <Paper
            p="md"
            shadow="sm"
            radius="md"
            style={{ backgroundColor: colors.cardBackground }}
          >
            <Text
              weight="600"
              size="md"
              style={{ color: colors.text, marginBottom: 12 }}
            >
              Nested Structure Example
            </Text>

            <View style={{
              padding: 12,
              backgroundColor: colors.background,
              borderRadius: 8,
              borderWidth: 1,
              borderColor: colors.border,
            }}>
              <Text size="sm" style={{ color: colors.text }}>
                This demonstrates using multiple resolved constants together
                to create adaptive UI components.
              </Text>
            </View>
          </Paper>
        </Stack>

        <CodeBlock code={`const appConstants = {
  colors: {
    text: colorSchemeValue('#000', '#fff'),
    background: colorSchemeValue('#FCFCFC', '#272727'),
  },
  button: {
    primary: {
      background: colorSchemeValue('#00203E', '#2581C4'),
      text: 'white',
    },
    secondary: {
      background: colorSchemeValue('#E0E0E0', '#404040'),
      text: colorSchemeValue('#000', '#fff'),
    },
  },
};

// Resolve entire structure
const constants = theme.fn.colorSchemeConstants(appConstants);

// Access nested values
<Button style={{ backgroundColor: constants.button.primary.background }}>
  <Text style={{ color: constants.button.primary.text }}>
    Primary Button
  </Text>
</Button>`} />
      </ExampleSection>

      <ExampleSection
        title="Type Safety"
        description="Full TypeScript support for color scheme values"
      >
        <Paper
          p="md"
          shadow="sm"
          radius="md"
          style={{ backgroundColor: colors.cardBackground }}
        >
          <Text
            weight="600"
            size="md"
            style={{ color: colors.text, marginBottom: 8 }}
          >
            TypeScript Support
          </Text>
          <Text size="sm" style={{ color: colors.text }}>
            All color scheme helpers are fully typed with TypeScript,
            providing autocomplete and type checking for your constants.
          </Text>
        </Paper>

        <CodeBlock code={`import {
  ColorSchemeValue,
  colorSchemeValue
} from 'react-native-mantine';

// Type-safe color scheme values
interface AppColors {
  text: ColorSchemeValue<string>;
  background: ColorSchemeValue<string>;
  spacing: ColorSchemeValue<number>;
}

const colors: AppColors = {
  text: colorSchemeValue('#000', '#fff'),
  background: colorSchemeValue('#FCFCFC', '#272727'),
  spacing: colorSchemeValue(16, 24),
};

// TypeScript knows the resolved types
const theme = useTheme();
const resolved = theme.fn.colorSchemeConstants(colors);
// resolved.text is string
// resolved.spacing is number`} />
      </ExampleSection>

      <ExampleSection
        title="Common Use Cases"
        description="Real-world examples of color scheme-aware constants"
      >
        <Stack spacing={12}>
          <Paper
            p="md"
            shadow="sm"
            radius="md"
            style={{ backgroundColor: colors.cardBackground }}
          >
            <Text
              weight="600"
              size="md"
              style={{ color: colors.text, marginBottom: 8 }}
            >
              Perfect For:
            </Text>
            <Stack spacing={6}>
              <Text size="sm" style={{ color: colors.text }}>
                • Custom color palettes that differ between light/dark modes
              </Text>
              <Text size="sm" style={{ color: colors.text }}>
                • Brand colors with different shades for accessibility
              </Text>
              <Text size="sm" style={{ color: colors.text }}>
                • Spacing/sizing that adjusts based on theme
              </Text>
              <Text size="sm" style={{ color: colors.text }}>
                • Any constant that should adapt to color scheme
              </Text>
            </Stack>
          </Paper>

          <Paper
            p="md"
            shadow="sm"
            radius="md"
            style={{ backgroundColor: colors.cardBackground }}
          >
            <Text
              weight="600"
              size="md"
              style={{ color: colors.text, marginBottom: 8 }}
            >
              Benefits:
            </Text>
            <Stack spacing={6}>
              <Text size="sm" style={{ color: colors.text }}>
                ✓ Automatic adaptation to theme changes
              </Text>
              <Text size="sm" style={{ color: colors.text }}>
                ✓ Centralized color/constant management
              </Text>
              <Text size="sm" style={{ color: colors.text }}>
                ✓ Type-safe with full TypeScript support
              </Text>
              <Text size="sm" style={{ color: colors.text }}>
                ✓ Works with nested object structures
              </Text>
              <Text size="sm" style={{ color: colors.text }}>
                ✓ Performance-optimized resolution
              </Text>
            </Stack>
          </Paper>
        </Stack>
      </ExampleSection>
    </ExampleWrapper>
  );
};

const styles = StyleSheet.create({
  colorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  colorSwatch: {
    width: 24,
    height: 24,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#ccc',
  },
});
