import { ExampleWrapper, ExampleSection, CodeBlock } from '../../components/ExampleWrapper';
import { Stack, Text  } from 'react-native-mantine';

export const TextExample = () => {
  return (
    <ExampleWrapper
      title="Text"
      description="Typography component with theme support"
    >
      <ExampleSection
        title="Text Sizes"
        description="Available size options"
        variant="showcase"
      >
        <Stack spacing={16}>
          <Text size="xs">Extra small text (xs)</Text>
          <Text size="sm">Small text (sm)</Text>
          <Text size="md">Medium text - default (md)</Text>
          <Text size="lg">Large text (lg)</Text>
          <Text size="xl">Extra large text (xl)</Text>
        </Stack>
      </ExampleSection>

      <ExampleSection
        title="Text Styles"
        description="Font weight and emphasis"
      >
        <Stack spacing={16}>
          <Text weight="400">Normal weight text</Text>
          <Text weight="700">Bold weight text</Text>
          <Text style={{ fontStyle: 'italic' }}>Italic text</Text>
          <Text style={{ textDecorationLine: 'underline' }}>Underlined text</Text>
        </Stack>
      </ExampleSection>

      <ExampleSection
        title="Text Colors"
        description="Themed and custom colors"
      >
        <Stack spacing={16}>
          <Text color="blue">Blue text</Text>
          <Text color="red">Red text</Text>
          <Text color="green">Green text</Text>
          <Text style={{ color: '#666' }}>Gray text with custom color</Text>
        </Stack>
      </ExampleSection>

      <ExampleSection
        title="Text Alignment"
        description="Text alignment options"
      >
        <Stack spacing={16}>
          <Text align="left">Left aligned text</Text>
          <Text align="center">Center aligned text</Text>
          <Text align="right">Right aligned text</Text>
        </Stack>
      </ExampleSection>

      <ExampleSection
        title="Usage Example"
        description="Basic implementation code"
      >
        <CodeBlock
          code={`import { Text  } from 'react-native-mantine';

<Text
  size="lg"
  weight="bold"
  color="blue"
>
  Styled text
</Text>`}
        />
      </ExampleSection>
    </ExampleWrapper>
  );
};