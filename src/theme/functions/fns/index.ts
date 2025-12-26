import { radius } from './radius';
import { rgba } from './rgba';
import { size } from './size';
import { themeColor } from './theme-color/theme-color';
import { variant } from './variant';
import * as helpers from './helpers';

export const fns = {
  radius,
  rgba,
  size,
  variant,
  themeColor,
  ...helpers,
};
