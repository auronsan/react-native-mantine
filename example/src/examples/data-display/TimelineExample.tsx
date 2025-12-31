import { ExampleWrapper, ExampleSection, CodeBlock } from '../../components/ExampleWrapper';
import { PropsTable } from '../../components/PropsTable';
import { timelineProps, timelineItemProps } from '../../data/props/TimelineProps';
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

      <ExampleSection
        title="Component Props"
        description="Complete reference of all available Timeline props"
      >
        <PropsTable props={timelineProps} />
      </ExampleSection>

      <ExampleSection
        title="Timeline.Item Props"
        description="Props for individual timeline items"
      >
        <PropsTable props={timelineItemProps} />
      </ExampleSection>

      <ExampleSection
        title="Usage Example"
        description="Basic implementation code"
      >
        <CodeBlock
          code={`import { Timeline } from 'react-native-mantine';

<Timeline active={1} color="blue" bulletSize={20}>
  <Timeline.Item title="First step">
    Step details and description
  </Timeline.Item>
  <Timeline.Item title="Second step">
    Step details and description
  </Timeline.Item>
  <Timeline.Item title="Third step" lineVariant="dashed">
    Step details and description
  </Timeline.Item>
</Timeline>`}
        />
      </ExampleSection>
    </ExampleWrapper>
  );
};
