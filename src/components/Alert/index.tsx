import React, { forwardRef } from 'react';
import { TouchableOpacity } from 'react-native';
import { BoxView } from '../BoxView';
import { Text } from '../Text';
import type { DefaultProps, MantineColor, MantineNumberSize } from '../../theme/types';
import { useComponentDefaultProps } from '../../theme/theme-provider';
import { useStyles } from './Alert.styles';
import { withTextWrapper, type WithTextWrapperProps } from '../../theme/utils/withTextWrapper';

/**
 * Props for the Alert component
 *
 * @property {React.ReactNode} [title] - Alert title displayed prominently
 * @property {React.ReactNode} children - Alert message content (required)
 * @property {'filled' | 'outline' | 'light'} [variant] - Visual style variant
 * @property {MantineColor} [color] - Alert color from theme (affects background, border, and text)
 * @property {React.ReactNode} [icon] - Icon displayed next to the title
 * @property {boolean} [withCloseButton] - Shows close button for dismissible alerts
 * @property {() => void} [onClose] - Callback fired when close button is clicked
 * @property {string} [closeButtonLabel] - Accessibility label for close button
 * @property {MantineNumberSize} [radius] - Border radius from theme or custom value
 * @property {string} [accessibilityLabel] - Label for screen readers
 * @property {any} [style] - Additional style overrides
 */
export interface AlertProps extends DefaultProps, WithTextWrapperProps {
  /** Alert title */
  title?: React.ReactNode;

  /** Alert message */
  children: React.ReactNode;

  /** Controls Alert background, color and border styles */
  variant?: 'filled' | 'outline' | 'light';

  /** Key of theme.colors */
  color?: MantineColor;

  /** Icon displayed next to the title */
  icon?: React.ReactNode;

  /** Determines whether close button should be displayed */
  withCloseButton?: boolean;

  /** Called when close button is clicked */
  onClose?: () => void;

  /** Close button accessibility label */
  closeButtonLabel?: string;

  /** Key of theme.radius or any valid value to set border-radius */
  radius?: MantineNumberSize;

  /** Custom accessibility label */
  accessibilityLabel?: string;

  /** Additional styles */
  style?: any;
}

const defaultProps: Partial<AlertProps> = {
  variant: 'light',
  color: 'blue',
  radius: 'sm',
  withCloseButton: false,
  withTextWrapper: true,
};

/**
 * Alert component for React Native Mantine
 *
 * A notification component for displaying important messages to users. Supports
 * multiple variants (filled, outline, light), customizable colors, icons, titles,
 * and optional close buttons for dismissible alerts.
 *
 * @example
 * ```tsx
 * // Basic alert
 * <Alert color="blue">
 *   This is an informational message
 * </Alert>
 *
 * // Alert with title and icon
 * <Alert
 *   title="Success!"
 *   color="green"
 *   icon={<CheckIcon />}
 * >
 *   Your changes have been saved successfully.
 * </Alert>
 *
 * // Dismissible alert
 * <Alert
 *   title="Warning"
 *   color="yellow"
 *   variant="outline"
 *   withCloseButton
 *   onClose={() => setShowAlert(false)}
 * >
 *   Please review your input before submitting.
 * </Alert>
 * ```
 */
export const Alert = forwardRef<any, AlertProps>((props, ref) => {
  const {
    title,
    children,
    variant,
    color,
    icon,
    withCloseButton,
    onClose,
    closeButtonLabel,
    radius,
    accessibilityLabel,
    style,
    withTextWrapper: shouldWrapInText,
    ...others
  } = useComponentDefaultProps('Alert', defaultProps, props);

  const { styles, sx } = useStyles(
    {
      color: color ?? 'blue',
      radius: radius ?? 'sm',
      variant: variant ?? 'light',
    },
    { name: 'Alert' }
  ) as any;

  return (
    <BoxView
      ref={ref}
      style={sx(styles.root, style)}
      accessibilityRole="alert"
      accessibilityLabel={accessibilityLabel}
      {...others}
    >
      <BoxView style={styles.wrapper}>
        {icon && <BoxView style={styles.icon}>{icon}</BoxView>}

        <BoxView style={styles.body}>
          {title && (
            <BoxView style={styles.title}>
              {withTextWrapper(title, shouldWrapInText, { style: styles.label })}
            </BoxView>
          )}

          <BoxView style={styles.message}>
            {withTextWrapper(children, shouldWrapInText, { style: styles.messageText })}
          </BoxView>
        </BoxView>

        {withCloseButton && onClose && (
          <TouchableOpacity
            style={styles.closeButton}
            onPress={onClose}
            activeOpacity={0.7}
            accessibilityRole="button"
            accessibilityLabel={closeButtonLabel || 'Close alert'}
          >
            <Text style={styles.closeButtonText}>×</Text>
          </TouchableOpacity>
        )}
      </BoxView>
    </BoxView>
  );
});

Alert.displayName = 'Alert';
