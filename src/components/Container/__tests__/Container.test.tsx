import { Dimensions, Text as RNText } from 'react-native';
import { render, screen } from '../../../__tests__/test-utils';
import { Container } from '../index';
import { createTheme } from '../../../theme/create-theme';

const theme = createTheme();
const screenWidth = Dimensions.get('window').width;

describe('Container', () => {
  it('renders children with md max width and md padding by default', () => {
    render(
      <Container testID="container">
        <RNText>Content</RNText>
      </Container>
    );

    expect(screen.getByText('Content')).toBeTruthy();
    expect(screen.getByTestId('container')).toHaveStyle({
      maxWidth: Math.min(960, screenWidth),
      width: '100%',
      paddingHorizontal: theme.spacing.md,
    });
  });

  it('supports every named size, a numeric size and an unknown size', () => {
    const expected = { xs: 540, sm: 720, md: 960, lg: 1140, xl: 1320 };
    (Object.keys(expected) as Array<keyof typeof expected>).forEach((size) => {
      const { unmount } = render(<Container size={size} testID={size} />);
      expect(screen.getByTestId(size)).toHaveStyle({
        maxWidth: Math.min(expected[size], screenWidth),
      });
      unmount();
    });

    render(<Container size={300} testID="numeric" />);
    expect(screen.getByTestId('numeric')).toHaveStyle({ maxWidth: 300 });

    render(<Container size={'huge' as any} testID="unknown" />);
    expect(screen.getByTestId('unknown')).toHaveStyle({
      maxWidth: Math.min(960, screenWidth),
    });
  });

  it('takes the full width when fluid', () => {
    render(<Container fluid testID="container" />);
    expect(screen.getByTestId('container')).toHaveStyle({ maxWidth: '100%' });
  });

  it('resolves px and py from theme keys or numbers', () => {
    const { rerender } = render(<Container px="xl" py="sm" testID="container" />);
    expect(screen.getByTestId('container')).toHaveStyle({
      paddingHorizontal: theme.spacing.xl,
      paddingVertical: theme.spacing.sm,
    });

    rerender(<Container px={3} py={7} testID="container" />);
    expect(screen.getByTestId('container')).toHaveStyle({
      paddingHorizontal: 3,
      paddingVertical: 7,
    });

    rerender(<Container px={'nope' as any} testID="container" />);
    expect(screen.getByTestId('container')).toHaveStyle({ paddingHorizontal: 0 });
  });

  it('merges custom style', () => {
    render(<Container style={{ marginTop: 5 }} testID="container" />);
    expect(screen.getByTestId('container')).toHaveStyle({ marginTop: 5 });
  });
});
