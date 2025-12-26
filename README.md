# React Native Mantine (WIP/WORK IN PROGRESS)

<div align="center">

[![npm version](https://img.shields.io/npm/v/react-native-mantine.svg)](https://www.npmjs.com/package/react-native-mantine)
[![license](https://img.shields.io/npm/l/react-native-mantine.svg)](https://github.com/auronsan/react-native-mantine/blob/main/LICENSE)
[![React Native](https://img.shields.io/badge/React%20Native-0.74.5-blue.svg)](https://reactnative.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.2.2-blue.svg)](https://www.typescriptlang.org/)

A comprehensive React Native component library inspired by [Mantine](https://mantine.dev/), bringing beautiful and accessible UI components to your mobile applications.

[Installation](#installation) • [Components](#components) • [Usage](#usage) • [Theme](#theme-system) • [Example App](#example-app) • [Contributing](#contributing)

</div>

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

- [ ] Additional components (Carousel, DatePicker, ColorPicker)
- [ ] Enhanced animations and transitions
- [ ] Web platform support
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
