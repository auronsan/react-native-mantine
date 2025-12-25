import * as Font from 'expo-font'
import { useEffect, useState } from 'react'

export default function useCachedResources(): boolean {
  const [isLoadingComplete, setLoadingComplete] = useState(false)

  // Load any resources or data that we need prior to rendering the app
  useEffect(() => {
    async function loadResourcesAndDataAsync(): Promise<void> {
      try {
        await Font.loadAsync({
          Nunito: require('../fonts/Nunito-Regular.ttf'),
          'Nunito Bold': require('../fonts/Nunito-Bold.ttf'),
          'Nunito SemiBold': require('../fonts/Nunito-SemiBold.ttf'),
        })
      } catch (e) {
        // Error silently ignored - consider adding error reporting in production
      } finally {
        setLoadingComplete(true)
      }
    }

    loadResourcesAndDataAsync()
  }, [])

  return isLoadingComplete
}
