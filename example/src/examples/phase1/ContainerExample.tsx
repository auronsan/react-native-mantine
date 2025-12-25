import { ExampleWrapper, ExampleSection, CodeBlock } from '../../components/ExampleWrapper';
import { Container, Text, Stack  } from 'react-native-mantine';

export const ContainerExample = () => {
  return (
    <ExampleWrapper
      title="Container"
      description="Responsive container with max-width constraints"
    >
      <ExampleSection
        title="Container Sizes"
        description="Different max-width options"
        variant="showcase"
      >
        <Stack spacing={12}>
          <Container size="xs" style={{ backgroundColor: '#e7f5ff', padding: 16, borderRadius: 8 }}>
            <Text>Extra Small Container (xs)</Text>
            <Text style={{ fontSize: 12, color: '#666' }}>Max width constrained</Text>
          </Container>
          <Container size="sm" style={{ backgroundColor: '#d0ebff', padding: 16, borderRadius: 8 }}>
            <Text>Small Container (sm)</Text>
          </Container>
          <Container size="md" style={{ backgroundColor: '#a5d8ff', padding: 16, borderRadius: 8 }}>
            <Text>Medium Container (md)</Text>
          </Container>
          <Container size="lg" style={{ backgroundColor: '#74c0fc', padding: 16, borderRadius: 8 }}>
            <Text>Large Container (lg)</Text>
          </Container>
        </Stack>
      </ExampleSection>

      <ExampleSection
        title="Content Container"
        description="Container for text content"
      >
        <Container size="sm" style={{ backgroundColor: '#f8f9fa', padding: 20, borderRadius: 8 }}>
          <Text style={{ fontWeight: 'bold', marginBottom: 12 }}>Article Title</Text>
          <Text style={{ lineHeight: 24, color: '#666' }}>
            Containers help create consistent layouts by constraining content width.
            They are especially useful for text-heavy content to maintain optimal readability.
          </Text>
        </Container>
      </ExampleSection>

      <ExampleSection
        title="Usage Example"
        description="Basic implementation code"
      >
        <CodeBlock
          code={`import { Container, Text  } from 'react-native-mantine';

<Container size="md">
  <Text>Content with max width</Text>
</Container>`}
        />
      </ExampleSection>
    </ExampleWrapper>
  );
};