import type { MantineNumberSize } from '../../theme/types';
import { rem } from '../../theme/utils/rem';

export interface InputStylesParams {
  radius: MantineNumberSize;
  multiline: boolean;
  invalid: boolean;
  rightSectionWidth: string | number;
  withRightSection: boolean;
  iconWidth: string | number;
  offsetBottom: boolean;
  offsetTop: boolean;
  pointer: boolean;
}

export const sizes = {
  xs: rem(30),
  sm: rem(36),
  md: rem(42),
  lg: rem(50),
  xl: rem(60),
};

export const INPUT_SIZES = sizes;
