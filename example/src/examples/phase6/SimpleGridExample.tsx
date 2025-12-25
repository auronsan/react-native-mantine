import { ExampleWrapper, ExampleSection } from '../../components/ExampleWrapper';
import { SimpleGrid , Paper } from 'react-native-mantine';

export const SimpleGridExample = () => {
  return (
    <ExampleWrapper
      title="SimpleGrid"
      description="Auto-responsive grid layout"
    >
      <ExampleSection
        title="Basic Usage"
        description="SimpleGrid component"
      >
        <Paper p="md" radius="md">
          <SimpleGrid cols={2}>
            <Paper p="md">Item 1</Paper>
            <Paper p="md">Item 2</Paper>
            <Paper p="md">Item 3</Paper>
            <Paper p="md">Item 4</Paper>
          </SimpleGrid>
        </Paper>
      </ExampleSection>
    </ExampleWrapper>
  );
};
