# React Native Mantine (WIP/WORK IN PROGRESS)

<div align="center">

[![npm version](https://img.shields.io/npm/v/react-native-mantine.svg?style=flat-square)](https://www.npmjs.com/package/react-native-mantine)
[![npm downloads](https://img.shields.io/npm/dm/react-native-mantine.svg?style=flat-square)](https://www.npmjs.com/package/react-native-mantine)
[![license](https://img.shields.io/npm/l/react-native-mantine.svg?style=flat-square)](https://github.com/auronsan/react-native-mantine/blob/main/LICENSE)
[![npm bundle size](https://img.shields.io/bundlephobia/minzip/react-native-mantine?style=flat-square)](https://bundlephobia.com/package/react-native-mantine)
[![GitHub stars](https://img.shields.io/github/stars/auronsan/react-native-mantine?style=flat-square)](https://github.com/auronsan/react-native-mantine/stargazers)
[![React Native](https://img.shields.io/badge/React%20Native-0.74.5-blue.svg?style=flat-square)](https://reactnative.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.2.2-blue.svg?style=flat-square)](https://www.typescriptlang.org/)

A comprehensive React Native component library inspired by [Mantine](https://mantine.dev/), bringing beautiful and accessible UI components to your mobile applications.

[Installation](#installation) • [Components](#components) • [Usage](#usage) • [Theme](#theme-system) • [Example App](#example-app) • [Contributing](#contributing)

</div>

---

## 🌐 Live Demo

Try out all components in action without any installation:

**[→ View Live Demo on GitHub Pages](https://auronsan.github.io/react-native-mantine/)**

The demo showcases 70+ components running on the web via React Native Web, with:
- Interactive component examples
- Live code previews
- Theme customization
- All component variants and props

---

## Quick Start

### 🚀 Use the Template

The fastest way to get started is by using our GitHub template:

**[→ Use React Native Mantine Template](https://github.com/auronsan/react-native-mantine-template)**

This template includes all dependencies configured, TypeScript setup, and example components ready to use.

## Installation

```bash
# Using npm
npm install react-native-mantine

# Using yarn
yarn add react-native-mantine

# Using pnpm
pnpm add react-native-mantine
```

### Peer Dependencies

Ensure you have the following peer dependencies installed:

```bash
npm install react react-native expo-linear-gradient expo-font expo-clipboard
```

---

## Quick Start

Wrap your application with the `ThemeProvider` to enable theming:

```tsx
import { ThemeProvider } from 'react-native-mantine';

export default function App() {
  return (
    <ThemeProvider>
      {/* Your app components */}
    </ThemeProvider>
  );
}
```

### Basic Usage Example

```tsx
import { Button, Text, Stack, Paper } from 'react-native-mantine';

function MyComponent() {
  return (
    <Stack spacing="md">
      <Paper padding="lg" shadow="sm">
        <Text size="xl" weight={700}>
          Welcome to React Native Mantine
        </Text>
        <Text color="dimmed">
          Build beautiful mobile apps with ease
        </Text>
      </Paper>

      <Button variant="filled" color="blue" onPress={() => console.log('Pressed!')}>
        Get Started
      </Button>
    </Stack>
  );
}
```

### Theme Customization

Customize the theme to match your brand:

```tsx
import { ThemeProvider, createTheme } from 'react-native-mantine';

const theme = createTheme({
  primaryColor: 'teal',
  primaryShade: { light: 6, dark: 8 },
  fontFamily: 'Inter',
  colors: {
    // Add custom colors
    brand: [
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
    ],
  },
});

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      {/* Your app components */}
    </ThemeProvider>
  );
}
```

---

## Color System

React Native Mantine features a comprehensive color system aligned with Mantine web v6:

### 10-Shade Color Palettes

Every color includes 10 shades (0-9) for consistent theming:

```tsx
import { useMantineTheme } from 'react-native-mantine';

function MyComponent() {
  const theme = useMantineTheme();

  // Access specific color shades
  const lightBlue = theme.colors.blue[0];   // Lightest
  const primaryBlue = theme.colors.blue[6]; // Default
  const darkBlue = theme.colors.blue[9];    // Darkest

  return (
    <View style={{ backgroundColor: primaryBlue }}>
      <Text>Content</Text>
    </View>
  );
}
```

### Primary Color Configuration

Control your app's primary color and its shades:

```tsx
const theme = createTheme({
  primaryColor: 'blue',
  primaryShade: {
    light: 6,  // Shade used in light mode
    dark: 8,   // Shade used in dark mode
  },
});

// Use primary color in components
<Button color="blue">Click me</Button>
```

### Theme Helper Functions

Powerful utilities for color manipulation:

```tsx
const theme = useMantineTheme();

// Get color at primary shade
const primaryColor = theme.fn.themeColor('blue');

// Get specific shade
const lightBlue = theme.fn.themeColor('blue', 2);

// Get variant styles
const styles = theme.fn.variant({ variant: 'filled', color: 'blue' });

// Manipulate colors
const lighter = theme.fn.lighten('#228be6', 0.2);
const darker = theme.fn.darken('#228be6', 0.2);
const dimmed = theme.fn.dimmed(); // Dimmed text color
```

### Component Variants

Components support 8 built-in variants:

- **filled**: Solid background with white text
- **light**: Light background with colored text
- **outline**: Transparent background with colored border
- **subtle**: Transparent background with colored text
- **white**: White background with colored text
- **default**: Gray background (adapts to color scheme)
- **gradient**: Transparent background for gradients
- **transparent**: Fully transparent

```tsx
<Button variant="filled" color="blue">Filled</Button>
<Button variant="light" color="green">Light</Button>
<Button variant="outline" color="red">Outline</Button>
```

### Available Colors

14 default colors ready to use:

- **Blues**: blue, cyan, teal
- **Greens**: green, lime
- **Warm**: yellow, orange, red
- **Purples**: pink, grape, violet, indigo
- **Neutrals**: dark, gray

For detailed documentation, see:
- [Color System Guide](./docs/COLOR_SYSTEM.md)
- [Migration Guide](./docs/MIGRATION_GUIDE.md)

---

## Example App

The library includes a comprehensive example application showcasing all components with live examples and code snippets.

### Running the Example App

```bash
# Clone the repository
git clone https://github.com/auronsan/react-native-mantine.git
cd react-native-mantine

# Install dependencies
yarn install

# Run on Web (recommended for quick preview)
yarn example web

# Run on iOS
yarn example ios

# Run on Android
yarn example android

# Start Metro bundler
yarn example start
```

The example app includes:

- Interactive component showcase
- All 70+ components with examples
- Theme customization demos
- Component variant demonstrations
- Code examples for each component
- **Web support** via React Native Web (also available at [live demo](https://auronsan.github.io/react-native-mantine/))

---

## Development

### Project Structure

```
react-native-mantine/
├── src/
│   ├── components/     # All component implementations
│   ├── theme/          # Theme system and utilities
│   └── hooks/          # Custom React hooks
├── example/            # Example application
│   └── src/
│       ├── examples/   # Component examples
│       └── screens/    # Example app screens
├── lib/                # Built library output
└── package.json
```

### Scripts

```bash
# Development
yarn example start           # Start example app
yarn example web            # Run on web browser
yarn example ios            # Run on iOS
yarn example android        # Run on Android

# Testing & Quality
yarn test                   # Run Jest tests
yarn typecheck             # TypeScript type checking
yarn lint                  # Run ESLint
yarn prettier:write        # Format code

# Building
yarn prepare               # Build library
yarn clean                # Clean build artifacts

# Web Deployment
cd example
yarn web:build             # Build for GitHub Pages
yarn web:serve             # Serve production build locally
```

### Building the Library

The library uses `react-native-builder-bob` for building:

```bash
yarn prepare
```

This generates:

- CommonJS output in `lib/commonjs/`
- ES modules output in `lib/module/`
- TypeScript definitions in `lib/typescript/`

---

## Contributing

Contributions are welcome! Please read our [Contributing Guide](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

### Development Workflow

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Run tests and linting (`yarn test && yarn lint`)
5. Commit your changes (`git commit -m 'Add amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

### Component Development Guidelines

- Follow existing component patterns
- Include TypeScript types for all props
- Write tests for new components
- Add examples in the example app
- Document props and usage in JSDoc comments
- Support all standard variants and sizes where applicable

---

## Roadmap

- [x] Web platform support (via React Native Web)
- [x] Live demo on GitHub Pages
- [ ] Additional components (Carousel, DatePicker, ColorPicker)
- [ ] Enhanced animations and transitions
- [ ] Improved accessibility features
- [ ] Performance optimizations
- [ ] Comprehensive documentation site
- [ ] Storybook integration
- [ ] More theming options

---

## Browser/Platform Support

- iOS 13.0+
- Android API 21+
- React Native 0.70+
- Web (via React Native Web)
  - Chrome, Firefox, Safari, Edge (latest versions)
  - Progressive Web App (PWA) compatible

---

## Credits

This library is inspired by the excellent [Mantine](https://mantine.dev/) project by Vitaly Rtishchev. Special thanks to the Mantine team for creating such a wonderful UI library.

---

## License

MIT License - see the [LICENSE](LICENSE) file for details.

Copyright (c) 2024 Auronsan

---

## Documentation

Visit our official documentation site:

**https://auronsan.github.io/react-native-mantine/**

The documentation includes:
- Interactive component showcase
- Complete setup guide
- API reference
- Usage examples
- Theme customization guide

---

## Links

- [Documentation Site](https://auronsan.github.io/react-native-mantine/)
- [GitHub Repository](https://github.com/auronsan/react-native-mantine)
- [NPM Package](https://www.npmjs.com/package/react-native-mantine)
- [GitHub Packages](https://github.com/auronsan/react-native-mantine/packages)
- [Issue Tracker](https://github.com/auronsan/react-native-mantine/issues)
- [Mantine (Web)](https://mantine.dev/)

---

## Support

If you like this project, please consider:

- Starring the repository on GitHub
- Reporting bugs and suggesting features
- Contributing to the codebase
- Sharing with other developers

---

Made with ❤️ by [Auronsan](https://github.com/auronsan)
