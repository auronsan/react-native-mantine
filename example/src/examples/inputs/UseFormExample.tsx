import { useState } from 'react';
import { ScrollView, Alert } from 'react-native';
import { ExampleWrapper, ExampleSection } from '../../components/ExampleWrapper';
import {
  TextInput,
  Button,
  Paper,
  Stack,
  Group,
  Checkbox,
  Radio,
  Select,
  Text,
  Divider,
  useForm,
  isNotEmpty,
  isEmail,
  minLength,
  maxLength,
} from 'react-native-mantine';

interface LoginFormValues {
  email: string;
  password: string;
}

interface RegistrationFormValues {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  age: string;
  country: string;
  terms: boolean;
  newsletter: boolean;
}

interface SurveyFormValues {
  name: string;
  rating: string;
  category: string;
  comments: string;
}

const BasicLoginForm = () => {
  const form = useForm<LoginFormValues>({
    initialValues: {
      email: '',
      password: '',
    },
    validate: {
      email: isEmail('Invalid email address'),
      password: minLength(6, 'Password must be at least 6 characters'),
    },
    validateInputOnBlur: true,
  });

  const handleSubmit = (values: LoginFormValues) => {
    Alert.alert('Login Success', JSON.stringify(values, null, 2));
  };

  return (
    <Paper p="md" radius="md">
      <Stack spacing={15}>
        <Text size="sm" style={{ color: '#868e96', marginBottom: 10 }}>
          Uses getInputProps for simplified field binding with automatic validation on blur
        </Text>

        <TextInput
          label="Email"
          placeholder="your@email.com"
          {...form.getInputProps('email')}
        />

        <TextInput
          label="Password"
          placeholder="Your password"
          secureTextEntry
          {...form.getInputProps('password')}
        />

        <Group spacing={10}>
          <Button onPress={form.onSubmit(handleSubmit)}>Login</Button>
          <Button variant="outline" onPress={form.reset}>
            Reset
          </Button>
        </Group>

        {Object.keys(form.errors).length > 0 && (
          <Paper p="sm" style={{ backgroundColor: '#fee' }}>
            <Text size="sm" style={{ color: '#fa5252' }}>
              Please fix the errors above
            </Text>
          </Paper>
        )}

        <Text size="xs" style={{ color: '#868e96' }}>
          Email valid: {form.isValid('email') ? 'Yes' : 'No'} | Password valid:{' '}
          {form.isValid('password') ? 'Yes' : 'No'}
        </Text>
      </Stack>
    </Paper>
  );
};

const RegistrationForm = () => {
  const form = useForm<RegistrationFormValues>({
    initialValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      age: '',
      country: '',
      terms: false,
      newsletter: false,
    },
    validate: {
      username: [
        isNotEmpty('Username is required'),
        minLength(3, 'Username must be at least 3 characters'),
        maxLength(20, 'Username must be at most 20 characters'),
      ],
      email: [isNotEmpty('Email is required'), isEmail('Invalid email address')],
      password: [
        isNotEmpty('Password is required'),
        minLength(8, 'Password must be at least 8 characters'),
      ],
      confirmPassword: (value) => {
        if (value !== form.values.password) {
          return 'Passwords do not match';
        }
        return null;
      },
      age: (value) => {
        const ageNum = parseInt(value, 10);
        if (isNaN(ageNum)) {
          return 'Age must be a number';
        }
        if (ageNum < 18) {
          return 'You must be at least 18 years old';
        }
        if (ageNum > 120) {
          return 'Please enter a valid age';
        }
        return null;
      },
      country: isNotEmpty('Please select a country'),
      terms: (value) => (value ? null : 'You must accept the terms and conditions'),
    },
  });

  const handleSubmit = (values: RegistrationFormValues) => {
    Alert.alert('Registration Success', JSON.stringify(values, null, 2));
    form.reset();
  };

  return (
    <Paper p="md" radius="md">
      <Stack spacing={15}>
        <TextInput
          label="Username"
          placeholder="johndoe"
          value={form.values.username}
          onChangeText={(text) => form.setFieldValue('username', text)}
          error={form.errors.username}
          onBlur={() => form.setFieldTouched('username')}
        />

        <TextInput
          label="Email"
          placeholder="your@email.com"
          value={form.values.email}
          onChangeText={(text) => form.setFieldValue('email', text)}
          error={form.errors.email}
          onBlur={() => form.setFieldTouched('username')}
        />

        <TextInput
          label="Password"
          placeholder="Enter password"
          secureTextEntry
          value={form.values.password}
          onChangeText={(text) => form.setFieldValue('password', text)}
          error={form.errors.password}
          onBlur={() => form.setFieldTouched('password')}
        />

        <TextInput
          label="Confirm Password"
          placeholder="Confirm password"
          secureTextEntry
          value={form.values.confirmPassword}
          onChangeText={(text) => form.setFieldValue('confirmPassword', text)}
          error={form.errors.confirmPassword}
          onBlur={() => form.setFieldTouched('confirmPassword')}
        />

        <TextInput
          label="Age"
          placeholder="Enter your age"
          keyboardType="numeric"
          value={form.values.age}
          onChangeText={(text) => form.setFieldValue('age', text)}
          error={form.errors.age}
          onBlur={() => form.setFieldTouched('age')}
        />

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
          ]}
          value={form.values.country}
          onChange={(value) => form.setFieldValue('country', value)}
          error={form.errors.country}
        />

        <Stack spacing={5}>
          <Checkbox
            label="I accept terms and conditions"
            checked={form.values.terms}
            onChange={(checked) => form.setFieldValue('terms', checked)}
          />
          {form.errors.terms && (
            <Text size="xs" style={{ color: '#fa5252' }}>
              {form.errors.terms}
            </Text>
          )}
        </Stack>

        <Checkbox
          label="Subscribe to newsletter"
          checked={form.values.newsletter}
          onChange={(checked) => form.setFieldValue('newsletter', checked)}
        />

        <Group spacing={10}>
          <Button
            onPress={form.onSubmit(handleSubmit)}
            disabled={!form.isValid()}
          >
            Register
          </Button>
          <Button variant="outline" onPress={form.reset}>
            Clear Form
          </Button>
        </Group>

        {form.isDirty() && (
          <Text size="xs" style={{ color: '#868e96' }}>
            Form has unsaved changes
          </Text>
        )}
      </Stack>
    </Paper>
  );
};

const SurveyForm = () => {
  const [submitted, setSubmitted] = useState(false);

  const form = useForm<SurveyFormValues>({
    initialValues: {
      name: '',
      rating: '',
      category: '',
      comments: '',
    },
    validate: {
      name: isNotEmpty('Name is required'),
      rating: isNotEmpty('Please select a rating'),
      category: isNotEmpty('Please select a category'),
      comments: [
        isNotEmpty('Comments are required'),
        minLength(10, 'Comments must be at least 10 characters'),
        maxLength(500, 'Comments must be at most 500 characters'),
      ],
    },
    validateInputOnChange: false,
    validateInputOnBlur: true,
  });

  const handleSubmit = () => {
    setSubmitted(true);
    Alert.alert('Survey Submitted', 'Thank you for your feedback!');
    setTimeout(() => {
      form.reset();
      setSubmitted(false);
    }, 2000);
  };

  return (
    <Paper p="md" radius="md">
      <Stack spacing={15}>
        <TextInput
          label="Your Name"
          placeholder="John Doe"
          value={form.values.name}
          onChangeText={(text) => form.setFieldValue('name', text)}
          error={form.errors.name}
          onBlur={() => form.setFieldTouched('name')}
        />

        <Stack spacing={5}>
          <Text weight="500" size="sm">
            How would you rate our service?
          </Text>
          <Radio.Group
            value={form.values.rating}
            onChange={(val) => form.setFieldValue('rating', val)}
          >
            <Radio label="1 (Poor)" value="1" />
            <Radio label="2" value="2" />
            <Radio label="3" value="3" />
            <Radio label="4" value="4" />
            <Radio label="5 (Excellent)" value="5" />
          </Radio.Group>
          {form.errors.rating && (
            <Text size="xs" style={{ color: '#fa5252' }}>
              {form.errors.rating}
            </Text>
          )}
        </Stack>

        <Select
          label="Category"
          placeholder="Select a category"
          data={[
            { value: 'product', label: 'Product Quality' },
            { value: 'service', label: 'Customer Service' },
            { value: 'delivery', label: 'Delivery Speed' },
            { value: 'price', label: 'Pricing' },
            { value: 'other', label: 'Other' },
          ]}
          value={form.values.category}
          onChange={(value) => form.setFieldValue('category', value)}
          error={form.errors.category}
        />

        <TextInput
          label="Comments"
          placeholder="Tell us more about your experience..."
          multiline
          numberOfLines={4}
          value={form.values.comments}
          onChangeText={(text) => form.setFieldValue('comments', text)}
          error={form.errors.comments}
          onBlur={() => form.setFieldTouched('comments')}
        />

        <Text size="xs" style={{ color: '#868e96' }}>
          {form.values.comments.length}/500 characters
        </Text>

        <Group spacing={10}>
          <Button
            onPress={form.onSubmit(handleSubmit)}
            loading={submitted}
            disabled={submitted}
          >
            {submitted ? 'Submitting...' : 'Submit Survey'}
          </Button>
          <Button variant="outline" onPress={form.reset} disabled={submitted}>
            Clear
          </Button>
        </Group>

        <Divider />

        <Text size="sm" weight="500">
          Form Status:
        </Text>
        <Text size="xs">
          Valid: {form.isValid() ? 'Yes' : 'No'} | Dirty: {form.isDirty() ? 'Yes' : 'No'}
        </Text>
      </Stack>
    </Paper>
  );
};

const ValidationApiDemo = () => {
  const [validationLog, setValidationLog] = useState<string[]>([]);

  const form = useForm({
    initialValues: {
      username: '',
      email: '',
      phone: '',
    },
    validate: {
      username: [
        isNotEmpty('Username is required'),
        minLength(3, 'Username must be at least 3 characters'),
      ],
      email: isEmail('Invalid email address'),
      phone: (value: string) => {
        if (!value) return 'Phone number is required';
        if (!/^\d{10}$/.test(value)) return 'Phone must be 10 digits';
        return null;
      },
    },
  });

  const addLog = (message: string) => {
    setValidationLog((prev) => [...prev.slice(-4), message]);
  };

  const handleValidateField = (field: keyof typeof form.values) => {
    const result = form.validateField(field);
    addLog(
      `validateField('${field}'): ${result.hasError ? `Error - ${result.error}` : 'Valid'}`
    );
  };

  const handleValidateAll = () => {
    const result = form.validate();
    addLog(
      `validate(): ${result.hasErrors ? `${Object.keys(result.errors).length} errors` : 'All valid'}`
    );
  };

  const handleCheckValid = (field?: keyof typeof form.values) => {
    const isFieldValid = field ? form.isValid(field) : form.isValid();
    const target = field ? `field '${field}'` : 'form';
    addLog(`isValid(${field ? `'${field}'` : ''}): ${target} is ${isFieldValid ? 'valid' : 'invalid'}`);
  };

  return (
    <Paper p="md" radius="md">
      <Stack spacing={15}>
        <Text size="sm" weight="500">
          Test Enhanced Validation API
        </Text>

        <TextInput
          label="Username"
          placeholder="Enter username (min 3 chars)"
          {...form.getInputProps('username')}
        />

        <TextInput
          label="Email"
          placeholder="your@email.com"
          {...form.getInputProps('email')}
        />

        <TextInput
          label="Phone"
          placeholder="1234567890"
          keyboardType="phone-pad"
          {...form.getInputProps('phone')}
        />

        <Divider />

        <Text size="sm" weight="500">
          Validation Methods:
        </Text>

        <Group spacing={5}>
          <Button size="xs" onPress={() => handleValidateField('username')}>
            Validate Username
          </Button>
          <Button size="xs" onPress={() => handleValidateField('email')}>
            Validate Email
          </Button>
          <Button size="xs" onPress={() => handleValidateField('phone')}>
            Validate Phone
          </Button>
        </Group>

        <Group spacing={5}>
          <Button size="xs" variant="outline" onPress={handleValidateAll}>
            Validate All
          </Button>
          <Button size="xs" variant="outline" onPress={() => handleCheckValid()}>
            Check Form Valid
          </Button>
        </Group>

        <Group spacing={5}>
          <Button size="xs" variant="light" onPress={() => handleCheckValid('username')}>
            Check Username
          </Button>
          <Button size="xs" variant="light" onPress={() => handleCheckValid('email')}>
            Check Email
          </Button>
          <Button size="xs" variant="light" onPress={() => handleCheckValid('phone')}>
            Check Phone
          </Button>
        </Group>

        <Group spacing={5}>
          <Button size="xs" onPress={() => form.setFieldError('username', 'Custom error!')}>
            Set Error
          </Button>
          <Button size="xs" onPress={() => form.clearFieldError('username')}>
            Clear Error
          </Button>
          <Button size="xs" onPress={() => form.clearErrors()}>
            Clear All Errors
          </Button>
        </Group>

        {validationLog.length > 0 && (
          <>
            <Divider />
            <Text size="sm" weight="500">
              Validation Log:
            </Text>
            <Paper p="sm" style={{ backgroundColor: '#f8f9fa' }}>
              <Stack spacing={3}>
                {validationLog.map((log, index) => (
                  <Text key={index} size="xs" style={{ fontFamily: 'monospace' }}>
                    {log}
                  </Text>
                ))}
              </Stack>
            </Paper>
          </>
        )}
      </Stack>
    </Paper>
  );
};

export const UseFormExample = () => {
  return (
    <ExampleWrapper
      title="useForm Hook"
      description="Comprehensive form state management with validation"
    >
      <ScrollView>
        <ExampleSection
          title="Basic Login Form"
          description="Simple form with email and password validation"
        >
          <BasicLoginForm />
        </ExampleSection>

        <ExampleSection
          title="Registration Form"
          description="Advanced form with multiple field types and complex validation"
        >
          <RegistrationForm />
        </ExampleSection>

        <ExampleSection
          title="Survey Form"
          description="Form with radio buttons, select, and textarea with character count"
        >
          <SurveyForm />
        </ExampleSection>

        <ExampleSection
          title="Validation API Demo"
          description="Demonstrates enhanced validation methods with detailed feedback"
        >
          <ValidationApiDemo />
        </ExampleSection>

        <ExampleSection
          title="Available Validators"
          description="Built-in validators provided by the hook"
        >
          <Paper p="md" radius="md">
            <Stack spacing={5}>
              <Text size="sm" weight="500">
                isNotEmpty - Validates required fields
              </Text>
              <Text size="sm" weight="500">
                isEmail - Validates email format
              </Text>
              <Text size="sm" weight="500">
                minLength / maxLength - Validates string length
              </Text>
              <Text size="sm" weight="500">
                min / max - Validates numeric values
              </Text>
              <Text size="sm" weight="500">
                matches - Validates against regex pattern
              </Text>
              <Text size="sm" weight="500">
                Custom validators - Write your own validation functions
              </Text>
            </Stack>
          </Paper>
        </ExampleSection>
      </ScrollView>
    </ExampleWrapper>
  );
};
