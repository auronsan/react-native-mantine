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
import { AdaptersContext } from '../adapters/context';
import type { MantineAdapters } from '../adapters/types';

type ThemeProps = {
  children: ReactNode;
  theme?: Partial<MantineTheme>;
  forceMode?: 'light' | 'dark';
  /** Optional native integrations (icons, gradients, clipboard, ...) */
  adapters?: Partial<MantineAdapters>;
};

export const ThemeContext = createContext<any>(null);

export const ThemeProvider = ({
  children,
  theme,
  forceMode,
  adapters,
}: {
  children: React.ReactNode;
  theme: MantineTheme;
  forceMode?: 'light' | 'dark';
  /** Optional native integrations (icons, gradients, clipboard, ...) */
  adapters?: Partial<MantineAdapters>;
}): React.ReactElement => {
  const systemDarkMode = Appearance.getColorScheme();
  const [currentMode, setCurrentMode] = useState<'light' | 'dark'>(
    forceMode || systemDarkMode || 'light'
  );

  // Keep the scheme in sync when the `forceMode` prop changes after mount
  // (e.g. an app-level dark mode switch). Without this the prop was only
  // read as the initial state.
  useEffect(() => {
    if (forceMode && forceMode !== currentMode) {
      setCurrentMode(forceMode);
    }
  }, [forceMode]);

  const toggleMode = (): void => {
    setCurrentMode(currentMode === 'light' ? 'dark' : 'light');
  };

  const forceModeDevice = (mode: ColorSchemeName) => {
    try {
      Appearance.setColorScheme(mode);
    } catch (e) {
      if (__DEV__) {
        console.warn(
          '[MantineProvider] Appearance.setColorScheme is not supported on this platform/React Native version; color scheme will only be applied to Mantine components.',
          e
        );
      }
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

  // Only provide the adapters context when adapters are given so an outer
  // AdaptersContext.Provider (if any) keeps working unchanged.
  const content = adapters ? (
    <AdaptersContext.Provider value={adapters}>{children}</AdaptersContext.Provider>
  ) : (
    children
  );

  return (
    <ThemeContext.Provider value={memoValue}>{content}</ThemeContext.Provider>
  );
};

export const useTheme = (): MantineTheme => useContext(ThemeContext);

export const Theme = ({
  children,
  theme: themeOverwrite,
  forceMode,
  adapters,
}: ThemeProps): React.ReactElement => {
  const loaded = useCachedResources({ loadFonts: adapters?.loadFonts });

  const theme = useMemo(() => {
    return createTheme(themeOverwrite);
  }, [themeOverwrite]);

  if (!loaded) {
    return <ActivityIndicator />;
  }
  return (
    <ThemeProvider theme={theme} forceMode={forceMode} adapters={adapters}>
      {children}
    </ThemeProvider>
  );
};

/**
 * Accessibility props are always optional pass-through props: components set a
 * derived default and then spread the remaining props so that a consumer-supplied
 * value wins. They are therefore excluded from the "has a default" mapping below,
 * otherwise TypeScript treats them as always present (TS2783).
 */
type AccessibilityPassThroughKeys =
  | 'accessible'
  | 'accessibilityLabel'
  | 'accessibilityHint'
  | 'accessibilityRole'
  | 'accessibilityState'
  | 'accessibilityValue';

export function useComponentDefaultProps<
  T extends Record<string, any>,
  U extends Partial<T> = {},
>(
  component: string,
  defaultProps: U,
  props: T
): T & {
  [Key in Exclude<
    Extract<keyof T, keyof U>,
    AccessibilityPassThroughKeys
  >]-?: U[Key] | NonNullable<T[Key]>;
} {
  const theme = useTheme();
  const contextPropsPayload = theme?.components?.[component]?.defaultProps;
  const contextProps =
    typeof contextPropsPayload === 'function'
      ? contextPropsPayload(theme)
      : contextPropsPayload;

  return { ...defaultProps, ...contextProps, ...filterProps(props) };
}
