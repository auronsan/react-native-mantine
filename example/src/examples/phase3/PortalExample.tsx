import { ExampleWrapper, ExampleSection } from '../../components/ExampleWrapper';
import { Text , Paper } from 'react-native-mantine';

export const PortalExample = () => {
  return (
    <ExampleWrapper
      title="Portal"
      description="Render components outside DOM hierarchy"
    >
      <ExampleSection
        title="Basic Usage"
        description="Portal component"
      >
        <Paper p="md" radius="md">
          <Text>Portal enables rendering components outside the normal DOM hierarchy</Text>
        </Paper>
      </ExampleSection>
    </ExampleWrapper>
  );
};
