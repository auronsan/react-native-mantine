import { ExampleWrapper, ExampleSection } from '../../components/ExampleWrapper';
import { SegmentedControl , Paper } from 'react-native-mantine';

export const SegmentedControlExample = () => {
  return (
    <ExampleWrapper
      title="SegmentedControl"
      description="Segmented button group selector"
    >
      <ExampleSection
        title="Basic Usage"
        description="SegmentedControl component"
      >
        <Paper p="md" radius="md">
          <SegmentedControl
            data={['React', 'Angular', 'Vue']}
          />
        </Paper>
      </ExampleSection>
    </ExampleWrapper>
  );
};
