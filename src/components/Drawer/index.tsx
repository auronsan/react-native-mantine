import React, { forwardRef, useEffect, useRef } from 'react';
import {
  Modal as RNModal,
  TouchableOpacity,
  Animated,
  Dimensions,
  ScrollView,
} from 'react-native';
import { BoxView } from '../BoxView';
import { Text } from '../Text';
import { Overlay } from '../Overlay';
import type { DefaultProps, MantineNumberSize, SpacingValue } from '../../theme/types';
import { useComponentDefaultProps } from '../../theme/theme-provider';
import { createStyles } from '../../theme';
import { rem } from '../../theme/utils/rem';

export interface DrawerProps extends DefaultProps {
  /** Drawer opened state */
  opened: boolean;

  /** Called when drawer is closed */
  onClose: () => void;

  /** Drawer title */
  title?: React.ReactNode;

  /** Drawer content */
  children?: React.ReactNode;

  /** Drawer size */
  size?: MantineNumberSize | number;

  /** Drawer padding */
  padding?: SpacingValue;

  /** Drawer position */
  position?: 'left' | 'right' | 'top' | 'bottom';

  /** If true, drawer cannot be closed by clicking outside */
  closeOnClickOutside?: boolean;

  /** If true, drawer will show overlay */
  withOverlay?: boolean;

  /** Overlay opacity */
  overlayOpacity?: number;

  /** Overlay color */
  overlayColor?: string;

  /** If true, close button will be shown */
  withCloseButton?: boolean;

  /** Additional styles */
  style?: any;

  /** Animation duration in ms */
  transitionDuration?: number;

  /** Z-index */
  zIndex?: number;
}

const sizes = {
  xs: 180,
  sm: 240,
  md: 320,
  lg: 420,
  xl: 560,
};

const useStyles = createStyles(
  (
    theme,
    {
      size,
      padding,
      position,
    }: {
      size: MantineNumberSize | number;
      padding: SpacingValue;
      position: 'left' | 'right' | 'top' | 'bottom';
    }
  ) => {
    const getPadding = () => {
      if (padding === undefined) return theme.spacing.md;
      if (typeof padding === 'number') return rem(padding);
      return theme.spacing[padding] || theme.spacing.md;
    };

    const getSize = () => {
      if (typeof size === 'number') return rem(size);
      return rem(sizes[size as keyof typeof sizes] || sizes.md);
    };

    const isHorizontal = position === 'left' || position === 'right';
    const dimensionKey = isHorizontal ? 'width' : 'height';

    return {
      overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.001)',
        justifyContent: position === 'bottom' ? 'flex-end' : position === 'top' ? 'flex-start' : 'center',
        alignItems: position === 'right' ? 'flex-end' : position === 'left' ? 'flex-start' : 'stretch',
      },
      container: {
        backgroundColor: theme.colorScheme === 'dark' ? (theme.colors.dark || [])[7] : theme.white,
        [dimensionKey]: getSize(),
        maxHeight: '100%',
        maxWidth: '100%' as any,
        ...(position === 'left' && {
          borderTopRightRadius: theme.fn.radius('md'),
          borderBottomRightRadius: theme.fn.radius('md'),
        }),
        ...(position === 'right' && {
          borderTopLeftRadius: theme.fn.radius('md'),
          borderBottomLeftRadius: theme.fn.radius('md'),
        }),
        ...(position === 'top' && {
          borderBottomLeftRadius: theme.fn.radius('md'),
          borderBottomRightRadius: theme.fn.radius('md'),
        }),
        ...(position === 'bottom' && {
          borderTopLeftRadius: theme.fn.radius('md'),
          borderTopRightRadius: theme.fn.radius('md'),
        }),
      },
      header: {
        padding: getPadding(),
        borderBottomWidth: 1,
        borderBottomColor:
          theme.colorScheme === 'dark' ? (theme.colors.dark || [])[5] : (theme.colors.gray || [])[2],
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      },
      title: {
        fontSize: theme.fontSizes.lg as number,
        fontWeight: '600',
        color: theme.colorScheme === 'dark' ? theme.white : theme.black,
        flex: 1,
      },
      closeButton: {
        width: rem(32) as any,
        height: rem(32) as any,
        borderRadius: rem(16) as any,
        backgroundColor:
          theme.colorScheme === 'dark' ? (theme.colors.dark || [])[5] : (theme.colors.gray || [])[1],
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: theme.spacing.md,
      },
      closeButtonText: {
        fontSize: rem(20) as any,
        color: theme.colorScheme === 'dark' ? theme.white : theme.black,
      },
      body: {
        padding: getPadding(),
        flex: 1,
      },
    };
  }
);

const defaultProps: Partial<DrawerProps> = {
  size: 'md',
  padding: 'md',
  position: 'left',
  closeOnClickOutside: true,
  withOverlay: true,
  overlayOpacity: 0.6,
  overlayColor: '#000',
  withCloseButton: true,
  transitionDuration: 250,
  zIndex: 1000,
};

export const Drawer = forwardRef<any, DrawerProps>((props, ref) => {
  const {
    opened,
    onClose,
    title,
    children,
    size,
    padding,
    position,
    closeOnClickOutside,
    withOverlay,
    overlayOpacity,
    overlayColor,
    withCloseButton,
    style,
    transitionDuration,
    ...others
  } = useComponentDefaultProps('Drawer', defaultProps, props);

  const { styles, sx } = useStyles(
    {
      size: size ?? defaultProps.size ?? 'md',
      padding: padding ?? defaultProps.padding ?? 'md',
      position: position ?? defaultProps.position ?? 'left'
    },
    { name: 'Drawer' }
  ) as any;

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(0)).current;

  const getSlideValue = () => {
    const screenWidth = Dimensions.get('window').width;
    const screenHeight = Dimensions.get('window').height;

    switch (position) {
      case 'left':
        return -screenWidth;
      case 'right':
        return screenWidth;
      case 'top':
        return -screenHeight;
      case 'bottom':
        return screenHeight;
      default:
        return -screenWidth;
    }
  };

  useEffect(() => {
    if (opened) {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: transitionDuration,
          useNativeDriver: true,
        }),
        Animated.spring(slideAnim, {
          toValue: 0,
          useNativeDriver: true,
          friction: 8,
        }),
      ]).start();
    } else {
      slideAnim.setValue(getSlideValue());
      fadeAnim.setValue(0);
    }
  }, [opened, fadeAnim, slideAnim, transitionDuration]);

  const handleOverlayPress = () => {
    if (closeOnClickOutside) {
      onClose();
    }
  };

  const getTransform = () => {
    switch (position) {
      case 'left':
      case 'right':
        return [{ translateX: slideAnim }];
      case 'top':
      case 'bottom':
        return [{ translateY: slideAnim }];
      default:
        return [{ translateX: slideAnim }];
    }
  };

  return (
    <RNModal
      visible={opened}
      transparent
      animationType="none"
      onRequestClose={onClose}
      statusBarTranslucent
    >
      {/* Full screen overlay backdrop */}
      {withOverlay && (
        <Overlay
          opacity={overlayOpacity}
          color={overlayColor}
          onPress={handleOverlayPress}
        />
      )}

      {/* Drawer container positioned over overlay */}
      <BoxView style={styles.overlay} pointerEvents="box-none">
        <Animated.View
          ref={ref}
          style={[
            sx(styles.container, style),
            {
              opacity: fadeAnim,
              transform: getTransform(),
            },
          ]}
          {...others}
        >
          {(title || withCloseButton) && (
            <BoxView style={styles.header}>
              {typeof title === 'string' ? <Text style={styles.title}>{title}</Text> : title}
              {withCloseButton && (
                <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                  <Text style={styles.closeButtonText}>×</Text>
                </TouchableOpacity>
              )}
            </BoxView>
          )}

          <ScrollView style={styles.body} showsVerticalScrollIndicator={false}>
            {children}
          </ScrollView>
        </Animated.View>
      </BoxView>
    </RNModal>
  );
});

Drawer.displayName = 'Drawer';
