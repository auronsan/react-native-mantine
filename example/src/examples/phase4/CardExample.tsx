import { ExampleWrapper, ExampleSection, CodeBlock } from '../../components/ExampleWrapper';
import { PropsTable } from '../../components/PropsTable';
import { cardProps, cardSectionProps } from '../../data/props/CardProps';
import { Card, Text , Paper } from 'react-native-mantine';

export const CardExample = () => {
  return (
    <ExampleWrapper
      title="Card"
      description="Content card with sections"
    >
      <ExampleSection
        title="Basic Usage"
        description="Card component"
      >
        <Paper p="md" radius="md">
          <Card shadow="sm" p="lg" radius="md">
            <Text style={{ fontWeight: '600', marginBottom: 8 }}>Card Title</Text>
            <Text>Card content goes here</Text>
          </Card>
        </Paper>
      </ExampleSection>

      <ExampleSection
        title="Component Props"
        description="Complete reference of all available Card props"
      >
        <PropsTable props={cardProps} />
      </ExampleSection>

      <ExampleSection
        title="Card.Section Props"
        description="Props for creating card sections with optional borders and padding"
      >
        <PropsTable props={cardSectionProps} />
      </ExampleSection>

      <ExampleSection
        title="Usage Example"
        description="Basic implementation code"
      >
        <CodeBlock
          code={`import { Card, Text } from 'react-native-mantine';

<Card shadow="sm" p="lg" radius="md" withBorder>
  <Card.Section withBorder inheritPadding>
    <Text style={{ fontWeight: '600' }}>Card Title</Text>
  </Card.Section>

  <Card.Section padding="md">
    <Text>Card content goes here</Text>
  </Card.Section>
</Card>`}
        />
      </ExampleSection>
    </ExampleWrapper>
  );
};
