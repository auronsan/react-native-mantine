import React, { forwardRef } from 'react';
import { UnstyledButton } from '../UnstyledButton';
import { BoxView } from '../BoxView';
import { Text } from '../Text';
import type {
  DefaultProps,
  MantineColor,
  Variants,
} from '../../theme/types';
import { useComponentDefaultProps } from '../../theme/theme-provider';
import { createStyles } from '../../theme';
import { rem } from '../../theme/utils/rem';

export interface NavLinkProps extends DefaultProps {
  /** Link label */
  label?: React.ReactNode;

  /** Link description */
  description?: React.ReactNode;

  /** Icon displayed on the left side */
  icon?: React.ReactNode;

  /** Section displayed on the right side */
  rightSection?: React.ReactNode;

  /** Link color from theme */
  color?: MantineColor;

  /** Link variant */
  variant?: Variants<'filled' | 'light' | 'subtle'>;

  /** Active state */
  active?: boolean;

  /** Disabled state */
  disabled?: boolean;

  /** Children NavLinks */
  children?: React.ReactNode;

  /** Called when link is pressed */
  onPress?: () => void;

  /** Additional styles */
  style?: any;

  /** Disable link if no onPress handler is provided */
  disableIfNoPress?: boolean;
}

const useStyles = createStyles(
  (
    theme,
    {
      color,
      active,
      disabled,
    }: {
      color: MantineColor;
      active: boolean;
      disabled: boolean;
    },
    { variant }
  ) => {
    const colors = theme.colors[color] || theme.colors[theme.primaryColor];

    const getVariantStyles = () => {
      if (disabled) {
        return {
          backgroundColor: 'transparent',
          color: theme.colors.gray[5],
        };
      }

      if (!active) {
        return {
          backgroundColor: 'transparent',
          color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
        };
      }

      switch (variant) {
        case 'filled':
          return {
            backgroundColor: colors?.[6] || colors?.[5] || theme.primaryBgColor,
            color: theme.white,
          };
        case 'light':
          return {
            backgroundColor: colors?.[0] || colors?.[1] || theme.colors.gray[0],
            color: colors?.[6] || colors?.[5] || theme.primaryBgColor,
          };
        case 'subtle':
          return {
            backgroundColor:
              theme.colorScheme === 'dark'
                ? 'rgba(255, 255, 255, 0.05)'
                : 'rgba(0, 0, 0, 0.05)',
            color: colors?.[6] || colors?.[5] || theme.primaryBgColor,
          };
        default:
          return {
            backgroundColor: colors?.[0] || colors?.[1] || theme.colors.gray[0],
            color: colors?.[6] || colors?.[5] || theme.primaryBgColor,
          };
      }
    };

    const variantStyles = getVariantStyles();

    return {
      root: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: theme.spacing.sm,
        borderRadius: theme.radius.sm,
        backgroundColor: variantStyles.backgroundColor,
        opacity: disabled ? 0.6 : 1,
      },
      icon: {
        marginRight: theme.spacing.sm,
        color: variantStyles.color,
      },
      body: {
        flex: 1,
      },
      label: {
        fontSize: rem(14),
        fontWeight: '500',
        color: variantStyles.color,
      },
      description: {
        fontSize: rem(12),
        marginTop: rem(2),
        color:
          theme.colorScheme === 'dark'
            ? theme.colors.dark[2]
            : theme.colors.gray[6],
      },
      rightSection: {
        marginLeft: theme.spacing.sm,
        color: variantStyles.color,
      },
      children: {
        marginTop: theme.spacing.xs,
        marginLeft: theme.spacing.md,
      },
    };
  }
);

const defaultProps: Partial<NavLinkProps> = {
  color: 'blue',
  variant: 'light',
  active: false,
  disabled: false,
  disableIfNoPress: true,
};

export const NavLink = forwardRef<any, NavLinkProps>((props, ref) => {
  const {
    label,
    description,
    icon,
    rightSection,
    color,
    variant,
    active,
    disabled,
    children,
    onPress,
    style,
    disableIfNoPress,
    ...others
  } = useComponentDefaultProps('NavLink', defaultProps, props);

  const { styles, sx } = useStyles(
    { color, active, disabled },
    { name: 'NavLink', variant }
  ) as any;

  const isDisabled = disabled || (disableIfNoPress && !onPress);

  return (
    <BoxView>
      <UnstyledButton
        ref={ref}
        onPress={isDisabled ? undefined : onPress}
        style={sx(styles.root, style)}
        disabled={isDisabled}
        {...others}
      >
        {icon && <BoxView style={styles.icon}>{icon}</BoxView>}
        <BoxView style={styles.body}>
          {label && <Text style={styles.label}>{label}</Text>}
          {description && <Text style={styles.description}>{description}</Text>}
        </BoxView>
        {rightSection && <BoxView style={styles.rightSection}>{rightSection}</BoxView>}
      </UnstyledButton>
      {children && <BoxView style={styles.children}>{children}</BoxView>}
    </BoxView>
  );
});

NavLink.displayName = 'NavLink';
