import React, { forwardRef, useState, useRef } from 'react';
import {
  View,
  TouchableWithoutFeedback,
  Animated,
  Platform,
  Modal,
  useWindowDimensions,
  type LayoutChangeEvent,
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
import {
  computeFloatingPosition,
  DEFAULT_FLOATING_OFFSET,
  type FloatingPosition,
  type FloatingRect,
} from '../Popover/position';
import { measureTarget } from '../Popover/use-floating';

export type TooltipPosition = FloatingPosition;

export interface TooltipProps extends DefaultProps {
  /** Tooltip label */
  label: React.ReactNode;

  /** Tooltip position relative to target (`top | bottom | left | right` with optional `-start` / `-end`) */
  position?: TooltipPosition;

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

  /** If true, tooltip will have an arrow pointing at the target */
  withArrow?: boolean;

  /** Arrow size in px */
  arrowSize?: number;

  /** Arrow offset from the edge for `-start` / `-end` positions */
  arrowOffset?: number;

  /** Gap between target and tooltip in px */
  offset?: number;

  /** Target element */
  children: React.ReactElement;

  /** Accessibility label for the tooltip content */
  accessibilityLabel?: string;

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
    const backgroundColor = theme.fn.themeColor(color, 9);
    return {
      tooltip: {
        position: 'absolute',
        backgroundColor,
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
      arrow: {
        position: 'absolute',
        backgroundColor,
        transform: [{ rotate: '45deg' }],
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
  arrowSize: 4,
  arrowOffset: 5,
  offset: DEFAULT_FLOATING_OFFSET,
};

const ZERO_RECT: FloatingRect = { x: 0, y: 0, width: 0, height: 0 };

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
    arrowSize,
    arrowOffset,
    offset,
    children,
    accessibilityLabel,
    style,
    ...others
  } = useComponentDefaultProps('Tooltip', defaultProps, props);

  const [visible, setVisible] = useState(false);
  const [targetRect, setTargetRect] = useState<FloatingRect | null>(null);
  const [tooltipSize, setTooltipSize] = useState({ width: 0, height: 0 });
  const targetRef = useRef<View>(null);
  const opacity = useRef(new Animated.Value(0)).current;
  const windowSize = useWindowDimensions();

  const { styles, sx } = useStyles(
    { color, radius, multiline, width },
    { name: 'Tooltip' }
  ) as any;

  const isControlled = controlledOpened !== undefined;
  const isVisible = isControlled ? controlledOpened : visible;

  React.useEffect(() => {
    if (isVisible) {
      // Measure on open so controlled tooltips are positioned too.
      measureTarget(targetRef, setTargetRect);
    }
  }, [isVisible]);

  const show = () => {
    if (disabled) return;

    measureTarget(targetRef, setTargetRect);

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

  const handleLayout = (event: LayoutChangeEvent) => {
    const { width: w, height: h } = event.nativeEvent.layout;
    setTooltipSize((prev) =>
      prev.width === w && prev.height === h ? prev : { width: w, height: h }
    );
  };

  const triggerProps =
    trigger === 'longPress'
      ? { onLongPress: show }
      : { onPress: show, onPressOut: hide };

  const tooltipLabel = typeof label === 'string' ? label : accessibilityLabel;
  const childProps = (children as React.ReactElement<any>).props ?? {};
  const childWithRef = React.cloneElement(children as React.ReactElement<any>, {
    ref: targetRef,
    ...triggerProps,
    accessibilityHint:
      childProps.accessibilityHint ??
      (tooltipLabel ? `Shows tooltip: ${tooltipLabel}` : undefined),
  });

  const placement = computeFloatingPosition({
    position: position ?? 'top',
    target: targetRect ?? ZERO_RECT,
    dropdown: tooltipSize,
    window: windowSize,
    offset,
    arrowSize: withArrow ? arrowSize : 0,
    arrowOffset,
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
                    top: placement.top,
                    left: placement.left,
                    opacity,
                    zIndex,
                  },
                ]}
                accessibilityLabel={accessibilityLabel || (typeof label === 'string' ? label : undefined)}
                accessibilityRole="text"
                {...others}
                onLayout={handleLayout}
              >
                {typeof label === 'string' ? (
                  <Text style={styles.label}>{label}</Text>
                ) : (
                  label
                )}
                {withArrow && placement.arrow && (
                  <View
                    testID="tooltip-arrow"
                    pointerEvents="none"
                    style={[
                      styles.arrow,
                      { width: arrowSize, height: arrowSize },
                      placement.arrow,
                    ]}
                  />
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
