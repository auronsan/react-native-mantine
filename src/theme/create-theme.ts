import { DEFAULT_COLORS, DEFAULT_THEME } from './default-theme';
import type { MantineTheme } from './default-theme';

export const createTheme = (theme?: Partial<MantineTheme>): MantineTheme => {
  const { primaryShade = 7, other = {} } = theme || {};
  return {
    ...DEFAULT_THEME,
    primaryShade: primaryShade,
    other: other,
    fontFamily: 'Nunito',
    fontFamilyBold: 'Nunito Bold',
    fontFamilySemiBold: 'Nunito SemiBold',
    fontFamilyInput: 'Nunito',
    primaryColor: 'blue',
    secondaryColor: 'cyan',
    headings: {
      ...DEFAULT_THEME.headings,
      fontFamily: 'Nunito',
    },
    colors: DEFAULT_COLORS,
  };
};
