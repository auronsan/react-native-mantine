import { useState } from 'react';
import { ExampleWrapper, ExampleSection, CodeBlock } from '../../components/ExampleWrapper';
import { PropsTable } from '../../components/PropsTable';
import {
  menubarProps,
  menubarMenuProps,
  menubarItemProps,
} from '../../data/props/MenubarProps';
import {
  Button,
  Icon,
  Menubar,
  Paper,
  Stack,
  Text,
} from 'react-native-mantine';

export const MenubarExample = () => {
  const [openedIndex, setOpenedIndex] = useState<number | null>(null);
  const [lastAction, setLastAction] = useState('none');

  return (
    <ExampleWrapper
      title="Menubar"
      description="Horizontal bar of menus where only one menu can be opened at a time"
    >
      <ExampleSection
        title="Basic Usage"
        description="Each Menubar.Menu takes a target element and dropdown content. onOpenChange reports the opened menu index or null"
        variant="showcase"
      >
        <Stack spacing={12}>
          <Menubar onOpenChange={setOpenedIndex}>
            <Menubar.Menu
              target={
                <Button variant="subtle" size="xs" color="gray">
                  File
                </Button>
              }
              width={200}
            >
              <Paper shadow="md" radius="sm" p={0}>
                <Menubar.Label>File</Menubar.Label>
                <Menubar.Item onPress={() => setLastAction('New file')}>
                  <Text>New file</Text>
                </Menubar.Item>
                <Menubar.Item onPress={() => setLastAction('Open')}>
                  <Text>Open</Text>
                </Menubar.Item>
                <Menubar.Divider />
                <Menubar.Item onPress={() => setLastAction('Save')}>
                  <Text>Save</Text>
                </Menubar.Item>
              </Paper>
            </Menubar.Menu>

            <Menubar.Menu
              target={
                <Button variant="subtle" size="xs" color="gray">
                  Edit
                </Button>
              }
              width={200}
            >
              <Paper shadow="md" radius="sm" p={0}>
                <Menubar.Item onPress={() => setLastAction('Undo')}>
                  <Text>Undo</Text>
                </Menubar.Item>
                <Menubar.Item onPress={() => setLastAction('Redo')}>
                  <Text>Redo</Text>
                </Menubar.Item>
                <Menubar.Divider />
                <Menubar.Item onPress={() => setLastAction('Cut')}>
                  <Text>Cut</Text>
                </Menubar.Item>
                <Menubar.Item onPress={() => setLastAction('Copy')}>
                  <Text>Copy</Text>
                </Menubar.Item>
              </Paper>
            </Menubar.Menu>

            <Menubar.Menu
              target={
                <Button variant="subtle" size="xs" color="gray">
                  View
                </Button>
              }
              width={200}
            >
              <Paper shadow="md" radius="sm" p={0}>
                <Menubar.Item onPress={() => setLastAction('Zoom in')}>
                  <Text>Zoom in</Text>
                </Menubar.Item>
                <Menubar.Item onPress={() => setLastAction('Zoom out')}>
                  <Text>Zoom out</Text>
                </Menubar.Item>
              </Paper>
            </Menubar.Menu>
          </Menubar>
          <Text size="sm" color="dimmed">
            {`onOpenChange: ${
              openedIndex === null ? 'null' : openedIndex
            } / last action: ${lastAction}`}
          </Text>
        </Stack>
      </ExampleSection>

      <ExampleSection
        title="Items with Icons, Colors and Disabled State"
        description="Menubar.Item re-exports Menu.Item, so icon, color, onPress and disabled work the same way"
        variant="showcase"
      >
        <Menubar>
          <Menubar.Menu
            target={
              <Button variant="subtle" size="xs" color="gray">
                Actions
              </Button>
            }
            width={220}
          >
            <Paper shadow="md" radius="sm" p={0}>
              <Menubar.Label>Document</Menubar.Label>
              <Menubar.Item
                icon={<Icon name="edit" size={14} />}
                onPress={() => setLastAction('Rename')}
              >
                <Text>Rename</Text>
              </Menubar.Item>
              <Menubar.Item icon={<Icon name="save" size={14} />} disabled>
                <Text>Save (disabled)</Text>
              </Menubar.Item>
              <Menubar.Divider />
              <Menubar.Item
                color="red"
                icon={<Icon name="trash" size={14} color="#fa5252" />}
                onPress={() => setLastAction('Delete')}
              >
                <Text>Delete</Text>
              </Menubar.Item>
            </Paper>
          </Menubar.Menu>
        </Menubar>
      </ExampleSection>

      <ExampleSection
        title="Menubar Props"
        description="Complete reference of all available Menubar props"
      >
        <PropsTable props={menubarProps} />
      </ExampleSection>

      <ExampleSection
        title="Menubar.Menu Props"
        description="Wraps the existing Menu component, all Menu props are forwarded"
      >
        <PropsTable props={menubarMenuProps} />
      </ExampleSection>

      <ExampleSection
        title="Menubar.Item Props"
        description="Re-export of Menu.Item, also available: Menubar.Label and Menubar.Divider"
      >
        <PropsTable props={menubarItemProps} />
      </ExampleSection>

      <ExampleSection
        title="Usage Example"
        description="Basic implementation code"
      >
        <CodeBlock
          code={`import { Menubar } from 'react-native-mantine';

// Only one menu can be opened at a time
<Menubar onOpenChange={(index) => console.log(index)}>
  <Menubar.Menu target={<Button>File</Button>} width={200}>
    <Menubar.Label>File</Menubar.Label>
    <Menubar.Item onPress={newFile}>New file</Menubar.Item>
    <Menubar.Divider />
    <Menubar.Item onPress={save}>Save</Menubar.Item>
  </Menubar.Menu>

  <Menubar.Menu target={<Button>Edit</Button>} width={200}>
    <Menubar.Item onPress={undo}>Undo</Menubar.Item>
    <Menubar.Item disabled>Redo</Menubar.Item>
  </Menubar.Menu>
</Menubar>`}
        />
      </ExampleSection>
    </ExampleWrapper>
  );
};
