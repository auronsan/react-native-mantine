import { Text } from 'react-native';
import { fireEvent, render, screen } from '../../../__tests__/test-utils';
import { Rating } from '../index';

describe('Rating', () => {
  it('renders 5 symbols by default', () => {
    render(<Rating testID="rating" />);
    expect(screen.getByTestId('rating')).toBeTruthy();
    expect(screen.getAllByRole('button')).toHaveLength(5);
    expect(screen.getByLabelText('Rating: 0 out of 5 stars')).toBeTruthy();
  });

  it('respects count', () => {
    render(<Rating count={3} />);
    expect(screen.getAllByRole('button')).toHaveLength(3);
    expect(screen.getByLabelText('3 of 3 stars')).toBeTruthy();
  });

  it('exposes accessibility value', () => {
    render(<Rating value={2} testID="rating" />);
    expect(screen.getByTestId('rating').props.accessibilityRole).toBe(
      'adjustable'
    );
    expect(screen.getByTestId('rating').props.accessibilityValue).toEqual({
      min: 0,
      max: 5,
      now: 2,
    });
  });

  it('renders filled and empty stars for the value', () => {
    render(<Rating value={2} />);
    expect(screen.getAllByText('★')).toHaveLength(2);
    expect(screen.getAllByText('☆')).toHaveLength(3);
  });

  it('works uncontrolled with defaultValue and updates on press', () => {
    const onChange = jest.fn();
    render(<Rating defaultValue={1} onChange={onChange} testID="rating" />);
    expect(screen.getAllByText('★')).toHaveLength(1);

    fireEvent.press(screen.getByLabelText('4 of 5 stars'));
    expect(onChange).toHaveBeenCalledWith(4);
    expect(screen.getAllByText('★')).toHaveLength(4);
    expect(screen.getByTestId('rating').props.accessibilityValue.now).toBe(4);
  });

  it('does not update internal value when controlled', () => {
    const onChange = jest.fn();
    render(<Rating value={1} onChange={onChange} />);

    fireEvent.press(screen.getByLabelText('3 of 5 stars'));
    expect(onChange).toHaveBeenCalledWith(3);
    expect(screen.getAllByText('★')).toHaveLength(1);
  });

  it('ignores presses in readOnly mode', () => {
    const onChange = jest.fn();
    render(<Rating value={2} readOnly onChange={onChange} />);

    const star = screen.getByLabelText('5 of 5 stars');
    expect(star).toBeDisabled();
    fireEvent(star, 'pressIn');
    fireEvent(star, 'pressOut');
    expect(onChange).not.toHaveBeenCalled();
    expect(screen.getAllByText('★')).toHaveLength(2);
  });

  it('highlights hovered stars on pressIn and resets on pressOut', () => {
    render(<Rating value={1} />);
    const star = screen.getByLabelText('4 of 5 stars');

    fireEvent(star, 'pressIn');
    // pressing the 4th star highlights the pressed star and every star before it
    expect(screen.getAllByText('★')).toHaveLength(4);
    expect(screen.getAllByText('☆')).toHaveLength(1);

    fireEvent(star, 'pressOut');
    expect(screen.getAllByText('★')).toHaveLength(1);
  });

  it('highlights only the first star when pressing it', () => {
    render(<Rating value={3} />);
    const star = screen.getByLabelText('1 of 5 stars');

    fireEvent(star, 'pressIn');
    expect(screen.getAllByText('★')).toHaveLength(1);
    expect(screen.getAllByText('☆')).toHaveLength(4);

    fireEvent(star, 'pressOut');
    expect(screen.getAllByText('★')).toHaveLength(3);
  });

  it('keeps the selected value while pressing when highlightSelectedOnly', () => {
    render(<Rating value={2} highlightSelectedOnly />);
    const star = screen.getByLabelText('5 of 5 stars');

    fireEvent(star, 'pressIn');
    expect(screen.getAllByText('★')).toHaveLength(2);
    fireEvent(star, 'pressOut');
  });

  it('renders fractional values', () => {
    render(<Rating value={2.5} fractions={2} />);
    // two full stars plus the half-filled third star use the filled style
    expect(screen.getAllByText('★')).toHaveLength(3);
    expect(screen.getAllByText('☆')).toHaveLength(2);
  });

  it('renders custom symbols', () => {
    render(
      <Rating
        value={1}
        count={2}
        symbol={<Text>full</Text>}
        emptySymbol={<Text>empty</Text>}
      />
    );
    expect(screen.getByText('full')).toBeTruthy();
    expect(screen.getByText('empty')).toBeTruthy();
  });

  it.each(['xs', 'sm', 'md', 'lg', 'xl'] as const)(
    'renders %s size',
    (size) => {
      render(<Rating size={size} value={1} />);
      expect(screen.getAllByText('★')).toHaveLength(1);
    }
  );

  it('falls back to md size for unknown size', () => {
    render(<Rating size={'giant' as any} value={1} />);
    expect(screen.getAllByText('★')).toHaveLength(1);
  });

  it('renders with custom colors and style', () => {
    render(
      <Rating
        value={3}
        color="red"
        emptyColor="blue"
        style={{ margin: 4 }}
        testID="rating"
      />
    );
    expect(screen.getByTestId('rating')).toHaveStyle({ margin: 4 });
  });

  it('applies testID passthrough', () => {
    render(<Rating testID="custom-rating" />);
    expect(screen.getByTestId('custom-rating')).toBeTruthy();
  });
});
