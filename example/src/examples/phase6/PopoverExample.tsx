import { ExampleWrapper, ExampleSection } from '../../components/ExampleWrapper';
import { Text , Paper } from 'react-native-mantine';

export const PopoverExample = () => {
  return (
    <ExampleWrapper
      title="Popover"
      description="Rich content popover"
    >
      <ExampleSection
        title="Basic Usage"
        description="Popover component"
      >
        <Paper p="md" radius="md">
          <Text>Popover component for rich content - see interactive example</Text>
        </Paper>
      </ExampleSection>
    </ExampleWrapper>
  );
};
