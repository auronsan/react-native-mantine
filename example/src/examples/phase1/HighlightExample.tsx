import { View } from 'react-native';
import { ExampleWrapper, ExampleSection, CodeBlock } from '../../components/ExampleWrapper';
import { Highlight, Text, Stack  } from 'react-native-mantine';

export const HighlightExample = () => {
  return (
    <ExampleWrapper
      title="Highlight"
      description="Highlight specific parts of text"
    >
      <ExampleSection
        title="Basic Highlighting"
        description="Highlight words or phrases in text"
        variant="showcase"
      >
        <Stack spacing={12}>
          <Highlight highlight="React">
            Build user interfaces with React Native
          </Highlight>
          <Highlight highlight="Mantine">
            Mantine provides beautiful components
          </Highlight>
          <Highlight highlight={["fast", "reliable"]}>
            Our components are fast and reliable
          </Highlight>
        </Stack>
      </ExampleSection>

      <ExampleSection
        title="Custom Highlight Color"
        description="Different highlight colors"
      >
        <Stack spacing={12}>
          <Highlight highlight="blue" highlightColor="#e7f5ff">
            This text highlights the word blue
          </Highlight>
          <Highlight highlight="green" highlightColor="#d3f9d8">
            This text highlights the word green
          </Highlight>
          <Highlight highlight="yellow" highlightColor="#fff3bf">
            This text highlights the word yellow
          </Highlight>
        </Stack>
      </ExampleSection>

      <ExampleSection
        title="Search Results"
        description="Common use case for highlighting"
        variant="showcase"
      >
        <View style={{ backgroundColor: '#f8f9fa', padding: 16, borderRadius: 8 }}>
          <Text style={{ fontWeight: 'bold', marginBottom: 8 }}>Search: "component"</Text>
          <Highlight highlight="component" highlightColor="#fff3bf">
            The Button component provides an interactive element for user actions.
            Each component in Mantine is fully customizable and follows best practices.
          </Highlight>
        </View>
      </ExampleSection>

      <ExampleSection
        title="Usage Example"
        description="Basic implementation code"
      >
        <CodeBlock
          code={`import { Highlight  } from 'react-native-mantine';

<Highlight
  highlight="React"
  highlightColor="#e7f5ff"
>
  Build apps with React Native
</Highlight>`}
        />
      </ExampleSection>
    </ExampleWrapper>
  );
};