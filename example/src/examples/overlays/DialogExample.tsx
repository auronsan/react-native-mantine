import { useState } from 'react';
import { ExampleWrapper, ExampleSection, CodeBlock } from '../../components/ExampleWrapper';
import { PropsTable } from '../../components/PropsTable';
import { dialogProps } from '../../data/props/DialogProps';
import { Button, Dialog, Stack, Text, TextInput, Group } from 'react-native-mantine';

export const DialogExample = () => {
  const [bottomRightOpen, setBottomRightOpen] = useState(false);
  const [topLeftOpen, setTopLeftOpen] = useState(false);
  const [centerOpen, setCenterOpen] = useState(false);

  return (
    <ExampleWrapper
      title="Dialog"
      description="Lightweight floating dialog positioned anywhere on screen"
    >
      <ExampleSection
        title="Bottom Right Dialog"
        description="Dialog positioned at bottom right (default)"
        variant="showcase"
      >
        <Button onPress={() => setBottomRightOpen(true)}>
          Show Bottom Right Dialog
        </Button>
        <Dialog
          opened={bottomRightOpen}
          position={{ bottom: 20, right: 20 }}
          size="md"
        >
          <Stack spacing={12}>
            <Text weight="600">New Notification</Text>
            <Text size="sm">
              You have received a new message. This dialog floats above other content.
            </Text>
            <Group spacing={8}>
              <Button
                size="sm"
                variant="light"
                onPress={() => setBottomRightOpen(false)}
              >
                Dismiss
              </Button>
              <Button
                size="sm"
                onPress={() => setBottomRightOpen(false)}
              >
                View
              </Button>
            </Group>
          </Stack>
        </Dialog>
      </ExampleSection>

      <ExampleSection
        title="Top Left Dialog"
        description="Dialog positioned at top left"
        variant="showcase"
      >
        <Button onPress={() => setTopLeftOpen(true)} color="grape">
          Show Top Left Dialog
        </Button>
        <Dialog
          opened={topLeftOpen}
          position={{ top: 80, left: 20 }}
          size="sm"
        >
          <Stack spacing={12}>
            <Text weight="600">Quick Action</Text>
            <Text size="sm">
              Dialog can be positioned anywhere on screen.
            </Text>
            <Button
              size="sm"
              fullWidth
              onPress={() => setTopLeftOpen(false)}
            >
              Close
            </Button>
          </Stack>
        </Dialog>
      </ExampleSection>

      <ExampleSection
        title="Centered Dialog with Input"
        description="Dialog centered on screen with form input"
        variant="showcase"
      >
        <Button onPress={() => setCenterOpen(true)} color="teal">
          Open Centered Dialog
        </Button>
        <Dialog
          opened={centerOpen}
          centered
          size="lg"
          withBorder
        >
          <Stack spacing={16}>
            <Text weight="600" size="lg">Subscribe to Newsletter</Text>
            <Text size="sm">
              Enter your email to receive updates. This dialog is centered
              both horizontally and vertically on the screen.
            </Text>
            <TextInput
              placeholder="your@email.com"
              label="Email"
            />
            <Group spacing={8}>
              <Button
                variant="outline"
                onPress={() => setCenterOpen(false)}
              >
                Cancel
              </Button>
              <Button
                onPress={() => setCenterOpen(false)}
              >
                Subscribe
              </Button>
            </Group>
          </Stack>
        </Dialog>
      </ExampleSection>

      <ExampleSection
        title="Usage Example"
        description="Basic implementation code"
      >
        <CodeBlock
          code={`import { useState } from 'react';
import { Dialog, Button, Text } from 'react-native-mantine';

const MyComponent = () => {
  const [opened, setOpened] = useState(false);

  return (
    <>
      <Button onPress={() => setOpened(true)}>
        Show Dialog
      </Button>

      {/* Positioned dialog */}
      <Dialog
        opened={opened}
        position={{ bottom: 20, right: 20 }}
      >
        <Text>Dialog content</Text>
        <Button onPress={() => setOpened(false)}>
          Close
        </Button>
      </Dialog>

      {/* Centered dialog */}
      <Dialog
        opened={opened}
        centered
      >
        <Text>Centered dialog content</Text>
      </Dialog>
    </>
  );
};`}
        />
      </ExampleSection>

      <ExampleSection
        title="Component Props"
        description="Complete reference of all available Dialog props"
      >
        <PropsTable props={dialogProps} />
      </ExampleSection>
    </ExampleWrapper>
  );
};
