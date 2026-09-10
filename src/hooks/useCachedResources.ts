import { useEffect, useState } from 'react'
import { useAdapter } from '../adapters/context';
import type { MantineAdapters } from '../adapters/types';
import { getBundledFonts, markBundledFontsLoaded } from '../theme/bundled-fonts';

export interface UseCachedResourcesOptions {
  /**
   * Font loader to use. Defaults to the `loadFonts` adapter
   * (`configureMantine` / `ThemeProvider adapters`), otherwise expo-font
   * when it is installed. Fonts are skipped when nothing is available.
   */
  loadFonts?: MantineAdapters['loadFonts'];
}

export default function useCachedResources(
  options: UseCachedResourcesOptions = {}
): boolean {
  const [isLoadingComplete, setLoadingComplete] = useState(false)
  const loadFontsAdapter = useAdapter('loadFonts', { warn: false });
  const loadFonts = options.loadFonts ?? loadFontsAdapter;

  // Load any resources or data that we need prior to rendering the app
  useEffect(() => {
    async function loadResourcesAndDataAsync(): Promise<void> {
      try {
        // Only load fonts if a font loader is available
        if (typeof loadFonts === 'function') {
          await loadFonts(getBundledFonts());
          markBundledFontsLoaded();
        }
      } catch (e) {
        // Error silently ignored - consider adding error reporting in production
        console.warn('Failed to load custom fonts:', e);
      } finally {
        setLoadingComplete(true)
      }
    }

    loadResourcesAndDataAsync()
  }, [])

  return isLoadingComplete
}
