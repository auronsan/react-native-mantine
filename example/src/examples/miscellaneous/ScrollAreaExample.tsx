import { useState } from 'react';
import { StyleSheet } from 'react-native';
import { ExampleWrapper, ExampleSection, CodeBlock } from '../../components/ExampleWrapper';
import { PropsTable } from '../../components/PropsTable';
import {
  scrollAreaProps,
  scrollAreaAutosizeProps,
} from '../../data/props/ScrollAreaProps';
import {
  Badge,
  Code,
  Group,
  ScrollArea,
  Stack,
  Text,
} from 'react-native-mantine';

const lines = Array.from(
  { length: 20 },
  (_, index) => `Line ${index + 1} of the scrollable content`
);

const tags = [
  'React',
  'React Native',
  'TypeScript',
  'Mantine',
  'Expo',
  'Metro',
  'Jest',
  'ESLint',
  'Prettier',
];

export const ScrollAreaExample = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  return (
    <ExampleWrapper
      title="ScrollArea"
      description="Scrollable container with a Mantine-compatible API on top of the React Native ScrollView"
    >
      <ExampleSection
        title="Basic Usage"
        description="Give the ScrollArea a fixed height to constrain the viewport, content overflowing it becomes scrollable"
        variant="showcase"
      >
        <ScrollArea style={styles.vertical}>
          <Stack spacing={4}>
            {lines.map((line) => (
              <Text key={line} size="sm">
                {line}
              </Text>
            ))}
          </Stack>
        </ScrollArea>
      </ExampleSection>

      <ExampleSection
        title="Horizontal"
        description="horizontal scrolls content on the x axis instead of the y axis"
        variant="showcase"
      >
        <ScrollArea horizontal>
          <Group spacing={8} noWrap>
            {tags.map((tag) => (
              <Badge key={tag} variant="light">
                {tag}
              </Badge>
            ))}
          </Group>
        </ScrollArea>
      </ExampleSection>

      <ExampleSection
        title="Autosize"
        description="ScrollArea.Autosize grows with its content up to maxHeight, then becomes scrollable"
        variant="showcase"
      >
        <ScrollArea.Autosize maxHeight={120}>
          <Stack spacing={4}>
            {lines.slice(0, 12).map((line) => (
              <Text key={line} size="sm">
                {line}
              </Text>
            ))}
          </Stack>
        </ScrollArea.Autosize>
      </ExampleSection>

      <ExampleSection
        title="Scroll Position"
        description="onScrollPositionChange is called with the current { x, y } offset while scrolling"
        variant="showcase"
      >
        <Stack spacing={12}>
          <ScrollArea
            style={styles.vertical}
            onScrollPositionChange={setPosition}
          >
            <Stack spacing={4}>
              {lines.map((line) => (
                <Text key={line} size="sm">
                  {line}
                </Text>
              ))}
            </Stack>
          </ScrollArea>
          <Group spacing={8}>
            <Text size="sm" color="dimmed">
              Scroll position:
            </Text>
            <Code>
              {`{ x: ${Math.round(position.x)}, y: ${Math.round(position.y)} }`}
            </Code>
          </Group>
        </Stack>
      </ExampleSection>

      <ExampleSection
        title="Hidden Indicators"
        description="type='never' hides the scroll indicators, all other values show them"
      >
        <ScrollArea type="never" style={styles.short}>
          <Stack spacing={4}>
            {lines.slice(0, 10).map((line) => (
              <Text key={line} size="sm">
                {line}
              </Text>
            ))}
          </Stack>
        </ScrollArea>
      </ExampleSection>

      <ExampleSection
        title="Component Props"
        description="Complete reference of all available ScrollArea props"
      >
        <PropsTable props={scrollAreaProps} />
      </ExampleSection>

      <ExampleSection
        title="ScrollArea.Autosize"
        description="Additional props of the Autosize variant"
      >
        <PropsTable props={scrollAreaAutosizeProps} />
      </ExampleSection>

      <ExampleSection
        title="Usage Example"
        description="Basic implementation code"
      >
        <CodeBlock
          code={`import { ScrollArea } from 'react-native-mantine';

// Fixed-height vertical scroll area
<ScrollArea style={{ height: 160 }}>
  {/* long content */}
</ScrollArea>

// Horizontal scrolling without indicators
<ScrollArea horizontal type="never">
  {/* wide content */}
</ScrollArea>

// Grows with content up to maxHeight
<ScrollArea.Autosize maxHeight={120}>
  {/* content */}
</ScrollArea.Autosize>

// Track the scroll offset
<ScrollArea
  style={{ height: 160 }}
  onScrollPositionChange={({ x, y }) => console.log(x, y)}
>
  {/* content */}
</ScrollArea>`}
        />
      </ExampleSection>
    </ExampleWrapper>
  );
};

const styles = StyleSheet.create({
  vertical: {
    height: 160,
  },
  short: {
    height: 120,
  },
});
