import React, { forwardRef, useState } from 'react';
import { TouchableOpacity, type LayoutChangeEvent } from 'react-native';
import { BoxView } from '../BoxView';
import { Text } from '../Text';
import type { DefaultProps } from '../../theme/types';
import { useComponentDefaultProps } from '../../theme/theme-provider';
import { createStyles } from '../../theme';
import { rem } from '../../theme/utils/rem';

export interface SpoilerProps extends DefaultProps {
  /** Content that will be hidden under spoiler */
  children: React.ReactNode;

  /** Max height after which spoiler is shown */
  maxHeight: number;

  /** Label for show button */
  showLabel?: string;

  /** Label for hide button */
  hideLabel?: string;

  /** Transition duration in ms */
  transitionDuration?: number;

  /** Controlled expanded state */
  expanded?: boolean;

  /** Called when expanded state changes */
  onExpandedChange?: (expanded: boolean) => void;

  /** Additional styles */
  style?: any;
}

const useStyles = createStyles((theme) => ({
  root: {},
  content: {
    overflow: 'hidden',
  },
  control: {
    paddingTop: theme.spacing.sm,
    paddingBottom: theme.spacing.sm,
  },
  controlText: {
    fontSize: theme.fontSizes.sm as number,
    fontWeight: '500',
    color: theme.fn.themeColor(theme.primaryColor, 6),
  },
}));

const defaultProps: Partial<SpoilerProps> = {
  maxHeight: 100,
  showLabel: 'Show more',
  hideLabel: 'Show less',
  transitionDuration: 200,
};

export const Spoiler = forwardRef<any, SpoilerProps>((props, ref) => {
  const {
    children,
    maxHeight,
    showLabel,
    hideLabel,
    transitionDuration,
    expanded: controlledExpanded,
    onExpandedChange,
    style,
    ...others
  } = useComponentDefaultProps('Spoiler', defaultProps, props);

  const { styles, sx} = useStyles({}, { name: 'Spoiler' }) as any;

  const [contentHeight, setContentHeight] = useState<number>(0);
  const [uncontrolledExpanded, setUncontrolledExpanded] = useState(false);

  const expanded = controlledExpanded !== undefined ? controlledExpanded : uncontrolledExpanded;
  const showSpoiler = contentHeight > maxHeight;

  const handleLayout = (event: LayoutChangeEvent) => {
    const { height } = event.nativeEvent.layout;
    if (height > 0 && height !== contentHeight) {
      setContentHeight(height);
    }
  };

  const toggleExpanded = () => {
    const newExpanded = !expanded;
    if (controlledExpanded === undefined) {
      setUncontrolledExpanded(newExpanded);
    }
    onExpandedChange?.(newExpanded);
  };

  if (!showSpoiler) {
    return (
      <BoxView ref={ref} style={sx(styles.root, style)} {...others}>
        <BoxView onLayout={handleLayout}>{children}</BoxView>
      </BoxView>
    );
  }

  return (
    <BoxView ref={ref} style={sx(styles.root, style)} {...others}>
      <BoxView
        style={[
          styles.content,
          !expanded && {
            maxHeight: rem(maxHeight),
          },
        ]}
      >
        <BoxView onLayout={handleLayout}>{children}</BoxView>
      </BoxView>

      <TouchableOpacity style={styles.control} onPress={toggleExpanded} activeOpacity={0.7}>
        <Text style={styles.controlText}>{expanded ? hideLabel : showLabel}</Text>
      </TouchableOpacity>
    </BoxView>
  );
});

Spoiler.displayName = 'Spoiler';
