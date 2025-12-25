import { View } from 'react-native';
import { ExampleWrapper, ExampleSection, CodeBlock } from '../../components/ExampleWrapper';
import { Flex, Text, Stack , Badge } from 'react-native-mantine';

export const FlexExample = () => {
  return (
    <ExampleWrapper
      title="Flex"
      description="Flexible box layout container"
    >
      <ExampleSection
        title="Flex Direction"
        description="Row and column layouts"
        variant="showcase"
      >
        <Stack spacing={16}>
          <View>
            <Text style={{ marginBottom: 8, color: '#666' }}>Direction: Row</Text>
            <Flex direction="row" gap="md" style={{ backgroundColor: '#f8f9fa', padding: 12, borderRadius: 8 }}>
              <Badge>Item 1</Badge>
              <Badge>Item 2</Badge>
              <Badge>Item 3</Badge>
            </Flex>
          </View>
          <View>
            <Text style={{ marginBottom: 8, color: '#666' }}>Direction: Column</Text>
            <Flex direction="column" gap="sm" style={{ backgroundColor: '#f8f9fa', padding: 12, borderRadius: 8 }}>
              <Badge>Item 1</Badge>
              <Badge>Item 2</Badge>
              <Badge>Item 3</Badge>
            </Flex>
          </View>
        </Stack>
      </ExampleSection>

      <ExampleSection
        title="Justify Content"
        description="Horizontal alignment options"
      >
        <Stack spacing={12}>
          <View>
            <Text style={{ marginBottom: 8, fontSize: 12, color: '#666' }}>Space Between</Text>
            <Flex justify="space-between" style={{ backgroundColor: '#e7f5ff', padding: 12, borderRadius: 8 }}>
              <Badge>Start</Badge>
              <Badge>End</Badge>
            </Flex>
          </View>
          <View>
            <Text style={{ marginBottom: 8, fontSize: 12, color: '#666' }}>Center</Text>
            <Flex justify="center" style={{ backgroundColor: '#d0ebff', padding: 12, borderRadius: 8 }}>
              <Badge>Centered</Badge>
            </Flex>
          </View>
        </Stack>
      </ExampleSection>

      <ExampleSection
        title="Align Items"
        description="Vertical alignment in flex container"
      >
        <Flex
          align="center"
          justify="space-between"
          style={{ backgroundColor: '#f8f9fa', padding: 16, borderRadius: 8, height: 80 }}
        >
          <Text style={{ fontSize: 24 }}>🎯</Text>
          <Text>Vertically Centered</Text>
          <Badge>Aligned</Badge>
        </Flex>
      </ExampleSection>

      <ExampleSection
        title="Usage Example"
        description="Basic implementation code"
      >
        <CodeBlock
          code={`import { Flex , Badge } from 'react-native-mantine';

<Flex
  direction="row"
  justify="space-between"
  align="center"
  gap="md"
>
  <Badge>Item 1</Badge>
  <Badge>Item 2</Badge>
</Flex>`}
        />
      </ExampleSection>
    </ExampleWrapper>
  );
};