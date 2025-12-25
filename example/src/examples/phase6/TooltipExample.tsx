import { ExampleWrapper, ExampleSection } from '../../components/ExampleWrapper';
import { Text, Tooltip , Paper } from 'react-native-mantine';

export const TooltipExample = () => {
  return (
    <ExampleWrapper
      title="Tooltip"
      description="Contextual tooltip popup"
    >
      <ExampleSection
        title="Basic Usage"
        description="Tooltip component"
      >
        <Paper p="md" radius="md">
          <Tooltip label="Helpful tooltip">
            <Text>Hover over me</Text>
          </Tooltip>
        </Paper>
      </ExampleSection>
    </ExampleWrapper>
  );
};
