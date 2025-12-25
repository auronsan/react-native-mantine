import { ExampleWrapper, ExampleSection } from '../../components/ExampleWrapper';
import { Text , Paper } from 'react-native-mantine';

export const CollapseExample = () => {
  return (
    <ExampleWrapper
      title="Collapse"
      description="Smooth collapsible content"
    >
      <ExampleSection
        title="Basic Usage"
        description="Collapse component"
      >
        <Paper p="md" radius="md">
          <Text>Collapse provides smooth height transitions - see interactive example</Text>
        </Paper>
      </ExampleSection>
    </ExampleWrapper>
  );
};
