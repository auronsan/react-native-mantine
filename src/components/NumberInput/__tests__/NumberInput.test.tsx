import { Text, View } from 'react-native';
import { render, screen, fireEvent } from '../../../__tests__/test-utils';
import { NumberInput } from '../index';
import { createTheme } from '../../../theme/create-theme';
import { INPUT_SIZES } from '../../Input';

const theme = createTheme();

// Walk up to the nearest host ancestor (skips composite wrappers).
const hostParent = (node: ReturnType<typeof screen.getByTestId>) => {
  let current = node.parent;
  while (current && typeof current.type !== 'string') {
    current = current.parent;
  }
  return current as NonNullable<typeof current>;
};

const getInputWrapper = () => hostParent(screen.getByTestId('input'));

describe('NumberInput', () => {
  it('renders with label, placeholder and controls', () => {
    render(<NumberInput label="Amount" placeholder="0" testID="input" />);
    expect(screen.getByText('Amount')).toBeTruthy();
    const input = screen.getByTestId('input');
    expect(input.props.placeholder).toBe('0');
    expect(input.props.value).toBe('');
    expect(input.props.keyboardType).toBe('numeric');
    expect(input.props.editable).toBe(true);
    expect(screen.getByLabelText('Increment')).toBeTruthy();
    expect(screen.getByLabelText('Decrement')).toBeTruthy();
  });

  it('has spinbutton accessibility role and label from label prop', () => {
    render(<NumberInput label="Amount" testID="input" />);
    const input = screen.getByTestId('input');
    expect(input.props.accessibilityRole).toBe('spinbutton');
    expect(input.props.accessibilityLabel).toBe('Amount');
  });

  it('uses explicit accessibilityLabel and hint', () => {
    render(
      <NumberInput
        label={<Text>Custom</Text>}
        accessibilityLabel="Quantity"
        accessibilityHint="Enter quantity"
        testID="input"
      />
    );
    const input = screen.getByTestId('input');
    expect(input.props.accessibilityLabel).toBe('Quantity');
    expect(input.props.accessibilityHint).toBe('Enter quantity');
    expect(screen.getByText('Custom')).toBeTruthy();
  });

  it('has no accessibilityLabel when label is a node', () => {
    render(<NumberInput label={<Text>Node</Text>} testID="input" />);
    expect(
      screen.getByTestId('input').props.accessibilityLabel
    ).toBeUndefined();
  });

  it('renders description and error', () => {
    render(
      <NumberInput
        description="Whole numbers only"
        error="Invalid"
        testID="input"
      />
    );
    expect(screen.getByText('Whole numbers only')).toBeTruthy();
    const error = screen.getByText('Invalid');
    expect(error.props.accessibilityRole).toBe('alert');
    expect(getInputWrapper()).toHaveStyle({
      borderColor: (theme.colors.red || [])[6],
    });
  });

  it('renders node description and error', () => {
    render(
      <NumberInput
        description={<Text>Desc node</Text>}
        error={<Text>Error node</Text>}
        testID="input"
      />
    );
    expect(screen.getByText('Desc node')).toBeTruthy();
    expect(screen.getByText('Error node')).toBeTruthy();
  });

  it('renders defaultValue', () => {
    render(<NumberInput defaultValue={5} testID="input" />);
    expect(screen.getByTestId('input').props.value).toBe('5');
  });

  it('handles text change in uncontrolled mode', () => {
    const onChange = jest.fn();
    render(<NumberInput onChange={onChange} testID="input" />);
    fireEvent.changeText(screen.getByTestId('input'), '7');
    expect(onChange).toHaveBeenCalledWith(7);
    expect(screen.getByTestId('input').props.value).toBe('7');
  });

  it('resets to empty on empty or minus text', () => {
    const onChange = jest.fn();
    render(<NumberInput defaultValue={3} onChange={onChange} testID="input" />);
    fireEvent.changeText(screen.getByTestId('input'), '');
    expect(onChange).toHaveBeenCalledWith('');
    expect(screen.getByTestId('input').props.value).toBe('');

    fireEvent.changeText(screen.getByTestId('input'), '-');
    expect(onChange).toHaveBeenLastCalledWith('');
  });

  it('ignores non-numeric text', () => {
    const onChange = jest.fn();
    render(<NumberInput onChange={onChange} testID="input" />);
    fireEvent.changeText(screen.getByTestId('input'), 'abc');
    expect(onChange).not.toHaveBeenCalled();
  });

  it('clamps typed values to min and max', () => {
    const onChange = jest.fn();
    render(<NumberInput min={0} max={10} onChange={onChange} testID="input" />);
    fireEvent.changeText(screen.getByTestId('input'), '-5');
    expect(onChange).toHaveBeenCalledWith(0);
    fireEvent.changeText(screen.getByTestId('input'), '50');
    expect(onChange).toHaveBeenLastCalledWith(10);
  });

  it('rounds to precision', () => {
    const onChange = jest.fn();
    render(<NumberInput precision={2} onChange={onChange} testID="input" />);
    fireEvent.changeText(screen.getByTestId('input'), '1.2345');
    expect(onChange).toHaveBeenCalledWith(1.23);
  });

  it('rounds to integer when precision is 0', () => {
    const onChange = jest.fn();
    render(<NumberInput onChange={onChange} testID="input" />);
    fireEvent.changeText(screen.getByTestId('input'), '1.7');
    expect(onChange).toHaveBeenCalledWith(2);
  });

  it('increments and decrements with step', () => {
    const onChange = jest.fn();
    render(
      <NumberInput
        defaultValue={5}
        step={5}
        onChange={onChange}
        testID="input"
      />
    );
    fireEvent.press(screen.getByLabelText('Increment'));
    expect(onChange).toHaveBeenCalledWith(10);
    expect(screen.getByTestId('input').props.value).toBe('10');

    fireEvent.press(screen.getByLabelText('Decrement'));
    expect(onChange).toHaveBeenLastCalledWith(5);
    expect(screen.getByTestId('input').props.value).toBe('5');
  });

  it('increments from empty value starting at 0', () => {
    const onChange = jest.fn();
    render(<NumberInput onChange={onChange} testID="input" />);
    fireEvent.press(screen.getByLabelText('Increment'));
    expect(onChange).toHaveBeenCalledWith(1);
    fireEvent.press(screen.getByLabelText('Decrement'));
    expect(onChange).toHaveBeenLastCalledWith(0);
  });

  it('uses step 1 when step is 0', () => {
    const onChange = jest.fn();
    render(<NumberInput step={0} onChange={onChange} />);
    fireEvent.press(screen.getByLabelText('Increment'));
    expect(onChange).toHaveBeenCalledWith(1);
  });

  it('clamps increment and decrement to max and min', () => {
    const onChange = jest.fn();
    render(
      <NumberInput
        defaultValue={9}
        min={0}
        max={10}
        step={5}
        onChange={onChange}
        testID="input"
      />
    );
    fireEvent.press(screen.getByLabelText('Increment'));
    expect(onChange).toHaveBeenCalledWith(10);
    expect(screen.getByLabelText('Increment')).toBeDisabled();
    expect(screen.getByLabelText('Decrement')).not.toBeDisabled();
  });

  it('disables decrement at min', () => {
    render(<NumberInput defaultValue={0} min={0} testID="input" />);
    expect(screen.getByLabelText('Decrement')).toBeDisabled();
    expect(screen.getByLabelText('Increment')).not.toBeDisabled();
  });

  it('keeps controlled value and reports changes', () => {
    const onChange = jest.fn();
    render(<NumberInput value={3} onChange={onChange} testID="input" />);
    fireEvent.changeText(screen.getByTestId('input'), '8');
    expect(onChange).toHaveBeenCalledWith(8);
    expect(screen.getByTestId('input').props.value).toBe('3');

    fireEvent.press(screen.getByLabelText('Increment'));
    expect(onChange).toHaveBeenLastCalledWith(4);
    fireEvent.press(screen.getByLabelText('Decrement'));
    expect(onChange).toHaveBeenLastCalledWith(2);
    fireEvent.changeText(screen.getByTestId('input'), '');
    expect(onChange).toHaveBeenLastCalledWith('');
    expect(screen.getByTestId('input').props.value).toBe('3');
  });

  it('renders controlled empty value', () => {
    render(<NumberInput value="" testID="input" />);
    expect(screen.getByTestId('input').props.value).toBe('');
  });

  it('hides controls when hideControls is set', () => {
    render(<NumberInput hideControls testID="input" />);
    expect(screen.queryByLabelText('Increment')).toBeNull();
    expect(screen.queryByLabelText('Decrement')).toBeNull();
  });

  it('disables input and controls when disabled', () => {
    const onChange = jest.fn();
    render(<NumberInput disabled onChange={onChange} testID="input" />);
    const input = screen.getByTestId('input');
    expect(input.props.editable).toBe(false);
    expect(screen.getByLabelText('Increment')).toBeDisabled();
    expect(screen.getByLabelText('Decrement')).toBeDisabled();
    fireEvent.press(screen.getByLabelText('Increment'));
    expect(onChange).not.toHaveBeenCalled();
    expect(getInputWrapper()).toHaveStyle({ opacity: 0.6 });
  });

  it('applies default variant styles', () => {
    render(<NumberInput testID="input" />);
    expect(getInputWrapper()).toHaveStyle({
      backgroundColor: theme.white,
      borderWidth: 1,
      borderColor: (theme.colors.gray || [])[4],
      height: INPUT_SIZES.sm,
    });
  });

  it('applies filled variant styles', () => {
    render(<NumberInput variant="filled" testID="input" />);
    expect(getInputWrapper()).toHaveStyle({
      backgroundColor: (theme.colors.gray || [])[1],
      borderColor: 'transparent',
    });
  });

  it('applies unstyled variant styles', () => {
    render(<NumberInput variant="unstyled" testID="input" />);
    expect(getInputWrapper()).toHaveStyle({
      backgroundColor: 'transparent',
      borderWidth: 0,
    });
  });

  it.each(['xs', 'sm', 'md', 'lg', 'xl'] as const)(
    'applies size %s',
    (size) => {
      render(<NumberInput size={size} testID="input" />);
      expect(getInputWrapper()).toHaveStyle({ height: INPUT_SIZES[size] });
      expect(screen.getByTestId('input')).toHaveStyle({
        fontSize: theme.fontSizes[size],
      });
    }
  );

  it('applies radius, custom style and wrapperStyle', () => {
    render(
      <NumberInput
        radius="xl"
        style={{ margin: 2 }}
        wrapperStyle={{ marginTop: 11 }}
        fullWidth
        testID="input"
      />
    );
    expect(getInputWrapper()).toHaveStyle({
      borderRadius: theme.fn.radius('xl'),
      margin: 2,
    });
    expect(hostParent(getInputWrapper())).toHaveStyle({
      marginTop: 11,
      width: '100%',
    });
  });

  it('renders icon and removes input left padding', () => {
    render(<NumberInput icon={<View testID="icon" />} testID="input" />);
    expect(screen.getByTestId('icon')).toBeTruthy();
    expect(screen.getByTestId('input')).toHaveStyle({ paddingLeft: 0 });
  });

  it('passes other TextInput props through', () => {
    const onFocus = jest.fn();
    render(<NumberInput onFocus={onFocus} testID="input" />);
    fireEvent(screen.getByTestId('input'), 'focus');
    expect(onFocus).toHaveBeenCalled();
  });
});
