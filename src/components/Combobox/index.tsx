import React, {
  createContext,
  forwardRef,
  useContext,
  useState,
  type ReactElement,
  type ReactNode,
} from 'react';
import {
  Modal,
  ScrollView,
  TextInput as RNTextInput,
  TouchableOpacity,
  View,
  type TextInputProps as RNTextInputProps,
} from 'react-native';
import { BoxView } from '../BoxView';
import { Text } from '../Text';
import type { DefaultProps } from '../../theme/types';
import { useComponentDefaultProps } from '../../theme/theme-provider';
import { createStyles } from '../../theme';

export interface UseComboboxOptions {
  /** Initial opened state for uncontrolled usage */
  defaultOpened?: boolean;

  /** Controlled opened state */
  opened?: boolean;

  /** Called when opened state changes */
  onOpenedChange?: (opened: boolean) => void;
}

export interface ComboboxStore {
  /** Current opened state */
  opened: boolean;

  /** Opens the dropdown */
  open: () => void;

  /** Closes the dropdown */
  close: () => void;

  /** Toggles the dropdown */
  toggle: () => void;
}

/** Creates a combobox store that controls the dropdown state */
export function useCombobox(options: UseComboboxOptions = {}): ComboboxStore {
  const { defaultOpened, opened, onOpenedChange } = options;
  const [internalOpened, setInternalOpened] = useState(defaultOpened ?? false);
  const isOpened = opened ?? internalOpened;

  const setOpened = (value: boolean) => {
    if (opened === undefined) {
      setInternalOpened(value);
    }
    onOpenedChange?.(value);
  };

  return {
    opened: isOpened,
    open: () => setOpened(true),
    close: () => setOpened(false),
    toggle: () => setOpened(!isOpened),
  };
}

interface ComboboxContextValue {
  store: ComboboxStore;
  onOptionSubmit?: (value: string) => void;
  closeOnOptionSubmit: boolean;
}

const ComboboxContext = createContext<ComboboxContextValue | null>(null);

const useComboboxContext = () => {
  const ctx = useContext(ComboboxContext);
  if (!ctx) {
    throw new Error('Combobox components must be used within Combobox');
  }
  return ctx;
};

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
    paddingVertical: theme.spacing.sm,
    maxHeight: '80%',
  },
  search: {
    marginHorizontal: theme.spacing.sm,
    marginBottom: theme.spacing.xs,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor:
      theme.colorScheme === 'dark'
        ? theme.fn.themeColor('dark', 4)
        : theme.fn.themeColor('gray', 4),
    borderRadius: theme.fn.radius('sm'),
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    fontSize: theme.fontSizes.sm as number,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: theme.spacing.md,
  },
  optionLabel: {
    fontSize: theme.fontSizes.sm as number,
    color: theme.colorScheme === 'dark' ? theme.fn.themeColor('dark', 0) : theme.black,
  },
  empty: {
    paddingVertical: theme.spacing.md,
    alignItems: 'center',
  },
  emptyLabel: {
    fontSize: theme.fontSizes.sm as number,
    color: theme.fn.dimmed(),
  },
}));

export interface ComboboxTargetProps {
  /** Single element that toggles the dropdown when pressed */
  children: ReactElement;
}

const ComboboxTarget: React.FC<ComboboxTargetProps> = ({ children }) => {
  const { store } = useComboboxContext();
  const child = children as ReactElement<any>;

  return React.cloneElement(child, {
    onPress: (...args: any[]) => {
      child.props.onPress?.(...args);
      store.toggle();
    },
    accessibilityRole: 'button',
    accessibilityState: { expanded: store.opened },
  });
};

ComboboxTarget.displayName = 'Combobox.Target';

export interface ComboboxDropdownProps extends DefaultProps {
  /** Dropdown content */
  children?: ReactNode;
}

const ComboboxDropdown: React.FC<ComboboxDropdownProps> = ({
  children,
  style,
  ...others
}) => {
  const { store } = useComboboxContext();
  const { styles } = useStyles({}, { name: 'Combobox' });

  return (
    <Modal
      visible={store.opened}
      transparent
      animationType="slide"
      onRequestClose={store.close}
    >
      <TouchableOpacity
        style={styles.modalOverlay}
        activeOpacity={1}
        onPress={store.close}
        accessibilityLabel="Close dropdown"
      >
        <TouchableOpacity
          activeOpacity={1}
          style={[styles.modalContent as any, style]}
          {...others}
        >
          {children}
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
};

ComboboxDropdown.displayName = 'Combobox.Dropdown';

export interface ComboboxOptionsProps extends DefaultProps {
  /** Combobox.Option components */
  children?: ReactNode;

  /** Maximum height of the options list in px */
  maxHeight?: number;
}

const ComboboxOptions: React.FC<ComboboxOptionsProps> = ({
  children,
  maxHeight = 400,
  style,
  ...others
}) => (
  <ScrollView style={[{ maxHeight }, style]} {...others}>
    {children}
  </ScrollView>
);

ComboboxOptions.displayName = 'Combobox.Options';

export interface ComboboxOptionProps extends DefaultProps {
  /** Option value passed to onOptionSubmit */
  value: string;

  /** Disabled state */
  disabled?: boolean;

  /** Option content */
  children?: ReactNode;

  /** Called when the option is pressed, in addition to onOptionSubmit */
  onPress?: () => void;
}

const ComboboxOption: React.FC<ComboboxOptionProps> = ({
  value,
  disabled,
  children,
  onPress,
  style,
  ...others
}) => {
  const { store, onOptionSubmit, closeOnOptionSubmit } = useComboboxContext();
  const { styles } = useStyles({}, { name: 'Combobox' });

  const handlePress = () => {
    if (disabled) {
      return;
    }

    onPress?.();
    onOptionSubmit?.(value);

    if (closeOnOptionSubmit) {
      store.close();
    }
  };

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={handlePress}
      disabled={disabled}
      accessibilityRole="menuitem"
      accessibilityState={{ disabled: !!disabled }}
      style={[styles.option, disabled ? { opacity: 0.4 } : null, style]}
      {...others}
    >
      {typeof children === 'string' || typeof children === 'number' ? (
        <Text style={styles.optionLabel}>{children}</Text>
      ) : (
        children
      )}
    </TouchableOpacity>
  );
};

ComboboxOption.displayName = 'Combobox.Option';

export interface ComboboxSearchProps
  extends Omit<RNTextInputProps, 'style'> {
  /** Additional styles */
  style?: any;
}

const ComboboxSearch = forwardRef<RNTextInput, ComboboxSearchProps>(
  ({ style, ...others }, ref) => {
    const { styles, theme } = useStyles({}, { name: 'Combobox' });

    return (
      <RNTextInput
        placeholderTextColor={theme.fn.dimmed()}
        autoCapitalize="none"
        autoCorrect={false}
        {...others}
        ref={ref}
        style={[styles.search, style]}
      />
    );
  }
);

ComboboxSearch.displayName = 'Combobox.Search';

export interface ComboboxEmptyProps extends DefaultProps {
  /** Empty state content */
  children?: ReactNode;
}

const ComboboxEmpty: React.FC<ComboboxEmptyProps> = ({
  children,
  style,
  ...others
}) => {
  const { styles } = useStyles({}, { name: 'Combobox' });

  return (
    <View style={[styles.empty as any, style]} {...others}>
      {typeof children === 'string' || typeof children === 'number' ? (
        <Text style={styles.emptyLabel}>{children}</Text>
      ) : (
        children
      )}
    </View>
  );
};

ComboboxEmpty.displayName = 'Combobox.Empty';

export interface ComboboxProps extends DefaultProps {
  /** Combobox store returned by useCombobox, created internally if not provided */
  store?: ComboboxStore;

  /** Called with the option value when an option is submitted */
  onOptionSubmit?: (value: string) => void;

  /** Determines whether the dropdown should close when an option is submitted */
  closeOnOptionSubmit?: boolean;

  /** Combobox.Target and Combobox.Dropdown */
  children: ReactNode;
}

const defaultProps: Partial<ComboboxProps> = {
  closeOnOptionSubmit: true,
};

/**
 * Combobox provides building blocks for custom select-like components.
 * The dropdown is displayed as a bottom sheet adapted for touch devices.
 */
const ComboboxBase = (props: ComboboxProps) => {
  const {
    store,
    onOptionSubmit,
    closeOnOptionSubmit,
    children,
    style,
    ...others
  } = useComponentDefaultProps('Combobox', defaultProps, props);

  const fallbackStore = useCombobox();
  const resolvedStore = store ?? fallbackStore;

  return (
    <ComboboxContext.Provider
      value={{
        store: resolvedStore,
        onOptionSubmit,
        closeOnOptionSubmit: closeOnOptionSubmit ?? true,
      }}
    >
      <BoxView style={[style]} {...others}>
        {children}
      </BoxView>
    </ComboboxContext.Provider>
  );
};

export const Combobox = Object.assign(ComboboxBase, {
  Target: ComboboxTarget,
  Dropdown: ComboboxDropdown,
  Options: ComboboxOptions,
  Option: ComboboxOption,
  Search: ComboboxSearch,
  Empty: ComboboxEmpty,
}) as typeof ComboboxBase & {
  Target: typeof ComboboxTarget;
  Dropdown: typeof ComboboxDropdown;
  Options: typeof ComboboxOptions;
  Option: typeof ComboboxOption;
  Search: typeof ComboboxSearch;
  Empty: typeof ComboboxEmpty;
  displayName?: string;
};

Combobox.displayName = 'Combobox';
