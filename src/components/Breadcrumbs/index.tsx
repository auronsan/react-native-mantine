import React, { forwardRef, Children } from 'react';
import { BoxView } from '../BoxView';
import { Text } from '../Text';
import type { DefaultProps } from '../../theme/types';
import { useComponentDefaultProps } from '../../theme/theme-provider';
import { createStyles } from '../../theme';
import { rem } from '../../theme/utils/rem';

export interface BreadcrumbsProps extends DefaultProps {
  /** Breadcrumb separator */
  separator?: React.ReactNode;

  /** Breadcrumb items */
  children?: React.ReactNode;

  /** Accessibility label for the breadcrumbs navigation */
  accessibilityLabel?: string;

  /** Additional styles */
  style?: any;
}

const useStyles = createStyles((theme) => ({
  root: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  separator: {
    marginHorizontal: theme.spacing.xs,
    color: theme.colorScheme === 'dark' ? theme.colors.dark?.[2] || theme.colors.gray?.[5] : theme.colors.gray?.[6] || theme.colors.gray?.[7],
    fontSize: rem(14),
  },
}));

const defaultProps: Partial<BreadcrumbsProps> = {
  separator: '/',
};

export const Breadcrumbs = forwardRef<any, BreadcrumbsProps>((props, ref) => {
  const { separator, children, accessibilityLabel, style, ...others} = useComponentDefaultProps(
    'Breadcrumbs',
    defaultProps,
    props
  );

  const { styles, sx} = useStyles({}, { name: 'Breadcrumbs' }) as any;

  const items = Children.toArray(children);

  return (
    <BoxView
      ref={ref}
      style={sx(styles.root, style)}
      accessibilityRole="list"
      accessibilityLabel={accessibilityLabel || 'Breadcrumb navigation'}
      {...others}
    >
      {items.map((item, index) => (
        <React.Fragment key={index}>
          {item}
          {index !== items.length - 1 && (
            <Text style={styles.separator}>{separator}</Text>
          )}
        </React.Fragment>
      ))}
    </BoxView>
  );
});

Breadcrumbs.displayName = 'Breadcrumbs';
