/**
 * Color utility functions for custom color support
 * Handles detection and manipulation of custom hex/rgb/rgba colors
 */

/**
 * Check if a color string is a custom color value (not a palette key)
 *
 * Custom colors include:
 * - Hex colors: #fff, #ffffff
 * - RGB colors: rgb(255, 255, 255)
 * - RGBA colors: rgba(255, 255, 255, 0.5)
 * - HSL colors: hsl(0, 100%, 50%)
 * - HSLA colors: hsla(0, 100%, 50%, 0.5)
 * - CSS named colors like 'transparent', 'currentColor'
 *
 * @param color - Color string to check
 * @returns true if color is a custom value, false if it might be a palette key
 */
export function isCustomColor(color: string): boolean {
  if (!color || typeof color !== 'string') {
    return false;
  }

  // Check for hex colors
  if (color.startsWith('#')) {
    return true;
  }

  // Check for rgb/rgba colors
  if (color.startsWith('rgb')) {
    return true;
  }

  // Check for hsl/hsla colors
  if (color.startsWith('hsl')) {
    return true;
  }

  // Check for CSS keywords
  if (color === 'transparent' || color === 'currentColor') {
    return true;
  }

  // Otherwise, assume it's a palette key or CSS named color
  return false;
}

/**
 * Generate a lighter shade of a custom color
 * Used when shade 0-5 is requested for custom colors
 *
 * @param color - Base color (hex or rgb) - treated as shade 6
 * @param shadeIndex - Shade index (0-5)
 * @returns Lighter color string
 */
export function generateLighterShade(color: string, shadeIndex: number): string {
  // For shades 0-5, lighten the color (base is shade 6)
  // shade 0 = lightest (90% lighter), shade 5 = slightly lighter (15% lighter)
  const lightenAmount = (6 - shadeIndex) * 0.15; // 0.9 to 0.15

  // Use the lighten algorithm from lighten.ts
  const rgba = parseColorToRgba(color);
  if (!rgba) return color;

  const { r, g, b, a } = rgba;
  const light = (input: number) => Math.round(input + (255 - input) * lightenAmount);

  return `rgba(${light(r)}, ${light(g)}, ${light(b)}, ${a})`;
}

/**
 * Generate a darker shade of a custom color
 * Used when shade 7-9 is requested for custom colors
 *
 * @param color - Base color (hex or rgb) - treated as shade 6
 * @param shadeIndex - Shade index (7-9)
 * @returns Darker color string
 */
export function generateDarkerShade(color: string, shadeIndex: number): string {
  // For shades 7-9, darken the color (base is shade 6)
  // shade 7 = slightly darker (10% darker), shade 9 = darkest (30% darker)
  const darkenAmount = (shadeIndex - 6) * 0.1; // 0.1 to 0.3

  // Use the darken algorithm from darken.ts
  const rgba = parseColorToRgba(color);
  if (!rgba) return color;

  const { r, g, b, a } = rgba;
  const f = 1 - darkenAmount;
  const dark = (input: number) => Math.round(input * f);

  return `rgba(${dark(r)}, ${dark(g)}, ${dark(b)}, ${a})`;
}

/**
 * Get a shade variation of a custom color
 *
 * For custom colors, we treat shade 6 as the base color (no modification).
 * This aligns with the default primaryShade for light mode.
 * Shades 0-5 are lighter, shades 7-9 are darker.
 *
 * @param color - Base color (hex or rgb)
 * @param shade - Shade index (0-9), where 6 is the base color
 * @returns Color at the requested shade
 */
export function getCustomColorShade(color: string, shade: number): string {
  // Shade 6 is treated as the base color (most common primaryShade for light mode)
  if (shade === 6) {
    return color;
  }

  // Lighter shades (0-5)
  if (shade < 6) {
    return generateLighterShade(color, shade);
  }

  // Darker shades (7-9)
  return generateDarkerShade(color, shade);
}

/**
 * Parse color string to RGBA object
 * Supports hex and rgb/rgba formats
 */
interface RGBA {
  r: number;
  g: number;
  b: number;
  a: number;
}

function parseColorToRgba(color: string): RGBA | null {
  // Handle hex colors
  if (color.startsWith('#')) {
    return hexToRgba(color);
  }

  // Handle rgb/rgba colors
  if (color.startsWith('rgb')) {
    return rgbStringToRgba(color);
  }

  return null;
}

function isHexColor(hex: string): boolean {
  const HEX_REGEXP = /^#?([0-9A-F]{3}){1,2}$/i;
  return HEX_REGEXP.test(hex);
}

function hexToRgba(color: string): RGBA | null {
  if (!isHexColor(color)) {
    return null;
  }

  let hexString = color.replace('#', '');

  // Handle shorthand hex (#fff -> #ffffff)
  if (hexString.length === 3) {
    const shorthandHex = hexString.split('');
    hexString = [
      shorthandHex[0],
      shorthandHex[0],
      shorthandHex[1],
      shorthandHex[1],
      shorthandHex[2],
      shorthandHex[2],
    ].join('');
  }

  const parsed = parseInt(hexString, 16);
  const r = (parsed >> 16) & 255;
  const g = (parsed >> 8) & 255;
  const b = parsed & 255;

  return { r, g, b, a: 1 };
}

function rgbStringToRgba(color: string): RGBA | null {
  const parts = color.replace(/[^0-9,.]/g, '').split(',').map(Number);

  if (parts.length < 3) {
    return null;
  }

  const r = parts[0] || 0;
  const g = parts[1] || 0;
  const b = parts[2] || 0;
  const a = parts[3] !== undefined ? parts[3] : 1;

  return { r, g, b, a };
}
