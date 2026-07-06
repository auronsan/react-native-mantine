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
 * Represents a data item in the Autocomplete suggestions
 *
 * @property {string} value - The actual value of the item
 * @property {string} [label] - Display label for the item. If not provided, value is used
 * @property {boolean} [disabled] - Whether the item can be selected
 * @property {string} [group] - Group name for grouping items together
 */
export interface AutocompleteDataItem {
  value: string;
  label?: string;
  disabled?: boolean;
  group?: string;
}

/**
 * Filter function type for Autocomplete
 *
 * @param {string} value - Current input value
 * @param {AutocompleteDataItem} item - Item to filter
 * @returns {boolean} True if item should be shown
 */
export type AutocompleteFilterFunction = (value: string, item: AutocompleteDataItem) => boolean;

/**
 * Props for the Autocomplete component
 *
 * @property {(string | AutocompleteDataItem)[]} data - Autocomplete data as array of strings or data item objects
 * @property {string} [value] - Current input value (controlled mode)
 * @property {string} [defaultValue] - Default value for uncontrolled component
 * @property {(value: string) => void} [onChange] - Callback fired when input value changes
 * @property {(item: AutocompleteDataItem) => void} [onItemSubmit] - Callback fired when a suggestion is selected
 * @property {number} [limit=5] - Maximum number of suggestions to show
 * @property {AutocompleteFilterFunction} [filter] - Custom filter function to filter suggestions
 * @property {React.ReactNode} [label] - Input label displayed above the input
 * @property {string} [placeholder] - Input placeholder text
 * @property {React.ReactNode} [description] - Input description displayed below the label
 * @property {React.ReactNode} [error] - Error message displayed below the input
 * @property {boolean} [required=false] - If true, input will show required indicator
 * @property {boolean} [disabled=false] - If true, input will be disabled
 * @property {React.ReactNode} [icon] - Icon displayed on the left side of the input
 * @property {React.ReactNode} [rightSection] - Content displayed on the right side of the input
 * @property {MantineSize} [size='md'] - Input size. One of: 'xs', 'sm', 'md', 'lg', 'xl'
 * @property {MantineNumberSize} [radius='sm'] - Border radius from theme or custom value
 * @property {('default' | 'filled' | 'unstyled')} [variant='default'] - Input variant style
 * @property {MantineColor} [color='blue'] - Color from theme
 * @property {React.ReactNode} [nothingFound] - Message shown when no suggestions match the input
 * @property {('bottom' | 'top')} [dropdownPosition='bottom'] - Position of dropdown relative to input
 * @property {number} [maxDropdownHeight=400] - Maximum height of dropdown in pixels
 * @property {string} [accessibilityLabel] - Accessibility label for the input
 * @property {string} [accessibilityHint] - Accessibility hint for the input
 * @property {any} [style] - Additional styles to apply to the input
 */
export interface AutocompleteProps extends DefaultProps {
  /** Autocomplete data - array of strings or data items */
  data: (string | AutocompleteDataItem)[];

  /** Current input value (controlled) */
  value?: string;

  /** Default value for uncontrolled component */
  defaultValue?: string;

  /** Called when input value changes */
  onChange?: (value: string) => void;

  /** Called when a suggestion is selected */
  onItemSubmit?: (item: AutocompleteDataItem) => void;

  /** Maximum number of suggestions shown */
  limit?: number;

  /** Custom filter function */
  filter?: AutocompleteFilterFunction;

  /** Input label */
  label?: React.ReactNode;

  /** Input placeholder */
  placeholder?: string;

  /** Input description */
  description?: React.ReactNode;

  /** Error message */
  error?: React.ReactNode;

  /** If true, input will be required */
  required?: boolean;

  /** If true, input will be disabled */
  disabled?: boolean;

  /** Icon displayed on the left side */
  icon?: React.ReactNode;

  /** Right section */
  rightSection?: React.ReactNode;

  /** Input size */
  size?: MantineSize;

  /** Border radius */
  radius?: MantineNumberSize;

  /** Input variant */
  variant?: 'default' | 'filled' | 'unstyled';

  /** Autocomplete color */
  color?: MantineColor;

  /** Message shown when no suggestions match */
  nothingFound?: React.ReactNode;

  /** Dropdown position */
  dropdownPosition?: 'bottom' | 'top';

  /** Maximum dropdown height */
  maxDropdownHeight?: number;

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
      listContainer: {
        paddingVertical: rem(8) as any,
      },
      item: {
        paddingVertical: rem(12) as any,
        paddingHorizontal: theme.spacing.md,
        flexDirection: 'row',
        alignItems: 'center',
      },
      itemHovered: {
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

const defaultProps: Partial<AutocompleteProps> = {
  size: 'md',
  radius: 'sm',
  color: 'blue',
  variant: 'default',
  disabled: false,
  required: false,
  limit: 5,
  dropdownPosition: 'bottom',
  maxDropdownHeight: 400,
};

const defaultFilter: AutocompleteFilterFunction = (value, item) => {
  return item.value.toLowerCase().trim().includes(value.toLowerCase().trim());
};

const normalizeData = (data: (string | AutocompleteDataItem)[]): AutocompleteDataItem[] => {
  return data.map((item) =>
    typeof item === 'string' ? { value: item, label: item } : item
  );
};

/**
 * Autocomplete component provides suggestions as user types in an input field
 *
 * @example
 * ```tsx
 * // Basic autocomplete with string array
 * <Autocomplete
 *   data={['React', 'Angular', 'Vue', 'Svelte']}
 *   placeholder="Choose framework"
 * />
 *
 * // Controlled autocomplete with objects
 * <Autocomplete
 *   value={value}
 *   onChange={setValue}
 *   data={[
 *     { value: 'react', label: 'React' },
 *     { value: 'vue', label: 'Vue.js' },
 *   ]}
 *   onItemSubmit={(item) => console.log(item)}
 * />
 *
 * // Autocomplete with groups and custom filter
 * <Autocomplete
 *   data={[
 *     { value: 'apple', label: 'Apple', group: 'Fruits' },
 *     { value: 'banana', label: 'Banana', group: 'Fruits' },
 *     { value: 'carrot', label: 'Carrot', group: 'Vegetables' },
 *   ]}
 *   limit={10}
 *   nothingFound="No results found"
 * />
 * ```
 */
export const Autocomplete = forwardRef<RNTextInput, AutocompleteProps>((props, ref) => {
  const {
    data,
    value: controlledValue,
    defaultValue,
    onChange,
    onItemSubmit,
    limit,
    filter,
    label,
    placeholder,
    description,
    error,
    required,
    disabled,
    icon,
    rightSection,
    size,
    radius,
    variant,
    color,
    nothingFound,
    dropdownPosition,
    maxDropdownHeight,
    accessibilityLabel,
    accessibilityHint,
    style,
    ...others
  } = useComponentDefaultProps('Autocomplete', defaultProps, props);

  const [opened, setOpened] = useState(false);
  const [value, setValue] = useState(defaultValue || '');

  const { styles } = useStyles({ color, size }, { name: 'Autocomplete' }) as any;

  const isControlled = controlledValue !== undefined;
  const currentValue = isControlled ? controlledValue : value;

  const normalizedData = normalizeData(data);
  const filterFunction = filter || defaultFilter;

  // Filter data based on input value
  const filteredData = currentValue
    ? normalizedData
        .filter((item) => filterFunction(currentValue, item))
        .slice(0, limit)
    : normalizedData.slice(0, limit);

  const handleChange = (text: string) => {
    if (!isControlled) {
      setValue(text);
    }
    onChange?.(text);
    if (!opened && text) {
      setOpened(true);
    }
  };

  const handleItemSelect = (item: AutocompleteDataItem) => {
    const itemValue = item.label || item.value;
    if (!isControlled) {
      setValue(itemValue);
    }
    onChange?.(itemValue);
    onItemSubmit?.(item);
    setOpened(false);
  };

  const handleFocus = () => {
    if (!disabled && currentValue) {
      setOpened(true);
    }
  };

  // Group data by group property
  const groupedData: { [key: string]: AutocompleteDataItem[] } = {};
  let ungroupedItems: AutocompleteDataItem[] = [];

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
    accessibilityLabel || (typeof label === 'string' ? label : 'Autocomplete');

  const shouldShowDropdown =
    opened && (filteredData.length > 0 || Boolean(nothingFound));

  return (
    <>
      <TextInput
        ref={ref}
        label={label}
        description={description}
        error={error}
        size={size}
        radius={radius}
        variant={variant}
        icon={icon}
        rightSection={rightSection}
        value={currentValue}
        placeholder={placeholder}
        editable={!disabled}
        onChangeText={handleChange}
        onFocus={handleFocus}
        style={style}
        accessibilityRole="combobox"
        accessibilityState={{ expanded: opened }}
        accessibilityLabel={defaultAccessibilityLabel}
        accessibilityHint={accessibilityHint}
        required={required}
        {...others}
      />

      <Modal
        visible={shouldShowDropdown}
        transparent
        animationType="slide"
        onRequestClose={() => setOpened(false)}
      >
        <TouchableOpacity
          activeOpacity={1}
          style={styles.modalOverlay}
          onPress={() => setOpened(false)}
        >
          <TouchableOpacity activeOpacity={1} style={styles.modalContent}>
            <ScrollView
              style={{ maxHeight: maxDropdownHeight }}
              contentContainerStyle={styles.listContainer}
              keyboardShouldPersistTaps="handled"
            >
              {filteredData.length === 0 && nothingFound ? (
                <BoxView style={styles.emptyState}>
                  <Text style={styles.emptyText}>{nothingFound}</Text>
                </BoxView>
              ) : (
                <>
                  {ungroupedItems.map((item, index) => (
                    <TouchableOpacity
                      key={`${item.value}-${index}`}
                      style={[
                        styles.item,
                        item.disabled && styles.itemDisabled,
                      ]}
                      onPress={() => !item.disabled && handleItemSelect(item)}
                      disabled={item.disabled}
                      accessibilityRole="menuitem"
                      accessibilityLabel={item.label || item.value}
                    >
                      <Text style={styles.itemText}>
                        {item.label || item.value}
                      </Text>
                    </TouchableOpacity>
                  ))}

                  {Object.keys(groupedData).map((group) => (
                    <React.Fragment key={group}>
                      <Text style={styles.groupLabel}>{group}</Text>
                      {(groupedData[group] || []).map((item, index) => (
                        <TouchableOpacity
                          key={`${item.value}-${index}`}
                          style={[
                            styles.item,
                            item.disabled && styles.itemDisabled,
                          ]}
                          onPress={() => !item.disabled && handleItemSelect(item)}
                          disabled={item.disabled}
                          accessibilityRole="menuitem"
                          accessibilityLabel={item.label || item.value}
                        >
                          <Text style={styles.itemText}>
                            {item.label || item.value}
                          </Text>
                        </TouchableOpacity>
                      ))}
                    </React.Fragment>
                  ))}
                </>
              )}
            </ScrollView>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    </>
  );
});

Autocomplete.displayName = 'Autocomplete';
