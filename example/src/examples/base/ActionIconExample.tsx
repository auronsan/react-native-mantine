import { useState } from 'react';
import { ExampleWrapper, ExampleSection, CodeBlock } from '../../components/ExampleWrapper';
import { ActionIcon, Group, Text, Stack  } from 'react-native-mantine';

export const ActionIconExample = () => {
  const [count, setCount] = useState(0);

  return (
    <ExampleWrapper
      title="ActionIcon"
      description="Compact icon button for actions"
    >
      <ExampleSection
        title="ActionIcon Sizes"
        description="Available size options"
        variant="showcase"
      >
        <Group spacing={16} align="center">
          <ActionIcon size="xs" color="blue" onPress={() => {}}>
            <Text style={{ fontSize: 12 }}>×</Text>
          </ActionIcon>
          <ActionIcon size="sm" color="blue" onPress={() => {}}>
            <Text style={{ fontSize: 16 }}>×</Text>
          </ActionIcon>
          <ActionIcon size="md" color="blue" onPress={() => {}}>
            <Text style={{ fontSize: 20 }}>×</Text>
          </ActionIcon>
          <ActionIcon size="lg" color="blue" onPress={() => {}}>
            <Text style={{ fontSize: 24 }}>×</Text>
          </ActionIcon>
          <ActionIcon size="xl" color="blue" onPress={() => {}}>
            <Text style={{ fontSize: 28 }}>×</Text>
          </ActionIcon>
        </Group>
      </ExampleSection>

      <ExampleSection
        title="ActionIcon Colors"
        description="Theme colors for action icons"
      >
        <Group spacing={16} align="center">
          <ActionIcon color="blue" onPress={() => {}}>
            <Text>★</Text>
          </ActionIcon>
          <ActionIcon color="green" onPress={() => {}}>
            <Text>✓</Text>
          </ActionIcon>
          <ActionIcon color="red" onPress={() => {}}>
            <Text>×</Text>
          </ActionIcon>
          <ActionIcon color="orange" onPress={() => {}}>
            <Text>!</Text>
          </ActionIcon>
          <ActionIcon color="grape" onPress={() => {}}>
            <Text>♥</Text>
          </ActionIcon>
        </Group>
      </ExampleSection>

      <ExampleSection
        title="Interactive ActionIcon"
        description="Action icon with state"
        variant="showcase"
      >
        <Stack spacing={12}>
          <Group spacing={16} align="center">
            <ActionIcon
              color="blue"
              size="lg"
              onPress={() => setCount(count + 1)}
            >
              <Text style={{ fontSize: 20 }}>+</Text>
            </ActionIcon>
            <Text>Count: {count}</Text>
            <ActionIcon
              color="red"
              size="lg"
              onPress={() => setCount(Math.max(0, count - 1))}
            >
              <Text style={{ fontSize: 20 }}>−</Text>
            </ActionIcon>
          </Group>
        </Stack>
      </ExampleSection>

      <ExampleSection
        title="Common Use Cases"
        description="Typical action icon patterns"
      >
        <Stack spacing={12}>
          <Group spacing={8} align="center">
            <Text>Delete item</Text>
            <ActionIcon color="red" size="sm" onPress={() => {}}>
              <Text>🗑</Text>
            </ActionIcon>
          </Group>
          <Group spacing={8} align="center">
            <Text>Edit item</Text>
            <ActionIcon color="blue" size="sm" onPress={() => {}}>
              <Text>✎</Text>
            </ActionIcon>
          </Group>
          <Group spacing={8} align="center">
            <Text>More options</Text>
            <ActionIcon color="gray" size="sm" onPress={() => {}}>
              <Text>⋯</Text>
            </ActionIcon>
          </Group>
        </Stack>
      </ExampleSection>

      <ExampleSection
        title="Usage Example"
        description="Basic implementation code"
      >
        <CodeBlock
          code={`import { ActionIcon, Text  } from 'react-native-mantine';

<ActionIcon
  color="blue"
  size="md"
  onPress={() => console.log('Clicked')}
>
  <Text>×</Text>
</ActionIcon>`}
        />
      </ExampleSection>
    </ExampleWrapper>
  );
};