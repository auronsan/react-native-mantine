import { useState } from 'react';
import { Alert } from 'react-native';
import { ExampleWrapper, ExampleSection } from '../../components/ExampleWrapper';
import {
  Select,
  Paper,
  Stack,
  Button,
  Group,
  Text,
  useForm,
  isNotEmpty,
} from 'react-native-mantine';

interface ProfileFormValues {
  country: string;
  language: string;
  timezone: string;
}

const BasicSelectExample = () => {
  const [value, setValue] = useState('');

  return (
    <Paper p="md" radius="md">
      <Stack spacing={16}>
        <Select
          label="Choose framework"
          data={['React', 'Angular', 'Vue', 'Svelte']}
          placeholder="Pick one"
        />
        <Select
          label="Controlled Select"
          data={[
            { value: 'react', label: 'React' },
            { value: 'vue', label: 'Vue' },
            { value: 'angular', label: 'Angular' },
            { value: 'svelte', label: 'Svelte' },
          ]}
          value={value}
          onChange={setValue}
          placeholder="Pick one"
        />
        <Text size="sm" style={{ color: '#868e96' }}>
          Selected: {value || 'None'}
        </Text>
      </Stack>
    </Paper>
  );
};

const SelectFormExample = () => {
  const form = useForm<ProfileFormValues>({
    initialValues: {
      country: '',
      language: '',
      timezone: '',
    },
    validate: {
      country: isNotEmpty('Please select a country'),
      language: isNotEmpty('Please select a language'),
      timezone: isNotEmpty('Please select a timezone'),
    },
  });

  const handleSubmit = (values: ProfileFormValues) => {
    Alert.alert('Profile Updated', JSON.stringify(values, null, 2));
  };

  return (
    <Paper p="md" radius="md">
      <Stack spacing={15}>
        <Text weight="500" size="md">
          Profile Settings
        </Text>

        <Select
          label="Country"
          placeholder="Select your country"
          data={[
            { value: 'us', label: 'United States' },
            { value: 'uk', label: 'United Kingdom' },
            { value: 'ca', label: 'Canada' },
            { value: 'au', label: 'Australia' },
            { value: 'de', label: 'Germany' },
            { value: 'fr', label: 'France' },
            { value: 'jp', label: 'Japan' },
            { value: 'br', label: 'Brazil' },
          ]}
          value={form.values.country}
          onChange={(value) => form.setFieldValue('country', value)}
          error={form.errors.country}
        />

        <Select
          label="Preferred Language"
          placeholder="Select your language"
          data={[
            { value: 'en', label: 'English' },
            { value: 'es', label: 'Spanish' },
            { value: 'fr', label: 'French' },
            { value: 'de', label: 'German' },
            { value: 'ja', label: 'Japanese' },
            { value: 'pt', label: 'Portuguese' },
          ]}
          value={form.values.language}
          onChange={(value) => form.setFieldValue('language', value)}
          error={form.errors.language}
        />

        <Select
          label="Timezone"
          placeholder="Select your timezone"
          data={[
            { value: 'pst', label: 'Pacific Standard Time (PST)' },
            { value: 'mst', label: 'Mountain Standard Time (MST)' },
            { value: 'cst', label: 'Central Standard Time (CST)' },
            { value: 'est', label: 'Eastern Standard Time (EST)' },
            { value: 'gmt', label: 'Greenwich Mean Time (GMT)' },
            { value: 'cet', label: 'Central European Time (CET)' },
            { value: 'jst', label: 'Japan Standard Time (JST)' },
          ]}
          value={form.values.timezone}
          onChange={(value) => form.setFieldValue('timezone', value)}
          error={form.errors.timezone}
        />

        <Text size="sm" style={{ color: '#868e96' }}>
          Valid: {form.isValid() ? 'Yes' : 'No'} | Dirty:{' '}
          {form.isDirty() ? 'Yes' : 'No'}
        </Text>

        <Group spacing={10}>
          <Button
            onPress={form.onSubmit(handleSubmit)}
            disabled={!form.isValid()}
          >
            Save Settings
          </Button>
          <Button variant="outline" onPress={form.reset}>
            Reset
          </Button>
        </Group>
      </Stack>
    </Paper>
  );
};

export const SelectExample = () => {
  return (
    <ExampleWrapper
      title="Select"
      description="Searchable select dropdown"
    >
      <ExampleSection
        title="Basic Usage"
        description="Select component with controlled state"
      >
        <BasicSelectExample />
      </ExampleSection>

      <ExampleSection
        title="Form Integration"
        description="Select components integrated with useForm hook"
      >
        <SelectFormExample />
      </ExampleSection>
    </ExampleWrapper>
  );
};
