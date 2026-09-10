import { Text as RNText } from 'react-native';
import { render, screen } from '../../../__tests__/test-utils';
import { Code } from '../index';
import { createTheme } from '../../../theme/create-theme';

const theme = createTheme();

describe('Code', () => {
  it('renders inline code with monospace font and testID', () => {
    render(<Code testID="code">npm install</Code>);

    const code = screen.getByTestId('code');
    expect(screen.getByText('npm install')).toBeTruthy();
    expect(code).toHaveStyle({
      fontFamily: 'Courier',
      paddingHorizontal: 4,
      paddingVertical: 2,
      backgroundColor: theme.colors.gray![0],
    });
  });

  it('renders a code block', () => {
    render(
      <Code block testID="block">
        const a = 1;
      </Code>
    );

    const block = screen.getByTestId('block');
    expect(block).toHaveStyle({ padding: 16, backgroundColor: theme.colors.gray![0] });
    expect(screen.getByText('const a = 1;')).toHaveStyle({ fontFamily: 'Courier' });
  });

  it('applies a theme color to the text', () => {
    const { rerender } = render(
      <Code color="red" testID="code">
        red
      </Code>
    );
    expect(screen.getByTestId('code')).toHaveStyle({ color: theme.colors.red![6] });

    rerender(
      <Code color="blue" block testID="block">
        blue block
      </Code>
    );
    expect(screen.getByText('blue block')).toHaveStyle({
      color: theme.colors.blue![6],
    });
  });

  it('returns raw children inline when withTextWrapper is false', () => {
    render(
      <Code withTextWrapper={false} testID="code">
        <RNText>raw</RNText>
      </Code>
    );

    expect(screen.getByText('raw')).toBeTruthy();
    expect(screen.queryByTestId('code')).toBeNull();
  });

  it('renders raw children inside a block when withTextWrapper is false', () => {
    render(
      <Code block withTextWrapper={false} testID="block">
        <RNText>raw block</RNText>
      </Code>
    );

    expect(screen.getByText('raw block')).toBeTruthy();
    expect(screen.getByTestId('block')).toBeTruthy();
  });

  it('merges custom style', () => {
    render(
      <Code style={{ marginTop: 3 }} testID="code">
        styled
      </Code>
    );
    expect(screen.getByTestId('code')).toHaveStyle({ marginTop: 3 });
  });
});
