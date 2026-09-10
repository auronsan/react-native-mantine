import React, { forwardRef } from 'react';
import { TouchableOpacity } from 'react-native';
import { BoxView } from '../BoxView';
import { Text } from '../Text';
import { Loader } from '../Loader';
import type { DefaultProps, MantineColor, MantineNumberSize } from '../../theme/types';
import { useComponentDefaultProps } from '../../theme/theme-provider';
import { createStyles } from '../../theme';
import { rem } from '../../theme/utils/rem';
import { withTextWrapper, type WithTextWrapperProps } from '../../theme/utils/withTextWrapper';

export interface NotificationProps extends DefaultProps, WithTextWrapperProps {
  /** Notification title */
  title?: React.ReactNode;

  /** Notification message */
  message?: React.ReactNode;

  /** Notification children (alternative to message) */
  children?: React.ReactNode;

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
    const borderColor = theme.fn.themeColor(color, 6);

    return {
      root: {
        backgroundColor: theme.colorScheme === 'dark' ? theme.fn.themeColor('dark', 6) : theme.white,
        borderRadius: theme.fn.radius(radius),
        padding: theme.spacing.md,
        flexDirection: 'row',
        alignItems: 'flex-start',
        ...(withBorder && {
          borderWidth: 1,
          borderColor:
            theme.colorScheme === 'dark' ? theme.fn.themeColor('dark', 4) : theme.fn.themeColor('gray', 3),
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
        color: theme.colorScheme === 'dark' ? theme.fn.themeColor('dark', 2) : theme.fn.themeColor('gray', 6),
        lineHeight: theme.fontSizes.sm * 1.5,
      },
      closeButton: {
        width: rem(24) as any,
        height: rem(24) as any,
        borderRadius: rem(12) as any,
        backgroundColor:
          theme.colorScheme === 'dark' ? theme.fn.themeColor('dark', 5) : theme.fn.themeColor('gray', 1),
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
  withTextWrapper: true,
};

export const Notification = forwardRef<any, NotificationProps>((props, ref) => {
  const {
    title,
    message,
    children,
    color,
    radius,
    icon,
    withCloseButton,
    onClose,
    loading,
    withBorder,
    style,
    withTextWrapper: shouldWrapInText,
    ...others
  } = useComponentDefaultProps('Notification', defaultProps, props);

  const { styles, sx} = useStyles(
    { color, radius, withBorder, withIcon: !!icon },
    { name: 'Notification' }
  ) as any;

  // `children` is an alternative to `message`; `message` wins when both are set
  const body = message ?? children;

  return (
    <BoxView
      ref={ref}
      style={sx(styles.root, style)}
      accessibilityRole="alert"
      accessibilityLabel={typeof title === 'string' ? title : undefined}
      accessibilityState={{ busy: !!loading }}
      {...others}
    >
      {loading ? (
        <BoxView style={styles.loader}>
          <Loader size="sm" color={color} />
        </BoxView>
      ) : (
        icon && <BoxView style={styles.icon}>{icon}</BoxView>
      )}

      <BoxView style={styles.body}>
        {title && withTextWrapper(title, shouldWrapInText, { style: styles.title })}
        {body && withTextWrapper(body, shouldWrapInText, { style: styles.message })}
      </BoxView>

      {withCloseButton && onClose && (
        <TouchableOpacity
          style={styles.closeButton}
          onPress={onClose}
          activeOpacity={0.7}
          accessibilityRole="button"
          accessibilityLabel="Close notification"
        >
          <Text style={styles.closeButtonText}>×</Text>
        </TouchableOpacity>
      )}
    </BoxView>
  );
});

Notification.displayName = 'Notification';
