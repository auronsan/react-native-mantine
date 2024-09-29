import { DEFAULT_COLORS, DEFAULT_THEME } from './default-theme';
import type { TTheme } from './default-theme';
export const generateTheme = (theme?: Partial<TTheme>): TTheme => {
  const { primaryShade = 7, other = {} } = theme || {};
  return {
    ...DEFAULT_THEME,
    primaryShade: primaryShade,
    other: other,
    fontFamily: 'Nunito',
    fontFamilyBold: 'Nunito Bold',
    fontFamilySemiBold: 'Nunito SemiBold',
    fontFamilyInput: 'Nunito',
    primaryColor: 'tenant',
    secondaryColor: 'blue',
    headings: {
      fontFamily: 'Nunito',
    },
    colors: DEFAULT_COLORS,
  };
};
