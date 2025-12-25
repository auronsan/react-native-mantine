import { ExampleWrapper, ExampleSection } from '../../components/ExampleWrapper';
import { Blockquote , Paper } from 'react-native-mantine';

export const BlockquoteExample = () => {
  return (
    <ExampleWrapper
      title="Blockquote"
      description="Styled quotation block"
    >
      <ExampleSection
        title="Basic Usage"
        description="Blockquote component"
      >
        <Paper p="md" radius="md">
          <Blockquote cite="– Author Name">
            This is an inspiring quote that demonstrates the Blockquote component
          </Blockquote>
        </Paper>
      </ExampleSection>
    </ExampleWrapper>
  );
};
