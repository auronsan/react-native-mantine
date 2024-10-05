import { View } from 'react-native';
import {
  ActionIcon,
  createStyles,
  Stack,
  Text,
  UnstyledButton,
} from 'react-native-mantine';

export const Content = () => {
  const { styles } = useStyles();
  return (
    <View style={styles.container}>
      <Stack>
        <Text>Hello Theme</Text>
        <ActionIcon icon={<Text>i</Text>} />
        <Text>abc</Text>
        <UnstyledButton>UnstyledButton</UnstyledButton>
      </Stack>
    </View>
  );
};

const useStyles = createStyles((theme) => ({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
}));
