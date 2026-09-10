import type { AdapterName, MantineAdapters } from './types';

/**
 * Lazy, silent resolution of the optional dependencies the library supported
 * before adapters existed. Each module is required at most once, only when an
 * adapter is actually requested, and a missing module never logs anything.
 *
 * The `require` calls are kept lexically inside `try` blocks so Metro treats
 * them as optional dependencies and does not fail the bundle when the package
 * is not installed.
 */

const loaders: {
  [K in AdapterName]: () => MantineAdapters[K] | undefined;
} = {
  Icon: () => {
    try {
      const mod = require('react-native-vector-icons/FontAwesome');
      const Component = mod?.default ?? mod;
      return typeof Component === 'function' || typeof Component === 'object'
        ? Component
        : undefined;
    } catch (error) {
      return undefined;
    }
  },

  LinearGradient: () => {
    try {
      const mod = require('expo-linear-gradient');
      return mod?.LinearGradient ?? undefined;
    } catch (error) {
      return undefined;
    }
  },

  clipboard: () => {
    try {
      const mod = require('expo-clipboard');
      return typeof mod?.setStringAsync === 'function' ? mod : undefined;
    } catch (error) {
      return undefined;
    }
  },

  documentPicker: () => {
    try {
      const mod = require('expo-document-picker');
      return typeof mod?.getDocumentAsync === 'function'
        ? (options) => mod.getDocumentAsync(options)
        : undefined;
    } catch (error) {
      return undefined;
    }
  },

  svg: () => {
    try {
      const mod = require('react-native-svg');
      const Svg = mod?.Svg ?? mod?.default;
      const Circle = mod?.Circle;
      return Svg && Circle ? { Svg, Circle } : undefined;
    } catch (error) {
      return undefined;
    }
  },

  loadFonts: () => {
    try {
      const mod = require('expo-font');
      return typeof mod?.loadAsync === 'function'
        ? (fonts) => mod.loadAsync(fonts)
        : undefined;
    } catch (error) {
      return undefined;
    }
  },
};

const cache: Partial<{ [K in AdapterName]: MantineAdapters[K] | undefined }> =
  {};
const resolved = new Set<AdapterName>();

export function resolveFallback<K extends AdapterName>(
  name: K
): MantineAdapters[K] | undefined {
  if (!resolved.has(name)) {
    cache[name] = loaders[name]();
    resolved.add(name);
  }
  return cache[name];
}

/** Clears the lazy require cache (tests only) */
export function resetFallbackCache(): void {
  resolved.clear();
  for (const key of Object.keys(cache) as AdapterName[]) {
    delete cache[key];
  }
}
