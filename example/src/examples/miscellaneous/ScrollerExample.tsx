import { StyleSheet, View } from 'react-native';
import { ExampleWrapper, ExampleSection, CodeBlock } from '../../components/ExampleWrapper';
import { PropsTable } from '../../components/PropsTable';
import { scrollerProps } from '../../data/props/ScrollerProps';
import { Badge, Paper, Scroller, Stack, Text } from 'react-native-mantine';

const items = [
  'React',
  'React Native',
  'TypeScript',
  'Expo',
  'Metro',
  'Jest',
  'ESLint',
  'Prettier',
  'Babel',
  'Hermes',
];

export const ScrollerExample = () => {
  return (
    <ExampleWrapper
      title="Scroller"
      description="Horizontally scrollable content with edge gradients and scroll controls"
    >
      <ExampleSection
        title="Basic Usage"
        description="Circular controls scroll the content by scrollAmount px. Controls and gradients appear once the content overflows the container"
        variant="showcase"
      >
        <Stack spacing={12}>
          <Scroller>
            {items.map((item) => (
              <Paper key={item} p="md" radius="md" style={styles.card}>
                <Text size="sm">{item}</Text>
              </Paper>
            ))}
          </Scroller>
          <Text size="sm" color="dimmed">
            Swipe the row or press the circular buttons. The start control is
            only visible after scrolling away from the start edge.
          </Text>
        </Stack>
      </ExampleSection>

      <ExampleSection
        title="Without Controls"
        description="withControls={false} keeps only the edge gradients as an overflow hint"
        variant="showcase"
      >
        <Scroller withControls={false}>
          {items.map((item) => (
            <View key={item} style={styles.badgeWrapper}>
              <Badge variant="light" size="lg">
                {item}
              </Badge>
            </View>
          ))}
        </Scroller>
      </ExampleSection>

      <ExampleSection
        title="Custom Scroll Amount and Control Size"
        description="scrollAmount controls how far each press scrolls, controlSize resizes the circular buttons, withEdgeGradients={false} removes the fade"
        variant="showcase"
      >
        <Scroller
          scrollAmount={320}
          controlSize={40}
          withEdgeGradients={false}
        >
          {items.map((item) => (
            <Paper key={item} p="md" radius="md" style={styles.card}>
              <Text size="sm">{item}</Text>
            </Paper>
          ))}
        </Scroller>
      </ExampleSection>

      <ExampleSection
        title="Component Props"
        description="Complete reference of all available Scroller props"
      >
        <PropsTable props={scrollerProps} />
      </ExampleSection>

      <ExampleSection
        title="Usage Example"
        description="Basic implementation code"
      >
        <CodeBlock
          code={`import { Scroller } from 'react-native-mantine';

// Controls appear once content overflows
<Scroller scrollAmount={200} controlSize={32}>
  {items.map((item) => (
    <Badge key={item}>{item}</Badge>
  ))}
</Scroller>

// Edge gradients only, no control buttons
<Scroller withControls={false}>
  {/* ... */}
</Scroller>`}
        />
      </ExampleSection>
    </ExampleWrapper>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 132,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#dee2e6',
    alignItems: 'center',
  },
  badgeWrapper: {
    marginRight: 8,
  },
});
