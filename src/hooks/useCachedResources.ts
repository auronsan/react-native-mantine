import { useEffect, useState } from 'react'

// Optional import for expo-font
let Font: any = null;
try {
  Font = require('expo-font');
} catch (error) {
  // expo-font not available, will skip font loading
  console.warn('expo-font not available. Custom fonts will not be loaded. Install expo-font if you need custom font support.');
}

export default function useCachedResources(): boolean {
  const [isLoadingComplete, setLoadingComplete] = useState(false)

  // Load any resources or data that we need prior to rendering the app
  useEffect(() => {
    async function loadResourcesAndDataAsync(): Promise<void> {
      try {
        // Only load fonts if expo-font is available
        if (Font?.loadAsync) {
          await Font.loadAsync({
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
