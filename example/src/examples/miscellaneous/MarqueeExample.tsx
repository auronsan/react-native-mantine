import { ExampleWrapper, ExampleSection, CodeBlock } from '../../components/ExampleWrapper';
import { PropsTable } from '../../components/PropsTable';
import { marqueeProps } from '../../data/props/MarqueeProps';
import { Badge, Marquee, Paper, Text } from 'react-native-mantine';

const badges = (
  <>
    <Badge color="blue">React</Badge>
    <Badge color="grape">React Native</Badge>
    <Badge color="teal">TypeScript</Badge>
    <Badge color="orange">Mantine</Badge>
    <Badge color="red">Expo</Badge>
  </>
);

export const MarqueeExample = () => {
  return (
    <ExampleWrapper
      title="Marquee"
      description="Continuously scrolling content loop"
    >
      <ExampleSection
        title="Basic Usage"
        description="Content scrolls horizontally in an infinite loop"
        variant="showcase"
      >
        <Paper p="md" radius="md">
          <Marquee duration={20000}>{badges}</Marquee>
        </Paper>
      </ExampleSection>

      <ExampleSection
        title="Reverse"
        description="Scroll the content in the opposite direction"
      >
        <Paper p="md" radius="md">
          <Marquee reverse duration={20000}>{badges}</Marquee>
        </Paper>
      </ExampleSection>

      <ExampleSection
        title="Vertical"
        description="Vertical marquee inside a fixed-height container"
      >
        <Paper p="md" radius="md">
          <Marquee
            orientation="vertical"
            duration={12000}
            style={{ height: 120 }}
          >
            <Text size="sm">First announcement</Text>
            <Text size="sm">Second announcement</Text>
            <Text size="sm">Third announcement</Text>
          </Marquee>
        </Paper>
      </ExampleSection>

      <ExampleSection
        title="Without Fade Edges"
        description="Disable the gradient fade at the edges"
      >
        <Paper p="md" radius="md">
          <Marquee fadeEdges={false} duration={20000}>
            {badges}
          </Marquee>
        </Paper>
      </ExampleSection>

      <ExampleSection
        title="Custom Gap"
        description="Control the gap between content copies"
      >
        <Paper p="md" radius="md">
          <Marquee gap={48} duration={20000}>
            {badges}
          </Marquee>
        </Paper>
      </ExampleSection>

      <ExampleSection
        title="Component Props"
        description="Complete reference of all available Marquee props"
      >
        <PropsTable props={marqueeProps} />
      </ExampleSection>

      <ExampleSection
        title="Usage Example"
        description="Basic implementation code"
      >
        <CodeBlock
          code={`import { Badge, Marquee } from 'react-native-mantine';

<Marquee duration={20000} gap="md">
  <Badge color="blue">React</Badge>
  <Badge color="grape">React Native</Badge>
  <Badge color="teal">TypeScript</Badge>
</Marquee>

// Vertical marquee
<Marquee
  orientation="vertical"
  duration={12000}
  style={{ height: 120 }}
>
  <Text>First announcement</Text>
  <Text>Second announcement</Text>
</Marquee>`}
        />
      </ExampleSection>
    </ExampleWrapper>
  );
};
