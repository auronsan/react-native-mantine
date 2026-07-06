import React, { forwardRef } from 'react';
import { UnstyledButton } from '../UnstyledButton';
import { BoxView } from '../BoxView';
import type {
  DefaultProps,
  MantineColor,
  Variants,
} from '../../theme/types';
import { useComponentDefaultProps } from '../../theme/theme-provider';
import { createStyles } from '../../theme';
import { rem } from '../../theme/utils/rem';
import { withTextWrapper, type WithTextWrapperProps } from '../../theme/utils/withTextWrapper';

export interface NavLinkProps extends DefaultProps, WithTextWrapperProps {
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

  /** Accessibility label for the link */
  accessibilityLabel?: string;

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
    const getVariantStyles = () => {
      if (disabled) {
        return {
          backgroundColor: 'transparent',
          color: theme.fn.themeColor('gray', 5),
        };
      }

      if (!active) {
        return {
          backgroundColor: 'transparent',
          color: theme.colorScheme === 'dark'
            ? theme.fn.themeColor('dark', 0)
            : theme.black,
        };
      }

      switch (variant) {
        case 'filled': {
          const variantStyles = theme.fn.variant({ variant: 'filled', color });
          return {
            backgroundColor: variantStyles.background,
            color: variantStyles.color,
          };
        }
        case 'light': {
          const variantStyles = theme.fn.variant({ variant: 'light', color });
          return {
            backgroundColor: variantStyles.background,
            color: variantStyles.color,
          };
        }
        case 'subtle': {
          const variantStyles = theme.fn.variant({ variant: 'subtle', color });
          return {
            backgroundColor: variantStyles.background,
            color: variantStyles.color,
          };
        }
        default: {
          const variantStyles = theme.fn.variant({ variant: 'light', color });
          return {
            backgroundColor: variantStyles.background,
            color: variantStyles.color,
          };
        }
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
        fontSize: rem(14) as any,
        fontWeight: '500',
        color: variantStyles.color,
      },
      description: {
        fontSize: rem(12),
        marginTop: rem(2) as any,
        color: theme.colorScheme === 'dark'
          ? theme.fn.themeColor('dark', 2)
          : theme.fn.themeColor('gray', 6),
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
) as any;

const defaultProps: Partial<NavLinkProps> = {
  color: 'blue',
  variant: 'light',
  active: false,
  disabled: false,
  disableIfNoPress: true,
  withTextWrapper: true,
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
    accessibilityLabel,
    style,
    disableIfNoPress,
    withTextWrapper: shouldWrapInText,
    ...others
  } = useComponentDefaultProps('NavLink', defaultProps, props);

  const { styles, sx} = useStyles(
    { color, active, disabled },
    { name: 'NavLink', variant }
  ) as any;

  const isDisabled = disabled || (disableIfNoPress && !onPress);

  return (
    <BoxView>
      <UnstyledButton
        ref={ref}
        onPress={isDisabled ? undefined : onPress}
        style={sx(styles.root, isDisabled && { opacity: 0.6 }, style)}
        accessibilityRole={onPress ? 'button' : 'link'}
        accessibilityState={{ selected: active, disabled: isDisabled }}
        accessibilityLabel={accessibilityLabel || (typeof label === 'string' ? label : undefined)}
        {...others}
      >
        {icon && <BoxView style={styles.icon}>{icon}</BoxView>}
        <BoxView style={styles.body}>
          {label && withTextWrapper(label, shouldWrapInText, styles.label)}
          {description && withTextWrapper(description, shouldWrapInText, styles.description)}
        </BoxView>
        {rightSection && <BoxView style={styles.rightSection}>{rightSection}</BoxView>}
      </UnstyledButton>
      {children && <BoxView style={styles.children}>{children}</BoxView>}
    </BoxView>
  );
});

NavLink.displayName = 'NavLink';
