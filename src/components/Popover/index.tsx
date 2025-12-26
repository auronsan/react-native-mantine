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

  /** Additional styles */
  style?: any;
}

export interface PopoverTargetProps {
  children: React.ReactElement;
}

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
  const { setOpened, targetRef, setDropdownPosition } = usePopoverContext();

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
  });
};

const PopoverDropdown: React.FC<PopoverDropdownProps> = ({ children, style, ...others }) => {
  const { opened, setOpened, dropdownPosition } = usePopoverContext();
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
            {...others}
          >
            {children}
          </Animated.View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

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
