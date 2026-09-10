import { ExampleWrapper, ExampleSection, CodeBlock } from '../../components/ExampleWrapper';
import { PropsTable } from '../../components/PropsTable';
import { anchorProps } from '../../data/props/AnchorProps';
import { Anchor , Paper } from 'react-native-mantine';

export const AnchorExample = () => {
  return (
    <ExampleWrapper
      title="Anchor"
      description="Styled link component"
    >
      <ExampleSection
        title="Basic Usage"
        description="Anchor component"
      >
        <Paper p="md" radius="md">
          <Anchor>Click here to navigate</Anchor>
        </Paper>
      </ExampleSection>

      <ExampleSection
        title="Usage"
        description="Minimal copy-pasteable example"
      >
        <CodeBlock
          code={`import { Anchor } from 'react-native-mantine';

<Anchor href="https://mantine.dev" color="blue">
  Open Mantine docs
</Anchor>

<Anchor variant="text" onPress={() => console.log('pressed')}>
  Press me
</Anchor>`}
        />
      </ExampleSection>

      <ExampleSection
        title="Component Props"
        description="Complete reference of all available Anchor props"
      >
        <PropsTable props={anchorProps} />
      </ExampleSection>
    </ExampleWrapper>
  );
};
