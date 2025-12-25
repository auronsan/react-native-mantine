import { ExampleWrapper, ExampleSection } from '../../components/ExampleWrapper';
import { NumberInput , Paper } from 'react-native-mantine';

export const NumberInputExample = () => {
  return (
    <ExampleWrapper
      title="NumberInput"
      description="Numeric input with increment controls"
    >
      <ExampleSection
        title="Basic Usage"
        description="NumberInput component"
      >
        <Paper p="md" radius="md">
          <NumberInput
            label="Quantity"
            defaultValue={1}
            min={0}
            max={100}
          />
        </Paper>
      </ExampleSection>
    </ExampleWrapper>
  );
};
