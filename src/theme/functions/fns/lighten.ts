import { toRgba } from '../../utils/to-rgba';

/**
 * Lightens a color by mixing it with white
 * @param color - The color to lighten (hex or rgb/rgba string)
 * @param alpha - The amount to lighten (0-1, where 1 is completely white)
 * @returns rgba color string
 */
export function lighten(color: string, alpha: number): string {
  const { r, g, b, a } = toRgba(color);

  const light = (input: number) => Math.round(input + (255 - input) * alpha);

  return `rgba(${light(r)}, ${light(g)}, ${light(b)}, ${a})`;
}
