import React, { createContext, forwardRef, useContext } from 'react';
import { View } from 'react-native';
import { BoxView } from '../BoxView';
import type {
  DefaultProps,
  MantineNumberSize,
  MantineSize,
} from '../../theme/types';
import { useComponentDefaultProps, useTheme } from '../../theme/theme-provider';
import { createStyles } from '../../theme';

export interface AppShellHeaderConfig {
  /** Header height in px */
  height: number;
}

export interface AppShellFooterConfig {
  /** Footer height in px */
  height: number;
}

export interface AppShellNavbarConfig {
  /** Navbar width in px */
  width: number;

  /** Hides the navbar and removes its offset */
  collapsed?: boolean;
}

export interface AppShellAsideConfig {
  /** Aside width in px */
  width: number;

  /** Hides the aside and removes its offset */
  collapsed?: boolean;
}

export interface AppShellProps extends DefaultProps {
  /** Header configuration, required when AppShell.Header is used */
  header?: AppShellHeaderConfig;

  /** Footer configuration, required when AppShell.Footer is used */
  footer?: AppShellFooterConfig;

  /** Navbar configuration, required when AppShell.Navbar is used */
  navbar?: AppShellNavbarConfig;

  /** Aside configuration, required when AppShell.Aside is used */
  aside?: AppShellAsideConfig;

  /** Key of theme.spacing or number, padding of AppShell.Main */
  padding?: MantineNumberSize;

  /** AppShell content: Header, Navbar, Aside, Footer and Main sections */
  children?: React.ReactNode;
}

interface AppShellContextValue {
  headerHeight: number;
  footerHeight: number;
  navbarWidth: number;
  asideWidth: number;
  paddingValue: number;
}

const AppShellContext = createContext<AppShellContextValue>({
  headerHeight: 0,
  footerHeight: 0,
  navbarWidth: 0,
  asideWidth: 0,
  paddingValue: 0,
});

const useAppShellContext = () => useContext(AppShellContext);

const useStyles = createStyles((theme) => ({
  root: {
    flex: 1,
    position: 'relative',
    backgroundColor:
      theme.colorScheme === 'dark'
        ? theme.fn.themeColor('dark', 8)
        : theme.white,
  },
  section: {
    position: 'absolute',
    backgroundColor:
      theme.colorScheme === 'dark'
        ? theme.fn.themeColor('dark', 7)
        : theme.white,
  },
  header: {
    top: 0,
    left: 0,
    right: 0,
    borderBottomWidth: 1,
    borderBottomColor:
      theme.colorScheme === 'dark'
        ? theme.fn.themeColor('dark', 4)
        : theme.fn.themeColor('gray', 3),
    zIndex: 100,
  },
  footer: {
    bottom: 0,
    left: 0,
    right: 0,
    borderTopWidth: 1,
    borderTopColor:
      theme.colorScheme === 'dark'
        ? theme.fn.themeColor('dark', 4)
        : theme.fn.themeColor('gray', 3),
    zIndex: 100,
  },
  navbar: {
    left: 0,
    borderRightWidth: 1,
    borderRightColor:
      theme.colorScheme === 'dark'
        ? theme.fn.themeColor('dark', 4)
        : theme.fn.themeColor('gray', 3),
    zIndex: 90,
  },
  aside: {
    right: 0,
    borderLeftWidth: 1,
    borderLeftColor:
      theme.colorScheme === 'dark'
        ? theme.fn.themeColor('dark', 4)
        : theme.fn.themeColor('gray', 3),
    zIndex: 90,
  },
  main: {
    flex: 1,
  },
}));

const defaultProps: Partial<AppShellProps> = {
  padding: 'md',
};

export interface AppShellSectionProps extends DefaultProps {
  children?: React.ReactNode;
}

const AppShellHeader = forwardRef<View, AppShellSectionProps>(
  ({ children, style, ...others }, ref) => {
    const { styles, sx } = useStyles({}, { name: 'AppShell' });
    const { headerHeight } = useAppShellContext();

    return (
      <BoxView
        ref={ref}
        style={sx(styles.section, styles.header, { height: headerHeight }, style)}
        {...others}
      >
        {children}
      </BoxView>
    );
  }
);

const AppShellFooter = forwardRef<View, AppShellSectionProps>(
  ({ children, style, ...others }, ref) => {
    const { styles, sx } = useStyles({}, { name: 'AppShell' });
    const { footerHeight } = useAppShellContext();

    return (
      <BoxView
        ref={ref}
        style={sx(styles.section, styles.footer, { height: footerHeight }, style)}
        {...others}
      >
        {children}
      </BoxView>
    );
  }
);

const AppShellNavbar = forwardRef<View, AppShellSectionProps>(
  ({ children, style, ...others }, ref) => {
    const { styles, sx } = useStyles({}, { name: 'AppShell' });
    const { navbarWidth, headerHeight, footerHeight } = useAppShellContext();

    if (navbarWidth === 0) {
      return null;
    }

    return (
      <BoxView
        ref={ref}
        style={sx(
          styles.section,
          styles.navbar,
          { width: navbarWidth, top: headerHeight, bottom: footerHeight },
          style
        )}
        {...others}
      >
        {children}
      </BoxView>
    );
  }
);

const AppShellAside = forwardRef<View, AppShellSectionProps>(
  ({ children, style, ...others }, ref) => {
    const { styles, sx } = useStyles({}, { name: 'AppShell' });
    const { asideWidth, headerHeight, footerHeight } = useAppShellContext();

    if (asideWidth === 0) {
      return null;
    }

    return (
      <BoxView
        ref={ref}
        style={sx(
          styles.section,
          styles.aside,
          { width: asideWidth, top: headerHeight, bottom: footerHeight },
          style
        )}
        {...others}
      >
        {children}
      </BoxView>
    );
  }
);

const AppShellMain = forwardRef<View, AppShellSectionProps>(
  ({ children, style, ...others }, ref) => {
    const { styles, sx } = useStyles({}, { name: 'AppShell' });
    const { headerHeight, footerHeight, navbarWidth, asideWidth, paddingValue } =
      useAppShellContext();

    return (
      <BoxView
        ref={ref}
        style={sx(
          styles.main,
          {
            paddingTop: headerHeight + paddingValue,
            paddingBottom: footerHeight + paddingValue,
            paddingLeft: navbarWidth + paddingValue,
            paddingRight: asideWidth + paddingValue,
          },
          style
        )}
        {...others}
      >
        {children}
      </BoxView>
    );
  }
);

interface AppShellComponent
  extends React.ForwardRefExoticComponent<
    AppShellProps & React.RefAttributes<View>
  > {
  Header: typeof AppShellHeader;
  Footer: typeof AppShellFooter;
  Navbar: typeof AppShellNavbar;
  Aside: typeof AppShellAside;
  Main: typeof AppShellMain;
}

/**
 * AppShell arranges header, navbar, aside, footer and main content into an
 * application layout. Port of Mantine v7 AppShell adapted for React Native:
 * sections are absolutely positioned and Main receives matching offsets.
 */
export const AppShell = forwardRef<View, AppShellProps>((props, ref) => {
  const { header, footer, navbar, aside, padding, children, style, ...others } =
    useComponentDefaultProps('AppShell', defaultProps, props);

  const theme = useTheme();
  const { styles, sx } = useStyles({}, { name: 'AppShell' });

  const paddingValue =
    typeof padding === 'number'
      ? padding
      : (theme.spacing[padding as MantineSize] ?? theme.spacing.md);

  const contextValue: AppShellContextValue = {
    headerHeight: header?.height ?? 0,
    footerHeight: footer?.height ?? 0,
    navbarWidth: navbar && !navbar.collapsed ? navbar.width : 0,
    asideWidth: aside && !aside.collapsed ? aside.width : 0,
    paddingValue,
  };

  return (
    <AppShellContext.Provider value={contextValue}>
      <BoxView ref={ref} style={sx(styles.root, style)} {...others}>
        {children}
      </BoxView>
    </AppShellContext.Provider>
  );
}) as AppShellComponent;

AppShell.Header = AppShellHeader;
AppShell.Footer = AppShellFooter;
AppShell.Navbar = AppShellNavbar;
AppShell.Aside = AppShellAside;
AppShell.Main = AppShellMain;

AppShell.displayName = 'AppShell';
AppShellHeader.displayName = 'AppShell.Header';
AppShellFooter.displayName = 'AppShell.Footer';
AppShellNavbar.displayName = 'AppShell.Navbar';
AppShellAside.displayName = 'AppShell.Aside';
AppShellMain.displayName = 'AppShell.Main';
