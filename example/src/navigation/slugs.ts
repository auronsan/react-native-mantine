/** URL slugs shared by the app's deep links and the static SEO pages. */
export const SITE_URL = 'https://auronsan.github.io/react-native-mantine';

export const toSlug = (value: string): string =>
  value
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/[^a-zA-Z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .toLowerCase();

export const componentPath = (name: string): string => `components/${toSlug(name)}`;
export const categoryPath = (title: string): string => `categories/${toSlug(title)}`;
