# React Native Mantine

<div align="center">

[![npm version](https://img.shields.io/npm/v/react-native-mantine.svg)](https://www.npmjs.com/package/react-native-mantine)
[![license](https://img.shields.io/npm/l/react-native-mantine.svg)](https://github.com/auronsan/react-native-mantine/blob/main/LICENSE)
[![React Native](https://img.shields.io/badge/React%20Native-0.74.5-blue.svg)](https://reactnative.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.2.2-blue.svg)](https://www.typescriptlang.org/)

A comprehensive React Native component library inspired by [Mantine](https://mantine.dev/), bringing beautiful and accessible UI components to your mobile applications.

[Installation](#installation) • [Components](#components) • [Usage](#usage) • [Theme](#theme-system) • [Example App](#example-app) • [Contributing](#contributing)

</div>

---

## Overview

**React Native Mantine** is a feature-rich component library that ports the popular Mantine UI library to React Native. With 70+ professionally designed components, a powerful theming system, and full TypeScript support, it provides everything you need to build stunning mobile applications.

### Key Features

- **70+ Components** - Comprehensive collection organized by functionality
- **Full TypeScript Support** - Built with TypeScript 5.2.2 with strict mode
- **Powerful Theme System** - Extensive customization with color schemes, variants, and sizes
- **Consistent API** - Familiar API patterns across all components
- **Production Ready** - Thoroughly tested and battle-tested components
- **Active Development** - Regular updates and improvements
- **Zero Dependencies** - Minimal peer dependencies (React Native, expo-linear-gradient, expo-font, expo-clipboard)

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

## Components

React Native Mantine includes a comprehensive set of components organized by category:

### Core Components (9)

Essential building blocks for any application.

- **BoxView** - Base component for layout and styling
- **Group** - Horizontal layout with spacing control
- **Stack** - Vertical layout with spacing control
- **Text** - Styled text component with variants
- **Button** - Customizable button with variants and states
- **UnstyledButton** - Minimal button without default styles
- **ActionIcon** - Icon button for compact actions
- **Input** - Base input component
- **Loader** - Loading indicator with variants

### Layout & Typography (8)

Components for structuring content and displaying text.

- **Center** - Center content horizontally and vertically
- **Container** - Responsive container with max-width
- **Flex** - Flexbox layout component
- **Space** - Add spacing between elements
- **Title** - Heading component (h1-h6)
- **Highlight** - Highlight text within strings
- **Mark** - Mark/highlight specific text
- **Code** - Display inline code

### Feedback & Forms (12)

Visual feedback and form input components.

- **Badge** - Display tags, status, or categories
- **Avatar** - User avatar with image or initials
- **Paper** - Container with shadow and border
- **Divider** - Horizontal or vertical divider
- **Progress** - Progress bar indicator
- **Skeleton** - Loading placeholder
- **TextInput** - Single-line text input
- **Textarea** - Multi-line text input
- **PasswordInput** - Password input with visibility toggle
- **Switch** - Toggle switch control
- **Checkbox** - Checkbox input
- **Radio** - Radio button input

### Overlays & Dialogs (13)

Interactive overlay components and modals.

- **Overlay** - Semi-transparent overlay
- **Portal** - Render components in a portal
- **Modal** - Modal dialog component
- **Drawer** - Slide-out drawer panel
- **Dialog** - Simple dialog for quick actions
- **Collapse** - Collapsible content container
- **Accordion** - Collapsible sections
- **Spoiler** - Hide content with show more/less
- **Notification** - Toast notification
- **NumberInput** - Numeric input with controls
- **PinInput** - PIN code input
- **Chip** - Selectable chip component
- **NativeSelect** - Native select dropdown

### Data Display (9)

Components for displaying data and interactive controls.

- **Slider** - Slider input for range selection
- **Rating** - Star rating component
- **Stepper** - Step-by-step progress indicator
- **SegmentedControl** - Segmented control toggle
- **Pagination** - Pagination controls
- **Card** - Card container with sections
- **Timeline** - Vertical timeline component
- **Table** - Data table component
- **List** - Ordered or unordered lists

### Media & Utilities (8)

Image display and utility components.

- **Image** - Image component with placeholder
- **BackgroundImage** - Background image container
- **ThemeIcon** - Icon with theme colors
- **ColorSwatch** - Color preview swatch
- **Transition** - Animation transition wrapper
- **CloseButton** - Close button icon
- **CopyButton** - Copy to clipboard button
- **Burger** - Hamburger menu button

### Navigation & Advanced (13)

Navigation components and advanced features.

- **Anchor** - Styled link/anchor component
- **Kbd** - Keyboard key display
- **Indicator** - Badge indicator overlay
- **Grid** - Responsive grid layout
- **SimpleGrid** - Simple grid with equal columns
- **AspectRatio** - Maintain aspect ratio container
- **MediaQuery** - Responsive media queries
- **Blockquote** - Quote block styling
- **Breadcrumbs** - Breadcrumb navigation
- **NavLink** - Navigation link component
- **LoadingOverlay** - Full overlay with loader
- **Tooltip** - Tooltip on hover/press
- **Popover** - Popover menu
- **Menu** - Dropdown menu component
- **Select** - Select dropdown with search
- **MultiSelect** - Multi-selection dropdown
- **RingProgress** - Circular progress indicator
- **TransferList** - Dual list transfer component

---

## Theme System

React Native Mantine includes a powerful theming system that allows extensive customization of colors, sizes, spacing, and more.

### Using the Theme Provider

```tsx
import { ThemeProvider, createTheme } from 'react-native-mantine';

const customTheme = createTheme({
  primaryColor: 'blue',
  primaryShade: 6,
  fontFamily: 'CustomFont',
});

function App() {
  return (
    <ThemeProvider theme={customTheme}>
      {/* Your app */}
    </ThemeProvider>
  );
}
```

### Accessing Theme in Components

```tsx
import { useTheme } from 'react-native-mantine';

function MyComponent() {
  const theme = useTheme();

  return (
    <View style={{ backgroundColor: theme.colors.blue[6] }}>
      <Text style={{ color: theme.white }}>
        Themed Component
      </Text>
    </View>
  );
}
```

### Theme Configuration

The theme object includes:

- **Colors** - 14 color palettes (blue, red, green, etc.) with 10 shades each
- **Primary Color** - Default component color
- **Font Sizes** - xs, sm, md, lg, xl
- **Spacing** - xs, sm, md, lg, xl
- **Radius** - Border radius values
- **Shadows** - Shadow presets (xs, sm, md, lg, xl)
- **Headings** - Typography for h1-h6
- **Dark/Light Mode** - Built-in color scheme support

### Available Colors

- **Primary Colors:** blue, cyan, teal, green, lime
- **Accent Colors:** red, pink, grape, violet, indigo
- **Neutral Colors:** gray, gray2, dark, secondary
- **Warm Colors:** yellow, orange

### Component Variants

Most components support multiple variants:

- **filled** - Solid background color
- **outline** - Border with transparent background
- **light** - Light background with theme color
- **white** - White background
- **default** - Default styling
- **subtle** - Minimal styling
- **gradient** - Gradient background (for buttons)

### Sizes

Components support consistent sizing:

- **xs** - Extra small
- **sm** - Small
- **md** - Medium (default)
- **lg** - Large
- **xl** - Extra large

---

## Creating Custom Styles

Use the `createStyles` hook to create component-specific styles with theme access:

```tsx
import { createStyles } from 'react-native-mantine';

const useStyles = createStyles((theme, params) => ({
  container: {
    backgroundColor: theme.colors[params.color][6],
    padding: theme.spacing.md,
    borderRadius: theme.radius.md,
  },
  text: {
    color: theme.white,
    fontSize: theme.fontSizes.lg,
  },
}));

function MyComponent({ color = 'blue' }) {
  const { styles } = useStyles({ color });

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Custom Styled Component</Text>
    </View>
  );
}
```

---

## Advanced Examples

### Button Variants

```tsx
import { Stack, Button } from 'react-native-mantine';

function ButtonExamples() {
  return (
    <Stack spacing="md">
      <Button variant="filled" color="blue">Filled Button</Button>
      <Button variant="outline" color="red">Outline Button</Button>
      <Button variant="light" color="green">Light Button</Button>
      <Button variant="subtle" color="violet">Subtle Button</Button>
      <Button variant="gradient" gradient={{ from: 'indigo', to: 'cyan' }}>
        Gradient Button
      </Button>
    </Stack>
  );
}
```

### Form Example

```tsx
import { Stack, TextInput, PasswordInput, Checkbox, Button } from 'react-native-mantine';

function LoginForm() {
  return (
    <Stack spacing="md" padding="lg">
      <TextInput
        label="Email"
        placeholder="your@email.com"
        required
      />
      <PasswordInput
        label="Password"
        placeholder="Your password"
        required
      />
      <Checkbox label="Remember me" />
      <Button fullWidth>Sign In</Button>
    </Stack>
  );
}
```

### Modal Example

```tsx
import { useState } from 'react';
import { Modal, Button, Text, Stack } from 'react-native-mantine';

function ModalExample() {
  const [opened, setOpened] = useState(false);

  return (
    <>
      <Button onPress={() => setOpened(true)}>Open Modal</Button>

      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="Welcome!"
      >
        <Stack spacing="md">
          <Text>This is a modal dialog</Text>
          <Button onPress={() => setOpened(false)}>Close</Button>
        </Stack>
      </Modal>
    </>
  );
}
```

### Grid Layout

```tsx
import { Grid, Paper, Text } from 'react-native-mantine';

function GridExample() {
  return (
    <Grid>
      <Grid.Col span={6}>
        <Paper padding="md" shadow="sm">
          <Text>Column 1</Text>
        </Paper>
      </Grid.Col>
      <Grid.Col span={6}>
        <Paper padding="md" shadow="sm">
          <Text>Column 2</Text>
        </Paper>
      </Grid.Col>
      <Grid.Col span={12}>
        <Paper padding="md" shadow="sm">
          <Text>Full Width Column</Text>
        </Paper>
      </Grid.Col>
    </Grid>
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
