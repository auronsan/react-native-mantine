import { forwardRef, useState } from 'react';
import {
  Modal,
  TouchableOpacity,
  TextInput as RNTextInput,
} from 'react-native';
import { BoxView } from '../BoxView';
import { ColorSwatch } from '../ColorSwatch';
import { TextInput, type TextInputProps } from '../TextInput';
import {
  ColorPicker,
  formatColor,
  parseColor,
  type ColorFormat,
} from '../ColorPicker';
import { useComponentDefaultProps } from '../../theme/theme-provider';
import { createStyles } from '../../theme';

export interface ColorInputProps
  extends Omit<
    TextInputProps,
    'value' | 'defaultValue' | 'onChange' | 'onChangeText' | 'icon'
  > {
  /** Color value for controlled component */
  value?: string;

  /** Default value for uncontrolled component */
  defaultValue?: string;

  /** Called when the color changes */
  onChange?: (value: string) => void;

  /** Called when the user stops interacting with the picker */
  onChangeEnd?: (value: string) => void;

  /** Color format, 'hex' by default */
  format?: ColorFormat;

  /** Determines whether the color picker should be displayed in the dropdown */
  withPicker?: boolean;

  /** Determines whether the current color preview swatch should be displayed on the left */
  withPreview?: boolean;

  /** Prevents typing, the dropdown opens when the input is pressed */
  disallowInput?: boolean;

  /** Reverts to the last valid value on blur when the typed value is invalid */
  fixOnBlur?: boolean;

  /** Predefined colors displayed as swatches in the dropdown */
  swatches?: string[];

  /** Number of swatches per row */
  swatchesPerRow?: number;

  /** Closes the dropdown when a swatch is pressed */
  closeOnColorSwatchClick?: boolean;

  /** Accessibility label of the button that opens the dropdown */
  pickerButtonLabel?: string;

  /** Disables the input and the dropdown */
  disabled?: boolean;
}

const useStyles = createStyles((theme) => ({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor:
      theme.colorScheme === 'dark'
        ? theme.fn.themeColor('dark', 7)
        : theme.white,
    borderTopLeftRadius: theme.radius.lg,
    borderTopRightRadius: theme.radius.lg,
    padding: theme.spacing.md,
    alignItems: 'center',
  },
}));

const defaultProps: Partial<ColorInputProps> = {
  format: 'hex',
  withPicker: true,
  withPreview: true,
  disallowInput: false,
  fixOnBlur: true,
  swatchesPerRow: 7,
  closeOnColorSwatchClick: false,
  pickerButtonLabel: 'Open color picker',
};

/**
 * ColorInput is a text input for color values with a color picker dropdown.
 * Port of Mantine ColorInput; the dropdown is rendered as a bottom sheet.
 */
export const ColorInput = forwardRef<RNTextInput, ColorInputProps>(
  (props, ref) => {
    const {
      value,
      defaultValue,
      onChange,
      onChangeEnd,
      format,
      withPicker,
      withPreview,
      disallowInput,
      fixOnBlur,
      swatches,
      swatchesPerRow,
      closeOnColorSwatchClick,
      pickerButtonLabel,
      disabled,
      onBlur,
      rightSection,
      ...others
    } = useComponentDefaultProps('ColorInput', defaultProps, props);

    const { styles } = useStyles({}, { name: 'ColorInput' });

    const [internalValue, setInternalValue] = useState(defaultValue ?? '');
    const [lastValid, setLastValid] = useState(() =>
      parseColor(defaultValue ?? value ?? '') ? (defaultValue ?? value ?? '') : ''
    );
    const [opened, setOpened] = useState(false);

    const currentValue = value !== undefined ? value : internalValue;

    const setValue = (next: string) => {
      if (value === undefined) {
        setInternalValue(next);
      }
      if (parseColor(next)) {
        setLastValid(next);
      }
      onChange?.(next);
    };

    const handleChangeText = (next: string) => {
      setValue(next);
    };

    const handleBlur: TextInputProps['onBlur'] = (event) => {
      if (fixOnBlur && !parseColor(currentValue)) {
        setValue(lastValid);
      }
      onBlur?.(event);
    };

    const parsed = parseColor(currentValue);
    const previewColor = parsed
      ? formatColor(parsed, 'rgba')
      : parseColor(lastValid)
        ? formatColor(parseColor(lastValid)!, 'rgba')
        : 'transparent';

    return (
      <>
        <TextInput
          {...others}
          ref={ref}
          value={currentValue}
          onChangeText={handleChangeText}
          onBlur={handleBlur}
          editable={!disabled && !disallowInput}
          onPress={
            disallowInput && !disabled ? () => setOpened(true) : undefined
          }
          autoCapitalize="none"
          autoCorrect={false}
          icon={
            withPreview ? (
              <ColorSwatch color={previewColor} size={20} />
            ) : undefined
          }
          rightSection={
            rightSection ??
            (!disabled ? (
              <TouchableOpacity
                onPress={() => setOpened(true)}
                accessibilityRole="button"
                accessibilityLabel={pickerButtonLabel}
              >
                <ColorSwatch color={previewColor} size={20} />
              </TouchableOpacity>
            ) : undefined)
          }
        />

        <Modal
          visible={opened}
          transparent
          animationType="slide"
          onRequestClose={() => setOpened(false)}
        >
          <TouchableOpacity
            activeOpacity={1}
            style={styles.modalOverlay}
            onPress={() => setOpened(false)}
            accessible={false}
          >
            <TouchableOpacity
              activeOpacity={1}
              style={styles.modalContent as any}
              accessible={false}
            >
              <BoxView>
                <ColorPicker
                  value={parsed ? currentValue : lastValid || '#ffffff'}
                  format={format}
                  withPicker={withPicker}
                  swatches={swatches}
                  swatchesPerRow={swatchesPerRow}
                  onChange={(next) => setValue(next)}
                  onChangeEnd={(next) => onChangeEnd?.(next)}
                  onColorSwatchClick={() => {
                    if (closeOnColorSwatchClick) {
                      setOpened(false);
                    }
                  }}
                />
              </BoxView>
            </TouchableOpacity>
          </TouchableOpacity>
        </Modal>
      </>
    );
  }
);

ColorInput.displayName = 'ColorInput';
