import { ExampleWrapper, ExampleSection } from '../../components/ExampleWrapper';
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
    </ExampleWrapper>
  );
};
