import { Text, StyleSheet } from 'react-native';
import { render as rtlRender } from '@testing-library/react-native';
import { render, screen } from '../../../__tests__/test-utils';
import { Paper } from '../index';
import { createTheme } from '../../../theme/create-theme';
import { ThemeProvider } from '../../../theme/theme-provider';
import { rem } from '../../../theme/utils/rem';

const theme = createTheme();

const getRoot = () => screen.root;

describe('Paper', () => {
  it('forwards testID, accessibility props and other pass-through props', () => {
    render(
      <Paper
        testID="paper"
        accessibilityLabel="Card"
        accessibilityRole="summary"
        accessible
      >
        <Text>Content</Text>
      </Paper>
    );
    const paper = screen.getByTestId('paper');
    expect(paper).toBe(getRoot());
    expect(screen.getByLabelText('Card')).toBe(paper);
    expect(paper.props.accessibilityRole).toBe('summary');
    expect(paper.props.accessible).toBe(true);
    expect(paper).toHaveStyle({ backgroundColor: theme.white });
  });

  it('renders children with default props', () => {
    render(
      <Paper testID="paper">
        <Text>Content</Text>
      </Paper>
    );
    expect(screen.getByText('Content')).toBeTruthy();
    const paper = getRoot();
    expect(paper).toHaveStyle({
      backgroundColor: theme.white,
      borderRadius: theme.fn.radius('sm'),
    });
    expect(paper).not.toHaveStyle({ borderWidth: 1 });
  });

  it('applies withBorder styles', () => {
    render(<Paper testID="paper" withBorder />);
    expect(getRoot()).toHaveStyle({
      borderWidth: 1,
      borderColor: (theme.colors.gray || [])[3],
    });
  });

  it('applies shadow from theme', () => {
    render(<Paper testID="paper" shadow="md" />);
    const flat = StyleSheet.flatten(getRoot().props.style);
    expect(flat).toMatchObject(theme.fn.shadow('md'));
  });

  it.each(['xs', 'sm', 'md', 'lg', 'xl'] as const)(
    'applies radius %s',
    (radius) => {
      render(<Paper testID="paper" radius={radius} />);
      expect(getRoot()).toHaveStyle({
        borderRadius: theme.fn.radius(radius),
      });
    }
  );

  it('applies numeric radius', () => {
    render(<Paper testID="paper" radius={12} />);
    expect(getRoot()).toHaveStyle({
      borderRadius: theme.fn.radius(12),
    });
  });

  it('applies numeric padding', () => {
    render(<Paper testID="paper" p={16} />);
    expect(getRoot()).toHaveStyle({ padding: rem(16) });
  });

  it('applies theme spacing padding', () => {
    render(<Paper testID="paper" p="lg" />);
    expect(getRoot()).toHaveStyle({
      padding: theme.spacing.lg,
    });
  });

  it('falls back to md spacing for unknown spacing keys', () => {
    render(<Paper testID="paper" p={'unknown' as any} />);
    expect(getRoot()).toHaveStyle({
      padding: theme.spacing.md,
    });
  });

  it('uses the default padding of 0 when p is undefined', () => {
    render(<Paper testID="paper" p={undefined} />);
    expect(getRoot()).toHaveStyle({ padding: rem(0) });
  });

  it('merges custom style', () => {
    render(<Paper testID="paper" style={{ margin: 5 }} />);
    expect(getRoot()).toHaveStyle({ margin: 5 });
  });

  it('uses dark colors in dark color scheme', () => {
    rtlRender(
      <ThemeProvider theme={theme} forceMode="dark">
        <Paper withBorder />
      </ThemeProvider>
    );
    expect(getRoot()).toHaveStyle({
      backgroundColor: (theme.colors.dark || [])[6],
      borderColor: (theme.colors.dark || [])[4],
    });
  });

  it('renders without children', () => {
    render(<Paper />);
    expect(getRoot()).toBeTruthy();
    expect(getRoot().children).toHaveLength(0);
  });
});
