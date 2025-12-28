import { Platform } from 'react-native';
import type { MantineSize } from '../../types';

export interface ShadowStyles {
  shadowColor?: string;
  shadowOffset?: { width: number; height: number };
  shadowOpacity?: number;
  shadowRadius?: number;
  elevation?: number;
}

export type MantineShadow = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

/**
 * Platform-specific shadow configurations
 * iOS uses shadowColor, shadowOffset, shadowOpacity, shadowRadius
 * Android uses elevation
 */
const SHADOW_CONFIG: Record<MantineShadow, { ios: ShadowStyles; android: ShadowStyles }> = {
  xs: {
    ios: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 1,
    },
    android: {
      elevation: 1,
    },
  },
  sm: {
    ios: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 2,
    },
    android: {
      elevation: 2,
    },
  },
  md: {
    ios: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.15,
      shadowRadius: 4,
    },
    android: {
      elevation: 4,
    },
  },
  lg: {
    ios: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 8,
    },
    android: {
      elevation: 8,
    },
  },
  xl: {
    ios: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.25,
      shadowRadius: 16,
    },
    android: {
      elevation: 12,
    },
  },
};

/**
 * Returns platform-specific shadow styles for React Native
 * @param size - Shadow size (xs, sm, md, lg, xl)
 * @returns Object with shadow properties for the current platform
 *
 * @example
 * // iOS will get: { shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.15, shadowRadius: 4 }
 * // Android will get: { elevation: 4 }
 * const shadowStyles = shadow('md');
 */
export function shadow(size?: MantineShadow | MantineSize): ShadowStyles {
  if (!size) {
    return {};
  }

  const shadowSize = size as MantineShadow;
  const shadowConfig = SHADOW_CONFIG[shadowSize];

  if (!shadowConfig) {
    return {};
  }

  return Platform.OS === 'ios' ? shadowConfig.ios : shadowConfig.android;
}
