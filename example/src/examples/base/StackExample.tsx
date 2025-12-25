import { View } from 'react-native';
import { ExampleWrapper, ExampleSection, CodeBlock } from '../../components/ExampleWrapper';
import { Stack, Text, Button , Badge } from 'react-native-mantine';

export const StackExample = () => {
  return (
    <ExampleWrapper
      title="Stack"
      description="Vertical layout with spacing control"
    >
      <ExampleSection
        title="Spacing Options"
        description="Different spacing sizes between items"
        variant="showcase"
      >
        <View>
          <Text style={{ marginBottom: 8, color: '#666' }}>Extra Small (xs)</Text>
          <Stack spacing={4}>
            <Badge>Item 1</Badge>
            <Badge>Item 2</Badge>
            <Badge>Item 3</Badge>
          </Stack>
        </View>
        <View style={{ marginTop: 16 }}>
          <Text style={{ marginBottom: 8, color: '#666' }}>Medium (md)</Text>
          <Stack spacing={16}>
            <Badge>Item 1</Badge>
            <Badge>Item 2</Badge>
            <Badge>Item 3</Badge>
          </Stack>
        </View>
        <View style={{ marginTop: 16 }}>
          <Text style={{ marginBottom: 8, color: '#666' }}>Large (lg)</Text>
          <Stack spacing={24}>
            <Badge>Item 1</Badge>
            <Badge>Item 2</Badge>
            <Badge>Item 3</Badge>
          </Stack>
        </View>
      </ExampleSection>

      <ExampleSection
        title="Vertical Buttons"
        description="Stack of interactive buttons"
      >
        <Stack spacing={16}>
          <Button variant="filled">Primary Action</Button>
          <Button variant="outline">Secondary Action</Button>
          <Button variant="light">Tertiary Action</Button>
        </Stack>
      </ExampleSection>

      <ExampleSection
        title="Mixed Components"
        description="Stack can contain different component types"
      >
        <Stack spacing={8}>
          <Text style={{ fontWeight: 'bold' }}>User Information</Text>
          <Text>Name: John Doe</Text>
          <Text>Email: john@example.com</Text>
          <Badge color="green">Active</Badge>
        </Stack>
      </ExampleSection>

      <ExampleSection
        title="Usage Example"
        description="Basic implementation code"
      >
        <CodeBlock
          code={`import { Stack, Button , Badge } from 'react-native-mantine';

<Stack spacing={16}>
  <Button>First</Button>
  <Button>Second</Button>
  <Button>Third</Button>
</Stack>`}
        />
      </ExampleSection>
    </ExampleWrapper>
  );
};