import { ExampleWrapper, ExampleSection } from '../../components/ExampleWrapper';
import { Text , Paper } from 'react-native-mantine';

export const TransferListExample = () => {
  return (
    <ExampleWrapper
      title="TransferList"
      description="Dual-list selection transfer"
    >
      <ExampleSection
        title="Basic Usage"
        description="TransferList component"
      >
        <Paper p="md" radius="md">
          <Text>TransferList for dual-list selection - see interactive example</Text>
        </Paper>
      </ExampleSection>
    </ExampleWrapper>
  );
};
