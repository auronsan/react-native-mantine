import { useState } from 'react';
import { ExampleWrapper, ExampleSection, CodeBlock } from '../../components/ExampleWrapper';
import { Text, Paper, Stack, Button, Collapse } from 'react-native-mantine';

export const SpoilerExample = () => {
  const [basicShown, setBasicShown] = useState(false);
  const [longShown, setLongShown] = useState(false);

  return (
    <ExampleWrapper
      title="Spoiler"
      description="Content reveal with show more/less"
    >
      <ExampleSection
        title="Basic Spoiler"
        description="Hide and reveal content with a button"
        variant="showcase"
      >
        <Paper p="md" radius="md" withBorder>
          <Stack spacing={12}>
            <Text>
              This is the visible part of the content. Click the button below to reveal more.
            </Text>
            <Collapse in={basicShown}>
              <Text style={{ marginTop: 8 }}>
                This is the hidden content that gets revealed when you click "Show more".
                Spoiler components are useful for hiding lengthy content and improving readability.
              </Text>
            </Collapse>
            <Button
              variant="subtle"
              size="sm"
              onPress={() => setBasicShown(!basicShown)}
            >
              {basicShown ? 'Show less' : 'Show more'}
            </Button>
          </Stack>
        </Paper>
      </ExampleSection>

      <ExampleSection
        title="Long Content Spoiler"
        description="Spoiler with longer hidden content"
        variant="showcase"
      >
        <Paper p="md" radius="md" withBorder>
          <Stack spacing={12}>
            <Text weight="600">Article Preview</Text>
            <Text>
              React Native Mantine is a comprehensive UI library that brings Mantine's
              component design to mobile applications...
            </Text>
            <Collapse in={longShown}>
              <Stack spacing={8} style={{ marginTop: 8 }}>
                <Text>
                  The library features over 50 components, from basic elements like buttons
                  and inputs to complex components like modals and carousels.
                </Text>
                <Text>
                  All components are built with TypeScript, ensuring type safety and
                  excellent developer experience. The theming system is flexible and
                  powerful, allowing full customization of colors, spacing, and typography.
                </Text>
                <Text>
                  Whether you're building a simple app or a complex platform, React Native
                  Mantine provides the tools you need for rapid development.
                </Text>
              </Stack>
            </Collapse>
            <Button
              variant="light"
              color="grape"
              size="sm"
              onPress={() => setLongShown(!longShown)}
            >
              {longShown ? 'Show less' : 'Read more'}
            </Button>
          </Stack>
        </Paper>
      </ExampleSection>

      <ExampleSection
        title="Usage Example"
        description="Implementation with Collapse component"
      >
        <CodeBlock
          code={`import { useState } from 'react';
import { Collapse, Button, Text } from 'react-native-mantine';

const MyComponent = () => {
  const [shown, setShown] = useState(false);

  return (
    <>
      <Text>Visible content...</Text>
      <Collapse in={shown}>
        <Text>Hidden content revealed!</Text>
      </Collapse>
      <Button onPress={() => setShown(!shown)}>
        {shown ? 'Show less' : 'Show more'}
      </Button>
    </>
  );
};`}
        />
      </ExampleSection>
    </ExampleWrapper>
  );
};
