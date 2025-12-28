import { useState } from 'react';
import { Alert } from 'react-native';
import { ExampleWrapper, ExampleSection } from '../../components/ExampleWrapper';
import {
  Checkbox,
  Stack,
  Paper,
  Button,
  Group,
  Text,
  Divider,
  useForm,
} from 'react-native-mantine';

interface PreferencesFormValues {
  terms: boolean;
  newsletter: boolean;
  marketing: boolean;
  updates: boolean;
}

const BasicCheckboxExample = () => {
  const [checked, setChecked] = useState(false);
  const [indeterminate, setIndeterminate] = useState(false);

  return (
    <Paper p="md" radius="md">
      <Stack spacing={16}>
        <Checkbox label="Accept terms and conditions" />
        <Checkbox label="Subscribe to newsletter" checked />
        <Checkbox
          label="Controlled checkbox"
          checked={checked}
          onChange={setChecked}
        />
        <Checkbox
          label="Indeterminate state"
          checked={checked}
          indeterminate={indeterminate}
          onChange={(val) => {
            setChecked(val);
            setIndeterminate(false);
          }}
        />
        <Button
          variant="outline"
          size="sm"
          onPress={() => setIndeterminate(!indeterminate)}
        >
          Toggle Indeterminate
        </Button>
        <Text size="sm" style={{ color: '#868e96' }}>
          Controlled checkbox is: {checked ? 'CHECKED' : 'UNCHECKED'}
        </Text>
      </Stack>
    </Paper>
  );
};

const CheckboxFormExample = () => {
  const form = useForm<PreferencesFormValues>({
    initialValues: {
      terms: false,
      newsletter: false,
      marketing: false,
      updates: true,
    },
    validate: {
      terms: (value) =>
        value ? null : 'You must accept the terms and conditions',
    },
  });

  const handleSubmit = (values: PreferencesFormValues) => {
    Alert.alert('Preferences Saved', JSON.stringify(values, null, 2));
  };

  return (
    <Paper p="md" radius="md">
      <Stack spacing={15}>
        <Text weight="500" size="md">
          User Preferences
        </Text>

        <Stack spacing={5}>
          <Checkbox
            label="I accept the terms and conditions"
            checked={form.values.terms}
            onChange={(value) => form.setFieldValue('terms', value)}
          />
          {form.errors.terms && (
            <Text size="xs" style={{ color: '#fa5252' }}>
              {form.errors.terms}
            </Text>
          )}
        </Stack>

        <Checkbox
          label="Send me newsletter emails"
          checked={form.values.newsletter}
          onChange={(value) => form.setFieldValue('newsletter', value)}
        />

        <Checkbox
          label="Send me marketing emails"
          checked={form.values.marketing}
          onChange={(value) => form.setFieldValue('marketing', value)}
        />

        <Checkbox
          label="Send me product updates"
          checked={form.values.updates}
          onChange={(value) => form.setFieldValue('updates', value)}
        />

        <Divider />

        <Text size="sm" style={{ color: '#868e96' }}>
          Form is {form.isDirty() ? 'modified' : 'unmodified'} | Valid:{' '}
          {form.isValid() ? 'Yes' : 'No'}
        </Text>

        <Group spacing={10}>
          <Button
            onPress={form.onSubmit(handleSubmit)}
            disabled={!form.isValid()}
          >
            Save Preferences
          </Button>
          <Button variant="outline" onPress={form.reset}>
            Reset
          </Button>
        </Group>
      </Stack>
    </Paper>
  );
};

export const CheckboxExample = () => {
  return (
    <ExampleWrapper
      title="Checkbox"
      description="Checkbox with indeterminate state"
    >
      <ExampleSection
        title="Basic Usage"
        description="Checkbox component with controlled state and indeterminate"
      >
        <BasicCheckboxExample />
      </ExampleSection>

      <ExampleSection
        title="Form Integration"
        description="Checkbox components integrated with useForm hook and validation"
      >
        <CheckboxFormExample />
      </ExampleSection>
    </ExampleWrapper>
  );
};
