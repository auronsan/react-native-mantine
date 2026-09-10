/**
 * Fonts shipped with react-native-mantine.
 *
 * Headings use Outfit (SIL Open Font License), the same typeface mantine.dev
 * uses for its headings. Body text uses the platform system font, matching
 * Mantine's default `-apple-system, ..., Roboto` stack.
 *
 * The files are registered by `useCachedResources` (used by `Theme`) through
 * the `loadFonts` adapter or expo-font. Until they are loaded, or when no font
 * loader is available, heading styles fall back to the bold system font so
 * nothing renders with an unknown font family.
 */
export const BUNDLED_HEADING_FONT = 'Outfit';
export const BUNDLED_HEADING_FONT_BOLD = 'Outfit-Bold';

/** Font map to hand to `expo-font` / a `loadFonts` adapter. Resolved lazily so importing the theme never touches the binary assets. */
export function getBundledFonts(): Record<string, any> {
  return {
    [BUNDLED_HEADING_FONT]: require('../fonts/Outfit-SemiBold.ttf'),
    [BUNDLED_HEADING_FONT_BOLD]: require('../fonts/Outfit-Bold.ttf'),
  };
}

let loaded = false;

/** Marks the bundled fonts as registered with the platform */
export function markBundledFontsLoaded(): void {
  loaded = true;
}

/** Whether the bundled fonts have been registered and are safe to use */
export function areBundledFontsLoaded(): boolean {
  return loaded;
}

/** Resets the loaded state (tests only) */
export function resetBundledFonts(): void {
  loaded = false;
}

/** True for font families that ship with the library */
export function isBundledFont(fontFamily: string | undefined): boolean {
  return fontFamily === BUNDLED_HEADING_FONT || fontFamily === BUNDLED_HEADING_FONT_BOLD;
}
