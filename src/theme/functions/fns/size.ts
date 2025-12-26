import type { MantineNumberSize } from '../../types';
import { getSize } from '../../get-size';

export function size(_theme: any) {
  return <Sizes extends Record<any, any>>({
    size,
    sizes,
  }: {
    size: MantineNumberSize;
    sizes: Sizes;
  }): number => {
    return getSize({ size, sizes }) as number;
  };
}
