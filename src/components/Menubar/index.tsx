import React, { forwardRef, useState, type ReactElement, type ReactNode } from 'react';
import { View } from 'react-native';
import { BoxView } from '../BoxView';
import { Menu, type MenuProps } from '../Menu';
import type { DefaultProps } from '../../theme/types';
import { useComponentDefaultProps } from '../../theme/theme-provider';
import { createStyles } from '../../theme';

export interface MenubarMenuProps
  extends Omit<MenuProps, 'children' | 'opened' | 'onChange'> {
  /** Element that toggles the menu */
  target: ReactElement;

  /** Dropdown content (Menubar.Item, Menubar.Label, Menubar.Divider) */
  children: ReactNode;
}

const MenubarMenu: React.FC<MenubarMenuProps> = () => null;

MenubarMenu.displayName = 'Menubar.Menu';

export interface MenubarProps extends DefaultProps {
  /** Menubar.Menu components */
  children: ReactNode;

  /** Controlled index of the opened menu, null when all menus are closed */
  openIndex?: number | null;

  /** Initially opened menu index for uncontrolled usage */
  defaultOpenIndex?: number | null;

  /** Called with the opened menu index or null when menus close */
  onOpenChange?: (index: number | null) => void;
}

const useStyles = createStyles((theme) => ({
  root: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    padding: 4,
    borderRadius: theme.fn.radius('sm'),
    borderWidth: 1,
    borderColor:
      theme.colorScheme === 'dark'
        ? theme.fn.themeColor('dark', 4)
        : theme.fn.themeColor('gray', 3),
    alignSelf: 'flex-start',
  },
}));

const defaultProps: Partial<MenubarProps> = {
  defaultOpenIndex: null,
};

/**
 * Menubar displays a horizontal bar of menus. Each Menubar.Menu wraps the
 * existing Menu component; only one menu can be opened at a time.
 */
const MenubarBase = forwardRef<View, MenubarProps>((props, ref) => {
  const {
    children,
    openIndex,
    defaultOpenIndex,
    onOpenChange,
    style,
    ...others
  } = useComponentDefaultProps('Menubar', defaultProps, props);

  const { styles, sx } = useStyles({}, { name: 'Menubar' });

  const [internalOpen, setInternalOpen] = useState<number | null>(
    defaultOpenIndex ?? null
  );
  const opened = openIndex !== undefined ? openIndex : internalOpen;

  const setOpened = (index: number | null) => {
    if (openIndex === undefined) {
      setInternalOpen(index);
    }
    onOpenChange?.(index);
  };

  let menuIndex = -1;
  const items = React.Children.map(children, (child) => {
    if (!React.isValidElement(child) || child.type !== MenubarMenu) {
      return child;
    }

    menuIndex += 1;
    const index = menuIndex;
    const {
      target,
      children: content,
      ...menuProps
    } = child.props as MenubarMenuProps;

    return (
      <Menu
        opened={opened === index}
        onChange={(next) => setOpened(next ? index : null)}
        {...menuProps}
      >
        <Menu.Target>{target}</Menu.Target>
        <Menu.Dropdown>{content}</Menu.Dropdown>
      </Menu>
    );
  });

  return (
    <BoxView
      ref={ref}
      style={sx(styles.root, style)}
      accessibilityRole="menubar"
      {...others}
    >
      {items}
    </BoxView>
  );
});

export const Menubar = Object.assign(MenubarBase, {
  Menu: MenubarMenu,
  Item: Menu.Item,
  Label: Menu.Label,
  Divider: Menu.Divider,
}) as typeof MenubarBase & {
  Menu: typeof MenubarMenu;
  Item: typeof Menu.Item;
  Label: typeof Menu.Label;
  Divider: typeof Menu.Divider;
};

Menubar.displayName = 'Menubar';
