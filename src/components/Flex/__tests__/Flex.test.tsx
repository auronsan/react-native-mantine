import { Text as RNText } from 'react-native';
import { render, screen } from '../../../__tests__/test-utils';
import { Flex } from '../index';
import { createTheme } from '../../../theme/create-theme';

const theme = createTheme();

describe('Flex', () => {
  it('renders children in a row without wrapping by default and passes testID through', () => {
    render(
      <Flex testID="flex">
        <RNText>Child</RNText>
      </Flex>
    );

    expect(screen.getByText('Child')).toBeTruthy();
    const flex = screen.getByTestId('flex');
    expect(flex).toHaveStyle({ display: 'flex', flexDirection: 'row', flexWrap: 'nowrap' });
    const flat = flex.props.style.flat();
    expect(flat.some((s: any) => s && 'gap' in s)).toBe(false);
  });

  it('applies direction, wrap, align and justify', () => {
    render(
      <Flex direction="column" wrap="wrap" align="center" justify="space-between" testID="flex" />
    );

    expect(screen.getByTestId('flex')).toHaveStyle({
      flexDirection: 'column',
      flexWrap: 'wrap',
      alignItems: 'center',
      justifyContent: 'space-between',
    });
  });

  it('resolves gaps from theme keys, numbers and unknown keys', () => {
    const { rerender } = render(
      <Flex gap="md" columnGap="xs" rowGap="xl" testID="flex" />
    );
    expect(screen.getByTestId('flex')).toHaveStyle({
      gap: theme.spacing.md,
      columnGap: theme.spacing.xs,
      rowGap: theme.spacing.xl,
    });

    rerender(<Flex gap={4} columnGap={5} rowGap={6} testID="flex" />);
    expect(screen.getByTestId('flex')).toHaveStyle({ gap: 4, columnGap: 5, rowGap: 6 });

    rerender(<Flex gap={'nope' as any} testID="flex" />);
    expect(screen.getByTestId('flex')).toHaveStyle({ gap: 0 });
  });

  it('merges custom style', () => {
    render(<Flex style={{ padding: 3 }} testID="flex" />);
    expect(screen.getByTestId('flex')).toHaveStyle({ padding: 3 });
  });
});
