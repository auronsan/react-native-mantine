import { ExampleWrapper, ExampleSection, CodeBlock } from '../../components/ExampleWrapper';
import { PropsTable } from '../../components/PropsTable';
import { indicatorProps } from '../../data/props/IndicatorProps';
import { Indicator, Text , Paper } from 'react-native-mantine';

export const IndicatorExample = () => {
  return (
    <ExampleWrapper
      title="Indicator"
      description="Notification dot indicator"
    >
      <ExampleSection
        title="Basic Usage"
        description="Indicator component"
      >
        <Paper p="md" radius="md">
          <Indicator label="new">
            <Text style={{ padding: 16, backgroundColor: '#f1f3f5', borderRadius: 8 }}>
              Content with indicator
            </Text>
          </Indicator>
        </Paper>
      </ExampleSection>

      <ExampleSection
        title="Usage"
        description="Minimal copy-pasteable example"
      >
        <CodeBlock
          code={`import { Indicator, Text } from 'react-native-mantine';

<Indicator label="new" color="red" size="md" position="top-end" withBorder>
  <Text style={{ padding: 16 }}>Content with indicator</Text>
</Indicator>`}
        />
      </ExampleSection>

      <ExampleSection
        title="Component Props"
        description="Complete reference of all available Indicator props"
      >
        <PropsTable props={indicatorProps} />
      </ExampleSection>
    </ExampleWrapper>
  );
};
