<div align="center">

# React Native Mantine

[![npm version](https://img.shields.io/npm/v/react-native-mantine.svg?style=flat-square)](https://www.npmjs.com/package/react-native-mantine)
[![license](https://img.shields.io/npm/l/react-native-mantine.svg?style=flat-square)](https://github.com/auronsan/react-native-mantine/blob/main/LICENSE)
[![npm downloads](https://img.shields.io/npm/dm/react-native-mantine.svg?style=flat-square)](https://www.npmjs.com/package/react-native-mantine)
[![GitHub stars](https://img.shields.io/github/stars/auronsan/react-native-mantine?style=flat-square)](https://github.com/auronsan/react-native-mantine/stargazers)
[![React Native](https://img.shields.io/badge/React%20Native-0.74.5-blue.svg?style=flat-square)](https://reactnative.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.2.2-blue.svg?style=flat-square)](https://www.typescriptlang.org/)

A comprehensive React Native component library inspired by [Mantine](https://mantine.dev/), bringing beautiful and accessible UI components to your mobile applications.

**Work in Progress** - This library is actively developed and evolving.

</div>

## Links

- [Documentation and demos](https://auronsan.github.io/react-native-mantine/)
- [Getting started template](https://github.com/auronsan/react-native-mantine-template)
- [NPM package](https://www.npmjs.com/package/react-native-mantine)
- [GitHub repository](https://github.com/auronsan/react-native-mantine)
- [Contributing guide](CONTRIBUTING.md)

## Packages

React Native Mantine provides:

- **70+ Components** – Button, TextInput, Paper, Modal, Drawer, and many more
- **Theme System** – 14 color palettes with 10 shades each, aligned with Mantine v6
- **8 Variants** – filled, light, outline, subtle, white, default, gradient, transparent
- **Dark Mode** – Full color scheme support with automatic adjustments
- **TypeScript** – Written in TypeScript with comprehensive type definitions
- **Accessibility** – Built with mobile accessibility best practices
- **Cross-platform** – iOS, Android, and Web (via React Native Web)

## Installation

```bash
npm install react-native-mantine
```

### Peer dependencies

```bash
npm install react react-native expo-linear-gradient expo-font expo-clipboard
```

## Quick Start

```tsx
import { ThemeProvider, Button, Text, Stack, Paper } from 'react-native-mantine';

export default function App() {
  return (
    <ThemeProvider>
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
    </ThemeProvider>
  );
}
```

## Theme Customization

```tsx
import { ThemeProvider, createTheme } from 'react-native-mantine';

const theme = createTheme({
  primaryColor: 'teal',
  primaryShade: { light: 6, dark: 8 },
  fontFamily: 'Inter',
  colors: {
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

## Getting Help

Join our community:

- [GitHub Issues](https://github.com/auronsan/react-native-mantine/issues) – Bug reports and feature requests
- [GitHub Discussions](https://github.com/auronsan/react-native-mantine/discussions) – Questions and community support

## Contributing

We welcome contributions! Please read our [Contributing Guide](CONTRIBUTING.md) to learn about our development process, code standards, and how to submit pull requests.

## Browser/Platform Support

- iOS 13.0+
- Android API 21+
- React Native 0.70+
- Web (via React Native Web) – Chrome, Firefox, Safari, Edge (latest versions)

## Credits

This library is inspired by the excellent [Mantine](https://mantine.dev/) project by Vitaly Rtishchev. Special thanks to the Mantine team for creating such a wonderful UI library.

## Support

If you like this project, please consider:

- Starring the repository on GitHub
- Reporting bugs and suggesting features
- Contributing to the codebase
- Sharing with other developers

## License

MIT – see the [LICENSE](LICENSE) file for details.

---

Made with ❤️ by [Auronsan](https://github.com/auronsan)
