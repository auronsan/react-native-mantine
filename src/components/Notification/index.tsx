import React, { forwardRef } from 'react';
import { TouchableOpacity } from 'react-native';
import { BoxView } from '../BoxView';
import { Text } from '../Text';
import type { DefaultProps, MantineColor, MantineNumberSize } from '../../theme/types';
import { useComponentDefaultProps } from '../../theme/theme-provider';
import { createStyles } from '../../theme';
import { rem } from '../../theme/utils/rem';

export interface NotificationProps extends DefaultProps {
  /** Notification title */
  title?: React.ReactNode;

  /** Notification message */
  message?: React.ReactNode;

  /** Notification color */
  color?: MantineColor;

  /** Border radius */
  radius?: MantineNumberSize;

  /** Icon to display on the left */
  icon?: React.ReactNode;

  /** If true, close button will be shown */
  withCloseButton?: boolean;

  /** Called when close button is clicked */
  onClose?: () => void;

  /** Loading state */
  loading?: boolean;

  /** If true, notification will not have border */
  withBorder?: boolean;

  /** Additional styles */
  style?: any;
}

const useStyles = createStyles(
  (
    theme,
    {
      color,
      radius,
      withBorder,
    }: {
      color: MantineColor;
      radius: MantineNumberSize;
      withBorder: boolean;
      withIcon: boolean;
    }
  ) => {
    const colors = theme.colors[color] || theme.colors[theme.primaryColor];
    const borderColor = colors?.[6] || colors?.[5] || theme.primaryBgColor;

    return {
      root: {
        backgroundColor: theme.colorScheme === 'dark' ? (theme.colors.dark || [])[6] : theme.white,
        borderRadius: theme.fn.radius(radius),
        padding: theme.spacing.md,
        flexDirection: 'row',
        alignItems: 'flex-start',
        ...(withBorder && {
          borderWidth: 1,
          borderColor:
            theme.colorScheme === 'dark' ? (theme.colors.dark || [])[4] : (theme.colors.gray || [])[3],
          borderLeftWidth: rem(4) as any,
          borderLeftColor: borderColor,
        }),
        // Shadow for elevation
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 3,
      },
      icon: {
        marginRight: theme.spacing.md,
        paddingTop: rem(2) as any,
      },
      body: {
        flex: 1,
      },
      title: {
        fontSize: theme.fontSizes.sm as number,
        fontWeight: '600',
        color: theme.colorScheme === 'dark' ? theme.white : theme.black,
        marginBottom: theme.spacing.xs,
      },
      message: {
        fontSize: theme.fontSizes.sm as number,
        color: theme.colorScheme === 'dark' ? (theme.colors.dark || [])[2] : (theme.colors.gray || [])[6],
        lineHeight: theme.fontSizes.sm * 1.5,
      },
      closeButton: {
        width: rem(24) as any,
        height: rem(24) as any,
        borderRadius: rem(12) as any,
        backgroundColor:
          theme.colorScheme === 'dark' ? (theme.colors.dark || [])[5] : (theme.colors.gray || [])[1],
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: theme.spacing.sm,
      },
      closeButtonText: {
        fontSize: rem(16) as any,
        color: theme.colorScheme === 'dark' ? theme.white : theme.black,
      },
      loader: {
        marginRight: theme.spacing.md,
      },
    };
  }
) as any;

const defaultProps: Partial<NotificationProps> = {
  color: 'blue',
  radius: 'sm',
  withCloseButton: true,
  withBorder: true,
  loading: false,
};

export const Notification = forwardRef<any, NotificationProps>((props, ref) => {
  const {
    title,
    message,
    color,
    radius,
    icon,
    withCloseButton,
    onClose,
    loading,
    withBorder,
    style,
    ...others
  } = useComponentDefaultProps('Notification', defaultProps, props);

  const { styles, sx} = useStyles(
    { color, radius, withBorder, withIcon: !!icon },
    { name: 'Notification' }
  ) as any;

  return (
    <BoxView ref={ref} style={sx(styles.root, style)} {...others}>
      {icon && <BoxView style={styles.icon}>{icon}</BoxView>}

      <BoxView style={styles.body}>
        {title && (
          <Text style={styles.title}>{typeof title === 'string' ? title : title}</Text>
        )}
        {message && (
          <Text style={styles.message}>{typeof message === 'string' ? message : message}</Text>
        )}
      </BoxView>

      {withCloseButton && onClose && (
        <TouchableOpacity style={styles.closeButton} onPress={onClose} activeOpacity={0.7}>
          <Text style={styles.closeButtonText}>×</Text>
        </TouchableOpacity>
      )}
    </BoxView>
  );
});

Notification.displayName = 'Notification';
