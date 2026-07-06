import React, { forwardRef, useRef, useState } from 'react';
import { PanResponder, View } from 'react-native';
import { BoxView } from '../BoxView';
import type { DefaultProps } from '../../theme/types';
import { useComponentDefaultProps } from '../../theme/theme-provider';
import { createStyles } from '../../theme';

export interface SplitterPaneProps extends DefaultProps {
  /** Initial pane size in percent, 0-100 */
  defaultSize: number;

  /** Minimum pane size in percent */
  min?: number;

  /** Maximum pane size in percent */
  max?: number;

  /** Pane content */
  children?: React.ReactNode;
}

const SplitterPane: React.FC<SplitterPaneProps> = ({ children }) => {
  return <>{children}</>;
};

SplitterPane.displayName = 'Splitter.Pane';

export interface SplitterProps extends DefaultProps {
  /** Splitter.Pane components */
  children: React.ReactNode;

  /** Direction in which panes are laid out */
  orientation?: 'horizontal' | 'vertical';

  /** Called with pane sizes in percent when they change */
  onSizeChange?: (sizes: number[]) => void;

  /** Called when the user starts dragging a handle */
  onResizeStart?: () => void;

  /** Called when the user stops dragging a handle */
  onResizeEnd?: (sizes: number[]) => void;

  /** Separator line thickness in px */
  lineSize?: number;

  /** Touchable area of the handle in px */
  handleSize?: number;

  /** Determines whether the grip indicator should be displayed on the handle */
  withHandle?: boolean;
}

const useStyles = createStyles((theme, { orientation }: { orientation: 'horizontal' | 'vertical' }) => ({
  root: {
    flexDirection: orientation === 'horizontal' ? 'row' : 'column',
    alignItems: 'stretch',
  },
  pane: {
    flexBasis: 0,
    overflow: 'hidden',
  },
  handle: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  line: {
    backgroundColor:
      theme.colorScheme === 'dark'
        ? theme.fn.themeColor('dark', 4)
        : theme.fn.themeColor('gray', 3),
    position: 'absolute',
  },
  grip: {
    backgroundColor:
      theme.colorScheme === 'dark'
        ? theme.fn.themeColor('dark', 2)
        : theme.fn.themeColor('gray', 5),
    borderRadius: 999,
  },
}));

const defaultProps: Partial<SplitterProps> = {
  orientation: 'horizontal',
  lineSize: 2,
  handleSize: 16,
  withHandle: true,
};

interface PaneConfig {
  min: number;
  max: number;
  node: React.ReactElement<SplitterPaneProps>;
}

/**
 * Splitter displays resizable panes divided by draggable handles.
 * Port of Mantine Splitter adapted for React Native touch interactions.
 */
const SplitterBase = forwardRef<View, SplitterProps>((props, ref) => {
  const {
    children,
    orientation,
    onSizeChange,
    onResizeStart,
    onResizeEnd,
    lineSize,
    handleSize,
    withHandle,
    style,
    ...others
  } = useComponentDefaultProps('Splitter', defaultProps, props);

  const { styles, sx } = useStyles(
    { orientation: orientation ?? 'horizontal' },
    { name: 'Splitter' }
  );

  const panes: PaneConfig[] = [];
  React.Children.forEach(children, (child) => {
    if (React.isValidElement<SplitterPaneProps>(child)) {
      panes.push({
        min: child.props.min ?? 0,
        max: child.props.max ?? 100,
        node: child,
      });
    }
  });

  const [sizes, setSizes] = useState<number[]>(() => {
    const defaults = panes.map((pane) => pane.node.props.defaultSize);
    const total = defaults.reduce((acc, size) => acc + size, 0) || 1;
    return defaults.map((size) => (size / total) * 100);
  });

  const totalPxRef = useRef(1);
  const sizesRef = useRef(sizes);
  sizesRef.current = sizes;

  const latestRef = useRef({ panes, onSizeChange, onResizeStart, onResizeEnd });
  latestRef.current = { panes, onSizeChange, onResizeStart, onResizeEnd };

  const dragStartSizesRef = useRef<number[]>([]);

  const createHandleResponder = (index: number) =>
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        dragStartSizesRef.current = [...sizesRef.current];
        latestRef.current.onResizeStart?.();
      },
      onPanResponderMove: (_event, gestureState) => {
        const { panes: currentPanes, onSizeChange: sizeChange } =
          latestRef.current;
        const start = dragStartSizesRef.current;
        const first = start[index] ?? 0;
        const second = start[index + 1] ?? 0;
        const firstPane = currentPanes[index];
        const secondPane = currentPanes[index + 1];

        if (!firstPane || !secondPane) {
          return;
        }

        const delta =
          ((orientation === 'horizontal'
            ? gestureState.dx
            : gestureState.dy) /
            Math.max(totalPxRef.current, 1)) *
          100;

        const minDelta = Math.max(
          firstPane.min - first,
          second - secondPane.max
        );
        const maxDelta = Math.min(
          firstPane.max - first,
          second - secondPane.min
        );
        const applied = Math.min(Math.max(delta, minDelta), maxDelta);

        const next = [...start];
        next[index] = first + applied;
        next[index + 1] = second - applied;

        setSizes(next);
        sizeChange?.(next);
      },
      onPanResponderRelease: () => {
        latestRef.current.onResizeEnd?.(sizesRef.current);
      },
      onPanResponderTerminate: () => {
        latestRef.current.onResizeEnd?.(sizesRef.current);
      },
    });

  const respondersRef = useRef<Record<number, ReturnType<typeof PanResponder.create>>>({});
  const getResponder = (index: number) => {
    if (!respondersRef.current[index]) {
      respondersRef.current[index] = createHandleResponder(index);
    }
    return respondersRef.current[index]!;
  };

  const horizontal = orientation === 'horizontal';

  const elements: React.ReactNode[] = [];
  panes.forEach((pane, index) => {
    elements.push(
      <View
        key={`pane-${index}`}
        style={[styles.pane, { flexGrow: Math.max(sizes[index] ?? 0, 0) }]}
      >
        {pane.node}
      </View>
    );

    if (index < panes.length - 1) {
      elements.push(
        <View
          key={`handle-${index}`}
          style={[
            styles.handle,
            horizontal
              ? { width: handleSize }
              : { height: handleSize },
          ]}
          accessibilityRole="adjustable"
          accessibilityLabel={`Resize pane ${index + 1}`}
          {...getResponder(index).panHandlers}
        >
          <View
            style={[
              styles.line,
              horizontal
                ? { width: lineSize, top: 0, bottom: 0 }
                : { height: lineSize, left: 0, right: 0 },
            ]}
          />
          {withHandle && (
            <View
              style={[
                styles.grip,
                horizontal
                  ? { width: 4, height: 28 }
                  : { width: 28, height: 4 },
              ]}
            />
          )}
        </View>
      );
    }
  });

  return (
    <BoxView
      ref={ref}
      style={sx(styles.root, style)}
      onLayout={(event: any) => {
        const { width, height } = event.nativeEvent.layout;
        totalPxRef.current = horizontal ? width : height;
      }}
      {...others}
    >
      {elements}
    </BoxView>
  );
});

export const Splitter = Object.assign(SplitterBase, {
  Pane: SplitterPane,
}) as typeof SplitterBase & { Pane: typeof SplitterPane };

Splitter.displayName = 'Splitter';
