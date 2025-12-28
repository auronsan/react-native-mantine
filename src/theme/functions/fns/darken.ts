import { toRgba } from '../../utils/to-rgba';

/**
 * Darkens a color by reducing its RGB values
 * @param color - The color to darken (hex or rgb/rgba string)
 * @param alpha - The amount to darken (0-1, where 1 is completely black)
 * @returns rgba color string
 */
export function darken(color: string, alpha: number): string {
  const { r, g, b, a } = toRgba(color);
  const f = 1 - alpha;

  const dark = (input: number) => Math.round(input * f);

  return `rgba(${dark(r)}, ${dark(g)}, ${dark(b)}, ${a})`;
}
