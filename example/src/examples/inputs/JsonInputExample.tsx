import { useState } from 'react';
import { ExampleWrapper, ExampleSection, CodeBlock } from '../../components/ExampleWrapper';
import { PropsTable } from '../../components/PropsTable';
import { jsonInputProps } from '../../data/props/JsonInputProps';
import { Code, JsonInput, Paper, Stack, Text } from 'react-native-mantine';

export const JsonInputExample = () => {
  const [value, setValue] = useState('{"name": "react-native-mantine"}');

  return (
    <ExampleWrapper
      title="JsonInput"
      description="Textarea that validates its content as JSON on blur"
    >
      <ExampleSection
        title="Basic Usage"
        description="Type invalid JSON and blur the input to see the validation error"
        variant="showcase"
      >
        <Paper p="md" radius="md">
          <JsonInput
            label="Package config"
            placeholder='{"key": "value"}'
            validationError="Invalid JSON"
            minRows={4}
          />
        </Paper>
      </ExampleSection>

      <ExampleSection
        title="Format on Blur"
        description="With formatOnBlur, valid JSON is pretty-printed when the input loses focus"
      >
        <Paper p="md" radius="md">
          <JsonInput
            label="Formatted JSON"
            description="Paste minified JSON and blur to format it"
            placeholder='{"a":1,"b":[2,3]}'
            defaultValue='{"a":1,"b":[2,3]}'
            formatOnBlur
            validationError="Invalid JSON"
            minRows={4}
          />
        </Paper>
      </ExampleSection>

      <ExampleSection
        title="Controlled"
        description="Use value and onChangeText to control the input"
      >
        <Paper p="md" radius="md">
          <Stack spacing={12}>
            <JsonInput
              label="Controlled JSON"
              value={value}
              onChangeText={setValue}
              validationError="Invalid JSON"
              minRows={3}
            />
            <Text size="sm" color="dimmed">
              Current value:
            </Text>
            <Code block>{value || '(empty)'}</Code>
          </Stack>
        </Paper>
      </ExampleSection>

      <ExampleSection
        title="Read Only"
        description="Set editable={false} to prevent changes while keeping the content selectable"
      >
        <Paper p="md" radius="md">
          <JsonInput
            label="Read only"
            description="This value cannot be edited"
            defaultValue={'{\n  "locked": true\n}'}
            editable={false}
            minRows={3}
          />
        </Paper>
      </ExampleSection>

      <ExampleSection
        title="Component Props"
        description="Complete reference of all available JsonInput props"
      >
        <PropsTable props={jsonInputProps} />
      </ExampleSection>

      <ExampleSection
        title="Usage Example"
        description="Basic implementation code"
      >
        <CodeBlock
          code={`import { JsonInput } from 'react-native-mantine';

<JsonInput
  label="Package config"
  placeholder='{"key": "value"}'
  validationError="Invalid JSON"
  formatOnBlur
  minRows={4}
  value={value}
  onChangeText={setValue}
/>`}
        />
      </ExampleSection>
    </ExampleWrapper>
  );
};
