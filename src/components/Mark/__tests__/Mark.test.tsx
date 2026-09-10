import { Text } from 'react-native';
import { render, screen } from '../../../__tests__/test-utils';
import { Mark } from '../index';
import { createTheme } from '../../../theme/create-theme';
import { ThemeProvider } from '../../../theme/theme-provider';

const theme = createTheme();

describe('Mark', () => {
  it('renders children text', () => {
    render(<Mark>Highlighted</Mark>);
    expect(screen.getByText('Highlighted')).toBeTruthy();
  });

  it('uses yellow theme color by default', () => {
    render(<Mark testID="mark">Default</Mark>);
    expect(screen.getByTestId('mark')).toHaveStyle({
      backgroundColor: theme.colors.yellow![2],
      paddingHorizontal: 4,
      paddingVertical: 2,
    });
  });

  it('resolves theme color keys to the light shade', () => {
    render(
      <Mark color="blue" testID="mark">
        Blue
      </Mark>
    );
    expect(screen.getByTestId('mark')).toHaveStyle({
      backgroundColor: theme.colors.blue![2],
    });
  });

  it('uses color value directly when it is not a theme key', () => {
    render(
      <Mark color="#abcdef" testID="mark">
        Custom
      </Mark>
    );
    expect(screen.getByTestId('mark')).toHaveStyle({
      backgroundColor: '#abcdef',
    });
  });

  it('falls back to the first shade when the theme color has no index 2', () => {
    const shortTheme = createTheme({
      colors: { mono: ['#111111'] as any },
    });
    render(
      <ThemeProvider theme={shortTheme} forceMode="light">
        <Mark color="mono" testID="mark">
          Mono
        </Mark>
      </ThemeProvider>
    );
    expect(screen.getByTestId('mark')).toHaveStyle({
      backgroundColor: '#111111',
    });
  });

  it('merges custom style', () => {
    render(
      <Mark style={{ fontSize: 30 }} testID="mark">
        Styled
      </Mark>
    );
    expect(screen.getByTestId('mark')).toHaveStyle({
      fontSize: 30,
      paddingHorizontal: 4,
    });
  });

  it('passes through Text props', () => {
    render(
      <Mark testID="mark" numberOfLines={2} accessibilityLabel="Marked text">
        Props
      </Mark>
    );
    const mark = screen.getByTestId('mark');
    expect(mark.props.numberOfLines).toBe(2);
    expect(screen.getByLabelText('Marked text')).toBeTruthy();
  });

  it('renders children without a Text wrapper when withTextWrapper is false', () => {
    render(
      <Mark withTextWrapper={false} testID="mark">
        <Text testID="inner">Raw</Text>
      </Mark>
    );
    expect(screen.queryByTestId('mark')).toBeNull();
    expect(screen.getByTestId('inner')).toBeTruthy();
    expect(screen.getByText('Raw')).toBeTruthy();
  });

  it('has a displayName', () => {
    expect(Mark.displayName).toBe('Mark');
  });
});
