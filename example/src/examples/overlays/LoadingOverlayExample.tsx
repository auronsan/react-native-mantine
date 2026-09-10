import { View } from 'react-native';
import { ExampleWrapper, ExampleSection, CodeBlock } from '../../components/ExampleWrapper';
import { PropsTable } from '../../components/PropsTable';
import { loadingOverlayProps } from '../../data/props/LoadingOverlayProps';
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

      <ExampleSection
        title="Usage"
        description="Minimal copy-pasteable example"
      >
        <CodeBlock
          code={`import { useState } from 'react';
import { View } from 'react-native';
import { LoadingOverlay, Text } from 'react-native-mantine';

const [visible, setVisible] = useState(true);

<View style={{ height: 120, position: 'relative' }}>
  <LoadingOverlay visible={visible} overlayOpacity={0.75} loaderSize="md" />
  <Text>Content under the overlay</Text>
</View>`}
        />
      </ExampleSection>

      <ExampleSection
        title="Component Props"
        description="Complete reference of all available LoadingOverlay props"
      >
        <PropsTable props={loadingOverlayProps} />
      </ExampleSection>
    </ExampleWrapper>
  );
};
