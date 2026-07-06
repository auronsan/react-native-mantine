import React, { forwardRef } from 'react';
import { BoxView } from '../BoxView';
import useStyles from './UnstyledButton.styles';
import {
  TouchableOpacity,
  type AccessibilityRole,
  type AccessibilityState,
} from 'react-native';
import { useComponentDefaultProps } from '../../theme/theme-provider';

export interface UnstyledButtonProps {
  variant?: string;
  children?: React.ReactNode;
  onPress?: (payload: any) => void;
  disabled?: boolean;
  activeOpacity?: number;
  accessibilityLabel?: string;
  accessibilityRole?: AccessibilityRole;
  accessibilityState?: AccessibilityState;
  testID?: string;
}

export const UnstyledButton = forwardRef<
  any,
  UnstyledButtonProps & { style?: any }
>((props, ref) => {
  const { variant, style, children, onPress, disabled, activeOpacity, accessibilityLabel, accessibilityRole, accessibilityState, testID, ...others } =
    useComponentDefaultProps('UnstyledButton', {}, props);

  const { styles } = useStyles({
    variant,
  });

  return (
    <TouchableOpacity
      onPress={typeof onPress === 'function' ? onPress : () => {}}
      disabled={disabled}
      activeOpacity={activeOpacity !== undefined ? activeOpacity : 0.7}
      accessibilityRole={accessibilityRole ?? 'button'}
      accessibilityState={accessibilityState ?? { disabled }}
      accessibilityLabel={accessibilityLabel}
      testID={testID}
    >
      <BoxView ref={ref} style={[styles.root, style]} {...others}>
        {children}
      </BoxView>
    </TouchableOpacity>
  );
});

UnstyledButton.displayName = 'UnstyledButton';
