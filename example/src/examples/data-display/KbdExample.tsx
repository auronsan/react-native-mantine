import { ExampleWrapper, ExampleSection, CodeBlock } from '../../components/ExampleWrapper';
import { PropsTable } from '../../components/PropsTable';
import { kbdProps } from '../../data/props/KbdProps';
import { Kbd, Text , Paper } from 'react-native-mantine';

export const KbdExample = () => {
  return (
    <ExampleWrapper
      title="Kbd"
      description="Keyboard shortcut display"
    >
      <ExampleSection
        title="Basic Usage"
        description="Kbd component"
      >
        <Paper p="md" radius="md">
          <Text>
            Press <Kbd>Ctrl</Kbd> + <Kbd>C</Kbd> to copy
          </Text>
        </Paper>
      </ExampleSection>

      <ExampleSection
        title="Usage"
        description="Minimal copy-pasteable example"
      >
        <CodeBlock
          code={`import { Kbd, Text } from 'react-native-mantine';

<Text>
  Press <Kbd>Ctrl</Kbd> + <Kbd size="sm">C</Kbd> to copy
</Text>`}
        />
      </ExampleSection>

      <ExampleSection
        title="Component Props"
        description="Complete reference of all available Kbd props"
      >
        <PropsTable props={kbdProps} />
      </ExampleSection>
    </ExampleWrapper>
  );
};
