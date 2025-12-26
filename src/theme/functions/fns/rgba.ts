/**
 * Converts a hex or rgb color string to rgba with the specified alpha value
 * @param color - The color string (hex or rgb)
 * @param alpha - Alpha value between 0 and 1
 * @returns rgba color string
 */
export function rgba(_theme: any) {
  return (color: string, alpha: number): string => {
    // If it's already an rgba string, replace the alpha
    if (color.startsWith('rgba')) {
      return color.replace(/[\d.]+\)$/g, `${alpha})`);
    }

    // If it's an rgb string, convert to rgba
    if (color.startsWith('rgb(')) {
      return color.replace('rgb(', 'rgba(').replace(')', `, ${alpha})`);
    }

    // If it's a hex color, convert to rgba
    if (color.startsWith('#')) {
      const hex = color.replace('#', '');
      let r = 0;
      let g = 0;
      let b = 0;

      if (hex.length === 3) {
        r = parseInt(hex[0]! + hex[0]!, 16);
        g = parseInt(hex[1]! + hex[1]!, 16);
        b = parseInt(hex[2]! + hex[2]!, 16);
      } else if (hex.length === 6) {
        r = parseInt(hex.slice(0, 2), 16);
        g = parseInt(hex.slice(2, 4), 16);
        b = parseInt(hex.slice(4, 6), 16);
      } else {
        // Invalid hex, return as is with alpha
        return `rgba(0, 0, 0, ${alpha})`;
      }

      return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    }

    // If we can't parse it, return as is
    return color;
  };
}
