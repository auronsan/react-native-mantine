import { ExampleWrapper, ExampleSection } from '../../components/ExampleWrapper';
import { Text , Paper } from 'react-native-mantine';

export const MenuExample = () => {
  return (
    <ExampleWrapper
      title="Menu"
      description="Dropdown menu with items"
    >
      <ExampleSection
        title="Basic Usage"
        description="Menu component"
      >
        <Paper p="md" radius="md">
          <Text>Menu component with dropdown items - see interactive example</Text>
        </Paper>
      </ExampleSection>
    </ExampleWrapper>
  );
};
