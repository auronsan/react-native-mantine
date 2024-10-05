import { isValidElement } from 'react';
import { TouchableOpacity } from 'react-native';
import { createStyles } from '../../theme/create-styles';
import { BoxView } from '../BoxView';
import { getSize } from '../../theme';

export type ActionIconProps = {
  onPress?: (payload: any) => void;
  children?: React.ReactNode;
  icon: React.ReactNode;
  minWidth?: number;
  style?: any;
  size: any;
};

export const ActionIcon = ({
  onPress = () => {},
  children,
  icon,
  minWidth = 100,
  style,
  size = 'md',
}: ActionIconProps): React.ReactElement => {
  const { styles } = useStyles({ minWidth, size });
  return (
    <TouchableOpacity
      onPress={typeof onPress === 'function' ? onPress : () => {}}
      style={[style, styles.container]}
    >
      <>
        <BoxView style={styles.containerButton}>{icon}</BoxView>
        {isValidElement(children) ? children : <></>}
      </>
    </TouchableOpacity>
  );
};

const useStyles = createStyles((theme, { minWidth = 100, size = 40 }) => {
  return {
    container: {
      alignItems: 'center',
      minWidth: minWidth,
    },
    containerButton: {
      backgroundColor:
        theme.currentMode === 'dark'
          ? theme.primaryBgColor
          : theme.secondaryBgColor,
      borderRadius: 50,
      padding: 10,
      alignItems: 'center',
      justifyContent: 'center',
      height: getSize({ size: 40, sizes: theme.spacing }),
      width: getSize({ size: 40, sizes: theme.spacing }),
    },
  };
});
