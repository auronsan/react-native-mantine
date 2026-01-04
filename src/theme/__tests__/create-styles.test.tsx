/**
 * Tests for createStyles type inference
 */
import { View, Text } from 'react-native';
import { createStyles } from '../create-styles';
import type { MantineTheme } from '../types';

describe('createStyles type inference', () => {
  it('should properly infer ViewStyle for View components', () => {
    const useStyles = createStyles((theme: MantineTheme) => ({
      container: {
        backgroundColor: theme.white,
        padding: theme.spacing.md,
        borderRadius: theme.radius.md,
      },
    }));

    function TestComponent() {
      const { styles } = useStyles();

      // This should not produce a type error
      // The original issue was: Type 'ViewStyle | TextStyle | ImageStyle' is not assignable to type 'StyleProp<ViewStyle>'
      return <View style={styles.container} />;
    }

    expect(TestComponent).toBeDefined();
  });

  it('should properly infer TextStyle for Text components', () => {
    const useStyles = createStyles((theme: MantineTheme) => ({
      text: {
        color: theme.colors.dark[0],
        fontSize: theme.fontSizes.md,
        fontWeight: '600',
      },
    }));

    function TestComponent() {
      const { styles } = useStyles();

      // This should not produce a type error
      return <Text style={styles.text}>Hello</Text>;
    }

    expect(TestComponent).toBeDefined();
  });

  it('should properly infer styles with params', () => {
    const useStyles = createStyles(
      (theme: MantineTheme, params: { color: string; size: number }) => ({
        container: {
          backgroundColor: params.color,
          padding: params.size,
          borderRadius: theme.radius.md,
        },
        text: {
          color: theme.colors.dark[0],
          fontSize: theme.fontSizes.md,
        },
      })
    );

    function TestComponent() {
      const { styles } = useStyles({ color: 'red', size: 16 });

      // Both should work without type errors
      return (
        <View style={styles.container}>
          <Text style={styles.text}>Hello</Text>
        </View>
      );
    }

    expect(TestComponent).toBeDefined();
  });

  it('should handle multiple style keys correctly', () => {
    const useStyles = createStyles((theme: MantineTheme) => ({
      root: {
        backgroundColor: theme.white,
        padding: theme.spacing.md,
      },
      inner: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      label: {
        color: theme.colors.dark[0],
        fontSize: theme.fontSizes.sm,
      },
      icon: {
        width: 20,
        height: 20,
      },
    }));

    function TestComponent() {
      const { styles } = useStyles();

      // All styles should be properly typed
      return (
        <View style={styles.root}>
          <View style={styles.inner}>
            <View style={styles.icon} />
            <Text style={styles.label}>Label</Text>
          </View>
        </View>
      );
    }

    expect(TestComponent).toBeDefined();
  });

  it('should work with variations parameter', () => {
    const useStyles = createStyles(
      (
        theme: MantineTheme,
        params: { color: string },
        variations?: { variant?: string; size: string | number }
      ) => {
        const variant = variations?.variant || 'filled';
        const size = variations?.size || 'md';

        return {
          button: {
            backgroundColor: params.color,
            padding: typeof size === 'number' ? size : theme.spacing[size] || theme.spacing.md,
            borderRadius: theme.radius.md,
          },
          text: {
            color: variant === 'filled' ? theme.white : theme.black,
            fontSize: theme.fontSizes.md,
          },
        };
      }
    );

    function TestComponent() {
      const { styles } = useStyles(
        { color: 'blue' },
        { variant: 'outline', size: 'lg' }
      );

      return (
        <View style={styles.button}>
          <Text style={styles.text}>Button</Text>
        </View>
      );
    }

    expect(TestComponent).toBeDefined();
  });
});
