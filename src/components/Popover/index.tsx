import React, { forwardRef, useState, useRef } from 'react';
import {
  View,
  TouchableWithoutFeedback,
  Animated,
  Modal,
} from 'react-native';
import { BoxView } from '../BoxView';
import type {
  DefaultProps,

  MantineNumberSize,
} from '../../theme/types';
import { useComponentDefaultProps } from '../../theme/theme-provider';


/**
 * Props for the Popover component
 *
 * @property {('top' | 'bottom' | 'left' | 'right' | 'top-start' | 'top-end' | 'bottom-start' | 'bottom-end')} [position='bottom'] - Popover position relative to target element
 * @property {number | 'target'} [width=260] - Popover width in pixels or 'target' to match target width
 * @property {MantineNumberSize} [radius='md'] - Border radius from theme
 * @property {('xs' | 'sm' | 'md' | 'lg' | 'xl')} [shadow='md'] - Popover shadow from theme
 * @property {boolean} [withArrow=false] - If true, popover will have a pointing arrow
 * @property {number} [arrowSize=7] - Arrow size in pixels
 * @property {number} [arrowOffset=5] - Arrow offset from the edge
 * @property {boolean} [closeOnClickOutside=true] - If true, popover closes when clicking outside
 * @property {boolean} [closeOnEscape=true] - If true, popover closes on escape key (web only)
 * @property {boolean} [opened] - Controlled opened state
 * @property {(opened: boolean) => void} [onChange] - Callback fired when popover state changes
 * @property {number} [zIndex=1000] - Z-index of the popover modal
 * @property {React.ReactNode} children - Popover children (Popover.Target and Popover.Dropdown)
 * @property {string} [accessibilityLabel] - Accessibility label for the popover
 * @property {any} [style] - Additional styles
 */
export interface PopoverProps extends DefaultProps {
  /** Popover position relative to target */
  position?:
    | 'top'
    | 'bottom'
    | 'left'
    | 'right'
    | 'top-start'
    | 'top-end'
    | 'bottom-start'
    | 'bottom-end';

  /** Popover width */
  width?: number | 'target';

  /** Border radius */
  radius?: MantineNumberSize;

  /** Popover shadow */
  shadow?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';

  /** If true, popover will have an arrow */
  withArrow?: boolean;

  /** Arrow size */
  arrowSize?: number;

  /** Arrow offset */
  arrowOffset?: number;

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
  closeOnClickOutside: true,
  closeOnEscape: true,
  zIndex: 1000,
};

interface PopoverContextValue {
  opened: boolean;
  setOpened: (opened: boolean) => void;
  targetRef: React.RefObject<View | null>;
  dropdownPosition: { top: number; left: number; width: number };
  setDropdownPosition: (pos: { top: number; left: number; width: number }) => void;
  accessibilityLabel?: string;
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
  const { opened, setOpened, targetRef, setDropdownPosition } = usePopoverContext();

  const handlePress = () => {
    if (targetRef.current) {
      targetRef.current.measureInWindow((x, y, width, height) => {
        setDropdownPosition({
          top: y + height + 8,
          left: x,
          width,
        });
      });
    }
    setOpened(true);
  };

  return React.cloneElement(children as React.ReactElement<any>, {
    ref: targetRef,
    onPress: handlePress,
    accessibilityRole: 'button',
    accessibilityState: { expanded: opened },
  });
};

const PopoverDropdown: React.FC<PopoverDropdownProps> = ({ children, style, ...others }) => {
  const { opened, setOpened, dropdownPosition, accessibilityLabel } = usePopoverContext();
  const opacity = useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    if (opened) {
      Animated.timing(opacity, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }).start();
    }
  }, [opened, opacity]);

  if (!opened) {
    return null;
  }

  return (
    <Modal
      visible={opened}
      transparent
      animationType="none"
      onRequestClose={() => setOpened(false)}
      statusBarTranslucent
    >
      <TouchableWithoutFeedback onPress={() => setOpened(false)}>
        <View
          style={{
            flex: 1,
            backgroundColor: 'transparent',
          }}
        >
          <Animated.View
            style={[
              {
                position: 'absolute',
                top: dropdownPosition.top,
                left: dropdownPosition.left,
                opacity,
              },
              style,
            ]}
            accessibilityLabel={accessibilityLabel}
            accessibilityViewIsModal={true}
            {...others}
          >
            {children}
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
    const [dropdownPosition, setDropdownPosition] = useState({
      top: 0,
      left: 0,
      width: 0,
    });
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
      dropdownPosition,
      setDropdownPosition,
      accessibilityLabel,
    };

    return (
      <PopoverContext.Provider value={contextValue}>
        <BoxView ref={ref} {...others}>
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
