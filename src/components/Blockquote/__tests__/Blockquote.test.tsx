import { Text as RNText, View } from 'react-native';
import { render as rtlRender } from '@testing-library/react-native';
import { render, screen } from '../../../__tests__/test-utils';
import { Blockquote } from '../index';
import { ThemeProvider } from '../../../theme/theme-provider';
import { createTheme } from '../../../theme/create-theme';

const theme = createTheme();

describe('Blockquote in dark mode and with theme defaults', () => {
  it('uses dark color scheme colors', () => {
    rtlRender(
      <ThemeProvider theme={theme} forceMode="dark">
        <Blockquote cite="dark cite">Dark quote</Blockquote>
      </ThemeProvider>
    );

    expect(screen.getByText('Dark quote')).toHaveStyle({ color: theme.colors.dark![0] });
    expect(screen.getByText('dark cite')).toHaveStyle({ color: theme.colors.dark![2] });
  });

  it('falls back to its own defaults when theme defaultProps are null', () => {
    const customTheme = createTheme({
      components: { Blockquote: { defaultProps: { color: null, radius: null } } },
    } as any);
    rtlRender(
      <ThemeProvider theme={customTheme} forceMode="light">
        <Blockquote>Themed</Blockquote>
      </ThemeProvider>
    );
    expect(screen.getByText('Themed')).toBeTruthy();
  });
});

describe('Blockquote', () => {
  it('renders quote text with default styles', () => {
    render(<Blockquote>Life is like an npm install</Blockquote>);

    const content = screen.getByText('Life is like an npm install');
    expect(content).toBeTruthy();
    // lineHeight must be applied as an absolute style (24px), not handed to
    // Text as its unitless `lineHeight` multiplier prop
    expect(content).toHaveStyle({ color: theme.black, fontSize: 16, lineHeight: 24 });
    expect(content.props.lineHeight).toBeUndefined();
  });

  it('forwards testID and accessibility props to the root without leaking theme values', () => {
    render(
      <Blockquote testID="quote" accessibilityLabel="A quote" accessibilityHint="Hint">
        Forwarded
      </Blockquote>
    );

    const root = screen.getByTestId('quote');
    expect(root.props.accessibilityLabel).toBe('A quote');
    expect(root.props.accessibilityHint).toBe('Hint');
    // nothing from useStyles() (theme, classes, ...) must end up on the View
    expect(root.props.theme).toBeUndefined();
    expect(root.props.colors).toBeUndefined();
    expect(root.props.fn).toBeUndefined();
    expect(root.props.classes).toBeUndefined();
    expect(root.props.cx).toBeUndefined();
  });

  it('renders cite and icon', () => {
    render(
      <Blockquote cite="– Someone" icon={<View testID="quote-icon" />}>
        Quote
      </Blockquote>
    );

    expect(screen.getByText('– Someone')).toBeTruthy();
    expect(screen.getByTestId('quote-icon')).toBeTruthy();
  });

  it('does not render cite when omitted', () => {
    render(<Blockquote>Only quote</Blockquote>);
    expect(screen.queryByText('–')).toBeNull();
  });

  it('applies color and radius props', () => {
    const { rerender } = render(<Blockquote color="red">Red</Blockquote>);
    expect(screen.getByText('Red')).toBeTruthy();

    rerender(
      <Blockquote color="green" radius={10}>
        Green
      </Blockquote>
    );
    expect(screen.getByText('Green')).toBeTruthy();
  });

  it('renders raw nodes when withTextWrapper is false', () => {
    render(
      <Blockquote withTextWrapper={false} cite={<RNText>Node cite</RNText>}>
        <RNText>Node quote</RNText>
      </Blockquote>
    );

    expect(screen.getByText('Node quote')).toBeTruthy();
    expect(screen.getByText('Node cite')).toBeTruthy();
  });

  it('accepts a custom style without crashing', () => {
    render(<Blockquote style={{ margin: 4 }}>Styled</Blockquote>);
    expect(screen.getByText('Styled')).toBeTruthy();
  });
});
