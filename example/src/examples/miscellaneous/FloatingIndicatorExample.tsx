import { useState } from 'react';
import {
  Pressable,
  StyleSheet,
  View,
  type LayoutChangeEvent,
} from 'react-native';
import { ExampleWrapper, ExampleSection, CodeBlock } from '../../components/ExampleWrapper';
import { PropsTable } from '../../components/PropsTable';
import {
  floatingIndicatorProps,
  floatingIndicatorTargetProps,
} from '../../data/props/FloatingIndicatorProps';
import { Button, FloatingIndicator, Paper, Stack, Text } from 'react-native-mantine';
import type { FloatingIndicatorTarget } from 'react-native-mantine';

const controls = ['React', 'Vue', 'Svelte'];

export const FloatingIndicatorExample = () => {
  const [active, setActive] = useState(0);
  const [rects, setRects] = useState<(FloatingIndicatorTarget | null)[]>([
    null,
    null,
    null,
  ]);

  const [visible, setVisible] = useState(true);
  const [toggleRect, setToggleRect] =
    useState<FloatingIndicatorTarget | null>(null);

  const handleLayout = (index: number) => (event: LayoutChangeEvent) => {
    const { x, y, width, height } = event.nativeEvent.layout;
    setRects((current) => {
      const next = [...current];
      next[index] = { x, y, width, height };
      return next;
    });
  };

  return (
    <ExampleWrapper
      title="FloatingIndicator"
      description="Animated indicator that slides between targets"
    >
      <ExampleSection
        title="Segmented Control"
        description="The indicator is rendered first so it sits behind the labels. Each label measures its rect with onLayout, labels keep a transparent background and a higher zIndex"
        variant="showcase"
      >
        <Paper p="md" radius="md">
          <Stack spacing={12}>
            <View style={styles.control}>
              <FloatingIndicator
                target={rects[active] ?? null}
                color="blue"
                radius="sm"
              />
              {controls.map((label, index) => (
                <Pressable
                  key={label}
                  style={styles.controlItem}
                  onLayout={handleLayout(index)}
                  onPress={() => setActive(index)}
                >
                  <Text
                    size="sm"
                    weight="600"
                    style={active === index ? styles.activeLabel : undefined}
                  >
                    {label}
                  </Text>
                </Pressable>
              ))}
            </View>
            <Text size="sm" color="dimmed">
              Active: {controls[active]}
            </Text>
          </Stack>
        </Paper>
      </ExampleSection>

      <ExampleSection
        title="Hidden Indicator"
        description="Pass target={null} to hide the indicator, it fades out and back in when a target is provided again"
      >
        <Paper p="md" radius="md">
          <Stack spacing={12}>
            <View style={styles.control}>
              <FloatingIndicator
                target={visible ? toggleRect : null}
                color="teal"
                radius="sm"
              />
              <Pressable
                style={styles.controlItem}
                onLayout={(event) => {
                  const { x, y, width, height } = event.nativeEvent.layout;
                  setToggleRect({ x, y, width, height });
                }}
                onPress={() => setVisible((current) => !current)}
              >
                <Text
                  size="sm"
                  weight="600"
                  style={visible ? styles.activeLabel : undefined}
                >
                  Target
                </Text>
              </Pressable>
            </View>
            <Button
              size="xs"
              variant="light"
              onPress={() => setVisible((current) => !current)}
            >
              {visible ? 'Hide indicator (target={null})' : 'Show indicator'}
            </Button>
          </Stack>
        </Paper>
      </ExampleSection>

      <ExampleSection
        title="Component Props"
        description="Complete reference of all available FloatingIndicator props"
      >
        <PropsTable props={floatingIndicatorProps} />
      </ExampleSection>

      <ExampleSection
        title="FloatingIndicatorTarget"
        description="Shape of the target rect measured with onLayout"
      >
        <PropsTable props={floatingIndicatorTargetProps} />
      </ExampleSection>

      <ExampleSection
        title="Usage Example"
        description="Basic implementation code"
      >
        <CodeBlock
          code={`import { FloatingIndicator } from 'react-native-mantine';
import type { FloatingIndicatorTarget } from 'react-native-mantine';

const [active, setActive] = useState(0);
const [rects, setRects] = useState<
  (FloatingIndicatorTarget | null)[]
>([null, null, null]);

// Parent uses the default relative positioning
<View style={{ flexDirection: 'row', borderWidth: 1 }}>
  {/* Rendered first, sits behind the labels */}
  <FloatingIndicator target={rects[active] ?? null} color="blue" />

  {labels.map((label, index) => (
    <Pressable
      key={label}
      // Transparent background + zIndex above the indicator
      style={{ flex: 1, zIndex: 1 }}
      onLayout={(event) => {
        const { x, y, width, height } = event.nativeEvent.layout;
        setRects((current) => {
          const next = [...current];
          next[index] = { x, y, width, height };
          return next;
        });
      }}
      onPress={() => setActive(index)}
    >
      <Text>{label}</Text>
    </Pressable>
  ))}
</View>`}
        />
      </ExampleSection>
    </ExampleWrapper>
  );
};

const styles = StyleSheet.create({
  control: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#dee2e6',
    borderRadius: 8,
    backgroundColor: '#f1f3f5',
    padding: 4,
  },
  controlItem: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    backgroundColor: 'transparent',
    zIndex: 1,
  },
  activeLabel: {
    color: '#fff',
  },
});
