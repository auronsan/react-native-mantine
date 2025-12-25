import { ExampleWrapper, ExampleSection } from '../../components/ExampleWrapper';
import { Text , Paper } from 'react-native-mantine';

export const PaginationExample = () => {
  return (
    <ExampleWrapper
      title="Pagination"
      description="Page navigation with controls"
    >
      <ExampleSection
        title="Basic Usage"
        description="Pagination component"
      >
        <Paper p="md" radius="md">
          <Text>Pagination component - see interactive example</Text>
        </Paper>
      </ExampleSection>
    </ExampleWrapper>
  );
};
