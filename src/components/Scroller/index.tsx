import React, { forwardRef, useRef, useState } from 'react';
import {
  ScrollView,
  TouchableOpacity,
  View,
  type NativeScrollEvent,
  type NativeSyntheticEvent,
} from 'react-native';
import { BoxView } from '../BoxView';
import { Text } from '../Text';
import { PlatformLinearGradient } from '../LinearGradient/PlatformLinearGradient';
import type { DefaultProps } from '../../theme/types';
import { useComponentDefaultProps, useTheme } from '../../theme/theme-provider';
import { createStyles } from '../../theme';

export interface ScrollerProps extends DefaultProps {
  /** Scrollable content */
  children?: React.ReactNode;

  /** Number of px scrolled when a control is pressed */
  scrollAmount?: number;

  /** Size of the scroll controls in px */
  controlSize?: number;

  /** Color of the edge gradients, defaults to theme background */
  edgeGradientColor?: string;

  /** Determines whether the edge gradients should be displayed */
  withEdgeGradients?: boolean;

  /** Determines whether the scroll controls should be displayed */
  withControls?: boolean;

  /** Icon of the start control */
  startControlIcon?: React.ReactNode;

  /** Icon of the end control */
  endControlIcon?: React.ReactNode;

  /** Start control accessibility label */
  startControlLabel?: string;

  /** End control accessibility label */
  endControlLabel?: string;
}

const useStyles = createStyles((theme) => ({
  root: {
    position: 'relative',
  },
  control: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
  },
  controlButton: {
    backgroundColor:
      theme.colorScheme === 'dark'
        ? theme.fn.themeColor('dark', 5)
        : theme.white,
    borderWidth: 1,
    borderColor:
      theme.colorScheme === 'dark'
        ? theme.fn.themeColor('dark', 4)
        : theme.fn.themeColor('gray', 3),
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 1 },
    elevation: 2,
  },
  controlIcon: {
    fontSize: theme.fontSizes.md as number,
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
  },
  gradient: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: 32,
    zIndex: 1,
  },
}));

const defaultProps: Partial<ScrollerProps> = {
  scrollAmount: 200,
  controlSize: 32,
  withEdgeGradients: true,
  withControls: true,
  startControlLabel: 'Scroll back',
  endControlLabel: 'Scroll forward',
};

/**
 * Scroller displays horizontally scrollable content with edge gradients and
 * scroll controls. Port of Mantine Scroller adapted for React Native.
 */
export const Scroller = forwardRef<View, ScrollerProps>((props, ref) => {
  const {
    children,
    scrollAmount,
    controlSize,
    edgeGradientColor,
    withEdgeGradients,
    withControls,
    startControlIcon,
    endControlIcon,
    startControlLabel,
    endControlLabel,
    style,
    ...others
  } = useComponentDefaultProps('Scroller', defaultProps, props);

  const theme = useTheme();
  const { styles, sx } = useStyles({}, { name: 'Scroller' });

  const scrollRef = useRef<ScrollView>(null);
  const offsetRef = useRef(0);
  const [containerWidth, setContainerWidth] = useState(0);
  const [contentWidth, setContentWidth] = useState(0);
  const [offset, setOffset] = useState(0);

  const maxOffset = Math.max(contentWidth - containerWidth, 0);
  const showStart = offset > 1;
  const showEnd = maxOffset > 0 && offset < maxOffset - 1;

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    offsetRef.current = event.nativeEvent.contentOffset.x;
    setOffset(event.nativeEvent.contentOffset.x);
  };

  const scrollBy = (delta: number) => {
    const next = Math.min(Math.max(offsetRef.current + delta, 0), maxOffset);
    scrollRef.current?.scrollTo({ x: next, animated: true });
  };

  const gradientColor =
    edgeGradientColor ??
    (theme.colorScheme === 'dark' ? theme.fn.themeColor('dark', 7) : theme.white);

  const renderControl = (side: 'start' | 'end') => {
    const visible = side === 'start' ? showStart : showEnd;
    if (!withControls || !visible) {
      return null;
    }

    const icon = side === 'start' ? startControlIcon : endControlIcon;
    const label = side === 'start' ? startControlLabel : endControlLabel;

    return (
      <View
        style={[styles.control, side === 'start' ? { left: 4 } : { right: 4 }]}
        pointerEvents="box-none"
      >
        <TouchableOpacity
          style={[
            styles.controlButton,
            {
              width: controlSize,
              height: controlSize,
              borderRadius: (controlSize ?? 32) / 2,
            },
          ]}
          onPress={() =>
            scrollBy(side === 'start' ? -(scrollAmount ?? 200) : (scrollAmount ?? 200))
          }
          accessibilityRole="button"
          accessibilityLabel={label}
        >
          {icon ?? (
            <Text style={styles.controlIcon}>
              {side === 'start' ? '‹' : '›'}
            </Text>
          )}
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <BoxView
      ref={ref}
      style={sx(styles.root, style)}
      onLayout={(event: any) =>
        setContainerWidth(event.nativeEvent.layout.width)
      }
      {...others}
    >
      <ScrollView
        ref={scrollRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        onContentSizeChange={(width) => setContentWidth(width)}
      >
        {children}
      </ScrollView>

      {withEdgeGradients && showStart && (
        <View style={[styles.gradient, { left: 0 }]} pointerEvents="none">
          <PlatformLinearGradient
            colors={[gradientColor, theme.fn.rgba(gradientColor, 0)]}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
            style={{ flex: 1 }}
          />
        </View>
      )}

      {withEdgeGradients && showEnd && (
        <View style={[styles.gradient, { right: 0 }]} pointerEvents="none">
          <PlatformLinearGradient
            colors={[theme.fn.rgba(gradientColor, 0), gradientColor]}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
            style={{ flex: 1 }}
          />
        </View>
      )}

      {renderControl('start')}
      {renderControl('end')}
    </BoxView>
  );
});

Scroller.displayName = 'Scroller';
