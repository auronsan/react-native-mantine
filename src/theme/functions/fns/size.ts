import type { MantineNumberSize } from '../../types';
import { getSize } from '../../get-size';

export function size(_theme: any) {
  return <Sizes extends Record<any, any>>({
    size,
    sizes,
  }: {
    size?: MantineNumberSize | (string & {});
    sizes: Sizes;
  }): number | string => {
    if (size === undefined || size === null || (size as unknown) === '') return 0;
    // `0` is a valid size; getSize would otherwise fall back to `sizes.md`
    if (typeof size === 'number') return size;
    return getSize({ size: size as MantineNumberSize, sizes }) as number | string;
  };
}
