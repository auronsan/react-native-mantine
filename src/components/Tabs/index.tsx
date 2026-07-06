import React, { forwardRef, createContext, useContext, useState, useRef } from 'react';
import { TouchableOpacity } from 'react-native';
import { BoxView } from '../BoxView';
import { Text } from '../Text';
import type { DefaultProps, MantineColor, MantineNumberSize } from '../../theme/types';
import { useComponentDefaultProps } from '../../theme/theme-provider';
import { createStyles } from '../../theme';
import { rem } from '../../theme/utils/rem';

/**
 * Tabs value type - string or null
 */
export type TabsValue = string | null;

/**
 * Tabs orientation
 */
export type TabsOrientation = 'horizontal' | 'vertical';

/**
 * Tabs variant styles
 */
export type TabsVariant = 'default' | 'outline' | 'pills';

/**
 * Tabs position for TabsList
 */
export type TabsPosition = 'left' | 'center' | 'right' | 'apart';

/**
 * Context value for Tabs components
 */
interface TabsContextValue {
  value: TabsValue;
  onTabChange: (value: TabsValue) => void;
  orientation: TabsOrientation;
  variant: TabsVariant;
  color: MantineColor;
  radius: MantineNumberSize;
  keepMounted: boolean;
  getTabId: (value: string) => string;
  getPanelId: (value: string) => string;
}

const TabsContext = createContext<TabsContextValue | null>(null);

/**
 * Hook to access Tabs context
 */
const useTabsContext = () => {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error('Tabs compound components must be used within Tabs');
  }
  return context;
};

/**
 * Root Tabs component props
 *
 * @property {TabsValue} [value] - Currently active tab value (controlled mode)
 * @property {TabsValue} [defaultValue] - Default active tab (uncontrolled mode)
 * @property {(value: TabsValue) => void} [onTabChange] - Callback fired when active tab changes
 * @property {TabsOrientation} [orientation] - Tab orientation (horizontal or vertical)
 * @property {TabsVariant} [variant] - Visual variant (default, outline, or pills)
 * @property {MantineColor} [color] - Active tab color from theme
 * @property {MantineNumberSize} [radius] - Border radius for tabs
 * @property {boolean} [keepMounted] - If false, inactive panel content is unmounted
 * @property {React.ReactNode} children - Tabs content (List, Tab, and Panel components)
 * @property {any} [style] - Additional style overrides
 */
export interface TabsProps extends DefaultProps {
  /** Currently active tab value (controlled) */
  value?: TabsValue;

  /** Default active tab value (uncontrolled) */
  defaultValue?: TabsValue;

  /** Called when active tab changes */
  onTabChange?: (value: TabsValue) => void;

  /** Tabs orientation */
  orientation?: TabsOrientation;

  /** Tabs variant */
  variant?: TabsVariant;

  /** Active tab color */
  color?: MantineColor;

  /** Border radius for tabs */
  radius?: MantineNumberSize;

  /** If false, Tabs.Panel content will not stay mounted when tab is not active */
  keepMounted?: boolean;

  /** Tabs content */
  children: React.ReactNode;

  /** Additional styles */
  style?: any;
}

/**
 * TabsList component props
 *
 * @property {React.ReactNode} children - Tab button components
 * @property {boolean} [grow] - If true, tabs grow to fill container width
 * @property {TabsPosition} [position] - Tab alignment (left, center, right, or apart)
 * @property {any} [style] - Additional style overrides
 */
export interface TabsListProps extends DefaultProps {
  /** Tab buttons */
  children: React.ReactNode;

  /** Tabs grow to fill container */
  grow?: boolean;

  /** Tabs alignment */
  position?: TabsPosition;

  /** Additional styles */
  style?: any;
}

/**
 * Tab component props
 *
 * @property {string} value - Tab value (required, must match corresponding panel value)
 * @property {React.ReactNode} [children] - Tab label content
 * @property {React.ReactNode} [icon] - Icon displayed before label
 * @property {React.ReactNode} [rightSection] - Content displayed after label
 * @property {boolean} [disabled] - Disables tab interaction
 * @property {MantineColor} [color] - Override tab color (uses Tabs color by default)
 * @property {any} [style] - Additional style overrides
 */
export interface TabProps extends DefaultProps {
  /** Tab value (required, must match panel value) */
  value: string;

  /** Tab label */
  children?: React.ReactNode;

  /** Icon before label */
  icon?: React.ReactNode;

  /** Content after label */
  rightSection?: React.ReactNode;

  /** Disabled state */
  disabled?: boolean;

  /** Override tab color */
  color?: MantineColor;

  /** Additional styles */
  style?: any;
}

/**
 * TabsPanel component props
 *
 * @property {string} value - Panel value (must match corresponding tab value)
 * @property {React.ReactNode} children - Panel content
 * @property {any} [style] - Additional style overrides
 */
export interface TabsPanelProps extends DefaultProps {
  /** Panel value (must match tab value) */
  value: string;

  /** Panel content */
  children: React.ReactNode;

  /** Additional styles */
  style?: any;
}

const useTabsStyles = createStyles(
  (
    _theme,
    {
      orientation,
    }: {
      orientation: TabsOrientation;
    }
  ) => ({
    root: {
      flexDirection: orientation === 'horizontal' ? 'column' : 'row',
    },
  })
);

const useTabsListStyles = createStyles(
  (
    theme,
    {
      orientation,
      position,
    }: {
      orientation: TabsOrientation;
      position: TabsPosition;
    }
  ) => {
    const getJustifyContent = () => {
      if (position === 'left') return 'flex-start';
      if (position === 'center') return 'center';
      if (position === 'right') return 'flex-end';
      if (position === 'apart') return 'space-between';
      return 'flex-start';
    };

    return {
      tabsList: {
        flexDirection: orientation === 'horizontal' ? 'row' : 'column',
        justifyContent: getJustifyContent(),
        borderBottomWidth: orientation === 'horizontal' ? 1 : 0,
        borderBottomColor:
          theme.colorScheme === 'dark' ? theme.colors.dark?.[4] : theme.colors.gray?.[3],
      },
    };
  }
);

const useTabStyles = createStyles(
  (
    theme,
    {
      orientation,
      variant,
      color,
      radius,
      isActive,
      disabled,
    }: {
      orientation: TabsOrientation;
      variant: TabsVariant;
      color: MantineColor;
      radius: MantineNumberSize;
      isActive: boolean;
      disabled: boolean;
    }
  ) => {
    const themeColor = theme.fn.themeColor(
      color,
      theme.fn.primaryShade(),
      true
    );

    const getVariantStyles = () => {
      if (variant === 'pills') {
        return {
          borderRadius: theme.fn.radius(radius),
          backgroundColor: isActive
            ? themeColor
            : 'transparent',
          ...(isActive && {
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.05,
            shadowRadius: 1,
            elevation: 1,
          }),
        };
      }

      if (variant === 'outline') {
        return {
          borderWidth: 1,
          borderColor: isActive
            ? themeColor
            : theme.colorScheme === 'dark'
            ? theme.colors.dark?.[4]
            : theme.colors.gray?.[3],
          borderRadius: theme.fn.radius(radius),
          backgroundColor: isActive
            ? theme.fn.rgba(themeColor, 0.1)
            : 'transparent',
        };
      }

      // default variant
      return {
        borderBottomWidth: orientation === 'horizontal' ? 2 : 0,
        borderRightWidth: orientation === 'vertical' ? 2 : 0,
        borderBottomColor: isActive ? themeColor : 'transparent',
        borderRightColor: isActive ? themeColor : 'transparent',
      };
    };

    return {
      tab: {
        paddingVertical: rem(8),
        paddingHorizontal: rem(16),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: disabled ? 0.4 : 1,
        ...getVariantStyles(),
      },
      tabLabel: {
        fontSize: theme.fontSizes.sm as number,
        fontWeight: '500',
        color: isActive
          ? variant === 'pills'
            ? theme.white
            : themeColor
          : theme.colorScheme === 'dark'
          ? theme.colors.dark?.[0]
          : theme.colors.gray?.[7],
      },
      tabIcon: {
        marginRight: rem(8),
      },
      tabRightSection: {
        marginLeft: rem(8),
      },
    };
  }
);

const useTabsPanelStyles = createStyles((_theme) => ({
  panel: {
    paddingVertical: rem(16),
  },
}));

const defaultTabsProps: Partial<TabsProps> = {
  orientation: 'horizontal',
  variant: 'default',
  color: 'blue',
  radius: 'sm',
  keepMounted: true,
};

const defaultTabsListProps: Partial<TabsListProps> = {
  grow: false,
  position: 'left',
};

/**
 * Root Tabs component
 *
 * Tabs component is used to organize and navigate between different sections of content.
 * It supports controlled and uncontrolled modes, multiple variants, and compound component pattern.
 *
 * @example
 * ```tsx
 * <Tabs defaultValue="gallery">
 *   <Tabs.List>
 *     <Tabs.Tab value="gallery">Gallery</Tabs.Tab>
 *     <Tabs.Tab value="messages">Messages</Tabs.Tab>
 *   </Tabs.List>
 *
 *   <Tabs.Panel value="gallery">Gallery content</Tabs.Panel>
 *   <Tabs.Panel value="messages">Messages content</Tabs.Panel>
 * </Tabs>
 * ```
 */
export const Tabs = forwardRef<any, TabsProps>((props, ref) => {
  const {
    value: controlledValue,
    defaultValue,
    onTabChange,
    orientation,
    variant,
    color,
    radius,
    keepMounted,
    children,
    style,
    ...others
  } = useComponentDefaultProps('Tabs', defaultTabsProps, props);

  const [uncontrolledValue, setUncontrolledValue] = useState<TabsValue>(
    defaultValue ?? null
  );

  const idCounter = useRef(0);
  const baseId = useRef(`tabs-${++idCounter.current}`).current;

  const value =
    controlledValue !== undefined ? controlledValue : uncontrolledValue;

  const handleTabChange = (newValue: TabsValue) => {
    if (controlledValue === undefined) {
      setUncontrolledValue(newValue);
    }
    onTabChange?.(newValue);
  };

  const getTabId = (tabValue: string) => `${baseId}-tab-${tabValue}`;
  const getPanelId = (tabValue: string) => `${baseId}-panel-${tabValue}`;

  const { styles, sx } = useTabsStyles(
    { orientation: orientation || 'horizontal' },
    { name: 'Tabs' }
  ) as any;

  return (
    <TabsContext.Provider
      value={{
        value,
        onTabChange: handleTabChange,
        orientation: orientation || 'horizontal',
        variant: variant || 'default',
        color: color || 'blue',
        radius: radius || 'sm',
        keepMounted: keepMounted ?? true,
        getTabId,
        getPanelId,
      }}
    >
      <BoxView ref={ref} style={sx(styles.root, style)} {...others}>
        {children}
      </BoxView>
    </TabsContext.Provider>
  );
});

/**
 * TabsList component
 *
 * Container for tab buttons.
 *
 * @example
 * ```tsx
 * <Tabs.List grow position="center">
 *   <Tabs.Tab value="1">Tab 1</Tabs.Tab>
 *   <Tabs.Tab value="2">Tab 2</Tabs.Tab>
 * </Tabs.List>
 * ```
 */
export const TabsList = forwardRef<any, TabsListProps>((props, ref) => {
  const { children, grow, position, style, ...others } = useComponentDefaultProps(
    'TabsList',
    defaultTabsListProps,
    props
  );

  const context = useTabsContext();
  const { styles, sx } = useTabsListStyles(
    {
      orientation: context.orientation,
      position: position || 'left',
    },
    { name: 'TabsList' }
  ) as any;

  return (
    <BoxView
      ref={ref}
      style={sx(styles.tabsList, style)}
      accessibilityRole="tablist"
      {...others}
    >
      {children}
    </BoxView>
  );
});

/**
 * Tab component
 *
 * Individual tab button.
 *
 * @example
 * ```tsx
 * <Tabs.Tab value="settings" icon={<SettingsIcon />} disabled>
 *   Settings
 * </Tabs.Tab>
 * ```
 */
export const Tab = forwardRef<any, TabProps>((props, ref) => {
  const { value, children, icon, rightSection, disabled, color, style, ...others } =
    props;

  const context = useTabsContext();
  const isActive = context.value === value;

  const { styles } = useTabStyles(
    {
      orientation: context.orientation,
      variant: context.variant,
      color: color || context.color,
      radius: context.radius,
      isActive,
      disabled: disabled || false,
    },
    { name: 'Tab' }
  ) as any;

  const handlePress = () => {
    if (disabled) return;
    context.onTabChange(value);
  };

  return (
    <TouchableOpacity
      ref={ref}
      style={[styles.tab, style]}
      onPress={handlePress}
      disabled={disabled}
      activeOpacity={0.7}
      accessibilityRole="tab"
      accessibilityState={{ selected: isActive, disabled: disabled || false }}
      accessibilityLabel={typeof children === 'string' ? children : undefined}
      {...others}
    >
      {icon && <BoxView style={styles.tabIcon}>{icon}</BoxView>}
      {children && <Text style={styles.tabLabel}>{children}</Text>}
      {rightSection && <BoxView style={styles.tabRightSection}>{rightSection}</BoxView>}
    </TouchableOpacity>
  );
});

/**
 * TabsPanel component
 *
 * Content panel for a tab. Only visible when its value matches the active tab.
 *
 * @example
 * ```tsx
 * <Tabs.Panel value="gallery">
 *   <Text>Gallery content here</Text>
 * </Tabs.Panel>
 * ```
 */
export const TabsPanel = forwardRef<any, TabsPanelProps>((props, ref) => {
  const { value, children, style, ...others } = props;

  const context = useTabsContext();
  const { styles, sx } = useTabsPanelStyles({}, { name: 'TabsPanel' }) as any;

  const isActive = context.value === value;
  const content = context.keepMounted ? children : isActive ? children : null;

  if (!isActive && !context.keepMounted) {
    return null;
  }

  return (
    <BoxView
      ref={ref}
      style={sx(
        styles.panel,
        { display: isActive ? 'flex' : 'none' },
        style
      )}
      {...others}
    >
      {content}
    </BoxView>
  );
});

Tabs.displayName = 'Tabs';
TabsList.displayName = 'Tabs.List';
Tab.displayName = 'Tabs.Tab';
TabsPanel.displayName = 'Tabs.Panel';

// Attach sub-components
(Tabs as any).List = TabsList;
(Tabs as any).Tab = Tab;
(Tabs as any).Panel = TabsPanel;
