import React, { forwardRef, useState, useRef } from 'react';
import {
  View,
  TouchableWithoutFeedback,
  Animated,
  Platform,
  Modal,
} from 'react-native';
import { BoxView } from '../BoxView';
import { Portal } from '../Portal';
import type {
  DefaultProps,
  MantineColor,
  MantineNumberSize,
} from '../../theme/types';
import { useComponentDefaultProps } from '../../theme/theme-provider';
import { createStyles } from '../../theme';
import { rem } from '../../theme/utils/rem';

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

const useStyles = createStyles(
  (
    theme,
    {
      radius,
      shadow,
      width,
    }: {
      radius: MantineNumberSize;
      shadow: string;
      width: number | 'target';
    }
  ) => {
    const getShadow = () => {
      const shadows = {
        xs: { shadowOpacity: 0.05, shadowRadius: 1.84, elevation: 1 },
        sm: { shadowOpacity: 0.1, shadowRadius: 2.84, elevation: 2 },
        md: { shadowOpacity: 0.15, shadowRadius: 3.84, elevation: 4 },
        lg: { shadowOpacity: 0.2, shadowRadius: 4.84, elevation: 6 },
        xl: { shadowOpacity: 0.25, shadowRadius: 5.84, elevation: 8 },
      };
      return shadows[shadow] || shadows.md;
    };

    return {
      dropdown: {
        position: 'absolute',
        backgroundColor:
          theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.white,
        borderRadius: theme.fn.radius(radius),
        borderWidth: 1,
        borderColor:
          theme.colorScheme === 'dark'
            ? theme.colors.dark[4]
            : theme.colors.gray[2],
        padding: theme.spacing.md,
        ...(width !== 'target' && { width }),
        ...Platform.select({
          ios: {
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            ...getShadow(),
          },
          android: {
            ...getShadow(),
          },
        }),
      },
    };
  }
);

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
  targetRef: React.RefObject<View>;
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

  return React.cloneElement(children, {
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
    <Portal>
      <TouchableWithoutFeedback onPress={() => setOpened(false)}>
        <View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
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
    </Portal>
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

    const { styles } = useStyles(
      { radius, shadow, width },
      { name: 'Popover' }
    ) as any;

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
