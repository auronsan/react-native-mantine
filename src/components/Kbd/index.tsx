import React, { forwardRef } from 'react';
import { BoxView } from '../BoxView';
import type { DefaultProps, MantineSize } from '../../theme/types';
import { useComponentDefaultProps } from '../../theme/theme-provider';
import { createStyles } from '../../theme';
import { rem } from '../../theme/utils/rem';
import { withTextWrapper, type WithTextWrapperProps } from '../../theme/utils/withTextWrapper';

export interface KbdProps extends DefaultProps, WithTextWrapperProps {
  /** Kbd size */
  size?: MantineSize;

  /** Kbd content */
  children?: React.ReactNode;

  /** Additional styles */
  style?: any;
}

const sizes = {
  xs: { fontSize: rem(10), padding: rem(2), minWidth: rem(16) },
  sm: { fontSize: rem(11), padding: rem(3), minWidth: rem(18) },
  md: { fontSize: rem(12), padding: rem(4), minWidth: rem(20) },
  lg: { fontSize: rem(14), padding: rem(5), minWidth: rem(24) },
  xl: { fontSize: rem(16), padding: rem(6), minWidth: rem(28) },
};

const useStyles = createStyles(
  (theme, _params, { size }) => {
    const sizeStyles = sizes[size as keyof typeof sizes] || sizes.md;

    return {
      root: {
        backgroundColor:
          theme.colorScheme === 'dark'
            ? (theme.colors.dark || [])[5]
            : (theme.colors.gray || [])[0],
        borderWidth: 1,
        borderBottomWidth: 2,
        borderColor:
          theme.colorScheme === 'dark'
            ? (theme.colors.dark || [])[4]
            : (theme.colors.gray || [])[3],
        borderRadius: theme.radius.sm,
        paddingHorizontal: theme.spacing.xs,
        paddingVertical: rem(2) as any as any,
        minWidth: sizeStyles.minWidth as any,
        alignItems: 'center',
        justifyContent: 'center',
      },
      label: {
        fontSize: sizeStyles.fontSize as any,
        fontWeight: '700',
        fontFamily: theme.fontFamilyMonospace,
        color:
          theme.colorScheme === 'dark'
            ? (theme.colors.dark || [])[0]
            : (theme.colors.gray || [])[7],
      },
    };
  }
);

const defaultProps: Partial<KbdProps> = {
  size: 'md',
  withTextWrapper: true,
};

const _Kbd = forwardRef<any, KbdProps>((props, ref) => {
  const { size, children, style, withTextWrapper: shouldWrapInText, ...otherProps} = useComponentDefaultProps(
    'Kbd',
    defaultProps,
    props
  );

  const { styles, sx } = useStyles({}, { name: 'Kbd', size}) as any;

  return (
    <BoxView ref={ref} style={sx(styles.root, style)} {...otherProps}>
      {withTextWrapper(children, shouldWrapInText, styles.label)}
    </BoxView>
  );
});

export const Kbd = React.memo(_Kbd);
Kbd.displayName = 'Kbd';
