import { ExampleWrapper, ExampleSection, CodeBlock } from '../../components/ExampleWrapper';
import { PropsTable } from '../../components/PropsTable';
import { blockquoteProps } from '../../data/props/BlockquoteProps';
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

      <ExampleSection
        title="Usage"
        description="Minimal copy-pasteable example"
      >
        <CodeBlock
          code={`import { Blockquote } from 'react-native-mantine';

<Blockquote color="blue" cite="– Author Name">
  Life is like an npm install – you never know what you are going to get.
</Blockquote>`}
        />
      </ExampleSection>

      <ExampleSection
        title="Component Props"
        description="Complete reference of all available Blockquote props"
      >
        <PropsTable props={blockquoteProps} />
      </ExampleSection>
    </ExampleWrapper>
  );
};
