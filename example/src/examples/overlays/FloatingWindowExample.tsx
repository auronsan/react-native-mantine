import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { ExampleWrapper, ExampleSection, CodeBlock } from '../../components/ExampleWrapper';
import { PropsTable } from '../../components/PropsTable';
import { floatingWindowProps } from '../../data/props/FloatingWindowProps';
import {
  Badge,
  Button,
  Code,
  FloatingWindow,
  PortalProvider,
  Stack,
  Switch,
  Text,
} from 'react-native-mantine';

export const FloatingWindowExample = () => {
  const [opened, setOpened] = useState(false);
  const [position, setPosition] = useState({ x: 12, y: 12 });
  const [dragging, setDragging] = useState(false);
  const [resetKey, setResetKey] = useState(0);

  return (
    <ExampleWrapper
      title="FloatingWindow"
      description="Draggable window rendered above the app content, moved by dragging its header bar"
    >
      <ExampleSection
        title="Basic Usage"
        description="withinPortal (default) renders the window into the PortalProvider overlay. Drag the header bar to move it, onClose renders a close button"
        variant="showcase"
      >
        <View style={styles.demoArea}>
          <PortalProvider>
            <Stack spacing={12} style={styles.demoContent}>
              <Switch
                label="Show floating window"
                checked={opened}
                onChange={setOpened}
              />
              <Badge
                size="sm"
                variant="light"
                color={dragging ? 'orange' : 'blue'}
              >
                {dragging ? 'Dragging...' : 'Idle'}
              </Badge>
              <Code>
                {`position: { x: ${Math.round(position.x)}, y: ${Math.round(
                  position.y
                )} }`}
              </Code>
              <Text size="sm" color="dimmed">
                The window drags only by its header bar, the body stays
                interactive.
              </Text>
              {opened && (
                <FloatingWindow
                  title="Inspector"
                  width={190}
                  initialPosition={{ x: 12, y: 12 }}
                  onPositionChange={setPosition}
                  onDragStart={() => setDragging(true)}
                  onDragEnd={() => setDragging(false)}
                  onClose={() => setOpened(false)}
                >
                  <Text size="xs">
                    Drag me around by the header. Press the close button to
                    dismiss.
                  </Text>
                </FloatingWindow>
              )}
            </Stack>
          </PortalProvider>
        </View>
      </ExampleSection>

      <ExampleSection
        title="Without Portal"
        description="withinPortal={false} renders the window in place, absolutely positioned within its parent"
        variant="showcase"
      >
        <Stack spacing={12}>
          <View style={styles.inlineArea}>
            <FloatingWindow
              key={resetKey}
              withinPortal={false}
              title="Inline window"
              width={170}
              zIndex={10}
              initialPosition={{ x: 8, y: 8 }}
            >
              <Text size="xs">No close button without onClose.</Text>
            </FloatingWindow>
          </View>
          <Button
            size="xs"
            variant="light"
            onPress={() => setResetKey((key) => key + 1)}
          >
            Reset position
          </Button>
        </Stack>
      </ExampleSection>

      <ExampleSection
        title="Component Props"
        description="Complete reference of all available FloatingWindow props"
      >
        <PropsTable props={floatingWindowProps} />
      </ExampleSection>

      <ExampleSection
        title="Usage Example"
        description="Basic implementation code"
      >
        <CodeBlock
          code={`import {
  FloatingWindow,
  PortalProvider,
} from 'react-native-mantine';

// Wrap your app so the window can render in the overlay
<PortalProvider>
  <App />
</PortalProvider>

// Drag the header bar to move the window
<FloatingWindow
  title="Inspector"
  initialPosition={{ x: 12, y: 12 }}
  onPositionChange={({ x, y }) => console.log(x, y)}
  onClose={() => setOpened(false)}
  width={280}
>
  <Text size="sm">Window content</Text>
</FloatingWindow>`}
        />
      </ExampleSection>
    </ExampleWrapper>
  );
};

const styles = StyleSheet.create({
  demoArea: {
    height: 300,
    position: 'relative',
    borderWidth: 1,
    borderColor: '#dee2e6',
    borderRadius: 8,
    overflow: 'hidden',
  },
  demoContent: {
    padding: 12,
    alignItems: 'flex-start',
  },
  inlineArea: {
    height: 200,
    position: 'relative',
    borderWidth: 1,
    borderColor: '#dee2e6',
    borderRadius: 8,
    overflow: 'hidden',
  },
});
