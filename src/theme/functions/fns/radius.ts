import type { MantineNumberSize } from '../../types';

/**
 * Resolves a radius value from the theme.
 * - `undefined` / `null` / `''` fall back to `theme.defaultRadius`
 * - numbers (including `0`) are returned as-is
 * - theme keys (`'sm'`, `'md'`, ...) resolve to `theme.radius[key]`
 * - unknown strings are returned unchanged
 */
export function radius(theme: any) {
  return (size?: MantineNumberSize): string | number => {
    if (size === undefined || size === null || (size as unknown) === '') {
      return theme.defaultRadius;
    }

    if (typeof size === 'number') {
      return size;
    }

    return theme.radius[size] ?? size;
  };
}
