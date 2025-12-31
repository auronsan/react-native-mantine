import { View } from 'react-native';
import { ExampleWrapper, ExampleSection, CodeBlock } from '../../components/ExampleWrapper';
import { PropsTable } from '../../components/PropsTable';
import { overlayProps } from '../../data/props/OverlayProps';
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

      <ExampleSection
        title="Component Props"
        description="Complete reference of all available Overlay props"
      >
        <PropsTable props={overlayProps} />
      </ExampleSection>

      <ExampleSection
        title="Usage Example"
        description="Basic implementation code"
      >
        <CodeBlock
          code={`import { Overlay } from 'react-native-mantine';

<View style={{ position: 'relative' }}>
  <Overlay
    opacity={0.6}
    color="#000"
    onPress={() => console.log('Overlay pressed')}
  />
  <YourContent />
</View>`}
        />
      </ExampleSection>
    </ExampleWrapper>
  );
};
