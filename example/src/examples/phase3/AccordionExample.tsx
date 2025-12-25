import { ExampleWrapper, ExampleSection } from '../../components/ExampleWrapper';
import { Text , Paper } from 'react-native-mantine';

export const AccordionExample = () => {
  return (
    <ExampleWrapper
      title="Accordion"
      description="Expandable accordion panels"
    >
      <ExampleSection
        title="Basic Usage"
        description="Accordion component"
      >
        <Paper p="md" radius="md">
          <Text>Accordion component for expandable sections - see interactive example</Text>
        </Paper>
      </ExampleSection>
    </ExampleWrapper>
  );
};
