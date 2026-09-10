import { Platform } from 'react-native';
import { createTheme } from '../theme/create-theme';
import {
  BUNDLED_HEADING_FONT,
  areBundledFontsLoaded,
  markBundledFontsLoaded,
  resetBundledFonts,
} from '../theme/bundled-fonts';

jest.mock('../fonts/Outfit-SemiBold.ttf', () => 'outfit-semibold');
jest.mock('../fonts/Outfit-Bold.ttf', () => 'outfit-bold');

describe('bundled heading font', () => {
  afterEach(() => {
    resetBundledFonts();
  });

  it('defaults headings to Outfit at 600, like mantine.dev', () => {
    const theme = createTheme();
    expect(theme.headings.fontFamily).toBe(BUNDLED_HEADING_FONT);
    expect(theme.headings.fontWeight).toBe('600');
  });

  it('falls back to the bold system font until the files are registered', () => {
    const theme = createTheme();
    expect(areBundledFontsLoaded()).toBe(false);
    const styles = theme.fn.headingStyles(1);
    expect(styles.fontFamily).toBe(theme.fontFamilyBold);
    expect(styles.fontWeight).toBe(theme.fontWeights.bold);
  });

  it('uses Outfit once the fonts are loaded', () => {
    markBundledFontsLoaded();
    const theme = createTheme();
    const styles = theme.fn.headingStyles(2);
    expect(styles.fontFamily).toBe(BUNDLED_HEADING_FONT);
    expect(styles.fontWeight).toBe(Platform.OS === 'android' ? 'normal' : '600');
  });

  it('leaves custom heading fonts untouched', () => {
    const theme = createTheme({ headings: { fontFamily: 'Inter-Bold', fontWeight: '700' } as any });
    const styles = theme.fn.headingStyles(3);
    expect(styles.fontFamily).toBe('Inter-Bold');
    expect(styles.fontWeight).toBe('700');
  });
});
