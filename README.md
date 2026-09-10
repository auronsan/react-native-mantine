<div align="center">

# React Native Mantine

**Mantine for React Native.** 118 themeable, accessible components for iOS, Android and Web, with the theme system, variants and `useForm` API Mantine users already know.

[![npm version](https://img.shields.io/npm/v/react-native-mantine.svg?style=flat-square)](https://www.npmjs.com/package/react-native-mantine)
[![npm downloads](https://img.shields.io/npm/dm/react-native-mantine.svg?style=flat-square)](https://www.npmjs.com/package/react-native-mantine)
[![CI](https://img.shields.io/github/actions/workflow/status/auronsan/react-native-mantine/ci.yml?branch=main&style=flat-square&label=CI)](https://github.com/auronsan/react-native-mantine/actions/workflows/ci.yml)
[![license](https://img.shields.io/npm/l/react-native-mantine.svg?style=flat-square)](https://github.com/auronsan/react-native-mantine/blob/main/LICENSE)
[![React Native](https://img.shields.io/badge/React%20Native-0.81-blue.svg?style=flat-square)](https://reactnative.dev/)
[![Expo](https://img.shields.io/badge/Expo-54-000020.svg?style=flat-square&logo=expo)](https://expo.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue.svg?style=flat-square)](https://www.typescriptlang.org/)

[**Documentation**](https://auronsan.github.io/react-native-mantine/) · [**Try it in Expo Snack**](https://snack.expo.dev/@git/github.com/auronsan/react-native-mantine:snack) · [Starter template](https://github.com/auronsan/react-native-mantine-template) · [npm](https://www.npmjs.com/package/react-native-mantine) · [Changelog](CHANGELOG.md)

<img src="docs/assets/hero.png" alt="Button, Select, Stepper and RingProgress components rendered by React Native Mantine" width="100%" />

</div>

## Why React Native Mantine

- **Same mental model as Mantine on web.** Colors, sizes, radius, shadows, variants (`filled`, `light`, `outline`, `subtle`, `gradient`, ...) and `useForm` follow Mantine, so a team with a Mantine web app can share theme tokens and habits with its mobile app.
- **118 components, not 40.** Layout, inputs, overlays, navigation, feedback and data display, plus components most React Native kits skip: `Tree`, `TreeSelect`, `TransferList`, `Splitter`, `Timeline`, `Stepper`, `Marquee`, `RollingNumber`, `TableOfContents`, `RingProgress`, `SemiCircleProgress`.
- **Works everywhere.** iOS, Android and Web through React Native Web. Expo is a first-class target; bare React Native works too.
- **Zero required native dependencies.** Icons, gradients, clipboard and fonts are pluggable and optional. Bring `@expo/vector-icons` or `react-native-vector-icons`, or neither.
- **Typed end to end.** Written in TypeScript with documented props for every component.

## Features

- **118 React Native Components** - Buttons, inputs, overlays, navigation, feedback and data display, all themeable
- **Full Theme System** - 14 color palettes with 10 shades each, aligned with Mantine, with light and dark modes
- **8 Component Variants** - filled, light, outline, subtle, white, default, gradient and transparent
- **TypeScript First** - Comprehensive type definitions for every component and hook
- **Accessibility Built-in** - Components follow React Native accessibility best practices out of the box
- **Expo Compatible** - Works with Expo and bare React Native; native integrations are optional and pluggable
- **Cross-platform** - iOS, Android and Web (via React Native Web)
- **Form Management** - `useForm` hook with validation, error handling and state management

## Installation

```bash
npm install react-native-mantine
```

Or with Yarn:

```bash
yarn add react-native-mantine
```

### Peer Dependencies

Only `react` and `react-native` are required. Everything else is optional and pluggable.

```bash
npm install react react-native
```

## Icons and native integrations

react-native-mantine does not depend on any icon or gradient package. Pass the implementations you already use through `Theme` / `ThemeProvider`, or through `configureMantine` outside React. When nothing is passed, the library uses `react-native-vector-icons`, `expo-linear-gradient`, `expo-clipboard`, `expo-document-picker` and `expo-font` if they happen to be installed, and otherwise degrades gracefully: icon names render as text and gradients render as a solid first color.

### Expo

```bash
npx expo install @expo/vector-icons expo-linear-gradient
```

```tsx
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { LinearGradient } from 'expo-linear-gradient';
import { Theme, type MantineAdapters } from 'react-native-mantine';

const adapters: Partial<MantineAdapters> = {
  Icon: FontAwesome as MantineAdapters['Icon'], // Expo types `name` as a glyph union
  LinearGradient,
};

export default function App() {
  return <Theme adapters={adapters}>{/* your app */}</Theme>;
}
```

### Bare React Native

```bash
yarn add react-native-vector-icons react-native-linear-gradient
cd ios && pod install
```

```tsx
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';
import { Theme } from 'react-native-mantine';

export default function App() {
  return <Theme adapters={{ Icon: FontAwesome, LinearGradient }}>{/* your app */}</Theme>;
}
```

### Outside React

```ts
import { configureMantine } from 'react-native-mantine';

configureMantine({ Icon: FontAwesome, LinearGradient }); // e.g. in index.js
```

`Theme adapters` takes precedence over `configureMantine`.

### Other adapters

| Adapter          | Used by                   | Shape                                                    | Default fallback       |
| ---------------- | ------------------------- | -------------------------------------------------------- | ---------------------- |
| `clipboard`      | `CopyButton`              | `{ setStringAsync(text) }`                               | `expo-clipboard`       |
| `documentPicker` | `FileButton`, `FileInput` | `(opts) => Promise<{ canceled, assets }>` (Expo shape)   | `expo-document-picker` |
| `loadFonts`      | `Theme`                   | `(fonts) => Promise<void>`                               | `expo-font`            |

```ts
import Clipboard from '@react-native-clipboard/clipboard';

configureMantine({
  clipboard: { setStringAsync: (text) => Clipboard.setString(text) },
});
```

## Quick Start

Wrap your application with `ThemeProvider` at the root level:

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

## Components

React Native Mantine includes 110+ components organized by category:

### Layout Components

- **BoxView** - Base layout component with theme-aware styling
- **Container** - Responsive container with max-width constraints
- **Center** - Centers children horizontally and vertically
- **Flex** - Flexbox layout with gap support
- **Group** - Horizontal layout with spacing
- **Stack** - Vertical layout with spacing
- **Grid** - Responsive grid system
- **SimpleGrid** - Equal-width grid columns
- **Space** - Add spacing between elements
- **AspectRatio** - Maintain aspect ratio for child elements
- **MediaQuery** - Responsive components based on screen size
- **AppShell** - Application shell with header, navbar, aside and footer
- **Splitter** - Resizable panes divided by draggable handles

### Typography

- **Text** - Themeable text component with size variants
- **Title** - Heading component (h1-h6)
- **Highlight** - Highlight text segments
- **Mark** - Mark/highlight text with background color
- **Code** - Inline code display
- **Blockquote** - Styled quotation blocks
- **Kbd** - Keyboard key display
- **Table** - Data table component
- **Typography** - Applies consistent typography styles to nested content

### Buttons

- **Button** - Primary button with variants and loading states
- **UnstyledButton** - Unstyled pressable base
- **ActionIcon** - Icon button with variants
- **CloseButton** - Close/dismiss button
- **CopyButton** - Copy to clipboard button
- **FileButton** - Button that opens the document picker
- **Burger** - Animated hamburger menu button

### Inputs

- **TextInput** - Text input with variants and error states
- **Textarea** - Multiline text input
- **PasswordInput** - Password input with show/hide toggle
- **NumberInput** - Numeric input with increment/decrement
- **PinInput** - PIN code input
- **Switch** - Toggle switch
- **Checkbox** - Checkbox input
- **Radio** - Radio button input
- **Chip** - Selectable chip
- **Slider** - Range slider input
- **Select** - Dropdown select
- **MultiSelect** - Multiple selection dropdown
- **Autocomplete** - Autocomplete input
- **NativeSelect** - Native platform select
- **Fieldset** - Groups related inputs with a legend
- **InputBase** - Base input frame for building custom inputs
- **JsonInput** - JSON input with validation and formatting
- **MaskInput** - Input with masked value formatting
- **ColorInput** - Color input with picker bottom sheet
- **ColorPicker** - Color picker with saturation, hue and alpha controls
- **FileInput** - File picking input built on the document picker
- **PillsInput** - Input that renders pills inside its frame
- **TagsInput** - Input for entering multiple tags
- **AngleSlider** - Circular slider for selecting angles
- **TreeSelect** - Select input with hierarchical options
- **Combobox** - Building blocks for custom select components

### Data Display

- **Paper** - Card-like surface with shadow and padding
- **Badge** - Status badges with variants
- **Avatar** - User avatar with image/initials
- **Card** - Content card with sections
- **Timeline** - Timeline/stepper display
- **List** - Ordered/unordered lists
- **Divider** - Visual separator
- **Progress** - Progress bar
- **RingProgress** - Circular progress indicator
- **Skeleton** - Loading skeleton placeholder
- **ColorSwatch** - Color display component
- **ThemeIcon** - Icon with theme colors
- **Indicator** - Badge indicator overlay
- **Breadcrumbs** - Navigation breadcrumbs
- **Pill** - Removable tag/pill element
- **NumberFormatter** - Formats numbers with separators, prefix and suffix
- **SemiCircleProgress** - Semi-circular progress indicator
- **RollingNumber** - Animated rolling number display
- **DataList** - Key-value data list
- **EmptyState** - Placeholder for empty content areas
- **Tree** - Hierarchical tree view
- **OverflowList** - List that collapses overflowing items

### Overlay Components

- **Overlay** - Backdrop overlay
- **Modal** - Full-featured modal dialog
- **Drawer** - Slide-in drawer from edges
- **Dialog** - Simple dialog box
- **Popover** - Popover with positioning
- **Menu** - Dropdown menu
- **Tooltip** - Hover/press tooltip
- **LoadingOverlay** - Full-screen loading overlay
- **HoverCard** - Dropdown card opened from a target element
- **Affix** - Positions content at fixed screen coordinates
- **Portal** - Renders children into an overlay host
- **FloatingWindow** - Draggable floating window
- **FloatingIndicator** - Indicator that follows its target element

### Feedback

- **Notification** - Toast notification
- **Alert** - Alert banner with variants
- **Loader** - Loading spinner

### Navigation

- **Tabs** - Tab navigation
- **Pagination** - Page pagination
- **Stepper** - Multi-step navigation
- **SegmentedControl** - Segmented control buttons
- **NavLink** - Navigation link component
- **Anchor** - Link component
- **TableOfContents** - List of section links with depth offsets
- **Menubar** - Horizontal bar of menus

### Miscellaneous

- **Accordion** - Collapsible content panels
- **Collapse** - Show/hide content with animation
- **Spoiler** - Show more/less content
- **Rating** - Star rating input
- **TransferList** - Dual list transfer
- **Icon** - Icon component wrapper
- **Image** - Image with fallback
- **BackgroundImage** - Background image container
- **Gradient** - Gradient background
- **LinearGradient** - Linear gradient component
- **Transition** - Animation transition wrapper
- **VisuallyHidden** - Hides content visually while keeping it accessible
- **ScrollArea** - Scrollable area with Mantine-compatible API
- **Scroller** - Horizontal scroller with controls and edge gradients
- **Marquee** - Continuously scrolling content

## Theming

### Creating a Custom Theme

Use `createTheme()` to customize the default theme:

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

### Available Theme Properties

```tsx
const theme = createTheme({
  // Primary color from available colors
  primaryColor: 'blue',

  // Primary shade for light and dark modes
  primaryShade: { light: 6, dark: 8 },

  // Typography
  fontFamily: 'System',
  fontFamilyMonospace: 'Courier',

  // Custom colors (10 shades each)
  colors: {
    brand: [...], // Array of 10 color shades
  },

  // Spacing scale
  spacing: {
    xs: 10,
    sm: 12,
    md: 16,
    lg: 20,
    xl: 24,
  },

  // Border radius scale
  radius: {
    xs: 2,
    sm: 4,
    md: 8,
    lg: 16,
    xl: 32,
  },

  // Font sizes
  fontSizes: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
  },

  // Headings configuration
  headings: {
    fontFamily: 'System',
    sizes: {
      h1: { fontSize: 34, lineHeight: 1.3 },
      h2: { fontSize: 28, lineHeight: 1.35 },
      h3: { fontSize: 22, lineHeight: 1.4 },
      h4: { fontSize: 18, lineHeight: 1.45 },
      h5: { fontSize: 16, lineHeight: 1.5 },
      h6: { fontSize: 14, lineHeight: 1.5 },
    },
  },
});
```

### Default Color Palette

React Native Mantine includes 14 color palettes, each with 10 shades:

- **dark** - Grays and blacks
- **gray** - Gray shades
- **red** - Red spectrum
- **pink** - Pink spectrum
- **grape** - Purple/grape spectrum
- **violet** - Violet spectrum
- **indigo** - Indigo spectrum
- **blue** - Blue spectrum
- **cyan** - Cyan spectrum
- **teal** - Teal spectrum
- **green** - Green spectrum
- **lime** - Lime spectrum
- **yellow** - Yellow spectrum
- **orange** - Orange spectrum

### Dark Mode

Enable dark mode by setting `forceMode` prop or using the theme's `toggleMode` function:

```tsx
// Force dark mode
<ThemeProvider forceMode="dark">
  {children}
</ThemeProvider>

// Or toggle programmatically
import { useTheme } from 'react-native-mantine';

function MyComponent() {
  const theme = useTheme();

  return (
    <Button onPress={theme.toggleMode}>
      Toggle {theme.colorScheme === 'light' ? 'Dark' : 'Light'} Mode
    </Button>
  );
}
```

## Hooks

React Native Mantine provides powerful hooks for form management and resource loading:

### useForm

Comprehensive form state management with validation, error handling, and field tracking:

```tsx
import { useForm } from 'react-native-mantine';

function LoginForm() {
  const form = useForm({
    initialValues: {
      email: '',
      password: '',
      terms: false,
    },

    validate: {
      email: (value) =>
        /^\S+@\S+$/.test(value) ? null : 'Invalid email',
      password: (value) =>
        value.length >= 6 ? null : 'Password must be at least 6 characters',
      terms: (value) =>
        value ? null : 'You must accept terms and conditions',
    },

    validateInputOnChange: false,
    validateInputOnBlur: true,
    clearInputErrorOnChange: true,
  });

  return (
    <Stack>
      <TextInput
        label="Email"
        placeholder="your@email.com"
        {...form.getInputProps('email')}
      />

      <PasswordInput
        label="Password"
        placeholder="Your password"
        {...form.getInputProps('password')}
      />

      <Checkbox
        label="I accept terms and conditions"
        checked={form.values.terms}
        onValueChange={(checked) => form.setFieldValue('terms', checked)}
        error={form.errors.terms}
      />

      <Button
        onPress={form.onSubmit((values) => {
          console.log('Form submitted:', values);
        })}
      >
        Submit
      </Button>
    </Stack>
  );
}
```

### useForm API

**Form State:**
- `values` - Current form values
- `errors` - Form validation errors
- `touched` - Fields that have been focused
- `dirty` - Fields that have been modified

**Field Management:**
- `setFieldValue(field, value)` - Update a single field
- `setValues(values)` - Update multiple fields
- `setFieldError(field, error)` - Set field error
- `setErrors(errors)` - Set multiple errors
- `clearFieldError(field)` - Clear field error
- `clearErrors()` - Clear all errors

**Validation:**
- `validateField(field)` - Validate single field
- `validate()` - Validate entire form
- `isValid(field?)` - Check if field/form is valid
- `getFieldStatus(field)` - Get field status (error, touched, dirty)

**Form Actions:**
- `reset()` - Reset form to initial values
- `isDirty()` - Check if form has been modified
- `getInputProps(field)` - Get props for input component
- `onSubmit(handler)` - Handle form submission
- `setFieldTouched(field)` - Mark field as touched

### useTheme

Access the current theme object:

```tsx
import { useTheme } from 'react-native-mantine';

function MyComponent() {
  const theme = useTheme();

  return (
    <View style={{ backgroundColor: theme.colors.blue[6] }}>
      <Text style={{ color: theme.white }}>
        Current mode: {theme.colorScheme}
      </Text>
    </View>
  );
}
```

### useCachedResources

Handles font loading and resource initialization (used internally by ThemeProvider).

## Accessibility

React Native Mantine components are built with accessibility in mind:

- All interactive components include appropriate `accessibilityRole` props
- Form inputs support `accessibilityLabel` and `accessibilityHint`
- Error states are announced to screen readers
- Touch targets meet minimum size requirements (44x44 points)
- Color contrast ratios meet WCAG AA standards
- Keyboard navigation support on web platform

## Expo Compatibility

React Native Mantine works in Expo (managed and bare) and in plain React Native projects. No Expo package is required. See [Icons and native integrations](#icons-and-native-integrations) for how to plug in `@expo/vector-icons`, `expo-linear-gradient`, `expo-clipboard`, `expo-document-picker` and `expo-font`, or their bare React Native equivalents.

## Platform Support

- **iOS** - 13.0 and above
- **Android** - API 21 (Android 5.0) and above
- **React Native** - 0.70 and above
- **Web** (via React Native Web) - Latest versions of Chrome, Firefox, Safari, and Edge

## Contributing

We welcome contributions! Here's how you can help:

1. **Fork the repository** and create your branch from `main`
2. **Install dependencies** - `yarn install`
3. **Make your changes** - Follow the existing code style
4. **Add tests** - Ensure your code is tested
5. **Run tests** - `yarn test`
6. **Check types** - `yarn typecheck`
7. **Lint your code** - `yarn lint`
8. **Submit a pull request**

### Development Commands

```bash
# Install dependencies
yarn install

# Run example app
yarn example start
yarn example ios
yarn example android

# Testing
yarn test              # Run all tests
yarn typecheck         # Type checking
yarn lint              # Lint code

# Building
yarn prepare           # Build library
yarn clean             # Clean build artifacts
```

### Project Structure

```
react-native-mantine/
├── src/
│   ├── components/    # Component implementations
│   ├── theme/         # Theme system
│   ├── hooks/         # Custom hooks
│   └── index.tsx      # Main exports
├── example/           # Example app
└── lib/              # Build output
```

For more details, see [CONTRIBUTING.md](CONTRIBUTING.md).

## Credits

This library is inspired by the excellent [Mantine](https://mantine.dev/) project by Vitaly Rtishchev. Special thanks to the Mantine team for creating such a wonderful UI library that serves as the foundation for this React Native adaptation.

## Community & Support

- **GitHub Issues** - [Report bugs or request features](https://github.com/auronsan/react-native-mantine/issues)
- **GitHub Discussions** - [Ask questions and get community support](https://github.com/auronsan/react-native-mantine/discussions)
- **Documentation** - [Full documentation and demos](https://auronsan.github.io/react-native-mantine/)

## License

MIT License - see the [LICENSE](LICENSE) file for details.

---

Made with care by [Auronsan](https://github.com/auronsan)
