import { View, Dimensions } from 'react-native';
import { useState, useEffect } from 'react';
import {
  ExampleWrapper,
  ExampleSection,
  CodeBlock,
} from '../../components/ExampleWrapper';
import { Paper, Text, Stack, Badge } from 'react-native-mantine';

export const ResponsiveUtilitiesExample = () => {
  const [windowWidth, setWindowWidth] = useState(Dimensions.get('window').width);

  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({ window }) => {
      setWindowWidth(window.width);
    });

    return () => subscription?.remove();
  }, []);

  return (
    <ExampleWrapper
      title="Responsive Utilities"
      description="New responsive functions: largerThan and smallerThan for breakpoint-based styling"
    >
      <ExampleSection
        title="Current Window Size"
        description="See how breakpoints respond to window size"
        variant="showcase"
      >
        <Paper p="md" shadow="sm" radius="md" style={{ backgroundColor: '#fff' }}>
          <Stack spacing={8}>
            <Text weight="600" size="lg">
              Window Width: {Math.round(windowWidth)}px
            </Text>
            <Text size="sm" color="dimmed">
              Resize your window to see breakpoint changes
            </Text>
          </Stack>
        </Paper>
      </ExampleSection>

      <ExampleSection
        title="Breakpoint Reference"
        description="Standard Mantine breakpoints"
      >
        <Stack spacing={8}>
          <Badge size="lg" color="blue">
            xs: 0px
          </Badge>
          <Badge size="lg" color="cyan">
            sm: 576px
          </Badge>
          <Badge size="lg" color="teal">
            md: 768px
          </Badge>
          <Badge size="lg" color="green">
            lg: 992px
          </Badge>
          <Badge size="lg" color="lime">
            xl: 1200px
          </Badge>
        </Stack>
      </ExampleSection>

      <ExampleSection
        title="How It Works"
        description="Understanding largerThan and smallerThan"
        variant="showcase"
      >
        <Stack spacing={12}>
          <Paper p="md" shadow="sm" radius="md" style={{ backgroundColor: '#fff' }}>
            <Text weight="600" size="lg">
              theme.fn.largerThan('md')
            </Text>
            <Text size="sm" color="dimmed" style={{ marginTop: 4 }}>
              Applies styles when screen width is 768px or more
            </Text>
            <View style={{ marginTop: 8 }}>
              <Badge color={windowWidth >= 768 ? 'green' : 'gray'}>
                {windowWidth >= 768 ? 'Currently Active' : 'Not Active'}
              </Badge>
            </View>
          </Paper>

          <Paper p="md" shadow="sm" radius="md" style={{ backgroundColor: '#fff' }}>
            <Text weight="600" size="lg">
              theme.fn.smallerThan('md')
            </Text>
            <Text size="sm" color="dimmed" style={{ marginTop: 4 }}>
              Applies styles when screen width is less than 768px
            </Text>
            <View style={{ marginTop: 8 }}>
              <Badge color={windowWidth < 768 ? 'green' : 'gray'}>
                {windowWidth < 768 ? 'Currently Active' : 'Not Active'}
              </Badge>
            </View>
          </Paper>
        </Stack>
      </ExampleSection>

      <ExampleSection
        title="Responsive Status Indicators"
        description="Visual feedback based on screen size"
      >
        <Stack spacing={12}>
          <Paper p="sm" shadow="sm" radius="md" style={{ backgroundColor: '#e3f2fd' }}>
            <Text weight="500" color="blue">
              Small (sm): {windowWidth >= 576 ? 'Active' : 'Inactive'}
            </Text>
          </Paper>

          <Paper p="sm" shadow="sm" radius="md" style={{ backgroundColor: '#e8f5e9' }}>
            <Text weight="500" color="green">
              Medium (md): {windowWidth >= 768 ? 'Active' : 'Inactive'}
            </Text>
          </Paper>

          <Paper p="sm" shadow="sm" radius="md" style={{ backgroundColor: '#fff3e0' }}>
            <Text weight="500" color="orange">
              Large (lg): {windowWidth >= 992 ? 'Active' : 'Inactive'}
            </Text>
          </Paper>

          <Paper p="sm" shadow="sm" radius="md" style={{ backgroundColor: '#f3e5f5' }}>
            <Text weight="500" color="grape">
              Extra Large (xl): {windowWidth >= 1200 ? 'Active' : 'Inactive'}
            </Text>
          </Paper>
        </Stack>
      </ExampleSection>

      <ExampleSection
        title="Use Cases"
        description="Common scenarios for responsive utilities"
        variant="showcase"
      >
        <Stack spacing={12}>
          <Paper p="md" shadow="sm" radius="md" style={{ backgroundColor: '#fff' }}>
            <Text weight="600">Mobile-First Design</Text>
            <Text size="sm" color="dimmed" style={{ marginTop: 4 }}>
              Use largerThan() to add enhancements for larger screens
            </Text>
          </Paper>

          <Paper p="md" shadow="sm" radius="md" style={{ backgroundColor: '#fff' }}>
            <Text weight="600">Desktop-First Design</Text>
            <Text size="sm" color="dimmed" style={{ marginTop: 4 }}>
              Use smallerThan() to adjust for smaller screens
            </Text>
          </Paper>

          <Paper p="md" shadow="sm" radius="md" style={{ backgroundColor: '#fff' }}>
            <Text weight="600">Responsive Padding</Text>
            <Text size="sm" color="dimmed" style={{ marginTop: 4 }}>
              Adjust spacing based on available screen space
            </Text>
          </Paper>

          <Paper p="md" shadow="sm" radius="md" style={{ backgroundColor: '#fff' }}>
            <Text weight="600">Conditional Visibility</Text>
            <Text size="sm" color="dimmed" style={{ marginTop: 4 }}>
              Show/hide elements at different breakpoints
            </Text>
          </Paper>
        </Stack>
      </ExampleSection>

      <ExampleSection
        title="Usage Example"
        description="How to use responsive utilities in your components"
      >
        <CodeBlock
          code={`import { useTheme } from 'react-native-mantine';
import { StyleSheet } from 'react-native';

function MyComponent() {
  const theme = useTheme();

  const styles = StyleSheet.create({
    container: {
      padding: theme.spacing.sm,
      // On medium and larger screens, use more padding
      [theme.fn.largerThan('md')]: {
        padding: theme.spacing.lg,
      },
      // On large and larger screens, even more padding
      [theme.fn.largerThan('lg')]: {
        padding: theme.spacing.xl,
      },
    },
    mobileOnly: {
      display: 'flex',
      // Hide on medium screens and above
      [theme.fn.largerThan('md')]: {
        display: 'none',
      },
    },
    desktopOnly: {
      display: 'none',
      // Show on medium screens and above
      [theme.fn.largerThan('md')]: {
        display: 'flex',
      },
    },
  });

  return <View style={styles.container}>...</View>;
}

// Breakpoints: xs (0), sm (576), md (768),
//              lg (992), xl (1200)`}
        />
      </ExampleSection>
    </ExampleWrapper>
  );
};
