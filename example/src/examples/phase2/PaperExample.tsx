import { View } from 'react-native';
import { ExampleWrapper, ExampleSection } from '../../components/ExampleWrapper';
import { Text, Paper } from 'react-native-mantine';

export const PaperExample = () => {
  return (
    <ExampleWrapper title="Paper">
      <ExampleSection
        title="Basic Usage"
        description="Paper component"
      >
        <Paper p="md" radius="md">
          <View style={{ gap: 12 }}>
            <Text style={{ fontWeight: '600', fontSize: 16 }}>
              Paper Component
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
