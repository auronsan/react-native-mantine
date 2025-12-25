import { View } from 'react-native';
import { ExampleWrapper, ExampleSection, CodeBlock } from '../../components/ExampleWrapper';
import { Loader, Group, Text, Stack, Center  } from 'react-native-mantine';

export const LoaderExample = () => {
  return (
    <ExampleWrapper
      title="Loader"
      description="Animated loading spinner"
    >
      <ExampleSection
        title="Loader Sizes"
        description="Available size options"
        variant="showcase"
      >
        <Group spacing={32} align="center">
          <View style={{ alignItems: 'center' }}>
            <Loader size="xs" />
            <Text style={{ marginTop: 8, fontSize: 12, color: '#666' }}>XS</Text>
          </View>
          <View style={{ alignItems: 'center' }}>
            <Loader size="sm" />
            <Text style={{ marginTop: 8, fontSize: 12, color: '#666' }}>SM</Text>
          </View>
          <View style={{ alignItems: 'center' }}>
            <Loader size="md" />
            <Text style={{ marginTop: 8, fontSize: 12, color: '#666' }}>MD</Text>
          </View>
          <View style={{ alignItems: 'center' }}>
            <Loader size="lg" />
            <Text style={{ marginTop: 8, fontSize: 12, color: '#666' }}>LG</Text>
          </View>
          <View style={{ alignItems: 'center' }}>
            <Loader size="xl" />
            <Text style={{ marginTop: 8, fontSize: 12, color: '#666' }}>XL</Text>
          </View>
        </Group>
      </ExampleSection>

      <ExampleSection
        title="Loader Colors"
        description="Theme colors for loaders"
      >
        <Group spacing={24} align="center">
          <Loader color="blue" />
          <Loader color="green" />
          <Loader color="red" />
          <Loader color="orange" />
          <Loader color="grape" />
        </Group>
      </ExampleSection>

      <ExampleSection
        title="Loading States"
        description="Common loading scenarios"
      >
        <Stack spacing={16}>
          <View style={{ backgroundColor: '#f8f9fa', padding: 20, borderRadius: 8 }}>
            <Center style={{ height: 60 }}>
              <Loader size="md" />
              <Text style={{ marginTop: 12, color: '#666' }}>Loading content...</Text>
            </Center>
          </View>
          <View style={{ backgroundColor: '#f8f9fa', padding: 20, borderRadius: 8 }}>
            <Group spacing={16} align="center">
              <Loader size="sm" color="blue" />
              <Text>Processing your request</Text>
            </Group>
          </View>
        </Stack>
      </ExampleSection>

      <ExampleSection
        title="Usage Example"
        description="Basic implementation code"
      >
        <CodeBlock
          code={`import { Loader  } from 'react-native-mantine';

<Loader
  size="md"
  color="blue"
/>`}
        />
      </ExampleSection>
    </ExampleWrapper>
  );
};