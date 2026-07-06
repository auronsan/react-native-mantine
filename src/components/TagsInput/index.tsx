import React, { forwardRef, useState } from 'react';
import {
  ScrollView,
  TouchableOpacity,
  View,
  type TextInput as RNTextInput,
  type NativeSyntheticEvent,
  type TextInputKeyPressEventData,
} from 'react-native';
import { BoxView } from '../BoxView';
import { Text } from '../Text';
import { Pill } from '../Pill';
import { PillsInput, PillsInputField } from '../PillsInput';
import type {
  DefaultProps,
  MantineNumberSize,
  MantineSize,
} from '../../theme/types';
import { useComponentDefaultProps } from '../../theme/theme-provider';
import { createStyles } from '../../theme';
import { rem } from '../../theme/utils/rem';

export interface TagsInputProps extends DefaultProps {
  /** Suggestions displayed in the dropdown */
  data?: string[];

  /** Controlled value */
  value?: string[];

  /** Default value for uncontrolled component */
  defaultValue?: string[];

  /** Called when value changes */
  onChange?: (value: string[]) => void;

  /** Controlled search value */
  searchValue?: string;

  /** Default search value */
  defaultSearchValue?: string;

  /** Called when search value changes */
  onSearchChange?: (value: string) => void;

  /** Maximum number of tags */
  maxTags?: number;

  /** Determines whether duplicate tags are allowed */
  allowDuplicates?: boolean;

  /** Called when user tries to submit a duplicated tag */
  onDuplicate?: (value: string) => void;

  /** Characters that trigger tag split */
  splitChars?: string[];

  /** Determines whether the clear button is displayed */
  clearable?: boolean;

  /** Called when the clear button is pressed */
  onClear?: () => void;

  /** If set, the value is accepted when the field loses focus */
  acceptValueOnBlur?: boolean;

  /** Input label */
  label?: React.ReactNode;

  /** Input description */
  description?: React.ReactNode;

  /** Error message */
  error?: React.ReactNode;

  /** Field placeholder */
  placeholder?: string;

  /** Controls input height and font size */
  size?: MantineSize;

  /** Key of theme.radius or any valid value to set border-radius */
  radius?: MantineNumberSize;

  /** Input variant */
  variant?: 'default' | 'filled' | 'unstyled';

  /** Displays required asterisk */
  required?: boolean;

  /** If set, input is disabled */
  disabled?: boolean;

  /** Maximum height of the suggestions list */
  maxDropdownHeight?: number;

  /** Message displayed when no suggestions match the search */
  nothingFoundMessage?: React.ReactNode;
}

const useStyles = createStyles((theme) => ({
  dropdown: {
    marginTop: rem(4),
    borderWidth: 1,
    borderColor:
      theme.colorScheme === 'dark'
        ? theme.fn.themeColor('dark', 4)
        : theme.fn.themeColor('gray', 3),
    borderRadius: theme.fn.radius('sm') as number,
    backgroundColor:
      theme.colorScheme === 'dark'
        ? theme.fn.themeColor('dark', 6)
        : theme.white,
    overflow: 'hidden',
  },
  option: {
    paddingHorizontal: rem(12),
    paddingVertical: rem(8),
  },
  optionLabel: {
    fontSize: theme.fontSizes.sm as number,
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
  },
  nothingFound: {
    paddingHorizontal: rem(12),
    paddingVertical: rem(8),
    fontSize: theme.fontSizes.sm as number,
    color: theme.fn.dimmed(),
    textAlign: 'center',
  },
  clearButton: {
    alignSelf: 'center',
    paddingHorizontal: rem(6),
  },
  clearButtonLabel: {
    fontSize: theme.fontSizes.md as number,
    color: theme.fn.dimmed(),
  },
}));

const defaultProps: Partial<TagsInputProps> = {
  data: [],
  splitChars: [','],
  allowDuplicates: false,
  acceptValueOnBlur: true,
  clearable: false,
  size: 'sm',
  radius: 'sm',
  variant: 'default',
  maxDropdownHeight: 200,
};

/**
 * TagsInput captures a list of free-form tags with optional suggestions.
 * Port of Mantine v7 TagsInput component.
 */
export const TagsInput = forwardRef<RNTextInput, TagsInputProps>(
  (props, ref) => {
    const {
      data,
      value: controlledValue,
      defaultValue,
      onChange,
      searchValue: controlledSearch,
      defaultSearchValue,
      onSearchChange,
      maxTags,
      allowDuplicates,
      onDuplicate,
      splitChars,
      clearable,
      onClear,
      acceptValueOnBlur,
      label,
      description,
      error,
      placeholder,
      size,
      radius,
      variant,
      required,
      disabled,
      maxDropdownHeight,
      nothingFoundMessage,
      style,
      ...others
    } = useComponentDefaultProps('TagsInput', defaultProps, props);

    const [uncontrolledValue, setUncontrolledValue] = useState<string[]>(
      defaultValue || []
    );
    const [uncontrolledSearch, setUncontrolledSearch] = useState(
      defaultSearchValue || ''
    );
    const [focused, setFocused] = useState(false);

    const tags =
      controlledValue !== undefined ? controlledValue : uncontrolledValue;
    const search =
      controlledSearch !== undefined ? controlledSearch : uncontrolledSearch;

    const { styles } = useStyles({}, { name: 'TagsInput' });

    const setTags = (next: string[]) => {
      if (controlledValue === undefined) {
        setUncontrolledValue(next);
      }
      onChange?.(next);
    };

    const setSearch = (next: string) => {
      if (controlledSearch === undefined) {
        setUncontrolledSearch(next);
      }
      onSearchChange?.(next);
    };

    const addTags = (rawValues: string[]) => {
      let next = [...tags];

      for (const raw of rawValues) {
        const tag = raw.trim();
        if (tag.length === 0) {
          continue;
        }

        if (maxTags !== undefined && next.length >= maxTags) {
          break;
        }

        const isDuplicate = next.some(
          (existing) => existing.toLowerCase() === tag.toLowerCase()
        );

        if (isDuplicate && !allowDuplicates) {
          onDuplicate?.(tag);
          continue;
        }

        next = [...next, tag];
      }

      if (next.length !== tags.length) {
        setTags(next);
      }
      setSearch('');
    };

    const handleSearchChange = (text: string) => {
      const chars = splitChars || [];
      const hasSplitChar = chars.some((char) => text.includes(char));

      if (hasSplitChar) {
        const escaped = chars.map((char) =>
          char.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
        );
        const parts = text.split(new RegExp(`[${escaped.join('')}]`));
        const remainder = parts.pop() || '';
        addTags(parts);
        setSearch(remainder);
        return;
      }

      setSearch(text);
    };

    const handleSubmit = () => {
      if (search.trim().length > 0) {
        addTags([search]);
      }
    };

    const handleKeyPress = (
      event: NativeSyntheticEvent<TextInputKeyPressEventData>
    ) => {
      if (
        event.nativeEvent.key === 'Backspace' &&
        search.length === 0 &&
        tags.length > 0
      ) {
        setTags(tags.slice(0, -1));
      }
    };

    const handleRemove = (index: number) => {
      setTags(tags.filter((_, i) => i !== index));
    };

    const handleClear = () => {
      setTags([]);
      setSearch('');
      onClear?.();
    };

    const filteredSuggestions = (data || []).filter((item) => {
      const matchesSearch = item
        .toLowerCase()
        .includes(search.toLowerCase().trim());
      const isSelected = tags.some(
        (tag) => tag.toLowerCase() === item.toLowerCase()
      );
      return matchesSearch && (!isSelected || allowDuplicates);
    });

    const showDropdown =
      focused && (data || []).length > 0 && !disabled;

    return (
      <View style={style as any}>
        <PillsInput
          label={label}
          description={description}
          error={error}
          size={size}
          radius={radius}
          variant={variant}
          required={required}
          disabled={disabled}
          {...others}
        >
          {tags.map((tag, index) => (
            <Pill
              key={`${tag}-${index}`}
              size={size}
              disabled={disabled}
              withRemoveButton={!disabled}
              onRemove={() => handleRemove(index)}
            >
              {tag}
            </Pill>
          ))}

          <PillsInputField
            ref={ref}
            placeholder={placeholder}
            value={search}
            onChangeText={handleSearchChange}
            onSubmitEditing={handleSubmit}
            onKeyPress={handleKeyPress}
            onFocus={() => setFocused(true)}
            onBlur={() => {
              setFocused(false);
              if (acceptValueOnBlur) {
                handleSubmit();
              }
            }}
            blurOnSubmit={false}
            editable={!disabled}
          />

          {clearable && tags.length > 0 && !disabled && (
            <TouchableOpacity
              style={styles.clearButton}
              onPress={handleClear}
              accessibilityRole="button"
              accessibilityLabel="Clear"
            >
              <Text style={styles.clearButtonLabel}>×</Text>
            </TouchableOpacity>
          )}
        </PillsInput>

        {showDropdown && (
          <BoxView style={styles.dropdown}>
            <ScrollView
              style={{ maxHeight: maxDropdownHeight }}
              keyboardShouldPersistTaps="handled"
              nestedScrollEnabled
            >
              {filteredSuggestions.map((item) => (
                <TouchableOpacity
                  key={item}
                  style={styles.option}
                  onPress={() => addTags([item])}
                  accessibilityRole="button"
                  accessibilityLabel={item}
                >
                  <Text style={styles.optionLabel}>{item}</Text>
                </TouchableOpacity>
              ))}
              {filteredSuggestions.length === 0 && nothingFoundMessage && (
                <Text style={styles.nothingFound}>{nothingFoundMessage}</Text>
              )}
            </ScrollView>
          </BoxView>
        )}
      </View>
    );
  }
);

TagsInput.displayName = 'TagsInput';
