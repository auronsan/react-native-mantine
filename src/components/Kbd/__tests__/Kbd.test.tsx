import { Text as RNText } from 'react-native';
import { render as rtlRender } from '@testing-library/react-native';
import { render, screen } from '../../../__tests__/test-utils';
import { Kbd } from '../index';
import { ThemeProvider } from '../../../theme/theme-provider';
import { createTheme } from '../../../theme/create-theme';

const theme = createTheme();

describe('Kbd in dark mode and with theme defaults', () => {
  it('uses dark color scheme colors', () => {
    rtlRender(
      <ThemeProvider theme={theme} forceMode="dark">
        <Kbd testID="kbd">Esc</Kbd>
      </ThemeProvider>
    );

    expect(screen.getByTestId('kbd')).toHaveStyle({
      backgroundColor: theme.colors.dark![5],
      borderColor: theme.colors.dark![4],
    });
  });

  it('falls back to md when the theme default size is null', () => {
    const customTheme = createTheme({
      components: { Kbd: { defaultProps: { size: null } } },
    } as any);
    rtlRender(
      <ThemeProvider theme={customTheme} forceMode="light">
        <Kbd testID="kbd">Tab</Kbd>
      </ThemeProvider>
    );

    expect(screen.getByTestId('kbd')).toHaveStyle({ minWidth: 20 });
  });
});

describe('Kbd', () => {
  it('renders the key label with default styles and passes testID through', () => {
    render(<Kbd testID="kbd">Ctrl</Kbd>);

    const label = screen.getByText('Ctrl');
    expect(label).toHaveStyle({
      fontWeight: '700',
      fontFamily: theme.fontFamilyMonospace,
      fontSize: 12,
      color: theme.colors.gray![7],
    });
    // style keys must not be spread as Text props
    expect(label.props.fontWeight).toBeUndefined();
    expect(label.props.fontFamily).toBeUndefined();
    expect(screen.getByTestId('kbd')).toHaveStyle({
      borderWidth: 1,
      borderBottomWidth: 2,
      backgroundColor: theme.colors.gray![0],
      borderRadius: theme.radius.sm,
    });
  });

  it('renders every size and an unknown size', () => {
    (['xs', 'sm', 'md', 'lg', 'xl'] as const).forEach((size) => {
      const { unmount } = render(
        <Kbd size={size} testID={size}>
          {size}
        </Kbd>
      );
      expect(screen.getByTestId(size)).toBeTruthy();
      expect(screen.getByText(size)).toBeTruthy();
      unmount();
    });

    render(
      <Kbd size={'giant' as any} testID="unknown">
        ?
      </Kbd>
    );
    expect(screen.getByTestId('unknown')).toHaveStyle({ minWidth: 20 });
  });

  it('renders raw children when withTextWrapper is false', () => {
    render(
      <Kbd withTextWrapper={false}>
        <RNText>Raw</RNText>
      </Kbd>
    );
    expect(screen.getByText('Raw')).toBeTruthy();
  });

  it('merges custom style', () => {
    render(
      <Kbd style={{ margin: 2 }} testID="kbd">
        K
      </Kbd>
    );
    expect(screen.getByTestId('kbd')).toHaveStyle({ margin: 2 });
  });
});
