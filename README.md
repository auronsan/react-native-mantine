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

[Documentation](https://auronsan.github.io/react-native-mantine/) • [Getting Started Template](https://github.com/auronsan/react-native-mantine-template) • [NPM](https://www.npmjs.com/package/react-native-mantine) • [GitHub](https://github.com/auronsan/react-native-mantine)

</div>

## Features

- **80+ React Native Components** - Comprehensive collection of production-ready components including buttons, inputs, overlays, navigation, feedback, and data display elements
- **Full Theme System** - 14 color palettes with 10 shades each, aligned with Mantine v6, supporting light and dark modes
- **8 Component Variants** - filled, light, outline, subtle, white, default, gradient, and transparent variants for consistent design
- **TypeScript First** - Written in TypeScript with comprehensive type definitions for excellent developer experience
- **Accessibility Built-in** - Components follow React Native accessibility best practices out of the box
- **Expo Compatible** - Works seamlessly with Expo projects with optional dependencies (expo-linear-gradient, expo-font, expo-clipboard)
- **Cross-platform** - Supports iOS, Android, and Web (via React Native Web)
- **Dark Mode Support** - Automatic color scheme adjustments with full dark mode implementation
- **Form Management** - Powerful useForm hook with validation, error handling, and state management

## Installation

```bash
npm install react-native-mantine
```

Or with Yarn:

```bash
yarn add react-native-mantine
```

### Peer Dependencies

#### Required Peer Dependencies

React Native Mantine requires React and React Native:

```bash
npm install react react-native
```

#### Optional Peer Dependencies

The following dependencies are **optional** and provide enhanced functionality:

```bash
# Optional: For icon support (Icon component)
npm install react-native-vector-icons

# Optional: For gradient support (Gradient, ThemeIcon gradient variant)
npm install expo-linear-gradient

# Optional: For custom font loading
npm install expo-font

# Optional: For clipboard functionality (CopyButton component)
npm install expo-clipboard
```

**Note:** The library will work without these optional dependencies. Components will gracefully degrade:
- Without `react-native-vector-icons`: Icon component displays icon names as text
- Without `expo-linear-gradient`: Gradient components fall back to solid colors
- Without `expo-font`: Custom fonts won't load (system fonts used instead)
- Without `expo-clipboard`: CopyButton will display a warning when used

#### Additional Setup for react-native-vector-icons

If you install react-native-vector-icons, additional setup is required:

For iOS:

```bash
cd ios && pod install
```

For Android, add to `android/app/build.gradle`:

```gradle
apply from: "../../node_modules/react-native-vector-icons/fonts.gradle"
```

For more details, see the [react-native-vector-icons installation guide](https://github.com/oblador/react-native-vector-icons#installation).

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

React Native Mantine is fully compatible with Expo projects. The following Expo packages are **optional peer dependencies**:

- **expo-linear-gradient** - For gradient components (Gradient, ThemeIcon with gradient variant)
- **expo-font** - For custom font loading (Nunito fonts)
- **expo-clipboard** - For clipboard functionality (CopyButton component)

**For Expo Projects:**
Install the optional dependencies you need:

```bash
npx expo install expo-linear-gradient expo-font expo-clipboard
```

**For Bare React Native Projects:**
These packages work in bare React Native projects as well, or you can skip them if you don't need the enhanced functionality.

The library automatically detects available packages and provides graceful fallbacks when they're not installed.

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
