import { View } from 'react-native';
import { ExampleWrapper, ExampleSection, CodeBlock } from '../../components/ExampleWrapper';
import { Button, Group, Text, Stack , Badge } from 'react-native-mantine';

export const GroupExample = () => {
  return (
    <ExampleWrapper
      title="Group"
      description="Horizontal component group with spacing"
    >
      <ExampleSection
        title="Spacing Options"
        description="Different spacing sizes between items"
        variant="showcase"
      >
        <Stack spacing={16}>
          <View>
            <Text style={{ marginBottom: 8, color: '#666' }}>Extra Small (xs)</Text>
            <Group spacing={4}>
              <Badge>Item 1</Badge>
              <Badge>Item 2</Badge>
              <Badge>Item 3</Badge>
            </Group>
          </View>
          <View>
            <Text style={{ marginBottom: 8, color: '#666' }}>Small (sm)</Text>
            <Group spacing={8}>
              <Badge>Item 1</Badge>
              <Badge>Item 2</Badge>
              <Badge>Item 3</Badge>
            </Group>
          </View>
          <View>
            <Text style={{ marginBottom: 8, color: '#666' }}>Medium (md)</Text>
            <Group spacing={16}>
              <Badge>Item 1</Badge>
              <Badge>Item 2</Badge>
              <Badge>Item 3</Badge>
            </Group>
          </View>
          <View>
            <Text style={{ marginBottom: 8, color: '#666' }}>Large (lg)</Text>
            <Group spacing={24}>
              <Badge>Item 1</Badge>
              <Badge>Item 2</Badge>
              <Badge>Item 3</Badge>
            </Group>
          </View>
        </Stack>
      </ExampleSection>

      <ExampleSection
        title="Horizontal Buttons"
        description="Group of interactive buttons"
      >
        <Group spacing={16}>
          <Button size="sm" variant="filled">Confirm</Button>
          <Button size="sm" variant="outline">Cancel</Button>
          <Button size="sm" variant="light">Help</Button>
        </Group>
      </ExampleSection>

      <ExampleSection
        title="Mixed Components"
        description="Group can contain different component types"
      >
        <Group spacing={16} align="center">
          <Badge color="blue">Status</Badge>
          <Text>User is online</Text>
          <Badge color="green" variant="dot">Active</Badge>
        </Group>
      </ExampleSection>

      <ExampleSection
        title="Usage Example"
        description="Basic implementation code"
      >
        <CodeBlock
          code={`import { Group, Button , Badge } from 'react-native-mantine';

<Group spacing={16}>
  <Button>First</Button>
  <Button>Second</Button>
  <Button>Third</Button>
</Group>`}
        />
      </ExampleSection>
    </ExampleWrapper>
  );
};
