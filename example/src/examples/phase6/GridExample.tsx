import {
  ExampleWrapper,
  ExampleSection,
} from '../../components/ExampleWrapper';
import { Grid, Paper, Text } from 'react-native-mantine';

export const GridExample = () => {
  return (
    <ExampleWrapper title="Grid" description="Flexible CSS Grid layout">
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
    </ExampleWrapper>
  );
};
