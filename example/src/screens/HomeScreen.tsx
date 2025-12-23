import { ScrollView, TouchableOpacity, View } from 'react-native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
  Stack,
  Text,
  Title,
  Badge,
  Paper,
  createStyles,
} from 'react-native-mantine';
import type { RootStackParamList } from '../navigation/types';
import { componentCategories } from '../navigation/componentData';

type HomeScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Home'>;
};

export const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const { styles } = useStyles();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Title order={1} style={styles.title}>
          React Native Mantine
        </Title>
        <Text style={styles.subtitle}>Component Library Examples</Text>
        <Text style={styles.componentCount}>
          77 Components across 7 categories
        </Text>
      </View>

      <Stack spacing={16} style={styles.categoriesContainer}>
        {componentCategories.map((category) => (
          <TouchableOpacity
            key={category.route}
            onPress={() => navigation.navigate(category.route as any)}
            activeOpacity={0.7}
          >
            <Paper shadow="sm" radius="md" p="lg" style={styles.categoryCard}>
              <View style={styles.categoryHeader}>
                <Title order={3} style={styles.categoryTitle}>
                  {category.title}
                </Title>
                <Badge size="lg" variant="filled">
                  {category.components.length}
                </Badge>
              </View>
              <Text style={styles.categoryDescription}>{category.description}</Text>
            </Paper>
          </TouchableOpacity>
        ))}
      </Stack>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Tap any category to explore components
        </Text>
      </View>
    </ScrollView>
  );
};

const useStyles = createStyles((theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.gray?.[0] || '#f8f9fa',
  },
  header: {
    padding: 20,
    paddingTop: 40,
    backgroundColor: theme.colors.blue?.[6] || '#228be6',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  title: {
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    color: 'white',
    fontSize: 16,
    opacity: 0.9,
    marginBottom: 4,
  },
  componentCount: {
    color: 'white',
    fontSize: 14,
    opacity: 0.8,
  },
  categoriesContainer: {
    padding: 16,
  },
  categoryCard: {
    borderWidth: 1,
    borderColor: theme.colors.gray?.[2] || '#e9ecef',
  },
  categoryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: '600',
    flex: 1,
  },
  categoryDescription: {
    color: theme.colors.gray?.[6] || '#868e96',
    fontSize: 14,
    lineHeight: 20,
  },
  footer: {
    padding: 20,
    paddingBottom: 40,
    alignItems: 'center',
  },
  footerText: {
    color: theme.colors.gray?.[6] || '#868e96',
    fontSize: 14,
    fontStyle: 'italic',
  },
}));
