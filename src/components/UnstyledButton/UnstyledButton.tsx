import React, { forwardRef } from 'react';
import { BoxView } from '../BoxView';
import useStyles from './UnstyledButton.styles';
import { TouchableOpacity } from 'react-native';
import { useComponentDefaultProps } from 'react-native-mantine';

export interface UnstyledButtonProps {
  variant?: string;
  children?: React.ReactNode;
}

export const UnstyledButton = forwardRef<
  any,
  UnstyledButtonProps & { component?: any; style: any }
>((props, ref) => {
  const { variant, style, ...others } = useComponentDefaultProps(
    'UnstyledButton',
    {},
    props
  );

  const { styles } = useStyles({
    variant,
  });

  return (
    <TouchableOpacity>
      <BoxView ref={ref} style={[styles.root, style]} {...others} />
    </TouchableOpacity>
  );
});
