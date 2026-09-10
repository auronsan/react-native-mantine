import { Modal, TouchableOpacity, View } from 'react-native';
import { render, screen, fireEvent, act } from '../../../__tests__/test-utils';
import { ColorInput } from '../index';
import { ColorSwatch } from '../../ColorSwatch';

describe('ColorInput', () => {
  it('renders the input with preview swatch, picker button and testID', () => {
    render(<ColorInput label="Color" defaultValue="#ff0000" testID="input" />);

    const input = screen.getByTestId('input');
    expect(input.props.value).toBe('#ff0000');
    expect(input.props.editable).toBe(true);
    expect(input.props.autoCapitalize).toBe('none');
    expect(screen.getByText('Color')).toBeTruthy();
    expect(screen.getByLabelText('Open color picker').props.accessibilityRole).toBe(
      'button'
    );
    // preview on the left + swatch inside the picker button
    expect(screen.UNSAFE_getAllByType(ColorSwatch)).toHaveLength(2);
  });

  it('hides the preview when withPreview is false', () => {
    render(<ColorInput withPreview={false} defaultValue="#00ff00" />);
    expect(screen.UNSAFE_getAllByType(ColorSwatch)).toHaveLength(1);
  });

  it('updates value while typing (uncontrolled) and calls onChange', () => {
    const onChange = jest.fn();
    render(<ColorInput onChange={onChange} testID="input" />);

    fireEvent.changeText(screen.getByTestId('input'), '#123456');
    expect(onChange).toHaveBeenCalledWith('#123456');
    expect(screen.getByTestId('input').props.value).toBe('#123456');
  });

  it('reverts to the last valid value on blur when fixOnBlur is set', () => {
    const onChange = jest.fn();
    const onBlur = jest.fn();
    render(
      <ColorInput defaultValue="#ff0000" onChange={onChange} onBlur={onBlur} testID="input" />
    );

    const input = screen.getByTestId('input');
    fireEvent.changeText(input, 'not a color');
    expect(screen.getByTestId('input').props.value).toBe('not a color');

    fireEvent(input, 'blur');
    expect(onBlur).toHaveBeenCalled();
    expect(onChange).toHaveBeenLastCalledWith('#ff0000');
    expect(screen.getByTestId('input').props.value).toBe('#ff0000');
  });

  it('keeps invalid values on blur when fixOnBlur is false', () => {
    render(<ColorInput fixOnBlur={false} defaultValue="#ff0000" testID="input" />);

    const input = screen.getByTestId('input');
    fireEvent.changeText(input, 'nope');
    fireEvent(input, 'blur');
    expect(screen.getByTestId('input').props.value).toBe('nope');
  });

  it('works as a controlled component', () => {
    const onChange = jest.fn();
    render(<ColorInput value="#0000ff" onChange={onChange} testID="input" />);

    fireEvent.changeText(screen.getByTestId('input'), '#00ff00');
    expect(onChange).toHaveBeenCalledWith('#00ff00');
    expect(screen.getByTestId('input').props.value).toBe('#0000ff');
  });

  it('opens the picker, emits swatch selections and closes', () => {
    const onChange = jest.fn();
    const onChangeEnd = jest.fn();
    render(
      <ColorInput
        defaultValue="#ff0000"
        swatches={['#00ff00', '#0000ff']}
        swatchesPerRow={2}
        onChange={onChange}
        onChangeEnd={onChangeEnd}
        testID="input"
      />
    );

    expect(screen.queryByRole('button', { name: '#00ff00' })).toBeNull();
    fireEvent.press(screen.getByLabelText('Open color picker'));
    expect(screen.getByRole('button', { name: '#00ff00' })).toBeTruthy();

    fireEvent.press(screen.getByRole('button', { name: '#00ff00' }));
    expect(onChange).toHaveBeenLastCalledWith('#00ff00');
    expect(onChangeEnd).toHaveBeenLastCalledWith('#00ff00');
    expect(screen.getByTestId('input').props.value).toBe('#00ff00');
    // still opened because closeOnColorSwatchClick is false
    expect(screen.getByRole('button', { name: '#0000ff' })).toBeTruthy();

    // overlay press closes
    fireEvent.press(screen.UNSAFE_getAllByType(TouchableOpacity)[1]!);
    expect(screen.queryByRole('button', { name: '#0000ff' })).toBeNull();

    fireEvent.press(screen.getByLabelText('Open color picker'));
    act(() => {
      screen.UNSAFE_getByType(Modal).props.onRequestClose();
    });
    expect(screen.queryByRole('button', { name: '#0000ff' })).toBeNull();
  });

  it('closes the picker on swatch press when closeOnColorSwatchClick is set', () => {
    render(
      <ColorInput
        swatches={['#00ff00']}
        closeOnColorSwatchClick
        format="rgba"
        withPicker={false}
        testID="input"
      />
    );

    fireEvent.press(screen.getByLabelText('Open color picker'));
    fireEvent.press(screen.getByRole('button', { name: '#00ff00' }));
    expect(screen.queryByRole('button', { name: '#00ff00' })).toBeNull();
    expect(screen.getByTestId('input').props.value).toBe('rgba(0, 255, 0, 1)');
  });

  it('opens the picker from the input when disallowInput is set', () => {
    render(<ColorInput disallowInput swatches={['#abcdef']} testID="input" />);

    const input = screen.getByTestId('input');
    expect(input.props.editable).toBe(false);
    // The non-editable input is exposed as disabled to accessibility, so RTL
    // refuses to press it; invoke the handler the component attached instead.
    act(() => {
      input.props.onPress();
    });
    expect(screen.getByRole('button', { name: '#abcdef' })).toBeTruthy();
  });

  it('disables input and hides the picker button when disabled', () => {
    render(<ColorInput disabled disallowInput testID="input" />);

    const input = screen.getByTestId('input');
    expect(input.props.editable).toBe(false);
    expect(input.props.onPress).toBeUndefined();
    expect(screen.queryByLabelText('Open color picker')).toBeNull();
  });

  it('renders a custom right section and custom picker button label', () => {
    const { rerender } = render(
      <ColorInput rightSection={<View testID="custom-right" />} />
    );
    expect(screen.getByTestId('custom-right')).toBeTruthy();
    expect(screen.queryByLabelText('Open color picker')).toBeNull();

    rerender(<ColorInput pickerButtonLabel="Pick" />);
    expect(screen.getByLabelText('Pick')).toBeTruthy();
  });

  it('uses a transparent preview when no valid color is known', () => {
    render(<ColorInput defaultValue="garbage" withPreview />);
    const swatches = screen.UNSAFE_getAllByType(ColorSwatch);
    expect(swatches[0]!.props.color).toBe('transparent');
  });
});
