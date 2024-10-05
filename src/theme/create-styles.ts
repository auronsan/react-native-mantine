import type { ImageStyle, TextStyle, ViewStyle } from 'react-native';

import { StyleSheet } from 'react-native';

import { useTheme } from './theme-provider';

import type { TTheme } from './default-theme';

type NamedStyles<T> = {
  [P in keyof T]: ViewStyle | TextStyle | ImageStyle;
};

export function createStyles<T = any>(
  input: (theme: TTheme, params: any) => NamedStyles<T>
) {
  const getStyleObject = typeof input === 'function' ? input : () => input;
  function useStyles(params?: any) {
    const theme = useTheme();
    const styleObject = getStyleObject(theme, params);
    const sx = (...args: any) => {
      return args;
    };
    return {
      styles: StyleSheet.create(styleObject),
      theme,
      sx,
    };
  }

  return useStyles;
}
