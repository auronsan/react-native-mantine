import { View } from 'react-native';
import { useState } from 'react';
import { ExampleWrapper, ExampleSection, CodeBlock } from '../../components/ExampleWrapper';
import { Button, Modal, Stack, Text, Title  } from 'react-native-mantine';

export const ModalExample = () => {
  const [basicOpen, setBasicOpen] = useState(false);
  const [centeredOpen, setCenteredOpen] = useState(false);
  const [fullScreenOpen, setFullScreenOpen] = useState(false);

  return (
    <ExampleWrapper
      title="Modal"
      description="Full-featured modal dialog for displaying content in an overlay"
    >
      <ExampleSection
        title="Basic Modal"
        description="Simple modal with close button"
        variant="showcase"
      >
        <Button onPress={() => setBasicOpen(true)}>
          Open Basic Modal
        </Button>
        <Modal
          opened={basicOpen}
          onClose={() => setBasicOpen(false)}
          title="Modal Title"
        >
          <Stack spacing={12}>
            <Text>
              This is a basic modal dialog. It can contain any content you want.
            </Text>
            <Text>
              Click outside or press the close button to dismiss.
            </Text>
            <Button
              variant="light"
              onPress={() => setBasicOpen(false)}
            >
              Close Modal
            </Button>
          </Stack>
        </Modal>
      </ExampleSection>

      <ExampleSection
        title="Centered Modal"
        description="Modal centered on screen"
        variant="showcase"
      >
        <Button onPress={() => setCenteredOpen(true)} color="grape">
          Open Centered Modal
        </Button>
        <Modal
          opened={centeredOpen}
          onClose={() => setCenteredOpen(false)}
          title="Centered Modal"
          centered
        >
          <Stack spacing={12}>
            <Text>
              This modal is vertically centered on the screen for better visual balance.
            </Text>
            <Button
              variant="outline"
              onPress={() => setCenteredOpen(false)}
            >
              Got it!
            </Button>
          </Stack>
        </Modal>
      </ExampleSection>

      <ExampleSection
        title="Full Screen Modal"
        description="Modal that takes entire screen"
        variant="showcase"
      >
        <Button onPress={() => setFullScreenOpen(true)} color="orange">
          Open Full Screen Modal
        </Button>
        <Modal
          opened={fullScreenOpen}
          onClose={() => setFullScreenOpen(false)}
          title="Full Screen Content"
          fullScreen
        >
          <Stack spacing={16}>
            <Title order={3}>Welcome!</Title>
            <Text>
              Full screen modals are great for immersive experiences or detailed forms.
            </Text>
            <Text>
              They provide maximum space for your content without distractions.
            </Text>
            <View style={{ marginTop: 20 }}>
              <Button
                onPress={() => setFullScreenOpen(false)}
                fullWidth
              >
                Close Full Screen
              </Button>
            </View>
          </Stack>
        </Modal>
      </ExampleSection>

      <ExampleSection
        title="Usage Example"
        description="Basic implementation code"
      >
        <CodeBlock
          code={`import { useState } from 'react';
import { Modal, Button, Text  } from 'react-native-mantine';

const MyComponent = () => {
  const [opened, setOpened] = useState(false);

  return (
    <>
      <Button onPress={() => setOpened(true)}>
        Open Modal
      </Button>

      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="My Modal"
      >
        <Text>Modal content goes here</Text>
      </Modal>
    </>
  );
};`}
        />
      </ExampleSection>
    </ExampleWrapper>
  );
};
