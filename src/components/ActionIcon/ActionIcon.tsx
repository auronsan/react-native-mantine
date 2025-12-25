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
};

export const ActionIcon = forwardRef<any, ActionIconProps>(
  (
    {
      onPress = () => {},
      children,
      variant = 'default',
      style,
      size = 'md',
    },
    ref
  ) => {
    const { styles } = useStyles({ size, variant });
    return (
      <TouchableOpacity
        ref={ref}
        onPress={typeof onPress === 'function' ? onPress : () => {}}
        style={[styles.container, style]}
      >
        <BoxView style={styles.iconWrapper}>{children}</BoxView>
      </TouchableOpacity>
    );
  }
);

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
            : theme.currentMode === 'dark'
              ? theme.primaryBgColor
              : theme.secondaryBgColor,
        borderRadius: sizeValue / 2,
        alignItems: 'center',
        justifyContent: 'center',
        height: sizeValue,
        width: sizeValue,
      },
    };
  }
);
