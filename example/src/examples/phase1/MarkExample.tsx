import { View } from 'react-native';
import { ExampleWrapper, ExampleSection, CodeBlock } from '../../components/ExampleWrapper';
import { Mark, Text, Stack  } from 'react-native-mantine';

export const MarkExample = () => {
  return (
    <ExampleWrapper
      title="Mark"
      description="Highlighted text with background color"
    >
      <ExampleSection
        title="Basic Mark"
        description="Mark component with default styling"
        variant="showcase"
      >
        <Stack spacing={12}>
          <Text>
            This is <Mark>highlighted text</Mark> within a sentence
          </Text>
          <Text>
            Mark <Mark>important information</Mark> for emphasis
          </Text>
          <Text>
            Use Mark to <Mark>draw attention</Mark> to key points
          </Text>
        </Stack>
      </ExampleSection>

      <ExampleSection
        title="Colored Marks"
        description="Mark with different background colors"
      >
        <Stack spacing={12}>
          <Text>
            Blue mark: <Mark color="blue">highlighted</Mark>
          </Text>
          <Text>
            Green mark: <Mark color="green">success</Mark>
          </Text>
          <Text>
            Yellow mark: <Mark color="yellow">warning</Mark>
          </Text>
          <Text>
            Red mark: <Mark color="red">important</Mark>
          </Text>
        </Stack>
      </ExampleSection>

      <ExampleSection
        title="Emphasis in Content"
        description="Practical use of Mark component"
      >
        <View style={{ backgroundColor: '#f8f9fa', padding: 16, borderRadius: 8 }}>
          <Text style={{ lineHeight: 24 }}>
            Please note: <Mark color="yellow">Registration closes on Friday</Mark>.
            All participants must <Mark color="blue">bring valid ID</Mark> to the event.
            For questions, contact <Mark color="green">support@example.com</Mark>
          </Text>
        </View>
      </ExampleSection>

      <ExampleSection
        title="Usage Example"
        description="Basic implementation code"
      >
        <CodeBlock
          code={`import { Mark, Text  } from 'react-native-mantine';

<Text>
  This is <Mark>highlighted</Mark> text
</Text>`}
        />
      </ExampleSection>
    </ExampleWrapper>
  );
};