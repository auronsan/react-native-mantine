import type { StyleProp, ViewStyle } from 'react-native';

type StyleObject = StyleProp<ViewStyle>;
export type ClassNames<StylesNames extends string> = Partial<
  Record<StylesNames, string>
>;
export type Styles<
  StylesNames extends string,
  StylesParams extends Record<string, any> = never,
> =
  | Partial<Record<StylesNames, StyleObject>>
  | ((
      theme: any,
      params: StylesParams,
      context: any
    ) => Partial<Record<StylesNames, StyleObject>>);

export interface DefaultProps {
  style?: StyleProp<ViewStyle>;
}
