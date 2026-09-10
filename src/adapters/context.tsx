import { createContext, useContext } from 'react';
import { getAdapter } from './registry';
import type { AdapterName, MantineAdapters } from './types';

/**
 * React context for native integrations. `ThemeProvider` provides it when
 * given an `adapters` prop; it can also be used directly.
 */
export const AdaptersContext = createContext<Partial<MantineAdapters> | null>(
  null
);

const MISSING_MESSAGES: { [K in AdapterName]: string } = {
  Icon: 'No Icon adapter available. Icon will display the icon name as text. Install react-native-vector-icons, or pass an Icon component (e.g. FontAwesome from @expo/vector-icons) via <ThemeProvider adapters={{ Icon }}> or configureMantine({ Icon }).',
  LinearGradient:
    'No LinearGradient adapter available. Gradients will fall back to solid colors. Install expo-linear-gradient, or pass a LinearGradient component (e.g. from react-native-linear-gradient) via <ThemeProvider adapters={{ LinearGradient }}> or configureMantine({ LinearGradient }).',
  clipboard:
    'No clipboard adapter available. CopyButton will not function. Install expo-clipboard, or pass a clipboard implementation via <ThemeProvider adapters={{ clipboard }}> or configureMantine({ clipboard }).',
  documentPicker:
    'No documentPicker adapter available. FileButton and FileInput will not be able to open the file picker. Install expo-document-picker, or pass a documentPicker function via <ThemeProvider adapters={{ documentPicker }}> or configureMantine({ documentPicker }).',
  loadFonts:
    'No loadFonts adapter available. Custom fonts will not be loaded. Install expo-font, or pass a loadFonts function via <ThemeProvider adapters={{ loadFonts }}> or configureMantine({ loadFonts }).',
};

const warned = new Set<AdapterName>();

function warnMissingOnce(name: AdapterName): void {
  if (typeof __DEV__ !== 'undefined' && !__DEV__) {
    return;
  }
  if (warned.has(name)) {
    return;
  }
  warned.add(name);
  console.warn(MISSING_MESSAGES[name]);
}

/** Clears the "warned once" bookkeeping (tests only) */
export function resetAdapterWarnings(): void {
  warned.clear();
}

export interface UseAdapterOptions {
  /**
   * Log a single development-only warning when nothing is available.
   * Defaults to true; components that already warn at action time pass false.
   */
  warn?: boolean;
}

/**
 * Resolves a native integration inside a component:
 * 1. `AdaptersContext` (`<ThemeProvider adapters={...}>`)
 * 2. the global registry (`configureMantine`)
 * 3. the matching optional dependency, if installed
 *
 * Returns `undefined` when nothing is available so the caller can fall back.
 */
export function useAdapter<K extends AdapterName>(
  name: K,
  options: UseAdapterOptions = {}
): MantineAdapters[K] | undefined {
  const context = useContext(AdaptersContext);
  const fromContext = context?.[name];
  const value = fromContext !== undefined ? fromContext : getAdapter(name);

  if (value === undefined && options.warn !== false) {
    warnMissingOnce(name);
  }

  return value;
}
