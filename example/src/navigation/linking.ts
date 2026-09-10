import type { LinkingOptions } from '@react-navigation/native';
import { componentCategories } from './componentData';
import { categoryPath, componentPath, SITE_URL } from './slugs';
import type { RootStackParamList } from './types';

/**
 * Gives every screen a real URL on web (e.g. /components/button) so pages can
 * be linked, indexed, and pre-rendered by scripts/generate-seo.ts.
 * The GitHub Pages base path is detected at runtime so local dev keeps working.
 */
const pathname: string = (globalThis as any).location?.pathname ?? '';
const basePath = pathname.startsWith('/react-native-mantine') ? 'react-native-mantine/' : '';

const screens: Record<string, string> = { Home: basePath || '/' };

for (const category of componentCategories) {
  screens[category.route] = basePath + categoryPath(category.title);
  for (const component of category.components) {
    screens[component.route] = basePath + componentPath(component.name);
  }
}

export const linking: LinkingOptions<RootStackParamList> = {
  prefixes: [SITE_URL],
  config: { screens: screens as any },
};
