import {
  ExampleWrapper,
  ExampleSection,
  CodeBlock,
} from '../../components/ExampleWrapper';
import { PropsTable } from '../../components/PropsTable';
import { simpleGridProps } from '../../data/props/SimpleGridProps';
import { SimpleGrid, Paper, Text } from 'react-native-mantine';

export const SimpleGridExample = () => {
  return (
    <ExampleWrapper
      title="SimpleGrid"
      description="Auto-responsive grid layout"
    >
      <ExampleSection title="Basic Usage" description="SimpleGrid component">
        <Paper p="md" radius="md">
          <SimpleGrid cols={2}>
            <Paper p="md">
              <Text>Item 1</Text>
            </Paper>
            <Paper p="md">
              <Text>Item 2</Text>
            </Paper>
            <Paper p="md">
              <Text>Item 3</Text>
            </Paper>
            <Paper p="md">
              <Text>Item 4</Text>
            </Paper>
          </SimpleGrid>
        </Paper>
      </ExampleSection>

      <ExampleSection
        title="Usage"
        description="Minimal copy-pasteable example"
      >
        <CodeBlock
          code={`import { SimpleGrid, Paper, Text } from 'react-native-mantine';

<SimpleGrid
  cols={3}
  spacing="md"
  breakpoints={[{ maxWidth: 600, cols: 1 }]}
>
  <Paper p="md"><Text>1</Text></Paper>
  <Paper p="md"><Text>2</Text></Paper>
  <Paper p="md"><Text>3</Text></Paper>
</SimpleGrid>`}
        />
      </ExampleSection>

      <ExampleSection
        title="Component Props"
        description="Complete reference of all available SimpleGrid props"
      >
        <PropsTable props={simpleGridProps} />
      </ExampleSection>
    </ExampleWrapper>
  );
};
