import { View } from 'react-native';
import { ExampleWrapper, ExampleSection, CodeBlock } from '../../components/ExampleWrapper';
import { Code, Text, Stack  } from 'react-native-mantine';

export const CodeExample = () => {
  return (
    <ExampleWrapper
      title="Code"
      description="Inline code with monospace styling"
    >
      <ExampleSection
        title="Inline Code"
        description="Code component within text"
        variant="showcase"
      >
        <Stack spacing={12}>
          <Text>
            Use the <Code>import</Code> statement to include components
          </Text>
          <Text>
            Call <Code>console.log()</Code> to print debug information
          </Text>
          <Text>
            The <Code>useState</Code> hook manages component state
          </Text>
        </Stack>
      </ExampleSection>

      <ExampleSection
        title="Code Colors"
        description="Code with different color schemes"
      >
        <Stack spacing={12}>
          <Text>
            Blue theme: <Code color="blue">const value = 42;</Code>
          </Text>
          <Text>
            Red theme: <Code color="red">error.message</Code>
          </Text>
          <Text>
            Green theme: <Code color="green">success = true</Code>
          </Text>
        </Stack>
      </ExampleSection>

      <ExampleSection
        title="Technical Documentation"
        description="Common use case for code inline"
      >
        <View style={{ backgroundColor: '#f8f9fa', padding: 16, borderRadius: 8 }}>
          <Text style={{ fontWeight: 'bold', marginBottom: 12 }}>Installation</Text>
          <Text style={{ marginBottom: 8 }}>
            Install the package using <Code>npm install</Code> or <Code>yarn add</Code>
          </Text>
          <Text>
            Then import components: <Code>import {"{"} Button {"}"} from 'library'</Code>
          </Text>
        </View>
      </ExampleSection>

      <ExampleSection
        title="Usage Example"
        description="Basic implementation code"
      >
        <CodeBlock
          code={`import { Code, Text  } from 'react-native-mantine';

<Text>
  Use <Code>import</Code> statement
</Text>`}
        />
      </ExampleSection>
    </ExampleWrapper>
  );
};