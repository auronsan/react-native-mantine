import { ScrollView, TouchableOpacity, View } from 'react-native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
  Stack,
  Text,
  Title,
  Paper,
  createStyles,
} from 'react-native-mantine';
import type { RootStackParamList } from '../navigation/types';
import { componentCategories } from '../navigation/componentData';

type HomeScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Home'>;
};

export const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const { styles, theme } = useStyles();

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Title order={1} style={styles.title}>
            React Native Mantine
          </Title>
          <Text style={styles.subtitle}>
            A comprehensive component library for React Native
          </Text>
        </View>
      </View>

      <View style={styles.content}>
        <View style={styles.sectionHeader}>
          <Title order={2} style={styles.sectionTitle}>
            Component Categories
          </Title>
          <Text style={styles.sectionDescription}>
            Explore components organized by functionality
          </Text>
        </View>

        <Stack spacing={12}>
          {componentCategories.map((category, index) => (
            <TouchableOpacity
              key={category.route}
              onPress={() => navigation.navigate(category.route as any)}
              activeOpacity={0.7}
            >
              <Paper
                shadow="sm"
                radius="lg"
                p="lg"
                style={[
                  styles.categoryCard,
                  { backgroundColor: getCategoryColor(index, theme) }
                ]}
              >
                <View style={styles.categoryInfo}>
                  <Title order={3} style={styles.categoryTitle}>
                    {category.title}
                  </Title>
                  <Text style={styles.categoryDescription}>
                    {category.description}
                  </Text>
                </View>
              </Paper>
            </TouchableOpacity>
          ))}
        </Stack>

        <View style={styles.footer}>
          <Paper p="md" radius="md" style={styles.footerCard}>
            <Text style={styles.footerTitle}>Ready to explore?</Text>
            <Text style={styles.footerText}>
              Tap any category above to see interactive component examples
            </Text>
          </Paper>
        </View>
      </View>
    </ScrollView>
  );
};

const getCategoryColor = (index: number, theme: any) => {
  const colors = [
    theme.colors.blue?.[0] || '#e7f5ff',
    theme.colors.grape?.[0] || '#f3f0ff',
    theme.colors.green?.[0] || '#ebfbee',
    theme.colors.orange?.[0] || '#fff4e6',
    theme.colors.teal?.[0] || '#e6fcf5',
    theme.colors.pink?.[0] || '#fff0f6',
    theme.colors.indigo?.[0] || '#edf2ff',
  ];
  return colors[index % colors.length];
};

const useStyles = createStyles((theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
  },
  header: {
    backgroundColor: theme.colors.blue?.[6] || '#228be6',
    paddingTop: 60,
    paddingBottom: 32,
    paddingHorizontal: 20,
  },
  headerContent: {
    alignItems: 'center',
  },
  title: {
    color: '#ffffff',
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    color: '#ffffff',
    fontSize: 16,
    textAlign: 'center',
    opacity: 0.95,
    lineHeight: 22,
  },
  content: {
    padding: 20,
    paddingTop: 24,
  },
  sectionHeader: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[9],
    marginBottom: 4,
  },
  sectionDescription: {
    fontSize: 14,
    color: theme.colors.gray?.[6] || '#868e96',
    lineHeight: 20,
  },
  categoryCard: {
    borderWidth: 1,
    borderColor: theme.colors.gray?.[3] || '#dee2e6',
  },
  categoryInfo: {
    flex: 1,
  },
  categoryTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[9],
    marginBottom: 6,
  },
  categoryDescription: {
    fontSize: 14,
    color: theme.colors.gray?.[7] || '#495057',
    lineHeight: 19,
  },
  footer: {
    marginTop: 24,
    marginBottom: 20,
  },
  footerCard: {
    backgroundColor: theme.colors.blue?.[0] || '#e7f5ff',
    borderWidth: 1,
    borderColor: theme.colors.blue?.[2] || '#a5d8ff',
    alignItems: 'center',
  },
  footerTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.blue?.[9] || '#1864ab',
    marginBottom: 4,
    textAlign: 'center',
  },
  footerText: {
    fontSize: 14,
    color: theme.colors.blue?.[7] || '#1971c2',
    textAlign: 'center',
    lineHeight: 20,
  },
}));
