import React from 'react';
import { Text, View } from 'react-native';
import { render as rtlRender } from '@testing-library/react-native';
import { render, screen } from '../../../__tests__/test-utils';
import { ThemeProvider } from '../../../theme/theme-provider';
import { createTheme } from '../../../theme/create-theme';
import * as adapterContext from '../../../adapters/context';
import { ThemeIcon } from '../index';

const theme = createTheme();

const icon = <Text>i</Text>;

describe('ThemeIcon', () => {
  it('renders children with default props (filled, md, sm radius)', () => {
    render(<ThemeIcon testID="icon">{icon}</ThemeIcon>);
    const el = screen.getByTestId('icon');
    expect(el).toBeTruthy();
    expect(screen.getByText('i')).toBeTruthy();
    expect(el).toHaveStyle({
      width: 26,
      height: 26,
      justifyContent: 'center',
      alignItems: 'center',
      overflow: 'hidden',
    });
    expect(el).toHaveStyle({
      backgroundColor: theme.fn.variant({ variant: 'filled', color: 'blue' })
        .background,
    });
  });

  it.each([
    ['xs', 16],
    ['sm', 20],
    ['md', 26],
    ['lg', 32],
    ['xl', 40],
  ] as const)('applies size %s', (size, px) => {
    render(
      <ThemeIcon testID="icon" size={size}>
        {icon}
      </ThemeIcon>
    );
    expect(screen.getByTestId('icon')).toHaveStyle({ width: px, height: px });
  });

  it('applies numeric size', () => {
    render(
      <ThemeIcon testID="icon" size={48}>
        {icon}
      </ThemeIcon>
    );
    expect(screen.getByTestId('icon')).toHaveStyle({ width: 48, height: 48 });
  });

  it.each(['xs', 'sm', 'md', 'lg', 'xl'] as const)(
    'applies radius %s',
    (radius) => {
      render(
        <ThemeIcon testID="icon" radius={radius}>
          {icon}
        </ThemeIcon>
      );
      expect(screen.getByTestId('icon')).toHaveStyle({
        borderRadius: theme.fn.radius(radius),
      });
    }
  );

  it('applies numeric radius', () => {
    render(
      <ThemeIcon testID="icon" radius={11}>
        {icon}
      </ThemeIcon>
    );
    expect(screen.getByTestId('icon')).toHaveStyle({ borderRadius: 11 });
  });

  it('applies filled variant with a custom color', () => {
    render(
      <ThemeIcon testID="icon" variant="filled" color="red">
        {icon}
      </ThemeIcon>
    );
    expect(screen.getByTestId('icon')).toHaveStyle({
      backgroundColor: theme.fn.variant({ variant: 'filled', color: 'red' })
        .background,
    });
  });

  it('applies light variant', () => {
    render(
      <ThemeIcon testID="icon" variant="light" color="teal">
        {icon}
      </ThemeIcon>
    );
    expect(screen.getByTestId('icon')).toHaveStyle({
      backgroundColor: theme.fn.variant({ variant: 'light', color: 'teal' })
        .background,
    });
  });

  it('applies outline variant with border', () => {
    render(
      <ThemeIcon testID="icon" variant="outline" color="grape">
        {icon}
      </ThemeIcon>
    );
    const styles = theme.fn.variant({ variant: 'outline', color: 'grape' });
    expect(screen.getByTestId('icon')).toHaveStyle({
      backgroundColor: styles.background,
      borderWidth: 1,
      borderColor: styles.border,
    });
  });

  it('falls back to filled styles for unknown variants', () => {
    render(
      <ThemeIcon testID="icon" variant={'subtle' as any} color="blue">
        {icon}
      </ThemeIcon>
    );
    expect(screen.getByTestId('icon')).toHaveStyle({
      backgroundColor: theme.fn.variant({ variant: 'filled', color: 'blue' })
        .background,
    });
  });

  it('falls back to primary color when color is not in theme', () => {
    render(
      <ThemeIcon testID="icon" color={'not-a-color' as any}>
        {icon}
      </ThemeIcon>
    );
    expect(screen.getByTestId('icon')).toHaveStyle({
      backgroundColor: theme.fn.variant({
        variant: 'filled',
        color: theme.primaryColor,
      }).background,
    });
  });

  it('renders gradient variant through the LinearGradient adapter', () => {
    const FakeGradient = (props: any) => (
      <View testID="fake-gradient" {...props} />
    );
    const { getByTestId, getByText } = rtlRender(
      <ThemeProvider
        theme={theme}
        forceMode="light"
        adapters={{ LinearGradient: FakeGradient }}
      >
        <ThemeIcon
          testID="icon"
          variant="gradient"
          gradient={{ from: 'red', to: 'orange', deg: 90 }}
        >
          {icon}
        </ThemeIcon>
      </ThemeProvider>
    );
    expect(getByTestId('icon')).toHaveStyle({ backgroundColor: 'transparent' });
    const gradient = getByTestId('fake-gradient');
    expect(gradient.props.colors).toEqual([
      theme.fn.themeColor('red'),
      theme.fn.themeColor('orange'),
    ]);
    expect(gradient.props.start).toEqual({ x: 0, y: 0 });
    expect(gradient.props.end).toEqual({ x: 1, y: 1 });
    expect(gradient).toHaveStyle({ width: '100%', height: '100%' });
    expect(getByText('i')).toBeTruthy();
  });

  it('renders gradient variant with the bundled expo-linear-gradient mock', () => {
    render(
      <ThemeIcon testID="icon" variant="gradient">
        {icon}
      </ThemeIcon>
    );
    expect(screen.getByTestId('icon')).toHaveStyle({
      backgroundColor: 'transparent',
    });
    expect(screen.getByText('i')).toBeTruthy();
  });

  it('uses default gradient colors when gradient has no from/to', () => {
    const FakeGradient = (props: any) => (
      <View testID="fake-gradient" {...props} />
    );
    const { getByTestId } = rtlRender(
      <ThemeProvider
        theme={theme}
        forceMode="light"
        adapters={{ LinearGradient: FakeGradient }}
      >
        <ThemeIcon variant="gradient" gradient={{} as any}>
          {icon}
        </ThemeIcon>
      </ThemeProvider>
    );
    expect(getByTestId('fake-gradient').props.colors).toEqual([
      theme.fn.themeColor('blue'),
      theme.fn.themeColor('cyan'),
    ]);
  });

  it('falls back to a solid color when no LinearGradient adapter exists', () => {
    const spy = jest
      .spyOn(adapterContext, 'useAdapter')
      .mockReturnValue(undefined);
    try {
      render(
        <ThemeIcon
          testID="icon"
          variant="gradient"
          gradient={{ from: 'red', to: 'orange', deg: 45 }}
        >
          {icon}
        </ThemeIcon>
      );
      expect(screen.getByTestId('icon')).toHaveStyle({
        backgroundColor: theme.fn.themeColor('red'),
      });
      expect(screen.queryByTestId('fake-gradient')).toBeNull();
    } finally {
      spy.mockRestore();
    }
  });

  it('merges custom style', () => {
    render(
      <ThemeIcon testID="icon" style={{ margin: 4 }}>
        {icon}
      </ThemeIcon>
    );
    expect(screen.getByTestId('icon')).toHaveStyle({ margin: 4, width: 26 });
  });

  it('accepts a ref and passes accessibility props', () => {
    const ref = React.createRef<View>();
    render(
      <ThemeIcon ref={ref} testID="icon" accessibilityLabel="Star icon">
        {icon}
      </ThemeIcon>
    );
    expect(screen.getByLabelText('Star icon')).toBeTruthy();
  });

  it('has displayName', () => {
    expect(ThemeIcon.displayName).toBe('ThemeIcon');
  });
});
