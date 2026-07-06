import React, { forwardRef } from 'react';
import { View, type StyleProp, type TextStyle } from 'react-native';
import { BoxView } from '../BoxView';
import { Text } from '../Text';
import type { DefaultProps } from '../../theme/types';
import { useComponentDefaultProps, useTheme } from '../../theme/theme-provider';
import { createStyles } from '../../theme';

export interface TypographyProps extends DefaultProps {
  /** Content with typography styles applied to text */
  children?: React.ReactNode;

  /** Text style applied to string children */
  textStyle?: StyleProp<TextStyle>;
}

const useStyles = createStyles((theme) => ({
  root: {
    gap: theme.spacing.md,
  },
  body: {
    fontSize: theme.fontSizes.md as number,
    lineHeight: (theme.fontSizes.md as number) * 1.55,
    color: theme.colorScheme === 'dark' ? theme.fn.themeColor('dark', 0) : theme.black,
  },
}));

/**
 * Typography applies default typography styles (font size, line height,
 * color, vertical rhythm) to its content. React Native adaptation of the
 * Mantine v8 Typography component (former TypographyStylesProvider).
 */
export const Typography = forwardRef<View, TypographyProps>((props, ref) => {
  const { children, textStyle, style, ...others } = useComponentDefaultProps(
    'Typography',
    {},
    props
  );

  useTheme();
  const { styles, sx } = useStyles({}, { name: 'Typography' });

  return (
    <BoxView ref={ref} style={sx(styles.root, style)} {...others}>
      {React.Children.map(children, (child) =>
        typeof child === 'string' || typeof child === 'number' ? (
          <Text style={[styles.body, textStyle]}>{child}</Text>
        ) : (
          child
        )
      )}
    </BoxView>
  );
});

Typography.displayName = 'Typography';
