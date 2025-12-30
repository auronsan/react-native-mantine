/**
 * Theme System Integration Tests
 * Tests for the new color system implementation including:
 * - themeColor function
 * - variant function
 * - primaryShade function
 * - backward compatibility
 */

import { createTheme } from '../../../create-theme';
import { getPrimaryShade, getPrimaryColor } from '../primary-shade';
import { themeColor } from '../theme-color/theme-color';
import { variant } from '../variant';
import type { MantineTheme, MantineThemeBase } from '../../../types';

describe('Theme Color System', () => {
  let theme: MantineTheme;
  let themeBase: MantineThemeBase;

  beforeEach(() => {
    // Create a test theme with default configuration
    theme = createTheme({
      primaryColor: 'blue',
      primaryShade: { light: 6, dark: 8 },
    });

    // Extract base theme for variant function
    const { fn, ...base } = theme;
    themeBase = base;
  });

  describe('themeColor function', () => {
    it('should return color at primary shade by default', () => {
      const color = themeColor({ theme, color: 'blue' });
      expect(color).toBe(theme.colors.blue[6]); // default light mode primary shade
    });

    it('should return color at specific shade', () => {
      const color = themeColor({ theme, color: 'red', shade: 5 });
      expect(color).toBe(theme.colors.red[5]);
    });

    it('should pass through CSS color values', () => {
      expect(themeColor({ theme, color: '#ff0000' })).toBe('#ff0000');
      expect(themeColor({ theme, color: 'rgb(255, 0, 0)' })).toBe('rgb(255, 0, 0)');
      expect(themeColor({ theme, color: 'transparent' })).toBe('transparent');
    });

    it('should handle invalid color with primaryFallback', () => {
      const color = themeColor({ theme, color: 'invalid', primaryFallback: true });
      expect(color).toBe(theme.colors.blue[6]);
    });

    it('should return color as-is without primaryFallback', () => {
      const color = themeColor({ theme, color: 'invalid', primaryFallback: false });
      expect(color).toBe('invalid');
    });

    it('should handle all default colors', () => {
      const colors = ['dark', 'gray', 'red', 'pink', 'grape', 'violet', 'indigo', 'blue', 'cyan', 'teal', 'green', 'lime', 'yellow', 'orange'];

      colors.forEach(color => {
        const result = themeColor({ theme, color, shade: 5 });
        const colorPalette = theme.colors[color];
        expect(colorPalette).toBeDefined();
        expect(result).toBe(colorPalette![5]);
      });
    });
  });

  describe('primaryShade function', () => {
    it('should return correct shade for light mode', () => {
      const shade = getPrimaryShade(theme, 'light');
      expect(shade).toBe(6);
    });

    it('should return correct shade for dark mode', () => {
      const shade = getPrimaryShade(theme, 'dark');
      expect(shade).toBe(8);
    });

    it('should use theme.colorScheme when no override provided', () => {
      const lightTheme = createTheme({ colorScheme: 'light', primaryShade: { light: 5, dark: 7 } });
      expect(getPrimaryShade(lightTheme)).toBe(5);

      const darkTheme = createTheme({ colorScheme: 'dark', primaryShade: { light: 5, dark: 7 } });
      expect(getPrimaryShade(darkTheme)).toBe(7);
    });

    it('should handle single shade value', () => {
      const singleShadeTheme = createTheme({ primaryShade: 7 });
      expect(getPrimaryShade(singleShadeTheme, 'light')).toBe(7);
      expect(getPrimaryShade(singleShadeTheme, 'dark')).toBe(7);
    });
  });

  describe('primaryColor function', () => {
    it('should return primary color at primary shade', () => {
      const color = getPrimaryColor(theme, 'light');
      expect(color).toBe(theme.colors.blue[6]);
    });

    it('should adapt to color scheme', () => {
      const lightColor = getPrimaryColor(theme, 'light');
      const darkColor = getPrimaryColor(theme, 'dark');

      expect(lightColor).toBe(theme.colors.blue[6]);
      expect(darkColor).toBe(theme.colors.blue[8]);
    });

    it('should handle invalid primary color gracefully', () => {
      const invalidTheme = createTheme({ primaryColor: 'invalid' as any });
      const color = getPrimaryColor(invalidTheme);

      // Should fallback to blue
      expect(color).toMatch(/^#[0-9a-f]{6}$/i);
    });
  });

  describe('variant function', () => {
    let variantFn: ReturnType<typeof variant>;

    beforeEach(() => {
      variantFn = variant(themeBase);
    });

    it('should handle filled variant', () => {
      const result = variantFn({ variant: 'filled', color: 'blue' });

      expect(result.background).toBe(theme.colors.blue[6]);
      expect(result.color).toBe(theme.white);
      expect(result.border).toBe(theme.colors.blue[6]);
    });

    it('should handle light variant', () => {
      const result = variantFn({ variant: 'light', color: 'blue' });

      expect(result.background).toBe(theme.colors.blue[0]);
      expect(result.color).toBe(theme.colors.blue[7]);
      expect(result.border).toBe('transparent');
    });

    it('should handle outline variant', () => {
      const result = variantFn({ variant: 'outline', color: 'red' });

      expect(result.background).toBe('transparent');
      expect(result.color).toBe(theme.colors.red[6]);
      expect(result.border).toBe(theme.colors.red[6]);
    });

    it('should handle subtle variant', () => {
      const result = variantFn({ variant: 'subtle', color: 'green' });

      expect(result.background).toBe('transparent');
      expect(result.color).toBe(theme.colors.green[6]);
      expect(result.border).toBe('transparent');
    });

    it('should handle default variant', () => {
      const result = variantFn({ variant: 'default', color: 'gray' });

      expect(result.background).toBe(theme.white);
      expect(result.color).toBe(theme.black);
      expect(result.border).toBe(theme.colors.gray[4]);
    });

    it('should handle transparent variant', () => {
      const result = variantFn({ variant: 'transparent', color: 'blue' });

      expect(result.background).toBe('transparent');
      expect(result.color).toBe(theme.colors.blue[6]);
      expect(result.border).toBe('transparent');
    });

    it('should use primaryFallback for invalid colors', () => {
      const result = variantFn({ variant: 'filled', color: 'invalid', primaryFallback: true });

      expect(result.background).toBe(theme.colors.blue[6]);
      expect(result.color).toBe(theme.white);
    });
  });

  describe('Theme customization', () => {
    it('should support custom primary color', () => {
      const customTheme = createTheme({
        primaryColor: 'teal',
        primaryShade: 7,
      });

      const color = getPrimaryColor(customTheme);
      expect(color).toBe(customTheme.colors.teal[7]);
    });

    it('should support custom color palettes', () => {
      const customTheme = createTheme({
        colors: {
          brand: [
            '#e6f7ff',
            '#bae7ff',
            '#91d5ff',
            '#69c0ff',
            '#40a9ff',
            '#1890ff',
            '#096dd9',
            '#0050b3',
            '#003a8c',
            '#002766',
          ] as const,
        },
        primaryColor: 'brand' as any,
      });

      const color = themeColor({ theme: customTheme, color: 'brand', shade: 5 });
      expect(color).toBe('#1890ff');
    });

    it('should merge custom colors with defaults', () => {
      const customTheme = createTheme({
        colors: {
          brand: [
            '#e6f7ff',
            '#bae7ff',
            '#91d5ff',
            '#69c0ff',
            '#40a9ff',
            '#1890ff',
            '#096dd9',
            '#0050b3',
            '#003a8c',
            '#002766',
          ] as const,
        },
      });

      // Should have custom color
      expect(customTheme.colors.brand).toBeDefined();

      // Should also have default colors
      expect(customTheme.colors.blue).toBeDefined();
      expect(customTheme.colors.red).toBeDefined();
    });
  });

  describe('Backward compatibility', () => {
    it('should maintain theme structure', () => {
      expect(theme).toHaveProperty('colors');
      expect(theme).toHaveProperty('primaryColor');
      expect(theme).toHaveProperty('primaryShade');
      expect(theme).toHaveProperty('fn');
      expect(theme).toHaveProperty('spacing');
      expect(theme).toHaveProperty('fontSizes');
    });

    it('should have all theme functions', () => {
      expect(theme.fn.themeColor).toBeInstanceOf(Function);
      expect(theme.fn.primaryShade).toBeInstanceOf(Function);
      expect(theme.fn.primaryColor).toBeInstanceOf(Function);
      expect(theme.fn.variant).toBeInstanceOf(Function);
      expect(theme.fn.rgba).toBeInstanceOf(Function);
      expect(theme.fn.radius).toBeInstanceOf(Function);
      expect(theme.fn.size).toBeInstanceOf(Function);
    });

    it('should work with theme.fn.themeColor', () => {
      const color = theme.fn.themeColor('blue', 5);
      expect(color).toBe(theme.colors.blue[5]);
    });

    it('should work with theme.fn.variant', () => {
      const result = theme.fn.variant({ variant: 'filled', color: 'blue' });
      expect(result.background).toBe(theme.colors.blue[6]);
    });

    it('should work with theme.fn.primaryShade', () => {
      const shade = theme.fn.primaryShade('light');
      expect(shade).toBe(6);
    });

    it('should work with theme.fn.primaryColor', () => {
      const color = theme.fn.primaryColor('light');
      expect(color).toBe(theme.colors.blue[6]);
    });
  });

  describe('Custom color support', () => {
    describe('Hex colors', () => {
      it('should handle custom hex color without shade', () => {
        const color = themeColor({ theme, color: '#FF5733' });
        expect(color).toBe('#FF5733');
      });

      it('should handle custom hex color with shade 6 (base)', () => {
        const color = themeColor({ theme, color: '#FF5733', shade: 6 });
        expect(color).toBe('#FF5733');
      });

      it('should handle custom hex color with lighter shade', () => {
        const color = themeColor({ theme, color: '#FF5733', shade: 0 });
        expect(color).toContain('rgba');
        // Should be much lighter than base
        expect(color).not.toBe('#FF5733');
      });

      it('should handle custom hex color with darker shade', () => {
        const color = themeColor({ theme, color: '#FF5733', shade: 9 });
        expect(color).toContain('rgba');
        // Should be much darker than base
        expect(color).not.toBe('#FF5733');
      });

      it('should handle short hex notation', () => {
        const color = themeColor({ theme, color: '#f00' });
        expect(color).toBe('#f00');
      });

      it('should handle hex color in filled variant', () => {
        const variantFn = variant(themeBase);
        const result = variantFn({ variant: 'filled', color: '#FF5733' });
        expect(result.background).toBe('#FF5733');
        expect(result.color).toBe(theme.white);
        expect(result.border).toBe('#FF5733');
      });

      it('should handle hex color in light variant', () => {
        const variantFn = variant(themeBase);
        const result = variantFn({ variant: 'light', color: '#FF5733' });
        expect(result.background).toContain('rgba'); // Should be lightened
        expect(result.color).toContain('rgba'); // Should be darker for text
        expect(result.border).toBe('transparent');
      });

      it('should handle hex color in outline variant', () => {
        const variantFn = variant(themeBase);
        const result = variantFn({ variant: 'outline', color: '#FF5733' });
        expect(result.background).toBe('transparent');
        expect(result.color).toBe('#FF5733');
        expect(result.border).toBe('#FF5733');
      });
    });

    describe('RGB/RGBA colors', () => {
      it('should handle custom rgb color without shade', () => {
        const color = themeColor({ theme, color: 'rgb(255, 87, 51)' });
        expect(color).toBe('rgb(255, 87, 51)');
      });

      it('should handle custom rgba color without shade', () => {
        const color = themeColor({ theme, color: 'rgba(255, 87, 51, 0.5)' });
        expect(color).toBe('rgba(255, 87, 51, 0.5)');
      });

      it('should handle custom rgb color with shade 6 (base)', () => {
        const color = themeColor({ theme, color: 'rgb(255, 87, 51)', shade: 6 });
        expect(color).toBe('rgb(255, 87, 51)');
      });

      it('should handle custom rgb color with lighter shade', () => {
        const color = themeColor({ theme, color: 'rgb(255, 87, 51)', shade: 2 });
        expect(color).toContain('rgba');
        // Should be lighter than base
        expect(color).not.toBe('rgb(255, 87, 51)');
      });

      it('should handle custom rgb color with darker shade', () => {
        const color = themeColor({ theme, color: 'rgb(255, 87, 51)', shade: 8 });
        expect(color).toContain('rgba');
        // Should be darker than base
        expect(color).not.toBe('rgb(255, 87, 51)');
      });

      it('should handle rgba color in filled variant', () => {
        const variantFn = variant(themeBase);
        const result = variantFn({ variant: 'filled', color: 'rgba(255, 87, 51, 0.8)' });
        expect(result.background).toBe('rgba(255, 87, 51, 0.8)');
        expect(result.color).toBe(theme.white);
      });

      it('should handle rgb color in light variant', () => {
        const variantFn = variant(themeBase);
        const result = variantFn({ variant: 'light', color: 'rgb(255, 87, 51)' });
        expect(result.background).toContain('rgba'); // Should be lightened
        expect(result.color).toContain('rgba'); // Should be darker for text
      });
    });

    describe('Shade progression', () => {
      it('should create progressively lighter shades (0-5)', () => {
        const shade0 = themeColor({ theme, color: '#FF5733', shade: 0 });
        const shade1 = themeColor({ theme, color: '#FF5733', shade: 1 });
        const shade2 = themeColor({ theme, color: '#FF5733', shade: 2 });
        const shade3 = themeColor({ theme, color: '#FF5733', shade: 3 });
        const shade4 = themeColor({ theme, color: '#FF5733', shade: 4 });
        const shade5 = themeColor({ theme, color: '#FF5733', shade: 5 });

        // Each shade should be different
        const shades = [shade0, shade1, shade2, shade3, shade4, shade5];
        const uniqueShades = new Set(shades);
        expect(uniqueShades.size).toBe(6);
      });

      it('should create progressively darker shades (7-9)', () => {
        const shade7 = themeColor({ theme, color: '#FF5733', shade: 7 });
        const shade8 = themeColor({ theme, color: '#FF5733', shade: 8 });
        const shade9 = themeColor({ theme, color: '#FF5733', shade: 9 });

        // Each shade should be different
        const shades = [shade7, shade8, shade9];
        const uniqueShades = new Set(shades);
        expect(uniqueShades.size).toBe(3);
      });
    });

    describe('Mixed usage', () => {
      it('should handle both palette and custom colors in same component', () => {
        const variantFn = variant(themeBase);

        const paletteResult = variantFn({ variant: 'filled', color: 'blue' });
        const customResult = variantFn({ variant: 'filled', color: '#FF5733' });

        expect(paletteResult.background).toBe(theme.colors.blue[6]);
        expect(customResult.background).toBe('#FF5733');
      });

      it('should use primary fallback for invalid custom colors', () => {
        const color = themeColor({ theme, color: 'not-a-color', primaryFallback: true });
        expect(color).toBe(theme.colors.blue[6]);
      });

      it('should preserve backward compatibility with CSS keywords', () => {
        expect(themeColor({ theme, color: 'transparent' })).toBe('transparent');
        expect(themeColor({ theme, color: 'currentColor' })).toBe('currentColor');
      });
    });
  });

  describe('Edge cases', () => {
    it('should handle undefined color gracefully', () => {
      const color = themeColor({ theme, color: undefined as any, primaryFallback: true });
      expect(color).toBe(theme.colors.blue[6]);
    });

    it('should handle null color gracefully', () => {
      const color = themeColor({ theme, color: null as any, primaryFallback: true });
      expect(color).toBe(theme.colors.blue[6]);
    });

    it('should handle shade bounds (0-9)', () => {
      expect(themeColor({ theme, color: 'blue', shade: 0 })).toBe(theme.colors.blue[0]);
      expect(themeColor({ theme, color: 'blue', shade: 9 })).toBe(theme.colors.blue[9]);
    });

    it('should handle variant with CSS color', () => {
      const variantFn = variant(themeBase);
      const result = variantFn({ variant: 'filled', color: '#ff0000' });
      expect(result.background).toBe('#ff0000');
      expect(result.color).toBe(theme.white);
    });
  });

  describe('Performance', () => {
    it('should handle multiple themeColor calls efficiently', () => {
      const start = Date.now();

      for (let i = 0; i < 1000; i++) {
        themeColor({ theme, color: 'blue', shade: (i % 10) as any });
      }

      const duration = Date.now() - start;
      expect(duration).toBeLessThan(100); // Should complete in less than 100ms
    });

    it('should handle multiple variant calls efficiently', () => {
      const start = Date.now();
      const variantFn = variant(theme);

      for (let i = 0; i < 1000; i++) {
        variantFn({ variant: 'filled', color: 'blue' });
      }

      const duration = Date.now() - start;
      expect(duration).toBeLessThan(100); // Should complete in less than 100ms
    });
  });
});
