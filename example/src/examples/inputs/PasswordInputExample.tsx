import { useState } from 'react';
import { Alert } from 'react-native';
import { ExampleWrapper, ExampleSection, CodeBlock } from '../../components/ExampleWrapper';
import { PropsTable } from '../../components/PropsTable';
import { passwordInputProps } from '../../data/props/PasswordInputProps';
import {
  PasswordInput,
  Paper,
  Stack,
  Button,
  Group,
  Text,
  useForm,
  minLength,
  isNotEmpty,
} from 'react-native-mantine';

interface PasswordFormValues {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

const BasicPasswordInputExample = () => {
  const [password, setPassword] = useState('');

  return (
    <Paper p="md" radius="md">
      <Stack spacing={16}>
        <PasswordInput label="Password" placeholder="Enter password" />
        <PasswordInput
          label="Controlled Password Input"
          placeholder="Type password..."
          value={password}
          onChangeText={setPassword}
        />
        <Text size="sm" style={{ color: '#868e96' }}>
          Password length: {password.length}
        </Text>
      </Stack>
    </Paper>
  );
};

const PasswordFormExample = () => {
  const form = useForm<PasswordFormValues>({
    initialValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
    validate: {
      currentPassword: isNotEmpty('Current password is required'),
      newPassword: [
        isNotEmpty('New password is required'),
        minLength(8, 'Password must be at least 8 characters'),
        (value) => {
          if (!/(?=.*[a-z])/.test(value)) {
            return 'Password must contain at least one lowercase letter';
          }
          if (!/(?=.*[A-Z])/.test(value)) {
            return 'Password must contain at least one uppercase letter';
          }
          if (!/(?=.*\d)/.test(value)) {
            return 'Password must contain at least one number';
          }
          return null;
        },
      ],
      confirmPassword: (value) => {
        if (value !== form.values.newPassword) {
          return 'Passwords do not match';
        }
        return null;
      },
    },
    validateInputOnBlur: true,
  });

  const handleSubmit = () => {
    Alert.alert('Password Changed', 'Your password has been successfully updated');
    form.reset();
  };

  return (
    <Paper p="md" radius="md">
      <Stack spacing={15}>
        <Text weight="500" size="md">
          Change Password
        </Text>

        <PasswordInput
          label="Current Password"
          placeholder="Enter current password"
          value={form.values.currentPassword}
          onChangeText={(text) => form.setFieldValue('currentPassword', text)}
          error={form.errors.currentPassword}
          onBlur={() => form.setFieldTouched('currentPassword')}
        />

        <PasswordInput
          label="New Password"
          placeholder="Enter new password"
          value={form.values.newPassword}
          onChangeText={(text) => form.setFieldValue('newPassword', text)}
          error={form.errors.newPassword}
          onBlur={() => form.setFieldTouched('newPassword')}
        />

        <PasswordInput
          label="Confirm New Password"
          placeholder="Confirm new password"
          value={form.values.confirmPassword}
          onChangeText={(text) => form.setFieldValue('confirmPassword', text)}
          error={form.errors.confirmPassword}
          onBlur={() => form.setFieldTouched('confirmPassword')}
        />

        <Text size="xs" style={{ color: '#868e96' }}>
          Password must be at least 8 characters with uppercase, lowercase, and numbers
        </Text>

        <Group spacing={10}>
          <Button
            onPress={form.onSubmit(handleSubmit)}
            disabled={!form.isValid()}
          >
            Change Password
          </Button>
          <Button variant="outline" onPress={form.reset}>
            Cancel
          </Button>
        </Group>
      </Stack>
    </Paper>
  );
};

export const PasswordInputExample = () => {
  return (
    <ExampleWrapper
      title="PasswordInput"
      description="Secure password input with visibility toggle"
    >
      <ExampleSection
        title="Basic Usage"
        description="PasswordInput component with controlled state"
      >
        <BasicPasswordInputExample />
      </ExampleSection>

      <ExampleSection
        title="Form Integration"
        description="PasswordInput with complex validation in a password change form"
      >
        <PasswordFormExample />
      </ExampleSection>

      <ExampleSection
        title="Component Props"
        description="Complete reference of all available PasswordInput props"
      >
        <PropsTable props={passwordInputProps} />
      </ExampleSection>

      <ExampleSection
        title="Usage Example"
        description="Basic implementation code"
      >
        <CodeBlock
          code={`import { PasswordInput } from 'react-native-mantine';

<PasswordInput
  label="Password"
  placeholder="Enter password"
  required
  onChangeText={setPassword}
/>`}
        />
      </ExampleSection>
    </ExampleWrapper>
  );
};
