/**
 * Default Mantine React Native theme
 * Aligned with Mantine web v6 architecture with React Native adaptations
 */

import { Platform } from 'react-native';
import { attachFunctions } from './functions/attach-functions';
import { DEFAULT_COLORS } from './default-colors';
import type {
  MantineTheme as MantineThemeType,
  MantineThemeBase
} from './types';

/**
 * Base theme configuration (without functions)
 * Matches Mantine web structure with React Native-specific adaptations
 */
export const _DEFAULT_THEME: MantineThemeBase = {
  // ============================================================================
  // Color System
  // ============================================================================

  colorScheme: 'light',

  primaryColor: 'blue',

  primaryShade: {
    light: 6,
    dark: 8,
  },

  colors: DEFAULT_COLORS,

  white: '#ffffff',
  black: '#000000',

  defaultGradient: {
    from: 'blue',
    to: 'cyan',
    deg: 45,
  },

  // ============================================================================
  // Typography
  // ============================================================================

  // Font configuration matches Mantine web as closely as possible
  // Web: '-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif'
  // React Native maps to platform-specific system fonts
  fontFamily: Platform.select({
    ios: 'System', // San Francisco (equivalent to -apple-system)
    android: 'Roboto', // Android system font
    default: 'System',
  }) as string,

  // Bold font family - iOS/Android don't always render fontWeight properly
  // so we need separate font families for different weights
  fontFamilyBold: Platform.select({
    ios: 'System', // iOS handles bold via fontWeight with System font
    android: 'Roboto-Bold', // Android needs explicit bold font family
    default: 'System',
  }) as string,

  // SemiBold font family
  fontFamilySemiBold: Platform.select({
    ios: 'System', // iOS handles semibold via fontWeight with System font
    android: 'Roboto-Medium', // Android medium is equivalent to semibold
    default: 'System',
  }) as string,

  // Input font family - separate for form inputs
  fontFamilyInput: Platform.select({
    ios: 'System',
    android: 'Roboto',
    default: 'System',
  }) as string,

  // Monospace font
  // Web: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono, Courier New, monospace'
  fontFamilyMonospace: Platform.select({
    ios: 'Menlo', // iOS monospace font
    android: 'monospace', // Android monospace font
    default: 'monospace',
  }) as string,

  fontWeights: {
    thin: '100',
    extralight: '200',
    light: '300',
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    extrabold: '800',
    black: '900',
  },

  fontSizes: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
  },

  lineHeight: 1.55, // Matches Mantine web default

  headings: {
    // Headings use bold font family for proper weight rendering on iOS/Android
    fontFamily: Platform.select({
      ios: 'System',
      android: 'Roboto-Bold',
      default: 'System',
    }),
    fontWeight: '700', // Matches Mantine web heading weight
    sizes: {
      h1: { fontSize: 34, lineHeight: 1.3 },
      h2: { fontSize: 26, lineHeight: 1.35 },
      h3: { fontSize: 22, lineHeight: 1.4 },
      h4: { fontSize: 18, lineHeight: 1.45 },
      h5: { fontSize: 16, lineHeight: 1.5 },
      h6: { fontSize: 14, lineHeight: 1.5 },
    },
  },

  // ============================================================================
  // Spacing & Layout
  // ============================================================================

  spacing: {
    xs: 10,
    sm: 12,
    md: 16,
    lg: 20,
    xl: 24,
  },

  radius: {
    xs: 2,
    sm: 4,
    md: 8,
    lg: 16,
    xl: 32,
  },

  defaultRadius: 'md',

  breakpoints: {
    xs: 576,
    sm: 768,
    md: 992,
    lg: 1200,
    xl: 1408,
  },

  // ============================================================================
  // Visual Effects
  // ============================================================================

  shadows: Platform.select({
    ios: {
      xs: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 1
      },
      sm: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2
      },
      md: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 4
      },
      lg: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8
      },
      xl: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.25,
        shadowRadius: 16
      },
    },
    android: {
      xs: { elevation: 1 },
      sm: { elevation: 2 },
      md: { elevation: 4 },
      lg: { elevation: 8 },
      xl: { elevation: 12 },
    },
    default: {
      xs: { elevation: 1 },
      sm: { elevation: 2 },
      md: { elevation: 4 },
      lg: { elevation: 8 },
      xl: { elevation: 12 },
    },
  }) as any,

  // ============================================================================
  // Component Overrides
  // ============================================================================

  components: {},

  // ============================================================================
  // Custom Values
  // ============================================================================

  other: {},

  // ============================================================================
  // React Native Specific
  // ============================================================================

  window: {
    width: 375,
    height: 800,
  },

  isIOS: Platform.OS === 'ios',
  OSVersion: Platform.Version,

  // ============================================================================
  // Active Styles (for Pressable components)
  // ============================================================================

  activeStyles: {
    opacity: 0.8,
  },
};

/**
 * Default Mantine theme with attached helper functions
 * This is the main theme object exported for use
 */
export const DEFAULT_THEME: MantineThemeType = attachFunctions(_DEFAULT_THEME);

