import type { FormValidator } from './types';

/**
 * Built-in validators
 */

/**
 * Validates that a value is not empty
 */
export const isNotEmpty = (message = 'This field is required'): FormValidator<any> => {
  return (value: any) => {
    if (value === null || value === undefined || value === '') {
      return message;
    }
    if (Array.isArray(value) && value.length === 0) {
      return message;
    }
    if (typeof value === 'string' && value.trim().length === 0) {
      return message;
    }
    return null;
  };
};

/**
 * Validates minimum length
 */
export const minLength = (
  min: number,
  message?: string
): FormValidator<string> => {
  return (value: string) => {
    if (!value) return null;
    if (value.length < min) {
      return message || `Must be at least ${min} characters`;
    }
    return null;
  };
};

/**
 * Validates maximum length
 */
export const maxLength = (
  max: number,
  message?: string
): FormValidator<string> => {
  return (value: string) => {
    if (!value) return null;
    if (value.length > max) {
      return message || `Must be at most ${max} characters`;
    }
    return null;
  };
};

/**
 * Validates that value matches a pattern
 */
export const matches = (
  pattern: RegExp,
  message = 'Invalid format'
): FormValidator<string> => {
  return (value: string) => {
    if (!value) return null;
    if (!pattern.test(value)) {
      return message;
    }
    return null;
  };
};

/**
 * Validates email format
 */
export const isEmail = (message = 'Invalid email'): FormValidator<string> => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return matches(emailRegex, message);
};

/**
 * Validates minimum value
 */
export const min = (
  minValue: number,
  message?: string
): FormValidator<number> => {
  return (value: number) => {
    if (value === null || value === undefined) return null;
    if (value < minValue) {
      return message || `Must be at least ${minValue}`;
    }
    return null;
  };
};

/**
 * Validates maximum value
 */
export const max = (
  maxValue: number,
  message?: string
): FormValidator<number> => {
  return (value: number) => {
    if (value === null || value === undefined) return null;
    if (value > maxValue) {
      return message || `Must be at most ${maxValue}`;
    }
    return null;
  };
};

/**
 * Validates that value is in a range
 */
export const inRange = (
  minValue: number,
  maxValue: number,
  message?: string
): FormValidator<number> => {
  return (value: number) => {
    if (value === null || value === undefined) return null;
    if (value < minValue || value > maxValue) {
      return message || `Must be between ${minValue} and ${maxValue}`;
    }
    return null;
  };
};

/**
 * Validates that value is in a list
 */
export const isInArray = <T>(
  array: T[],
  message = 'Invalid value'
): FormValidator<T> => {
  return (value: T) => {
    if (!array.includes(value)) {
      return message;
    }
    return null;
  };
};
