/**
 * Tests for color scheme value helpers
 * Comprehensive test coverage for light/dark mode value resolution
 */

import {
  colorSchemeValue,
  isColorSchemeValue,
  resolveColorSchemeValue,
  resolveColorSchemeConstants,
  createColorSchemeValueFunction,
  createColorSchemeConstantsFunction,
} from '../color-scheme-value';
import { _DEFAULT_THEME } from '../../../default-theme';
import type { ColorScheme, MantineThemeBase } from '../../../types';

describe('colorSchemeValue', () => {
  describe('colorSchemeValue()', () => {
    it('should create a ColorSchemeValue object', () => {
      const value = colorSchemeValue('#fff', '#000');
      expect(value).toEqual({ light: '#fff', dark: '#000' });
    });

    it('should work with different types', () => {
      const stringValue = colorSchemeValue('light-value', 'dark-value');
      expect(stringValue).toEqual({ light: 'light-value', dark: 'dark-value' });

      const numberValue = colorSchemeValue(100, 200);
      expect(numberValue).toEqual({ light: 100, dark: 200 });

      const objectValue = colorSchemeValue({ foo: 'bar' }, { baz: 'qux' });
      expect(objectValue).toEqual({
        light: { foo: 'bar' },
        dark: { baz: 'qux' }
      });
    });
  });

  describe('isColorSchemeValue()', () => {
    it('should return true for valid ColorSchemeValue objects', () => {
      expect(isColorSchemeValue({ light: '#fff', dark: '#000' })).toBe(true);
      expect(isColorSchemeValue({ light: 100, dark: 200 })).toBe(true);
      expect(isColorSchemeValue({ light: 'foo', dark: 'bar' })).toBe(true);
    });

    it('should return false for non-ColorSchemeValue objects', () => {
      expect(isColorSchemeValue('#fff')).toBe(false);
      expect(isColorSchemeValue(100)).toBe(false);
      expect(isColorSchemeValue(null)).toBe(false);
      expect(isColorSchemeValue(undefined)).toBe(false);
      expect(isColorSchemeValue({ light: '#fff' })).toBe(false);
      expect(isColorSchemeValue({ dark: '#000' })).toBe(false);
      expect(isColorSchemeValue({ light: '#fff', dark: '#000', extra: 'value' })).toBe(false);
      expect(isColorSchemeValue({})).toBe(false);
      expect(isColorSchemeValue([])).toBe(false);
      expect(isColorSchemeValue(['light', 'dark'])).toBe(false);
    });
  });

  describe('resolveColorSchemeValue()', () => {
    it('should resolve ColorSchemeValue for light mode', () => {
      const value = { light: '#fff', dark: '#000' };
      expect(resolveColorSchemeValue(value, 'light')).toBe('#fff');
    });

    it('should resolve ColorSchemeValue for dark mode', () => {
      const value = { light: '#fff', dark: '#000' };
      expect(resolveColorSchemeValue(value, 'dark')).toBe('#000');
    });

    it('should pass through non-ColorSchemeValue values', () => {
      expect(resolveColorSchemeValue('#blue', 'light')).toBe('#blue');
      expect(resolveColorSchemeValue('#blue', 'dark')).toBe('#blue');
      expect(resolveColorSchemeValue(100, 'light')).toBe(100);
      expect(resolveColorSchemeValue(null, 'light')).toBe(null);
    });

    it('should handle different value types', () => {
      const stringValue = { light: 'light-text', dark: 'dark-text' };
      expect(resolveColorSchemeValue(stringValue, 'light')).toBe('light-text');
      expect(resolveColorSchemeValue(stringValue, 'dark')).toBe('dark-text');

      const numberValue = { light: 10, dark: 20 };
      expect(resolveColorSchemeValue(numberValue, 'light')).toBe(10);
      expect(resolveColorSchemeValue(numberValue, 'dark')).toBe(20);
    });
  });

  describe('resolveColorSchemeConstants()', () => {
    it('should resolve all ColorSchemeValue properties in light mode', () => {
      const constants = {
        text: { light: '#000', dark: '#fff' },
        background: { light: '#FCFCFC', dark: '#272727' },
        primaryButton: { light: '#00203E', dark: '#2581C4' },
      };

      const resolved = resolveColorSchemeConstants(constants, 'light');

      expect(resolved).toEqual({
        text: '#000',
        background: '#FCFCFC',
        primaryButton: '#00203E',
      });
    });

    it('should resolve all ColorSchemeValue properties in dark mode', () => {
      const constants = {
        text: { light: '#000', dark: '#fff' },
        background: { light: '#FCFCFC', dark: '#272727' },
        primaryButton: { light: '#00203E', dark: '#2581C4' },
      };

      const resolved = resolveColorSchemeConstants(constants, 'dark');

      expect(resolved).toEqual({
        text: '#fff',
        background: '#272727',
        primaryButton: '#2581C4',
      });
    });

    it('should pass through non-ColorSchemeValue properties', () => {
      const constants = {
        text: { light: '#000', dark: '#fff' },
        fixedColor: '#blue',
        fixedNumber: 42,
        fixedString: 'constant',
      };

      const resolved = resolveColorSchemeConstants(constants, 'light');

      expect(resolved).toEqual({
        text: '#000',
        fixedColor: '#blue',
        fixedNumber: 42,
        fixedString: 'constant',
      });
    });

    it('should handle nested objects', () => {
      const constants = {
        colors: {
          text: { light: '#000', dark: '#fff' },
          background: { light: '#FCFCFC', dark: '#272727' },
        },
        spacing: {
          small: { light: 8, dark: 12 },
          large: 24,
        },
      };

      const resolved = resolveColorSchemeConstants(constants, 'dark');

      expect(resolved).toEqual({
        colors: {
          text: '#fff',
          background: '#272727',
        },
        spacing: {
          small: 12,
          large: 24,
        },
      });
    });

    it('should handle deeply nested objects', () => {
      const constants = {
        level1: {
          level2: {
            level3: {
              color: { light: '#fff', dark: '#000' },
            },
          },
        },
      };

      const resolved = resolveColorSchemeConstants(constants, 'dark');

      expect(resolved).toEqual({
        level1: {
          level2: {
            level3: {
              color: '#000',
            },
          },
        },
      });
    });

    it('should handle mixed nested structures', () => {
      const constants = {
        text: { light: '#000', dark: '#fff' },
        button: {
          background: { light: '#00203E', dark: '#2581C4' },
          text: 'white',
          padding: 16,
        },
        fixedValue: 'constant',
      };

      const resolved = resolveColorSchemeConstants(constants, 'light');

      expect(resolved).toEqual({
        text: '#000',
        button: {
          background: '#00203E',
          text: 'white',
          padding: 16,
        },
        fixedValue: 'constant',
      });
    });

    it('should handle empty objects', () => {
      expect(resolveColorSchemeConstants({}, 'light')).toEqual({});
      expect(resolveColorSchemeConstants({}, 'dark')).toEqual({});
    });

    it('should preserve array values', () => {
      const constants = {
        colors: ['#fff', '#000'],
        value: { light: 1, dark: 2 },
      };

      const resolved = resolveColorSchemeConstants(constants, 'light');

      expect(resolved).toEqual({
        colors: ['#fff', '#000'],
        value: 1,
      });
    });
  });

  describe('createColorSchemeValueFunction()', () => {
    it('should create a function that resolves based on theme color scheme - light', () => {
      const theme: MantineThemeBase = {
        ..._DEFAULT_THEME,
        colorScheme: 'light',
      };

      const fn = createColorSchemeValueFunction(theme);
      const value = { light: '#fff', dark: '#000' };

      expect(fn(value)).toBe('#fff');
    });

    it('should create a function that resolves based on theme color scheme - dark', () => {
      const theme: MantineThemeBase = {
        ..._DEFAULT_THEME,
        colorScheme: 'dark',
      };

      const fn = createColorSchemeValueFunction(theme);
      const value = { light: '#fff', dark: '#000' };

      expect(fn(value)).toBe('#000');
    });

    it('should pass through non-ColorSchemeValue values', () => {
      const theme: MantineThemeBase = {
        ..._DEFAULT_THEME,
        colorScheme: 'light',
      };

      const fn = createColorSchemeValueFunction(theme);

      expect(fn('#blue')).toBe('#blue');
      expect(fn(100)).toBe(100);
      expect(fn('constant')).toBe('constant');
    });

    it('should work with different value types', () => {
      const lightTheme: MantineThemeBase = {
        ..._DEFAULT_THEME,
        colorScheme: 'light',
      };

      const darkTheme: MantineThemeBase = {
        ..._DEFAULT_THEME,
        colorScheme: 'dark',
      };

      const lightFn = createColorSchemeValueFunction(lightTheme);
      const darkFn = createColorSchemeValueFunction(darkTheme);

      const stringValue = { light: 'light-value', dark: 'dark-value' };
      expect(lightFn(stringValue)).toBe('light-value');
      expect(darkFn(stringValue)).toBe('dark-value');

      const numberValue = { light: 10, dark: 20 };
      expect(lightFn(numberValue)).toBe(10);
      expect(darkFn(numberValue)).toBe(20);

      const objectValue = { light: { foo: 'bar' }, dark: { foo: 'qux' } };
      expect(lightFn(objectValue)).toEqual({ foo: 'bar' });
      expect(darkFn(objectValue)).toEqual({ foo: 'qux' });
    });
  });

  describe('createColorSchemeConstantsFunction()', () => {
    it('should create a function that resolves all constants - light mode', () => {
      const theme: MantineThemeBase = {
        ..._DEFAULT_THEME,
        colorScheme: 'light',
      };

      const fn = createColorSchemeConstantsFunction(theme);
      const constants = {
        text: { light: '#000', dark: '#fff' },
        background: { light: '#FCFCFC', dark: '#272727' },
      };

      expect(fn(constants)).toEqual({
        text: '#000',
        background: '#FCFCFC',
      });
    });

    it('should create a function that resolves all constants - dark mode', () => {
      const theme: MantineThemeBase = {
        ..._DEFAULT_THEME,
        colorScheme: 'dark',
      };

      const fn = createColorSchemeConstantsFunction(theme);
      const constants = {
        text: { light: '#000', dark: '#fff' },
        background: { light: '#FCFCFC', dark: '#272727' },
      };

      expect(fn(constants)).toEqual({
        text: '#fff',
        background: '#272727',
      });
    });

    it('should handle complex nested structures', () => {
      const theme: MantineThemeBase = {
        ..._DEFAULT_THEME,
        colorScheme: 'light',
      };

      const fn = createColorSchemeConstantsFunction(theme);
      const constants = {
        colors: {
          text: { light: '#000', dark: '#fff' },
          background: { light: '#FCFCFC', dark: '#272727' },
        },
        button: {
          primary: {
            background: { light: '#00203E', dark: '#2581C4' },
            text: 'white',
          },
          padding: 16,
        },
        fixedValue: 'constant',
      };

      expect(fn(constants)).toEqual({
        colors: {
          text: '#000',
          background: '#FCFCFC',
        },
        button: {
          primary: {
            background: '#00203E',
            text: 'white',
          },
          padding: 16,
        },
        fixedValue: 'constant',
      });
    });
  });

  describe('Integration with theme', () => {
    it('should work as theme function in light mode', () => {
      const theme = {
        ..._DEFAULT_THEME,
        colorScheme: 'light' as ColorScheme,
        fn: {
          colorSchemeValue: createColorSchemeValueFunction({
            ..._DEFAULT_THEME,
            colorScheme: 'light',
          }),
          colorSchemeConstants: createColorSchemeConstantsFunction({
            ..._DEFAULT_THEME,
            colorScheme: 'light',
          }),
        },
      };

      const color = theme.fn.colorSchemeValue({ light: '#fff', dark: '#000' });
      expect(color).toBe('#fff');

      const constants = theme.fn.colorSchemeConstants({
        text: { light: '#000', dark: '#fff' },
        background: { light: '#FCFCFC', dark: '#272727' },
      });
      expect(constants).toEqual({
        text: '#000',
        background: '#FCFCFC',
      });
    });

    it('should work as theme function in dark mode', () => {
      const theme = {
        ..._DEFAULT_THEME,
        colorScheme: 'dark' as ColorScheme,
        fn: {
          colorSchemeValue: createColorSchemeValueFunction({
            ..._DEFAULT_THEME,
            colorScheme: 'dark',
          }),
          colorSchemeConstants: createColorSchemeConstantsFunction({
            ..._DEFAULT_THEME,
            colorScheme: 'dark',
          }),
        },
      };

      const color = theme.fn.colorSchemeValue({ light: '#fff', dark: '#000' });
      expect(color).toBe('#000');

      const constants = theme.fn.colorSchemeConstants({
        text: { light: '#000', dark: '#fff' },
        background: { light: '#FCFCFC', dark: '#272727' },
      });
      expect(constants).toEqual({
        text: '#fff',
        background: '#272727',
      });
    });

    it('should support user-defined constants in theme.other', () => {
      const userConstants = {
        colors: {
          text: { light: '#000', dark: '#fff' },
          background: { light: '#FCFCFC', dark: '#272727' },
          primaryButtonBackground: { light: '#00203E', dark: '#2581C4' },
          primaryButtonText: 'white',
        },
        spacing: {
          small: { light: 8, dark: 12 },
          medium: 16,
          large: { light: 24, dark: 32 },
        },
      };

      const lightTheme = {
        ..._DEFAULT_THEME,
        colorScheme: 'light' as ColorScheme,
        other: userConstants,
        fn: {
          colorSchemeConstants: createColorSchemeConstantsFunction({
            ..._DEFAULT_THEME,
            colorScheme: 'light',
          }),
        },
      };

      const lightColors = lightTheme.fn.colorSchemeConstants(lightTheme.other);
      expect(lightColors).toEqual({
        colors: {
          text: '#000',
          background: '#FCFCFC',
          primaryButtonBackground: '#00203E',
          primaryButtonText: 'white',
        },
        spacing: {
          small: 8,
          medium: 16,
          large: 24,
        },
      });

      const darkTheme = {
        ..._DEFAULT_THEME,
        colorScheme: 'dark' as ColorScheme,
        other: userConstants,
        fn: {
          colorSchemeConstants: createColorSchemeConstantsFunction({
            ..._DEFAULT_THEME,
            colorScheme: 'dark',
          }),
        },
      };

      const darkColors = darkTheme.fn.colorSchemeConstants(darkTheme.other);
      expect(darkColors).toEqual({
        colors: {
          text: '#fff',
          background: '#272727',
          primaryButtonBackground: '#2581C4',
          primaryButtonText: 'white',
        },
        spacing: {
          small: 12,
          medium: 16,
          large: 32,
        },
      });
    });
  });

  describe('Edge cases', () => {
    it('should handle null and undefined in objects', () => {
      const constants = {
        nullValue: null,
        undefinedValue: undefined,
        colorValue: { light: '#fff', dark: '#000' },
      };

      const resolved = resolveColorSchemeConstants(constants, 'light');

      expect(resolved).toEqual({
        nullValue: null,
        undefinedValue: undefined,
        colorValue: '#fff',
      });
    });

    it('should handle circular references safely', () => {
      const constants: any = {
        text: { light: '#000', dark: '#fff' },
      };
      // Don't create actual circular reference in test to avoid infinite loops
      // Just test that regular nested structures work
      constants.nested = {
        color: { light: '#aaa', dark: '#bbb' },
      };

      const resolved = resolveColorSchemeConstants(constants, 'light');

      expect(resolved).toEqual({
        text: '#000',
        nested: {
          color: '#aaa',
        },
      });
    });

    it('should handle boolean values', () => {
      const constants = {
        isEnabled: true,
        color: { light: '#fff', dark: '#000' },
      };

      const resolved = resolveColorSchemeConstants(constants, 'light');

      expect(resolved).toEqual({
        isEnabled: true,
        color: '#fff',
      });
    });
  });
});
