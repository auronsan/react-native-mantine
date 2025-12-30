import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { ActivityIndicator, Appearance, Platform } from 'react-native';

import type { ColorSchemeName } from 'react-native';

import type { ReactNode } from 'react';

import { Layout } from './constants';
import type { MantineTheme } from './types';
import { createTheme } from './create-theme';

import { filterProps } from './filter-props';
import useCachedResources from '../hooks/useCachedResources';

type ThemeProps = {
  children: ReactNode;
  theme?: Partial<MantineTheme>;
  forceMode?: 'light' | 'dark';
};

export const ThemeContext = createContext<any>(null);

export const ThemeProvider = ({
  children,
  theme,
  forceMode,
}: {
  children: React.ReactNode;
  theme: MantineTheme;
  forceMode?: 'light' | 'dark';
}): React.ReactElement => {
  const systemDarkMode = Appearance.getColorScheme();
  const [currentMode, setCurrentMode] = useState<'light' | 'dark'>(
    forceMode || systemDarkMode || 'light'
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
    return {
      ...theme,
      colorScheme: currentMode,
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

export const useTheme = (): MantineTheme => useContext(ThemeContext);

export const Theme = ({
  children,
  theme: themeOverwrite,
  forceMode,
}: ThemeProps): React.ReactElement => {
  const loaded = useCachedResources();

  const theme = useMemo(() => {
    return createTheme(themeOverwrite);
  }, [themeOverwrite]);

  if (!loaded) {
    return <ActivityIndicator />;
  }
  return (
    <ThemeProvider theme={theme} forceMode={forceMode}>
      {children}
    </ThemeProvider>
  );
};

export function useComponentDefaultProps<
  T extends Record<string, any>,
  U extends Partial<T> = {},
>(
  component: string,
  defaultProps: U,
  props: T
): T & {
  [Key in Extract<keyof T, keyof U>]-?: U[Key] | NonNullable<T[Key]>;
} {
  const theme = useTheme();
  const contextPropsPayload = theme?.components?.[component]?.defaultProps;
  const contextProps =
    typeof contextPropsPayload === 'function'
      ? contextPropsPayload(theme)
      : contextPropsPayload;

  return { ...defaultProps, ...contextProps, ...filterProps(props) };
}
