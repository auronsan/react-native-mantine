import { ExampleWrapper, ExampleSection } from '../../components/ExampleWrapper';
import { MultiSelect , Paper } from 'react-native-mantine';

export const MultiSelectExample = () => {
  return (
    <ExampleWrapper
      title="MultiSelect"
      description="Multi-option select with tags"
    >
      <ExampleSection
        title="Basic Usage"
        description="MultiSelect component"
      >
        <Paper p="md" radius="md">
          <MultiSelect
            label="Choose frameworks"
            data={['React', 'Angular', 'Vue', 'Svelte']}
            placeholder="Pick multiple"
          />
        </Paper>
      </ExampleSection>
    </ExampleWrapper>
  );
};
