import React, { forwardRef, useState } from 'react';
import {
  Modal,
  ScrollView,
  TouchableOpacity,
  TextInput as RNTextInput,
} from 'react-native';
import { BoxView } from '../BoxView';
import { Text } from '../Text';
import { TextInput } from '../TextInput';
import type {
  DefaultProps,
  MantineColor,
  MantineNumberSize,
  MantineSize,
} from '../../theme/types';
import { useComponentDefaultProps } from '../../theme/theme-provider';
import { createStyles } from '../../theme';
import { rem } from '../../theme/utils/rem';

/**
 * Data item structure for Select component options
 *
 * @property {string} value - Unique value for the option
 * @property {string} label - Display label for the option
 * @property {boolean} [disabled] - Disables selection of this option
 * @property {string} [group] - Group name for organizing options
 */
export interface SelectDataItem {
  value: string;
  label: string;
  disabled?: boolean;
  group?: string;
}

/**
 * Props for the Select component
 *
 * @property {(string | SelectDataItem)[]} data - Array of select options (strings or objects)
 * @property {string} [value] - Currently selected value (controlled)
 * @property {string} [defaultValue] - Default value for uncontrolled component
 * @property {(value: string) => void} [onChange] - Callback fired when selection changes
 * @property {string} [placeholder] - Placeholder text when no value selected
 * @property {React.ReactNode} [label] - Label displayed above the select
 * @property {React.ReactNode} [description] - Description text below the label
 * @property {React.ReactNode} [error] - Error message displayed below the select
 * @property {MantineSize} [size] - Select size (xs, sm, md, lg, xl)
 * @property {MantineNumberSize} [radius] - Border radius from theme or custom value
 * @property {MantineColor} [color] - Highlight color for selected items
 * @property {boolean} [disabled] - Disables select interaction
 * @property {boolean} [searchable] - Enables search/filter functionality
 * @property {string} [searchPlaceholder] - Placeholder for search input
 * @property {boolean} [clearable] - Shows clear button to reset selection
 * @property {string} [clearButtonLabel] - Label for clear button
 * @property {number} [maxDropdownHeight] - Maximum height of dropdown in pixels
 * @property {React.ReactNode} [icon] - Icon displayed on the left side
 * @property {React.ReactNode} [rightSection] - Content displayed on the right side
 * @property {string} [accessibilityLabel] - Label for screen readers
 * @property {string} [accessibilityHint] - Hint for screen readers
 * @property {any} [style] - Additional style overrides
 */
export interface SelectProps extends DefaultProps {
  /** Select data */
  data: (string | SelectDataItem)[];

  /** Selected value */
  value?: string;

  /** Default value for uncontrolled component */
  defaultValue?: string;

  /** Called when value changes */
  onChange?: (value: string) => void;

  /** Placeholder */
  placeholder?: string;

  /** Select label */
  label?: React.ReactNode;

  /** Select description */
  description?: React.ReactNode;

  /** Error message */
  error?: React.ReactNode;

  /** Select size */
  size?: MantineSize;

  /** Border radius */
  radius?: MantineNumberSize;

  /** Select color */
  color?: MantineColor;

  /** If true, select will be disabled */
  disabled?: boolean;

  /** If true, select will be searchable */
  searchable?: boolean;

  /** Search placeholder */
  searchPlaceholder?: string;

  /** If true, clear button will be shown */
  clearable?: boolean;

  /** Clear button label */
  clearButtonLabel?: string;

  /** Max dropdown height */
  maxDropdownHeight?: number;

  /** Icon displayed on the left side */
  icon?: React.ReactNode;

  /** Right section */
  rightSection?: React.ReactNode;

  /** Accessibility label */
  accessibilityLabel?: string;

  /** Accessibility hint */
  accessibilityHint?: string;

  /** Additional styles */
  style?: any;
}

const useStyles = createStyles(
  (
    theme,
    { color }: { color: MantineColor; size: MantineSize }
  ) => {
    return {
      modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'flex-end',
      },
      modalContent: {
        backgroundColor:
          theme.colorScheme === 'dark' ? theme.fn.themeColor('dark', 7) : theme.white,
        borderTopLeftRadius: theme.radius.lg,
        borderTopRightRadius: theme.radius.lg,
        maxHeight: '80%',
      },
      searchContainer: {
        padding: theme.spacing.md,
        borderBottomWidth: 1,
        borderBottomColor:
          theme.colorScheme === 'dark'
            ? theme.fn.themeColor('dark', 4)
            : theme.fn.themeColor('gray', 2),
      },
      listContainer: {
        paddingVertical: rem(8) as any,
      },
      item: {
        paddingVertical: rem(12) as any,
        paddingHorizontal: theme.spacing.md,
        flexDirection: 'row',
        alignItems: 'center',
      },
      itemSelected: {
        backgroundColor:
          theme.colorScheme === 'dark'
            ? theme.fn.themeColor('dark', 5)
            : theme.fn.themeColor(color, 0),
      },
      itemDisabled: {
        opacity: 0.4,
      },
      itemText: {
        fontSize: rem(14) as any,
        color: theme.colorScheme === 'dark' ? theme.fn.themeColor('dark', 0) : theme.black,
      },
      itemTextSelected: {
        fontWeight: '600',
        color: theme.fn.themeColor(color, 6),
      },
      groupLabel: {
        paddingVertical: rem(8) as any,
        paddingHorizontal: theme.spacing.md,
        fontSize: rem(12) as any,
        fontWeight: '600',
        color:
          theme.colorScheme === 'dark'
            ? theme.fn.themeColor('dark', 2)
            : theme.fn.themeColor('gray', 6),
        textTransform: 'uppercase',
      },
      emptyState: {
        padding: theme.spacing.xl,
        alignItems: 'center',
      },
      emptyText: {
        color:
          theme.colorScheme === 'dark'
            ? theme.fn.themeColor('dark', 2)
            : theme.fn.themeColor('gray', 6),
      },
    };
  }
) as any;

const defaultProps: Partial<SelectProps> = {
  size: 'md',
  radius: 'sm',
  color: 'blue',
  disabled: false,
  searchable: false,
  clearable: false,
  maxDropdownHeight: 400,
  searchPlaceholder: 'Search...',
  clearButtonLabel: 'Clear',
};

const normalizeData = (data: (string | SelectDataItem)[]): SelectDataItem[] => {
  return data.map((item) =>
    typeof item === 'string' ? { value: item, label: item } : item
  );
};

/**
 * Select component for React Native Mantine
 *
 * A dropdown select component with support for searchable options, grouped items,
 * clearable selection, and customizable styling. Displays options in a modal
 * bottom sheet for native mobile experience.
 *
 * @example
 * ```tsx
 * // Basic select
 * <Select
 *   data={['React', 'Vue', 'Angular']}
 *   value={framework}
 *   onChange={setFramework}
 *   placeholder="Pick one"
 * />
 *
 * // Searchable select with groups
 * <Select
 *   label="Country"
 *   searchable
 *   clearable
 *   data={[
 *     { value: 'us', label: 'United States', group: 'North America' },
 *     { value: 'ca', label: 'Canada', group: 'North America' },
 *     { value: 'uk', label: 'United Kingdom', group: 'Europe' }
 *   ]}
 *   value={country}
 *   onChange={setCountry}
 * />
 *
 * // With icon and description
 * <Select
 *   label="Language"
 *   description="Choose your preferred language"
 *   icon={<LanguageIcon />}
 *   data={languages}
 *   value={language}
 *   onChange={setLanguage}
 * />
 * ```
 */
export const Select = forwardRef<RNTextInput, SelectProps>((props, ref) => {
  const {
    data,
    value: controlledValue,
    defaultValue,
    onChange,
    placeholder,
    label,
    description,
    error,
    size,
    radius,
    color,
    disabled,
    searchable,
    searchPlaceholder,
    clearable,
    clearButtonLabel,
    maxDropdownHeight,
    icon,
    rightSection,
    accessibilityLabel,
    accessibilityHint,
    style,
    ...others
  } = useComponentDefaultProps('Select', defaultProps, props);

  const [opened, setOpened] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [value, setValue] = useState(defaultValue || '');

  const { styles } = useStyles({ color, size }, { name: 'Select' }) as any;

  const isControlled = controlledValue !== undefined;
  const currentValue = isControlled ? controlledValue : value;

  const normalizedData = normalizeData(data);
  const selectedItem = normalizedData.find((item) => item.value === currentValue);

  const filteredData = searchable
    ? normalizedData.filter((item) =>
        item.label.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : normalizedData;

  const handleSelect = (itemValue: string) => {
    if (!isControlled) {
      setValue(itemValue);
    }
    onChange?.(itemValue);
    setOpened(false);
    setSearchQuery('');
  };

  const handleClear = () => {
    if (!isControlled) {
      setValue('');
    }
    onChange?.('');
  };

  const groupedData: { [key: string]: SelectDataItem[] } = {};
  let ungroupedItems: SelectDataItem[] = [];

  filteredData.forEach((item) => {
    if (item.group) {
      if (!groupedData[item.group]) {
        groupedData[item.group] = [];
      }
      groupedData[item.group]!.push(item);
    } else {
      ungroupedItems.push(item);
    }
  });

  const defaultAccessibilityLabel =
    accessibilityLabel || (typeof label === 'string' ? label : 'Select');

  return (
    <>
      <TextInput
        ref={ref}
        label={label}
        description={description}
        error={error}
        size={size}
        radius={radius}
        icon={icon}
        rightSection={rightSection}
        value={selectedItem?.label || ''}
        placeholder={placeholder}
        editable={!disabled}
        onPress={() => !disabled && setOpened(true)}
        style={style}
        accessibilityRole="button"
        accessibilityState={{ expanded: opened, disabled: !!disabled }}
        accessibilityLabel={defaultAccessibilityLabel}
        accessibilityHint={accessibilityHint}
        {...others}
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
            style={styles.modalContent}
            accessible={false}
          >
            {searchable && (
              <BoxView style={styles.searchContainer}>
                <TextInput
                  placeholder={searchPlaceholder}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.nativeEvent.text)}
                  autoFocus
                />
              </BoxView>
            )}

            <ScrollView
              style={{ maxHeight: maxDropdownHeight }}
              contentContainerStyle={styles.listContainer}
            >
              {clearable && currentValue && (
                <TouchableOpacity
                  style={styles.item}
                  onPress={handleClear}
                  accessibilityRole="button"
                  accessibilityLabel={clearButtonLabel}
                >
                  <Text style={styles.itemText}>{clearButtonLabel}</Text>
                </TouchableOpacity>
              )}

              {ungroupedItems.map((item) => (
                <TouchableOpacity
                  key={item.value}
                  style={[
                    styles.item,
                    currentValue === item.value && styles.itemSelected,
                    item.disabled && styles.itemDisabled,
                  ]}
                  onPress={() => !item.disabled && handleSelect(item.value)}
                  disabled={item.disabled}
                  accessibilityRole="menuitem"
                  accessibilityState={{
                    selected: currentValue === item.value,
                    disabled: !!item.disabled,
                  }}
                  accessibilityLabel={item.label}
                >
                  <Text
                    style={[
                      styles.itemText,
                      currentValue === item.value && styles.itemTextSelected,
                    ]}
                  >
                    {item.label}
                  </Text>
                </TouchableOpacity>
              ))}

              {Object.keys(groupedData).map((group) => (
                <React.Fragment key={group}>
                  <Text style={styles.groupLabel}>{group}</Text>
                  {(groupedData[group] || []).map((item) => (
                    <TouchableOpacity
                      key={item.value}
                      style={[
                        styles.item,
                        currentValue === item.value && styles.itemSelected,
                        item.disabled && styles.itemDisabled,
                      ]}
                      onPress={() => !item.disabled && handleSelect(item.value)}
                      disabled={item.disabled}
                      accessibilityRole="menuitem"
                      accessibilityState={{
                        selected: currentValue === item.value,
                        disabled: !!item.disabled,
                      }}
                      accessibilityLabel={item.label}
                    >
                      <Text
                        style={[
                          styles.itemText,
                          currentValue === item.value && styles.itemTextSelected,
                        ]}
                      >
                        {item.label}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </React.Fragment>
              ))}

              {filteredData.length === 0 && (
                <BoxView style={styles.emptyState}>
                  <Text style={styles.emptyText}>No options found</Text>
                </BoxView>
              )}
            </ScrollView>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    </>
  );
});

Select.displayName = 'Select';
