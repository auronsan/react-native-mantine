import {
  ExampleWrapper,
  ExampleSection,
  CodeBlock,
} from '../../components/ExampleWrapper';
import { PropsTable } from '../../components/PropsTable';
import { gridProps } from '../../data/props/GridProps';
import { Grid, Paper, Text } from 'react-native-mantine';

export const GridExample = () => {
  return (
    <ExampleWrapper title="Grid" description="Flexible grid layout">
      <ExampleSection title="Basic Usage" description="Grid component">
        <Paper p="md" radius="md">
          <Grid>
            <Grid.Col span={6}>
              <Paper p="md">
                <Text>Column 1</Text>
              </Paper>
            </Grid.Col>
            <Grid.Col span={6}>
              <Paper p="md">
                <Text>Column 2</Text>
              </Paper>
            </Grid.Col>
          </Grid>
        </Paper>
      </ExampleSection>

      <ExampleSection
        title="Usage"
        description="Minimal copy-pasteable example"
      >
        <CodeBlock
          code={`import { Grid, Paper, Text } from 'react-native-mantine';

<Grid gutter="md">
  <Grid.Col span={8}>
    <Paper p="md"><Text>Main</Text></Paper>
  </Grid.Col>
  <Grid.Col span={4}>
    <Paper p="md"><Text>Sidebar</Text></Paper>
  </Grid.Col>
</Grid>`}
        />
      </ExampleSection>

      <ExampleSection
        title="Component Props"
        description="Complete reference of all available Grid props"
      >
        <PropsTable props={gridProps} />
      </ExampleSection>
    </ExampleWrapper>
  );
};
