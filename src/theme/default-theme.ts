import { Platform } from 'react-native';
import { attachFunctions } from './functions/attach-functions';
import type { Palette } from './theme';

export const DEFAULT_COLORS: {
  [key: string]: Palette;
} = {
  dark: [
    '#C1C2C5',
    '#A6A7AB',
    '#909296',
    '#5c5f66',
    '#373A40',
    '#2C2E33',
    '#25262b',
    '#1A1B1E',
    '#141517',
    '#101113',
  ],

  gray: [
    '#f8f9fa',
    '#f1f3f5',
    '#e9ecef',
    '#dee2e6',
    '#ced4da',
    '#adb5bd',
    '#868e96',
    '#495057',
    '#343a40',
    '#212529',
  ],

  red: [
    '#fff5f5',
    '#ffe3e3',
    '#ffc9c9',
    '#ffa8a8',
    '#ff8787',
    '#ff6b6b',
    '#fa5252',
    '#f03e3e',
    '#e03131',
    '#c92a2a',
  ],

  pink: [
    '#fff0f6',
    '#ffdeeb',
    '#fcc2d7',
    '#faa2c1',
    '#f783ac',
    '#f06595',
    '#e64980',
    '#d6336c',
    '#c2255c',
    '#a61e4d',
  ],

  grape: [
    '#f8f0fc',
    '#f3d9fa',
    '#eebefa',
    '#e599f7',
    '#da77f2',
    '#cc5de8',
    '#be4bdb',
    '#ae3ec9',
    '#9c36b5',
    '#862e9c',
  ],

  violet: [
    '#f3f0ff',
    '#e5dbff',
    '#d0bfff',
    '#b197fc',
    '#9775fa',
    '#845ef7',
    '#7950f2',
    '#7048e8',
    '#6741d9',
    '#5f3dc4',
  ],

  indigo: [
    '#edf2ff',
    '#dbe4ff',
    '#bac8ff',
    '#91a7ff',
    '#748ffc',
    '#5c7cfa',
    '#4c6ef5',
    '#4263eb',
    '#3b5bdb',
    '#364fc7',
  ],

  blue: [
    '#e7f5ff',
    '#d0ebff',
    '#a5d8ff',
    '#74c0fc',
    '#4dabf7',
    '#339af0',
    '#228be6',
    '#1c7ed6',
    '#1971c2',
    '#1864ab',
  ],

  cyan: [
    '#e3fafc',
    '#c5f6fa',
    '#99e9f2',
    '#66d9e8',
    '#3bc9db',
    '#22b8cf',
    '#15aabf',
    '#1098ad',
    '#0c8599',
    '#0b7285',
  ],

  teal: [
    '#e6fcf5',
    '#c3fae8',
    '#96f2d7',
    '#63e6be',
    '#38d9a9',
    '#20c997',
    '#12b886',
    '#0ca678',
    '#099268',
    '#087f5b',
  ],

  green: [
    '#ebfbee',
    '#d3f9d8',
    '#b2f2bb',
    '#8ce99a',
    '#69db7c',
    '#51cf66',
    '#40c057',
    '#37b24d',
    '#2f9e44',
    '#2b8a3e',
  ],

  lime: [
    '#f4fce3',
    '#e9fac8',
    '#d8f5a2',
    '#c0eb75',
    '#a9e34b',
    '#94d82d',
    '#82c91e',
    '#74b816',
    '#66a80f',
    '#5c940d',
  ],

  yellow: [
    '#fff9db',
    '#fff3bf',
    '#ffec99',
    '#ffe066',
    '#ffd43b',
    '#fcc419',
    '#fab005',
    '#f59f00',
    '#f08c00',
    '#e67700',
  ],

  orange: [
    '#fff4e6',
    '#ffe8cc',
    '#ffd8a8',
    '#ffc078',
    '#ffa94d',
    '#ff922b',
    '#fd7e14',
    '#f76707',
    '#e8590c',
    '#d9480f',
  ],
};

const tintColorLight = '#2f95dc';
const tintColorDark = '#fff';

export const _DEFAULT_THEME: MantineTheme = {
  // Font configuration matches Mantine web as closely as possible
  // Web: '-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji'
  // React Native maps to platform-specific system fonts
  fontFamily: Platform.select({
    ios: 'System', // San Francisco (equivalent to -apple-system)
    android: 'Roboto', // Android system font
    default: 'System',
  }),
  // Bold font family - iOS/Android don't always render fontWeight properly
  // so we need separate font families for different weights
  fontFamilyBold: Platform.select({
    ios: 'System', // iOS handles bold via fontWeight with System font
    android: 'Roboto-Bold', // Android needs explicit bold font family
    default: 'System',
  }),
  // SemiBold font family
  fontFamilySemiBold: Platform.select({
    ios: 'System', // iOS handles semibold via fontWeight with System font
    android: 'Roboto-Medium', // Android medium is equivalent to semibold
    default: 'System',
  }),
  // Input font family - separate for form inputs
  fontFamilyInput: Platform.select({
    ios: 'System',
    android: 'Roboto',
    default: 'System',
  }),
  // Web: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono, Courier New, monospace'
  fontFamilyMonospace: Platform.select({
    ios: 'Menlo', // iOS monospace font
    android: 'monospace', // Android monospace font
    default: 'monospace',
  }),
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
  localColor: '#1F2863',
  primaryShade: {
    light: 6,
    dark: 8,
  },
  colors: DEFAULT_COLORS,
  primaryColor: 'blue',
  secondaryColor: 'black',
  secondaryBgColor: 'white',
  white: '#ffffff',
  black: '#000000',
  defaultGradient: {
    from: 'blue',
    to: 'cyan',
    deg: 45,
  },
  light: {
    text: '#000',
    background: '#fdfdfd',
    backgroundSecondary: '#fff',
    backgroundThird: '#EFEFEF',
    tint: tintColorLight,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#fff',
    background: '#272727',
    backgroundSecondary: '#464F61',
    backgroundThird: '#272727',
    tint: tintColorDark,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorDark,
  },
  components: {},
  other: {},
  shadows: Platform.select({
    ios: {
      xs: { shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 1 },
      sm: { shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.1, shadowRadius: 2 },
      md: { shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.15, shadowRadius: 4 },
      lg: { shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.2, shadowRadius: 8 },
      xl: { shadowColor: '#000', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.25, shadowRadius: 16 },
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
  }),

  fontSizes: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
  },

  defaultRadius: 8,
  radius: {
    xs: 2,
    sm: 4,
    md: 8,
    lg: 16,
    xl: 32,
  },

  spacing: {
    xs: 10,
    sm: 12,
    md: 16,
    lg: 20,
    xl: 24,
  },
  breakpoints: {
    xs: 576,
    sm: 768,
    md: 992,
    lg: 1200,
    xl: 1408,
  },
  headings: {
    // Headings use bold font family for proper weight rendering on iOS/Android
    // On Android, using Roboto-Bold ensures proper bold rendering
    fontFamily: Platform.select({
      ios: 'System', // San Francisco (equivalent to -apple-system)
      android: 'Roboto-Bold', // Android needs explicit bold font family
      default: 'System',
    }),
    fontWeight: '700', // Matches Mantine web heading weight
    sizes: {
      h1: { fontSize: 34, lineHeight: 1.3, fontWeight: undefined },
      h2: { fontSize: 26, lineHeight: 1.35, fontWeight: undefined },
      h3: { fontSize: 22, lineHeight: 1.4, fontWeight: undefined },
      h4: { fontSize: 18, lineHeight: 1.45, fontWeight: undefined },
      h5: { fontSize: 16, lineHeight: 1.5, fontWeight: undefined },
      h6: { fontSize: 14, lineHeight: 1.5, fontWeight: undefined },
    },
  },
  window: {
    width: 375,
    height: 800,
  },
  primaryBgColor: 'white',
  primaryTextColor: 'black',
};

export const DEFAULT_THEME = attachFunctions(_DEFAULT_THEME);

type ColorScheme = {
  text: string;
  background: string;
  backgroundSecondary?: string;
  backgroundThird?: string;
  tint: string;
  tabIconDefault: string;
  tabIconSelected: string;
};

export type ThemeSize = {
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
};

export type HeadingStyle = {
  fontSize: number;
  lineHeight: number;
  fontWeight?: number;
};

export type MantineHeadings = {
  fontFamily?: string;
  fontWeight?: string;
  sizes: {
    h1: HeadingStyle;
    h2: HeadingStyle;
    h3: HeadingStyle;
    h4: HeadingStyle;
    h5: HeadingStyle;
    h6: HeadingStyle;
  };
};

export type FontWeights = {
  thin: string;
  extralight: string;
  light: string;
  normal: string;
  medium: string;
  semibold: string;
  bold: string;
  extrabold: string;
  black: string;
};

export type themeMode = 'dark' | 'light';

type Shade = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

export interface MantinePrimaryShade {
  light: Shade;
  dark: Shade;
}

export type MantineTheme = {
  fontFamily: string;
  fontFamilyBold: string;
  fontFamilySemiBold: string;
  fontFamilyInput: string;
  fontFamilyMonospace: string;
  fontWeights: FontWeights;

  localColor: string;

  currentMode?: themeMode;
  toggleMode?: () => void;
  primaryShade: Shade | MantinePrimaryShade;
  colors: { [key: string]: Palette };
  primaryColor: string;
  secondaryColor: string;
  secondaryBgColor: string;
  white: string;
  black: string;
  defaultGradient?: {
    from: string;
    to: string;
    deg: number;
  };

  light: ColorScheme;
  dark: ColorScheme;

  other: {
    [key: string]: any;
  };
  shadows: {
    xs: any;
    sm: any;
    md: any;
    lg: any;
    xl: any;
    [key: string]: any;
  };
  radius: ThemeSize;
  fontSizes: ThemeSize;
  breakpoints: ThemeSize;
  headings: MantineHeadings;
  window: {
    width: number;
    height: number;
  };
  primaryBgColor: string;
  primaryTextColor: string;

  isIOS?: boolean;

  OSVersion?: any;

  [key: string]: any;
};
