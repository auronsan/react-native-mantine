import { View } from 'react-native';
import { ExampleWrapper, ExampleSection } from '../../components/ExampleWrapper';
import { Overlay, Text , Paper } from 'react-native-mantine';

export const OverlayExample = () => {
  return (
    <ExampleWrapper
      title="Overlay"
      description="Customizable overlay backdrop"
    >
      <ExampleSection
        title="Basic Usage"
        description="Overlay component"
      >
        <Paper p="md" radius="md">
          <View style={{ height: 100, backgroundColor: '#f1f3f5', borderRadius: 8, position: 'relative' }}>
            <Overlay opacity={0.3} />
            <Text style={{ position: 'relative', zIndex: 1, padding: 16 }}>
              Content with overlay
            </Text>
          </View>
        </Paper>
      </ExampleSection>
    </ExampleWrapper>
  );
};
