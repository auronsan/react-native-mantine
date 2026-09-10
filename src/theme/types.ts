/**
 * Core type definitions for Mantine React Native theme system
 * Aligned with Mantine web v6 architecture
 */

import type {
  AccessibilityProps,
  StyleProp,
  TextStyle,
  ViewStyle,
} from 'react-native';

// ============================================================================
// Color System Types
// ============================================================================

/**
 * Shade index for color palettes (0-9)
 * 0 = lightest, 9 = darkest
 */
export type Shade = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

/**
 * 10-shade color palette tuple
 * Matches Mantine web's Tuple<string, 10> structure
 */
export type MantineColorsTuple = readonly [
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
];

/**
 * Default color keys from Mantine web
 */
export type DefaultMantineColor =
  | 'dark'
  | 'gray'
  | 'red'
  | 'pink'
  | 'grape'
  | 'violet'
  | 'indigo'
  | 'blue'
  | 'cyan'
  | 'teal'
  | 'green'
  | 'lime'
  | 'yellow'
  | 'orange';

/**
 * Mantine color - either a theme color key or a CSS color value
 *
 * Supports:
 * - Theme palette colors: 'blue', 'red', 'gray', etc.
 * - Custom hex colors: '#FF5733', '#fff'
 * - Custom rgb colors: 'rgb(255, 87, 51)'
 * - Custom rgba colors: 'rgba(255, 87, 51, 0.5)'
 * - CSS keywords: 'transparent', 'currentColor'
 *
 * Custom colors can be used with shade modifiers in themeColor() and variant() functions.
 */
export type MantineColor = DefaultMantineColor | (string & {});

/**
 * Theme colors record - maps color names to 10-shade tuples
 */
export interface MantineThemeColors {
  [key: string]: MantineColorsTuple;
  dark: MantineColorsTuple;
  gray: MantineColorsTuple;
  red: MantineColorsTuple;
  pink: MantineColorsTuple;
  grape: MantineColorsTuple;
  violet: MantineColorsTuple;
  indigo: MantineColorsTuple;
  blue: MantineColorsTuple;
  cyan: MantineColorsTuple;
  teal: MantineColorsTuple;
  green: MantineColorsTuple;
  lime: MantineColorsTuple;
  yellow: MantineColorsTuple;
  orange: MantineColorsTuple;
}

/**
 * Primary shade configuration
 * Can be a single shade or different shades for light/dark modes
 */
export interface MantinePrimaryShade {
  light: Shade;
  dark: Shade;
}

/**
 * Color scheme - light or dark mode
 */
export type ColorScheme = 'light' | 'dark';

/**
 * Color scheme value type
 * Represents a value that has different values for light and dark modes
 */
export interface ColorSchemeValue<T = any> {
  light: T;
  dark: T;
}

/**
 * Type helper to resolve ColorSchemeValue types to their base types
 * Recursively transforms ColorSchemeValue<T> to T in object structures
 */
export type ResolveColorSchemeValue<T> = T extends ColorSchemeValue<infer U>
  ? U
  : T extends Record<string, any>
  ? { [K in keyof T]: ResolveColorSchemeValue<T[K]> }
  : T;

// ============================================================================
// Size System Types
// ============================================================================

/**
 * Named size values
 */
export type MantineSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

/**
 * Size can be a named size or a number
 */
export type MantineNumberSize = MantineSize | number;

/**
 * Size scale - maps size names to numbers
 */
export interface MantineSizes {
  [key: string]: number;
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
}

// ============================================================================
// Gradient Types
// ============================================================================

/**
 * Gradient configuration
 */
export interface MantineGradient {
  from: MantineColor;
  to: MantineColor;
  deg?: number;
}

/**
 * React Native gradient configuration
 */
export interface GradientConfig {
  colors: [string, string];
  start: { x: number; y: number };
  end: { x: number; y: number };
}

// ============================================================================
// Typography Types
// ============================================================================

/**
 * Font weight values
 */
export interface FontWeights {
  thin: TextStyle['fontWeight'];
  extralight: TextStyle['fontWeight'];
  light: TextStyle['fontWeight'];
  normal: TextStyle['fontWeight'];
  medium: TextStyle['fontWeight'];
  semibold: TextStyle['fontWeight'];
  bold: TextStyle['fontWeight'];
  extrabold: TextStyle['fontWeight'];
  black: TextStyle['fontWeight'];
}

/**
 * Heading style configuration
 * Matches Mantine web HeadingStyle with React Native adaptations
 */
export interface HeadingStyle {
  fontSize: number;
  lineHeight: number;
  fontWeight?: TextStyle['fontWeight'];
  fontFamily?: string;
}

/**
 * Headings configuration
 */
export interface MantineHeadings {
  fontFamily?: string;
  fontWeight?: TextStyle['fontWeight'];
  sizes: {
    h1: HeadingStyle;
    h2: HeadingStyle;
    h3: HeadingStyle;
    h4: HeadingStyle;
    h5: HeadingStyle;
    h6: HeadingStyle;
  };
}

// ============================================================================
// Shadow Types (Platform-specific)
// ============================================================================

/**
 * iOS shadow configuration
 */
export interface IOSShadow {
  shadowColor: string;
  shadowOffset: { width: number; height: number };
  shadowOpacity: number;
  shadowRadius: number;
}

/**
 * Android shadow configuration (elevation)
 */
export interface AndroidShadow {
  elevation: number;
}

/**
 * Platform-specific shadow type
 */
export type MantineShadow = IOSShadow | AndroidShadow;

/**
 * Shadow scale
 */
export interface MantineShadows {
  xs: MantineShadow;
  sm: MantineShadow;
  md: MantineShadow;
  lg: MantineShadow;
  xl: MantineShadow;
}

// ============================================================================
// Variant Types
// ============================================================================

/**
 * Component variant types
 */
export type MantineVariant =
  | 'filled'
  | 'outline'
  | 'light'
  | 'white'
  | 'default'
  | 'subtle'
  | 'gradient'
  | 'transparent';

/**
 * Variant function input
 */
export interface VariantInput {
  variant: MantineVariant;
  color?: MantineColor;
  gradient?: MantineGradient;
  primaryFallback?: boolean;
}

/**
 * Variant function output (React Native styles)
 */
export interface VariantOutput {
  background: string;
  color: string;
  border: string;
  hover?: string;
}

// ============================================================================
// Theme Component Types
// ============================================================================

/**
 * Component-specific theme configuration
 */
export interface ThemeComponent {
  defaultProps?: Record<string, any> | ((theme: MantineTheme) => Record<string, any>);
  styles?:
    | Record<string, ViewStyle | TextStyle>
    | ((theme: MantineTheme, params: any) => Record<string, ViewStyle | TextStyle>);
}

/**
 * Theme components record
 */
export type MantineThemeComponents = Record<string, ThemeComponent>;

// ============================================================================
// Theme Function Types
// ============================================================================

/**
 * Theme helper functions
 * React Native-specific implementations of Mantine web functions
 */
export interface MantineThemeFunctions {
  /**
   * Get color from theme palette
   * @param color - Color name or CSS value
   * @param shade - Optional shade (0-9)
   * @param primaryFallback - Use primary color if color not found
   */
  themeColor(color: MantineColor, shade?: Shade, primaryFallback?: boolean): string;

  /**
   * Get primary shade based on color scheme
   * @param colorScheme - Optional color scheme override
   */
  primaryShade(colorScheme?: ColorScheme): Shade;

  /**
   * Get primary color based on color scheme
   * @param colorScheme - Optional color scheme override
   */
  primaryColor(colorScheme?: ColorScheme): string;

  /**
   * Get variant styles for components
   * @param input - Variant configuration
   */
  variant(input: VariantInput): VariantOutput;

  /**
   * Convert color to rgba with alpha
   * @param color - Color value
   * @param alpha - Alpha value (0-1)
   */
  rgba(color: string, alpha: number): string;

  /**
   * Get radius value from theme
   * @param size - Size or number
   */
  radius(size?: MantineNumberSize | (string & {})): number | string;

  /**
   * Get size value from theme
   * @param options - Size configuration
   */
  size(options: { size?: MantineNumberSize | (string & {}); sizes: Record<string, number> }): number | string;

  /**
   * Get shadow styles
   * @param size - Shadow size
   */
  shadow(size?: MantineSize): MantineShadow | {};

  /**
   * Get gradient configuration for React Native
   * @param gradient - Gradient config
   */
  gradient(gradient?: MantineGradient): GradientConfig;

  /**
   * Lighten a color
   * @param color - Color to lighten
   * @param alpha - Amount to lighten (0-1)
   */
  lighten(color: string, alpha: number): string;

  /**
   * Darken a color
   * @param color - Color to darken
   * @param alpha - Amount to darken (0-1)
   */
  darken(color: string, alpha: number): string;

  /**
   * Get dimmed color based on color scheme
   */
  dimmed(): string;

  /**
   * Get font styles
   */
  fontStyles(): TextStyle;

  /**
   * Get input font styles
   */
  inputFontStyles(): TextStyle;

  /**
   * Get font size from theme
   * @param size - Size key or number
   */
  fontSize(size: MantineNumberSize): number;

  /**
   * Get line height from theme
   * @param size - Size key or number (unitless multiplier)
   */
  lineHeight(size: MantineNumberSize): number;

  /**
   * Get heading styles by order
   * @param order - Heading level (1-6)
   */
  headingStyles(order: 1 | 2 | 3 | 4 | 5 | 6): TextStyle;

  /**
   * Get focus styles
   */
  focusStyles(): ViewStyle;

  /**
   * Get placeholder styles
   */
  placeholderStyles(): TextStyle;

  /**
   * Get cover styles (position: absolute, full size)
   * @param offset - Optional offset
   */
  cover(offset?: number): ViewStyle;

  /**
   * Get hover styles
   * @param hoverStyle - Styles to apply on hover
   */
  hover(hoverStyle: ViewStyle | TextStyle): ViewStyle | TextStyle;

  /**
   * Get styles for screens larger than breakpoint
   * @param breakpoint - Breakpoint value
   */
  largerThan(breakpoint: MantineNumberSize): any;

  /**
   * Get styles for screens smaller than breakpoint
   * @param breakpoint - Breakpoint value
   */
  smallerThan(breakpoint: MantineNumberSize): any;

  /**
   * Get value based on current color scheme
   * Returns different values for light and dark modes
   * @param value - Value or ColorSchemeValue object with light/dark properties
   */
  colorSchemeValue<T = any>(value: T | { light: T; dark: T }): T;

  /**
   * Resolve all color scheme values in an object
   * Useful for resolving theme constants with different light/dark values
   * @param constants - Object containing ColorSchemeValue properties
   */
  colorSchemeConstants<T extends Record<string, any>>(constants: T): any;
}

// ============================================================================
// Main Theme Type
// ============================================================================

/**
 * Mantine React Native theme
 * Core configuration object for the entire design system
 */
export interface MantineTheme {
  // Color System
  colorScheme: ColorScheme;
  primaryColor: DefaultMantineColor;
  primaryShade: Shade | MantinePrimaryShade;
  colors: MantineThemeColors;
  white: string;
  black: string;
  defaultGradient: MantineGradient;

  // Typography
  fontFamily: string;
  fontFamilyBold: string;
  fontFamilySemiBold: string;
  fontFamilyInput: string;
  fontFamilyMonospace: string;
  fontWeights: FontWeights;
  fontSizes: MantineSizes;
  lineHeight: number;
  lineHeights: MantineSizes;
  headings: MantineHeadings;

  // Spacing & Layout
  spacing: MantineSizes;
  radius: MantineSizes;
  defaultRadius: MantineNumberSize | (string & {});
  breakpoints: MantineSizes;

  // Visual Effects
  shadows: MantineShadows;

  // Theme Functions
  fn: MantineThemeFunctions;

  // Component Overrides
  components: MantineThemeComponents;

  // Custom Values
  other: Record<string, any>;

  // React Native Specific
  window: {
    width: number;
    height: number;
  };
  isIOS?: boolean;
  OSVersion?: any;

  // Mode Management
  currentMode?: ColorScheme;
  toggleMode?: () => void;
  setCurrentMode?: (mode: ColorScheme) => void;

  // Active styles for pressable components
  activeStyles: ViewStyle | TextStyle;

  // Additional properties added by ThemeProvider at runtime
  secondaryColor?: string;
  isSmallDevice?: boolean;
  screen?: {
    width: number;
    height: number;
  };
  bottomNavBarHeight?: number;
}

/**
 * Theme without functions (base theme object)
 */
export type MantineThemeBase = Omit<MantineTheme, 'fn'>;

/**
 * Partial theme for overrides
 */
export type MantineThemeOverride = {
  colorScheme?: ColorScheme;
  primaryColor?: DefaultMantineColor;
  primaryShade?: Shade | MantinePrimaryShade;
  colors?: Partial<MantineThemeColors>;
  white?: string;
  black?: string;
  defaultGradient?: MantineGradient;
  fontFamily?: string;
  fontFamilyBold?: string;
  fontFamilySemiBold?: string;
  fontFamilyInput?: string;
  fontFamilyMonospace?: string;
  fontWeights?: Partial<FontWeights>;
  fontSizes?: Partial<MantineSizes>;
  lineHeight?: number;
  lineHeights?: Partial<MantineSizes>;
  headings?: Partial<MantineHeadings>;
  spacing?: Partial<MantineSizes>;
  radius?: Partial<MantineSizes>;
  defaultRadius?: MantineNumberSize | (string & {});
  breakpoints?: Partial<MantineSizes>;
  shadows?: Partial<MantineShadows>;
  components?: MantineThemeComponents;
  other?: Record<string, any>;
  window?: {
    width: number;
    height: number;
  };
  activeStyles?: ViewStyle | TextStyle;
};

// ============================================================================
// Utility Types
// ============================================================================

/**
 * Deep partial type for nested objects
 */
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

/**
 * Extract style props that can be themed
 */
export type ThemeableStyleProps = {
  color?: MantineColor;
  radius?: MantineNumberSize;
  size?: MantineSize;
  variant?: MantineVariant;
  gradient?: MantineGradient;
};

/**
 * Spacing value - can be a size or number
 */
export type SpacingValue = MantineNumberSize | (string & {});

/**
 * Generic variant type that allows specific variants plus custom strings
 */
export type Variants<T> = T | (string & {});

/**
 * Default props that can be passed to any component
 */
export interface DefaultProps {
  className?: string;
  style?: StyleProp<ViewStyle>;
  sx?: any;
  unstyled?: boolean;
  testID?: string;

  // The accessibility props below intentionally reuse React Native's own
  // declarations (via indexed access types) so that component prop interfaces
  // can extend both DefaultProps and a React Native props type without
  // "not identical" conflicts.

  /** When true, the component (and its children) is announced as a single accessibility element */
  accessible?: AccessibilityProps['accessible'];

  /** Text read by screen readers instead of the visible content */
  accessibilityLabel?: AccessibilityProps['accessibilityLabel'];

  /** Additional description of what happens when the control is activated */
  accessibilityHint?: AccessibilityProps['accessibilityHint'];

  /** Overrides the accessibility role derived by the component */
  accessibilityRole?: AccessibilityProps['accessibilityRole'];

  /** Overrides the accessibility state derived by the component (disabled, checked, selected, expanded, busy) */
  accessibilityState?: AccessibilityProps['accessibilityState'];

  /** Overrides the accessibility value derived by the component (min, max, now, text) */
  accessibilityValue?: AccessibilityProps['accessibilityValue'];
}
