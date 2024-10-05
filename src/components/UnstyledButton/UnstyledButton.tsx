import React, { forwardRef } from 'react';
import { BoxView } from '../BoxView';
import useStyles from './UnstyledButton.styles';
import { TouchableOpacity } from 'react-native';
import { useComponentDefaultProps } from '../../theme/theme-provider';
import { Text } from '../Text';

export interface UnstyledButtonProps {
  variant?: string;
  children?: React.ReactNode;
}

export const UnstyledButton = forwardRef<
  any,
  UnstyledButtonProps & { style?: any }
>((props, ref) => {
  const { variant, style, children, ...others } = useComponentDefaultProps(
    'UnstyledButton',
    {},
    props
  );

  const { styles } = useStyles({
    variant,
  });

  return (
    <TouchableOpacity>
      <BoxView ref={ref} style={[styles.root, style]} {...others}>
        <Text>{children}</Text>
      </BoxView>
    </TouchableOpacity>
  );
});
