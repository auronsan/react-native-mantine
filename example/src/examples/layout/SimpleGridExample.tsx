import {
  ExampleWrapper,
  ExampleSection,
} from '../../components/ExampleWrapper';
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
    </ExampleWrapper>
  );
};
