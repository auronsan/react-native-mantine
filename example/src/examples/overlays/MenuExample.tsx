import { ExampleWrapper, ExampleSection, CodeBlock } from '../../components/ExampleWrapper';
import { PropsTable } from '../../components/PropsTable';
import { menuProps } from '../../data/props/MenuProps';
import { Button, Menu, Text, Paper } from 'react-native-mantine';

export const MenuExample = () => {
  return (
    <ExampleWrapper
      title="Menu"
      description="Dropdown menu with items, labels, and dividers"
    >
      <ExampleSection
        title="Basic Menu"
        description="Simple dropdown menu with items"
        variant="showcase"
      >
        <Menu>
          <Menu.Target>
            <Button>
              Open Menu
            </Button>
          </Menu.Target>

          <Menu.Dropdown>
            <Paper shadow="md" radius="sm" p={0}>
              <Menu.Item onPress={() => console.log('Settings')}>
                <Text>Settings</Text>
              </Menu.Item>
              <Menu.Item onPress={() => console.log('Messages')}>
                <Text>Messages</Text>
              </Menu.Item>
              <Menu.Item onPress={() => console.log('Gallery')}>
                <Text>Gallery</Text>
              </Menu.Item>
              <Menu.Divider />
              <Menu.Item color="red" onPress={() => console.log('Delete')}>
                <Text>Delete my account</Text>
              </Menu.Item>
            </Paper>
          </Menu.Dropdown>
        </Menu>
      </ExampleSection>

      <ExampleSection
        title="Menu with Labels"
        description="Organized menu with section labels"
        variant="showcase"
      >
        <Menu>
          <Menu.Target>
            <Button color="grape">
              Actions Menu
            </Button>
          </Menu.Target>

          <Menu.Dropdown>
            <Paper shadow="md" radius="sm" p={0}>
              <Menu.Label>Application</Menu.Label>
              <Menu.Item onPress={() => console.log('Settings')}>
                <Text>Settings</Text>
              </Menu.Item>
              <Menu.Item onPress={() => console.log('Messages')}>
                <Text>Messages</Text>
              </Menu.Item>

              <Menu.Divider />

              <Menu.Label>Account</Menu.Label>
              <Menu.Item onPress={() => console.log('Profile')}>
                <Text>Profile</Text>
              </Menu.Item>
              <Menu.Item onPress={() => console.log('Logout')}>
                <Text>Logout</Text>
              </Menu.Item>
            </Paper>
          </Menu.Dropdown>
        </Menu>
      </ExampleSection>

      <ExampleSection
        title="Disabled Items"
        description="Menu with disabled items"
        variant="showcase"
      >
        <Menu>
          <Menu.Target>
            <Button color="teal">
              File Menu
            </Button>
          </Menu.Target>

          <Menu.Dropdown>
            <Paper shadow="md" radius="sm" p={0}>
              <Menu.Item onPress={() => console.log('New file')}>
                <Text>New file</Text>
              </Menu.Item>
              <Menu.Item onPress={() => console.log('Open')}>
                <Text>Open</Text>
              </Menu.Item>
              <Menu.Item disabled>
                <Text>Save (Coming soon)</Text>
              </Menu.Item>
              <Menu.Divider />
              <Menu.Item onPress={() => console.log('Export')}>
                <Text>Export</Text>
              </Menu.Item>
            </Paper>
          </Menu.Dropdown>
        </Menu>
      </ExampleSection>

      <ExampleSection
        title="Usage Example"
        description="Basic implementation code"
      >
        <CodeBlock
          code={`import { Menu, Button, Text, Paper } from 'react-native-mantine';

const MyComponent = () => {
  return (
    <Menu>
      <Menu.Target>
        <Button>Open Menu</Button>
      </Menu.Target>

      <Menu.Dropdown>
        <Paper shadow="md" p={0}>
          <Menu.Item onPress={() => console.log('Item 1')}>
            <Text>Menu Item 1</Text>
          </Menu.Item>
          <Menu.Item onPress={() => console.log('Item 2')}>
            <Text>Menu Item 2</Text>
          </Menu.Item>
          <Menu.Divider />
          <Menu.Item color="red">
            <Text>Delete</Text>
          </Menu.Item>
        </Paper>
      </Menu.Dropdown>
    </Menu>
  );
};`}
        />
      </ExampleSection>

      <ExampleSection
        title="Component Props"
        description="Complete reference of all available Menu props"
      >
        <PropsTable props={menuProps} />
      </ExampleSection>
    </ExampleWrapper>
  );
};
