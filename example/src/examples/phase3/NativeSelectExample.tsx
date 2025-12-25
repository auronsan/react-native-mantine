import { ExampleWrapper, ExampleSection } from '../../components/ExampleWrapper';
import { NativeSelect , Paper } from 'react-native-mantine';

export const NativeSelectExample = () => {
  return (
    <ExampleWrapper
      title="NativeSelect"
      description="Platform-native dropdown select"
    >
      <ExampleSection
        title="Basic Usage"
        description="NativeSelect component"
      >
        <Paper p="md" radius="md">
          <NativeSelect
            label="Select option"
            data={['Option 1', 'Option 2', 'Option 3']}
          />
        </Paper>
      </ExampleSection>
    </ExampleWrapper>
  );
};
