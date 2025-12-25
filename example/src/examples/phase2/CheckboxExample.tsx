import { ExampleWrapper, ExampleSection } from '../../components/ExampleWrapper';
import { Checkbox, Stack , Paper } from 'react-native-mantine';

export const CheckboxExample = () => {
  return (
    <ExampleWrapper
      title="Checkbox"
      description="Checkbox with indeterminate state"
    >
      <ExampleSection
        title="Basic Usage"
        description="Checkbox component"
      >
        <Paper p="md" radius="md">
          <Stack spacing={16}>
            <Checkbox label="Accept terms and conditions" />
            <Checkbox label="Subscribe to newsletter" />
          </Stack>
        </Paper>
      </ExampleSection>
    </ExampleWrapper>
  );
};
