import { DEFAULT_COLORS, DEFAULT_THEME } from './default-theme';
import type { MantineTheme } from './default-theme';
import { attachFunctions } from './functions/attach-functions';

export const createTheme = (theme?: Partial<MantineTheme>): MantineTheme => {
  const { primaryShade, other = {}, components = {} } = theme || {};
  const themeBase = {
    ...DEFAULT_THEME,
    // Use provided primaryShade or fall back to DEFAULT_THEME's value
    primaryShade: primaryShade !== undefined ? primaryShade : DEFAULT_THEME.primaryShade,
    other: other,
    components: components,
    fontFamily: 'Nunito',
    primaryColor: 'blue',
    secondaryColor: 'cyan',
    headings: {
      ...DEFAULT_THEME.headings,
      fontFamily: 'Nunito',
    },
    colors: DEFAULT_COLORS,
  };

  // Attach theme functions to ensure fn.gradient and other functions are available
  return attachFunctions(themeBase);
};
