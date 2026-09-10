import { INPUT_SIZES } from '../index';
import { sizes } from '../Input.styles';
import { rem } from '../../../theme/utils/rem';

describe('Input sizes', () => {
  it('exports the shared input size map', () => {
    expect(INPUT_SIZES).toBe(sizes);
    expect(sizes).toEqual({
      xs: rem(30),
      sm: rem(36),
      md: rem(42),
      lg: rem(50),
      xl: rem(60),
    });
  });

  it('grows monotonically from xs to xl', () => {
    const values = [sizes.xs, sizes.sm, sizes.md, sizes.lg, sizes.xl].map(Number);
    values.forEach((value, index) => {
      if (index > 0) {
        expect(value).toBeGreaterThan(values[index - 1]!);
      }
    });
  });
});
