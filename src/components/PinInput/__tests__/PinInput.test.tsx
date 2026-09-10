import { render, screen, fireEvent } from '../../../__tests__/test-utils';
import { PinInput } from '../index';
import { createTheme } from '../../../theme/create-theme';
import { rem } from '../../../theme/utils/rem';

const theme = createTheme();

const getInputs = () => screen.getAllByLabelText(/PIN digit/);

describe('PinInput', () => {
  it('renders 4 inputs by default', () => {
    render(<PinInput testID="pin" />);
    expect(screen.getByTestId('pin')).toBeTruthy();
    const inputs = getInputs();
    expect(inputs).toHaveLength(4);
    inputs.forEach((input, index) => {
      expect(input.props.accessibilityLabel).toBe(
        `PIN digit ${index + 1} of 4`
      );
      expect(input.props.accessibilityHint).toBe('Enter a single character');
      expect(input.props.value).toBe('');
      expect(input.props.maxLength).toBe(1);
      expect(input.props.keyboardType).toBe('number-pad');
      expect(input.props.editable).toBe(true);
    });
  });

  it('renders the given length', () => {
    render(<PinInput length={6} />);
    expect(getInputs()).toHaveLength(6);
  });

  it('uses custom accessibility label and hint', () => {
    render(<PinInput accessibilityLabel="Code" accessibilityHint="Type" />);
    const inputs = screen.getAllByLabelText('Code');
    expect(inputs).toHaveLength(4);
    expect(inputs[0]?.props.accessibilityHint).toBe('Type');
  });

  it('shows defaultValue characters', () => {
    render(<PinInput defaultValue="12" />);
    const values = getInputs().map((input) => input.props.value);
    expect(values).toEqual(['1', '2', '', '']);
  });

  it('masks characters when mask is set', () => {
    render(<PinInput mask value="1 3 " />);
    const values = getInputs().map((input) => input.props.value);
    expect(values).toEqual(['•', '', '•', '']);
  });

  it('handles single character input in uncontrolled mode', () => {
    const onChange = jest.fn();
    const onComplete = jest.fn();
    render(<PinInput onChange={onChange} onComplete={onComplete} />);
    const inputs = getInputs();
    fireEvent.changeText(inputs[0] as any, '5');
    expect(onChange).toHaveBeenCalledWith('5   ');
    expect(getInputs()[0]?.props.value).toBe('5');
    expect(onComplete).not.toHaveBeenCalled();
  });

  it('calls onComplete when all inputs are filled', () => {
    const onChange = jest.fn();
    const onComplete = jest.fn();
    render(
      <PinInput
        defaultValue="123"
        onChange={onChange}
        onComplete={onComplete}
      />
    );
    fireEvent.changeText(getInputs()[3] as any, '4');
    expect(onChange).toHaveBeenCalledWith('1234');
    expect(onComplete).toHaveBeenCalledWith('1234');
  });

  it('keeps the other slots in place when a character is removed', () => {
    const onChange = jest.fn();
    const onComplete = jest.fn();
    render(
      <PinInput
        defaultValue="1234"
        onChange={onChange}
        onComplete={onComplete}
      />
    );
    fireEvent.changeText(getInputs()[1] as any, '');

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith('1 34');
    expect(getInputs().map((input) => input.props.value)).toEqual([
      '1',
      '',
      '3',
      '4',
    ]);
    expect(onComplete).not.toHaveBeenCalled();

    // Re-filling the cleared slot completes the pin again
    fireEvent.changeText(getInputs()[1] as any, '9');
    expect(onChange).toHaveBeenLastCalledWith('1934');
    expect(onComplete).toHaveBeenCalledWith('1934');
  });

  it('clears the last slot without reporting completion', () => {
    const onChange = jest.fn();
    const onComplete = jest.fn();
    render(
      <PinInput
        defaultValue="1234"
        onChange={onChange}
        onComplete={onComplete}
      />
    );
    fireEvent.changeText(getInputs()[3] as any, '');
    expect(onChange).toHaveBeenCalledWith('123 ');
    expect(onComplete).not.toHaveBeenCalled();
  });

  it('ignores invalid characters for number type', () => {
    const onChange = jest.fn();
    render(<PinInput onChange={onChange} />);
    fireEvent.changeText(getInputs()[0] as any, 'a');
    expect(onChange).not.toHaveBeenCalled();
  });

  it('accepts letters for alphanumeric type but rejects symbols', () => {
    const onChange = jest.fn();
    render(<PinInput type="alphanumeric" onChange={onChange} />);
    const inputs = getInputs();
    expect(inputs[0]?.props.keyboardType).toBe('default');
    fireEvent.changeText(inputs[0] as any, 'a');
    expect(onChange).toHaveBeenCalledWith('a   ');
    fireEvent.changeText(inputs[1] as any, '!');
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it('handles pasted text that fills all inputs', () => {
    const onChange = jest.fn();
    const onComplete = jest.fn();
    render(<PinInput onChange={onChange} onComplete={onComplete} />);
    fireEvent.changeText(getInputs()[0] as any, '123456');
    expect(onChange).toHaveBeenCalledWith('1234');
    expect(onComplete).toHaveBeenCalledWith('1234');
    const values = getInputs().map((input) => input.props.value);
    expect(values).toEqual(['1', '2', '3', '4']);
  });

  it('handles pasted text shorter than length', () => {
    const onChange = jest.fn();
    const onComplete = jest.fn();
    render(<PinInput onChange={onChange} onComplete={onComplete} />);
    fireEvent.changeText(getInputs()[0] as any, '12');
    expect(onChange).toHaveBeenCalledWith('12  ');
    expect(onComplete).not.toHaveBeenCalled();
  });

  it('keeps controlled value and reports changes', () => {
    const onChange = jest.fn();
    render(<PinInput value="9" onChange={onChange} />);
    fireEvent.changeText(getInputs()[1] as any, '8');
    expect(onChange).toHaveBeenCalledWith('98  ');
    expect(getInputs()[1]?.props.value).toBe('');

    fireEvent.changeText(getInputs()[0] as any, '77');
    expect(onChange).toHaveBeenLastCalledWith('77  ');
    expect(getInputs()[0]?.props.value).toBe('9');
  });

  it('handles backspace key presses', () => {
    render(<PinInput defaultValue="1" />);
    const inputs = getInputs();
    const keyPress = (index: number, key: string) =>
      fireEvent(inputs[index] as any, 'keyPress', { nativeEvent: { key } });

    expect(() => keyPress(1, 'Backspace')).not.toThrow();
    expect(() => keyPress(0, 'Backspace')).not.toThrow();
    expect(() => keyPress(2, 'Backspace')).not.toThrow();
    expect(() => keyPress(1, 'a')).not.toThrow();
  });

  it('applies focused styles on focus and removes them on blur', () => {
    render(<PinInput />);
    const inputs = getInputs();
    fireEvent(inputs[1] as any, 'focus');
    expect(getInputs()[1]).toHaveStyle({
      borderWidth: 2,
      borderColor: theme.fn.themeColor(theme.primaryColor, 6),
    });
    expect(getInputs()[0]).toHaveStyle({ borderWidth: 1 });

    fireEvent(getInputs()[1] as any, 'blur');
    expect(getInputs()[1]).toHaveStyle({ borderWidth: 1 });
  });

  it('disables inputs when disabled', () => {
    const onChange = jest.fn();
    render(<PinInput disabled onChange={onChange} />);
    const inputs = getInputs();
    expect(inputs[0]?.props.editable).toBe(false);
    expect(inputs[0]).toHaveStyle({ opacity: 0.6 });
    fireEvent.changeText(inputs[0] as any, '1');
    expect(onChange).not.toHaveBeenCalled();
  });

  it('applies error border color', () => {
    render(<PinInput error />);
    expect(getInputs()[0]).toHaveStyle({
      borderColor: theme.fn.themeColor('red', 6),
    });
  });

  it.each([
    ['xs', 32],
    ['sm', 40],
    ['md', 48],
    ['lg', 56],
    ['xl', 64],
  ] as const)('applies size %s', (size, px) => {
    render(<PinInput size={size} />);
    expect(getInputs()[0]).toHaveStyle({
      width: rem(px),
      height: rem(px),
      fontSize: theme.fontSizes[size],
    });
  });

  it('falls back to md size for unknown size', () => {
    render(<PinInput size={'huge' as any} />);
    expect(getInputs()[0]).toHaveStyle({ width: rem(48), height: rem(48) });
  });

  it('applies radius and spacing', () => {
    render(<PinInput testID="pin" radius="xl" spacing="xl" />);
    expect(getInputs()[0]).toHaveStyle({
      borderRadius: theme.fn.radius('xl'),
    });
    expect(screen.getByTestId('pin')).toHaveStyle({ gap: theme.spacing.xl });
  });

  it('falls back to sm spacing for unknown spacing', () => {
    render(<PinInput testID="pin" spacing={'nope' as any} />);
    expect(screen.getByTestId('pin')).toHaveStyle({ gap: theme.spacing.sm });
  });

  it('applies custom style and inputStyle', () => {
    render(
      <PinInput
        testID="pin"
        style={{ margin: 6 }}
        inputStyle={{ color: 'purple' }}
      />
    );
    expect(screen.getByTestId('pin')).toHaveStyle({ margin: 6 });
    expect(getInputs()[0]).toHaveStyle({ color: 'purple' });
  });
});
