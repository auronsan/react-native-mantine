import { useState } from 'react';
import { Alert } from 'react-native';
import { ExampleWrapper, ExampleSection, CodeBlock } from '../../components/ExampleWrapper';
import { PropsTable } from '../../components/PropsTable';
import { textInputProps } from '../../data/props/TextInputProps';
import {
  TextInput,
  Paper,
  Stack,
  Button,
  Group,
  Text,
  useForm,
  isEmail,
  isNotEmpty,
} from 'react-native-mantine';

interface ContactFormValues {
  name: string;
  email: string;
  phone: string;
}

const BasicTextInputExample = () => {
  const [value, setValue] = useState('');

  return (
    <Paper p="md" radius="md">
      <Stack spacing={16}>
        <TextInput label="Email" placeholder="your@email.com" />
        <TextInput
          label="Controlled Input"
          placeholder="Type something..."
          value={value}
          onChangeText={setValue}
        />
        <Text size="sm" style={{ color: '#868e96' }}>
          Value: {value}
        </Text>
      </Stack>
    </Paper>
  );
};

const TextInputFormExample = () => {
  const form = useForm<ContactFormValues>({
    initialValues: {
      name: '',
      email: '',
      phone: '',
    },
    validate: {
      name: isNotEmpty('Name is required'),
      email: isEmail('Invalid email address'),
      phone: (value) => {
        if (!value) return 'Phone is required';
        if (!/^\d{10,}$/.test(value.replace(/\D/g, ''))) {
          return 'Phone must be at least 10 digits';
        }
        return null;
      },
    },
  });

  const handleSubmit = (values: ContactFormValues) => {
    Alert.alert('Form Submitted', JSON.stringify(values, null, 2));
  };

  return (
    <Paper p="md" radius="md">
      <Stack spacing={15}>
        <TextInput
          label="Name"
          placeholder="John Doe"
          value={form.values.name}
          onChangeText={(text) => form.setFieldValue('name', text)}
          error={form.errors.name}
          onBlur={() => form.setFieldTouched('name')}
        />

        <TextInput
          label="Email"
          placeholder="your@email.com"
          keyboardType="email-address"
          value={form.values.email}
          onChangeText={(text) => form.setFieldValue('email', text)}
          error={form.errors.email}
          onBlur={() => form.setFieldTouched('email')}
        />

        <TextInput
          label="Phone"
          placeholder="(555) 123-4567"
          keyboardType="phone-pad"
          value={form.values.phone}
          onChangeText={(text) => form.setFieldValue('phone', text)}
          error={form.errors.phone}
          onBlur={() => form.setFieldTouched('phone')}
        />

        <Group spacing={10}>
          <Button onPress={form.onSubmit(handleSubmit)}>Submit</Button>
          <Button variant="outline" onPress={form.reset}>
            Reset
          </Button>
        </Group>
      </Stack>
    </Paper>
  );
};

export const TextInputExample = () => {
  return (
    <ExampleWrapper
      title="TextInput"
      description="Single-line text input with validation"
    >
      <ExampleSection
        title="Basic Usage"
        description="TextInput component with controlled state"
      >
        <BasicTextInputExample />
      </ExampleSection>

      <ExampleSection
        title="Form Integration"
        description="TextInput components integrated with useForm hook"
      >
        <TextInputFormExample />
      </ExampleSection>

      <ExampleSection
        title="Component Props"
        description="Complete reference of all available TextInput props"
      >
        <PropsTable props={textInputProps} />
      </ExampleSection>

      <ExampleSection
        title="Usage Example"
        description="Basic implementation code"
      >
        <CodeBlock
          code={`import { TextInput } from 'react-native-mantine';

// Basic TextInput
<TextInput
  label="Email"
  placeholder="your@email.com"
  value={email}
  onChangeText={setEmail}
/>

// With description and error
<TextInput
  label="Password"
  description="Must be at least 8 characters"
  placeholder="Enter password"
  secureTextEntry
  error={error}
  required
/>

// With icon and right section
<TextInput
  label="Search"
  placeholder="Type to search..."
  icon={<SearchIcon />}
  rightSection={<ClearButton />}
/>`}
        />
      </ExampleSection>
    </ExampleWrapper>
  );
};
