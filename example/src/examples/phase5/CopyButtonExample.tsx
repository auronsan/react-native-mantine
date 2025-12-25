import { ExampleWrapper, ExampleSection } from '../../components/ExampleWrapper';
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
    </ExampleWrapper>
  );
};
