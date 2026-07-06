import { useState } from 'react';
import { ExampleWrapper, ExampleSection, CodeBlock } from '../../components/ExampleWrapper';
import { PropsTable } from '../../components/PropsTable';
import { pillProps, pillGroupProps } from '../../data/props/PillProps';
import { Button, Paper, Pill, Stack, Text } from 'react-native-mantine';

export const PillExample = () => {
  const [technologies, setTechnologies] = useState<string[]>([
    'React',
    'React Native',
    'TypeScript',
    'Mantine',
  ]);

  return (
    <ExampleWrapper
      title="Pill"
      description="Removable tag pill"
    >
      <ExampleSection
        title="Basic Usage"
        description="Pills grouped with Pill.Group"
      >
        <Paper p="md" radius="md">
          <Pill.Group>
            <Pill>React</Pill>
            <Pill>Native</Pill>
            <Pill>Mantine</Pill>
            <Pill disabled>Disabled</Pill>
          </Pill.Group>
        </Paper>
      </ExampleSection>

      <ExampleSection
        title="Sizes"
        description="Pill supports xs, sm, md, lg and xl sizes"
      >
        <Paper p="md" radius="md">
          <Pill.Group>
            <Pill size="xs">Extra small</Pill>
            <Pill size="sm">Small</Pill>
            <Pill size="md">Medium</Pill>
            <Pill size="lg">Large</Pill>
            <Pill size="xl">Extra large</Pill>
          </Pill.Group>
        </Paper>
      </ExampleSection>

      <ExampleSection
        title="With Remove Button"
        description="Interactive pills that can be removed"
        variant="showcase"
      >
        <Paper p="md" radius="md">
          <Stack spacing={12}>
            <Pill.Group>
              {technologies.map((tech) => (
                <Pill
                  key={tech}
                  withRemoveButton
                  onRemove={() =>
                    setTechnologies((current) =>
                      current.filter((item) => item !== tech)
                    )
                  }
                >
                  {tech}
                </Pill>
              ))}
            </Pill.Group>
            {technologies.length === 0 && (
              <Text size="sm" color="dimmed">
                All pills removed
              </Text>
            )}
            <Button
              size="xs"
              variant="light"
              onPress={() =>
                setTechnologies(['React', 'React Native', 'TypeScript', 'Mantine'])
              }
            >
              Reset pills
            </Button>
          </Stack>
        </Paper>
      </ExampleSection>

      <ExampleSection
        title="Component Props"
        description="Complete reference of all available Pill props"
      >
        <PropsTable props={pillProps} />
      </ExampleSection>

      <ExampleSection
        title="Pill.Group Props"
        description="Props for grouping multiple pills with consistent size and gap"
      >
        <PropsTable props={pillGroupProps} />
      </ExampleSection>

      <ExampleSection
        title="Usage Example"
        description="Basic implementation code"
      >
        <CodeBlock
          code={`import { Pill } from 'react-native-mantine';

<Pill
  withRemoveButton
  onRemove={() => removeTag('react')}
  size="md"
>
  React
</Pill>

// With Group
<Pill.Group gap="xs">
  <Pill>React</Pill>
  <Pill>React Native</Pill>
  <Pill disabled>Disabled</Pill>
</Pill.Group>`}
        />
      </ExampleSection>
    </ExampleWrapper>
  );
};
