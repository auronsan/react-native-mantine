import { useState } from 'react';
import { ExampleWrapper, ExampleSection, CodeBlock } from '../../components/ExampleWrapper';
import { PropsTable } from '../../components/PropsTable';
import { collapseProps } from '../../data/props/CollapseProps';
import { Button, Collapse, Stack, Text, Paper } from 'react-native-mantine';

export const CollapseExample = () => {
  const [basicOpen, setBasicOpen] = useState(false);
  const [multipleOpen1, setMultipleOpen1] = useState(false);
  const [multipleOpen2, setMultipleOpen2] = useState(false);
  const [multipleOpen3, setMultipleOpen3] = useState(false);

  return (
    <ExampleWrapper
      title="Collapse"
      description="Smooth height transitions for showing and hiding content"
    >
      <ExampleSection
        title="Basic Collapse"
        description="Simple expand/collapse animation"
        variant="showcase"
      >
        <Stack spacing={12}>
          <Button onPress={() => setBasicOpen(!basicOpen)}>
            {basicOpen ? 'Hide' : 'Show'} Content
          </Button>
          <Collapse in={basicOpen}>
            <Paper p="md" radius="md" withBorder>
              <Text>
                This content smoothly animates in and out when toggled.
                Collapse uses React Native's Animated API for smooth transitions.
              </Text>
              <Text style={{ marginTop: 12 }}>
                Perfect for FAQs, expandable lists, and progressive disclosure patterns.
              </Text>
            </Paper>
          </Collapse>
        </Stack>
      </ExampleSection>

      <ExampleSection
        title="Multiple Collapsible Sections"
        description="Independent collapsible sections (accordion-style)"
        variant="showcase"
      >
        <Stack spacing={8}>
          <Paper withBorder>
            <Button
              variant="subtle"
              onPress={() => setMultipleOpen1(!multipleOpen1)}
              fullWidth
            >
              Section 1: Getting Started
            </Button>
            <Collapse in={multipleOpen1}>
              <Paper p="md">
                <Text>
                  Welcome to the getting started guide. Here you'll find information
                  about initial setup and basic concepts.
                </Text>
              </Paper>
            </Collapse>
          </Paper>

          <Paper withBorder>
            <Button
              variant="subtle"
              color="grape"
              onPress={() => setMultipleOpen2(!multipleOpen2)}
              fullWidth
            >
              Section 2: Advanced Features
            </Button>
            <Collapse in={multipleOpen2}>
              <Paper p="md">
                <Text>
                  Explore advanced features like custom animations, nested components,
                  and performance optimization techniques.
                </Text>
              </Paper>
            </Collapse>
          </Paper>

          <Paper withBorder>
            <Button
              variant="subtle"
              color="teal"
              onPress={() => setMultipleOpen3(!multipleOpen3)}
              fullWidth
            >
              Section 3: API Reference
            </Button>
            <Collapse in={multipleOpen3}>
              <Paper p="md">
                <Text>
                  Complete API documentation with all props, methods, and examples.
                  Includes TypeScript type definitions.
                </Text>
              </Paper>
            </Collapse>
          </Paper>
        </Stack>
      </ExampleSection>

      <ExampleSection
        title="Usage Example"
        description="Basic implementation code"
      >
        <CodeBlock
          code={`import { useState } from 'react';
import { Collapse, Button, Text, Paper } from 'react-native-mantine';

const MyComponent = () => {
  const [opened, setOpened] = useState(false);

  return (
    <>
      <Button onPress={() => setOpened(!opened)}>
        Toggle Content
      </Button>

      <Collapse in={opened}>
        <Paper p="md">
          <Text>Collapsible content here</Text>
        </Paper>
      </Collapse>
    </>
  );
};`}
        />
      </ExampleSection>

      <ExampleSection
        title="Component Props"
        description="Complete reference of all available Collapse props"
      >
        <PropsTable props={collapseProps} />
      </ExampleSection>
    </ExampleWrapper>
  );
};
