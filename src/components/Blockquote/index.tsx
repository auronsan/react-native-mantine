import React, { forwardRef } from 'react';
import { BoxView } from '../BoxView';
import type {
  DefaultProps,
  MantineColor,
  MantineNumberSize,
} from '../../theme/types';
import { useComponentDefaultProps } from '../../theme/theme-provider';
import { createStyles } from '../../theme';
import { rem } from '../../theme/utils/rem';
import { withTextWrapper, type WithTextWrapperProps } from '../../theme/utils/withTextWrapper';

export interface BlockquoteProps extends DefaultProps, WithTextWrapperProps {
  /** Blockquote color from theme */
  color?: MantineColor;

  /** Icon to display on the left side */
  icon?: React.ReactNode;

  /** Citation text */
  cite?: React.ReactNode;

  /** Border radius */
  radius?: MantineNumberSize;

  /** Blockquote content */
  children?: React.ReactNode;

  /** Additional styles */
  style?: any;
}

const useStyles = createStyles(
  (
    theme,
    {
      color,
      radius,
    }: {
      color: MantineColor;
      radius: MantineNumberSize;
    }
  ) => {
    return {
      root: {
        backgroundColor:
          theme.colorScheme === 'dark' ? theme.fn.themeColor('dark', 6) : theme.fn.themeColor('gray', 0),
        borderLeftWidth: 4,
        borderLeftColor: theme.fn.themeColor(color, 6),
        borderRadius: theme.fn.radius(radius),
        padding: theme.spacing.md,
      },
      inner: {
        flexDirection: 'row',
      },
      icon: {
        marginRight: theme.spacing.md,
        marginTop: rem(2) as any as any,
      },
      body: {
        flex: 1,
      },
      content: {
        fontSize: rem(16),
        lineHeight: rem(24),
        color: theme.colorScheme === 'dark' ? theme.fn.themeColor('dark', 0) : theme.black,
        marginBottom: 0,
      },
      cite: {
        fontSize: rem(14),
        marginTop: theme.spacing.xs,
        color: theme.colorScheme === 'dark' ? theme.fn.themeColor('dark', 2) : theme.fn.themeColor('gray', 6),
      },
    };
  }
);

const defaultProps: Partial<BlockquoteProps> = {
  color: 'blue',
  radius: 'sm',
  withTextWrapper: true,
};

export const Blockquote = forwardRef<any, BlockquoteProps>((props, ref) => {
  const { color, icon, cite, radius, children, style, withTextWrapper: shouldWrapInText} =
    useComponentDefaultProps('Blockquote', defaultProps, props);

  const { styles, sx, ...others} = useStyles({ color, radius}, { name: 'Blockquote' }) as any;

  return (
    <BoxView ref={ref} style={sx(styles.root, style)} {...others}>
      <BoxView style={styles.inner}>
        {icon && <BoxView style={styles.icon}>{icon}</BoxView>}
        <BoxView style={styles.body}>
          {withTextWrapper(children, shouldWrapInText, styles.content)}
          {cite && withTextWrapper(cite, shouldWrapInText, styles.cite)}
        </BoxView>
      </BoxView>
    </BoxView>
  );
});

Blockquote.displayName = 'Blockquote';
