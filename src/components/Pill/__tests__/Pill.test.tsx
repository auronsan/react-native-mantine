import { Text, View } from 'react-native';
import { render, screen, fireEvent } from '../../../__tests__/test-utils';
import { Pill, PillGroup } from '../index';
import { createTheme } from '../../../theme/create-theme';
import { rem } from '../../../theme/utils/rem';

const theme = createTheme();

describe('Pill', () => {
  it('renders string children with default props', () => {
    render(<Pill testID="pill">React</Pill>);
    expect(screen.getByText('React')).toBeTruthy();
    const pill = screen.getByTestId('pill');
    expect(pill).toHaveStyle({
      height: rem(25),
      borderRadius: theme.fn.radius('xl') as number,
    });
    expect(screen.queryByLabelText('Remove')).toBeNull();
  });

  it('renders number children as text', () => {
    render(<Pill>{42}</Pill>);
    expect(screen.getByText('42')).toBeTruthy();
  });

  it('renders element children as-is', () => {
    render(
      <Pill>
        <View testID="custom-child" />
      </Pill>
    );
    expect(screen.getByTestId('custom-child')).toBeTruthy();
  });

  it.each([
    ['xs', 18],
    ['sm', 22],
    ['md', 25],
    ['lg', 28],
    ['xl', 32],
  ] as const)('applies size %s', (size, height) => {
    render(
      <Pill testID="pill" size={size}>
        Label
      </Pill>
    );
    expect(screen.getByTestId('pill')).toHaveStyle({ height: rem(height) });
  });

  it('falls back to md size for unknown size', () => {
    render(
      <Pill testID="pill" size={'huge' as any}>
        Label
      </Pill>
    );
    expect(screen.getByTestId('pill')).toHaveStyle({ height: rem(25) });
  });

  it('applies radius', () => {
    render(
      <Pill testID="pill" radius="sm">
        Label
      </Pill>
    );
    expect(screen.getByTestId('pill')).toHaveStyle({
      borderRadius: theme.fn.radius('sm') as number,
    });
  });

  it('applies disabled styles', () => {
    render(
      <Pill testID="pill" disabled>
        Label
      </Pill>
    );
    expect(screen.getByTestId('pill')).toHaveStyle({ opacity: 0.6 });
  });

  it('applies custom style and textStyle', () => {
    render(
      <Pill testID="pill" style={{ margin: 2 }} textStyle={{ color: 'red' }}>
        Label
      </Pill>
    );
    expect(screen.getByTestId('pill')).toHaveStyle({ margin: 2 });
    expect(screen.getByText('Label')).toHaveStyle({ color: 'red' });
  });

  it('renders remove button and calls onRemove', () => {
    const onRemove = jest.fn();
    render(
      <Pill withRemoveButton onRemove={onRemove}>
        Label
      </Pill>
    );
    const remove = screen.getByLabelText('Remove');
    expect(remove.props.accessibilityRole).toBe('button');
    expect(screen.getByText('×')).toBeTruthy();
    fireEvent.press(remove);
    expect(onRemove).toHaveBeenCalledTimes(1);
  });

  it('does not call onRemove when disabled', () => {
    const onRemove = jest.fn();
    render(
      <Pill withRemoveButton onRemove={onRemove} disabled>
        Label
      </Pill>
    );
    const remove = screen.getByLabelText('Remove');
    expect(remove).toBeDisabled();
    fireEvent.press(remove);
    expect(onRemove).not.toHaveBeenCalled();
  });

  it('passes removeButtonProps to the remove button', () => {
    render(
      <Pill
        withRemoveButton
        removeButtonProps={{ testID: 'remove', accessibilityLabel: 'Delete' }}
      >
        Label
      </Pill>
    );
    expect(screen.getByTestId('remove').props.accessibilityLabel).toBe(
      'Delete'
    );
  });

  it('passes accessibility props through', () => {
    render(
      <Pill testID="pill" accessibilityLabel="Tag React">
        React
      </Pill>
    );
    expect(screen.getByLabelText('Tag React')).toBeTruthy();
  });
});

describe('Pill.Group', () => {
  it('exposes PillGroup as Pill.Group', () => {
    expect(Pill.Group).toBe(PillGroup);
  });

  it('renders children', () => {
    render(
      <Pill.Group testID="group">
        <Pill>One</Pill>
        <Pill>Two</Pill>
      </Pill.Group>
    );
    expect(screen.getByTestId('group')).toHaveStyle({
      flexDirection: 'row',
      gap: theme.spacing.xs / 2,
    });
    expect(screen.getByText('One')).toBeTruthy();
    expect(screen.getByText('Two')).toBeTruthy();
  });

  it('passes size and disabled to Pill children', () => {
    const onRemove = jest.fn();
    render(
      <Pill.Group size="xl" disabled>
        <Pill testID="a" withRemoveButton onRemove={onRemove}>
          A
        </Pill>
        <Pill testID="b" size="xs" disabled={false}>
          B
        </Pill>
        <Text>Not a pill</Text>
      </Pill.Group>
    );
    expect(screen.getByTestId('a')).toHaveStyle({
      height: rem(32),
      opacity: 0.6,
    });
    fireEvent.press(screen.getByLabelText('Remove'));
    expect(onRemove).not.toHaveBeenCalled();

    // child's own props win over group props
    expect(screen.getByTestId('b')).toHaveStyle({ height: rem(18) });
    expect(screen.getByTestId('b')).not.toHaveStyle({ opacity: 0.6 });
    expect(screen.getByText('Not a pill')).toBeTruthy();
  });

  it('supports numeric and theme gap', () => {
    render(<Pill.Group testID="group" gap={12} />);
    expect(screen.getByTestId('group')).toHaveStyle({ gap: 12 });

    render(<Pill.Group testID="group-lg" gap="lg" />);
    expect(screen.getByTestId('group-lg')).toHaveStyle({
      gap: theme.spacing.lg / 2,
    });

    render(<Pill.Group testID="group-unknown" gap={'nope' as any} />);
    expect(screen.getByTestId('group-unknown')).toHaveStyle({
      gap: theme.spacing.xs / 2,
    });
  });

  it('merges custom style', () => {
    render(<Pill.Group testID="group" style={{ padding: 4 }} />);
    expect(screen.getByTestId('group')).toHaveStyle({ padding: 4 });
  });
});
