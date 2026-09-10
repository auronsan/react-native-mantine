import React, { forwardRef } from 'react';
import { BoxView } from '../BoxView';
import useStyles from './UnstyledButton.styles';
import {
  TouchableOpacity,
  type AccessibilityRole,
  type AccessibilityState,
  type AccessibilityValue,
} from 'react-native';
import { useComponentDefaultProps } from '../../theme/theme-provider';

export interface UnstyledButtonProps {
  variant?: string;
  children?: React.ReactNode;
  onPress?: (payload: any) => void;
  disabled?: boolean;
  activeOpacity?: number;
  accessible?: boolean;
  accessibilityLabel?: string;
  accessibilityHint?: string;
  accessibilityRole?: AccessibilityRole;
  accessibilityState?: AccessibilityState;
  accessibilityValue?: AccessibilityValue;
  testID?: string;
}

export const UnstyledButton = forwardRef<
  any,
  UnstyledButtonProps & { style?: any }
>((props, ref) => {
  const {
    variant,
    style,
    children,
    onPress,
    disabled,
    activeOpacity,
    accessible,
    accessibilityLabel,
    accessibilityHint,
    accessibilityRole,
    accessibilityState,
    accessibilityValue,
    testID,
    ...others
  } = useComponentDefaultProps('UnstyledButton', {}, props);

  const { styles } = useStyles({
    variant,
  });

  return (
    <TouchableOpacity
      onPress={typeof onPress === 'function' ? onPress : () => {}}
      disabled={disabled}
      activeOpacity={activeOpacity !== undefined ? activeOpacity : 0.7}
      accessible={accessible}
      accessibilityRole={accessibilityRole ?? 'button'}
      accessibilityState={{ disabled, ...accessibilityState }}
      accessibilityLabel={accessibilityLabel}
      accessibilityHint={accessibilityHint}
      accessibilityValue={accessibilityValue}
      testID={testID}
    >
      <BoxView ref={ref} style={[styles.root, style]} {...others}>
        {children}
      </BoxView>
    </TouchableOpacity>
  );
});

UnstyledButton.displayName = 'UnstyledButton';
