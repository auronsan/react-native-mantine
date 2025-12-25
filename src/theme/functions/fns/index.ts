import { radius } from './radius';
import { themeColor } from './theme-color/theme-color';
import { variant } from './variant';
import * as helpers from './helpers';

export const fns = {
  radius,
  variant,
  themeColor,
  ...helpers,
};
