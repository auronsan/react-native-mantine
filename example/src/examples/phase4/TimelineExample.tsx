import { ExampleWrapper, ExampleSection } from '../../components/ExampleWrapper';
import { Timeline , Paper } from 'react-native-mantine';

export const TimelineExample = () => {
  return (
    <ExampleWrapper
      title="Timeline"
      description="Vertical timeline with items"
    >
      <ExampleSection
        title="Basic Usage"
        description="Timeline component"
      >
        <Paper p="md" radius="md">
          <Timeline active={1}>
            <Timeline.Item title="First step">Step details</Timeline.Item>
            <Timeline.Item title="Second step">Step details</Timeline.Item>
            <Timeline.Item title="Third step">Step details</Timeline.Item>
          </Timeline>
        </Paper>
      </ExampleSection>
    </ExampleWrapper>
  );
};
