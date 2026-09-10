import { render, screen, fireEvent } from '../../../__tests__/test-utils';
import { Burger } from '../index';

describe('Burger', () => {
  it('renders closed state with default accessibility label and testID', () => {
    render(<Burger opened={false} testID="burger" />);

    const burger = screen.getByTestId('burger');
    expect(burger).toBeTruthy();
    expect(burger.props.accessibilityRole).toBe('button');
    expect(screen.getByLabelText('Open navigation')).toBeTruthy();
  });

  it('uses the close label when opened and supports a custom label', () => {
    const { rerender } = render(<Burger opened />);
    expect(screen.getByLabelText('Close navigation')).toBeTruthy();

    rerender(<Burger opened accessibilityLabel="Toggle menu" />);
    expect(screen.getByLabelText('Toggle menu')).toBeTruthy();
  });

  it('calls onPress when pressed', () => {
    const onPress = jest.fn();
    render(<Burger opened={false} onPress={onPress} testID="burger" />);

    fireEvent.press(screen.getByTestId('burger'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('animates when the opened prop changes', () => {
    const { rerender } = render(<Burger opened={false} testID="burger" />);
    rerender(<Burger opened testID="burger" transitionDuration={10} />);
    expect(screen.getByLabelText('Close navigation')).toBeTruthy();

    rerender(<Burger opened={false} testID="burger" transitionDuration={10} />);
    expect(screen.getByLabelText('Open navigation')).toBeTruthy();
  });

  it('renders every named size, a numeric size and an unknown size', () => {
    (['xs', 'sm', 'md', 'lg', 'xl'] as const).forEach((size) => {
      const { unmount } = render(<Burger opened={false} size={size} testID={size} />);
      expect(screen.getByTestId(size)).toBeTruthy();
      unmount();
    });

    render(<Burger opened={false} size={40} testID="numeric" />);
    expect(screen.getByTestId('numeric')).toBeTruthy();

    render(<Burger opened={false} size={'giant' as any} testID="unknown" />);
    expect(screen.getByTestId('unknown')).toBeTruthy();
  });

  it('accepts a custom color and style', () => {
    render(
      <Burger opened={false} color="#ff0000" style={{ margin: 3 }} testID="burger" />
    );
    expect(screen.getByTestId('burger')).toBeTruthy();
  });
});
