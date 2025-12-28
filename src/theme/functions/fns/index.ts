import { radius } from './radius';
import { rgba } from './rgba';
import { size } from './size';
import { themeColor } from './theme-color/theme-color';
import { variant } from './variant';
import { getPrimaryShade } from './primary-shade';
import { shadow } from './shadow';
import { gradient } from './gradient/gradient';
import { lighten } from './lighten';
import { darken } from './darken';
import { dimmed } from './dimmed';
import { largerThan, smallerThan } from './breakpoints';
import * as helpers from './helpers';

export const fns = {
  radius,
  rgba,
  size,
  variant,
  themeColor,
  getPrimaryShade,
  shadow,
  gradient,
  lighten,
  darken,
  dimmed,
  largerThan,
  smallerThan,
  ...helpers,
};
