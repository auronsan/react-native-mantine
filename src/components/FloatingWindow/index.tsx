import React, { forwardRef, useRef, useState } from 'react';
import { Dimensions, PanResponder, View } from 'react-native';
import { BoxView } from '../BoxView';
import { Text } from '../Text';
import { CloseButton } from '../CloseButton';
import { Portal } from '../Portal';
import type { DefaultProps } from '../../theme/types';
import { useComponentDefaultProps } from '../../theme/theme-provider';
import { createStyles } from '../../theme';

export interface FloatingWindowPosition {
  x: number;
  y: number;
}

export interface FloatingWindowProps extends DefaultProps {
  /** Window content */
  children?: React.ReactNode;

  /** Title displayed in the draggable header bar */
  title?: React.ReactNode;

  /** Initial window position */
  initialPosition?: FloatingWindowPosition;

  /** Called with the new position while the window is dragged */
  onPositionChange?: (position: FloatingWindowPosition) => void;

  /** Called when dragging starts */
  onDragStart?: () => void;

  /** Called when dragging ends */
  onDragEnd?: (position: FloatingWindowPosition) => void;

  /** Called when the close button is pressed, the button is not rendered without it */
  onClose?: () => void;

  /** Window width in px */
  width?: number;

  /** Window z-index */
  zIndex?: number;

  /** Determines whether the window should be rendered within Portal */
  withinPortal?: boolean;

  /** Portal host name used when withinPortal is set */
  portalTarget?: string;
}

const useStyles = createStyles((theme) => ({
  root: {
    position: 'absolute',
    backgroundColor:
      theme.colorScheme === 'dark'
        ? theme.fn.themeColor('dark', 7)
        : theme.white,
    borderRadius: theme.fn.radius('md'),
    borderWidth: 1,
    borderColor:
      theme.colorScheme === 'dark'
        ? theme.fn.themeColor('dark', 4)
        : theme.fn.themeColor('gray', 3),
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    backgroundColor:
      theme.colorScheme === 'dark'
        ? theme.fn.themeColor('dark', 6)
        : theme.fn.themeColor('gray', 0),
    borderBottomWidth: 1,
    borderBottomColor:
      theme.colorScheme === 'dark'
        ? theme.fn.themeColor('dark', 4)
        : theme.fn.themeColor('gray', 3),
  },
  titleWrapper: {
    flex: 1,
  },
  title: {
    fontWeight: '600',
    fontSize: theme.fontSizes.sm as number,
  },
  body: {
    padding: theme.spacing.sm,
  },
}));

const defaultProps: Partial<FloatingWindowProps> = {
  initialPosition: { x: 20, y: 80 },
  width: 280,
  zIndex: 400,
  withinPortal: true,
};

/**
 * FloatingWindow displays a draggable window above the app content.
 * The window is moved by dragging its header bar.
 */
export const FloatingWindow = forwardRef<View, FloatingWindowProps>(
  (props, ref) => {
    const {
      children,
      title,
      initialPosition,
      onPositionChange,
      onDragStart,
      onDragEnd,
      onClose,
      width,
      zIndex,
      withinPortal,
      portalTarget,
      style,
      ...others
    } = useComponentDefaultProps('FloatingWindow', defaultProps, props);

    const { styles, sx } = useStyles({}, { name: 'FloatingWindow' });

    const [position, setPosition] = useState<FloatingWindowPosition>(
      initialPosition ?? { x: 20, y: 80 }
    );
    const positionRef = useRef(position);
    positionRef.current = position;

    const latestRef = useRef({ onPositionChange, onDragStart, onDragEnd });
    latestRef.current = { onPositionChange, onDragStart, onDragEnd };

    const dragStartRef = useRef(position);

    const panResponder = useRef(
      PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponder: () => true,
        onPanResponderGrant: () => {
          dragStartRef.current = positionRef.current;
          latestRef.current.onDragStart?.();
        },
        onPanResponderMove: (_event, gestureState) => {
          const screen = Dimensions.get('window');
          const next = {
            x: Math.min(
              Math.max(dragStartRef.current.x + gestureState.dx, 0),
              Math.max(screen.width - 48, 0)
            ),
            y: Math.min(
              Math.max(dragStartRef.current.y + gestureState.dy, 0),
              Math.max(screen.height - 48, 0)
            ),
          };
          setPosition(next);
          latestRef.current.onPositionChange?.(next);
        },
        onPanResponderRelease: () => {
          latestRef.current.onDragEnd?.(positionRef.current);
        },
        onPanResponderTerminate: () => {
          latestRef.current.onDragEnd?.(positionRef.current);
        },
      })
    ).current;

    const window = (
      <BoxView
        ref={ref}
        style={sx(
          styles.root,
          { left: position.x, top: position.y, width, zIndex },
          style
        )}
        {...others}
      >
        <View
          style={styles.header}
          accessibilityLabel="Move window"
          {...panResponder.panHandlers}
        >
          <View style={styles.titleWrapper}>
            {typeof title === 'string' || typeof title === 'number' ? (
              <Text style={styles.title}>{title}</Text>
            ) : (
              title
            )}
          </View>
          {onClose && <CloseButton size="sm" onPress={onClose} />}
        </View>
        <View style={styles.body}>{children}</View>
      </BoxView>
    );

    if (withinPortal) {
      return <Portal target={portalTarget}>{window}</Portal>;
    }

    return window;
  }
);

FloatingWindow.displayName = 'FloatingWindow';
