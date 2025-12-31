import { ScrollView, View, StyleSheet } from 'react-native';
import { Stack, Title, Text, Divider, Code } from 'react-native-mantine';
import { ExampleWrapper } from '../../components/ExampleWrapper';
import { useTheme } from 'react-native-mantine';

/**
 * Typography System Example
 * Demonstrates the complete typography theming system aligned with Mantine web
 */
export function TypographySystemExample() {
  const theme = useTheme();

  return (
    <ScrollView style={styles.container}>
      <Stack spacing={24}>
        {/* ====================================================================
            HEADINGS DEMONSTRATION
            ==================================================================== */}
        <ExampleWrapper
          title="Headings (h1-h6)"
          description="Title component uses theme.headings configuration. Each heading level can be customized via theme.headings.sizes."
        >
          <Stack spacing={16}>
            <Title order={1}>Heading 1</Title>
            <Title order={2}>Heading 2</Title>
            <Title order={3}>Heading 3</Title>
            <Title order={4}>Heading 4</Title>
            <Title order={5}>Heading 5</Title>
            <Title order={6}>Heading 6</Title>
          </Stack>
        </ExampleWrapper>

        <Divider />

        {/* ====================================================================
            FONT SIZES
            ==================================================================== */}
        <ExampleWrapper
          title="Font Sizes"
          description="Text component supports theme.fontSizes scale (xs, sm, md, lg, xl) or custom numbers."
        >
          <Stack spacing={12}>
            <Text size="xs">Extra small text (xs)</Text>
            <Text size="sm">Small text (sm)</Text>
            <Text size="md">Medium text (md) - default</Text>
            <Text size="lg">Large text (lg)</Text>
            <Text size="xl">Extra large text (xl)</Text>
            <Text size={24}>Custom size (24px)</Text>
          </Stack>
        </ExampleWrapper>

        <Divider />

        {/* ====================================================================
            LINE HEIGHTS
            ==================================================================== */}
        <ExampleWrapper
          title="Line Heights"
          description="Text component supports theme.lineHeights scale (xs, sm, md, lg, xl) as unitless multipliers."
        >
          <Stack spacing={16}>
            <View>
              <Text weight="600" size="sm">Tight (xs: 1.4)</Text>
              <Text lineHeight="xs" style={{ backgroundColor: 'rgba(0, 123, 255, 0.1)' }}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua.
              </Text>
            </View>
            <View>
              <Text weight="600" size="sm">Normal (md: 1.55)</Text>
              <Text lineHeight="md" style={{ backgroundColor: 'rgba(0, 123, 255, 0.1)' }}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua.
              </Text>
            </View>
            <View>
              <Text weight="600" size="sm">Relaxed (xl: 1.65)</Text>
              <Text lineHeight="xl" style={{ backgroundColor: 'rgba(0, 123, 255, 0.1)' }}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua.
              </Text>
            </View>
          </Stack>
        </ExampleWrapper>

        <Divider />

        {/* ====================================================================
            FONT WEIGHTS
            ==================================================================== */}
        <ExampleWrapper
          title="Font Weights"
          description="Text component supports weight prop and convenience props (bold, semiBold) using theme.fontWeights."
        >
          <Stack spacing={12}>
            <Text weight="300">Light (300)</Text>
            <Text weight="400">Normal (400)</Text>
            <Text weight="500">Medium (500)</Text>
            <Text semiBold>Semi-bold (600)</Text>
            <Text bold>Bold (700)</Text>
            <Text weight="800">Extra bold (800)</Text>
          </Stack>
        </ExampleWrapper>

        <Divider />

        {/* ====================================================================
            FONT FAMILIES
            ==================================================================== */}
        <ExampleWrapper
          title="Font Families"
          description="Text component supports theme.fontFamily, theme.fontFamilyMonospace, and custom families."
        >
          <Stack spacing={12}>
            <Text>Default system font</Text>
            <Text monospace>Monospace font (code)</Text>
            <Text>theme.fontFamily: {theme.fontFamily}</Text>
            <Text monospace>theme.fontFamilyMonospace: {theme.fontFamilyMonospace}</Text>
          </Stack>
        </ExampleWrapper>

        <Divider />

        {/* ====================================================================
            TEXT STYLING
            ==================================================================== */}
        <ExampleWrapper
          title="Text Styling"
          description="Text component supports various styling props like italic, underline, strikethrough, and transform."
        >
          <Stack spacing={12}>
            <Text italic>Italic text</Text>
            <Text underline>Underlined text</Text>
            <Text strikethrough>Strikethrough text</Text>
            <Text transform="uppercase">Uppercase text</Text>
            <Text transform="capitalize">capitalized text</Text>
            <Text italic underline>Combined: italic + underline</Text>
          </Stack>
        </ExampleWrapper>

        <Divider />

        {/* ====================================================================
            TEXT ALIGNMENT
            ==================================================================== */}
        <ExampleWrapper
          title="Text Alignment"
          description="Text component supports align prop for text alignment."
        >
          <Stack spacing={12}>
            <Text align="left">Left aligned text (default)</Text>
            <Text align="center">Center aligned text</Text>
            <Text align="right">Right aligned text</Text>
            <Text align="justify">
              Justified text. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </Text>
          </Stack>
        </ExampleWrapper>

        <Divider />

        {/* ====================================================================
            INHERIT PROP
            ==================================================================== */}
        <ExampleWrapper
          title="Inherit Prop"
          description="Text component supports inherit prop to inherit all typography from parent."
        >
          <Text style={{ fontSize: 20, fontWeight: '700', color: 'purple' }}>
            <Text inherit>This text inherits all styles from parent</Text>
          </Text>
        </ExampleWrapper>

        <Divider />

        {/* ====================================================================
            THEME FUNCTIONS
            ==================================================================== */}
        <ExampleWrapper
          title="Theme Typography Functions"
          description="Access typography values programmatically via theme.fn helpers."
        >
          <Stack spacing={12}>
            <Text>
              <Text weight="600">theme.fn.fontSize('md'):</Text>{' '}
              {theme.fn.fontSize('md')}px
            </Text>
            <Text>
              <Text weight="600">theme.fn.lineHeight('md'):</Text>{' '}
              {theme.fn.lineHeight('md')} (unitless)
            </Text>
            <Text>
              <Text weight="600">theme.fn.fontStyles():</Text>{' '}
              fontFamily: {theme.fn.fontStyles().fontFamily}
            </Text>
            <Text>
              <Text weight="600">theme.fn.headingStyles(1):</Text>{' '}
              fontSize: {theme.fn.headingStyles(1).fontSize}px
            </Text>
          </Stack>
        </ExampleWrapper>

        <Divider />

        {/* ====================================================================
            THEME CUSTOMIZATION CODE EXAMPLE
            ==================================================================== */}
        <ExampleWrapper
          title="Theme Customization"
          description="Example of how to customize typography in your theme."
        >
          <Code>
{`import { createTheme } from 'react-native-mantine';

const customTheme = createTheme({
  fontFamily: 'YourCustomFont',
  fontSizes: {
    xs: 10,
    sm: 12,
    md: 14,
    lg: 16,
    xl: 20,
  },
  lineHeights: {
    xs: 1.3,
    sm: 1.4,
    md: 1.5,
    lg: 1.6,
    xl: 1.7,
  },
  headings: {
    fontFamily: 'YourHeadingFont',
    fontWeight: '700',
    sizes: {
      h1: { fontSize: 40, lineHeight: 1.2 },
      h2: { fontSize: 32, lineHeight: 1.3 },
      h3: { fontSize: 24, lineHeight: 1.4 },
      h4: { fontSize: 20, lineHeight: 1.5 },
      h5: { fontSize: 18, lineHeight: 1.5 },
      h6: { fontSize: 16, lineHeight: 1.5 },
    },
  },
});`}
          </Code>
        </ExampleWrapper>

        {/* ====================================================================
            REFERENCE TABLE
            ==================================================================== */}
        <ExampleWrapper
          title="Typography Scale Reference"
          description="Current theme values for quick reference."
        >
          <Stack spacing={16}>
            <View>
              <Text weight="600" size="sm">Font Sizes:</Text>
              <Text size="xs">xs: {theme.fontSizes.xs}px</Text>
              <Text size="xs">sm: {theme.fontSizes.sm}px</Text>
              <Text size="xs">md: {theme.fontSizes.md}px</Text>
              <Text size="xs">lg: {theme.fontSizes.lg}px</Text>
              <Text size="xs">xl: {theme.fontSizes.xl}px</Text>
            </View>
            <View>
              <Text weight="600" size="sm">Line Heights:</Text>
              <Text size="xs">xs: {theme.lineHeights.xs}</Text>
              <Text size="xs">sm: {theme.lineHeights.sm}</Text>
              <Text size="xs">md: {theme.lineHeights.md}</Text>
              <Text size="xs">lg: {theme.lineHeights.lg}</Text>
              <Text size="xs">xl: {theme.lineHeights.xl}</Text>
            </View>
          </Stack>
        </ExampleWrapper>
      </Stack>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});
