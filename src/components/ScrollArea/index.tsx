import React, { forwardRef } from 'react';
import {
  ScrollView,
  type NativeScrollEvent,
  type NativeSyntheticEvent,
  type ScrollViewProps,
} from 'react-native';
import type { DefaultProps } from '../../theme/types';
import { useComponentDefaultProps } from '../../theme/theme-provider';

export interface ScrollAreaProps
  extends DefaultProps,
    Omit<ScrollViewProps, 'style'> {
  /** Scrollbar visibility behavior. 'never' hides scroll indicators, all other values show them */
  type?: 'auto' | 'always' | 'scroll' | 'hover' | 'never';

  /** Scroll horizontally instead of vertically */
  horizontal?: boolean;

  /** Called with the current scroll position */
  onScrollPositionChange?: (position: { x: number; y: number }) => void;

  /** Content */
  children?: React.ReactNode;

  /** Additional styles */
  style?: any;
}

const defaultProps: Partial<ScrollAreaProps> = {
  type: 'hover',
  horizontal: false,
};

/**
 * ScrollArea wraps React Native ScrollView with a Mantine-compatible API.
 */
const ScrollAreaBase = forwardRef<ScrollView, ScrollAreaProps>(
  (props, ref) => {
    const {
      type,
      horizontal,
      onScrollPositionChange,
      onScroll,
      children,
      style,
      ...others
    } = useComponentDefaultProps('ScrollArea', defaultProps, props);

    const showsIndicator = type !== 'never';

    const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      onScrollPositionChange?.({
        x: event.nativeEvent.contentOffset.x,
        y: event.nativeEvent.contentOffset.y,
      });
      onScroll?.(event);
    };

    return (
      <ScrollView
        {...others}
        ref={ref}
        horizontal={horizontal}
        showsVerticalScrollIndicator={showsIndicator}
        showsHorizontalScrollIndicator={showsIndicator}
        onScroll={
          onScrollPositionChange || onScroll ? handleScroll : undefined
        }
        scrollEventThrottle={16}
        style={style}
      >
        {children}
      </ScrollView>
    );
  }
);

export interface ScrollAreaAutosizeProps extends ScrollAreaProps {
  /** Maximum height of the scroll area, content below it is scrollable */
  maxHeight: number;
}

/**
 * ScrollArea.Autosize grows with its content up to maxHeight.
 */
const ScrollAreaAutosize = forwardRef<ScrollView, ScrollAreaAutosizeProps>(
  (props, ref) => {
    const { maxHeight, style, ...others } = props;

    return (
      <ScrollAreaBase
        ref={ref}
        style={[{ maxHeight, flexGrow: 0 }, style]}
        {...others}
      />
    );
  }
);

export const ScrollArea = Object.assign(ScrollAreaBase, {
  Autosize: ScrollAreaAutosize,
}) as typeof ScrollAreaBase & { Autosize: typeof ScrollAreaAutosize };

ScrollArea.displayName = 'ScrollArea';
ScrollAreaAutosize.displayName = 'ScrollArea.Autosize';
