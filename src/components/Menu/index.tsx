import React, { forwardRef, useState, useRef, useCallback } from 'react';
import {
  View,
  TouchableOpacity,
  Animated,
  Modal,
  useWindowDimensions,
  type LayoutChangeEvent,
} from 'react-native';
import { BoxView } from '../BoxView';
import { Divider } from '../Divider';
import type {
  DefaultProps,
  MantineColor,
  MantineNumberSize,
} from '../../theme/types';
import { useComponentDefaultProps } from '../../theme/theme-provider';
import { createStyles } from '../../theme';
import { withTextWrapper, type WithTextWrapperProps } from '../../theme/utils/withTextWrapper';
import {
  computeFloatingPosition,
  type FloatingPosition,
  type FloatingRect,
} from '../Popover/position';
import { measureTarget, useEscapeKey } from '../Popover/use-floating';

export type MenuPosition = FloatingPosition;
export type MenuShadow = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

/**
 * Props for the Menu component
 *
 * @property {boolean} [opened] - Controlled opened state
 * @property {(opened: boolean) => void} [onChange] - Callback fired when menu state changes
 * @property {MenuPosition} [position='bottom-start'] - Menu dropdown position relative to target (`top | bottom | left | right` with optional `-start` / `-end`)
 * @property {number | 'target'} [width=200] - Menu width in pixels or 'target' to match target width
 * @property {number} [offset=4] - Gap between target and dropdown in pixels
 * @property {boolean} [closeOnItemClick=true] - If true, menu closes when an item is clicked
 * @property {boolean} [closeOnClickOutside=true] - If true, menu closes when clicking outside
 * @property {boolean} [closeOnEscape=true] - If true, menu closes on escape key (web only)
 * @property {('xs' | 'sm' | 'md' | 'lg' | 'xl')} [shadow='md'] - Menu shadow from theme
 * @property {MantineNumberSize} [radius='sm'] - Border radius from theme
 * @property {number} [zIndex=1000] - Z-index of the menu dropdown
 * @property {React.ReactNode} children - Menu children (Menu.Target, Menu.Dropdown, etc.)
 * @property {string} [accessibilityLabel] - Accessibility label for the menu
 * @property {any} [style] - Additional styles
 */
export interface MenuProps extends DefaultProps {
  /** Controlled opened state */
  opened?: boolean;

  /** Called when menu state changes */
  onChange?: (opened: boolean) => void;

  /** Menu position */
  position?: MenuPosition;

  /** Menu width */
  width?: number | 'target';

  /** Gap between target and dropdown in px */
  offset?: number;

  /** Close menu on item click */
  closeOnItemClick?: boolean;

  /** Close menu on click outside */
  closeOnClickOutside?: boolean;

  /** Close menu on escape key (web only) */
  closeOnEscape?: boolean;

  /** Menu shadow */
  shadow?: MenuShadow;

  /** Border radius */
  radius?: MantineNumberSize;

  /** Z-index */
  zIndex?: number;

  /** Menu children */
  children: React.ReactNode;

  /** Accessibility label for the menu */
  accessibilityLabel?: string;

  /** Additional styles */
  style?: any;
}

/**
 * Props for Menu.Target component
 *
 * @property {React.ReactElement} children - Single React element that triggers the menu
 */
export interface MenuTargetProps {
  children: React.ReactElement;
}

/**
 * Props for Menu.Dropdown component
 *
 * @property {React.ReactNode} children - Dropdown content (Menu.Item, Menu.Label, Menu.Divider)
 * @property {any} [style] - Additional styles
 */
export interface MenuDropdownProps extends DefaultProps {
  children: React.ReactNode;
  style?: any;
}

/**
 * Props for Menu.Item component
 *
 * @property {React.ReactNode} [icon] - Icon displayed on the left side
 * @property {MantineColor} [color] - Item color from theme
 * @property {React.ReactNode} children - Item content
 * @property {() => void} [onPress] - Callback fired when item is pressed
 * @property {boolean} [disabled=false] - If true, item is disabled
 * @property {React.ReactNode} [rightSection] - Content displayed on the right side
 * @property {any} [style] - Additional styles
 */
export interface MenuItemProps extends DefaultProps, WithTextWrapperProps {
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

/**
 * Props for Menu.Label component
 *
 * @property {React.ReactNode} children - Label text
 * @property {any} [style] - Additional styles
 */
export interface MenuLabelProps extends DefaultProps, WithTextWrapperProps {
  children: React.ReactNode;
  style?: any;
}

/**
 * Props for Menu.Divider component
 *
 * @property {any} [style] - Additional styles
 */
export interface MenuDividerProps extends DefaultProps {
  style?: any;
}

const useDropdownStyles = createStyles(
  (theme, { radius, shadow }: { radius: MantineNumberSize; shadow?: MenuShadow }) => {
    const dark = theme.colorScheme === 'dark';
    return {
      dropdown: {
        position: 'absolute',
        backgroundColor: dark ? theme.fn.themeColor('dark', 6) : theme.white,
        borderWidth: 1,
        borderColor: dark ? theme.fn.themeColor('dark', 4) : theme.fn.themeColor('gray', 2),
        borderRadius: theme.fn.radius(radius),
        paddingVertical: 4,
        ...(shadow ? theme.fn.shadow(shadow) : {}),
      },
    };
  }
);

const useItemStyles = createStyles(
  (
    theme,
    { color, disabled }: { color: MantineColor; disabled: boolean }
  ) => {
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
            ? theme.fn.themeColor('dark', 5)
            : theme.fn.themeColor('gray', 0),
      },
      icon: {
        marginRight: theme.spacing.sm,
        color: color
          ? theme.fn.themeColor(color, 6)
          : theme.colorScheme === 'dark'
          ? theme.fn.themeColor('dark', 0)
          : theme.fn.themeColor('gray', 7),
      },
      label: {
        flex: 1,
        fontSize: 14,
        color: color
          ? theme.fn.themeColor(color, 6)
          : theme.colorScheme === 'dark'
          ? theme.fn.themeColor('dark', 0)
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
    color: theme.colorScheme === 'dark' ? theme.fn.themeColor('dark', 2) : theme.fn.themeColor('gray', 6),
    textTransform: 'uppercase',
  },
}));

interface MenuContextValue {
  opened: boolean;
  setOpened: (opened: boolean) => void;
  closeOnItemClick: boolean;
  closeOnClickOutside: boolean;
  closeOnEscape: boolean;
  targetRef: React.RefObject<View | null>;
  targetRect: FloatingRect | null;
  setTargetRect: (rect: FloatingRect) => void;
  accessibilityLabel?: string;
  position: MenuPosition;
  width: number | 'target';
  offset: number;
  radius: MantineNumberSize;
  shadow?: MenuShadow;
  zIndex?: number;
}

const ZERO_RECT: FloatingRect = { x: 0, y: 0, width: 0, height: 0 };

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
  offset: 4,
  closeOnItemClick: true,
  closeOnClickOutside: true,
  closeOnEscape: true,
  shadow: 'md',
  radius: 'sm',
  zIndex: 1000,
};

const defaultItemProps: Partial<MenuItemProps> = {
  disabled: false,
  withTextWrapper: true,
};

const MenuTarget: React.FC<MenuTargetProps> = ({ children }) => {
  const { opened, setOpened, targetRef, setTargetRect } = useMenuContext();

  const handlePress = () => {
    measureTarget(targetRef, setTargetRect);
    setOpened(true);
  };

  const childProps = (children as React.ReactElement<any>).props ?? {};

  return React.cloneElement(children as React.ReactElement<any>, {
    ref: targetRef,
    onPress: handlePress,
    accessibilityRole: childProps.accessibilityRole ?? 'button',
    accessibilityState: { expanded: opened, ...childProps.accessibilityState },
  });
};

const MenuDropdown: React.FC<MenuDropdownProps> = ({ children, style, ...others }) => {
  const {
    opened,
    setOpened,
    targetRef,
    targetRect,
    setTargetRect,
    accessibilityLabel,
    closeOnClickOutside,
    closeOnEscape,
    position,
    width,
    offset,
    radius,
    shadow,
    zIndex,
  } = useMenuContext();
  const opacity = useRef(new Animated.Value(0)).current;
  const [dropdownSize, setDropdownSize] = useState({ width: 0, height: 0 });
  const windowSize = useWindowDimensions();
  const { styles } = useDropdownStyles({ radius, shadow }, { name: 'Menu' });

  const close = useCallback(() => setOpened(false), [setOpened]);

  React.useEffect(() => {
    if (opened) {
      // Re-measure on every open so controlled menus (opened without a
      // target press) are positioned from the current target rect.
      measureTarget(targetRef, setTargetRect);
      Animated.timing(opacity, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }).start();
    }
  }, [opened, opacity]);

  useEscapeKey(opened && closeOnEscape, close);

  const handleLayout = (event: LayoutChangeEvent) => {
    const { width: w, height: h } = event.nativeEvent.layout;
    setDropdownSize((prev) =>
      prev.width === w && prev.height === h ? prev : { width: w, height: h }
    );
  };

  if (!opened) {
    return null;
  }

  const resolvedWidth =
    width === 'target' ? targetRect?.width || undefined : width;

  const placement = computeFloatingPosition({
    position,
    target: targetRect ?? ZERO_RECT,
    dropdown: {
      width: dropdownSize.width || (typeof resolvedWidth === 'number' ? resolvedWidth : 0),
      height: dropdownSize.height,
    },
    window: windowSize,
    offset,
  });

  return (
    <Modal
      visible={opened}
      transparent
      animationType="none"
      onRequestClose={close}
      statusBarTranslucent
    >
      <TouchableOpacity
        activeOpacity={1}
        onPress={closeOnClickOutside ? close : undefined}
        accessible={false}
        style={{
          flex: 1,
          backgroundColor: 'transparent',
        }}
      >
        <Animated.View
          style={[
            styles.dropdown,
            {
              top: placement.top,
              left: placement.left,
              width: resolvedWidth,
              opacity,
              zIndex,
            },
            style,
          ]}
          accessibilityLabel={accessibilityLabel}
          accessibilityRole="menu"
          {...others}
          onLayout={handleLayout}
        >
          {children}
        </Animated.View>
      </TouchableOpacity>
    </Modal>
  );
};

const MenuItem = forwardRef<any, MenuItemProps>((props, ref) => {
  const { icon, color, children, onPress, disabled, rightSection, style, withTextWrapper: shouldWrapInText, ...others } =
    useComponentDefaultProps('MenuItem', defaultItemProps, props);

  const { setOpened, closeOnItemClick } = useMenuContext();
  const [isPressed, setIsPressed] = React.useState(false);

  const { styles, sx } = useItemStyles(
    {
      color: color ?? 'blue',
      disabled: disabled ?? defaultItemProps.disabled ?? false
    },
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
      accessibilityRole="menuitem"
      accessibilityState={{ disabled: !!disabled }}
      accessibilityLabel={typeof children === 'string' ? children : undefined}
      {...others}
    >
      {icon && <BoxView style={styles.icon}>{icon}</BoxView>}
      {withTextWrapper(children, shouldWrapInText, { style: styles.label })}
      {rightSection && <BoxView style={styles.rightSection}>{rightSection}</BoxView>}
    </TouchableOpacity>
  );
});

const MenuLabel = forwardRef<any, MenuLabelProps>((props, ref) => {
  const { children, style, withTextWrapper: shouldWrapInText = true, ...others } = props;
  const { styles, sx } = useLabelStyles({}, { name: 'MenuLabel' }) as any;

  return (
    <BoxView ref={ref} style={sx(styles.label, style)} {...others}>
      {withTextWrapper(children, shouldWrapInText, { style: styles.label })}
    </BoxView>
  );
});

const MenuDivider = forwardRef<any, MenuDividerProps>((props, ref) => {
  const { style, ...others } = props;
  return <Divider ref={ref} style={style} {...others} />;
});

/**
 * Menu component displays a dropdown list of actions
 *
 * @example
 * ```tsx
 * // Basic menu
 * <Menu>
 *   <Menu.Target>
 *     <Button>Toggle Menu</Button>
 *   </Menu.Target>
 *   <Menu.Dropdown>
 *     <Menu.Item icon={<IconSettings />}>Settings</Menu.Item>
 *     <Menu.Item icon={<IconUser />}>Profile</Menu.Item>
 *     <Menu.Divider />
 *     <Menu.Item color="red" icon={<IconLogout />}>Logout</Menu.Item>
 *   </Menu.Dropdown>
 * </Menu>
 *
 * // Controlled menu with labels
 * <Menu opened={opened} onChange={setOpened}>
 *   <Menu.Target>
 *     <Button>Actions</Button>
 *   </Menu.Target>
 *   <Menu.Dropdown>
 *     <Menu.Label>Application</Menu.Label>
 *     <Menu.Item>Settings</Menu.Item>
 *     <Menu.Item>Messages</Menu.Item>
 *     <Menu.Label>Danger zone</Menu.Label>
 *     <Menu.Item color="red">Delete account</Menu.Item>
 *   </Menu.Dropdown>
 * </Menu>
 * ```
 */
export const Menu = Object.assign(
  forwardRef<any, MenuProps>((props, ref) => {
    const {
      opened: controlledOpened,
      onChange,
      position,
      width,
      offset,
      closeOnItemClick,
      closeOnClickOutside,
      closeOnEscape,
      shadow,
      radius,
      zIndex,
      children,
      accessibilityLabel,
      style,
      ...others
    } = useComponentDefaultProps('Menu', defaultMenuProps, props);

    const [opened, setOpened] = useState(false);
    const [targetRect, setTargetRect] = useState<FloatingRect | null>(null);
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
      closeOnClickOutside: closeOnClickOutside ?? true,
      closeOnEscape: closeOnEscape ?? true,
      targetRef,
      targetRect,
      setTargetRect,
      accessibilityLabel,
      position: position ?? 'bottom-start',
      width: width ?? 200,
      offset: offset ?? 4,
      radius: radius ?? 'sm',
      shadow,
      zIndex,
    };

    return (
      <MenuContext.Provider value={contextValue}>
        <BoxView ref={ref} style={style} {...others}>
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
