import type {  MantineNumberSize } from '../../types';

export function radius(theme: any) {
  return (size?: MantineNumberSize): string | number => {
    if (!size) {
      return theme.defaultRadius;
    }

    const defaultRadius =
      typeof theme.defaultRadius === 'number'
        ? theme.defaultRadius
        : theme.radius[theme.defaultRadius] || theme.defaultRadius;

    return theme.radius[size] || size || defaultRadius;
  };
}
