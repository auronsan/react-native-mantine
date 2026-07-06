import { forwardRef } from 'react';
import { TouchableOpacity } from 'react-native';
import { createStyles } from '../../theme/create-styles';
import { BoxView } from '../BoxView';
import { getSize } from '../../theme';

export type ActionIconProps = {
  onPress?: (payload: any) => void;
  children?: React.ReactNode;
  color?: string;
  variant?: 'filled' | 'light' | 'outline' | 'transparent' | 'default';
  style?: any;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | number;
  disabled?: boolean;
  accessibilityLabel?: string;
  accessibilityHint?: string;
  testID?: string;
};

export const ActionIcon = forwardRef<any, ActionIconProps>(
  (
    {
      onPress = () => {},
      children,
      variant = 'default',
      style,
      size = 'md',
      disabled,
      accessibilityLabel,
      accessibilityHint,
      testID,
      ...others
    },
    ref
  ) => {
    const { styles } = useStyles({ size, variant });
    return (
      <TouchableOpacity
        ref={ref}
        onPress={typeof onPress === 'function' ? onPress : () => {}}
        disabled={disabled}
        accessibilityRole="button"
        accessibilityState={{ disabled }}
        accessibilityLabel={accessibilityLabel}
        accessibilityHint={accessibilityHint}
        testID={testID}
        style={[styles.container, style]}
        {...others}
      >
        <BoxView style={styles.iconWrapper}>{children}</BoxView>
      </TouchableOpacity>
    );
  }
);

ActionIcon.displayName = 'ActionIcon';

export const sizes = {
  xs: 18,
  sm: 22,
  md: 28,
  lg: 34,
  xl: 44,
};

const useStyles = createStyles(
  (
    theme,
    {
      size = 'md',
      variant = 'default',
    }: {
      size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | number;
      variant?: string;
    }
  ) => {
    const sizeValue = typeof size === 'number' ? size : getSize({ size, sizes });

    return {
      container: {
        alignItems: 'center',
        justifyContent: 'center',
      },
      iconWrapper: {
        backgroundColor:
          variant === 'transparent'
            ? 'transparent'
            : theme.colorScheme === 'dark'
              ? theme.fn.primaryColor()
              : theme.fn.themeColor('gray', 1),
        borderRadius: sizeValue / 2,
        alignItems: 'center',
        justifyContent: 'center',
        height: sizeValue,
        width: sizeValue,
      },
    };
  }
);
