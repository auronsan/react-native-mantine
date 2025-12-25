import { ExampleWrapper, ExampleSection } from '../../components/ExampleWrapper';
import { List , Paper } from 'react-native-mantine';

export const ListExample = () => {
  return (
    <ExampleWrapper
      title="List"
      description="Ordered and unordered lists"
    >
      <ExampleSection
        title="Basic Usage"
        description="List component"
      >
        <Paper p="md" radius="md">
          <List>
            <List.Item>First item</List.Item>
            <List.Item>Second item</List.Item>
            <List.Item>Third item</List.Item>
          </List>
        </Paper>
      </ExampleSection>
    </ExampleWrapper>
  );
};
