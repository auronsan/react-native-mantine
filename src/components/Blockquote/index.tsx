import React, { forwardRef } from 'react';
import { BoxView } from '../BoxView';
import { Text } from '../Text';
import type {
  DefaultProps,
  MantineColor,
  MantineNumberSize,
} from '../../theme/types';
import { useComponentDefaultProps } from '../../theme/theme-provider';
import { createStyles } from '../../theme';
import { rem } from '../../theme/utils/rem';

export interface BlockquoteProps extends DefaultProps {
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
    const colors = theme.colors[color] || theme.colors[theme.primaryColor];

    return {
      root: {
        backgroundColor:
          theme.colorScheme === 'dark' ? theme.colors.dark?.[6] || theme.colors.gray?.[8] : theme.colors.gray?.[0] || theme.colors.gray?.[1],
        borderLeftWidth: 4,
        borderLeftColor: colors?.[6] || colors?.[5] || theme.primaryBgColor,
        borderRadius: theme.fn.radius(radius),
        padding: theme.spacing.md,
      },
      inner: {
        flexDirection: 'row',
      },
      icon: {
        marginRight: theme.spacing.md,
        marginTop: rem(2),
      },
      body: {
        flex: 1,
      },
      content: {
        fontSize: rem(16),
        lineHeight: rem(24),
        color: theme.colorScheme === 'dark' ? theme.colors.dark?.[0] || theme.white : theme.black,
        marginBottom: 0,
      },
      cite: {
        fontSize: rem(14),
        marginTop: theme.spacing.xs,
        color: theme.colorScheme === 'dark' ? theme.colors.dark?.[2] || theme.colors.gray?.[5] : theme.colors.gray?.[6] || theme.colors.gray?.[7],
      },
    };
  }
);

const defaultProps: Partial<BlockquoteProps> = {
  color: 'blue',
  radius: 'sm',
};

export const Blockquote = forwardRef<any, BlockquoteProps>((props, ref) => {
  const { color, icon, cite, radius, children, style, ...others } =
    useComponentDefaultProps('Blockquote', defaultProps, props);

  const { styles, sx } = useStyles({ color, radius }, { name: 'Blockquote' }) as any;

  return (
    <BoxView ref={ref} style={sx(styles.root, style)} {...others}>
      <BoxView style={styles.inner}>
        {icon && <BoxView style={styles.icon}>{icon}</BoxView>}
        <BoxView style={styles.body}>
          <Text style={styles.content}>{children}</Text>
          {cite && <Text style={styles.cite}>{cite}</Text>}
        </BoxView>
      </BoxView>
    </BoxView>
  );
});

Blockquote.displayName = 'Blockquote';
