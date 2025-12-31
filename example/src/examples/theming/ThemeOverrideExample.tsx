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
  Group,
  useTheme,
} from 'react-native-mantine';

/**
 * Example showcasing the theme override functionality
 * Demonstrates how custom constants defined in App.tsx are accessible throughout the app
 */
export const ThemeOverrideExample = () => {
  const theme = useTheme();

  // Access the theme override constants defined in App.tsx
  const colors = theme.fn.colorSchemeConstants(theme.other?.colors || {});
  const spacing = theme.fn.colorSchemeConstants(theme.other?.spacing || {});

  return (
    <ExampleWrapper
      title="Theme Override Example"
      description="Demonstrates using custom color scheme-aware constants from theme configuration"
    >
      <ExampleSection
        title="Accessing Theme Constants"
        description="All constants defined in App.tsx are accessible via theme.other"
      >
        <Stack spacing={12}>
          <Paper
            p="md"
            shadow="sm"
            radius="md"
            style={{
              backgroundColor: colors.cardBackground,
              borderWidth: 1,
              borderColor: colors.border,
            }}
          >
            <Text
              weight="600"
              size="lg"
              style={{ color: colors.text, marginBottom: 12 }}
            >
              Current Theme: {theme.colorScheme}
            </Text>

            <Text size="sm" style={{ color: colors.textSecondary }}>
              All colors automatically adapt when switching between light and dark modes.
            </Text>
          </Paper>

          <View style={styles.colorGrid}>
            <View style={styles.colorItem}>
              <View style={[styles.colorSwatch, { backgroundColor: colors.text }]} />
              <Text size="xs" style={{ color: colors.text }}>
                Text
              </Text>
            </View>

            <View style={styles.colorItem}>
              <View style={[styles.colorSwatch, { backgroundColor: colors.background }]} />
              <Text size="xs" style={{ color: colors.text }}>
                Background
              </Text>
            </View>

            <View style={styles.colorItem}>
              <View style={[styles.colorSwatch, { backgroundColor: colors.primaryButtonBackground }]} />
              <Text size="xs" style={{ color: colors.text }}>
                Primary
              </Text>
            </View>

            <View style={styles.colorItem}>
              <View style={[styles.colorSwatch, { backgroundColor: colors.secondaryButtonBackground }]} />
              <Text size="xs" style={{ color: colors.text }}>
                Secondary
              </Text>
            </View>
          </View>
        </Stack>

        <CodeBlock code={`// In App.tsx
const themeOverride = {
  other: {
    colors: {
      text: colorSchemeValue('#000', '#fff'),
      background: colorSchemeValue('#FCFCFC', '#272727'),
      primaryButtonBackground: colorSchemeValue('#00203E', '#2581C4'),
    }
  }
};

<Theme theme={themeOverride}>
  <App />
</Theme>

// In any component
const theme = useTheme();
const colors = theme.fn.colorSchemeConstants(theme.other.colors);

<View style={{ backgroundColor: colors.background }}>
  <Text style={{ color: colors.text }}>Themed content</Text>
</View>`} />
      </ExampleSection>

      <ExampleSection
        title="Button Text Color Fix"
        description="Buttons now correctly show white text on filled variants in both light and dark modes"
      >
        <Stack spacing={12}>
          <Text size="sm" style={{ color: colors.text }}>
            Testing Button component with different variants:
          </Text>

          <Group spacing={8}>
            <Button variant="filled" color="blue">
              Filled Blue
            </Button>
            <Button variant="filled" color="red">
              Filled Red
            </Button>
          </Group>

          <Group spacing={8}>
            <Button variant="light" color="blue">
              Light Blue
            </Button>
            <Button variant="outline" color="green">
              Outline Green
            </Button>
          </Group>

          <Group spacing={8}>
            <Button variant="default">
              Default
            </Button>
            <Button variant="subtle" color="violet">
              Subtle Violet
            </Button>
          </Group>

          <Paper
            p="md"
            style={{
              backgroundColor: colors.cardBackground,
              borderWidth: 1,
              borderColor: colors.border,
            }}
          >
            <Text weight="600" size="sm" style={{ color: colors.text, marginBottom: 8 }}>
              Expected Behavior:
            </Text>
            <Stack spacing={4}>
              <Text size="xs" style={{ color: colors.textSecondary }}>
                • Filled variant: White text on colored background
              </Text>
              <Text size="xs" style={{ color: colors.textSecondary }}>
                • Light variant: Colored text on light background
              </Text>
              <Text size="xs" style={{ color: colors.textSecondary }}>
                • Outline variant: Colored text with colored border
              </Text>
              <Text size="xs" style={{ color: colors.textSecondary }}>
                • Default variant: Adapts to color scheme (white/dark)
              </Text>
              <Text size="xs" style={{ color: colors.textSecondary }}>
                • Subtle variant: Colored text, transparent background
              </Text>
            </Stack>
          </Paper>
        </Stack>

        <CodeBlock code={`// Button component now passes text color to Text wrapper
const textColor = (styles.root as any).color as string;

{withTextWrapper(children, shouldWrapInText, { color: textColor })}`} />
      </ExampleSection>

      <ExampleSection
        title="Using Custom Button Colors"
        description="Applying theme override colors to buttons"
      >
        <Stack spacing={12}>
          <Button
            style={{
              backgroundColor: colors.primaryButtonBackground,
              borderColor: colors.primaryButtonBorder,
            }}
          >
            <Text style={{ color: colors.primaryButtonTextColor }}>
              Primary Button (Custom)
            </Text>
          </Button>

          <Button
            variant="outline"
            style={{
              borderColor: colors.secondaryButtonBorder,
            }}
          >
            <Text style={{ color: colors.secondaryButtonTextColor }}>
              Secondary Button (Custom)
            </Text>
          </Button>

          <Paper
            p="md"
            style={{
              backgroundColor: colors.cardBackground,
              borderWidth: 1,
              borderColor: colors.border,
            }}
          >
            <Text size="sm" style={{ color: colors.text }}>
              These buttons use the custom colors defined in the theme override.
              Try toggling between light and dark modes to see them adapt!
            </Text>
          </Paper>
        </Stack>

        <CodeBlock code={`// Using theme override colors in components
const colors = theme.fn.colorSchemeConstants(theme.other.colors);

<Button
  style={{
    backgroundColor: colors.primaryButtonBackground,
  }}
>
  <Text style={{ color: colors.primaryButtonTextColor }}>
    Custom Button
  </Text>
</Button>`} />
      </ExampleSection>

      <ExampleSection
        title="Spacing Constants"
        description="Using color scheme-aware spacing values"
      >
        <Stack spacing={12}>
          <Paper
            p="md"
            style={{
              backgroundColor: colors.cardBackground,
              borderWidth: 1,
              borderColor: colors.border,
            }}
          >
            <Text weight="600" size="md" style={{ color: colors.text, marginBottom: spacing.small }}>
              Adaptive Spacing
            </Text>
            <Text size="sm" style={{ color: colors.textSecondary, marginBottom: spacing.medium }}>
              Spacing values can also adapt between light and dark modes.
              This is useful for adjusting density.
            </Text>
            <View style={{ height: spacing.large, backgroundColor: colors.border }} />
            <Text size="xs" style={{ color: colors.textSecondary, marginTop: spacing.small }}>
              The spacing above adapts: {spacing.large}px in current mode
            </Text>
          </Paper>
        </Stack>

        <CodeBlock code={`// In theme override
spacing: {
  tiny: colorSchemeValue(4, 6),
  small: colorSchemeValue(8, 12),
  medium: 16, // Fixed value
  large: colorSchemeValue(24, 32),
}

// Usage
const spacing = theme.fn.colorSchemeConstants(theme.other.spacing);
<View style={{ padding: spacing.medium }} />`} />
      </ExampleSection>

      <ExampleSection
        title="Toggle Theme"
        description="Switch between light and dark modes to see all constants adapt"
      >
        <Button
          fullWidth
          size="lg"
          onPress={() => theme.toggleMode?.()}
        >
          Toggle to {theme.colorScheme === 'light' ? 'Dark' : 'Light'} Mode
        </Button>
      </ExampleSection>
    </ExampleWrapper>
  );
};

const styles = StyleSheet.create({
  colorGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  colorItem: {
    alignItems: 'center',
    gap: 4,
  },
  colorSwatch: {
    width: 48,
    height: 48,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
  },
});
