import { ExampleWrapper, ExampleSection } from '../../components/ExampleWrapper';
import { Select , Paper } from 'react-native-mantine';

export const SelectExample = () => {
  return (
    <ExampleWrapper
      title="Select"
      description="Searchable select dropdown"
    >
      <ExampleSection
        title="Basic Usage"
        description="Select component"
      >
        <Paper p="md" radius="md">
          <Select
            label="Choose framework"
            data={['React', 'Angular', 'Vue', 'Svelte']}
            placeholder="Pick one"
          />
        </Paper>
      </ExampleSection>
    </ExampleWrapper>
  );
};
