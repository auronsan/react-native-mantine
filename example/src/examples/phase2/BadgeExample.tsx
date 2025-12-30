import { View } from 'react-native';
import { ExampleWrapper, ExampleSection, CodeBlock } from '../../components/ExampleWrapper';
import { PropsTable } from '../../components/PropsTable';
import { badgeProps } from '../../data/props/BadgeProps';
import { Group, Stack, Text , Badge } from 'react-native-mantine';

export const BadgeExample = () => {
  return (
    <ExampleWrapper
      title="Badge"
      description="Status badge with color variants for displaying labels and counts"
    >
      <ExampleSection
        title="Badge Variants"
        description="Different visual styles"
        variant="showcase"
      >
        <Group spacing={8} style={{ flexWrap: 'wrap' }}>
          <Badge variant="filled">Filled</Badge>
          <Badge variant="light">Light</Badge>
          <Badge variant="outline">Outline</Badge>
          <Badge variant="dot">Dot</Badge>
        </Group>
      </ExampleSection>

      <ExampleSection
        title="Badge Colors"
        description="Theme colors for different statuses"
      >
        <Group spacing={8} style={{ flexWrap: 'wrap' }}>
          <Badge color="blue">Blue</Badge>
          <Badge color="green">Success</Badge>
          <Badge color="red">Error</Badge>
          <Badge color="orange">Warning</Badge>
          <Badge color="grape">Info</Badge>
          <Badge color="gray">Neutral</Badge>
        </Group>
      </ExampleSection>

      <ExampleSection
        title="Badge Sizes"
        description="Available size options"
      >
        <Group spacing={8} alignCenter>
          <Badge size="xs">XS</Badge>
          <Badge size="sm">SM</Badge>
          <Badge size="md">MD</Badge>
          <Badge size="lg">LG</Badge>
          <Badge size="xl">XL</Badge>
        </Group>
      </ExampleSection>

      <ExampleSection
        title="Status Indicators"
        description="Common use cases for badges"
        variant="showcase"
      >
        <Stack spacing={12}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
            <Text>Online Status:</Text>
            <Badge color="green" variant="dot">Active</Badge>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
            <Text>Notification Count:</Text>
            <Badge color="red" variant="filled">12</Badge>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
            <Text>Category Tag:</Text>
            <Badge color="blue" variant="light">Design</Badge>
          </View>
        </Stack>
      </ExampleSection>

      <ExampleSection
        title="Component Props"
        description="Complete reference of all available Badge props"
      >
        <PropsTable props={badgeProps} />
      </ExampleSection>

      <ExampleSection
        title="Usage Example"
        description="Basic implementation code"
      >
        <CodeBlock
          code={`import { Badge } from 'react-native-mantine';

<Badge
  variant="filled"
  color="blue"
  size="md"
>
  New
</Badge>`}
        />
      </ExampleSection>
    </ExampleWrapper>
  );
};
