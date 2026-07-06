import { Text as RNText } from 'react-native';
import { render, fireEvent, waitFor } from './test-utils';
import {
  applyMask,
  ColorInput,
  ColorPicker,
  FileButton,
  FileInput,
  formatColor,
  getMaskPlaceholder,
  InputBase,
  JsonInput,
  MaskInput,
  parseColor,
} from '../index';

describe('InputBase', () => {
  it('renders label, description, error and children', () => {
    const { getByText } = render(
      <InputBase
        label="Custom field"
        description="Helpful description"
        error="Something went wrong"
        required
      >
        <RNText>Inner content</RNText>
      </InputBase>
    );

    expect(getByText(/Custom field/)).toBeTruthy();
    expect(getByText('Helpful description')).toBeTruthy();
    expect(getByText('Something went wrong')).toBeTruthy();
    expect(getByText('Inner content')).toBeTruthy();
  });

  it('calls onPress when the frame is pressed', () => {
    const onPress = jest.fn();
    const { getByLabelText } = render(
      <InputBase label="Pressable field" onPress={onPress}>
        <RNText>value</RNText>
      </InputBase>
    );

    fireEvent.press(getByLabelText('Pressable field'));
    expect(onPress).toHaveBeenCalled();
  });
});

describe('JsonInput', () => {
  it('shows validation error on blur for invalid JSON', () => {
    const { getByPlaceholderText, getByText, queryByText } = render(
      <JsonInput placeholder="Enter JSON" validationError="Invalid JSON value" />
    );

    const input = getByPlaceholderText('Enter JSON');
    fireEvent.changeText(input, '{"broken": ');
    fireEvent(input, 'blur');

    expect(getByText('Invalid JSON value')).toBeTruthy();

    fireEvent(input, 'focus');
    expect(queryByText('Invalid JSON value')).toBeNull();
  });

  it('formats valid JSON on blur when formatOnBlur is set', () => {
    const onChangeText = jest.fn();
    const { getByPlaceholderText } = render(
      <JsonInput
        placeholder="Enter JSON"
        formatOnBlur
        onChangeText={onChangeText}
      />
    );

    const input = getByPlaceholderText('Enter JSON');
    fireEvent.changeText(input, '{"a":1}');
    fireEvent(input, 'blur');

    expect(onChangeText).toHaveBeenLastCalledWith('{\n  "a": 1\n}');
  });
});

describe('applyMask', () => {
  it('masks digits into the pattern with literals', () => {
    expect(applyMask('5551234567', '(###) ###-####').masked).toBe(
      '(555) 123-4567'
    );
  });

  it('drops characters that do not match the token', () => {
    expect(applyMask('55a5', '####').masked).toBe('555');
  });

  it('reports completion state', () => {
    expect(applyMask('1234', '##-##').complete).toBe(true);
    expect(applyMask('123', '##-##').complete).toBe(false);
  });

  it('builds a placeholder from the mask', () => {
    expect(getMaskPlaceholder('(###) ###', '_')).toBe('(___) ___');
  });
});

describe('MaskInput', () => {
  it('formats typed value and reports raw value', () => {
    const onChangeText = jest.fn();
    const onChangeRaw = jest.fn();
    const { getByPlaceholderText } = render(
      <MaskInput
        mask="+1 (###) ###-####"
        placeholder="Phone"
        onChangeText={onChangeText}
        onChangeRaw={onChangeRaw}
      />
    );

    fireEvent.changeText(getByPlaceholderText('Phone'), '5551234567');

    expect(onChangeText).toHaveBeenLastCalledWith('+1 (555) 123-4567');
    expect(onChangeRaw).toHaveBeenLastCalledWith(
      '5551234567',
      '+1 (555) 123-4567'
    );
  });

  it('calls onComplete when the mask is filled', () => {
    const onComplete = jest.fn();
    const { getByPlaceholderText } = render(
      <MaskInput mask="##/##" placeholder="Date" onComplete={onComplete} />
    );

    fireEvent.changeText(getByPlaceholderText('Date'), '1231');
    expect(onComplete).toHaveBeenCalledWith('12/31', '1231');
  });

  it('shows the mask skeleton as placeholder with showMask', () => {
    const { getByPlaceholderText } = render(<MaskInput mask="##-##" showMask />);
    expect(getByPlaceholderText('__-__')).toBeTruthy();
  });
});

describe('color converters', () => {
  it('parses and formats colors across formats', () => {
    expect(formatColor(parseColor('#ff0000')!, 'rgb')).toBe('rgb(255, 0, 0)');
    expect(formatColor(parseColor('rgba(0, 255, 0, 0.5)')!, 'rgba')).toBe(
      'rgba(0, 255, 0, 0.5)'
    );
    expect(formatColor(parseColor('hsl(240, 100%, 50%)')!, 'hex')).toBe(
      '#0000ff'
    );
    expect(parseColor('not-a-color')).toBeNull();
  });
});

describe('ColorPicker', () => {
  it('renders pickers and calls onChange when a swatch is pressed', () => {
    const onChange = jest.fn();
    const onColorSwatchClick = jest.fn();
    const { getByLabelText } = render(
      <ColorPicker
        defaultValue="#ffffff"
        swatches={['#fa5252', '#40c057']}
        onChange={onChange}
        onColorSwatchClick={onColorSwatchClick}
      />
    );

    expect(getByLabelText('Saturation')).toBeTruthy();
    expect(getByLabelText('Hue')).toBeTruthy();

    fireEvent.press(getByLabelText('#fa5252'));
    expect(onChange).toHaveBeenCalledWith('#fa5252');
    expect(onColorSwatchClick).toHaveBeenCalledWith('#fa5252');
  });

  it('shows alpha slider only for alpha formats', () => {
    const { getByLabelText, queryByLabelText, rerender } = render(
      <ColorPicker format="hex" />
    );
    expect(queryByLabelText('Alpha')).toBeNull();

    rerender(<ColorPicker format="rgba" />);
    expect(getByLabelText('Alpha')).toBeTruthy();
  });
});

describe('ColorInput', () => {
  it('accepts typed color values', () => {
    const onChange = jest.fn();
    const { getByPlaceholderText } = render(
      <ColorInput placeholder="Pick color" onChange={onChange} />
    );

    fireEvent.changeText(getByPlaceholderText('Pick color'), '#12ab34');
    expect(onChange).toHaveBeenCalledWith('#12ab34');
  });

  it('reverts invalid value on blur with fixOnBlur', () => {
    const onChange = jest.fn();
    const { getByPlaceholderText } = render(
      <ColorInput
        placeholder="Pick color"
        defaultValue="#ff0000"
        onChange={onChange}
      />
    );

    const input = getByPlaceholderText('Pick color');
    fireEvent.changeText(input, 'garbage');
    fireEvent(input, 'blur');

    expect(onChange).toHaveBeenLastCalledWith('#ff0000');
  });

  it('opens the picker dropdown from the right section', () => {
    const { getByLabelText, getAllByLabelText } = render(
      <ColorInput placeholder="Pick color" defaultValue="#ff0000" />
    );

    fireEvent.press(getByLabelText('Open color picker'));
    expect(getAllByLabelText('Saturation').length).toBeGreaterThan(0);
  });
});

describe('FileButton', () => {
  it('passes picked file to onChange', async () => {
    const onChange = jest.fn();
    const { getByText } = render(
      <FileButton onChange={onChange}>
        {({ onPress }) => <RNText onPress={onPress}>Upload</RNText>}
      </FileButton>
    );

    fireEvent.press(getByText('Upload'));

    await waitFor(() =>
      expect(onChange).toHaveBeenCalledWith(
        expect.objectContaining({ name: 'document.pdf' })
      )
    );
  });
});

describe('FileInput', () => {
  it('shows placeholder and picked file name', async () => {
    const { getByText, getByLabelText } = render(
      <FileInput label="Attachment" placeholder="Select file" />
    );

    expect(getByText('Select file')).toBeTruthy();

    fireEvent.press(getByLabelText('Attachment'));
    await waitFor(() => expect(getByText('document.pdf')).toBeTruthy());
  });

  it('clears the value from the clear button', async () => {
    const onChange = jest.fn();
    const { getByText, getByLabelText, queryByText } = render(
      <FileInput
        label="Attachment"
        placeholder="Select file"
        clearable
        onChange={onChange}
      />
    );

    fireEvent.press(getByLabelText('Attachment'));
    await waitFor(() => expect(getByText('document.pdf')).toBeTruthy());

    fireEvent.press(getByLabelText('Clear'));
    expect(queryByText('document.pdf')).toBeNull();
    expect(getByText('Select file')).toBeTruthy();
    expect(onChange).toHaveBeenLastCalledWith(null);
  });
});
