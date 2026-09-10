import { View } from 'react-native';
import { useState } from 'react';
import { ExampleWrapper, ExampleSection, CodeBlock } from '../../components/ExampleWrapper';
import { PropsTable } from '../../components/PropsTable';
import { modalProps } from '../../data/props/ModalProps';
import { Button, Modal, Stack, Text, Title  } from 'react-native-mantine';

export const ModalExample = () => {
  const [basicOpen, setBasicOpen] = useState(false);
  const [centeredOpen, setCenteredOpen] = useState(false);
  const [fullScreenOpen, setFullScreenOpen] = useState(false);
  const [shortContentOpen, setShortContentOpen] = useState(false);
  const [longContentOpen, setLongContentOpen] = useState(false);

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
        title="Short Content - No Scroll"
        description="Modal with short content that fits without scrolling"
        variant="showcase"
      >
        <Button onPress={() => setShortContentOpen(true)} color="teal">
          Open Short Content Modal
        </Button>
        <Modal
          opened={shortContentOpen}
          onClose={() => setShortContentOpen(false)}
          title="Short Content"
          centered
        >
          <Stack spacing={12}>
            <Text>
              This modal has minimal content that fits within the max height.
            </Text>
            <Text>
              Notice there is no scroll indicator - the content just displays.
            </Text>
            <Button
              variant="light"
              onPress={() => setShortContentOpen(false)}
            >
              Close
            </Button>
          </Stack>
        </Modal>
      </ExampleSection>

      <ExampleSection
        title="Long Content - With Scroll"
        description="Modal with content exceeding max height enables scrolling"
        variant="showcase"
      >
        <Button onPress={() => setLongContentOpen(true)} color="violet">
          Open Long Content Modal
        </Button>
        <Modal
          opened={longContentOpen}
          onClose={() => setLongContentOpen(false)}
          title="Scrollable Content"
          centered
        >
          <Stack spacing={12}>
            <Text weight="600">This modal demonstrates the scrolling behavior:</Text>
            <Text>
              When content exceeds the max height (300px or 50% of screen height),
              the modal body becomes scrollable.
            </Text>
            <Text>
              Notice the scroll indicator appears on the right side,
              indicating you can scroll to see more content.
            </Text>
            <Text>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </Text>
            <Text>
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </Text>
            <Text>
              Duis aute irure dolor in reprehenderit in voluptate velit esse
              cillum dolore eu fugiat nulla pariatur.
            </Text>
            <Text>
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
              officia deserunt mollit anim id est laborum.
            </Text>
            <Text>
              The max height constraint ensures the modal doesn't take up too much
              screen real estate, while still allowing access to all content.
            </Text>
            <Button
              onPress={() => setLongContentOpen(false)}
              fullWidth
            >
              Close Modal
            </Button>
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

      <ExampleSection
        title="Component Props"
        description="Complete reference of all available Modal props"
      >
        <PropsTable props={modalProps} />
      </ExampleSection>
    </ExampleWrapper>
  );
};
