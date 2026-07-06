import { useCallback, useRef, useState } from 'react';
import type {
  FormErrors,
  FormFieldStatus,
  FormFieldValidationResult,
  FormValidationResult,
  FormInputProps,
  FormSubmitHandler,
  FormTouched,
  FormDirty,
  FormValidationRules,
  UseFormInput,
  UseFormReturnType,
} from './types';

/**
 * Validates a single field value against validation rules
 */
function validateFieldValue<Values>(
  field: keyof Values,
  value: any,
  rules?: FormValidationRules<Values>
): string | null {
  if (!rules || !rules[field]) {
    return null;
  }

  const validators = rules[field];
  if (!validators) {
    return null;
  }

  // Handle single validator
  if (typeof validators === 'function') {
    return validators(value);
  }

  // Handle array of validators
  if (Array.isArray(validators)) {
    for (const validator of validators) {
      const error = validator(value);
      if (error) {
        return error;
      }
    }
  }

  return null;
}

/**
 * Validates all form values
 */
function validateAllValues<Values>(
  values: Values,
  rules?: FormValidationRules<Values>
): FormErrors<Values> {
  if (!rules) {
    return {};
  }

  const errors: FormErrors<Values> = {};

  for (const field in rules) {
    const error = validateFieldValue(field, values[field], rules);
    if (error) {
      errors[field] = error;
    }
  }

  return errors;
}

/**
 * Form state management hook for React Native
 *
 * @example
 * ```tsx
 * const form = useForm({
 *   initialValues: {
 *     email: '',
 *     password: '',
 *   },
 *   validate: {
 *     email: isEmail('Invalid email'),
 *     password: minLength(6, 'Password must be at least 6 characters'),
 *   },
 * });
 *
 * return (
 *   <View>
 *     <TextInput {...form.getInputProps('email')} />
 *     <TextInput {...form.getInputProps('password')} />
 *     <Button onPress={form.onSubmit((values) => console.log(values))}>
 *       Submit
 *     </Button>
 *   </View>
 * );
 * ```
 */
export function useForm<Values extends Record<string, any> = Record<string, any>>({
  initialValues = {} as Values,
  initialErrors = {},
  initialTouched = {},
  initialDirty = {},
  validate: validationRules,
  clearInputErrorOnChange = true,
  validateInputOnChange = false,
  validateInputOnBlur = false,
  transformValues = (values: Values) => values,
}: UseFormInput<Values> = {}): UseFormReturnType<Values> {
  // Form state
  const [values, setValuesState] = useState<Values>(initialValues);
  const [errors, setErrorsState] = useState<FormErrors<Values>>(initialErrors);
  const [touched, setTouchedState] = useState<FormTouched<Values>>(initialTouched);
  const [dirty, setDirtyState] = useState<FormDirty<Values>>(initialDirty);

  // Keep track of initial values for reset
  const initialValuesRef = useRef<Values>(initialValues);

  /**
   * Set a single field value
   */
  const setFieldValue = useCallback(
    <K extends keyof Values>(field: K, value: Values[K]) => {
      setValuesState((prev) => ({ ...prev, [field]: value }));
      setDirtyState((prev) => ({ ...prev, [field]: true }));

      // Validate on change if enabled
      if (validateInputOnChange && validationRules) {
        const error = validateFieldValue(field, value, validationRules);
        if (error) {
          setErrorsState((prev) => ({ ...prev, [field]: error }));
        } else {
          setErrorsState((prev) => {
            const newErrors = { ...prev };
            delete newErrors[field];
            return newErrors;
          });
        }
      } else if (clearInputErrorOnChange) {
        // Clear error on change if enabled
        setErrorsState((prev) => {
          const newErrors = { ...prev };
          delete newErrors[field];
          return newErrors;
        });
      }
    },
    [validateInputOnChange, clearInputErrorOnChange, validationRules]
  );

  /**
   * Set multiple field values
   */
  const setValues = useCallback((newValues: Partial<Values>) => {
    setValuesState((prev) => ({ ...prev, ...newValues }));

    // Mark all updated fields as dirty
    const dirtyFields: FormDirty<Values> = {};
    for (const key in newValues) {
      dirtyFields[key] = true;
    }
    setDirtyState((prev) => ({ ...prev, ...dirtyFields }));

    if (clearInputErrorOnChange) {
      setErrorsState((prev) => {
        const newErrors = { ...prev };
        for (const key in newValues) {
          delete newErrors[key];
        }
        return newErrors;
      });
    }
  }, [clearInputErrorOnChange]);

  /**
   * Set a single field error
   */
  const setFieldError = useCallback(
    <K extends keyof Values>(field: K, error: string | null) => {
      if (error === null) {
        setErrorsState((prev) => {
          const newErrors = { ...prev };
          delete newErrors[field];
          return newErrors;
        });
      } else {
        setErrorsState((prev) => ({ ...prev, [field]: error }));
      }
    },
    []
  );

  /**
   * Set multiple errors
   */
  const setErrors = useCallback((newErrors: FormErrors<Values>) => {
    setErrorsState(newErrors);
  }, []);

  /**
   * Clear a specific field error
   */
  const clearFieldError = useCallback(<K extends keyof Values>(field: K) => {
    setErrorsState((prev) => {
      const newErrors = { ...prev };
      delete newErrors[field];
      return newErrors;
    });
  }, []);

  /**
   * Clear all errors
   */
  const clearErrors = useCallback(() => {
    setErrorsState({});
  }, []);

  /**
   * Reset form to initial values
   */
  const reset = useCallback(() => {
    setValuesState(initialValuesRef.current);
    setErrorsState({});
    setTouchedState({});
    setDirtyState({});
  }, []);

  /**
   * Validate a specific field and return validation result
   */
  const validateField = useCallback(
    <K extends keyof Values>(field: K): FormFieldValidationResult => {
      if (!validationRules) {
        return { hasError: false, error: null };
      }

      const error = validateFieldValue(field, values[field], validationRules);
      if (error) {
        setFieldError(field, error);
        return { hasError: true, error };
      }

      clearFieldError(field);
      return { hasError: false, error: null };
    },
    [values, validationRules, setFieldError, clearFieldError]
  );

  /**
   * Validate entire form and return validation result
   */
  const validate = useCallback((): FormValidationResult => {
    if (!validationRules) {
      return { hasErrors: false, errors: {} };
    }

    const newErrors = validateAllValues(values, validationRules);
    setErrorsState(newErrors);
    const hasErrors = Object.keys(newErrors).length > 0;
    return { hasErrors, errors: newErrors };
  }, [values, validationRules]);

  /**
   * Check if a specific field or entire form is valid
   */
  const isValid = useCallback(
    <K extends keyof Values>(field?: K): boolean => {
      if (!validationRules) {
        return true;
      }

      if (field !== undefined) {
        const error = validateFieldValue(field, values[field], validationRules);
        return error === null;
      }

      const validationErrors = validateAllValues(values, validationRules);
      return Object.keys(validationErrors).length === 0;
    },
    [values, validationRules]
  );

  /**
   * Check if form is dirty
   */
  const isDirty = useCallback((): boolean => {
    return Object.values(dirty).some((isDirty) => isDirty === true);
  }, [dirty]);

  /**
   * Get field status
   */
  const getFieldStatus = useCallback(
    <K extends keyof Values>(field: K): FormFieldStatus => {
      return {
        hasError: !!errors[field],
        isTouched: !!touched[field],
        isDirty: !!dirty[field],
      };
    },
    [errors, touched, dirty]
  );

  /**
   * Mark field as touched
   */
  const setFieldTouched = useCallback(
    <K extends keyof Values>(field: K, isTouched = true) => {
      setTouchedState((prev) => ({ ...prev, [field]: isTouched }));

      // Validate on blur if enabled
      if (isTouched && validateInputOnBlur && validationRules) {
        const error = validateFieldValue(field, values[field], validationRules);
        if (error) {
          setFieldError(field, error);
        } else {
          clearFieldError(field);
        }
      }
    },
    [validateInputOnBlur, validationRules, values, setFieldError, clearFieldError]
  );

  /**
   * Reset touched state
   */
  const resetTouched = useCallback(() => {
    setTouchedState({});
  }, []);

  /**
   * Reset dirty state
   */
  const resetDirty = useCallback(() => {
    setDirtyState({});
  }, []);

  /**
   * Get props to spread on input component
   * Returns props optimized for React Native components (uses onChangeText)
   */
  const getInputProps = useCallback(
    <K extends keyof Values>(
      field: K,
      options: {
        type?: 'input' | 'checkbox' | 'radio' | 'select';
        withError?: boolean;
        withFocus?: boolean;
      } = {}
    ): FormInputProps<Values[K]> => {
      const { withError = true, withFocus = true } = options;

      const baseProps: FormInputProps<Values[K]> = {
        value: values[field],
      };

      // Add error if needed
      if (withError && errors[field]) {
        baseProps.error = errors[field];
      }

      // Add blur handler if focus tracking is enabled
      if (withFocus) {
        baseProps.onBlur = () => {
          setFieldTouched(field, true);
        };
      }

      // Add change handler for text inputs (default for React Native)
      baseProps.onChangeText = (text: string) => {
        setFieldValue(field, text as any);
      };

      return baseProps;
    },
    [values, errors, setFieldValue, setFieldTouched]
  );

  /**
   * Handle form submit
   */
  const onSubmit = useCallback(
    (handleSubmit: FormSubmitHandler<Values>) => {
      return async (event?: any) => {
        event?.preventDefault?.();

        // Validate form
        const validationResult = validate();
        if (validationResult.hasErrors) {
          return;
        }

        // Transform values if needed
        const transformedValues = transformValues(values);

        // Call submit handler
        await handleSubmit(transformedValues, event);
      };
    },
    [validate, values, transformValues]
  );

  return {
    values,
    errors,
    touched,
    dirty,
    setFieldValue,
    setValues,
    setFieldError,
    setErrors,
    clearFieldError,
    clearErrors,
    reset,
    validateField,
    validate,
    isValid,
    isDirty,
    getFieldStatus,
    getInputProps,
    onSubmit,
    resetTouched,
    resetDirty,
    setFieldTouched,
  };
}
