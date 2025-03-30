import type { ImageStyle, TextStyle, ViewStyle } from 'react-native';

import { StyleSheet } from 'react-native';

import { useTheme } from './theme-provider';

import type { MantineTheme } from './default-theme';

type NamedStyles<T> = {
  [P in keyof T]: ViewStyle | TextStyle | ImageStyle;
};

type Variations =
  | {
      variant?: string;
      size: string | number;
    }
  | any;

export function createStyles<T = any>(
  input: (
    theme: MantineTheme,
    params: any,
    variations?: Variations
  ) => NamedStyles<T>
) {
  const getStyleObject = typeof input === 'function' ? input : () => input;
  function useStyles(params?: any, variations?: Variations) {
    const theme = useTheme();
    const styleObject = getStyleObject(theme, params, variations);
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
