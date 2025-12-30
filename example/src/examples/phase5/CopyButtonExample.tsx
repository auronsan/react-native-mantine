import { ExampleWrapper, ExampleSection, CodeBlock } from '../../components/ExampleWrapper';
import { PropsTable } from '../../components/PropsTable';
import { copyButtonProps } from '../../data/props/CopyButtonProps';
import { Button, CopyButton , Paper } from 'react-native-mantine';

export const CopyButtonExample = () => {
  return (
    <ExampleWrapper
      title="CopyButton"
      description="Copy text to clipboard"
    >
      <ExampleSection
        title="Basic Usage"
        description="CopyButton component"
      >
        <Paper p="md" radius="md">
          <CopyButton value="Text to copy">
            {({ copied, copy }) => (
              <Button onPress={copy}>{copied ? 'Copied!' : 'Copy'}</Button>
            )}
          </CopyButton>
        </Paper>
      </ExampleSection>

      <ExampleSection
        title="Component Props"
        description="Complete reference of all available CopyButton props"
      >
        <PropsTable props={copyButtonProps} />
      </ExampleSection>

      <ExampleSection
        title="Usage Example"
        description="Basic implementation code"
      >
        <CodeBlock
          code={`import { CopyButton, Button } from 'react-native-mantine';

<CopyButton value="Text to copy" timeout={2000}>
  {({ copied, copy }) => (
    <Button
      onPress={copy}
      color={copied ? 'green' : 'blue'}
    >
      {copied ? 'Copied!' : 'Copy'}
    </Button>
  )}
</CopyButton>`}
        />
      </ExampleSection>
    </ExampleWrapper>
  );
};
