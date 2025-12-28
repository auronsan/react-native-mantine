import { useState } from 'react';
import { Alert } from 'react-native';
import { ExampleWrapper, ExampleSection } from '../../components/ExampleWrapper';
import {
  Stack,
  Switch,
  Paper,
  Button,
  Group,
  Text,
  Divider,
  useForm,
} from 'react-native-mantine';

interface SettingsFormValues {
  notifications: boolean;
  darkMode: boolean;
  analytics: boolean;
  newsletter: boolean;
}

const BasicSwitchExample = () => {
  const [notifications, setNotifications] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [autoSave, setAutoSave] = useState(false);

  return (
    <Paper p="md" radius="md">
      <Stack spacing={16}>
        <Text size="sm" weight="500">
          All switches are controlled components
        </Text>

        <Switch
          label="Enable notifications"
          checked={notifications}
          onChange={setNotifications}
        />

        <Switch
          label="Dark mode"
          checked={darkMode}
          onChange={setDarkMode}
        />

        <Switch
          label="Auto-save (disabled)"
          checked={autoSave}
          onChange={setAutoSave}
          disabled
        />

        <Text size="sm" style={{ color: '#868e96' }}>
          Notifications: {notifications ? 'ON' : 'OFF'} | Dark mode: {darkMode ? 'ON' : 'OFF'}
        </Text>
      </Stack>
    </Paper>
  );
};

const SwitchFormExample = () => {
  const form = useForm<SettingsFormValues>({
    initialValues: {
      notifications: true,
      darkMode: false,
      analytics: false,
      newsletter: false,
    },
  });

  const handleSubmit = (values: SettingsFormValues) => {
    Alert.alert('Settings Saved', JSON.stringify(values, null, 2));
  };

  return (
    <Paper p="md" radius="md">
      <Stack spacing={15}>
        <Text weight="500" size="md">
          User Settings
        </Text>

        <Switch
          label="Enable push notifications"
          checked={form.values.notifications}
          onChange={(value) => form.setFieldValue('notifications', value)}
        />

        <Switch
          label="Dark mode"
          checked={form.values.darkMode}
          onChange={(value) => form.setFieldValue('darkMode', value)}
        />

        <Switch
          label="Analytics and data collection"
          checked={form.values.analytics}
          onChange={(value) => form.setFieldValue('analytics', value)}
        />

        <Switch
          label="Subscribe to newsletter"
          checked={form.values.newsletter}
          onChange={(value) => form.setFieldValue('newsletter', value)}
        />

        <Divider />

        <Text size="sm" style={{ color: '#868e96' }}>
          Form is {form.isDirty() ? 'modified' : 'unmodified'}
        </Text>

        <Group spacing={10}>
          <Button onPress={form.onSubmit(handleSubmit)}>Save Settings</Button>
          <Button variant="outline" onPress={form.reset}>
            Reset
          </Button>
        </Group>
      </Stack>
    </Paper>
  );
};

export const SwitchExample = () => {
  return (
    <ExampleWrapper
      title="Switch"
      description="Toggle switch with labels"
    >
      <ExampleSection
        title="Basic Usage"
        description="Switch component with controlled state (React Native doesn't support uncontrolled inputs)"
      >
        <BasicSwitchExample />
      </ExampleSection>

      <ExampleSection
        title="Form Integration"
        description="Switch components integrated with useForm hook"
      >
        <SwitchFormExample />
      </ExampleSection>
    </ExampleWrapper>
  );
};
