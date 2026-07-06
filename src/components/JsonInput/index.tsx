import React, { forwardRef, useState } from 'react';
import { TextInput as RNTextInput } from 'react-native';
import { Textarea, type TextareaProps } from '../Textarea';
import { useComponentDefaultProps } from '../../theme/theme-provider';

export interface JsonInputProps
  extends Omit<TextareaProps, 'value' | 'defaultValue' | 'onChangeText'> {
  /** Value for controlled component */
  value?: string;

  /** Default value for uncontrolled component */
  defaultValue?: string;

  /** Called when value changes */
  onChangeText?: (value: string) => void;

  /** Error message displayed when the value cannot be parsed */
  validationError?: React.ReactNode;

  /** Determines whether the value should be formatted on blur */
  formatOnBlur?: boolean;

  /** Function to serialize value into a string, JSON.stringify by default */
  serialize?: typeof JSON.stringify;

  /** Function to deserialize string value, JSON.parse by default */
  deserialize?: typeof JSON.parse;
}

const defaultProps: Partial<JsonInputProps> = {
  formatOnBlur: false,
  serialize: JSON.stringify,
  deserialize: JSON.parse,
};

function isValidJson(
  value: string,
  deserialize: typeof JSON.parse
): { valid: boolean; parsed?: unknown } {
  if (value.trim().length === 0) {
    return { valid: true };
  }

  try {
    return { valid: true, parsed: deserialize(value) };
  } catch {
    return { valid: false };
  }
}

/**
 * JsonInput is a Textarea that validates its content as JSON on blur and can
 * optionally pretty-print valid JSON. Port of Mantine JsonInput.
 */
export const JsonInput = forwardRef<RNTextInput, JsonInputProps>(
  (props, ref) => {
    const {
      value,
      defaultValue,
      onChangeText,
      onFocus,
      onBlur,
      error,
      validationError,
      formatOnBlur,
      serialize,
      deserialize,
      ...others
    } = useComponentDefaultProps('JsonInput', defaultProps, props);

    const [internalValue, setInternalValue] = useState(defaultValue ?? '');
    const [valid, setValid] = useState(true);

    const currentValue = value !== undefined ? value : internalValue;

    const setValue = (next: string) => {
      if (value === undefined) {
        setInternalValue(next);
      }
      onChangeText?.(next);
    };

    const handleChangeText = (next: string) => {
      setValue(next);
      if (!valid) {
        setValid(true);
      }
    };

    const handleFocus: TextareaProps['onFocus'] = (event) => {
      setValid(true);
      onFocus?.(event);
    };

    const handleBlur: TextareaProps['onBlur'] = (event) => {
      const result = isValidJson(currentValue, deserialize!);
      setValid(result.valid);

      if (result.valid && formatOnBlur && currentValue.trim().length > 0) {
        setValue(serialize!(result.parsed, null, 2));
      }

      onBlur?.(event);
    };

    return (
      <Textarea
        {...others}
        ref={ref}
        value={currentValue}
        onChangeText={handleChangeText}
        onFocus={handleFocus}
        onBlur={handleBlur}
        error={error || (!valid ? (validationError ?? 'Invalid JSON') : undefined)}
        autoCapitalize="none"
        autoCorrect={false}
      />
    );
  }
);

JsonInput.displayName = 'JsonInput';
