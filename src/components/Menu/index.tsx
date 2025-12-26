import React, { forwardRef, useState, useRef } from 'react';
import {
  View,
  TouchableOpacity,
  Animated,
  Modal,
} from 'react-native';
import { BoxView } from '../BoxView';
import { Text } from '../Text';
import { Divider } from '../Divider';
import type {
  DefaultProps,
  MantineColor,
  MantineNumberSize,
} from '../../theme/types';
import { useComponentDefaultProps } from '../../theme/theme-provider';
import { createStyles } from '../../theme';

export interface MenuProps extends DefaultProps {
  /** Controlled opened state */
  opened?: boolean;

  /** Called when menu state changes */
  onChange?: (opened: boolean) => void;

  /** Menu position */
  position?:
    | 'bottom'
    | 'top'
    | 'left'
    | 'right'
    | 'bottom-start'
    | 'bottom-end'
    | 'top-start'
    | 'top-end';

  /** Menu width */
  width?: number | 'target';

  /** Close menu on item click */
  closeOnItemClick?: boolean;

  /** Close menu on click outside */
  closeOnClickOutside?: boolean;

  /** Menu shadow */
  shadow?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';

  /** Border radius */
  radius?: MantineNumberSize;

  /** Z-index */
  zIndex?: number;

  /** Menu children */
  children: React.ReactNode;

  /** Additional styles */
  style?: any;
}

export interface MenuTargetProps {
  children: React.ReactElement;
}

export interface MenuDropdownProps extends DefaultProps {
  children: React.ReactNode;
  style?: any;
}

export interface MenuItemProps extends DefaultProps {
  /** Item icon */
  icon?: React.ReactNode;

  /** Item color from theme */
  color?: MantineColor;

  /** Item content */
  children: React.ReactNode;

  /** Called when item is pressed */
  onPress?: () => void;

  /** Disabled state */
  disabled?: boolean;

  /** Right section */
  rightSection?: React.ReactNode;

  /** Additional styles */
  style?: any;
}

export interface MenuLabelProps extends DefaultProps {
  children: React.ReactNode;
  style?: any;
}

export interface MenuDividerProps extends DefaultProps {
  style?: any;
}

// TODO: Implement Menu component styling
/* Placeholder for future Menu dropdown implementation
const useMenuStyles = createStyles(
  (theme, { radius, shadow }: { radius: MantineNumberSize; shadow: string }) => ({
    dropdown: {
      // Menu dropdown styles will be implemented here
    },
  })
);
*/

const useItemStyles = createStyles(
  (
    theme,
    { color, disabled }: { color: MantineColor; disabled: boolean }
  ) => {
    const colors = theme.colors[color] || theme.colors[theme.primaryColor];

    return {
      item: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: theme.spacing.md,
        opacity: disabled ? 0.4 : 1,
      },
      itemHovered: {
        backgroundColor:
          theme.colorScheme === 'dark'
            ? (theme.colors.dark || [])[5]
            : (theme.colors.gray || [])[0],
      },
      icon: {
        marginRight: theme.spacing.sm,
        color: color
          ? colors?.[6] || colors?.[5]
          : theme.colorScheme === 'dark'
          ? (theme.colors.dark || [])[0]
          : (theme.colors.gray || [])[7],
      },
      label: {
        flex: 1,
        fontSize: 14,
        color: color
          ? colors?.[6] || colors?.[5]
          : theme.colorScheme === 'dark'
          ? (theme.colors.dark || [])[0]
          : theme.black,
      },
      rightSection: {
        marginLeft: theme.spacing.sm,
      },
    };
  }
);

const useLabelStyles = createStyles((theme) => ({
  label: {
    paddingVertical: 6,
    paddingHorizontal: theme.spacing.md,
    fontSize: 12,
    fontWeight: '600',
    color: theme.colorScheme === 'dark' ? (theme.colors.dark || [])[2] : (theme.colors.gray || [])[6],
    textTransform: 'uppercase',
  },
}));

interface MenuContextValue {
  opened: boolean;
  setOpened: (opened: boolean) => void;
  closeOnItemClick: boolean;
  targetRef: React.RefObject<View | null>;
  dropdownPosition: { top: number; left: number; width: number };
  setDropdownPosition: (pos: { top: number; left: number; width: number }) => void;
}

const MenuContext = React.createContext<MenuContextValue | null>(null);

const useMenuContext = () => {
  const ctx = React.useContext(MenuContext);
  if (!ctx) {
    throw new Error('Menu components must be used within Menu');
  }
  return ctx;
};

const defaultMenuProps: Partial<MenuProps> = {
  position: 'bottom-start',
  width: 200,
  closeOnItemClick: true,
  closeOnClickOutside: true,
  shadow: 'md',
  radius: 'sm',
  zIndex: 1000,
};

const defaultItemProps: Partial<MenuItemProps> = {
  disabled: false,
};

const MenuTarget: React.FC<MenuTargetProps> = ({ children }) => {
  const { setOpened, targetRef, setDropdownPosition } = useMenuContext();

  const handlePress = () => {
    if (targetRef.current) {
      targetRef.current.measureInWindow((x, y, width, height) => {
        setDropdownPosition({
          top: y + height + 4,
          left: x,
          width,
        });
      });
    }
    setOpened(true);
  };

  return React.cloneElement(children as React.ReactElement<any>, {
    ref: targetRef,
    onPress: handlePress,
  });
};

const MenuDropdown: React.FC<MenuDropdownProps> = ({ children, style, ...others }) => {
  const { opened, setOpened, dropdownPosition } = useMenuContext();
  const opacity = useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    if (opened) {
      Animated.timing(opacity, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }).start();
    }
  }, [opened, opacity]);

  if (!opened) {
    return null;
  }

  return (
    <Modal
      visible={opened}
      transparent
      animationType="none"
      onRequestClose={() => setOpened(false)}
      statusBarTranslucent
    >
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => setOpened(false)}
        style={{
          flex: 1,
          backgroundColor: 'transparent',
        }}
      >
        <Animated.View
          style={[
            {
              position: 'absolute',
              top: dropdownPosition.top,
              left: dropdownPosition.left,
              opacity,
            },
            style,
          ]}
          {...others}
        >
          {children}
        </Animated.View>
      </TouchableOpacity>
    </Modal>
  );
};

const MenuItem = forwardRef<any, MenuItemProps>((props, ref) => {
  const { icon, color, children, onPress, disabled, rightSection, style, ...others } =
    useComponentDefaultProps('MenuItem', defaultItemProps, props);

  const { setOpened, closeOnItemClick } = useMenuContext();
  const [isPressed, setIsPressed] = React.useState(false);

  const { styles, sx } = useItemStyles(
    { color, disabled },
    { name: 'MenuItem' }
  ) as any;

  const handlePress = () => {
    if (disabled) return;
    onPress?.();
    if (closeOnItemClick) {
      setOpened(false);
    }
  };

  return (
    <TouchableOpacity
      ref={ref}
      onPress={handlePress}
      onPressIn={() => setIsPressed(true)}
      onPressOut={() => setIsPressed(false)}
      disabled={disabled}
      activeOpacity={0.7}
      style={sx(styles.item, isPressed && styles.itemHovered, style)}
      {...others}
    >
      {icon && <BoxView style={styles.icon}>{icon}</BoxView>}
      <Text style={styles.label}>{children}</Text>
      {rightSection && <BoxView style={styles.rightSection}>{rightSection}</BoxView>}
    </TouchableOpacity>
  );
});

const MenuLabel = forwardRef<any, MenuLabelProps>((props, ref) => {
  const { children, style, ...others } = props;
  const { styles, sx } = useLabelStyles({}, { name: 'MenuLabel' }) as any;

  return (
    <BoxView ref={ref} style={sx(styles.label, style)} {...others}>
      <Text style={styles.label}>{children}</Text>
    </BoxView>
  );
});

const MenuDivider = forwardRef<any, MenuDividerProps>((props, ref) => {
  const { style, ...others } = props;
  return <Divider ref={ref} style={style} {...others} />;
});

export const Menu = Object.assign(
  forwardRef<any, MenuProps>((props, ref) => {
    const {
      opened: controlledOpened,
      onChange,
      position,
      width,
      closeOnItemClick,
      closeOnClickOutside,
      shadow,
      radius,
      zIndex,
      children,
      style,
      ...others
    } = useComponentDefaultProps('Menu', defaultMenuProps, props);

    const [opened, setOpened] = useState(false);
    const [dropdownPosition, setDropdownPosition] = useState({
      top: 0,
      left: 0,
      width: 0,
    });
    const targetRef = useRef<View>(null);

    const isControlled = controlledOpened !== undefined;
    const isOpened = isControlled ? controlledOpened : opened;

    const handleSetOpened = (value: boolean) => {
      if (!isControlled) {
        setOpened(value);
      }
      onChange?.(value);
    };

    const contextValue: MenuContextValue = {
      opened: isOpened,
      setOpened: handleSetOpened,
      closeOnItemClick: closeOnItemClick ?? true,
      targetRef,
      dropdownPosition,
      setDropdownPosition,
    };

    return (
      <MenuContext.Provider value={contextValue}>
        <BoxView ref={ref} {...others}>
          {children}
        </BoxView>
      </MenuContext.Provider>
    );
  }),
  {
    Target: MenuTarget,
    Dropdown: MenuDropdown,
    Item: MenuItem,
    Label: MenuLabel,
    Divider: MenuDivider,
  }
);

Menu.displayName = 'Menu';
MenuTarget.displayName = 'Menu.Target';
MenuDropdown.displayName = 'Menu.Dropdown';
MenuItem.displayName = 'Menu.Item';
MenuLabel.displayName = 'Menu.Label';
MenuDivider.displayName = 'Menu.Divider';
