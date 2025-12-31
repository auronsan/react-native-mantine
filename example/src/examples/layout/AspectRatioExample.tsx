import { ExampleWrapper, ExampleSection } from '../../components/ExampleWrapper';
import { AspectRatio, Text , Paper } from 'react-native-mantine';

export const AspectRatioExample = () => {
  return (
    <ExampleWrapper
      title="AspectRatio"
      description="Maintain fixed aspect ratio"
    >
      <ExampleSection
        title="Basic Usage"
        description="AspectRatio component"
      >
        <Paper p="md" radius="md">
          <AspectRatio ratio={16 / 9}>
            <Text>16:9 aspect ratio content</Text>
          </AspectRatio>
        </Paper>
      </ExampleSection>
    </ExampleWrapper>
  );
};
