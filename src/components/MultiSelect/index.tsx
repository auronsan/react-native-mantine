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
import { Badge } from '../Badge';
import { Checkbox } from '../Checkbox';
import type {
  DefaultProps,
  MantineColor,
  MantineNumberSize,
  MantineSize,
} from '../../theme/types';
import { useComponentDefaultProps } from '../../theme/theme-provider';
import { createStyles } from '../../theme';
import { rem } from '../../theme/utils/rem';

export interface MultiSelectDataItem {
  value: string;
  label: string;
  disabled?: boolean;
  group?: string;
}

export interface MultiSelectProps extends DefaultProps {
  /** MultiSelect data */
  data: (string | MultiSelectDataItem)[];

  /** Selected values */
  value?: string[];

  /** Default value for uncontrolled component */
  defaultValue?: string[];

  /** Called when value changes */
  onChange?: (value: string[]) => void;

  /** Placeholder */
  placeholder?: string;

  /** MultiSelect label */
  label?: React.ReactNode;

  /** MultiSelect description */
  description?: React.ReactNode;

  /** Error message */
  error?: React.ReactNode;

  /** MultiSelect size */
  size?: MantineSize;

  /** Border radius */
  radius?: MantineNumberSize;

  /** MultiSelect color */
  color?: MantineColor;

  /** If true, multiselect will be disabled */
  disabled?: boolean;

  /** If true, multiselect will be searchable */
  searchable?: boolean;

  /** Search placeholder */
  searchPlaceholder?: string;

  /** If true, clear button will be shown */
  clearable?: boolean;

  /** Clear button label */
  clearButtonLabel?: string;

  /** Max dropdown height */
  maxDropdownHeight?: number;

  /** Max selected values displayed */
  maxSelectedValues?: number;

  /** Icon displayed on the left side */
  icon?: React.ReactNode;

  /** Additional styles */
  style?: any;
}

const useStyles = createStyles(
  (
    theme,
    { color, size }: { color: MantineColor; size: MantineSize }
  ) => {
    const colors = theme.colors[color] || theme.colors[theme.primaryColor];

    return {
      valuesContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: theme.spacing.xs,
        padding: rem(4),
      },
      modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'flex-end',
      },
      modalContent: {
        backgroundColor:
          theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
        borderTopLeftRadius: theme.radius.lg,
        borderTopRightRadius: theme.radius.lg,
        maxHeight: '80%',
      },
      searchContainer: {
        padding: theme.spacing.md,
        borderBottomWidth: 1,
        borderBottomColor:
          theme.colorScheme === 'dark'
            ? theme.colors.dark[4]
            : theme.colors.gray[2],
      },
      listContainer: {
        paddingVertical: rem(8),
      },
      item: {
        paddingVertical: rem(12),
        paddingHorizontal: theme.spacing.md,
        flexDirection: 'row',
        alignItems: 'center',
      },
      itemSelected: {
        backgroundColor:
          theme.colorScheme === 'dark'
            ? theme.colors.dark[5]
            : colors?.[0] || theme.colors.gray[0],
      },
      itemDisabled: {
        opacity: 0.4,
      },
      itemText: {
        flex: 1,
        fontSize: rem(14),
        marginLeft: theme.spacing.sm,
        color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
      },
      itemTextSelected: {
        fontWeight: '600',
        color: colors?.[6] || colors?.[5] || theme.primaryBgColor,
      },
      groupLabel: {
        paddingVertical: rem(8),
        paddingHorizontal: theme.spacing.md,
        fontSize: rem(12),
        fontWeight: '600',
        color:
          theme.colorScheme === 'dark'
            ? theme.colors.dark[2]
            : theme.colors.gray[6],
        textTransform: 'uppercase',
      },
      emptyState: {
        padding: theme.spacing.xl,
        alignItems: 'center',
      },
      emptyText: {
        color:
          theme.colorScheme === 'dark'
            ? theme.colors.dark[2]
            : theme.colors.gray[6],
      },
      footer: {
        padding: theme.spacing.md,
        borderTopWidth: 1,
        borderTopColor:
          theme.colorScheme === 'dark'
            ? theme.colors.dark[4]
            : theme.colors.gray[2],
        flexDirection: 'row',
        justifyContent: 'space-between',
      },
    };
  }
);

const defaultProps: Partial<MultiSelectProps> = {
  size: 'md',
  radius: 'sm',
  color: 'blue',
  disabled: false,
  searchable: false,
  clearable: false,
  maxDropdownHeight: 400,
  searchPlaceholder: 'Search...',
  clearButtonLabel: 'Clear all',
  maxSelectedValues: 5,
};

const normalizeData = (data: (string | MultiSelectDataItem)[]): MultiSelectDataItem[] => {
  return data.map((item) =>
    typeof item === 'string' ? { value: item, label: item } : item
  );
};

export const MultiSelect = forwardRef<RNTextInput, MultiSelectProps>(
  (props, ref) => {
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
      maxSelectedValues,
      icon,
      style,
      ...others
    } = useComponentDefaultProps('MultiSelect', defaultProps, props);

    const [opened, setOpened] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [value, setValue] = useState<string[]>(defaultValue || []);

    const { styles } = useStyles({ color, size }, { name: 'MultiSelect' }) as any;

    const isControlled = controlledValue !== undefined;
    const currentValue = isControlled ? controlledValue : value;

    const normalizedData = normalizeData(data);

    const filteredData = searchable
      ? normalizedData.filter((item) =>
          item.label.toLowerCase().includes(searchQuery.toLowerCase())
        )
      : normalizedData;

    const handleToggle = (itemValue: string) => {
      const newValue = currentValue.includes(itemValue)
        ? currentValue.filter((v) => v !== itemValue)
        : [...currentValue, itemValue];

      if (!isControlled) {
        setValue(newValue);
      }
      onChange?.(newValue);
    };

    const handleClear = () => {
      if (!isControlled) {
        setValue([]);
      }
      onChange?.([]);
    };

    const selectedItems = normalizedData.filter((item) =>
      currentValue.includes(item.value)
    );

    const displayedValues =
      selectedItems.length > maxSelectedValues
        ? selectedItems.slice(0, maxSelectedValues)
        : selectedItems;

    const remainingCount = selectedItems.length - maxSelectedValues;

    const groupedData: { [key: string]: MultiSelectDataItem[] } = {};
    let ungroupedItems: MultiSelectDataItem[] = [];

    filteredData.forEach((item) => {
      if (item.group) {
        if (!groupedData[item.group]) {
          groupedData[item.group] = [];
        }
        groupedData[item.group].push(item);
      } else {
        ungroupedItems.push(item);
      }
    });

    const renderValue = () => {
      if (currentValue.length === 0) {
        return null;
      }

      return (
        <BoxView style={styles.valuesContainer}>
          {displayedValues.map((item) => (
            <Badge key={item.value} size="sm" color={color}>
              {item.label}
            </Badge>
          ))}
          {remainingCount > 0 && (
            <Badge size="sm" color="gray">
              +{remainingCount}
            </Badge>
          )}
        </BoxView>
      );
    };

    return (
      <>
        <TouchableOpacity
          onPress={() => !disabled && setOpened(true)}
          disabled={disabled}
        >
          <TextInput
            ref={ref}
            label={label}
            description={description}
            error={error}
            size={size}
            radius={radius}
            disabled={disabled}
            icon={icon}
            value=""
            placeholder={
              currentValue.length === 0
                ? placeholder
                : `${currentValue.length} selected`
            }
            editable={false}
            style={style}
            {...others}
          />
          {renderValue()}
        </TouchableOpacity>

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
          >
            <TouchableOpacity activeOpacity={1} style={styles.modalContent}>
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
                {ungroupedItems.map((item) => (
                  <TouchableOpacity
                    key={item.value}
                    style={[
                      styles.item,
                      currentValue.includes(item.value) && styles.itemSelected,
                      item.disabled && styles.itemDisabled,
                    ]}
                    onPress={() => !item.disabled && handleToggle(item.value)}
                    disabled={item.disabled}
                  >
                    <Checkbox
                      checked={currentValue.includes(item.value)}
                      onChange={() => !item.disabled && handleToggle(item.value)}
                      disabled={item.disabled}
                    />
                    <Text
                      style={[
                        styles.itemText,
                        currentValue.includes(item.value) &&
                          styles.itemTextSelected,
                      ]}
                    >
                      {item.label}
                    </Text>
                  </TouchableOpacity>
                ))}

                {Object.keys(groupedData).map((group) => (
                  <React.Fragment key={group}>
                    <Text style={styles.groupLabel}>{group}</Text>
                    {groupedData[group].map((item) => (
                      <TouchableOpacity
                        key={item.value}
                        style={[
                          styles.item,
                          currentValue.includes(item.value) &&
                            styles.itemSelected,
                          item.disabled && styles.itemDisabled,
                        ]}
                        onPress={() => !item.disabled && handleToggle(item.value)}
                        disabled={item.disabled}
                      >
                        <Checkbox
                          checked={currentValue.includes(item.value)}
                          onChange={() =>
                            !item.disabled && handleToggle(item.value)
                          }
                          disabled={item.disabled}
                        />
                        <Text
                          style={[
                            styles.itemText,
                            currentValue.includes(item.value) &&
                              styles.itemTextSelected,
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

              {clearable && currentValue.length > 0 && (
                <BoxView style={styles.footer}>
                  <TouchableOpacity onPress={handleClear}>
                    <Text style={{ color: color }}>{clearButtonLabel}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => setOpened(false)}>
                    <Text>Done ({currentValue.length})</Text>
                  </TouchableOpacity>
                </BoxView>
              )}
            </TouchableOpacity>
          </TouchableOpacity>
        </Modal>
      </>
    );
  }
);

MultiSelect.displayName = 'MultiSelect';
