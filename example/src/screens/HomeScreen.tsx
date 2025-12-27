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
  const { styles, theme } = useStyles();

  const totalComponents = componentCategories.reduce(
    (sum, cat) => sum + cat.components.length,
    0
  );

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

          <View style={styles.statsContainer}>
            <View style={styles.statBox}>
              <Text style={styles.statNumber}>{totalComponents}</Text>
              <Text style={styles.statLabel}>Components</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statBox}>
              <Text style={styles.statNumber}>{componentCategories.length}</Text>
              <Text style={styles.statLabel}>Categories</Text>
            </View>
          </View>
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
                <Group position="apart" alignCenter style={styles.categoryHeader}>
                  <View style={styles.categoryInfo}>
                    <Title order={3} style={styles.categoryTitle}>
                      {category.title}
                    </Title>
                    <Text style={styles.categoryDescription}>
                      {category.description}
                    </Text>
                  </View>
                  <Badge
                    size="xl"
                    variant="light"
                    style={styles.badge}
                  >
                    {category.components.length}
                  </Badge>
                </Group>
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
    backgroundColor: theme.light.background,
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
    marginBottom: 24,
    lineHeight: 22,
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    minWidth: 240,
  },
  statBox: {
    flex: 1,
    alignItems: 'center',
  },
  statNumber: {
    color: '#ffffff',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statLabel: {
    color: '#ffffff',
    fontSize: 12,
    opacity: 0.9,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    marginHorizontal: 16,
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
    color: theme.light.text,
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
  categoryHeader: {
    marginBottom: 0,
  },
  categoryInfo: {
    flex: 1,
    marginRight: 12,
  },
  categoryTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: theme.light.text,
    marginBottom: 6,
  },
  categoryDescription: {
    fontSize: 14,
    color: theme.colors.gray?.[7] || '#495057',
    lineHeight: 19,
  },
  badge: {
    minWidth: 44,
    height: 44,
    borderRadius: 22,
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
