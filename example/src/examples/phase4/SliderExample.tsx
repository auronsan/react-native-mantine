import { ExampleWrapper, ExampleSection } from '../../components/ExampleWrapper';
import { Slider , Paper } from 'react-native-mantine';

export const SliderExample = () => {
  return (
    <ExampleWrapper
      title="Slider"
      description="Range slider with marks and labels"
    >
      <ExampleSection
        title="Basic Usage"
        description="Slider component"
      >
        <Paper p="md" radius="md">
          <Slider defaultValue={50} />
        </Paper>
      </ExampleSection>
    </ExampleWrapper>
  );
};
