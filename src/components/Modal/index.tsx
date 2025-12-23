import React, { forwardRef, useEffect, useRef } from 'react';
import {
  Modal as RNModal,
  TouchableOpacity,
  Animated,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { BoxView } from '../BoxView';
import { Text } from '../Text';
import { Overlay } from '../Overlay';
import type { DefaultProps, MantineNumberSize, SpacingValue } from '../../theme/types';
import { useComponentDefaultProps } from '../../theme/theme-provider';
import { createStyles } from '../../theme';
import { rem } from '../../theme/utils/rem';

export interface ModalProps extends DefaultProps {
  /** Modal opened state */
  opened: boolean;

  /** Called when modal is closed */
  onClose: () => void;

  /** Modal title */
  title?: React.ReactNode;

  /** Modal content */
  children?: React.ReactNode;

  /** Modal size */
  size?: MantineNumberSize | 'full';

  /** Modal padding */
  padding?: SpacingValue;

  /** Modal border radius */
  radius?: MantineNumberSize;

  /** If true, modal cannot be closed by clicking outside or pressing escape */
  closeOnClickOutside?: boolean;

  /** If true, modal will be centered on screen */
  centered?: boolean;

  /** If true, modal will show overlay */
  withOverlay?: boolean;

  /** Overlay opacity */
  overlayOpacity?: number;

  /** Overlay color */
  overlayColor?: string;

  /** If true, close button will be shown */
  withCloseButton?: boolean;

  /** If true, modal will take full screen */
  fullScreen?: boolean;

  /** Additional styles */
  style?: any;

  /** Animation duration in ms */
  transitionDuration?: number;

  /** Z-index */
  zIndex?: number;
}

const sizes = {
  xs: 320,
  sm: 380,
  md: 440,
  lg: 620,
  xl: 780,
  full: '100%',
};

const useStyles = createStyles(
  (
    theme,
    {
      size,
      padding,
      radius,
      centered,
      fullScreen,
    }: {
      size: MantineNumberSize | 'full';
      padding: SpacingValue;
      radius: MantineNumberSize;
      centered: boolean;
      fullScreen: boolean;
    }
  ) => {
    const getPadding = () => {
      if (padding === undefined) return theme.spacing.md;
      if (typeof padding === 'number') return rem(padding);
      return theme.spacing[padding] || theme.spacing.md;
    };

    const getWidth = () => {
      if (fullScreen) return '100%';
      if (size === 'full') return '100%';
      if (typeof size === 'number') return rem(size);
      return rem(sizes[size as keyof typeof sizes] || sizes.md);
    };

    return {
      overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.001)',
        justifyContent: centered ? 'center' : 'flex-start',
        alignItems: 'center',
        paddingTop: (centered ? 0 : rem(60)) as any,
      },
      container: {
        backgroundColor: theme.colorScheme === 'dark' ? (theme.colors.dark || [])[7] : theme.white,
        borderRadius: fullScreen ? 0 : theme.fn.radius(radius),
        width: getWidth() as any,
        maxWidth: fullScreen ? '100%' : '90%',
        maxHeight: fullScreen ? '100%' : '90%',
        ...(fullScreen && {
          height: '100%',
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
      },
    };
  }
) as any;

const defaultProps: Partial<ModalProps> = {
  size: 'md',
  padding: 'md',
  radius: 'md',
  closeOnClickOutside: true,
  centered: false,
  withOverlay: true,
  overlayOpacity: 0.6,
  overlayColor: '#000',
  withCloseButton: true,
  fullScreen: false,
  transitionDuration: 200,
  zIndex: 1000,
};

export const Modal = forwardRef<any, ModalProps>((props, ref) => {
  const {
    opened,
    onClose,
    title,
    children,
    size,
    padding,
    radius,
    closeOnClickOutside,
    centered,
    withOverlay,
    overlayOpacity,
    overlayColor,
    withCloseButton,
    fullScreen,
    style,
    transitionDuration,
    zIndex,
    ...others
  } = useComponentDefaultProps('Modal', defaultProps, props);

  const { styles, sx } = useStyles(
    { size, padding, radius, centered, fullScreen },
    { name: 'Modal' }
  ) as any;

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;

  useEffect(() => {
    if (opened) {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: transitionDuration,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          useNativeDriver: true,
          friction: 8,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: transitionDuration,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 0.9,
          duration: transitionDuration,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [opened, fadeAnim, scaleAnim, transitionDuration]);

  const handleOverlayPress = () => {
    if (closeOnClickOutside) {
      onClose();
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
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        {withOverlay && (
          <Animated.View
            style={[
              {
                ...styles.overlay,
                opacity: fadeAnim,
              },
            ]}
          >
            <Overlay
              opacity={overlayOpacity}
              color={overlayColor}
              onPress={handleOverlayPress}
              style={{ position: 'absolute' }}
            />
          </Animated.View>
        )}

        <TouchableOpacity
          activeOpacity={1}
          style={styles.overlay}
          onPress={handleOverlayPress}
        >
          <TouchableOpacity activeOpacity={1} onPress={(e) => e.stopPropagation()}>
            <Animated.View
              ref={ref}
              style={[
                sx(styles.container, style),
                {
                  opacity: fadeAnim,
                  transform: [{ scale: scaleAnim }],
                },
              ]}
              {...others}
            >
              {(title || withCloseButton) && (
                <BoxView style={styles.header}>
                  {typeof title === 'string' ? (
                    <Text style={styles.title}>{title}</Text>
                  ) : (
                    title
                  )}
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
          </TouchableOpacity>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </RNModal>
  );
});

Modal.displayName = 'Modal';
