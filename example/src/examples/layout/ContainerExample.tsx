import { ExampleWrapper, ExampleSection, CodeBlock } from '../../components/ExampleWrapper';
import { PropsTable } from '../../components/PropsTable';
import { containerProps } from '../../data/props/ContainerProps';
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
            <Text style={{ fontSize: 12, color: '#666' }}>Max width: 540px</Text>
          </Container>
          <Container size="sm" style={{ backgroundColor: '#d0ebff', padding: 16, borderRadius: 8 }}>
            <Text>Small Container (sm)</Text>
            <Text style={{ fontSize: 12, color: '#666' }}>Max width: 720px</Text>
          </Container>
          <Container size="md" style={{ backgroundColor: '#a5d8ff', padding: 16, borderRadius: 8 }}>
            <Text>Medium Container (md)</Text>
            <Text style={{ fontSize: 12, color: '#666' }}>Max width: 960px</Text>
          </Container>
          <Container size="lg" style={{ backgroundColor: '#74c0fc', padding: 16, borderRadius: 8 }}>
            <Text>Large Container (lg)</Text>
            <Text style={{ fontSize: 12, color: '#666' }}>Max width: 1140px</Text>
          </Container>
        </Stack>
      </ExampleSection>

      <ExampleSection
        title="Fluid Container"
        description="Container that takes full width"
      >
        <Container fluid style={{ backgroundColor: '#fff5f5', padding: 16, borderRadius: 8 }}>
          <Text style={{ fontWeight: 'bold' }}>Fluid Container</Text>
          <Text style={{ fontSize: 12, color: '#666' }}>Takes 100% width, no max-width constraint</Text>
        </Container>
      </ExampleSection>

      <ExampleSection
        title="Content Container"
        description="Container for text content"
      >
        <Container size="sm" px="xl" py="lg" style={{ backgroundColor: '#f8f9fa', borderRadius: 8 }}>
          <Text style={{ fontWeight: 'bold', marginBottom: 12 }}>Article Title</Text>
          <Text style={{ lineHeight: 24, color: '#666' }}>
            Containers help create consistent layouts by constraining content width.
            They are especially useful for text-heavy content to maintain optimal readability.
          </Text>
        </Container>
      </ExampleSection>

      <ExampleSection
        title="Component Props"
        description="Complete reference of all available Container props"
      >
        <PropsTable props={containerProps} />
      </ExampleSection>

      <ExampleSection
        title="Usage Example"
        description="Basic implementation code"
      >
        <CodeBlock
          code={`import { Container, Text  } from 'react-native-mantine';

// With predefined size
<Container size="md">
  <Text>Content with max width</Text>
</Container>

// Fluid container
<Container fluid>
  <Text>Full width content</Text>
</Container>

// With padding
<Container size="sm" px="xl" py="lg">
  <Text>Padded content</Text>
</Container>`}
        />
      </ExampleSection>
    </ExampleWrapper>
  );
};