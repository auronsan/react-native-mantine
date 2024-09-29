import { get } from 'lodash-es';
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { Appearance, Platform } from 'react-native';

import type { ColorSchemeName } from 'react-native';

import type { ReactNode } from 'react';

import { Layout } from './constants';
import type { TTheme } from './default-theme';
import { generateTheme } from './generate-theme';

import { createStyles } from './create-styles';

type ThemeProps = {
  children: ReactNode;
  theme?: Partial<TTheme>;
};

export const ThemeContext = createContext<any>(null);

export const ThemeProvider = ({
  children,
  theme,
}: {
  children: React.ReactNode;
  theme: TTheme;
}): React.ReactElement => {
  const { colors, primaryShade, primaryColor, secondaryColor } = theme;
  const systemDarkMode = Appearance.getColorScheme();
  const [currentMode, setCurrentMode] = useState<'light' | 'dark'>(
    systemDarkMode || 'light'
  );

  const toggleMode = (): void => {
    setCurrentMode(currentMode === 'light' ? 'dark' : 'light');
  };

  const forceModeDevice = (mode: ColorSchemeName) => {
    try {
      Appearance.setColorScheme(mode);
    } catch (e) {
      console.log('failed set scheme');
    }
  };

  useEffect(() => {
    forceModeDevice(currentMode);
  }, [currentMode]);

  const memoValue = useMemo(() => {
    const darkTheme = {
      light: theme.dark,
      dark: theme.light,
    };

    return {
      ...theme,
      primaryTextColor: get(colors, `${primaryColor}.${primaryShade}`, 'black'),
      primaryBgColor: get(colors, `${primaryColor}.${primaryShade}`),
      secondaryBgColor: get(colors, `${secondaryColor}.0`),
      ...(currentMode === 'dark' ? darkTheme : {}),
      window: Layout.window,
      isSmallDevice: Layout.isSmallDevice,
      screen: Layout.screen,
      bottomNavBarHeight: Layout.bottomNavBarHeight,
      isIOS: Platform.OS === 'ios',
      OSVersion: Platform.Version ? parseInt(Platform.Version as any, 10) : 0,
      currentMode,
      toggleMode,
      setCurrentMode,
    };
  }, [currentMode, theme]);

  return (
    <ThemeContext.Provider value={memoValue}>{children}</ThemeContext.Provider>
  );
};

export const useTheme = (): TTheme => useContext(ThemeContext);

export const Theme = ({
  children,
  theme: themeOverwrite,
}: ThemeProps): React.ReactElement => {
  const theme = useMemo(() => {
    return generateTheme(themeOverwrite);
  }, [themeOverwrite]);
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export { createStyles };
