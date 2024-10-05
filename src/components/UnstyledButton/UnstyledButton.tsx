import React, { forwardRef } from 'react';
import { BoxView } from '../BoxView';
import useStyles from './UnstyledButton.styles';
import { TouchableOpacity } from 'react-native';
import { useComponentDefaultProps } from '../../theme/theme-provider';
import { Text } from '../Text';

export interface UnstyledButtonProps {
  variant?: string;
  children?: React.ReactNode;
  onPress?: (payload: any) => void;
}

export const UnstyledButton = forwardRef<
  any,
  UnstyledButtonProps & { style?: any }
>((props, ref) => {
  const { variant, style, children, onPress, ...others } =
    useComponentDefaultProps('UnstyledButton', {}, props);

  const { styles } = useStyles({
    variant,
  });

  return (
    <TouchableOpacity
      onPress={typeof onPress === 'function' ? onPress : () => {}}
    >
      <BoxView ref={ref} style={[styles.root, style]} {...others}>
        <Text>{children}</Text>
      </BoxView>
    </TouchableOpacity>
  );
});
