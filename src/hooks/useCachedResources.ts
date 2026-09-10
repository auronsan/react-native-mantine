import { useEffect, useState } from 'react'
import { useAdapter } from '../adapters/context';
import type { MantineAdapters } from '../adapters/types';

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
          await loadFonts({
            Nunito: require('../fonts/Nunito-Regular.ttf'),
            'Nunito Bold': require('../fonts/Nunito-Bold.ttf'),
            'Nunito SemiBold': require('../fonts/Nunito-SemiBold.ttf'),
          })
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
