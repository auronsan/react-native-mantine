import React, { forwardRef, createContext, useContext } from 'react';
import { BoxView } from '../BoxView';
import { Text } from '../Text';
import type { DefaultProps, MantineColor, MantineNumberSize } from '../../theme/types';
import { useComponentDefaultProps, useTheme } from '../../theme/theme-provider';
import { createStyles } from '../../theme';
import { rem } from '../../theme/utils/rem';

interface TimelineContextValue {
  color: MantineColor;
  radius: MantineNumberSize;
  lineWidth: number;
  bulletSize: number;
  align: 'left' | 'right';
  reverseActive: boolean;
}

const TimelineContext = createContext<TimelineContextValue | null>(null);

const useTimelineContext = () => {
  const context = useContext(TimelineContext);
  if (!context) {
    throw new Error('Timeline components must be used within Timeline');
  }
  return context;
};

export interface TimelineProps extends DefaultProps {
  /** Timeline color */
  color?: MantineColor;

  /** Timeline alignment */
  align?: 'left' | 'right';

  /** Line width */
  lineWidth?: number;

  /** Bullet size */
  bulletSize?: number;

  /** Bullet border radius */
  radius?: MantineNumberSize;

  /** Timeline items */
  children: React.ReactNode;

  /** Highlight active items in reverse order */
  reverseActive?: boolean;

  /** Active item index */
  active?: number;

  /** Additional styles */
  style?: any;
}

export interface TimelineItemProps extends DefaultProps {
  /** Item title */
  title?: React.ReactNode;

  /** Item children (content) */
  children?: React.ReactNode;

  /** Item bullet icon */
  bullet?: React.ReactNode;

  /** Item bullet size override */
  bulletSize?: number;

  /** Item color override */
  color?: MantineColor;

  /** Line variant */
  lineVariant?: 'solid' | 'dashed' | 'dotted';

  /** Additional styles */
  style?: any;

  /** Internal prop for item index */
  __index?: number;

  /** Internal prop for last item */
  __isLast?: boolean;
}

const useTimelineStyles = createStyles(
  (theme, { align }: { align: 'left' | 'right' }) => ({
    root: {
      flexDirection: 'column',
      alignItems: align === 'left' ? 'flex-start' : 'flex-end',
    },
  })
);

const useTimelineItemStyles = createStyles(
  (
    theme,
    {
      color,
      radius,
      lineWidth,
      bulletSize,
      align,
      isActive,
      lineVariant,
      isLast,
    }: {
      color: MantineColor;
      radius: MantineNumberSize;
      lineWidth: number;
      bulletSize: number;
      align: 'left' | 'right';
      isActive: boolean;
      lineVariant: 'solid' | 'dashed' | 'dotted';
      isLast: boolean;
    }
  ) => {
    const colors = theme.colors[color] || theme.colors[theme.primaryColor];

    const getLineStyle = () => {
      const baseStyle = {
        borderLeftWidth: lineWidth,
        borderLeftColor: isActive
          ? colors?.[6] || colors?.[5] || theme.primaryBgColor
          : theme.colorScheme === 'dark'
          ? theme.colors.dark?.[4]
          : theme.colors.gray?.[3],
      };

      if (lineVariant === 'dashed') {
        return { ...baseStyle, borderStyle: 'dashed' as const };
      }
      if (lineVariant === 'dotted') {
        return { ...baseStyle, borderStyle: 'dotted' as const };
      }
      return baseStyle;
    };

    return {
      item: {
        flexDirection: align === 'left' ? 'row' : 'row-reverse',
        width: '100%',
      },
      itemBody: {
        flex: 1,
        paddingBottom: isLast ? 0 : theme.spacing.md,
        ...(align === 'left' && { paddingLeft: theme.spacing.md }),
        ...(align === 'right' && { paddingRight: theme.spacing.md }),
      },
      bulletWrapper: {
        position: 'relative',
        width: bulletSize,
        alignItems: 'center',
      },
      bullet: {
        width: bulletSize,
        height: bulletSize,
        borderRadius: theme.fn.radius(radius),
        backgroundColor: isActive
          ? colors?.[6] || colors?.[5] || theme.primaryBgColor
          : theme.colorScheme === 'dark'
          ? theme.colors.dark?.[5]
          : theme.colors.gray?.[2],
        borderWidth: rem(2),
        borderColor: isActive
          ? colors?.[6] || colors?.[5] || theme.primaryBgColor
          : theme.colorScheme === 'dark'
          ? theme.colors.dark?.[4]
          : theme.colors.gray?.[3],
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1,
      },
      line: {
        position: 'absolute',
        top: bulletSize,
        bottom: 0,
        left: bulletSize / 2 - lineWidth / 2,
        ...getLineStyle(),
      },
      title: {
        fontSize: theme.fontSizes.sm,
        fontWeight: '600',
        color: theme.colorScheme === 'dark' ? theme.white : theme.black,
        marginBottom: rem(4),
      },
      content: {
        fontSize: theme.fontSizes.sm,
        color: theme.colorScheme === 'dark' ? theme.colors.dark?.[2] : theme.colors.gray?.[7],
      },
    };
  }
);

const defaultProps: Partial<TimelineProps> = {
  color: 'blue',
  align: 'left',
  lineWidth: 2,
  bulletSize: 20,
  radius: 'xl',
  reverseActive: false,
  active: -1,
};

const defaultItemProps: Partial<TimelineItemProps> = {
  lineVariant: 'solid',
};

export const Timeline = forwardRef<any, TimelineProps>((props, ref) => {
  const {
    color,
    align,
    lineWidth,
    bulletSize,
    radius,
    reverseActive,
    active,
    children,
    style,
    ...others
  } = useComponentDefaultProps('Timeline', defaultProps, props);

  const theme = useTheme();
  const { styles, sx } = useTimelineStyles({ align }, { name: 'Timeline' }) as any;

  const childrenArray = React.Children.toArray(children);
  const itemsCount = childrenArray.length;

  return (
    <TimelineContext.Provider
      value={{
        color: color!,
        radius: radius!,
        lineWidth: lineWidth!,
        bulletSize: bulletSize!,
        align: align!,
        reverseActive: reverseActive!,
      }}
    >
      <BoxView ref={ref} style={sx(styles.root, style)} {...others}>
        {childrenArray.map((child, index) => {
          if (!React.isValidElement(child)) return child;

          const isActive = reverseActive
            ? index >= itemsCount - (active! + 1)
            : index <= active!;

          return React.cloneElement(child as React.ReactElement, {
            key: index,
            __index: index,
            __isLast: index === itemsCount - 1,
            __isActive: isActive,
          });
        })}
      </BoxView>
    </TimelineContext.Provider>
  );
});

export const TimelineItem = forwardRef<
  any,
  TimelineItemProps & { __isActive?: boolean }
>((props, ref) => {
  const {
    title,
    children,
    bullet,
    bulletSize: itemBulletSize,
    color: itemColor,
    lineVariant,
    style,
    __index,
    __isLast,
    __isActive,
    ...others
  } = { ...defaultItemProps, ...props };

  const context = useTimelineContext();
  const theme = useTheme();

  const bulletSize = itemBulletSize || context.bulletSize;
  const color = itemColor || context.color;
  const isActive = __isActive ?? false;
  const isLast = __isLast ?? false;

  const { styles, sx } = useTimelineItemStyles(
    {
      color,
      radius: context.radius,
      lineWidth: context.lineWidth,
      bulletSize,
      align: context.align,
      isActive,
      lineVariant: lineVariant!,
      isLast,
    },
    { name: 'TimelineItem' }
  ) as any;

  return (
    <BoxView ref={ref} style={sx(styles.item, style)} {...others}>
      <BoxView style={styles.bulletWrapper}>
        <BoxView style={styles.bullet}>{bullet}</BoxView>
        {!isLast && <BoxView style={styles.line} />}
      </BoxView>

      <BoxView style={styles.itemBody}>
        {title && (
          <Text style={styles.title}>
            {typeof title === 'string' ? title : title}
          </Text>
        )}
        {children && (
          <Text style={styles.content}>
            {typeof children === 'string' ? children : children}
          </Text>
        )}
      </BoxView>
    </BoxView>
  );
});

Timeline.displayName = 'Timeline';
TimelineItem.displayName = 'Timeline.Item';

// Attach sub-components
(Timeline as any).Item = TimelineItem;
