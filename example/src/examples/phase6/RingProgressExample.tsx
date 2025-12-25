import { ExampleWrapper, ExampleSection } from '../../components/ExampleWrapper';
import { RingProgress , Paper } from 'react-native-mantine';

export const RingProgressExample = () => {
  return (
    <ExampleWrapper
      title="RingProgress"
      description="Circular progress indicator"
    >
      <ExampleSection
        title="Basic Usage"
        description="RingProgress component"
      >
        <Paper p="md" radius="md">
          <RingProgress
            sections={[
              { value: 40, color: 'blue' },
              { value: 30, color: 'orange' },
              { value: 15, color: 'green' },
            ]}
          />
        </Paper>
      </ExampleSection>
    </ExampleWrapper>
  );
};
