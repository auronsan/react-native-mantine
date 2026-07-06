import React, { forwardRef, useState } from 'react';
import { View } from 'react-native';
import { Text } from '../Text';
import { CloseButton } from '../CloseButton';
import { InputBase, type InputBaseProps } from '../InputBase';
import { pickFiles, type PickedFile } from '../FileButton';
import { useComponentDefaultProps, useTheme } from '../../theme/theme-provider';

export type FileInputValue<Multiple extends boolean = false> =
  Multiple extends true ? PickedFile[] : PickedFile | null;

export interface FileInputProps<Multiple extends boolean = false>
  extends Omit<InputBaseProps, 'children' | 'onPress'> {
  /** Value for controlled component */
  value?: FileInputValue<Multiple>;

  /** Default value for uncontrolled component */
  defaultValue?: FileInputValue<Multiple>;

  /** Called when the selection changes */
  onChange?: (value: FileInputValue<Multiple>) => void;

  /** Determines whether user can pick more than one file */
  multiple?: Multiple;

  /** Mime type(s) of the files that can be picked */
  accept?: string | string[];

  /** Displayed when no file is selected */
  placeholder?: string;

  /** Adds a clear button to the right section when a file is selected */
  clearable?: boolean;

  /** Clear button accessibility label */
  clearButtonLabel?: string;

  /** Custom component to render the selected value */
  valueComponent?: (payload: {
    value: FileInputValue<Multiple>;
  }) => React.ReactNode;
}

const defaultProps: Partial<FileInputProps<boolean>> = {
  clearable: false,
  clearButtonLabel: 'Clear',
};

function formatValue(value: PickedFile[] | PickedFile | null): string {
  if (!value) {
    return '';
  }

  if (Array.isArray(value)) {
    return value.map((file) => file.name).join(', ');
  }

  return value.name;
}

/**
 * FileInput opens the native document picker when pressed and displays the
 * selected file names inside a standard input frame. Port of Mantine
 * FileInput, backed by expo-document-picker.
 */
export const FileInput = forwardRef<View, FileInputProps<boolean>>(
  (props, ref) => {
    const {
      value,
      defaultValue,
      onChange,
      multiple,
      accept,
      placeholder,
      clearable,
      clearButtonLabel,
      valueComponent,
      disabled,
      rightSection,
      accessibilityLabel,
      ...others
    } = useComponentDefaultProps('FileInput', defaultProps as any, props);

    const theme = useTheme();

    const [internalValue, setInternalValue] = useState<
      PickedFile[] | PickedFile | null
    >(defaultValue ?? (multiple ? [] : null));

    const currentValue = value !== undefined ? value : internalValue;
    const hasValue = Array.isArray(currentValue)
      ? currentValue.length > 0
      : currentValue !== null;

    const setValue = (next: PickedFile[] | PickedFile | null) => {
      if (value === undefined) {
        setInternalValue(next);
      }
      onChange?.(next);
    };

    const handlePress = async () => {
      const files = await pickFiles({ multiple: !!multiple, accept });
      if (files) {
        setValue(multiple ? files : (files[0] ?? null));
      }
    };

    const handleClear = () => {
      setValue(multiple ? [] : null);
    };

    const displayText = formatValue(currentValue);

    return (
      <InputBase
        ref={ref}
        onPress={handlePress}
        disabled={disabled}
        accessibilityLabel={accessibilityLabel}
        rightSection={
          rightSection ??
          (clearable && hasValue && !disabled ? (
            <CloseButton
              onPress={handleClear}
              accessibilityLabel={clearButtonLabel}
            />
          ) : undefined)
        }
        {...others}
      >
        {hasValue ? (
          valueComponent ? (
            valueComponent({ value: currentValue })
          ) : (
            <Text numberOfLines={1}>{displayText}</Text>
          )
        ) : (
          <Text numberOfLines={1} style={{ color: theme.fn.dimmed() }}>
            {placeholder ?? ''}
          </Text>
        )}
      </InputBase>
    );
  }
) as unknown as (<Multiple extends boolean = false>(
  props: FileInputProps<Multiple> & { ref?: React.Ref<View> }
) => React.ReactElement) & { displayName?: string };

FileInput.displayName = 'FileInput';
