import type { MantineNumberSize } from 'react-native-mantine';

export function getSize<
  Sizes extends Record<any, any>,
  Key extends keyof Sizes,
  Size extends MantineNumberSize
>({
  size,
  sizes,
}: {
  size: Size;
  sizes: Sizes;
}): Size extends Key ? Sizes[Size] : Size extends number ? number : Size {
  if (size in sizes) {
    return sizes[size as any];
  }
  return (size as any) || sizes.md;
}
