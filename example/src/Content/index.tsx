import { View, Text } from 'react-native';
import { createStyles } from 'react-native-mantine';

export const Content = () => {
  const { styles } = useStyles();
  return (
    <View style={styles.container}>
      <Text>Hello Theme</Text>
    </View>
  );
};

const useStyles = createStyles((theme) => ({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
    backgroundColor: theme.primaryBgColor,
  },
}));
