/**
 * Default Mantine color palettes
 * 10-shade system (0 = lightest, 9 = darkest)
 * Identical to Mantine web v6 color values
 */

import type { MantineThemeColors, MantineColorsTuple } from './types';

/**
 * Dark color palette - used for UI elements in dark mode
 */
const dark: MantineColorsTuple = [
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
];

/**
 * Gray color palette - neutral colors for UI elements
 */
const gray: MantineColorsTuple = [
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
];

/**
 * Red color palette
 */
const red: MantineColorsTuple = [
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
];

/**
 * Pink color palette
 */
const pink: MantineColorsTuple = [
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
];

/**
 * Grape color palette
 */
const grape: MantineColorsTuple = [
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
];

/**
 * Violet color palette
 */
const violet: MantineColorsTuple = [
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
];

/**
 * Indigo color palette
 */
const indigo: MantineColorsTuple = [
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
];

/**
 * Blue color palette - default primary color
 */
const blue: MantineColorsTuple = [
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
];

/**
 * Cyan color palette
 */
const cyan: MantineColorsTuple = [
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
];

/**
 * Teal color palette
 */
const teal: MantineColorsTuple = [
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
];

/**
 * Green color palette
 */
const green: MantineColorsTuple = [
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
];

/**
 * Lime color palette
 */
const lime: MantineColorsTuple = [
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
];

/**
 * Yellow color palette
 */
const yellow: MantineColorsTuple = [
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
];

/**
 * Orange color palette
 */
const orange: MantineColorsTuple = [
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
];

/**
 * Default Mantine color palette
 * Contains all 14 default color schemes
 */
export const DEFAULT_COLORS: MantineThemeColors = {
  dark,
  gray,
  red,
  pink,
  grape,
  violet,
  indigo,
  blue,
  cyan,
  teal,
  green,
  lime,
  yellow,
  orange,
};
