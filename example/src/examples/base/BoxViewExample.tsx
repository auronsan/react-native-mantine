import { ExampleWrapper, ExampleSection, CodeBlock } from '../../components/ExampleWrapper';
import { BoxView, Text, Stack  } from 'react-native-mantine';

export const BoxViewExample = () => {
  return (
    <ExampleWrapper
      title="BoxView"
      description="Flexible view container with styling props"
    >
      <ExampleSection
        title="Spacing Props"
        description="Padding and margin options"
        variant="showcase"
      >
        <Stack spacing={12}>
          <BoxView p="xs" style={{ backgroundColor: '#e7f5ff', borderRadius: 8 }}>
            <Text>Extra small padding (xs)</Text>
          </BoxView>
          <BoxView p="sm" style={{ backgroundColor: '#d0ebff', borderRadius: 8 }}>
            <Text>Small padding (sm)</Text>
          </BoxView>
          <BoxView p="md" style={{ backgroundColor: '#a5d8ff', borderRadius: 8 }}>
            <Text>Medium padding (md)</Text>
          </BoxView>
          <BoxView p="lg" style={{ backgroundColor: '#74c0fc', borderRadius: 8 }}>
            <Text>Large padding (lg)</Text>
          </BoxView>
          <BoxView p="xl" style={{ backgroundColor: '#4dabf7', borderRadius: 8 }}>
            <Text>Extra large padding (xl)</Text>
          </BoxView>
        </Stack>
      </ExampleSection>

      <ExampleSection
        title="Custom Styling"
        description="BoxView with custom styles"
      >
        <Stack spacing={12}>
          <BoxView
            p="md"
            style={{
              backgroundColor: '#fff3bf',
              borderRadius: 12,
              borderWidth: 2,
              borderColor: '#fab005',
            }}
          >
            <Text style={{ fontWeight: 'bold', color: '#f59f00' }}>
              Custom styled box with borders
            </Text>
          </BoxView>
          <BoxView
            p="lg"
            style={{
              backgroundColor: '#d3f9d8',
              borderRadius: 8,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 4,
              elevation: 3,
            }}
          >
            <Text style={{ color: '#2b8a3e' }}>Box with shadow elevation</Text>
          </BoxView>
        </Stack>
      </ExampleSection>

      <ExampleSection
        title="Nested Boxes"
        description="BoxView containers nested for complex layouts"
      >
        <BoxView p="md" style={{ backgroundColor: '#f8f9fa', borderRadius: 8 }}>
          <Text style={{ marginBottom: 8, fontWeight: 'bold' }}>Parent Container</Text>
          <BoxView p="sm" style={{ backgroundColor: '#e9ecef', borderRadius: 6, marginBottom: 8 }}>
            <Text>Child Box 1</Text>
          </BoxView>
          <BoxView p="sm" style={{ backgroundColor: '#dee2e6', borderRadius: 6 }}>
            <Text>Child Box 2</Text>
          </BoxView>
        </BoxView>
      </ExampleSection>

      <ExampleSection
        title="Usage Example"
        description="Basic implementation code"
      >
        <CodeBlock
          code={`import { BoxView, Text  } from 'react-native-mantine';

<BoxView
  p="md"
  style={{
    backgroundColor: '#e7f5ff',
    borderRadius: 8
  }}
>
  <Text>Flexible container</Text>
</BoxView>`}
        />
      </ExampleSection>
    </ExampleWrapper>
  );
};
