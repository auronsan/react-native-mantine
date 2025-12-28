import { lighten } from '../lighten';
import { darken } from '../darken';
import { dimmed } from '../dimmed';
import { DEFAULT_THEME } from '../../../default-theme';

describe('Color manipulation functions', () => {
  describe('lighten', () => {
    it('should lighten a hex color', () => {
      const result = lighten('#000000', 0.5);
      expect(result).toBe('rgba(128, 128, 128, 1)');
    });

    it('should lighten an rgb color', () => {
      const result = lighten('rgb(100, 100, 100)', 0.5);
      expect(result).toBe('rgba(178, 178, 178, 1)');
    });

    it('should lighten an rgba color', () => {
      const result = lighten('rgba(100, 100, 100, 0.5)', 0.3);
      expect(result).toBe('rgba(147, 147, 147, 0.5)');
    });
  });

  describe('darken', () => {
    it('should darken a hex color', () => {
      const result = darken('#ffffff', 0.5);
      expect(result).toBe('rgba(128, 128, 128, 1)');
    });

    it('should darken an rgb color', () => {
      const result = darken('rgb(200, 200, 200)', 0.5);
      expect(result).toBe('rgba(100, 100, 100, 1)');
    });

    it('should darken an rgba color', () => {
      const result = darken('rgba(200, 200, 200, 0.8)', 0.3);
      expect(result).toBe('rgba(140, 140, 140, 0.8)');
    });
  });

  describe('dimmed', () => {
    it('should return dark color for dark mode', () => {
      const theme = { ...DEFAULT_THEME, currentMode: 'dark' as const };
      const dimmedFn = dimmed(theme);
      const result = dimmedFn();
      expect(result).toBe('#909296');
    });

    it('should return gray color for light mode', () => {
      const theme = { ...DEFAULT_THEME, currentMode: 'light' as const };
      const dimmedFn = dimmed(theme);
      const result = dimmedFn();
      expect(result).toBe('#868e96');
    });

    it('should default to light mode when currentMode is not set', () => {
      const dimmedFn = dimmed(DEFAULT_THEME);
      const result = dimmedFn();
      expect(result).toBe('#868e96');
    });
  });
});
