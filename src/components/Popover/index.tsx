import React, { forwardRef, useState, useRef, useCallback } from 'react';
import {
  View,
  TouchableWithoutFeedback,
  Animated,
  Modal,
  useWindowDimensions,
  type LayoutChangeEvent,
} from 'react-native';
import { BoxView } from '../BoxView';
import type { DefaultProps, MantineNumberSize } from '../../theme/types';
import { useComponentDefaultProps } from '../../theme/theme-provider';
import { createStyles } from '../../theme';
import {
  computeFloatingPosition,
  getArrowBorderStyle,
  DEFAULT_FLOATING_OFFSET,
  type FloatingPosition,
  type FloatingRect,
} from './position';
import { measureTarget, useEscapeKey } from './use-floating';

export * from './position';

export type PopoverPosition = FloatingPosition;
export type PopoverWidth = number | 'target';
export type PopoverShadow = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

/**
 * Props for the Popover component
 *
 * @property {PopoverPosition} [position='bottom'] - Popover position relative to target element (`top | bottom | left | right` with optional `-start` / `-end`)
 * @property {number | 'target'} [width=260] - Popover width in pixels or 'target' to match target width
 * @property {MantineNumberSize} [radius='md'] - Border radius from theme
 * @property {('xs' | 'sm' | 'md' | 'lg' | 'xl')} [shadow='md'] - Popover shadow from theme
 * @property {boolean} [withArrow=false] - If true, popover will have a pointing arrow
 * @property {number} [arrowSize=7] - Arrow size in pixels
 * @property {number} [arrowOffset=5] - Arrow offset from the edge (used for `-start` / `-end` positions)
 * @property {number} [offset=8] - Gap between target and dropdown in pixels
 * @property {boolean} [closeOnClickOutside=true] - If true, popover closes when clicking outside
 * @property {boolean} [closeOnEscape=true] - If true, popover closes on escape key (web only)
 * @property {boolean} [opened] - Controlled opened state
 * @property {(opened: boolean) => void} [onChange] - Callback fired when popover state changes
 * @property {number} [zIndex=1000] - Z-index of the popover dropdown
 * @property {React.ReactNode} children - Popover children (Popover.Target and Popover.Dropdown)
 * @property {string} [accessibilityLabel] - Accessibility label for the popover
 * @property {any} [style] - Additional styles for the root element
 */
export interface PopoverProps extends DefaultProps {
  /** Popover position relative to target */
  position?: PopoverPosition;

  /** Popover width */
  width?: PopoverWidth;

  /** Border radius */
  radius?: MantineNumberSize;

  /** Popover shadow */
  shadow?: PopoverShadow;

  /** If true, popover will have an arrow */
  withArrow?: boolean;

  /** Arrow size */
  arrowSize?: number;

  /** Arrow offset */
  arrowOffset?: number;

  /** Gap between target and dropdown in px */
  offset?: number;

  /** If true, close on click outside */
  closeOnClickOutside?: boolean;

  /** If true, close on escape key (web only) */
  closeOnEscape?: boolean;

  /** Controlled opened state */
  opened?: boolean;

  /** Called when popover state changes */
  onChange?: (opened: boolean) => void;

  /** Z-index */
  zIndex?: number;

  /** Popover content */
  children: React.ReactNode;

  /** Accessibility label for the popover */
  accessibilityLabel?: string;

  /** Additional styles */
  style?: any;
}

/**
 * Props for Popover.Target component
 *
 * @property {React.ReactElement} children - Single React element that triggers the popover
 */
export interface PopoverTargetProps {
  children: React.ReactElement;
}

/**
 * Props for Popover.Dropdown component
 *
 * @property {React.ReactNode} children - Dropdown content
 * @property {any} [style] - Additional styles
 */
export interface PopoverDropdownProps extends DefaultProps {
  children: React.ReactNode;
  style?: any;
}

const defaultProps: Partial<PopoverProps> = {
  position: 'bottom',
  width: 260,
  radius: 'md',
  shadow: 'md',
  withArrow: false,
  arrowSize: 7,
  arrowOffset: 5,
  offset: DEFAULT_FLOATING_OFFSET,
  closeOnClickOutside: true,
  closeOnEscape: true,
  zIndex: 1000,
};

const ZERO_RECT: FloatingRect = { x: 0, y: 0, width: 0, height: 0 };

const useDropdownStyles = createStyles(
  (
    theme,
    { radius, shadow }: { radius: MantineNumberSize; shadow?: PopoverShadow }
  ) => {
    const dark = theme.colorScheme === 'dark';
    const backgroundColor = dark ? theme.fn.themeColor('dark', 6) : theme.white;
    const borderColor = dark
      ? theme.fn.themeColor('dark', 4)
      : theme.fn.themeColor('gray', 2);

    return {
      dropdown: {
        position: 'absolute',
        backgroundColor,
        borderWidth: 1,
        borderColor,
        borderRadius: theme.fn.radius(radius),
        paddingVertical: theme.spacing.sm,
        paddingHorizontal: theme.spacing.md,
        ...(shadow ? theme.fn.shadow(shadow) : {}),
      },
      arrow: {
        position: 'absolute',
        backgroundColor,
        borderColor,
        transform: [{ rotate: '45deg' }],
      },
    };
  }
);

interface PopoverContextValue {
  opened: boolean;
  setOpened: (opened: boolean) => void;
  targetRef: React.RefObject<View | null>;
  targetRect: FloatingRect | null;
  setTargetRect: (rect: FloatingRect) => void;
  accessibilityLabel?: string;
  position: PopoverPosition;
  width: PopoverWidth;
  radius: MantineNumberSize;
  shadow?: PopoverShadow;
  withArrow: boolean;
  arrowSize: number;
  arrowOffset: number;
  offset: number;
  closeOnClickOutside: boolean;
  closeOnEscape: boolean;
  zIndex?: number;
}

const PopoverContext = React.createContext<PopoverContextValue | null>(null);

const usePopoverContext = () => {
  const ctx = React.useContext(PopoverContext);
  if (!ctx) {
    throw new Error('Popover components must be used within Popover');
  }
  return ctx;
};

const PopoverTarget: React.FC<PopoverTargetProps> = ({ children }) => {
  const { opened, setOpened, targetRef, setTargetRect } = usePopoverContext();

  const handlePress = () => {
    measureTarget(targetRef, setTargetRect);
    setOpened(true);
  };

  const childProps = (children as React.ReactElement<any>).props ?? {};

  return React.cloneElement(children as React.ReactElement<any>, {
    ref: targetRef,
    onPress: handlePress,
    accessibilityRole: childProps.accessibilityRole ?? 'button',
    accessibilityState: { expanded: opened, ...childProps.accessibilityState },
  });
};

const PopoverDropdown: React.FC<PopoverDropdownProps> = ({ children, style, ...others }) => {
  const {
    opened,
    setOpened,
    targetRef,
    targetRect,
    setTargetRect,
    accessibilityLabel,
    position,
    width,
    radius,
    shadow,
    withArrow,
    arrowSize,
    arrowOffset,
    offset,
    closeOnClickOutside,
    closeOnEscape,
    zIndex,
  } = usePopoverContext();
  const opacity = useRef(new Animated.Value(0)).current;
  const [dropdownSize, setDropdownSize] = useState({ width: 0, height: 0 });
  const windowSize = useWindowDimensions();
  const { styles } = useDropdownStyles({ radius, shadow }, { name: 'Popover' });

  const close = useCallback(() => setOpened(false), [setOpened]);

  React.useEffect(() => {
    if (opened) {
      // Re-measure on every open so controlled popovers (opened without a
      // target press) are positioned from the current target rect.
      measureTarget(targetRef, setTargetRect);
      Animated.timing(opacity, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }).start();
    }
  }, [opened, opacity]);

  useEscapeKey(opened && closeOnEscape, close);

  const handleLayout = (event: LayoutChangeEvent) => {
    const { width: w, height: h } = event.nativeEvent.layout;
    setDropdownSize((prev) =>
      prev.width === w && prev.height === h ? prev : { width: w, height: h }
    );
  };

  if (!opened) {
    return null;
  }

  const resolvedWidth =
    width === 'target' ? targetRect?.width || undefined : width;

  const placement = computeFloatingPosition({
    position,
    target: targetRect ?? ZERO_RECT,
    dropdown: {
      width: dropdownSize.width || (typeof resolvedWidth === 'number' ? resolvedWidth : 0),
      height: dropdownSize.height,
    },
    window: windowSize,
    offset,
    arrowSize: withArrow ? arrowSize : 0,
    arrowOffset,
  });

  return (
    <Modal
      visible={opened}
      transparent
      animationType="none"
      onRequestClose={close}
      statusBarTranslucent
    >
      <TouchableWithoutFeedback onPress={closeOnClickOutside ? close : undefined}>
        <View
          style={{
            flex: 1,
            backgroundColor: 'transparent',
          }}
        >
          <Animated.View
            style={[
              styles.dropdown,
              {
                top: placement.top,
                left: placement.left,
                width: resolvedWidth,
                opacity,
                zIndex,
              },
              style,
            ]}
            accessibilityLabel={accessibilityLabel}
            accessibilityViewIsModal={true}
            {...others}
            onLayout={handleLayout}
          >
            {children}
            {withArrow && placement.arrow && (
              <View
                testID="popover-arrow"
                pointerEvents="none"
                style={[
                  styles.arrow,
                  {
                    width: arrowSize,
                    height: arrowSize,
                    ...getArrowBorderStyle(placement.side, 1),
                  },
                  placement.arrow,
                ]}
              />
            )}
          </Animated.View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

/**
 * Popover component displays floating content relative to a target element
 *
 * @example
 * ```tsx
 * // Basic popover
 * <Popover>
 *   <Popover.Target>
 *     <Button>Click me</Button>
 *   </Popover.Target>
 *   <Popover.Dropdown>
 *     <Text>Popover content goes here</Text>
 *   </Popover.Dropdown>
 * </Popover>
 *
 * // Controlled popover with arrow
 * <Popover
 *   opened={opened}
 *   onChange={setOpened}
 *   position="top"
 *   withArrow
 * >
 *   <Popover.Target>
 *     <IconButton icon={<IconInfo />} />
 *   </Popover.Target>
 *   <Popover.Dropdown>
 *     <Text>This is additional information</Text>
 *   </Popover.Dropdown>
 * </Popover>
 *
 * // Popover with custom width and position
 * <Popover width={300} position="bottom-start">
 *   <Popover.Target>
 *     <Button>Show details</Button>
 *   </Popover.Target>
 *   <Popover.Dropdown>
 *     <DetailedContent />
 *   </Popover.Dropdown>
 * </Popover>
 * ```
 */
export const Popover = Object.assign(
  forwardRef<any, PopoverProps>((props, ref) => {
    const {
      position,
      width,
      radius,
      shadow,
      withArrow,
      arrowSize,
      arrowOffset,
      offset,
      closeOnClickOutside,
      closeOnEscape,
      opened: controlledOpened,
      onChange,
      zIndex,
      children,
      accessibilityLabel,
      style,
      ...others
    } = useComponentDefaultProps('Popover', defaultProps, props);

    const [opened, setOpened] = useState(false);
    const [targetRect, setTargetRect] = useState<FloatingRect | null>(null);
    const targetRef = useRef<View>(null);

    const isControlled = controlledOpened !== undefined;
    const isOpened = isControlled ? controlledOpened : opened;

    const handleSetOpened = (value: boolean) => {
      if (!isControlled) {
        setOpened(value);
      }
      onChange?.(value);
    };

    const contextValue: PopoverContextValue = {
      opened: isOpened,
      setOpened: handleSetOpened,
      targetRef,
      targetRect,
      setTargetRect,
      accessibilityLabel,
      position: position ?? 'bottom',
      width: width ?? 260,
      radius: radius ?? 'md',
      shadow,
      withArrow: withArrow ?? false,
      arrowSize: arrowSize ?? 7,
      arrowOffset: arrowOffset ?? 5,
      offset: offset ?? DEFAULT_FLOATING_OFFSET,
      closeOnClickOutside: closeOnClickOutside ?? true,
      closeOnEscape: closeOnEscape ?? true,
      zIndex,
    };

    return (
      <PopoverContext.Provider value={contextValue}>
        <BoxView ref={ref} style={style} {...others}>
          {children}
        </BoxView>
      </PopoverContext.Provider>
    );
  }),
  {
    Target: PopoverTarget,
    Dropdown: PopoverDropdown,
  }
);

Popover.displayName = 'Popover';
PopoverTarget.displayName = 'Popover.Target';
PopoverDropdown.displayName = 'Popover.Dropdown';
