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
} from 'react-native-mantine';

export const VariantsExample = () => {

  return (
    <ExampleWrapper
      title="Component Variants"
      description="Comprehensive guide to all 8 built-in component variants"
    >
      <ExampleSection
        title="All Variants Overview"
        description="Every variant shown with the blue color"
        variant="showcase"
      >
        <Stack spacing={12}>
          <View>
            <Text weight="600" size="sm" style={{ marginBottom: 8 }}>
              filled
            </Text>
            <Button variant="filled" color="blue">
              Filled Button
            </Button>
            <Text size="xs" color="dimmed" style={{ marginTop: 4 }}>
              Solid background with white text
            </Text>
          </View>

          <View>
            <Text weight="600" size="sm" style={{ marginBottom: 8 }}>
              light
            </Text>
            <Button variant="light" color="blue">
              Light Button
            </Button>
            <Text size="xs" color="dimmed" style={{ marginTop: 4 }}>
              Light background with colored text
            </Text>
          </View>

          <View>
            <Text weight="600" size="sm" style={{ marginBottom: 8 }}>
              outline
            </Text>
            <Button variant="outline" color="blue">
              Outline Button
            </Button>
            <Text size="xs" color="dimmed" style={{ marginTop: 4 }}>
              Transparent background with colored border
            </Text>
          </View>

          <View>
            <Text weight="600" size="sm" style={{ marginBottom: 8 }}>
              subtle
            </Text>
            <Button variant="subtle" color="blue">
              Subtle Button
            </Button>
            <Text size="xs" color="dimmed" style={{ marginTop: 4 }}>
              Transparent background with colored text
            </Text>
          </View>

          <View>
            <Text weight="600" size="sm" style={{ marginBottom: 8 }}>
              white
            </Text>
            <Button variant="white" color="blue">
              White Button
            </Button>
            <Text size="xs" color="dimmed" style={{ marginTop: 4 }}>
              White background with colored text
            </Text>
          </View>

          <View>
            <Text weight="600" size="sm" style={{ marginBottom: 8 }}>
              default
            </Text>
            <Button variant="default" color="blue">
              Default Button
            </Button>
            <Text size="xs" color="dimmed" style={{ marginTop: 4 }}>
              Gray background (adapts to color scheme)
            </Text>
          </View>

          <View>
            <Text weight="600" size="sm" style={{ marginBottom: 8 }}>
              gradient
            </Text>
            <Button
              variant="gradient"
              gradient={{ from: 'blue', to: 'cyan', deg: 45 }}
            >
              Gradient Button
            </Button>
            <Text size="xs" color="dimmed" style={{ marginTop: 4 }}>
              Transparent background for gradient overlays
            </Text>
          </View>

          <View>
            <Text weight="600" size="sm" style={{ marginBottom: 8 }}>
              transparent
            </Text>
            <Button variant="transparent" color="blue">
              Transparent Button
            </Button>
            <Text size="xs" color="dimmed" style={{ marginTop: 4 }}>
              Fully transparent
            </Text>
          </View>
        </Stack>
      </ExampleSection>

      <ExampleSection
        title="Variants with Different Colors"
        description="Filled variant across all theme colors"
        variant="showcase"
      >
        <Stack spacing={8}>
          <Title order={6} style={{ marginBottom: 4 }}>
            Blues
          </Title>
          <Group spacing={8}>
            <Badge variant="filled" color="blue">Blue</Badge>
            <Badge variant="filled" color="cyan">Cyan</Badge>
            <Badge variant="filled" color="teal">Teal</Badge>
          </Group>

          <Title order={6} style={{ marginBottom: 4, marginTop: 8 }}>
            Greens
          </Title>
          <Group spacing={8}>
            <Badge variant="filled" color="green">Green</Badge>
            <Badge variant="filled" color="lime">Lime</Badge>
          </Group>

          <Title order={6} style={{ marginBottom: 4, marginTop: 8 }}>
            Warm Colors
          </Title>
          <Group spacing={8}>
            <Badge variant="filled" color="yellow">Yellow</Badge>
            <Badge variant="filled" color="orange">Orange</Badge>
            <Badge variant="filled" color="red">Red</Badge>
          </Group>

          <Title order={6} style={{ marginBottom: 4, marginTop: 8 }}>
            Purples
          </Title>
          <Group spacing={8}>
            <Badge variant="filled" color="pink">Pink</Badge>
            <Badge variant="filled" color="grape">Grape</Badge>
            <Badge variant="filled" color="violet">Violet</Badge>
            <Badge variant="filled" color="indigo">Indigo</Badge>
          </Group>

          <Title order={6} style={{ marginBottom: 4, marginTop: 8 }}>
            Neutrals
          </Title>
          <Group spacing={8}>
            <Badge variant="filled" color="dark">Dark</Badge>
            <Badge variant="filled" color="gray">Gray</Badge>
          </Group>
        </Stack>
      </ExampleSection>

      <ExampleSection
        title="Variant Comparison Grid"
        description="See how each variant looks across different colors"
      >
        <Stack spacing={16}>
          {['blue', 'green', 'red', 'violet'].map((color) => (
            <View key={color}>
              <Title order={6} style={{ marginBottom: 8, textTransform: 'capitalize' }}>
                {color}
              </Title>
              <Stack spacing={8}>
                <Group spacing={8}>
                  <Badge variant="filled" color={color} size="lg">Filled</Badge>
                  <Badge variant="light" color={color} size="lg">Light</Badge>
                  <Badge variant="outline" color={color} size="lg">Outline</Badge>
                </Group>
                <Group spacing={8}>
                  <Badge variant="subtle" color={color} size="lg">Subtle</Badge>
                  <Badge variant="white" color={color} size="lg">White</Badge>
                  <Badge variant="default" color={color} size="lg">Default</Badge>
                </Group>
              </Stack>
            </View>
          ))}
        </Stack>
      </ExampleSection>

      <ExampleSection
        title="Using Variants in Code"
        description="How to specify variants in your components"
      >
        <CodeBlock
          code={`import { Button, Badge, ActionIcon } from 'react-native-mantine';

// Buttons
<Button variant="filled" color="blue">Filled</Button>
<Button variant="light" color="green">Light</Button>
<Button variant="outline" color="red">Outline</Button>
<Button variant="subtle" color="violet">Subtle</Button>
<Button variant="white" color="orange">White</Button>
<Button variant="default">Default</Button>
<Button variant="transparent" color="cyan">Transparent</Button>

// With gradient
<Button
  variant="gradient"
  gradient={{ from: 'blue', to: 'cyan', deg: 45 }}
>
  Gradient
</Button>

// Badges
<Badge variant="filled" color="blue">Badge</Badge>
<Badge variant="light" color="green">Badge</Badge>
<Badge variant="outline" color="red">Badge</Badge>

// ActionIcon
<ActionIcon variant="filled" color="blue">
  <Icon name="heart" />
</ActionIcon>`}
        />
      </ExampleSection>

      <ExampleSection
        title="Variant Styles from Theme"
        description="Get variant styles programmatically"
      >
        <CodeBlock
          code={`import { useMantineTheme } from 'react-native-mantine';

function MyComponent() {
  const theme = useMantineTheme();

  // Get variant styles
  const filledStyles = theme.fn.variant({
    variant: 'filled',
    color: 'blue',
  });
  // Returns: { background, color, border, hover? }

  const lightStyles = theme.fn.variant({
    variant: 'light',
    color: 'green',
  });

  const outlineStyles = theme.fn.variant({
    variant: 'outline',
    color: 'red',
  });

  return (
    <View
      style={{
        backgroundColor: filledStyles.background,
        borderColor: filledStyles.border,
        borderWidth: 1,
      }}
    >
      <Text style={{ color: filledStyles.color }}>
        Custom styled element
      </Text>
    </View>
  );
}`}
        />
      </ExampleSection>

      <ExampleSection
        title="Variant Details"
        description="Understanding each variant's purpose and usage"
      >
        <Stack spacing={12}>
          <Paper p="md" shadow="sm" radius="md" style={{ backgroundColor: '#fff' }}>
            <Text weight="600" style={{ marginBottom: 8 }}>
              filled
            </Text>
            <Badge variant="filled" color="blue" style={{ marginBottom: 8 }}>
              Example
            </Badge>
            <Text size="sm" color="dimmed">
              Solid background with white text. Best for primary actions and important UI elements.
            </Text>
          </Paper>

          <Paper p="md" shadow="sm" radius="md" style={{ backgroundColor: '#fff' }}>
            <Text weight="600" style={{ marginBottom: 8 }}>
              light
            </Text>
            <Badge variant="light" color="blue" style={{ marginBottom: 8 }}>
              Example
            </Badge>
            <Text size="sm" color="dimmed">
              Light colored background with colored text. Great for status indicators and secondary actions.
            </Text>
          </Paper>

          <Paper p="md" shadow="sm" radius="md" style={{ backgroundColor: '#fff' }}>
            <Text weight="600" style={{ marginBottom: 8 }}>
              outline
            </Text>
            <Badge variant="outline" color="blue" style={{ marginBottom: 8 }}>
              Example
            </Badge>
            <Text size="sm" color="dimmed">
              Colored border with transparent background. Perfect for secondary buttons and outlined badges.
            </Text>
          </Paper>

          <Paper p="md" shadow="sm" radius="md" style={{ backgroundColor: '#fff' }}>
            <Text weight="600" style={{ marginBottom: 8 }}>
              subtle
            </Text>
            <Badge variant="subtle" color="blue" style={{ marginBottom: 8 }}>
              Example
            </Badge>
            <Text size="sm" color="dimmed">
              Transparent background with colored text. Ideal for minimal UI and text-heavy interfaces.
            </Text>
          </Paper>

          <Paper p="md" shadow="sm" radius="md" style={{ backgroundColor: '#fff' }}>
            <Text weight="600" style={{ marginBottom: 8 }}>
              white
            </Text>
            <Badge variant="white" color="blue" style={{ marginBottom: 8 }}>
              Example
            </Badge>
            <Text size="sm" color="dimmed">
              White background with colored text. Great for elements on colored backgrounds.
            </Text>
          </Paper>

          <Paper p="md" shadow="sm" radius="md" style={{ backgroundColor: '#fff' }}>
            <Text weight="600" style={{ marginBottom: 8 }}>
              default
            </Text>
            <Badge variant="default" style={{ marginBottom: 8 }}>
              Example
            </Badge>
            <Text size="sm" color="dimmed">
              Gray background that adapts to color scheme. Best for neutral UI elements.
            </Text>
          </Paper>

          <Paper p="md" shadow="sm" radius="md" style={{ backgroundColor: '#fff' }}>
            <Text weight="600" style={{ marginBottom: 8 }}>
              gradient
            </Text>
            <Text size="sm" color="dimmed">
              Transparent background for gradient overlays. Use with gradient prop for colorful effects.
            </Text>
          </Paper>

          <Paper p="md" shadow="sm" radius="md" style={{ backgroundColor: '#fff' }}>
            <Text weight="600" style={{ marginBottom: 8 }}>
              transparent
            </Text>
            <Badge variant="transparent" color="blue" style={{ marginBottom: 8 }}>
              Example
            </Badge>
            <Text size="sm" color="dimmed">
              Fully transparent. Useful for custom styling or overlay situations.
            </Text>
          </Paper>
        </Stack>
      </ExampleSection>

      <ExampleSection
        title="Best Practices"
        description="Tips for effective variant usage"
      >
        <Stack spacing={12}>
          <Paper p="md" shadow="sm" radius="md" style={{ backgroundColor: '#fff' }}>
            <Text weight="600" style={{ marginBottom: 8 }}>
              1. Use Filled for Primary Actions
            </Text>
            <Text size="sm" color="dimmed">
              The filled variant provides the strongest visual weight, making it ideal for primary CTAs.
            </Text>
          </Paper>

          <Paper p="md" shadow="sm" radius="md" style={{ backgroundColor: '#fff' }}>
            <Text weight="600" style={{ marginBottom: 8 }}>
              2. Light for Status Indicators
            </Text>
            <Text size="sm" color="dimmed">
              The light variant is perfect for badges, status labels, and non-critical information.
            </Text>
          </Paper>

          <Paper p="md" shadow="sm" radius="md" style={{ backgroundColor: '#fff' }}>
            <Text weight="600" style={{ marginBottom: 8 }}>
              3. Outline for Secondary Actions
            </Text>
            <Text size="sm" color="dimmed">
              Use outline variant for secondary buttons to create visual hierarchy without overwhelming the UI.
            </Text>
          </Paper>

          <Paper p="md" shadow="sm" radius="md" style={{ backgroundColor: '#fff' }}>
            <Text weight="600" style={{ marginBottom: 8 }}>
              4. Maintain Consistency
            </Text>
            <Text size="sm" color="dimmed">
              Use the same variants for similar actions throughout your app for better UX.
            </Text>
          </Paper>

          <Paper p="md" shadow="sm" radius="md" style={{ backgroundColor: '#fff' }}>
            <Text weight="600" style={{ marginBottom: 8 }}>
              5. Consider Context
            </Text>
            <Text size="sm" color="dimmed">
              Choose variants based on the background they'll appear on and surrounding elements.
            </Text>
          </Paper>
        </Stack>
      </ExampleSection>
    </ExampleWrapper>
  );
};
