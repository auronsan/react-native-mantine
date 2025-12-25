import { View } from 'react-native';
import { ExampleWrapper, ExampleSection } from '../../components/ExampleWrapper';
import { LoadingOverlay, Text , Paper } from 'react-native-mantine';

export const LoadingOverlayExample = () => {
  return (
    <ExampleWrapper
      title="LoadingOverlay"
      description="Full-screen loading state"
    >
      <ExampleSection
        title="Basic Usage"
        description="LoadingOverlay component"
      >
        <Paper p="md" radius="md">
          <View style={{ height: 100, position: 'relative' }}>
            <LoadingOverlay visible />
            <Text>Content under loading</Text>
          </View>
        </Paper>
      </ExampleSection>
    </ExampleWrapper>
  );
};
