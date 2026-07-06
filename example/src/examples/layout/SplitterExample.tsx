import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { ExampleWrapper, ExampleSection, CodeBlock } from '../../components/ExampleWrapper';
import { PropsTable } from '../../components/PropsTable';
import {
  splitterProps,
  splitterPaneProps,
} from '../../data/props/SplitterProps';
import { Badge, Center, Code, Splitter, Stack, Text } from 'react-native-mantine';

export const SplitterExample = () => {
  const [sizes, setSizes] = useState<number[]>([60, 40]);
  const [dragging, setDragging] = useState(false);

  return (
    <ExampleWrapper
      title="Splitter"
      description="Resizable panes divided by draggable handles"
    >
      <ExampleSection
        title="Basic Usage"
        description="Drag the handle between the panes to resize them. Splitter.Pane requires defaultSize in percent, min and max constrain the pane"
        variant="showcase"
      >
        <Stack spacing={12}>
          <View style={styles.demoArea}>
            <Splitter
              style={styles.splitter}
              onSizeChange={setSizes}
              onResizeStart={() => setDragging(true)}
              onResizeEnd={() => setDragging(false)}
            >
              <Splitter.Pane defaultSize={60} min={20} max={80}>
                <Center style={[styles.pane, styles.paneBlue]}>
                  <Text size="sm">First pane</Text>
                  <Text size="xs" color="dimmed">
                    min 20% / max 80%
                  </Text>
                </Center>
              </Splitter.Pane>
              <Splitter.Pane defaultSize={40} min={20}>
                <Center style={[styles.pane, styles.paneTeal]}>
                  <Text size="sm">Second pane</Text>
                  <Text size="xs" color="dimmed">
                    min 20%
                  </Text>
                </Center>
              </Splitter.Pane>
            </Splitter>
          </View>
          <Stack spacing={8}>
            <Badge
              size="sm"
              variant="light"
              color={dragging ? 'orange' : 'blue'}
            >
              {dragging ? 'Resizing...' : 'Idle'}
            </Badge>
            <Code>
              {`onSizeChange: [${sizes
                .map((size) => `${size.toFixed(1)}%`)
                .join(', ')}]`}
            </Code>
          </Stack>
        </Stack>
      </ExampleSection>

      <ExampleSection
        title="Vertical Orientation"
        description="orientation='vertical' stacks panes on top of each other, any number of panes is supported"
        variant="showcase"
      >
        <View style={styles.demoAreaTall}>
          <Splitter orientation="vertical" style={styles.splitter}>
            <Splitter.Pane defaultSize={40} min={15}>
              <Center style={[styles.pane, styles.paneBlue]}>
                <Text size="sm">Header</Text>
              </Center>
            </Splitter.Pane>
            <Splitter.Pane defaultSize={35} min={15}>
              <Center style={[styles.pane, styles.paneTeal]}>
                <Text size="sm">Content</Text>
              </Center>
            </Splitter.Pane>
            <Splitter.Pane defaultSize={25} min={15}>
              <Center style={[styles.pane, styles.paneGrape]}>
                <Text size="sm">Footer</Text>
              </Center>
            </Splitter.Pane>
          </Splitter>
        </View>
      </ExampleSection>

      <ExampleSection
        title="Handle Customization"
        description="withHandle={false} hides the grip indicator, lineSize and handleSize control the separator and touch area"
        variant="showcase"
      >
        <View style={styles.demoAreaShort}>
          <Splitter
            style={styles.splitter}
            withHandle={false}
            lineSize={4}
            handleSize={24}
          >
            <Splitter.Pane defaultSize={50}>
              <Center style={[styles.pane, styles.paneGrape]}>
                <Text size="sm">Left</Text>
              </Center>
            </Splitter.Pane>
            <Splitter.Pane defaultSize={50}>
              <Center style={[styles.pane, styles.paneBlue]}>
                <Text size="sm">Right</Text>
              </Center>
            </Splitter.Pane>
          </Splitter>
        </View>
      </ExampleSection>

      <ExampleSection
        title="Splitter Props"
        description="Complete reference of all available Splitter props"
      >
        <PropsTable props={splitterProps} />
      </ExampleSection>

      <ExampleSection
        title="Splitter.Pane Props"
        description="Each pane declares its initial size and constraints"
      >
        <PropsTable props={splitterPaneProps} />
      </ExampleSection>

      <ExampleSection
        title="Usage Example"
        description="Basic implementation code"
      >
        <CodeBlock
          code={`import { Splitter } from 'react-native-mantine';

// Drag the handle between panes to resize
<Splitter onSizeChange={(sizes) => console.log(sizes)}>
  <Splitter.Pane defaultSize={60} min={20} max={80}>
    <FirstPane />
  </Splitter.Pane>
  <Splitter.Pane defaultSize={40} min={20}>
    <SecondPane />
  </Splitter.Pane>
</Splitter>

// Vertical layout with three panes
<Splitter orientation="vertical">
  <Splitter.Pane defaultSize={40}>{/* ... */}</Splitter.Pane>
  <Splitter.Pane defaultSize={35}>{/* ... */}</Splitter.Pane>
  <Splitter.Pane defaultSize={25}>{/* ... */}</Splitter.Pane>
</Splitter>`}
        />
      </ExampleSection>
    </ExampleWrapper>
  );
};

const styles = StyleSheet.create({
  demoArea: {
    height: 200,
    borderWidth: 1,
    borderColor: '#dee2e6',
    borderRadius: 8,
    overflow: 'hidden',
  },
  demoAreaTall: {
    height: 260,
    borderWidth: 1,
    borderColor: '#dee2e6',
    borderRadius: 8,
    overflow: 'hidden',
  },
  demoAreaShort: {
    height: 140,
    borderWidth: 1,
    borderColor: '#dee2e6',
    borderRadius: 8,
    overflow: 'hidden',
  },
  splitter: {
    flex: 1,
  },
  pane: {
    flex: 1,
  },
  paneBlue: {
    backgroundColor: '#e7f5ff',
  },
  paneTeal: {
    backgroundColor: '#e6fcf5',
  },
  paneGrape: {
    backgroundColor: '#f8f0fc',
  },
});
