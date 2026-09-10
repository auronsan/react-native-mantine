import { Dimensions, Platform } from 'react-native';
import { createTheme, mergeThemeOverrides } from '../create-theme';
import { DEFAULT_THEME } from '../default-theme';
import { getSize } from '../get-size';
import { rem, em } from '../utils/rem';
import { toRgba } from '../utils/to-rgba';
import { radius } from '../functions/fns/radius';
import { rgba } from '../functions/fns/rgba';
import { size } from '../functions/fns/size';
import { variant } from '../functions/fns/variant';
import {
  gradient,
  linearGradientString,
} from '../functions/fns/gradient/gradient';
import { dimmed } from '../functions/fns/dimmed';
import { largerThan, smallerThan } from '../functions/fns/breakpoints';
import {
  getPrimaryShade,
  getPrimaryColor,
  createPrimaryShadeFunction,
  createPrimaryColorFunction,
} from '../functions/fns/primary-shade';
import {
  themeColor,
  createThemeColorFunction,
} from '../functions/fns/theme-color/theme-color';
import {
  isCustomColor,
  generateLighterShade,
  generateDarkerShade,
  getCustomColorShade,
} from '../functions/fns/theme-color/color-utils';
import {
  fontStyles,
  inputFontStyles,
  fontSize,
  lineHeight,
  headingStyles,
  focusStyles,
  placeholderStyles,
  cover,
  hover,
  activeStyles,
} from '../functions/fns/helpers';
import {
  markBundledFontsLoaded,
  resetBundledFonts,
  BUNDLED_HEADING_FONT_BOLD,
} from '../bundled-fonts';
import type { MantineThemeBase } from '../types';

const theme = createTheme();
const base = theme as unknown as MantineThemeBase;

describe('createTheme', () => {
  it('returns the default theme when no override is given', () => {
    expect(createTheme()).toBe(DEFAULT_THEME);
  });

  it('deep merges overrides and attaches functions', () => {
    const custom = createTheme({
      primaryColor: 'teal',
      spacing: { md: 99 } as any,
      headings: { sizes: { h1: { fontSize: 40 } } } as any,
    });
    expect(custom.primaryColor).toBe('teal');
    expect(custom.spacing.md).toBe(99);
    expect(custom.spacing.sm).toBe(DEFAULT_THEME.spacing.sm);
    expect(custom.headings.sizes.h1.fontSize).toBe(40);
    expect(custom.headings.sizes.h2).toEqual(DEFAULT_THEME.headings.sizes.h2);
    expect(typeof custom.fn.themeColor).toBe('function');
  });

  it('keeps default colors when custom colors are provided', () => {
    const brand = [
      '#e6f7ff',
      '#bae7ff',
      '#91d5ff',
      '#69c0ff',
      '#40a9ff',
      '#1890ff',
      '#096dd9',
      '#0050b3',
      '#003a8c',
      '#002766',
    ] as any;
    const custom = createTheme({
      colors: { brand },
      primaryColor: 'brand' as any,
    });
    expect(custom.colors.brand).toEqual(brand);
    expect(custom.colors.blue).toEqual(DEFAULT_THEME.colors.blue);
    expect(custom.fn.primaryColor()).toBe('#096dd9');
  });

  it('ignores undefined override values and replaces arrays', () => {
    const custom = createTheme({
      primaryColor: undefined,
      colors: { blue: ['#000'] as any },
    });
    expect(custom.primaryColor).toBe('blue');
    expect(custom.colors.blue).toEqual(['#000']);
  });

  it('mergeThemeOverrides combines multiple overrides', () => {
    const merged = mergeThemeOverrides(
      { primaryColor: 'red', spacing: { md: 10 } as any },
      { fontFamily: 'Inter', spacing: { lg: 20 } as any }
    );
    expect(merged).toEqual({
      primaryColor: 'red',
      fontFamily: 'Inter',
      spacing: { md: 10, lg: 20 },
    });
    expect(mergeThemeOverrides()).toEqual({});
  });
});

describe('getSize', () => {
  const sizes = { xs: 1, sm: 2, md: 3 };

  it('returns value from sizes map', () => {
    expect(getSize({ size: 'sm', sizes })).toBe(2);
  });

  it('returns raw numbers', () => {
    expect(getSize({ size: 12, sizes })).toBe(12);
  });

  it('falls back to md for unknown/empty sizes', () => {
    expect(getSize({ size: '' as any, sizes })).toBe(3);
    expect(getSize({ size: 'xl' as any, sizes })).toBe('xl');
    expect(getSize({ size: 5, sizes: undefined as any })).toBe(5);
    expect(getSize({ size: 0, sizes: null as any })).toBeUndefined();
  });
});

describe('size fn', () => {
  const fn = size(base);
  it('returns 0 for missing size', () => {
    expect(fn({ size: undefined, sizes: { md: 4 } })).toBe(0);
    expect(fn({ size: null as any, sizes: { md: 4 } })).toBe(0);
    expect(fn({ size: '' as any, sizes: { md: 4 } })).toBe(0);
  });
  it('returns 0 for numeric 0 rather than the md fallback', () => {
    expect(fn({ size: 0, sizes: { md: 4 } })).toBe(0);
  });
  it('resolves through getSize', () => {
    expect(fn({ size: 'md', sizes: { md: 4 } })).toBe(4);
    expect(fn({ size: 7, sizes: { md: 4 } })).toBe(7);
  });
});

describe('rem / em', () => {
  it('passes numbers through', () => {
    expect(rem(12)).toBe(12);
    expect(em(0)).toBe(0);
  });
  it('parses px strings and numeric strings', () => {
    expect(rem('16px')).toBe(16);
    expect(rem('8')).toBe(8);
    expect(em('2.5px')).toBe(2.5);
  });
  it('returns 0 for unparsable input', () => {
    expect(rem('1rem')).toBe(0);
    expect(rem(null)).toBe(0);
    expect(rem(undefined)).toBe(0);
    expect(rem({})).toBe(0);
  });
});

describe('toRgba', () => {
  it('parses long hex', () => {
    expect(toRgba('#228be6')).toEqual({ r: 34, g: 139, b: 230, a: 1 });
    expect(toRgba('228be6')).toEqual({ r: 34, g: 139, b: 230, a: 1 });
  });
  it('parses short hex', () => {
    expect(toRgba('#fff')).toEqual({ r: 255, g: 255, b: 255, a: 1 });
  });
  it('parses rgb and rgba strings', () => {
    expect(toRgba('rgb(1, 2, 3)')).toEqual({ r: 1, g: 2, b: 3, a: 1 });
    expect(toRgba('rgba(1, 2, 3, 0.5)')).toEqual({ r: 1, g: 2, b: 3, a: 0.5 });
    expect(toRgba('rgb()')).toEqual({ r: 0, g: 0, b: 0, a: 1 });
  });
  it('returns black for unknown values', () => {
    expect(toRgba('tomato')).toEqual({ r: 0, g: 0, b: 0, a: 1 });
  });
});

describe('rgba fn', () => {
  const fn = rgba(base);
  it('replaces alpha in rgba strings', () => {
    expect(fn('rgba(1, 2, 3, 0.2)', 0.7)).toBe('rgba(1, 2, 3, 0.7)');
  });
  it('converts rgb strings', () => {
    expect(fn('rgb(1, 2, 3)', 0.5)).toBe('rgba(1, 2, 3, 0.5)');
  });
  it('converts short and long hex', () => {
    expect(fn('#fff', 0.3)).toBe('rgba(255, 255, 255, 0.3)');
    expect(fn('#228be6', 1)).toBe('rgba(34, 139, 230, 1)');
  });
  it('handles invalid hex and unknown strings', () => {
    expect(fn('#12345', 0.4)).toBe('rgba(0, 0, 0, 0.4)');
    expect(fn('tomato', 0.4)).toBe('tomato');
  });
});

describe('radius fn', () => {
  it('returns defaultRadius when size is missing', () => {
    expect(radius(base)()).toBe(base.defaultRadius);
  });
  it('resolves named sizes and numbers', () => {
    expect(radius(base)('sm')).toBe(base.radius.sm);
    expect(radius(base)(13)).toBe(13);
  });
  it('treats numeric 0 as a valid radius instead of falling back to the default', () => {
    expect(radius(base)(0)).toBe(0);
    expect(radius({ ...base, defaultRadius: 'md' })(0)).toBe(0);
  });
  it('falls back to default radius for unknown keys', () => {
    const numericDefault = { ...base, defaultRadius: 5 };
    expect(radius(numericDefault)('nope' as any)).toBe('nope');
    expect(radius({ ...base, defaultRadius: 'md' })('' as any)).toBe(
      base.defaultRadius
    );
    const unknownDefault = { ...base, defaultRadius: 'weird' };
    expect(radius(unknownDefault)(null as any)).toBe('weird');
    expect(radius(unknownDefault)(0)).toBe(0);
  });
});

describe('primary shade / color', () => {
  it('returns numeric primaryShade directly', () => {
    expect(getPrimaryShade({ ...base, primaryShade: 4 })).toBe(4);
  });
  it('resolves object primaryShade by scheme', () => {
    const t = { ...base, primaryShade: { light: 5, dark: 8 } } as any;
    expect(getPrimaryShade(t)).toBe(5);
    expect(getPrimaryShade(t, 'dark')).toBe(8);
    expect(getPrimaryShade({ ...t, colorScheme: 'dark' })).toBe(8);
    expect(getPrimaryShade({ ...t, colorScheme: undefined })).toBe(5);
    expect(createPrimaryShadeFunction(t)('dark')).toBe(8);
  });
  it('returns primary color and warns for unknown palette', () => {
    expect(getPrimaryColor(base)).toBe(base.colors.blue[6]);
    expect(createPrimaryColorFunction(base)('dark')).toBe(base.colors.blue[8]);
    const warn = jest.spyOn(console, 'warn').mockImplementation(() => {});
    expect(getPrimaryColor({ ...base, primaryColor: 'missing' as any })).toBe(
      base.colors.blue[6]
    );
    expect(warn).toHaveBeenCalled();
    warn.mockRestore();
    const noBlue = {
      ...base,
      primaryColor: 'missing',
      colors: {} as any,
    } as any;
    jest.spyOn(console, 'warn').mockImplementation(() => {});
    expect(getPrimaryColor(noBlue)).toBe('#228be6');
    (console.warn as jest.Mock).mockRestore();
  });
  it('falls back to first shade when shade is missing', () => {
    const t = { ...base, colors: { ...base.colors, blue: ['#abc'] } } as any;
    expect(getPrimaryColor(t)).toBe('#abc');
    expect(getPrimaryColor({ ...t, colors: { blue: [] } })).toBe('#228be6');
  });
});

describe('themeColor', () => {
  it('returns empty string or primary for empty color', () => {
    expect(themeColor({ theme: base, color: '' })).toBe('');
    expect(themeColor({ theme: base, color: '', primaryFallback: true })).toBe(
      base.colors.blue[6]
    );
  });
  it('passes custom colors through and shades them', () => {
    expect(themeColor({ theme: base, color: '#ff0000' })).toBe('#ff0000');
    expect(themeColor({ theme: base, color: '#ff0000', shade: 6 })).toBe(
      '#ff0000'
    );
    expect(themeColor({ theme: base, color: '#ff0000', shade: 8 })).toBe(
      'rgba(204, 0, 0, 1)'
    );
  });
  it('resolves palette colors with shade', () => {
    expect(themeColor({ theme: base, color: 'red', shade: 2 })).toBe(
      base.colors.red[2]
    );
    expect(themeColor({ theme: base, color: 'red' })).toBe(base.colors.red[6]);
    expect(createThemeColorFunction(base)('red', 1)).toBe(base.colors.red[1]);
  });
  it('handles unknown colors with and without fallback', () => {
    expect(themeColor({ theme: base, color: 'tomato' })).toBe('tomato');
    expect(
      themeColor({ theme: base, color: 'tomato', primaryFallback: true })
    ).toBe(base.colors.blue[6]);
    const noPrimary = { ...base, primaryColor: 'nope' } as any;
    expect(
      themeColor({ theme: noPrimary, color: 'nope', primaryFallback: true })
    ).toBe('nope');
  });
  it('falls back to first shade when the requested shade is missing', () => {
    const t = { ...base, colors: { ...base.colors, red: ['#111'] } } as any;
    expect(themeColor({ theme: t, color: 'red', shade: 5 })).toBe('#111');
    const empty = { ...base, colors: { ...base.colors, red: [] } } as any;
    expect(themeColor({ theme: empty, color: 'red', shade: 5 })).toBe('red');
  });
});

describe('color-utils', () => {
  it('detects custom colors', () => {
    expect(isCustomColor('#fff')).toBe(true);
    expect(isCustomColor('rgb(0,0,0)')).toBe(true);
    expect(isCustomColor('hsl(0, 100%, 50%)')).toBe(true);
    expect(isCustomColor('transparent')).toBe(true);
    expect(isCustomColor('currentColor')).toBe(true);
    expect(isCustomColor('blue')).toBe(false);
    expect(isCustomColor('')).toBe(false);
    expect(isCustomColor(undefined as any)).toBe(false);
    expect(isCustomColor(12 as any)).toBe(false);
  });

  it('generates lighter and darker shades', () => {
    expect(generateLighterShade('#000000', 0)).toBe('rgba(229, 229, 229, 1)');
    expect(generateLighterShade('#000', 5)).toBe('rgba(38, 38, 38, 1)');
    expect(generateDarkerShade('rgb(100, 100, 100)', 9)).toBe(
      'rgba(70, 70, 70, 1)'
    );
    expect(generateDarkerShade('rgba(100, 100, 100, 0.5)', 7)).toBe(
      'rgba(90, 90, 90, 0.5)'
    );
  });

  it('returns input unchanged for unparsable colors', () => {
    expect(generateLighterShade('hsl(0, 0%, 0%)', 1)).toBe('hsl(0, 0%, 0%)');
    expect(generateDarkerShade('#zzz', 8)).toBe('#zzz');
    expect(generateDarkerShade('rgb(1)', 8)).toBe('rgb(1)');
  });

  it('getCustomColorShade dispatches by shade', () => {
    expect(getCustomColorShade('#123456', 6)).toBe('#123456');
    expect(getCustomColorShade('#ffffff', 3)).toBe('rgba(255, 255, 255, 1)');
    expect(getCustomColorShade('#ffffff', 8)).toBe('rgba(204, 204, 204, 1)');
  });
});

describe('variant', () => {
  const fn = variant(base);
  const primary = base.colors.blue;

  it('filled', () => {
    expect(fn({ variant: 'filled' })).toEqual({
      background: primary[6],
      color: base.white,
      border: primary[6],
      hover: primary[7],
    });
    const highShade = variant({ ...base, primaryShade: 9 });
    expect(highShade({ variant: 'filled', color: 'red' }).hover).toBe(
      base.colors.red[9]
    );
  });

  it('light', () => {
    expect(fn({ variant: 'light', color: 'red' })).toEqual({
      background: base.colors.red[0],
      color: base.colors.red[7],
      border: 'transparent',
      hover: base.colors.red[1],
    });
    const dark = variant({ ...base, primaryShade: 8 });
    expect(dark({ variant: 'light', color: 'red' }).color).toBe(
      base.colors.red[8]
    );
  });

  it('outline, subtle, white, transparent, gradient', () => {
    expect(fn({ variant: 'outline', color: 'red' })).toEqual({
      background: 'transparent',
      color: base.colors.red[6],
      border: base.colors.red[6],
      hover: base.colors.red[0],
    });
    expect(fn({ variant: 'subtle', color: 'red' })).toEqual({
      background: 'transparent',
      color: base.colors.red[6],
      border: 'transparent',
      hover: base.colors.red[0],
    });
    expect(fn({ variant: 'white', color: 'red' })).toEqual({
      background: base.white,
      color: base.colors.red[6],
      border: base.white,
      hover: base.colors.gray[0],
    });
    expect(fn({ variant: 'transparent', color: 'red' })).toEqual({
      background: 'transparent',
      color: base.colors.red[6],
      border: 'transparent',
    });
    expect(fn({ variant: 'gradient' })).toEqual({
      background: 'transparent',
      color: base.white,
      border: 'transparent',
    });
  });

  it('default variant in light and dark scheme', () => {
    expect(fn({ variant: 'default' })).toEqual({
      background: base.white,
      color: base.black,
      border: base.colors.gray[4],
      hover: base.colors.gray[0],
    });
    const dark = variant({ ...base, colorScheme: 'dark' });
    expect(dark({ variant: 'default' })).toEqual({
      background: base.colors.dark[6],
      color: base.white,
      border: base.colors.dark[4],
      hover: base.colors.dark[5],
    });
  });

  it('uses fallback constants when palettes are missing', () => {
    const noColors = { ...base, colors: {} as any };
    expect(variant(noColors)({ variant: 'white' }).hover).toBe('#f8f9fa');
    expect(variant(noColors)({ variant: 'default' })).toEqual({
      background: base.white,
      color: base.black,
      border: '#ced4da',
      hover: '#f8f9fa',
    });
    expect(
      variant({ ...noColors, colorScheme: 'dark' })({ variant: 'default' })
    ).toEqual({
      background: '#25262b',
      color: base.white,
      border: '#373A40',
      hover: '#2C2E33',
    });
  });

  it('unknown variant falls back to filled without hover', () => {
    expect(fn({ variant: 'weird' as any, color: 'red' })).toEqual({
      background: base.colors.red[6],
      color: base.white,
      border: base.colors.red[6],
    });
  });

  it('supports custom colors and primaryFallback', () => {
    expect(fn({ variant: 'filled', color: '#ff0000' }).background).toBe(
      '#ff0000'
    );
    expect(
      fn({ variant: 'filled', color: 'nope', primaryFallback: true }).background
    ).toBe(primary[6]);
  });
});

describe('gradient', () => {
  it('uses theme default gradient', () => {
    const result = gradient(base)();
    expect(result.colors).toHaveLength(2);
    expect(result.start.x).toBeCloseTo(0.146, 2);
    expect(result.start.y).toBeCloseTo(0.854, 2);
    expect(result.end.x).toBeCloseTo(0.854, 2);
    expect(result.end.y).toBeCloseTo(0.146, 2);
  });

  it('accepts payload overrides and normalizes degrees', () => {
    const result = gradient(base)({ from: 'red', to: '#00ff00', deg: 90 });
    expect(result.colors).toEqual([base.colors.red[6], '#00ff00']);
    expect(result.start.x).toBeCloseTo(0);
    expect(result.end.x).toBeCloseTo(1);
    expect(result.start.y).toBeCloseTo(0.5);

    const negative = gradient(base)({ deg: -270 } as any);
    expect(negative.start.x).toBeCloseTo(0);
    expect(negative.end.x).toBeCloseTo(1);

    const zero = gradient(base)({ deg: 0 } as any);
    expect(zero.start.y).toBeCloseTo(1);
    expect(zero.end.y).toBeCloseTo(0);
  });

  it('falls back to primary color when no default gradient exists', () => {
    const t = { ...base, defaultGradient: undefined } as any;
    const result = gradient(t)();
    expect(result.colors).toEqual([base.colors.blue[6], base.colors.blue[6]]);
  });

  it('linearGradientString builds css string', () => {
    expect(linearGradientString(45, '#fff', '#000')).toBe(
      'linear-gradient(45deg, #fff, #000)'
    );
  });
});

describe('dimmed', () => {
  it('returns gray in light mode and dark palette in dark mode', () => {
    expect(dimmed(base)()).toBe(base.colors.gray[6]);
    expect(dimmed({ ...base, currentMode: 'dark' })()).toBe(
      base.colors.dark[2]
    );
    const noColors = { ...base, colors: {} as any };
    expect(dimmed(noColors)()).toBe('#868e96');
    expect(dimmed({ ...noColors, currentMode: 'dark' })()).toBe('#909296');
  });
});

describe('breakpoints', () => {
  let spy: jest.SpyInstance;
  beforeEach(() => {
    spy = jest
      .spyOn(Dimensions, 'get')
      .mockReturnValue({ width: 800, height: 600, scale: 1, fontScale: 1 });
  });
  afterEach(() => {
    spy.mockRestore();
  });

  it('compares against numeric and theme breakpoints', () => {
    expect(largerThan(base)(700)).toBe(true);
    expect(smallerThan(base)(700)).toBe(false);
    expect(largerThan(base)('xs')).toBe(true);
    expect(smallerThan(base)('xl')).toBe(true);
  });

  it('handles string breakpoint values and missing theme breakpoints', () => {
    const stringy = {
      ...base,
      breakpoints: { ...base.breakpoints, sm: '900' },
    } as any;
    expect(largerThan(stringy)('sm')).toBe(false);
    const none = { ...base, breakpoints: undefined } as any;
    expect(largerThan(none)('md')).toBe(false);
    expect(smallerThan(none)('md')).toBe(true);
  });
});

describe('helpers', () => {
  afterEach(() => {
    resetBundledFonts();
  });

  it('font style helpers', () => {
    expect(fontStyles(base)()).toEqual({
      fontFamily: base.fontFamily,
      lineHeight: base.lineHeight,
    });
    expect(inputFontStyles(base)()).toEqual({
      fontFamily: base.fontFamilyInput,
      fontSize: base.fontSizes.md,
      lineHeight: base.lineHeights.md,
    });
    expect(fontSize(base)('lg')).toBe(base.fontSizes.lg);
    expect(fontSize(base)(11)).toBe(11);
    expect(lineHeight(base)('sm')).toBe(base.lineHeights.sm);
    expect(placeholderStyles(base)()).toEqual({ opacity: 0.6 });
    expect(focusStyles(base)()).toEqual({});
    expect(cover(base)()).toEqual({
      position: 'absolute',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
    });
    expect(cover(base)(4).left).toBe(4);
    expect(hover(base)({ opacity: 1 })).toEqual({ opacity: 1 });
    expect(activeStyles(base)).toEqual({
      opacity: 0.8,
      transform: [{ scale: 0.98 }],
    });
  });

  it('headingStyles falls back to system bold font while bundled fonts are not loaded', () => {
    const bundled = {
      ...base,
      headings: { ...base.headings, fontFamily: BUNDLED_HEADING_FONT_BOLD },
    } as any;
    const styles = headingStyles(bundled)(1);
    expect(styles.fontFamily).toBe(base.fontFamilyBold);
    expect(styles.fontWeight).toBe(base.fontWeights.bold);
    expect(styles.fontSize).toBe(base.headings.sizes.h1.fontSize);
    expect(styles.lineHeight).toBe(
      base.headings.sizes.h1.lineHeight * base.headings.sizes.h1.fontSize
    );
  });

  it('headingStyles uses bundled font once loaded and normal weight on android', () => {
    markBundledFontsLoaded();
    const bundled = {
      ...base,
      headings: { ...base.headings, fontFamily: BUNDLED_HEADING_FONT_BOLD },
    } as any;
    const original = Platform.OS;
    (Platform as any).OS = 'android';
    const android = headingStyles(bundled)(2);
    expect(android.fontFamily).toBe(BUNDLED_HEADING_FONT_BOLD);
    expect(android.fontWeight).toBe('normal');
    (Platform as any).OS = 'ios';
    const ios = headingStyles(bundled)(2);
    expect(ios.fontFamily).toBe(BUNDLED_HEADING_FONT_BOLD);
    expect(ios.fontWeight).not.toBe('normal');
    (Platform as any).OS = original;
  });

  it('headingStyles respects per-heading overrides and theme fallbacks', () => {
    const custom = {
      ...base,
      headings: {
        ...base.headings,
        fontFamily: undefined,
        fontWeight: undefined,
        sizes: {
          ...base.headings.sizes,
          h3: {
            ...base.headings.sizes.h3,
            fontFamily: 'Custom',
            fontWeight: '500',
          },
        },
      },
    } as any;
    expect(headingStyles(custom)(3)).toMatchObject({
      fontFamily: 'Custom',
      fontWeight: '500',
    });
    expect(headingStyles(custom)(4)).toMatchObject({
      fontFamily: base.fontFamilyBold,
      fontWeight: base.fontWeights.bold,
    });
  });
});

describe('theme.fn integration', () => {
  it('exposes the attached helpers', () => {
    expect(theme.fn.themeColor('red', 3)).toBe(theme.colors.red[3]);
    expect(theme.fn.primaryShade()).toBe(6);
    expect(theme.fn.rgba('#000', 0.5)).toBe('rgba(0, 0, 0, 0.5)');
    expect(theme.fn.radius('lg')).toBe(theme.radius.lg);
    expect(theme.fn.size({ size: 'md', sizes: { md: 3 } })).toBe(3);
    expect(theme.fn.gradient().colors).toHaveLength(2);
    expect(theme.fn.dimmed()).toBe(theme.colors.gray[6]);
    expect(theme.fn.variant({ variant: 'filled' }).color).toBe(theme.white);
    expect(theme.fn.headingStyles(1).fontSize).toBe(
      theme.headings.sizes.h1.fontSize
    );
  });
});
