export interface HsvaColor {
  /** Hue, 0-360 */
  h: number;

  /** Saturation, 0-1 */
  s: number;

  /** Value (brightness), 0-1 */
  v: number;

  /** Alpha, 0-1 */
  a: number;
}

export type ColorFormat = 'hex' | 'hexa' | 'rgb' | 'rgba' | 'hsl' | 'hsla';

interface RgbaColor {
  r: number;
  g: number;
  b: number;
  a: number;
}

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

export function hsvaToRgba({ h, s, v, a }: HsvaColor): RgbaColor {
  const hue = (((h % 360) + 360) % 360) / 60;
  const c = v * s;
  const x = c * (1 - Math.abs((hue % 2) - 1));
  const m = v - c;

  const segments: [number, number, number][] = [
    [c, x, 0],
    [x, c, 0],
    [0, c, x],
    [0, x, c],
    [x, 0, c],
    [c, 0, x],
  ];

  const [r, g, b] = segments[Math.floor(hue) % 6]!;

  return {
    r: Math.round((r + m) * 255),
    g: Math.round((g + m) * 255),
    b: Math.round((b + m) * 255),
    a,
  };
}

export function rgbaToHsva({ r, g, b, a }: RgbaColor): HsvaColor {
  const rn = r / 255;
  const gn = g / 255;
  const bn = b / 255;

  const max = Math.max(rn, gn, bn);
  const min = Math.min(rn, gn, bn);
  const delta = max - min;

  let h = 0;
  if (delta !== 0) {
    if (max === rn) {
      h = 60 * (((gn - bn) / delta) % 6);
    } else if (max === gn) {
      h = 60 * ((bn - rn) / delta + 2);
    } else {
      h = 60 * ((rn - gn) / delta + 4);
    }
  }

  return {
    h: ((h % 360) + 360) % 360,
    s: max === 0 ? 0 : delta / max,
    v: max,
    a,
  };
}

function toHexPair(value: number): string {
  return clamp(Math.round(value), 0, 255).toString(16).padStart(2, '0');
}

export function parseColor(color: string): HsvaColor | null {
  if (typeof color !== 'string') {
    return null;
  }

  const input = color.trim().toLowerCase();

  const hexMatch = input.match(/^#?([0-9a-f]{3,8})$/);
  if (hexMatch) {
    let hex = hexMatch[1]!;

    if (hex.length === 3 || hex.length === 4) {
      hex = hex
        .split('')
        .map((char) => char + char)
        .join('');
    }

    if (hex.length !== 6 && hex.length !== 8) {
      return null;
    }

    return rgbaToHsva({
      r: parseInt(hex.slice(0, 2), 16),
      g: parseInt(hex.slice(2, 4), 16),
      b: parseInt(hex.slice(4, 6), 16),
      a: hex.length === 8 ? parseInt(hex.slice(6, 8), 16) / 255 : 1,
    });
  }

  const rgbaMatch = input.match(
    /^rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*(?:,\s*([\d.]+)\s*)?\)$/
  );
  if (rgbaMatch) {
    return rgbaToHsva({
      r: clamp(Number(rgbaMatch[1]), 0, 255),
      g: clamp(Number(rgbaMatch[2]), 0, 255),
      b: clamp(Number(rgbaMatch[3]), 0, 255),
      a: rgbaMatch[4] !== undefined ? clamp(Number(rgbaMatch[4]), 0, 1) : 1,
    });
  }

  const hslaMatch = input.match(
    /^hsla?\(\s*([\d.]+)\s*,\s*([\d.]+)%\s*,\s*([\d.]+)%\s*(?:,\s*([\d.]+)\s*)?\)$/
  );
  if (hslaMatch) {
    const h = Number(hslaMatch[1]) % 360;
    const s = clamp(Number(hslaMatch[2]), 0, 100) / 100;
    const l = clamp(Number(hslaMatch[3]), 0, 100) / 100;
    const a = hslaMatch[4] !== undefined ? clamp(Number(hslaMatch[4]), 0, 1) : 1;

    const v = l + s * Math.min(l, 1 - l);
    const sv = v === 0 ? 0 : 2 * (1 - l / v);

    return { h, s: sv, v, a };
  }

  return null;
}

export function formatColor(hsva: HsvaColor, format: ColorFormat = 'hex'): string {
  const { r, g, b, a } = hsvaToRgba(hsva);
  const alpha = Math.round(a * 100) / 100;

  switch (format) {
    case 'hexa':
      return `#${toHexPair(r)}${toHexPair(g)}${toHexPair(b)}${toHexPair(a * 255)}`;
    case 'rgb':
      return `rgb(${r}, ${g}, ${b})`;
    case 'rgba':
      return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    case 'hsl':
    case 'hsla': {
      const { h, s, v } = hsva;
      const l = v * (1 - s / 2);
      const sl = l === 0 || l === 1 ? 0 : (v - l) / Math.min(l, 1 - l);
      const hRound = Math.round(h);
      const sRound = Math.round(sl * 100);
      const lRound = Math.round(l * 100);

      return format === 'hsl'
        ? `hsl(${hRound}, ${sRound}%, ${lRound}%)`
        : `hsla(${hRound}, ${sRound}%, ${lRound}%, ${alpha})`;
    }
    case 'hex':
    default:
      return `#${toHexPair(r)}${toHexPair(g)}${toHexPair(b)}`;
  }
}

export function isColorValid(color: string): boolean {
  return parseColor(color) !== null;
}
