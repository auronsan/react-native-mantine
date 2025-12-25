import { ExampleWrapper, ExampleSection } from '../../components/ExampleWrapper';
import { Paper } from 'react-native-mantine';

export const DrawerExample = () => {
  return (
    <ExampleWrapper
      title="Drawer"
      description="Side panel with slide animation"
    >
      <ExampleSection
        title="Basic Usage"
        description="Drawer component"
      >
        <Paper p="md" radius="md">
          
        </Paper>
      </ExampleSection>
    </ExampleWrapper>
  );
};
