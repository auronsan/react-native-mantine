import { useState } from 'react';
import { ExampleWrapper, ExampleSection, CodeBlock } from '../../components/ExampleWrapper';
import { PropsTable } from '../../components/PropsTable';
import { fileInputProps } from '../../data/props/FileInputProps';
import {
  FileInput,
  Group,
  Icon,
  Paper,
  Pill,
  Stack,
  Text,
} from 'react-native-mantine';
import type { PickedFile } from 'react-native-mantine';

export const FileInputExample = () => {
  const [file, setFile] = useState<PickedFile | null>(null);

  return (
    <ExampleWrapper
      title="FileInput"
      description="Pick files with an input that opens the native document picker"
    >
      <ExampleSection
        title="Basic Usage"
        description="Press the input to open the document picker, selected file names are displayed inside"
        variant="showcase"
      >
        <Paper p="md" radius="md">
          <Stack spacing={12}>
            <FileInput
              label="Attachment"
              placeholder="Press to pick a file"
              value={file}
              onChange={setFile}
            />
            <Text size="sm" color="dimmed">
              Selected: {file ? file.name : 'none'}
            </Text>
          </Stack>
        </Paper>
      </ExampleSection>

      <ExampleSection
        title="Clearable"
        description="clearable adds a clear button to the right section when a file is selected"
      >
        <Paper p="md" radius="md">
          <FileInput
            label="Clearable"
            placeholder="Pick a file"
            clearable
            clearButtonLabel="Clear selection"
          />
        </Paper>
      </ExampleSection>

      <ExampleSection
        title="Multiple Files"
        description="With multiple, all selected file names are displayed separated by commas"
      >
        <Paper p="md" radius="md">
          <FileInput
            multiple
            label="Documents"
            placeholder="Pick one or more files"
            accept="application/pdf"
            clearable
          />
        </Paper>
      </ExampleSection>

      <ExampleSection
        title="Label, Description and Error"
        description="FileInput supports the same wrapper props as other inputs"
      >
        <Paper p="md" radius="md">
          <Stack spacing={12}>
            <FileInput
              label="Required attachment"
              description="PDF files only"
              placeholder="Pick a file"
              accept="application/pdf"
              required
            />
            <FileInput
              label="With error"
              placeholder="Pick a file"
              error="File is required"
            />
            <FileInput label="Disabled" placeholder="You cannot open this" disabled />
          </Stack>
        </Paper>
      </ExampleSection>

      <ExampleSection
        title="Custom Value Component"
        description="valueComponent renders the selected value, here as pills"
      >
        <Paper p="md" radius="md">
          <FileInput
            multiple
            label="With pills"
            placeholder="Pick files"
            icon={<Icon name="paperclip" size={14} color="#868e96" />}
            multiline
            valueComponent={({ value }) => (
              <Group spacing={4}>
                {(Array.isArray(value) ? value : []).map((item, index) => (
                  <Pill key={`${item.name}-${index}`} size="sm">
                    {item.name}
                  </Pill>
                ))}
              </Group>
            )}
          />
        </Paper>
      </ExampleSection>

      <ExampleSection
        title="Requirements"
        description="FileInput relies on an optional native module"
      >
        <Paper p="md" radius="md">
          <Text size="sm" color="dimmed">
            expo-document-picker must be installed in your app for the picker to
            open. Without it, pressing the input logs a warning and no file is
            selected.
          </Text>
        </Paper>
      </ExampleSection>

      <ExampleSection
        title="Component Props"
        description="Complete reference of all available FileInput props"
      >
        <PropsTable props={fileInputProps} />
      </ExampleSection>

      <ExampleSection
        title="Usage Example"
        description="Basic implementation code"
      >
        <CodeBlock
          code={`import { FileInput } from 'react-native-mantine';
import type { PickedFile } from 'react-native-mantine';

const [file, setFile] = useState<PickedFile | null>(null);

<FileInput
  label="Attachment"
  placeholder="Press to pick a file"
  value={file}
  onChange={setFile}
  accept="application/pdf"
  clearable
/>

// Multiple files with custom value component
<FileInput
  multiple
  valueComponent={({ value }) => (
    <Group spacing={4}>
      {value.map((file) => (
        <Pill key={file.uri}>{file.name}</Pill>
      ))}
    </Group>
  )}
/>`}
        />
      </ExampleSection>
    </ExampleWrapper>
  );
};
