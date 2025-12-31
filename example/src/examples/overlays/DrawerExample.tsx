import { useState } from 'react';
import { ExampleWrapper, ExampleSection, CodeBlock } from '../../components/ExampleWrapper';
import { Button, Drawer, Stack, Text, Title } from 'react-native-mantine';

export const DrawerExample = () => {
  const [leftOpen, setLeftOpen] = useState(false);
  const [rightOpen, setRightOpen] = useState(false);
  const [topOpen, setTopOpen] = useState(false);
  const [bottomOpen, setBottomOpen] = useState(false);

  return (
    <ExampleWrapper
      title="Drawer"
      description="Side panel with slide animation from any direction"
    >
      <ExampleSection
        title="Left Drawer"
        description="Drawer sliding from the left side"
        variant="showcase"
      >
        <Button onPress={() => setLeftOpen(true)}>
          Open Left Drawer
        </Button>
        <Drawer
          opened={leftOpen}
          onClose={() => setLeftOpen(false)}
          position="left"
          title="Left Drawer"
        >
          <Stack spacing={12}>
            <Text>This drawer slides in from the left side of the screen.</Text>
            <Text>Perfect for navigation menus or filters.</Text>
            <Button
              variant="light"
              onPress={() => setLeftOpen(false)}
            >
              Close Drawer
            </Button>
          </Stack>
        </Drawer>
      </ExampleSection>

      <ExampleSection
        title="Right Drawer"
        description="Drawer sliding from the right side"
        variant="showcase"
      >
        <Button onPress={() => setRightOpen(true)} color="grape">
          Open Right Drawer
        </Button>
        <Drawer
          opened={rightOpen}
          onClose={() => setRightOpen(false)}
          position="right"
          title="Right Drawer"
        >
          <Stack spacing={12}>
            <Text>This drawer slides in from the right side.</Text>
            <Text>Commonly used for settings or additional options.</Text>
            <Button
              variant="outline"
              onPress={() => setRightOpen(false)}
            >
              Close Drawer
            </Button>
          </Stack>
        </Drawer>
      </ExampleSection>

      <ExampleSection
        title="Top Drawer"
        description="Drawer sliding from the top"
        variant="showcase"
      >
        <Button onPress={() => setTopOpen(true)} color="teal">
          Open Top Drawer
        </Button>
        <Drawer
          opened={topOpen}
          onClose={() => setTopOpen(false)}
          position="top"
          title="Top Drawer"
          size="sm"
        >
          <Stack spacing={12}>
            <Text>This drawer slides down from the top.</Text>
            <Text>Great for notifications or alerts.</Text>
            <Button
              variant="light"
              color="teal"
              onPress={() => setTopOpen(false)}
            >
              Got it!
            </Button>
          </Stack>
        </Drawer>
      </ExampleSection>

      <ExampleSection
        title="Bottom Drawer"
        description="Drawer sliding from the bottom"
        variant="showcase"
      >
        <Button onPress={() => setBottomOpen(true)} color="orange">
          Open Bottom Drawer
        </Button>
        <Drawer
          opened={bottomOpen}
          onClose={() => setBottomOpen(false)}
          position="bottom"
          title="Bottom Drawer"
          size="md"
        >
          <Stack spacing={12}>
            <Title order={4}>Bottom Sheet Style</Title>
            <Text>This drawer slides up from the bottom.</Text>
            <Text>Popular for mobile-style bottom sheets and action menus.</Text>
            <Button
              onPress={() => setBottomOpen(false)}
              fullWidth
            >
              Close
            </Button>
          </Stack>
        </Drawer>
      </ExampleSection>

      <ExampleSection
        title="Usage Example"
        description="Basic implementation code"
      >
        <CodeBlock
          code={`import { useState } from 'react';
import { Drawer, Button, Text } from 'react-native-mantine';

const MyComponent = () => {
  const [opened, setOpened] = useState(false);

  return (
    <>
      <Button onPress={() => setOpened(true)}>
        Open Drawer
      </Button>

      <Drawer
        opened={opened}
        onClose={() => setOpened(false)}
        position="left"
        title="My Drawer"
      >
        <Text>Drawer content goes here</Text>
      </Drawer>
    </>
  );
};`}
        />
      </ExampleSection>
    </ExampleWrapper>
  );
};
