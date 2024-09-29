import type { Palette } from './theme';

export const DEFAULT_COLORS: {
  [key: string]: Palette;
} = {
  dark: [
    '#2E2E2E',
    '#2A2A2A',
    '#262626',
    '#232323',
    '#1F1F1F',
    '#1D1D1D',
    '#1A1A1A',
    '#171717',
    '#151515',
    '#131313',
  ],

  gray: [
    '#F6F6F6',
    '#E0E0E0',
    '#CCCCCC',
    '#B9B9B9',
    '#A8A8A8',
    '#999999',
    '#8A8A8A',
    '#7C7C7C',
    '#707070',
    '#646464',
  ],
  gray2: [
    '#A3A3A3',
    '#949494',
    '#878787',
    '#7A7A7A',
    '#6F6F6F',
    '#656565',
    '#5C5C5C',
    '#535353',
    '#4B4B4B',
    '#434343',
  ],

  red: [
    '#ffeaea',
    '#fcd4d4',
    '#f3a8a8',
    '#eb7877',
    '#e4504f',
    '#e13735',
    '#e02928',
    '#c71c1c',
    '#b21518',
    '#9c0711',
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
    '#f4ffeb',
    '#e7fdd5',
    '#cbfca5',
    '#aefb71',
    '#95f948',
    '#86f933',
    '#7ef928',
    '#6bdd1e',
    '#5dc416',
    '#4daa04',
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
    '#fff6e2',
    '#feecce',
    '#fbd8a0',
    '#f7c26d',
    '#f4b042',
    '#f3a426',
    '#f29f16',
    '#d78a07',
    '#c07900',
    '#a76800',
  ],
  secondary: [
    '#f4f4f5',
    '#e7e7e7',
    '#cccccc',
    '#afafaf',
    '#989898',
    '#898989',
    '#818181',
    '#6f6f6f',
    '#616164',
    '#545459',
  ],
};

const tintColorLight = '#2f95dc';
const tintColorDark = '#fff';

export const DEFAULT_THEME: TTheme = {
  fontFamily: 'Nunito',
  fontFamilyBold: 'Nunito Bold',
  fontFamilySemiBold: 'Nunito SemiBold',
  fontFamilyInput: 'Nunito',
  localColor: '#1F2863',
  primaryShade: 6,
  colors: DEFAULT_COLORS,
  primaryColor: 'blue',
  secondaryColor: 'black',
  secondaryBgColor: 'white',
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
  other: {},
  shadows: {
    xs: '0 1px 3px rgba(0, 0, 0, 0.05), 0 1px 2px rgba(0, 0, 0, 0.1)',
    sm: '0 1px 3px rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.05) 0px 10px 15px -5px, rgba(0, 0, 0, 0.04) 0px 7px 7px -5px',
    md: '0 1px 3px rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.05) 0px 20px 25px -5px, rgba(0, 0, 0, 0.04) 0px 10px 10px -5px',
    lg: '0 1px 3px rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.05) 0px 28px 23px -7px, rgba(0, 0, 0, 0.04) 0px 12px 12px -7px',
    xl: '0 1px 3px rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.05) 0px 36px 28px -7px, rgba(0, 0, 0, 0.04) 0px 17px 17px -7px',
  },

  fontSizes: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
  },

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
  headings: {
    fontFamily:
      '-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji',
    fontWeight: 700,
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

export type themeMode = 'dark' | 'light';

export type TTheme = {
  fontFamily: string;
  fontFamilyBold: string;

  localColor: string;

  currentMode?: themeMode;
  toggleMode?: () => void;
  primaryShade: number;
  colors: { [key: string]: Palette };
  primaryColor: string;
  secondaryColor: string;
  secondaryBgColor: string;

  light: ColorScheme;
  dark: ColorScheme;

  other: {
    [key: string]: any;
  };
  shadows: {
    [key: string]: string;
  };
  radius: ThemeSize;
  fontSizes: ThemeSize;
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
