import { useState } from 'react';
import { ExampleWrapper, ExampleSection, CodeBlock } from '../../components/ExampleWrapper';
import { Text, Paper, Stack, Button, Collapse, Divider } from 'react-native-mantine';

export const AccordionExample = () => {
  const [item1Open, setItem1Open] = useState(false);
  const [item2Open, setItem2Open] = useState(false);
  const [item3Open, setItem3Open] = useState(false);

  return (
    <ExampleWrapper
      title="Accordion"
      description="Expandable accordion panels"
    >
      <ExampleSection
        title="Basic Accordion"
        description="Expandable sections with independent states"
        variant="showcase"
      >
        <Paper radius="md" withBorder>
          <Stack spacing={0}>
            <Button
              variant="subtle"
              fullWidth
              onPress={() => setItem1Open(!item1Open)}
              style={{ borderRadius: 0 }}
            >
              What is React Native Mantine?
            </Button>
            <Collapse in={item1Open}>
              <Paper p="md">
                <Text size="sm">
                  React Native Mantine is a comprehensive UI library that ports
                  Mantine's beautiful components to React Native, providing a
                  consistent design system for mobile applications.
                </Text>
              </Paper>
            </Collapse>

            <Divider />

            <Button
              variant="subtle"
              color="grape"
              fullWidth
              onPress={() => setItem2Open(!item2Open)}
              style={{ borderRadius: 0 }}
            >
              How many components are available?
            </Button>
            <Collapse in={item2Open}>
              <Paper p="md">
                <Text size="sm">
                  The library currently includes over 50 components, covering
                  everything from basic buttons and inputs to complex components
                  like modals, carousels, and date pickers.
                </Text>
              </Paper>
            </Collapse>

            <Divider />

            <Button
              variant="subtle"
              color="teal"
              fullWidth
              onPress={() => setItem3Open(!item3Open)}
              style={{ borderRadius: 0 }}
            >
              Is TypeScript supported?
            </Button>
            <Collapse in={item3Open}>
              <Paper p="md">
                <Text size="sm">
                  Yes! All components are built with TypeScript and include full
                  type definitions. This ensures type safety and provides an
                  excellent developer experience with autocomplete and inline
                  documentation.
                </Text>
              </Paper>
            </Collapse>
          </Stack>
        </Paper>
      </ExampleSection>

      <ExampleSection
        title="Usage Example"
        description="Building accordion with Collapse"
      >
        <CodeBlock
          code={`import { useState } from 'react';
import { Collapse, Button, Paper, Text } from 'react-native-mantine';

const AccordionItem = ({ title, children }) => {
  const [opened, setOpened] = useState(false);

  return (
    <>
      <Button
        variant="subtle"
        fullWidth
        onPress={() => setOpened(!opened)}
      >
        {title}
      </Button>
      <Collapse in={opened}>
        <Paper p="md">
          <Text>{children}</Text>
        </Paper>
      </Collapse>
    </>
  );
};`}
        />
      </ExampleSection>
    </ExampleWrapper>
  );
};
