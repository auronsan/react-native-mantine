# useForm Hook

Comprehensive form state management hook for React Native with built-in validation capabilities.

## Features

- Type-safe form state management with TypeScript generics
- Flexible validation system with single or multiple validators per field
- Automatic validation on blur/change
- Field-level and form-level validation
- Touch and dirty state tracking
- Built-in validators for common use cases
- Easy integration with React Native components via `getInputProps`

## Basic Usage

```tsx
import { useForm, isEmail, minLength } from 'react-native-mantine';

interface LoginForm {
  email: string;
  password: string;
}

function LoginScreen() {
  const form = useForm<LoginForm>({
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

  const handleSubmit = (values: LoginForm) => {
    console.log('Form submitted:', values);
  };

  return (
    <View>
      <TextInput
        label="Email"
        placeholder="your@email.com"
        {...form.getInputProps('email')}
      />
      <TextInput
        label="Password"
        placeholder="Password"
        secureTextEntry
        {...form.getInputProps('password')}
      />
      <Button onPress={form.onSubmit(handleSubmit)}>
        Login
      </Button>
    </View>
  );
}
```

## API Reference

### Hook Options

```typescript
interface UseFormInput<Values> {
  /** Initial form values */
  initialValues?: Values;

  /** Initial form errors */
  initialErrors?: FormErrors<Values>;

  /** Initial touched state */
  initialTouched?: FormTouched<Values>;

  /** Initial dirty state */
  initialDirty?: FormDirty<Values>;

  /** Form validation rules */
  validate?: FormValidationRules<Values>;

  /** Clear input error on change (default: true) */
  clearInputErrorOnChange?: boolean;

  /** Validate input on change (default: false) */
  validateInputOnChange?: boolean;

  /** Validate input on blur (default: false) */
  validateInputOnBlur?: boolean;

  /** Transform values before submit */
  transformValues?: (values: Values) => any;
}
```

### Return Type

The hook returns an object with the following properties and methods:

#### State

- `values: Values` - Current form values
- `errors: FormErrors<Values>` - Current form errors (field name -> error message)
- `touched: FormTouched<Values>` - Fields that have been focused
- `dirty: FormDirty<Values>` - Fields that have been modified

#### Field Management

- `setFieldValue<K>(field: K, value: Values[K])` - Set a single field value
- `setValues(values: Partial<Values>)` - Set multiple field values
- `setFieldTouched<K>(field: K, touched?: boolean)` - Mark field as touched/untouched

#### Error Management

- `setFieldError<K>(field: K, error: string | null)` - Set error for a specific field
- `setErrors(errors: FormErrors<Values>)` - Set multiple errors
- `clearFieldError<K>(field: K)` - Clear error for a specific field
- `clearErrors()` - Clear all errors

#### Validation

- `validateField<K>(field: K): FormFieldValidationResult` - Validate a specific field
  - Returns: `{ hasError: boolean, error: string | null }`
- `validate(): FormValidationResult` - Validate entire form
  - Returns: `{ hasErrors: boolean, errors: FormErrors<Values> }`
- `isValid<K>(field?: K): boolean` - Check if field or entire form is valid

#### Form Status

- `isDirty(): boolean` - Check if any field has been modified
- `getFieldStatus<K>(field: K): FormFieldStatus` - Get status of a specific field
  - Returns: `{ hasError: boolean, isTouched: boolean, isDirty: boolean }`

#### Form Actions

- `reset()` - Reset form to initial values and clear all state
- `resetTouched()` - Clear all touched state
- `resetDirty()` - Clear all dirty state

#### Helper Methods

- `getInputProps<K>(field: K, options?)` - Get props to spread on input components
  - Returns: `{ value, onChangeText, error?, onBlur? }`
  - Options:
    - `withError?: boolean` (default: true) - Include error prop
    - `withFocus?: boolean` (default: true) - Include onBlur handler
- `onSubmit(handler)` - Create submit handler with validation
  - Only calls handler if validation passes

## Validation System

### Built-in Validators

The library provides several built-in validators:

```typescript
import {
  isNotEmpty,
  isEmail,
  minLength,
  maxLength,
  min,
  max,
  inRange,
  matches,
  isInArray,
} from 'react-native-mantine';

const form = useForm({
  initialValues: {
    username: '',
    email: '',
    password: '',
    age: '',
    website: '',
  },
  validate: {
    username: isNotEmpty('Username is required'),
    email: isEmail('Invalid email address'),
    password: minLength(8, 'Password must be at least 8 characters'),
    age: min(18, 'Must be at least 18 years old'),
    website: matches(/^https?:\/\//, 'Must be a valid URL'),
  },
});
```

#### Available Validators

- `isNotEmpty(message?)` - Validates that value is not empty
- `isEmail(message?)` - Validates email format
- `minLength(min, message?)` - Validates minimum string length
- `maxLength(max, message?)` - Validates maximum string length
- `min(minValue, message?)` - Validates minimum numeric value
- `max(maxValue, message?)` - Validates maximum numeric value
- `inRange(min, max, message?)` - Validates numeric value is in range
- `matches(pattern, message?)` - Validates against regex pattern
- `isInArray(array, message?)` - Validates value is in array

### Custom Validators

Create custom validators by writing functions that return `null` for valid values or an error string:

```typescript
const form = useForm({
  initialValues: {
    password: '',
    confirmPassword: '',
  },
  validate: {
    password: (value) => {
      if (value.length < 8) return 'Too short';
      if (!/[A-Z]/.test(value)) return 'Must contain uppercase';
      if (!/[0-9]/.test(value)) return 'Must contain number';
      return null;
    },
    confirmPassword: (value) => {
      if (value !== form.values.password) {
        return 'Passwords do not match';
      }
      return null;
    },
  },
});
```

### Multiple Validators

Use an array to apply multiple validators to a field. The first error encountered will be returned:

```typescript
const form = useForm({
  initialValues: {
    username: '',
  },
  validate: {
    username: [
      isNotEmpty('Username is required'),
      minLength(3, 'Username must be at least 3 characters'),
      maxLength(20, 'Username must be at most 20 characters'),
      (value) => {
        if (!/^[a-zA-Z0-9_]+$/.test(value)) {
          return 'Username can only contain letters, numbers, and underscores';
        }
        return null;
      },
    ],
  },
});
```

## Validation Modes

### Validate on Blur

Validate fields when they lose focus:

```typescript
const form = useForm({
  initialValues: { email: '' },
  validate: { email: isEmail() },
  validateInputOnBlur: true, // Enable validation on blur
});
```

### Validate on Change

Validate fields as the user types:

```typescript
const form = useForm({
  initialValues: { email: '' },
  validate: { email: isEmail() },
  validateInputOnChange: true, // Enable validation on change
});
```

### Manual Validation

Validate fields programmatically:

```typescript
// Validate specific field
const result = form.validateField('email');
if (result.hasError) {
  console.log('Error:', result.error);
}

// Validate all fields
const validation = form.validate();
if (validation.hasErrors) {
  console.log('Errors:', validation.errors);
}

// Check if field is valid (without setting errors)
if (form.isValid('email')) {
  console.log('Email is valid');
}

// Check if entire form is valid
if (form.isValid()) {
  console.log('Form is valid');
}
```

## Advanced Examples

### Complex Form with Custom Validation

```tsx
interface RegistrationForm {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  age: string;
  terms: boolean;
}

const form = useForm<RegistrationForm>({
  initialValues: {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    age: '',
    terms: false,
  },
  validate: {
    username: [
      isNotEmpty('Username is required'),
      minLength(3, 'Username must be at least 3 characters'),
      maxLength(20, 'Username must be at most 20 characters'),
    ],
    email: [
      isNotEmpty('Email is required'),
      isEmail('Invalid email address'),
    ],
    password: [
      isNotEmpty('Password is required'),
      minLength(8, 'Password must be at least 8 characters'),
      (value) => {
        if (!/[A-Z]/.test(value)) return 'Must contain uppercase letter';
        if (!/[a-z]/.test(value)) return 'Must contain lowercase letter';
        if (!/[0-9]/.test(value)) return 'Must contain number';
        return null;
      },
    ],
    confirmPassword: (value) => {
      if (value !== form.values.password) {
        return 'Passwords do not match';
      }
      return null;
    },
    age: (value) => {
      const age = parseInt(value, 10);
      if (isNaN(age)) return 'Age must be a number';
      if (age < 18) return 'Must be at least 18 years old';
      if (age > 120) return 'Invalid age';
      return null;
    },
    terms: (value) => {
      return value ? null : 'You must accept the terms';
    },
  },
  validateInputOnBlur: true,
});
```

### Manual Error Management

```typescript
// Set custom errors
form.setFieldError('username', 'This username is already taken');

// Clear specific error
form.clearFieldError('username');

// Clear all errors
form.clearErrors();

// Set multiple errors
form.setErrors({
  username: 'Invalid username',
  email: 'Invalid email',
});
```

### Transform Values Before Submit

```typescript
const form = useForm({
  initialValues: {
    firstName: '',
    lastName: '',
    age: '',
  },
  transformValues: (values) => ({
    ...values,
    fullName: `${values.firstName} ${values.lastName}`,
    age: parseInt(values.age, 10),
  }),
});

// Transformed values are passed to submit handler
form.onSubmit((transformedValues) => {
  console.log(transformedValues.fullName); // Combined name
  console.log(typeof transformedValues.age); // number
});
```

### Using getInputProps

The `getInputProps` method simplifies field binding by returning all necessary props:

```tsx
// Instead of manually binding each prop:
<TextInput
  value={form.values.email}
  onChangeText={(text) => form.setFieldValue('email', text)}
  error={form.errors.email}
  onBlur={() => form.setFieldTouched('email')}
/>

// Use getInputProps:
<TextInput {...form.getInputProps('email')} />

// Customize behavior:
<TextInput
  {...form.getInputProps('email', {
    withError: false, // Don't include error prop
    withFocus: false, // Don't include onBlur handler
  })}
/>
```

## TypeScript

The hook is fully typed with TypeScript generics. Field names are type-checked:

```typescript
interface MyForm {
  name: string;
  age: number;
}

const form = useForm<MyForm>({
  initialValues: {
    name: '',
    age: 0,
  },
});

// Type-safe field access
form.setFieldValue('name', 'John'); // OK
form.setFieldValue('invalid', 'value'); // TypeScript error
form.getInputProps('name'); // OK
form.getInputProps('invalid'); // TypeScript error
```

## Best Practices

1. **Define form interface**: Use TypeScript interfaces for type safety
2. **Use validateInputOnBlur**: Better UX than validating on every keystroke
3. **Combine validators**: Use arrays to compose multiple validation rules
4. **Use getInputProps**: Simplifies component integration and reduces boilerplate
5. **Custom validators**: Write reusable validator functions for complex logic
6. **Transform values**: Clean up data before submission
7. **Check form validity**: Use `isValid()` to enable/disable submit buttons

## Migration from Previous Version

The enhanced API maintains full backward compatibility. New features:

- `validateField` now returns `{ hasError, error }` instead of boolean
- `validate` now returns `{ hasErrors, errors }` instead of boolean
- `isValid` now accepts optional field parameter for field-level checks
- All existing code continues to work without changes
