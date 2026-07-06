import { forwardRef, useRef, useState } from 'react';
import { TextInput as RNTextInput } from 'react-native';
import { TextInput, type TextInputProps } from '../TextInput';
import { useComponentDefaultProps } from '../../theme/theme-provider';

export type MaskInputMask = string | Array<string | RegExp>;

export interface MaskInputTokens {
  [token: string]: {
    pattern: RegExp;
    transform?: (char: string) => string;
  };
}

export interface MaskInputProps
  extends Omit<TextInputProps, 'value' | 'defaultValue' | 'onChangeText'> {
  /** Mask pattern, e.g. "+1 (###) ###-####" or an array of literals/regexps */
  mask: MaskInputMask;

  /** Custom token definitions, merged with defaults (# digit, a letter, * alphanumeric) */
  tokens?: MaskInputTokens;

  /** Character used to render empty mask slots in the placeholder */
  slotChar?: string;

  /** Displays the mask skeleton as placeholder when the input is empty */
  showMask?: boolean;

  /** Clears the value on blur if the mask is not completely filled */
  autoClear?: boolean;

  /** Masked value for controlled component */
  value?: string;

  /** Default value for uncontrolled component */
  defaultValue?: string;

  /** Called with the masked value */
  onChangeText?: (masked: string) => void;

  /** Called with the raw (unmasked) and masked values */
  onChangeRaw?: (raw: string, masked: string) => void;

  /** Called when the mask is completely filled */
  onComplete?: (masked: string, raw: string) => void;
}

export const DEFAULT_MASK_TOKENS: MaskInputTokens = {
  '#': { pattern: /\d/ },
  a: { pattern: /[a-zA-Z]/ },
  '*': { pattern: /[a-zA-Z0-9]/ },
};

interface MaskSlot {
  literal?: string;
  pattern?: RegExp;
  transform?: (char: string) => string;
}

function compileMask(mask: MaskInputMask, tokens: MaskInputTokens): MaskSlot[] {
  if (Array.isArray(mask)) {
    return mask.map((entry) =>
      entry instanceof RegExp ? { pattern: entry } : { literal: entry }
    );
  }

  return mask.split('').map((char) => {
    const token = tokens[char];
    return token
      ? { pattern: token.pattern, transform: token.transform }
      : { literal: char };
  });
}

export function applyMask(
  input: string,
  mask: MaskInputMask,
  tokens: MaskInputTokens = DEFAULT_MASK_TOKENS
): { masked: string; raw: string; complete: boolean } {
  const slots = compileMask(mask, tokens);
  const chars = input.split('');
  let masked = '';
  let raw = '';
  let slotIndex = 0;

  while (slotIndex < slots.length && chars.length > 0) {
    const slot = slots[slotIndex]!;

    if (slot.literal !== undefined) {
      masked += slot.literal;
      if (chars[0] === slot.literal) {
        chars.shift();
      }
      slotIndex += 1;
      continue;
    }

    const char = chars.shift()!;
    const transformed = slot.transform ? slot.transform(char) : char;

    if (slot.pattern!.test(transformed)) {
      masked += transformed;
      raw += transformed;
      slotIndex += 1;
    }
  }

  // Without any accepted user input the mask skeleton should not be shown
  if (raw.length === 0) {
    masked = '';
  }

  const fillableSlots = slots.filter((slot) => slot.literal === undefined);
  const complete = fillableSlots.length > 0 && raw.length === fillableSlots.length;

  return { masked, raw, complete };
}

export function getMaskPlaceholder(
  mask: MaskInputMask,
  slotChar: string = '_',
  tokens: MaskInputTokens = DEFAULT_MASK_TOKENS
): string {
  return compileMask(mask, tokens)
    .map((slot) => (slot.literal !== undefined ? slot.literal : slotChar))
    .join('');
}

const defaultProps: Partial<MaskInputProps> = {
  slotChar: '_',
  showMask: false,
  autoClear: false,
};

/**
 * MaskInput formats user input according to a mask pattern as they type.
 * Port of Mantine MaskInput adapted for React Native.
 */
export const MaskInput = forwardRef<RNTextInput, MaskInputProps>(
  (props, ref) => {
    const {
      mask,
      tokens,
      slotChar,
      showMask,
      autoClear,
      value,
      defaultValue,
      onChangeText,
      onChangeRaw,
      onComplete,
      onBlur,
      placeholder,
      ...others
    } = useComponentDefaultProps('MaskInput', defaultProps, props);

    const mergedTokens = { ...DEFAULT_MASK_TOKENS, ...tokens };

    const [internalValue, setInternalValue] = useState(() =>
      defaultValue ? applyMask(defaultValue, mask, mergedTokens).masked : ''
    );
    const wasCompleteRef = useRef(false);

    const currentValue =
      value !== undefined
        ? applyMask(value, mask, mergedTokens).masked
        : internalValue;

    const handleChangeText = (next: string) => {
      const { masked, raw, complete } = applyMask(next, mask, mergedTokens);

      if (value === undefined) {
        setInternalValue(masked);
      }

      onChangeText?.(masked);
      onChangeRaw?.(raw, masked);

      if (complete && !wasCompleteRef.current) {
        onComplete?.(masked, raw);
      }
      wasCompleteRef.current = complete;
    };

    const handleBlur: TextInputProps['onBlur'] = (event) => {
      if (autoClear) {
        const { complete } = applyMask(currentValue, mask, mergedTokens);
        if (!complete && currentValue.length > 0) {
          if (value === undefined) {
            setInternalValue('');
          }
          onChangeText?.('');
          onChangeRaw?.('', '');
          wasCompleteRef.current = false;
        }
      }
      onBlur?.(event);
    };

    return (
      <TextInput
        {...others}
        ref={ref}
        value={currentValue}
        onChangeText={handleChangeText}
        onBlur={handleBlur}
        placeholder={
          placeholder ??
          (showMask ? getMaskPlaceholder(mask, slotChar, mergedTokens) : undefined)
        }
        autoCapitalize="none"
        autoCorrect={false}
      />
    );
  }
);

MaskInput.displayName = 'MaskInput';
