import { View } from 'react-native';
import {
  ExampleWrapper,
  ExampleSection,
  CodeBlock,
} from '../../components/ExampleWrapper';
import {
  Paper,
  Text,
  Stack,
  Button,
  Title,
  Badge,
  useTheme,
} from 'react-native-mantine';

/**
 * Custom Fonts Example
 *
 * This example demonstrates how to load custom fonts in React Native and use them
 * with ThemeProvider's fontFamily configuration. It covers both Expo and bare
 * React Native approaches with complete implementation examples.
 */
export const CustomFontsExample = () => {
  const theme = useTheme();

  return (
    <ExampleWrapper
      title="Custom Fonts with ThemeProvider"
      description="Complete guide to loading custom fonts and configuring them in your Mantine theme"
    >
      {/* ====================================================================
          CURRENT FONT CONFIGURATION
          ==================================================================== */}
      <ExampleSection
        title="Current Font Configuration"
        description="View the fonts currently configured in your theme"
        variant="showcase"
      >
        <Stack spacing={12}>
          <Paper p="md" shadow="sm" radius="md" style={{ backgroundColor: '#fff' }}>
            <Text weight="600" size="lg" style={{ marginBottom: 12 }}>
              Active Font Families
            </Text>
            <Stack spacing={8}>
              <View>
                <Text size="sm" color="dimmed">Default Font:</Text>
                <Badge color="blue" size="lg" style={{ marginTop: 4 }}>
                  {theme.fontFamily}
                </Badge>
              </View>
              <View>
                <Text size="sm" color="dimmed">Bold Font:</Text>
                <Badge color="violet" size="lg" style={{ marginTop: 4 }}>
                  {theme.fontFamilyBold}
                </Badge>
              </View>
              <View>
                <Text size="sm" color="dimmed">SemiBold Font:</Text>
                <Badge color="grape" size="lg" style={{ marginTop: 4 }}>
                  {theme.fontFamilySemiBold}
                </Badge>
              </View>
              <View>
                <Text size="sm" color="dimmed">Monospace Font:</Text>
                <Badge color="cyan" size="lg" style={{ marginTop: 4 }}>
                  {theme.fontFamilyMonospace}
                </Badge>
              </View>
              <View>
                <Text size="sm" color="dimmed">Headings Font:</Text>
                <Badge color="teal" size="lg" style={{ marginTop: 4 }}>
                  {theme.headings.fontFamily}
                </Badge>
              </View>
            </Stack>
          </Paper>

          <Paper p="md" shadow="sm" radius="md" style={{ backgroundColor: '#fff' }}>
            <Text weight="600" style={{ marginBottom: 12 }}>
              Font Preview
            </Text>
            <Stack spacing={8}>
              <Text>Regular text using {theme.fontFamily}</Text>
              <Text weight="600">SemiBold text using {theme.fontFamilySemiBold}</Text>
              <Text weight="700">Bold text using {theme.fontFamilyBold}</Text>
              <Text monospace>Monospace: console.log('Hello')</Text>
              <Title order={3}>Heading using {theme.headings.fontFamily}</Title>
            </Stack>
          </Paper>
        </Stack>
      </ExampleSection>

      {/* ====================================================================
          EXPO APPROACH (RECOMMENDED)
          ==================================================================== */}
      <ExampleSection
        title="Method 1: Using Expo Google Fonts (Recommended)"
        description="The easiest way to load fonts with Expo - includes 1000+ font families"
      >
        <Stack spacing={16}>
          <Paper p="md" shadow="sm" radius="md" style={{ backgroundColor: '#fff' }}>
            <Text weight="600" style={{ marginBottom: 8 }}>
              Step 1: Install Font Package
            </Text>
            <Text size="sm" color="dimmed" style={{ marginBottom: 12 }}>
              Choose a font from https://directory.vercel.app and install it:
            </Text>
            <CodeBlock
              language="bash"
              code={`# Example: Installing Roboto font
npx expo install @expo-google-fonts/roboto

# Example: Installing Inter font
npx expo install @expo-google-fonts/inter

# Example: Installing multiple weights of Nunito Sans
npx expo install @expo-google-fonts/nunito-sans`}
            />
          </Paper>

          <Paper p="md" shadow="sm" radius="md" style={{ backgroundColor: '#fff' }}>
            <Text weight="600" style={{ marginBottom: 8 }}>
              Step 2: Load Fonts in App.tsx
            </Text>
            <Text size="sm" color="dimmed" style={{ marginBottom: 12 }}>
              Use the useFonts hook to load fonts before rendering:
            </Text>
            <CodeBlock
              code={`import { Theme } from 'react-native-mantine';
import {
  useFonts,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
} from '@expo-google-fonts/inter';

export default function App() {
  // Load fonts - map the Google Fonts names to custom keys
  const [fontsLoaded] = useFonts({
    // Map to simple names that match theme configuration
    'Inter-Regular': Inter_400Regular,
    'Inter-Medium': Inter_500Medium,
    'Inter-SemiBold': Inter_600SemiBold,
    'Inter-Bold': Inter_700Bold,
  });

  // Wait for fonts to load before rendering
  if (!fontsLoaded) {
    return null; // Or show a loading screen
  }

  return (
    <Theme theme={customTheme}>
      {/* Your app */}
    </Theme>
  );
}`}
            />
          </Paper>

          <Paper p="md" shadow="sm" radius="md" style={{ backgroundColor: '#fff' }}>
            <Text weight="600" style={{ marginBottom: 8 }}>
              Step 3: Configure Theme
            </Text>
            <Text size="sm" color="dimmed" style={{ marginBottom: 12 }}>
              Create a theme with your custom font families:
            </Text>
            <CodeBlock
              code={`import { Platform } from 'react-native';

const customTheme = {
  // Default font - used for all regular text
  fontFamily: 'Inter-Regular',

  // Bold font - used when weight="700" or bold prop is set
  // Note: On iOS, you can often use the same family and rely on fontWeight
  // On Android, you typically need a separate bold font file
  fontFamilyBold: Platform.select({
    ios: 'Inter-Bold',
    android: 'Inter-Bold',
    default: 'Inter-Bold',
  }),

  // SemiBold font - used when weight="600" or semiBold prop is set
  fontFamilySemiBold: Platform.select({
    ios: 'Inter-SemiBold',
    android: 'Inter-SemiBold',
    default: 'Inter-SemiBold',
  }),

  // Input font - used in TextInput and similar components
  fontFamilyInput: 'Inter-Regular',

  // Monospace font - used for code blocks
  fontFamilyMonospace: Platform.select({
    ios: 'Menlo',
    android: 'monospace',
    default: 'monospace',
  }),

  // Headings configuration
  headings: {
    fontFamily: 'Inter-Bold',
    fontWeight: '700' as const,
    sizes: {
      h1: { fontSize: 34, lineHeight: 1.3 },
      h2: { fontSize: 26, lineHeight: 1.35 },
      h3: { fontSize: 22, lineHeight: 1.4 },
      h4: { fontSize: 18, lineHeight: 1.45 },
      h5: { fontSize: 16, lineHeight: 1.5 },
      h6: { fontSize: 14, lineHeight: 1.5 },
    },
  },
};`}
            />
          </Paper>

          <Paper p="md" shadow="sm" radius="md" style={{ backgroundColor: '#f8f9fa' }}>
            <Text weight="600" style={{ marginBottom: 8 }}>
              💡 Pro Tip: Navigation Font Support
            </Text>
            <Text size="sm" color="dimmed">
              Don't forget to set custom fonts in your navigation headers as well:
            </Text>
            <CodeBlock
              code={`<Stack.Navigator
  screenOptions={{
    headerTitleStyle: {
      fontFamily: 'Inter-Bold',
      fontWeight: 'bold',
    },
  }}
>
  {/* Your screens */}
</Stack.Navigator>`}
            />
          </Paper>
        </Stack>
      </ExampleSection>

      {/* ====================================================================
          CUSTOM FONTS FROM FILES
          ==================================================================== */}
      <ExampleSection
        title="Method 2: Using Custom Font Files"
        description="Load fonts from .ttf or .otf files in your project"
      >
        <Stack spacing={16}>
          <Paper p="md" shadow="sm" radius="md" style={{ backgroundColor: '#fff' }}>
            <Text weight="600" style={{ marginBottom: 8 }}>
              Step 1: Add Font Files to Project
            </Text>
            <Text size="sm" color="dimmed" style={{ marginBottom: 12 }}>
              Create an assets folder and place your font files:
            </Text>
            <CodeBlock
              language="plaintext"
              code={`your-project/
├── assets/
│   └── fonts/
│       ├── CustomFont-Regular.ttf
│       ├── CustomFont-Medium.ttf
│       ├── CustomFont-SemiBold.ttf
│       └── CustomFont-Bold.ttf
├── src/
└── App.tsx`}
            />
          </Paper>

          <Paper p="md" shadow="sm" radius="md" style={{ backgroundColor: '#fff' }}>
            <Text weight="600" style={{ marginBottom: 8 }}>
              Step 2: Load Fonts with Expo Font
            </Text>
            <Text size="sm" color="dimmed" style={{ marginBottom: 12 }}>
              Use expo-font to load custom fonts from files:
            </Text>
            <CodeBlock
              code={`import { useFonts } from 'expo-font';

export default function App() {
  const [fontsLoaded] = useFonts({
    'CustomFont-Regular': require('./assets/fonts/CustomFont-Regular.ttf'),
    'CustomFont-Medium': require('./assets/fonts/CustomFont-Medium.ttf'),
    'CustomFont-SemiBold': require('./assets/fonts/CustomFont-SemiBold.ttf'),
    'CustomFont-Bold': require('./assets/fonts/CustomFont-Bold.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Theme theme={customTheme}>
      {/* Your app */}
    </Theme>
  );
}

const customTheme = {
  fontFamily: 'CustomFont-Regular',
  fontFamilyBold: 'CustomFont-Bold',
  fontFamilySemiBold: 'CustomFont-SemiBold',
  fontFamilyInput: 'CustomFont-Regular',
  headings: {
    fontFamily: 'CustomFont-Bold',
    fontWeight: '700' as const,
  },
};`}
            />
          </Paper>
        </Stack>
      </ExampleSection>

      {/* ====================================================================
          BARE REACT NATIVE APPROACH
          ==================================================================== */}
      <ExampleSection
        title="Method 3: Bare React Native (Without Expo)"
        description="For non-Expo projects using react-native CLI"
      >
        <Stack spacing={16}>
          <Paper p="md" shadow="sm" radius="md" style={{ backgroundColor: '#fff' }}>
            <Text weight="600" style={{ marginBottom: 8 }}>
              iOS Setup
            </Text>
            <Text size="sm" color="dimmed" style={{ marginBottom: 12 }}>
              Add fonts to your Xcode project:
            </Text>
            <CodeBlock
              language="plaintext"
              code={`1. Create assets/fonts folder and add .ttf/.otf files
2. In Xcode, add fonts to your project:
   - Right-click on project
   - Add Files to "YourProject"
   - Select font files
   - Check "Copy items if needed"

3. Edit ios/YourProject/Info.plist:
   <key>UIAppFonts</key>
   <array>
     <string>CustomFont-Regular.ttf</string>
     <string>CustomFont-Bold.ttf</string>
     <string>CustomFont-SemiBold.ttf</string>
   </array>

4. Run: cd ios && pod install && cd ..
5. Rebuild: npx react-native run-ios`}
            />
          </Paper>

          <Paper p="md" shadow="sm" radius="md" style={{ backgroundColor: '#fff' }}>
            <Text weight="600" style={{ marginBottom: 8 }}>
              Android Setup
            </Text>
            <Text size="sm" color="dimmed" style={{ marginBottom: 12 }}>
              Add fonts to Android assets:
            </Text>
            <CodeBlock
              language="plaintext"
              code={`1. Create: android/app/src/main/assets/fonts/
2. Copy your .ttf/.otf files to this folder
3. Font names should match file names (without extension)
4. Rebuild: npx react-native run-android

Note: Android automatically picks up fonts from assets/fonts/`}
            />
          </Paper>

          <Paper p="md" shadow="sm" radius="md" style={{ backgroundColor: '#fff' }}>
            <Text weight="600" style={{ marginBottom: 8 }}>
              react-native.config.js (Optional)
            </Text>
            <Text size="sm" color="dimmed" style={{ marginBottom: 12 }}>
              Automate font linking with react-native.config.js:
            </Text>
            <CodeBlock
              code={`// react-native.config.js
module.exports = {
  project: {
    ios: {},
    android: {},
  },
  assets: ['./assets/fonts/'],
};

// Then run:
// npx react-native-asset`}
            />
          </Paper>
        </Stack>
      </ExampleSection>

      {/* ====================================================================
          COMPLETE WORKING EXAMPLE
          ==================================================================== */}
      <ExampleSection
        title="Complete Working Example"
        description="Full implementation with Nunito Sans from @expo-google-fonts"
      >
        <Stack spacing={16}>
          <Paper p="md" shadow="sm" radius="md" style={{ backgroundColor: '#fff' }}>
            <Text weight="600" style={{ marginBottom: 8 }}>
              This Demo App Setup
            </Text>
            <Text size="sm" color="dimmed" style={{ marginBottom: 12 }}>
              Here's how an app can load and use Nunito Sans (the showcase itself uses the default theme: system font for body text, bundled Outfit for headings):
            </Text>
            <CodeBlock
              code={`// App.tsx
import { Theme } from 'react-native-mantine';
import {
  useFonts,
  NunitoSans_400Regular,
  NunitoSans_600SemiBold,
  NunitoSans_700Bold,
} from '@expo-google-fonts/nunito-sans';

const themeOverride = {
  // Map font families to the loaded fonts
  fontFamily: 'Nunito-Regular',
  fontFamilyBold: 'Nunito-Bold',
  fontFamilySemiBold: 'Nunito-SemiBold',
  fontFamilyInput: 'Nunito-Regular',

  headings: {
    fontFamily: 'Nunito-Bold',
    fontWeight: '700' as const,
    sizes: {
      h1: { fontSize: 34, lineHeight: 1.3 },
      h2: { fontSize: 26, lineHeight: 1.35 },
      h3: { fontSize: 22, lineHeight: 1.4 },
      h4: { fontSize: 18, lineHeight: 1.45 },
      h5: { fontSize: 16, lineHeight: 1.5 },
      h6: { fontSize: 14, lineHeight: 1.5 },
    },
  },
};

export default function App() {
  // Load fonts with custom names
  const [fontsLoaded] = useFonts({
    'Nunito-Regular': NunitoSans_400Regular,
    'Nunito-SemiBold': NunitoSans_600SemiBold,
    'Nunito-Bold': NunitoSans_700Bold,
  });

  // Wait for fonts to load
  if (!fontsLoaded) {
    return null;
  }

  return (
    <Theme theme={themeOverride} forceMode="light">
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerTitleStyle: {
              fontFamily: 'Nunito-Bold',
              fontWeight: 'bold',
            },
          }}
        >
          {/* Your screens */}
        </Stack.Navigator>
      </NavigationContainer>
    </Theme>
  );
}`}
            />
          </Paper>
        </Stack>
      </ExampleSection>

      {/* ====================================================================
          TESTING FONTS
          ==================================================================== */}
      <ExampleSection
        title="Testing Your Font Setup"
        description="Verify fonts are loaded correctly across different components"
        variant="showcase"
      >
        <Stack spacing={12}>
          <Paper p="md" shadow="sm" radius="md" style={{ backgroundColor: '#fff' }}>
            <Text weight="600" style={{ marginBottom: 12 }}>
              Font Weight Test
            </Text>
            <Stack spacing={8}>
              <Text weight="400">Regular (400)</Text>
              <Text weight="500">Medium (500)</Text>
              <Text semiBold>SemiBold (600)</Text>
              <Text bold>Bold (700)</Text>
            </Stack>
          </Paper>

          <Paper p="md" shadow="sm" radius="md" style={{ backgroundColor: '#fff' }}>
            <Text weight="600" style={{ marginBottom: 12 }}>
              Component Font Test
            </Text>
            <Stack spacing={8}>
              <Title order={3}>Title Component</Title>
              <Text>Text Component</Text>
              <Button>Button Component</Button>
              <Badge>Badge Component</Badge>
            </Stack>
          </Paper>
        </Stack>
      </ExampleSection>

      {/* ====================================================================
          TROUBLESHOOTING
          ==================================================================== */}
      <ExampleSection
        title="Troubleshooting Common Issues"
        description="Solutions to common font loading problems"
      >
        <Stack spacing={12}>
          <Paper p="md" shadow="sm" radius="md" style={{ backgroundColor: '#fff3cd' }}>
            <Text weight="600" style={{ marginBottom: 8 }}>
              ⚠️ Font Not Showing
            </Text>
            <Stack spacing={6}>
              <Text size="sm">• Check font name matches exactly (case-sensitive)</Text>
              <Text size="sm">• Verify fonts are loaded before rendering</Text>
              <Text size="sm">• Clear cache: npx expo start --clear</Text>
              <Text size="sm">• On Android, rebuild the app completely</Text>
            </Stack>
          </Paper>

          <Paper p="md" shadow="sm" radius="md" style={{ backgroundColor: '#fff3cd' }}>
            <Text weight="600" style={{ marginBottom: 8 }}>
              ⚠️ Bold/SemiBold Not Working
            </Text>
            <Stack spacing={6}>
              <Text size="sm">• Load separate font files for each weight</Text>
              <Text size="sm">• Map weight-specific fonts in theme config</Text>
              <Text size="sm">• On Android, fontWeight alone often doesn't work</Text>
              <Text size="sm">• Use Platform.select for iOS vs Android differences</Text>
            </Stack>
          </Paper>

          <Paper p="md" shadow="sm" radius="md" style={{ backgroundColor: '#fff3cd' }}>
            <Text weight="600" style={{ marginBottom: 8 }}>
              ⚠️ Fonts Look Different on iOS vs Android
            </Text>
            <Stack spacing={6}>
              <Text size="sm">• iOS renders fonts differently than Android</Text>
              <Text size="sm">• Use Platform.select to set different weights</Text>
              <Text size="sm">• Test on both platforms during development</Text>
              <Text size="sm">• Consider adjusting lineHeight per platform</Text>
            </Stack>
          </Paper>
        </Stack>
      </ExampleSection>

      {/* ====================================================================
          BEST PRACTICES
          ==================================================================== */}
      <ExampleSection
        title="Font Loading Best Practices"
        description="Recommendations for production apps"
      >
        <Stack spacing={12}>
          <Paper p="md" shadow="sm" radius="md" style={{ backgroundColor: '#d1ecf1' }}>
            <Text weight="600" style={{ marginBottom: 8 }}>
              ✓ Load Only Required Weights
            </Text>
            <Text size="sm" color="dimmed">
              Only load font weights you actually use. Each weight increases app size.
              Typically you need: Regular (400), SemiBold (600), and Bold (700).
            </Text>
          </Paper>

          <Paper p="md" shadow="sm" radius="md" style={{ backgroundColor: '#d1ecf1' }}>
            <Text weight="600" style={{ marginBottom: 8 }}>
              ✓ Show Loading Screen
            </Text>
            <Text size="sm" color="dimmed">
              Instead of returning null, show a splash screen or loading indicator
              while fonts load for better user experience.
            </Text>
          </Paper>

          <Paper p="md" shadow="sm" radius="md" style={{ backgroundColor: '#d1ecf1' }}>
            <Text weight="600" style={{ marginBottom: 8 }}>
              ✓ Use Consistent Naming
            </Text>
            <Text size="sm" color="dimmed">
              Name your fonts consistently (e.g., FontName-Regular, FontName-Bold)
              to avoid confusion and make theme configuration clearer.
            </Text>
          </Paper>

          <Paper p="md" shadow="sm" radius="md" style={{ backgroundColor: '#d1ecf1' }}>
            <Text weight="600" style={{ marginBottom: 8 }}>
              ✓ Test on Physical Devices
            </Text>
            <Text size="sm" color="dimmed">
              Always test fonts on physical iOS and Android devices, not just simulators.
              Font rendering can differ significantly.
            </Text>
          </Paper>

          <Paper p="md" shadow="sm" radius="md" style={{ backgroundColor: '#d1ecf1' }}>
            <Text weight="600" style={{ marginBottom: 8 }}>
              ✓ Consider Web Fallbacks
            </Text>
            <Text size="sm" color="dimmed">
              If targeting React Native Web, ensure your font choices have good web
              fallbacks or load web fonts separately.
            </Text>
          </Paper>
        </Stack>
      </ExampleSection>

      {/* ====================================================================
          RESOURCES
          ==================================================================== */}
      <ExampleSection
        title="Helpful Resources"
        description="Links and tools for working with fonts"
      >
        <Stack spacing={12}>
          <Paper p="md" shadow="sm" radius="md" style={{ backgroundColor: '#fff' }}>
            <Text weight="600" style={{ marginBottom: 8 }}>
              Font Libraries & Resources
            </Text>
            <Stack spacing={6}>
              <Text size="sm">• Expo Google Fonts: https://directory.vercel.app</Text>
              <Text size="sm">• Google Fonts: https://fonts.google.com</Text>
              <Text size="sm">• Font Squirrel: https://www.fontsquirrel.com</Text>
              <Text size="sm">• Adobe Fonts: https://fonts.adobe.com</Text>
            </Stack>
          </Paper>

          <Paper p="md" shadow="sm" radius="md" style={{ backgroundColor: '#fff' }}>
            <Text weight="600" style={{ marginBottom: 8 }}>
              Documentation
            </Text>
            <Stack spacing={6}>
              <Text size="sm">• Expo Font: https://docs.expo.dev/develop/user-interface/fonts/</Text>
              <Text size="sm">• RN Custom Fonts: https://reactnative.dev/docs/custom-fonts</Text>
              <Text size="sm">• Mantine Theme: https://mantine.dev/theming/theme-object/</Text>
            </Stack>
          </Paper>
        </Stack>
      </ExampleSection>
    </ExampleWrapper>
  );
};
