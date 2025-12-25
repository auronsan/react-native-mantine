import { ExampleWrapper, ExampleSection } from '../../components/ExampleWrapper';
import { Text , Paper } from 'react-native-mantine';

export const TableExample = () => {
  return (
    <ExampleWrapper
      title="Table"
      description="Styled data table"
    >
      <ExampleSection
        title="Basic Usage"
        description="Table component"
      >
        <Paper p="md" radius="md">
          <Text>Table component for displaying tabular data - see full example</Text>
        </Paper>
      </ExampleSection>
    </ExampleWrapper>
  );
};
