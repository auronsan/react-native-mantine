import { View } from 'react-native';
import { ExampleWrapper, ExampleSection } from '../../components/ExampleWrapper';
import { Text, Paper } from 'react-native-mantine';

export const StackExample = () => {
  return (
    <ExampleWrapper title="Stack">
      <ExampleSection
        title="Basic Usage"
        description="Vertical layout stack"
      >
        <Paper p="md" radius="md">
          <View style={{ gap: 12 }}>
            <Text style={{ fontWeight: '600', fontSize: 16 }}>
              Stack Component
            </Text>
            <Text>
              This component is part of the React Native Mantine library.
            </Text>
            <Text style={{ fontStyle: 'italic', marginTop: 8 }}>
              Interactive examples coming soon!
            </Text>
          </View>
        </Paper>
      </ExampleSection>
    </ExampleWrapper>
  );
};
