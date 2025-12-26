import React, { forwardRef } from 'react';
import { BoxView } from '../BoxView';
import useStyles from './UnstyledButton.styles';
import { TouchableOpacity } from 'react-native';
import { useComponentDefaultProps } from '../../theme/theme-provider';

export interface UnstyledButtonProps {
  variant?: string;
  children?: React.ReactNode;
  onPress?: (payload: any) => void;
  disabled?: boolean;
  activeOpacity?: number;
}

export const UnstyledButton = forwardRef<
  any,
  UnstyledButtonProps & { style?: any }
>((props, ref) => {
  const { variant, style, children, onPress, disabled, activeOpacity, ...others } =
    useComponentDefaultProps('UnstyledButton', {}, props);

  const { styles } = useStyles({
    variant,
  });

  return (
    <TouchableOpacity
      onPress={typeof onPress === 'function' ? onPress : () => {}}
      disabled={disabled}
      activeOpacity={activeOpacity !== undefined ? activeOpacity : 0.7}
    >
      <BoxView ref={ref} style={[styles.root, style]} {...others}>
        {children}
      </BoxView>
    </TouchableOpacity>
  );
});
