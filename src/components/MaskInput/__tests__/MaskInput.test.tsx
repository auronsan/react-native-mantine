import React from 'react';
import { TextInput as RNTextInput } from 'react-native';
import { render, screen, fireEvent } from '../../../__tests__/test-utils';
import {
  MaskInput,
  applyMask,
  getMaskPlaceholder,
  DEFAULT_MASK_TOKENS,
} from '../index';

describe('applyMask', () => {
  it('formats digits with a string mask', () => {
    expect(applyMask('5551234567', '(###) ###-####')).toEqual({
      masked: '(555) 123-4567',
      raw: '5551234567',
      complete: true,
    });
  });

  it('marks partial input as incomplete', () => {
    expect(applyMask('55', '(###) ###')).toEqual({
      masked: '(55',
      raw: '55',
      complete: false,
    });
  });

  it('skips characters that do not match the slot pattern', () => {
    expect(applyMask('a1b2', '##')).toEqual({
      masked: '12',
      raw: '12',
      complete: true,
    });
  });

  it('consumes typed literals that match the mask literal', () => {
    expect(applyMask('12/31', '##/##').masked).toBe('12/31');
    expect(applyMask('1231', '##/##').masked).toBe('12/31');
  });

  it('returns empty masked value when no input was accepted', () => {
    expect(applyMask('abc', '(###)')).toEqual({
      masked: '',
      raw: '',
      complete: false,
    });
    expect(applyMask('', '##')).toEqual({
      masked: '',
      raw: '',
      complete: false,
    });
  });

  it('supports array masks with literals and regexps', () => {
    expect(applyMask('ab12', ['A', /[a-z]/, '-', /\d/, /\d/])).toEqual({
      masked: 'Aa-12',
      raw: 'a12',
      complete: true,
    });
  });

  it('supports custom tokens with transform', () => {
    const tokens = {
      ...DEFAULT_MASK_TOKENS,
      A: { pattern: /[A-Z]/, transform: (c: string) => c.toUpperCase() },
    };
    expect(applyMask('ab', 'AA', tokens)).toEqual({
      masked: 'AB',
      raw: 'AB',
      complete: true,
    });
  });

  it('supports letter and alphanumeric default tokens', () => {
    expect(applyMask('x9', 'a*').masked).toBe('x9');
    expect(applyMask('9x', 'a*').masked).toBe('x');
  });

  it('is never complete for a mask with only literals', () => {
    expect(applyMask('--', '--').complete).toBe(false);
  });
});

describe('getMaskPlaceholder', () => {
  it('builds a placeholder from the mask', () => {
    expect(getMaskPlaceholder('(###) ###')).toBe('(___) ___');
    expect(getMaskPlaceholder('##/##', '*')).toBe('**/**');
    expect(getMaskPlaceholder([/\d/, '-', /\d/], '#')).toBe('#-#');
  });
});

describe('MaskInput', () => {
  it('renders with placeholder and testID', () => {
    render(<MaskInput mask="##" placeholder="Code" testID="mask-input" />);
    expect(screen.getByTestId('mask-input')).toBeTruthy();
    expect(screen.getByPlaceholderText('Code')).toBeTruthy();
    expect(screen.getByTestId('mask-input').props.autoCapitalize).toBe('none');
    expect(screen.getByTestId('mask-input').props.autoCorrect).toBe(false);
  });

  it('renders label, description, error and required from TextInput', () => {
    render(
      <MaskInput
        mask="##"
        label="Phone"
        description="Your number"
        error="Invalid"
        required
      />
    );
    expect(screen.getByText(/Phone/)).toBeTruthy();
    expect(screen.getByText('Your number')).toBeTruthy();
    expect(screen.getByText('Invalid')).toBeTruthy();
    expect(screen.getByText(/\*/)).toBeTruthy();
    expect(screen.getByLabelText('Phone')).toBeTruthy();
  });

  it('formats typed value (uncontrolled) and reports masked/raw values', () => {
    const onChangeText = jest.fn();
    const onChangeRaw = jest.fn();
    render(
      <MaskInput
        mask="+1 (###) ###-####"
        testID="input"
        onChangeText={onChangeText}
        onChangeRaw={onChangeRaw}
      />
    );

    fireEvent.changeText(screen.getByTestId('input'), '5551234567');

    expect(onChangeText).toHaveBeenLastCalledWith('+1 (555) 123-4567');
    expect(onChangeRaw).toHaveBeenLastCalledWith(
      '5551234567',
      '+1 (555) 123-4567'
    );
    expect(screen.getByTestId('input').props.value).toBe('+1 (555) 123-4567');
  });

  it('applies mask to defaultValue', () => {
    render(<MaskInput mask="##/##" defaultValue="1231" testID="input" />);
    expect(screen.getByTestId('input').props.value).toBe('12/31');
  });

  it('works as a controlled component', () => {
    const onChangeText = jest.fn();
    const { rerender } = render(
      <MaskInput
        mask="##-##"
        value="12"
        testID="input"
        onChangeText={onChangeText}
      />
    );
    expect(screen.getByTestId('input').props.value).toBe('12');

    fireEvent.changeText(screen.getByTestId('input'), '1234');
    expect(onChangeText).toHaveBeenCalledWith('12-34');
    // value is controlled, so it does not change until parent updates it
    expect(screen.getByTestId('input').props.value).toBe('12');

    rerender(
      <MaskInput
        mask="##-##"
        value="1234"
        testID="input"
        onChangeText={onChangeText}
      />
    );
    expect(screen.getByTestId('input').props.value).toBe('12-34');
  });

  it('calls onComplete once when the mask is filled', () => {
    const onComplete = jest.fn();
    render(<MaskInput mask="##/##" testID="input" onComplete={onComplete} />);
    const input = screen.getByTestId('input');

    fireEvent.changeText(input, '123');
    expect(onComplete).not.toHaveBeenCalled();

    fireEvent.changeText(input, '1231');
    expect(onComplete).toHaveBeenCalledTimes(1);
    expect(onComplete).toHaveBeenCalledWith('12/31', '1231');

    // Still complete, should not fire again
    fireEvent.changeText(input, '12/31');
    expect(onComplete).toHaveBeenCalledTimes(1);

    // Becomes incomplete then complete again -> fires again
    fireEvent.changeText(input, '12');
    fireEvent.changeText(input, '1231');
    expect(onComplete).toHaveBeenCalledTimes(2);
  });

  it('shows the mask skeleton as placeholder with showMask and slotChar', () => {
    const { rerender } = render(<MaskInput mask="##-##" showMask />);
    expect(screen.getByPlaceholderText('__-__')).toBeTruthy();

    rerender(<MaskInput mask="##-##" showMask slotChar="#" />);
    expect(screen.getByPlaceholderText('##-##')).toBeTruthy();
  });

  it('prefers an explicit placeholder over showMask', () => {
    render(<MaskInput mask="##-##" showMask placeholder="Custom" />);
    expect(screen.getByPlaceholderText('Custom')).toBeTruthy();
    expect(screen.queryByPlaceholderText('__-__')).toBeNull();
  });

  it('has no placeholder when neither showMask nor placeholder is set', () => {
    render(<MaskInput mask="##" testID="input" />);
    expect(screen.getByTestId('input').props.placeholder).toBeUndefined();
  });

  it('uses custom tokens', () => {
    const onChangeText = jest.fn();
    render(
      <MaskInput
        mask="AA-##"
        tokens={{
          A: { pattern: /[A-Z]/, transform: (c) => c.toUpperCase() },
        }}
        testID="input"
        onChangeText={onChangeText}
      />
    );
    fireEvent.changeText(screen.getByTestId('input'), 'ab12');
    expect(onChangeText).toHaveBeenLastCalledWith('AB-12');
  });

  it('clears incomplete value on blur with autoClear (uncontrolled)', () => {
    const onChangeText = jest.fn();
    const onChangeRaw = jest.fn();
    const onBlur = jest.fn();
    render(
      <MaskInput
        mask="##/##"
        autoClear
        testID="input"
        onChangeText={onChangeText}
        onChangeRaw={onChangeRaw}
        onBlur={onBlur}
      />
    );
    const input = screen.getByTestId('input');

    fireEvent.changeText(input, '12');
    expect(screen.getByTestId('input').props.value).toBe('12');

    fireEvent(input, 'blur');
    expect(screen.getByTestId('input').props.value).toBe('');
    expect(onChangeText).toHaveBeenLastCalledWith('');
    expect(onChangeRaw).toHaveBeenLastCalledWith('', '');
    expect(onBlur).toHaveBeenCalledTimes(1);
  });

  it('keeps complete value on blur with autoClear', () => {
    const onChangeText = jest.fn();
    render(
      <MaskInput
        mask="##/##"
        autoClear
        testID="input"
        onChangeText={onChangeText}
      />
    );
    const input = screen.getByTestId('input');
    fireEvent.changeText(input, '1231');
    fireEvent(input, 'blur');
    expect(screen.getByTestId('input').props.value).toBe('12/31');
    expect(onChangeText).toHaveBeenCalledTimes(1);
  });

  it('does nothing on blur with autoClear when value is empty', () => {
    const onChangeText = jest.fn();
    render(
      <MaskInput
        mask="##/##"
        autoClear
        testID="input"
        onChangeText={onChangeText}
      />
    );
    fireEvent(screen.getByTestId('input'), 'blur');
    expect(onChangeText).not.toHaveBeenCalled();
  });

  it('notifies parent on blur with autoClear when controlled', () => {
    const onChangeText = jest.fn();
    render(
      <MaskInput
        mask="##/##"
        autoClear
        value="12"
        testID="input"
        onChangeText={onChangeText}
      />
    );
    fireEvent(screen.getByTestId('input'), 'blur');
    expect(onChangeText).toHaveBeenCalledWith('');
    // Controlled value stays until parent updates it
    expect(screen.getByTestId('input').props.value).toBe('12');
  });

  it('calls onBlur without autoClear', () => {
    const onBlur = jest.fn();
    render(<MaskInput mask="##" testID="input" onBlur={onBlur} />);
    fireEvent(screen.getByTestId('input'), 'blur');
    expect(onBlur).toHaveBeenCalledTimes(1);
  });

  it('passes disabled state through to the input', () => {
    render(<MaskInput mask="##" testID="input" editable={false} />);
    expect(screen.getByTestId('input').props.editable).toBe(false);
  });

  it('accepts a ref', () => {
    const ref = React.createRef<RNTextInput>();
    expect(() =>
      render(<MaskInput mask="##" ref={ref} testID="input" />)
    ).not.toThrow();
  });

  it('has a displayName', () => {
    expect(MaskInput.displayName).toBe('MaskInput');
  });
});
