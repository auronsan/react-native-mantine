type CSSObject = any
export type ClassNames<StylesNames extends string> = Partial<Record<StylesNames, string>>;
export type Styles<StylesNames extends string, StylesParams extends Record<string, any> = never> =
  | Partial<Record<StylesNames, CSSObject>>
  | ((
      theme: any,
      params: StylesParams,
      context: any
    ) => Partial<Record<StylesNames, CSSObject>>);

export interface DefaultProps  {
  style?: any;
}
