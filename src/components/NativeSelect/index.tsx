import React, { forwardRef, useState } from 'react';
import { TouchableOpacity, Modal, FlatList } from 'react-native';
import { BoxView } from '../BoxView';
import { Text } from '../Text';
import type {
  DefaultProps,
  MantineNumberSize,
  MantineSize,
} from '../../theme/types';
import { useComponentDefaultProps, useTheme } from '../../theme/theme-provider';
import { createStyles, getSize } from '../../theme';
import { rem } from '../../theme/utils/rem';
import { INPUT_SIZES } from '../Input';

export interface SelectItem {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface NativeSelectProps extends DefaultProps {
  /** Select label */
  label?: React.ReactNode;

  /** Select description */
  description?: React.ReactNode;

  /** Select error message */
  error?: React.ReactNode;

  /** Select size */
  size?: MantineSize;

  /** Border radius */
  radius?: MantineNumberSize;

  /** Select variant */
  variant?: 'default' | 'filled' | 'unstyled';

  /** If true, select will take full width */
  fullWidth?: boolean;

  /** Select data */
  data: (string | SelectItem)[];

  /** Current value */
  value?: string;

  /** Default value */
  defaultValue?: string;

  /** Called when value changes */
  onChange?: (value: string) => void;

  /** If true, select will be disabled */
  disabled?: boolean;

  /** Placeholder */
  placeholder?: string;

  /** Icon on the left */
  icon?: React.ReactNode;

  /** Additional styles */
  style?: any;

  /** Wrapper style */
  wrapperStyle?: any;

  /** If true, requires a value to be selected */
  required?: boolean;
}

const useStyles = createStyles(
  (
    theme,
    {
      size,
      radius,
      variant,
      fullWidth,
      error,
      disabled,
      withIcon,
    }: {
      size: MantineSize;
      radius: MantineNumberSize;
      variant: 'default' | 'filled' | 'unstyled';
      fullWidth: boolean;
      error: boolean;
      disabled: boolean;
      withIcon: boolean;
    }
  ) => {
    const getVariantStyles = () => {
      switch (variant) {
        case 'filled':
          return {
            backgroundColor:
              theme.colorScheme === 'dark' ? (theme.colors.dark || [])[5] : (theme.colors.gray || [])[1],
            borderWidth: 1,
            borderColor: 'transparent',
          };
        case 'unstyled':
          return {
            backgroundColor: 'transparent',
            borderWidth: 0,
          };
        default:
          return {
            backgroundColor: theme.colorScheme === 'dark' ? (theme.colors.dark || [])[6] : theme.white,
            borderWidth: 1,
            borderColor:
              theme.colorScheme === 'dark' ? (theme.colors.dark || [])[4] : (theme.colors.gray || [])[4],
          };
      }
    };

    return {
      wrapper: {
        width: fullWidth ? '100%' : undefined,
      },
      label: {
        fontSize: theme.fontSizes.sm as number,
        fontWeight: '500',
        color: theme.colorScheme === 'dark' ? theme.white : theme.black,
        marginBottom: theme.spacing.xs,
      },
      description: {
        fontSize: theme.fontSizes.xs as number,
        color: theme.colorScheme === 'dark' ? (theme.colors.dark || [])[2] : (theme.colors.gray || [])[6],
        marginTop: theme.spacing.xs,
      },
      error: {
        fontSize: theme.fontSizes.xs as number,
        color: (theme.colors.red || [])[6],
        marginTop: theme.spacing.xs,
      },
      selectWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        height: getSize({ size, sizes: INPUT_SIZES }) as any,
        borderRadius: theme.fn.radius(radius),
        ...getVariantStyles(),
        ...(error && {
          borderColor: (theme.colors.red || [])[6],
        }),
        ...(disabled && {
          opacity: 0.6,
        }),
      } as any,
      icon: {
        paddingLeft: theme.spacing.sm,
        paddingRight: theme.spacing.xs,
      },
      selectText: {
        flex: 1,
        fontSize: getSize({ size, sizes: theme.fontSizes }),
        color: theme.colorScheme === 'dark' ? theme.white : theme.black,
        paddingHorizontal: theme.spacing.sm,
        ...(withIcon && {
          paddingLeft: 0,
        }),
      },
      placeholder: {
        color: theme.colorScheme === 'dark' ? (theme.colors.dark || [])[3] : (theme.colors.gray || [])[5],
      },
      chevron: {
        paddingRight: theme.spacing.sm,
      },
      chevronText: {
        fontSize: rem(16) as any,
        color: theme.colorScheme === 'dark' ? (theme.colors.dark || [])[2] : (theme.colors.gray || [])[6],
      },
      modalOverlay: {
        flex: 1,
        justifyContent: 'flex-end',
      },
      modalContent: {
        backgroundColor: theme.colorScheme === 'dark' ? (theme.colors.dark || [])[7] : theme.white,
        borderTopLeftRadius: theme.fn.radius('md'),
        borderTopRightRadius: theme.fn.radius('md'),
        maxHeight: '70%',
      },
      modalHeader: {
        padding: theme.spacing.md,
        borderBottomWidth: 1,
        borderBottomColor:
          theme.colorScheme === 'dark' ? (theme.colors.dark || [])[5] : (theme.colors.gray || [])[2],
      },
      modalTitle: {
        fontSize: theme.fontSizes.lg as number,
        fontWeight: '600',
        color: theme.colorScheme === 'dark' ? theme.white : theme.black,
      },
      option: {
        padding: theme.spacing.md,
        borderBottomWidth: 1,
        borderBottomColor:
          theme.colorScheme === 'dark' ? (theme.colors.dark || [])[5] : (theme.colors.gray || [])[2],
      },
      optionSelected: {
        backgroundColor:
          theme.colorScheme === 'dark'
            ? theme.fn.rgba(theme.colors[theme.primaryColor]?.[9] || theme.primaryBgColor, 0.25)
            : theme.colors[theme.primaryColor]?.[0] || (theme.colors.gray || [])[1],
      },
      optionDisabled: {
        opacity: 0.4,
      },
      optionText: {
        fontSize: theme.fontSizes.sm as number,
        color: theme.colorScheme === 'dark' ? theme.white : theme.black,
      },
      optionTextSelected: {
        fontWeight: '600',
        color: theme.colors[theme.primaryColor]?.[6] || theme.primaryBgColor,
      },
    };
  }
) as any;

const defaultProps: Partial<NativeSelectProps> = {
  size: 'sm',
  radius: 'sm',
  variant: 'default',
  fullWidth: false,
  disabled: false,
  required: false,
};

export const NativeSelect = forwardRef<any, NativeSelectProps>((props, ref) => {
  const {
    label,
    description,
    error,
    size,
    radius,
    variant,
    fullWidth,
    data,
    value: controlledValue,
    defaultValue,
    onChange,
    disabled,
    placeholder,
    icon,
    style,
    wrapperStyle,
    required,
    ...others
  } = useComponentDefaultProps('NativeSelect', defaultProps, props);

  const theme = useTheme();
  const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue || '');
  const [modalVisible, setModalVisible] = useState(false);

  const value = controlledValue !== undefined ? controlledValue : uncontrolledValue;

  const { styles, sx} = useStyles(
    {
      size,
      radius,
      variant,
      fullWidth,
      error: !!error,
      disabled,
      withIcon: !!icon,
    },
    { name: 'NativeSelect' }
  ) as any;

  const normalizedData: SelectItem[] = data.map((item) =>
    typeof item === 'string' ? { value: item, label: item } : item
  );

  const selectedItem = normalizedData.find((item) => item.value === value);

  const handleSelect = (itemValue: string) => {
    if (controlledValue === undefined) {
      setUncontrolledValue(itemValue);
    }
    onChange?.(itemValue);
    setModalVisible(false);
  };

  const handlePress = () => {
    if (!disabled) {
      setModalVisible(true);
    }
  };

  return (
    <BoxView style={sx(styles.wrapper, wrapperStyle)}>
      {label && (
        <Text style={styles.label}>
          {typeof label === 'string' ? label : label}
          {required && <Text style={{ color: (theme.colors.red || [])[6] }}> *</Text>}
        </Text>
      )}

      <TouchableOpacity
        ref={ref}
        style={sx(styles.selectWrapper, style)}
        onPress={handlePress}
        disabled={disabled}
        activeOpacity={0.7}
        {...others}
      >
        {icon && <BoxView style={styles.icon}>{icon}</BoxView>}

        <Text
          style={sx(
            styles.selectText,
            !selectedItem && styles.placeholder
          )}
          numberOfLines={1}
        >
          {selectedItem ? selectedItem.label : placeholder || 'Select option'}
        </Text>

        <BoxView style={styles.chevron}>
          <Text style={styles.chevronText}>▼</Text>
        </BoxView>
      </TouchableOpacity>

      {description && (
        <Text style={styles.description}>
          {typeof description === 'string' ? description : description}
        </Text>
      )}

      {error && <Text style={styles.error}>{typeof error === 'string' ? error : error}</Text>}

      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setModalVisible(false)}
        >
          <TouchableOpacity activeOpacity={1} onPress={(e) => e.stopPropagation()}>
            <BoxView style={styles.modalContent}>
              <BoxView style={styles.modalHeader}>
                <Text style={styles.modalTitle}>
                  {typeof label === 'string' ? label : 'Select an option'}
                </Text>
              </BoxView>

              <FlatList
                data={normalizedData}
                keyExtractor={(item) => item.value}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={sx(
                      styles.option,
                      item.value === value && styles.optionSelected,
                      item.disabled && styles.optionDisabled
                    )}
                    onPress={() => handleSelect(item.value)}
                    disabled={item.disabled}
                    activeOpacity={0.7}
                  >
                    <Text
                      style={sx(
                        styles.optionText,
                        item.value === value && styles.optionTextSelected
                      )}
                    >
                      {item.label}
                    </Text>
                  </TouchableOpacity>
                )}
              />
            </BoxView>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    </BoxView>
  );
});

NativeSelect.displayName = 'NativeSelect';
