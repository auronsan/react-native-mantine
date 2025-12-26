import React, { forwardRef, useState, useRef } from 'react';
import {
  View,
  TouchableWithoutFeedback,
  Animated,
  Platform,
  Modal,
} from 'react-native';
import { Text } from '../Text';
import type {
  DefaultProps,
  MantineColor,
  MantineNumberSize,
} from '../../theme/types';
import { useComponentDefaultProps } from '../../theme/theme-provider';
import { createStyles } from '../../theme';
import { rem } from '../../theme/utils/rem';

export interface TooltipProps extends DefaultProps {
  /** Tooltip label */
  label: React.ReactNode;

  /** Tooltip position relative to target */
  position?:
    | 'top'
    | 'bottom'
    | 'left'
    | 'right'
    | 'top-start'
    | 'top-end'
    | 'bottom-start'
    | 'bottom-end';

  /** Tooltip color from theme */
  color?: MantineColor;

  /** Border radius */
  radius?: MantineNumberSize;

  /** If true, tooltip will be multiline */
  multiline?: boolean;

  /** Tooltip width in multiline mode */
  width?: number | 'auto';

  /** Tooltip z-index */
  zIndex?: number;

  /** Delay before tooltip opens in ms */
  openDelay?: number;

  /** Delay before tooltip closes in ms */
  closeDelay?: number;

  /** Controlled opened state */
  opened?: boolean;

  /** If true, tooltip will be disabled */
  disabled?: boolean;

  /** Trigger mode - press or longPress */
  trigger?: 'press' | 'longPress';

  /** Tooltip arrow size */
  withArrow?: boolean;

  /** Target element */
  children: React.ReactElement;

  /** Additional styles */
  style?: any;
}

const useStyles = createStyles(
  (
    theme,
    {
      color,
      radius,
      multiline,
      width,
    }: {
      color: MantineColor;
      radius: MantineNumberSize;
      multiline: boolean;
      width: number | 'auto';
    }
  ) => {
    const colors = theme.colors[color] || theme.colors.gray;

    return {
      tooltip: {
        position: 'absolute',
        backgroundColor: colors?.[9] || colors?.[8] || (theme.colors.gray || [])[9],
        borderRadius: theme.fn.radius(radius),
        paddingVertical: rem(6) as any,
        paddingHorizontal: rem(10) as any,
        maxWidth: (width === 'auto' ? rem(250) : width) as any,
        ...(multiline && {
          textAlign: 'left',
        }),
        ...Platform.select({
          ios: {
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
          },
          android: {
            elevation: 5,
          },
        }),
      },
      label: {
        color: theme.white,
        fontSize: rem(12) as any,
        lineHeight: rem(16) as any,
        ...(multiline && {
          whiteSpace: 'normal',
        }),
      },
    };
  }
) as any;

const defaultProps: Partial<TooltipProps> = {
  position: 'top',
  color: 'gray',
  radius: 'sm',
  multiline: false,
  width: 'auto',
  zIndex: 1000,
  openDelay: 0,
  closeDelay: 0,
  disabled: false,
  trigger: 'longPress',
  withArrow: false,
};

export const Tooltip = forwardRef<any, TooltipProps>((props, _ref) => {
  const {
    label,
    position,
    color,
    radius,
    multiline,
    width,
    zIndex,
    openDelay,
    closeDelay,
    opened: controlledOpened,
    disabled,
    trigger,
    withArrow,
    children,
    style,
    ...others
  } = useComponentDefaultProps('Tooltip', defaultProps, props);

  const [visible, setVisible] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });
  const targetRef = useRef<View>(null);
  const opacity = useRef(new Animated.Value(0)).current;

  const { styles, sx } = useStyles(
    { color, radius, multiline, width },
    { name: 'Tooltip' }
  ) as any;

  const isControlled = controlledOpened !== undefined;
  const isVisible = isControlled ? controlledOpened : visible;

  const show = () => {
    if (disabled) return;

    if (targetRef.current) {
      targetRef.current.measureInWindow((x, y, width, _height) => {
        const top = y - 40; // Simple positioning, can be improved
        const left = x + width / 2 - 50;
        setTooltipPosition({ top, left });
      });
    }

    if (!isControlled) {
      setTimeout(() => {
        setVisible(true);
        Animated.timing(opacity, {
          toValue: 1,
          duration: 150,
          useNativeDriver: true,
        }).start();
      }, openDelay);
    }
  };

  const hide = () => {
    if (!isControlled) {
      setTimeout(() => {
        Animated.timing(opacity, {
          toValue: 0,
          duration: 150,
          useNativeDriver: true,
        }).start(() => setVisible(false));
      }, closeDelay);
    }
  };

  const triggerProps =
    trigger === 'longPress'
      ? { onLongPress: show }
      : { onPress: show, onPressOut: hide };

  const childWithRef = React.cloneElement(children as React.ReactElement<any>, {
    ref: targetRef,
    ...triggerProps,
  });

  return (
    <>
      {childWithRef}
      {isVisible && (
        <Modal
          visible={isVisible}
          transparent
          animationType="none"
          onRequestClose={hide}
          statusBarTranslucent
        >
          <TouchableWithoutFeedback onPress={hide}>
            <View
              style={{
                flex: 1,
                backgroundColor: 'transparent',
              }}
            >
              <Animated.View
                style={[
                  sx(styles.tooltip, style),
                  {
                    top: tooltipPosition.top,
                    left: tooltipPosition.left,
                    opacity,
                    zIndex,
                  },
                ]}
                {...others}
              >
                {typeof label === 'string' ? (
                  <Text style={styles.label}>{label}</Text>
                ) : (
                  label
                )}
              </Animated.View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      )}
    </>
  );
});

Tooltip.displayName = 'Tooltip';
