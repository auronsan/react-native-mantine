/**
 * Form field validation function
 */
export type FormValidator<T> = (value: T) => string | null;

/**
 * Form validation rules
 */
export type FormValidationRules<Values> = {
  [K in keyof Values]?: FormValidator<Values[K]> | FormValidator<Values[K]>[];
};

/**
 * Form errors
 */
export type FormErrors<Values = Record<string, any>> = Partial<
  Record<keyof Values, string>
>;

/**
 * Form touched state
 */
export type FormTouched<Values = Record<string, any>> = Partial<
  Record<keyof Values, boolean>
>;

/**
 * Form dirty state
 */
export type FormDirty<Values = Record<string, any>> = Partial<
  Record<keyof Values, boolean>
>;

/**
 * Form field status
 */
export interface FormFieldStatus {
  hasError: boolean;
  isTouched: boolean;
  isDirty: boolean;
}

/**
 * Props to be spread on input components
 */
export interface FormInputProps<T = any> {
  value: T;
  onChange?: (value: T) => void;
  onChangeText?: (text: string) => void;
  error?: string;
  onBlur?: () => void;
}

/**
 * Form submit handler
 */
export type FormSubmitHandler<Values> = (
  values: Values,
  event?: any
) => void | Promise<void>;

/**
 * useForm hook input parameters
 */
export interface UseFormInput<Values = Record<string, any>> {
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

  /** Clear input error on change */
  clearInputErrorOnChange?: boolean;

  /** Validate input on change */
  validateInputOnChange?: boolean;

  /** Validate input on blur */
  validateInputOnBlur?: boolean;

  /** Transform values before submit */
  transformValues?: (values: Values) => any;
}

/**
 * useForm hook return type
 */
export interface UseFormReturnType<Values = Record<string, any>> {
  /** Current form values */
  values: Values;

  /** Current form errors */
  errors: FormErrors<Values>;

  /** Current touched state */
  touched: FormTouched<Values>;

  /** Current dirty state */
  dirty: FormDirty<Values>;

  /** Set a single field value */
  setFieldValue: <K extends keyof Values>(field: K, value: Values[K]) => void;

  /** Set multiple values */
  setValues: (values: Partial<Values>) => void;

  /** Set a single field error */
  setFieldError: <K extends keyof Values>(field: K, error: string | null) => void;

  /** Set multiple errors */
  setErrors: (errors: FormErrors<Values>) => void;

  /** Clear a specific field error */
  clearFieldError: <K extends keyof Values>(field: K) => void;

  /** Clear all errors */
  clearErrors: () => void;

  /** Reset form to initial values */
  reset: () => void;

  /** Validate a specific field */
  validateField: <K extends keyof Values>(field: K) => boolean;

  /** Validate entire form */
  validate: () => boolean;

  /** Check if form is valid */
  isValid: () => boolean;

  /** Check if form is dirty */
  isDirty: () => boolean;

  /** Get field status */
  getFieldStatus: <K extends keyof Values>(field: K) => FormFieldStatus;

  /** Get props to spread on input component */
  getInputProps: <K extends keyof Values>(
    field: K,
    options?: {
      type?: 'input' | 'checkbox' | 'radio' | 'select';
      withError?: boolean;
      withFocus?: boolean;
    }
  ) => FormInputProps<Values[K]>;

  /** Handle form submit */
  onSubmit: (
    handleSubmit: FormSubmitHandler<Values>
  ) => (event?: any) => void | Promise<void>;

  /** Reset touched state */
  resetTouched: () => void;

  /** Reset dirty state */
  resetDirty: () => void;

  /** Mark field as touched */
  setFieldTouched: <K extends keyof Values>(field: K, touched?: boolean) => void;
}
