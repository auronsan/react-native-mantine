import type { ImageStyle, TextStyle, ViewStyle } from 'react-native';

import { StyleSheet } from 'react-native';

import { useTheme } from './theme-provider';

import type { MantineTheme } from './types';

/**
 * Type constraint for style objects
 * Ensures each property is a valid React Native style type
 */
type NamedStyles<T> = {
  [P in keyof T]: ViewStyle | TextStyle | ImageStyle;
};

type Variations =
  | {
      variant?: string;
      size: string | number;
    }
  | any;

/**
 * Creates a styles hook with proper TypeScript inference
 *
 * @template Styles - The shape of the styles object
 * @template Params - The shape of the params object (defaults to any for backward compatibility)
 * @param input - Function that returns style definitions based on theme, params, and variations
 * @returns A hook that returns typed styles
 *
 * @example
 * ```tsx
 * const useStyles = createStyles(
 *   (theme, params: { color: string }) => ({
 *     container: {
 *       backgroundColor: params.color,
 *       padding: theme.spacing.md,
 *     },
 *     text: {
 *       color: theme.colors.dark[0],
 *       fontSize: theme.fontSizes.md,
 *     },
 *   })
 * );
 *
 * // In component:
 * const { styles } = useStyles({ color: 'red' });
 * <View style={styles.container}>
 *   <Text style={styles.text}>Hello</Text>
 * </View>
 * ```
 */
export function createStyles<
  Styles extends NamedStyles<Styles> = any,
  Params = any
>(
  input: (
    theme: MantineTheme,
    params: Params,
    variations?: Variations
  ) => Styles
) {
  const getStyleObject = typeof input === 'function' ? input : () => input;

  function useStyles(params?: Params, variations?: Variations) {
    const theme = useTheme();
    const styleObject = getStyleObject(theme, params as Params, variations);
    const sx = (...args: any) => {
      return args;
    };
    return {
      styles: StyleSheet.create(styleObject) as Readonly<Styles>,
      theme,
      sx,
    };
  }

  return useStyles;
}
