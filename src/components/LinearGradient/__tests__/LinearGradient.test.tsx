import { Platform, Text as RNText, View } from 'react-native';
import { render as rtlRender } from '@testing-library/react-native';
import { render, screen } from '../../../__tests__/test-utils';
import { PlatformLinearGradient } from '../index';
import { ThemeProvider } from '../../../theme/theme-provider';
import { createTheme } from '../../../theme/create-theme';
import * as registry from '../../../adapters/registry';
import { resetAdapterWarnings } from '../../../adapters/context';
import type { AdapterLinearGradientProps } from '../../../adapters/types';

const theme = createTheme();
const { LinearGradient } = require('expo-linear-gradient');

const FakeGradient = ({ colors, children }: AdapterLinearGradientProps) => (
  <View testID="fake-gradient" accessibilityLabel={colors.join(',')}>
    {children}
  </View>
);

function wrapperStyleOf(testID: string) {
  return screen.getByTestId(testID).parent?.parent?.props.style;
}

describe('PlatformLinearGradient', () => {
  afterEach(() => {
    jest.restoreAllMocks();
    resetAdapterWarnings();
  });

  it('renders the expo-linear-gradient fallback on native with defaults', () => {
    render(
      <PlatformLinearGradient colors={['#000', '#fff']} style={{ height: 5 }}>
        <RNText>Inside</RNText>
      </PlatformLinearGradient>
    );

    expect(screen.getByText('Inside')).toBeTruthy();
    const gradient = screen.UNSAFE_getByType(LinearGradient);
    expect(gradient.props.colors).toEqual(['#000', '#fff']);
    expect(gradient.props.start).toEqual({ x: 0, y: 0 });
    expect(gradient.props.end).toEqual({ x: 1, y: 1 });
    expect(gradient.props.style).toEqual({ height: 5 });
  });

  it('uses the component injected through ThemeProvider adapters', () => {
    rtlRender(
      <ThemeProvider
        theme={theme}
        forceMode="light"
        adapters={{ LinearGradient: FakeGradient }}
      >
        <PlatformLinearGradient colors={['red', 'blue']}>
          <RNText>Child</RNText>
        </PlatformLinearGradient>
      </ThemeProvider>
    );

    expect(screen.getByTestId('fake-gradient').props.accessibilityLabel).toBe('red,blue');
    expect(screen.getByText('Child')).toBeTruthy();
  });

  it('falls back to a solid color when no gradient implementation exists', () => {
    jest.spyOn(registry, 'getAdapter').mockReturnValue(undefined);
    const warn = jest.spyOn(console, 'warn').mockImplementation(() => {});

    render(
      <PlatformLinearGradient colors={['#123456', '#fff']} style={{ height: 7 }}>
        <View testID="child" />
      </PlatformLinearGradient>
    );

    expect(wrapperStyleOf('child')).toEqual({ height: 7, backgroundColor: '#123456' });
    expect(warn).toHaveBeenCalled();
  });

  it('renders a CSS gradient on web with the computed angle', () => {
    jest.replaceProperty(Platform, 'OS', 'web' as any);

    const { rerender } = render(
      <PlatformLinearGradient colors={['#000', '#fff']} style={{ height: 3 }}>
        <View testID="child" />
      </PlatformLinearGradient>
    );
    expect(wrapperStyleOf('child')).toEqual({
      height: 3,
      backgroundImage: 'linear-gradient(135deg, #000, #fff)',
    });

    rerender(
      <PlatformLinearGradient
        colors={['#000', '#fff']}
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 0.5 }}
      >
        <View testID="child" />
      </PlatformLinearGradient>
    );
    expect(wrapperStyleOf('child').backgroundImage).toBe(
      'linear-gradient(90deg, #000, #fff)'
    );

    rerender(
      <PlatformLinearGradient
        colors={['#000', '#fff']}
        start={{ x: 1, y: 0.5 }}
        end={{ x: 0, y: 0.5 }}
      >
        <View testID="child" />
      </PlatformLinearGradient>
    );
    expect(wrapperStyleOf('child').backgroundImage).toBe(
      'linear-gradient(270deg, #000, #fff)'
    );
  });
});
