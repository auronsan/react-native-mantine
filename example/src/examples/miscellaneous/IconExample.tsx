import { ScrollView } from 'react-native';
import { PropsTable } from '../../components/PropsTable';
import { iconProps } from '../../data/props/IconProps';
import {
  Icon,
  Text,
  Group,
  Stack,
  Button,
  ActionIcon,
  ThemeIcon,
  TextInput,
  PasswordInput,
  Title,
  Paper,
} from 'react-native-mantine';

export function IconExample() {
  return (
    <ScrollView style={{ flex: 1 }}>
      <Stack spacing={16}>
        <Paper p={16}>
          <Title order={3} style={{ marginBottom: 16 }}>
            Basic Icons
          </Title>
          <Text style={{ marginBottom: 12 }}>FontAwesome icons in different sizes:</Text>
          <Group spacing={16}>
            <Icon name="heart" size={16} color="#e03131" />
            <Icon name="heart" size={20} color="#e03131" />
            <Icon name="heart" size={24} color="#e03131" />
            <Icon name="heart" size={32} color="#e03131" />
          </Group>
        </Paper>

        <Paper p={16}>
          <Title order={3} style={{ marginBottom: 16 }}>
            Different Icon Types
          </Title>
          <Group spacing={16}>
            <Stack spacing={8} style={{ alignItems: 'center' }}>
              <Icon name="home" size={24} useThemeColor />
              <Text size="xs">home</Text>
            </Stack>
            <Stack spacing={8} style={{ alignItems: 'center' }}>
              <Icon name="star" size={24} color="#ffd700" />
              <Text size="xs">star</Text>
            </Stack>
            <Stack spacing={8} style={{ alignItems: 'center' }}>
              <Icon name="user" size={24} color="#228be6" />
              <Text size="xs">user</Text>
            </Stack>
            <Stack spacing={8} style={{ alignItems: 'center' }}>
              <Icon name="cog" size={24} color="#868e96" />
              <Text size="xs">cog</Text>
            </Stack>
            <Stack spacing={8} style={{ alignItems: 'center' }}>
              <Icon name="bell" size={24} color="#fa5252" />
              <Text size="xs">bell</Text>
            </Stack>
            <Stack spacing={8} style={{ alignItems: 'center' }}>
              <Icon name="envelope" size={24} color="#40c057" />
              <Text size="xs">envelope</Text>
            </Stack>
          </Group>
        </Paper>

        <Paper p={16}>
          <Title order={3} style={{ marginBottom: 16 }}>
            Icons in Buttons
          </Title>
          <Stack spacing={12}>
            <Button
              leftIcon={<Icon name="download" size={16} color="white" />}
            >
              Download
            </Button>
            <Button
              variant="outline"
              rightIcon={<Icon name="arrow-right" size={16} />}
            >
              Next
            </Button>
            <Button
              color="red"
              leftIcon={<Icon name="trash" size={16} color="white" />}
            >
              Delete
            </Button>
            <Button
              color="green"
              leftIcon={<Icon name="check" size={16} color="white" />}
              rightIcon={<Icon name="save" size={16} color="white" />}
            >
              Save Changes
            </Button>
          </Stack>
        </Paper>

        <Paper p={16}>
          <Title order={3} style={{ marginBottom: 16 }}>
            ActionIcon Examples
          </Title>
          <Group spacing={16}>
            <ActionIcon variant="filled">
              <Icon name="heart" size={18} color="white" />
            </ActionIcon>
            <ActionIcon variant="light">
              <Icon name="star" size={18} color="#228be6" />
            </ActionIcon>
            <ActionIcon variant="outline">
              <Icon name="search" size={18} useThemeColor />
            </ActionIcon>
            <ActionIcon variant="transparent">
              <Icon name="cog" size={18} useThemeColor />
            </ActionIcon>
            <ActionIcon variant="default">
              <Icon name="share" size={18} useThemeColor />
            </ActionIcon>
          </Group>
        </Paper>

        <Paper p={16}>
          <Title order={3} style={{ marginBottom: 16 }}>
            ThemeIcon Examples
          </Title>
          <Group spacing={16}>
            <ThemeIcon variant="filled" color="blue">
              <Icon name="user" size={16} color="white" />
            </ThemeIcon>
            <ThemeIcon variant="light" color="red">
              <Icon name="heart" size={16} color="#e03131" />
            </ThemeIcon>
            <ThemeIcon variant="outline" color="green">
              <Icon name="check" size={16} color="#40c057" />
            </ThemeIcon>
            <ThemeIcon variant="gradient" gradient={{ from: 'blue', to: 'cyan' }}>
              <Icon name="rocket" size={16} color="white" />
            </ThemeIcon>
          </Group>
        </Paper>

        <Paper p={16}>
          <Title order={3} style={{ marginBottom: 16 }}>
            Icons in Text Inputs
          </Title>
          <Stack spacing={16}>
            <TextInput
              label="Email"
              placeholder="your@email.com"
              icon={<Icon name="envelope" size={16} useThemeColor />}
            />
            <TextInput
              label="Search"
              placeholder="Search..."
              icon={<Icon name="search" size={16} useThemeColor />}
            />
            <TextInput
              label="Username"
              placeholder="Enter username"
              icon={<Icon name="user" size={16} useThemeColor />}
            />
            <PasswordInput
              label="Password"
              placeholder="Enter password"
            />
          </Stack>
        </Paper>

        <Paper p={16}>
          <Title order={3} style={{ marginBottom: 16 }}>
            Social Media Icons
          </Title>
          <Group spacing={16}>
            <Icon name="facebook" size={32} color="#1877f2" />
            <Icon name="twitter" size={32} color="#1da1f2" />
            <Icon name="instagram" size={32} color="#e4405f" />
            <Icon name="linkedin" size={32} color="#0077b5" />
            <Icon name="github" size={32} useThemeColor />
            <Icon name="youtube" size={32} color="#ff0000" />
          </Group>
        </Paper>

        <Paper p={16}>
          <Title order={3} style={{ marginBottom: 16 }}>
            Action Icons
          </Title>
          <Group spacing={16}>
            <Stack spacing={8} style={{ alignItems: 'center' }}>
              <Icon name="edit" size={24} color="#228be6" />
              <Text size="xs">Edit</Text>
            </Stack>
            <Stack spacing={8} style={{ alignItems: 'center' }}>
              <Icon name="trash" size={24} color="#fa5252" />
              <Text size="xs">Delete</Text>
            </Stack>
            <Stack spacing={8} style={{ alignItems: 'center' }}>
              <Icon name="share" size={24} color="#40c057" />
              <Text size="xs">Share</Text>
            </Stack>
            <Stack spacing={8} style={{ alignItems: 'center' }}>
              <Icon name="download" size={24} color="#7950f2" />
              <Text size="xs">Download</Text>
            </Stack>
            <Stack spacing={8} style={{ alignItems: 'center' }}>
              <Icon name="upload" size={24} color="#f59f00" />
              <Text size="xs">Upload</Text>
            </Stack>
          </Group>
        </Paper>

        <Paper p={16}>
          <Title order={3} style={{ marginBottom: 16 }}>
            Component Props
          </Title>
          <PropsTable props={iconProps} />
        </Paper>
      </Stack>
    </ScrollView>
  );
}
