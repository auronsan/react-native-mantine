import { useState } from 'react';
import { ExampleWrapper, ExampleSection, CodeBlock } from '../../components/ExampleWrapper';
import { PropsTable } from '../../components/PropsTable';
import { fileButtonProps } from '../../data/props/FileButtonProps';
import { Button, FileButton, Paper, Stack, Text } from 'react-native-mantine';
import type { PickedFile } from 'react-native-mantine';

export const FileButtonExample = () => {
  const [file, setFile] = useState<PickedFile | null>(null);
  const [files, setFiles] = useState<PickedFile[]>([]);
  const [pdf, setPdf] = useState<PickedFile | null>(null);

  return (
    <ExampleWrapper
      title="FileButton"
      description="Open the native document picker from any trigger element"
    >
      <ExampleSection
        title="Basic Usage"
        description="FileButton renders its children with an onPress handler and loading state"
        variant="showcase"
      >
        <Paper p="md" radius="md">
          <Stack spacing={12}>
            <FileButton onChange={setFile}>
              {({ onPress, loading }) => (
                <Button onPress={onPress} loading={loading}>
                  Upload file
                </Button>
              )}
            </FileButton>
            <Text size="sm" color="dimmed">
              Picked file: {file ? file.name : 'none'}
            </Text>
          </Stack>
        </Paper>
      </ExampleSection>

      <ExampleSection
        title="Multiple Files"
        description="With multiple, onChange receives an array of picked files"
      >
        <Paper p="md" radius="md">
          <Stack spacing={12}>
            <FileButton multiple onChange={setFiles}>
              {({ onPress, loading }) => (
                <Button onPress={onPress} loading={loading} variant="light">
                  Upload files
                </Button>
              )}
            </FileButton>
            <Text size="sm" color="dimmed">
              Picked files: {files.length > 0 ? files.map((f) => f.name).join(', ') : 'none'}
            </Text>
          </Stack>
        </Paper>
      </ExampleSection>

      <ExampleSection
        title="Accept Filter"
        description="accept restricts the pickable mime types, here PDF documents only"
      >
        <Paper p="md" radius="md">
          <Stack spacing={12}>
            <FileButton onChange={setPdf} accept="application/pdf">
              {({ onPress, loading }) => (
                <Button onPress={onPress} loading={loading} variant="outline">
                  Upload PDF
                </Button>
              )}
            </FileButton>
            <Text size="sm" color="dimmed">
              Picked PDF: {pdf ? pdf.name : 'none'}
            </Text>
          </Stack>
        </Paper>
      </ExampleSection>

      <ExampleSection
        title="Requirements"
        description="FileButton relies on an optional native module"
      >
        <Paper p="md" radius="md">
          <Text size="sm" color="dimmed">
            expo-document-picker must be installed in your app for the picker to
            open. Without it, pressing the trigger logs a warning and no file is
            selected.
          </Text>
        </Paper>
      </ExampleSection>

      <ExampleSection
        title="Component Props"
        description="Complete reference of all available FileButton props"
      >
        <PropsTable props={fileButtonProps} />
      </ExampleSection>

      <ExampleSection
        title="Usage Example"
        description="Basic implementation code"
      >
        <CodeBlock
          code={`import { Button, FileButton } from 'react-native-mantine';
import type { PickedFile } from 'react-native-mantine';

const [file, setFile] = useState<PickedFile | null>(null);

<FileButton onChange={setFile} accept="application/pdf">
  {({ onPress, loading }) => (
    <Button onPress={onPress} loading={loading}>
      Upload PDF
    </Button>
  )}
</FileButton>

// Multiple files
<FileButton multiple onChange={(files) => setFiles(files)}>
  {({ onPress }) => <Button onPress={onPress}>Upload files</Button>}
</FileButton>`}
        />
      </ExampleSection>
    </ExampleWrapper>
  );
};
