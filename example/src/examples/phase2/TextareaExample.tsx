import { useState } from 'react';
import { Alert } from 'react-native';
import { ExampleWrapper, ExampleSection } from '../../components/ExampleWrapper';
import {
  Textarea,
  Paper,
  Stack,
  Button,
  Group,
  Text,
  useForm,
  minLength,
  maxLength,
  isNotEmpty,
} from 'react-native-mantine';

interface FeedbackFormValues {
  feedback: string;
  suggestions: string;
}

const BasicTextareaExample = () => {
  const [text, setText] = useState('');

  return (
    <Paper p="md" radius="md">
      <Stack spacing={16}>
        <Textarea
          label="Description"
          placeholder="Enter your description..."
          minRows={3}
        />
        <Textarea
          label="Controlled Textarea"
          placeholder="Type your message..."
          value={text}
          onChangeText={setText}
          minRows={4}
        />
        <Text size="sm" style={{ color: '#868e96' }}>
          Character count: {text.length}
        </Text>
      </Stack>
    </Paper>
  );
};

const TextareaFormExample = () => {
  const form = useForm<FeedbackFormValues>({
    initialValues: {
      feedback: '',
      suggestions: '',
    },
    validate: {
      feedback: [
        isNotEmpty('Feedback is required'),
        minLength(20, 'Feedback must be at least 20 characters'),
        maxLength(500, 'Feedback must not exceed 500 characters'),
      ],
      suggestions: maxLength(300, 'Suggestions must not exceed 300 characters'),
    },
    validateInputOnBlur: true,
  });

  const handleSubmit = () => {
    Alert.alert('Feedback Submitted', 'Thank you for your feedback!');
    form.reset();
  };

  return (
    <Paper p="md" radius="md">
      <Stack spacing={15}>
        <Text weight="500" size="md">
          Product Feedback Form
        </Text>

        <Stack spacing={5}>
          <Textarea
            label="Your Feedback"
            placeholder="Tell us what you think about our product..."
            value={form.values.feedback}
            onChangeText={(text) => form.setFieldValue('feedback', text)}
            error={form.errors.feedback}
            onBlur={() => form.setFieldTouched('feedback')}
            minRows={4}
          />
          <Text size="xs" style={{ color: '#868e96' }}>
            {form.values.feedback.length}/500 characters (minimum 20)
          </Text>
        </Stack>

        <Stack spacing={5}>
          <Textarea
            label="Suggestions (Optional)"
            placeholder="Any suggestions for improvement?"
            value={form.values.suggestions}
            onChangeText={(text) => form.setFieldValue('suggestions', text)}
            error={form.errors.suggestions}
            onBlur={() => form.setFieldTouched('suggestions')}
            minRows={3}
          />
          <Text size="xs" style={{ color: '#868e96' }}>
            {form.values.suggestions.length}/300 characters
          </Text>
        </Stack>

        <Group spacing={10}>
          <Button
            onPress={form.onSubmit(handleSubmit)}
            disabled={!form.isValid()}
          >
            Submit Feedback
          </Button>
          <Button variant="outline" onPress={form.reset}>
            Clear
          </Button>
        </Group>
      </Stack>
    </Paper>
  );
};

export const TextareaExample = () => {
  return (
    <ExampleWrapper
      title="Textarea"
      description="Multi-line text input with auto-resize"
    >
      <ExampleSection
        title="Basic Usage"
        description="Textarea component with controlled state"
      >
        <BasicTextareaExample />
      </ExampleSection>

      <ExampleSection
        title="Form Integration"
        description="Textarea with character count and validation"
      >
        <TextareaFormExample />
      </ExampleSection>
    </ExampleWrapper>
  );
};
