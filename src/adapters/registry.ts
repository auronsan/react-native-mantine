import { resetFallbackCache, resolveFallback } from './fallbacks';
import type { AdapterName, MantineAdapters } from './types';

let registry: Partial<MantineAdapters> = {};

/**
 * Registers native integrations globally, outside of React. Useful in an app
 * entry point; `ThemeProvider adapters={...}` is the React alternative and
 * takes precedence over this registry.
 *
 * @example
 * ```ts
 * import FontAwesome from '@expo/vector-icons/FontAwesome';
 * import { LinearGradient } from 'expo-linear-gradient';
 * configureMantine({ Icon: FontAwesome, LinearGradient });
 * ```
 */
export function configureMantine(adapters: Partial<MantineAdapters>): void {
  registry = { ...registry, ...adapters };
}

/**
 * Resolves an adapter for non-component code: the registry first, then the
 * matching optional dependency if it is installed, otherwise `undefined`.
 * Inside components prefer `useAdapter`, which also reads the React context.
 */
export function getAdapter<K extends AdapterName>(
  name: K
): MantineAdapters[K] | undefined {
  const fromRegistry = registry[name];
  if (fromRegistry !== undefined) {
    return fromRegistry;
  }
  return resolveFallback(name);
}

/** Returns the current global registry (without fallbacks) */
export function getConfiguredAdapters(): Partial<MantineAdapters> {
  return registry;
}

/** Clears everything registered with `configureMantine` (tests only) */
export function resetAdapters(): void {
  registry = {};
  resetFallbackCache();
}
