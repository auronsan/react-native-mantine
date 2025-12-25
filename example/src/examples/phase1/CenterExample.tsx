import { View } from 'react-native';
import { ExampleWrapper, ExampleSection, CodeBlock } from '../../components/ExampleWrapper';
import { Center, Text, Stack, Button , Badge } from 'react-native-mantine';

export const CenterExample = () => {
  return (
    <ExampleWrapper
      title="Center"
      description="Center content both horizontally and vertically"
    >
      <ExampleSection
        title="Basic Centering"
        description="Center component with different content"
        variant="showcase"
      >
        <Stack spacing={12}>
          <Center style={{ height: 100, backgroundColor: '#f1f3f5', borderRadius: 8 }}>
            <Text>Centered text</Text>
          </Center>
          <Center style={{ height: 100, backgroundColor: '#e7f5ff', borderRadius: 8 }}>
            <Badge>Centered badge</Badge>
          </Center>
        </Stack>
      </ExampleSection>

      <ExampleSection
        title="Centered Button"
        description="Button centered in container"
      >
        <Center style={{ height: 120, backgroundColor: '#f8f9fa', borderRadius: 8 }}>
          <Button>Centered Button</Button>
        </Center>
      </ExampleSection>

      <ExampleSection
        title="Multiple Elements"
        description="Center component with stacked content"
      >
        <Center style={{ height: 150, backgroundColor: '#fff5f5', borderRadius: 8 }}>
          <View style={{ alignItems: 'center' }}>
            <Text style={{ fontSize: 32, marginBottom: 8 }}>🎯</Text>
            <Text style={{ fontWeight: 'bold' }}>Perfectly Centered</Text>
            <Text style={{ color: '#666', fontSize: 12 }}>Both horizontally and vertically</Text>
          </View>
        </Center>
      </ExampleSection>

      <ExampleSection
        title="Usage Example"
        description="Basic implementation code"
      >
        <CodeBlock
          code={`import { Center, Text , Badge } from 'react-native-mantine';

<Center style={{ height: 100 }}>
  <Text>Centered content</Text>
</Center>`}
        />
      </ExampleSection>
    </ExampleWrapper>
  );
};