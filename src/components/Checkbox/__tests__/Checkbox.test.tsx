import { render, screen, fireEvent } from '../../../__tests__/test-utils';
import { Checkbox } from '../index';
import { createTheme } from '../../../theme/create-theme';

const theme = createTheme();

describe('Checkbox', () => {
  it('renders with label, checkbox role and testID', () => {
    render(<Checkbox label="Accept terms" testID="checkbox" />);

    const checkbox = screen.getByTestId('checkbox');
    expect(screen.getByText('Accept terms')).toBeTruthy();
    expect(checkbox.props.accessibilityRole).toBe('checkbox');
    expect(checkbox.props.accessibilityState).toEqual(
      expect.objectContaining({ checked: false })
    );
    expect(screen.getByRole('checkbox')).toBeTruthy();
  });

  it('renders without a label', () => {
    render(<Checkbox testID="checkbox" />);
    expect(screen.getByTestId('checkbox')).toBeTruthy();
  });

  it('calls onChange with the toggled value when pressed', () => {
    const onChange = jest.fn();
    const { rerender } = render(
      <Checkbox onChange={onChange} testID="checkbox" />
    );

    fireEvent.press(screen.getByTestId('checkbox'));
    expect(onChange).toHaveBeenCalledWith(true);

    rerender(<Checkbox checked onChange={onChange} testID="checkbox" />);
    fireEvent.press(screen.getByTestId('checkbox'));
    expect(onChange).toHaveBeenLastCalledWith(false);
  });

  it('reflects the checked state in accessibility and shows the checkmark', () => {
    render(<Checkbox checked testID="checkbox" />);

    expect(screen.getByTestId('checkbox').props.accessibilityState).toEqual(
      expect.objectContaining({ checked: true })
    );
    expect(screen.getByText('✓')).toBeTruthy();
  });

  it('renders the indeterminate state', () => {
    render(<Checkbox indeterminate testID="checkbox" />);

    expect(screen.getByText('−')).toBeTruthy();
    expect(screen.getByTestId('checkbox').props.accessibilityState).toEqual(
      expect.objectContaining({ checked: 'mixed' })
    );
  });

  it('does not call onChange when disabled', () => {
    const onChange = jest.fn();
    render(<Checkbox disabled onChange={onChange} testID="checkbox" />);

    const checkbox = screen.getByTestId('checkbox');
    fireEvent.press(checkbox);
    expect(onChange).not.toHaveBeenCalled();
    expect(checkbox).toBeDisabled();
    expect(checkbox).toHaveStyle({ opacity: 0.5 });
  });

  it('renders every size and an unknown size', () => {
    (['xs', 'sm', 'md', 'lg', 'xl'] as const).forEach((size) => {
      const { unmount } = render(<Checkbox size={size} testID={size} />);
      expect(screen.getByTestId(size)).toBeTruthy();
      unmount();
    });

    render(<Checkbox size={'giant' as any} testID="unknown" />);
    expect(screen.getByTestId('unknown')).toBeTruthy();
  });

  it('applies color, style and wrapperStyle', () => {
    render(
      <Checkbox
        checked
        color="red"
        style={{ borderWidth: 3 }}
        wrapperStyle={{ margin: 5 }}
        testID="checkbox"
      />
    );

    const wrapper = screen.getByTestId('checkbox');
    expect(wrapper).toHaveStyle({ margin: 5 });
    expect(screen.getByText('✓').parent?.parent).toBeTruthy();
    expect(theme.colors.red![6]).toBeTruthy();
  });
});
