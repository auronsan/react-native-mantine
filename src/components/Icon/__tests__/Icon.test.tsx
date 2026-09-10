import { View } from 'react-native';
import { render as rtlRender } from '@testing-library/react-native';
import { render, screen } from '../../../__tests__/test-utils';
import { Icon } from '../index';
import { ThemeProvider } from '../../../theme/theme-provider';
import { createTheme } from '../../../theme/create-theme';
import * as registry from '../../../adapters/registry';
import { resetAdapterWarnings } from '../../../adapters/context';
import type { AdapterIconProps } from '../../../adapters/types';

const theme = createTheme();

const FakeIcon = ({ name, size, color, style }: AdapterIconProps) => (
  <View testID="fake-icon" accessibilityLabel={`${name}:${size}:${color}`} style={style} />
);

describe('Icon', () => {
  afterEach(() => {
    jest.restoreAllMocks();
    resetAdapterWarnings();
  });

  it('renders through the vector-icons fallback with defaults and passes testID through', () => {
    render(<Icon name="home" testID="icon" />);

    const icon = screen.getByTestId('icon');
    expect(icon).toBeTruthy();
    expect(screen.queryByText('[home]')).toBeNull();
  });

  it('renders the component injected through ThemeProvider adapters', () => {
    rtlRender(
      <ThemeProvider theme={theme} forceMode="light" adapters={{ Icon: FakeIcon }}>
        <Icon name="heart" size={24} color="red" style={{ margin: 1 }} />
      </ThemeProvider>
    );

    const icon = screen.getByTestId('fake-icon');
    expect(icon.props.accessibilityLabel).toBe('heart:24:red');
    expect(icon).toHaveStyle({ margin: 1 });
  });

  it('uses the theme text color when useThemeColor is set', () => {
    rtlRender(
      <ThemeProvider theme={theme} forceMode="light" adapters={{ Icon: FakeIcon }}>
        <Icon name="star" useThemeColor />
      </ThemeProvider>
    );

    expect(screen.getByTestId('fake-icon').props.accessibilityLabel).toBe(
      `star:16:${theme.black}`
    );
  });

  it('falls back to the icon name as text when no implementation is available', () => {
    jest.spyOn(registry, 'getAdapter').mockReturnValue(undefined);
    const warn = jest.spyOn(console, 'warn').mockImplementation(() => {});

    render(<Icon name="cog" size={20} color="blue" style={{ margin: 2 }} testID="icon" />);

    const text = screen.getByText('[cog]');
    expect(text).toHaveStyle({ fontSize: 20, color: 'blue', margin: 2 });
    expect(text.props.allowFontScaling).toBe(false);
    expect(screen.getByTestId('icon')).toBeTruthy();
    expect(warn).toHaveBeenCalled();
  });

  it('falls back with the theme color and font scaling enabled', () => {
    jest.spyOn(registry, 'getAdapter').mockReturnValue(undefined);
    jest.spyOn(console, 'warn').mockImplementation(() => {});

    render(<Icon name="cog" useThemeColor allowFontScaling />);

    const text = screen.getByText('[cog]');
    expect(text).toHaveStyle({ color: theme.black });
    expect(text.props.allowFontScaling).toBe(true);
  });
});
