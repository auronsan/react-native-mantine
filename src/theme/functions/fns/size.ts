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
    if (!size) return 0;
    return getSize({ size: size as MantineNumberSize, sizes }) as number | string;
  };
}
