import React, { forwardRef } from 'react';
import { BoxView } from '../BoxView';
import type {
  DefaultProps,
  MantineNumberSize,
  SpacingValue,
} from '../../theme/types';
import { useComponentDefaultProps } from '../../theme/theme-provider';
import { createStyles } from '../../theme';
import { rem } from '../../theme/utils/rem';

export interface PaperProps extends DefaultProps {
  /** Key of theme.shadows or any valid shadow value */
  shadow?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';

  /** Key of theme.radius or any valid value to set border-radius */
  radius?: MantineNumberSize;

  /** Padding from theme.spacing, or number to set padding in px */
  p?: SpacingValue;

  /** Add border with (theme.colors.gray || [])[3] color in light color scheme and (theme.colors.dark || [])[4] in dark */
  withBorder?: boolean;

  /** Paper children */
  children?: React.ReactNode;

  /** Additional styles */
  style?: any;
}

const useStyles = createStyles(
  (
    theme,
    {
      shadow,
      radius,
      p,
      withBorder,
    }: {
      shadow?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
      radius: MantineNumberSize;
      p?: SpacingValue;
      withBorder: boolean;
    }
  ) => {
    const getShadowStyles = () => {
      if (!shadow) return {};
      return theme.fn.shadow(shadow);
    };

    const getPadding = () => {
      if (p === undefined) return {};
      if (typeof p === 'number') return { padding: rem(p) };
      return { padding: theme.spacing[p] || theme.spacing.md };
    };

    return {
      root: {
        backgroundColor: theme.colorScheme === 'dark' ? (theme.colors.dark || [])[6] : theme.white,
        borderRadius: theme.fn.radius(radius),
        ...getShadowStyles(),
        ...getPadding(),
        ...(withBorder && {
          borderWidth: 1,
          borderColor:
            theme.colorScheme === 'dark' ? (theme.colors.dark || [])[4] : (theme.colors.gray || [])[3],
        }),
      },
    };
  }
);

const defaultProps: Partial<PaperProps> = {
  radius: 'sm',
  p: 0,
  withBorder: false,
};

export const Paper = forwardRef<any, PaperProps>((props, ref) => {
  const { shadow, radius, p, withBorder, children, style} =
    useComponentDefaultProps('Paper', defaultProps, props);

  const { styles, sx, ...others} = useStyles({ shadow, radius, p, withBorder}, { name: 'Paper' }) as any;

  return (
    <BoxView ref={ref} style={sx(styles.root, style)} {...others}>
      {children}
    </BoxView>
  );
});

Paper.displayName = 'Paper';
