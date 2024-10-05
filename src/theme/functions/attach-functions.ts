import { fns } from './fns';

export function attachFunctions(themeBase: any): any {
  return {
    ...themeBase,
    fn: {
      radius: fns.radius(themeBase),
      variant: fns.variant(themeBase),
      themeColor: fns.themeColor(themeBase),
    },
  };
}
