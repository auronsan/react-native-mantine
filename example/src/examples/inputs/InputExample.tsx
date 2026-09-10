import { useState } from 'react';
import { ExampleWrapper, ExampleSection, CodeBlock } from '../../components/ExampleWrapper';
import { PropsTable } from '../../components/PropsTable';
import { textInputProps } from '../../data/props/TextInputProps';
import { TextInput, Text, Stack  } from 'react-native-mantine';

export const InputExample = () => {
  const [value, setValue] = useState('');

  return (
    <ExampleWrapper
      title="TextInput"
      description="Versatile text input field"
    >
      <ExampleSection
        title="TextInput Variants"
        description="Different visual styles"
        variant="showcase"
      >
        <Stack spacing={12}>
          <TextInput placeholder="Default input" />
          <TextInput placeholder="With label" label="Your name" />
          <TextInput placeholder="Required field" label="Email" required />
        </Stack>
      </ExampleSection>

      <ExampleSection
        title="TextInput Sizes"
        description="Available size options"
      >
        <Stack spacing={10}>
          <TextInput size="xs" placeholder="Extra small" />
          <TextInput size="sm" placeholder="Small" />
          <TextInput size="md" placeholder="Medium (default)" />
          <TextInput size="lg" placeholder="Large" />
          <TextInput size="xl" placeholder="Extra large" />
        </Stack>
      </ExampleSection>

      <ExampleSection
        title="TextInput States"
        description="Different states and validation"
      >
        <Stack spacing={10}>
          <TextInput placeholder="Normal state" />
          <TextInput placeholder="Error state" error="This field is required" />
          <TextInput placeholder="With description" description="Please enter your username" />
        </Stack>
      </ExampleSection>

      <ExampleSection
        title="Controlled Input"
        description="Input with controlled value"
        variant="showcase"
      >
        <Stack spacing={10}>
          <TextInput
            placeholder="Type something..."
            value={value}
            onChangeText={setValue}
          />
          <Text style={{ color: '#666' }}>Current value: {value || '(empty)'}</Text>
        </Stack>
      </ExampleSection>

      <ExampleSection
        title="Usage Example"
        description="Basic implementation code"
      >
        <CodeBlock
          code={`import { TextInput  } from 'react-native-mantine';

<TextInput
  placeholder="Enter text..."
  label="Username"
  required
  onChangeText={(text) => console.log(text)}
/>`}
        />
      </ExampleSection>

      <ExampleSection
        title="Component Props"
        description="Complete reference of all available TextInput props"
      >
        <PropsTable props={textInputProps} />
      </ExampleSection>
    </ExampleWrapper>
  );
};
