import { View } from 'react-native';
import { ExampleWrapper, ExampleSection, CodeBlock } from '../../components/ExampleWrapper';
import { PropsTable } from '../../components/PropsTable';
import { highlightProps } from '../../data/props/HighlightProps';
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
          <Highlight highlight="blue" highlightColor="blue">
            This text highlights the word blue
          </Highlight>
          <Highlight highlight="green" highlightColor="green">
            This text highlights the word green
          </Highlight>
          <Highlight highlight="yellow" highlightColor="yellow">
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
          <Highlight highlight="component" highlightColor="yellow">
            The Button component provides an interactive element for user actions.
            Each component in Mantine is fully customizable and follows best practices.
          </Highlight>
        </View>
      </ExampleSection>

      <ExampleSection
        title="Component Props"
        description="Complete reference of all available Highlight props"
      >
        <PropsTable props={highlightProps} />
      </ExampleSection>

      <ExampleSection
        title="Usage Example"
        description="Basic implementation code"
      >
        <CodeBlock
          code={`import { Highlight  } from 'react-native-mantine';

// Single word
<Highlight highlight="React">
  Build apps with React Native
</Highlight>

// Multiple words
<Highlight highlight={["fast", "reliable"]}>
  Our components are fast and reliable
</Highlight>

// Custom color
<Highlight
  highlight="important"
  highlightColor="red"
>
  This is an important message
</Highlight>`}
        />
      </ExampleSection>
    </ExampleWrapper>
  );
};