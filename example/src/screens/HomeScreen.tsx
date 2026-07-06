import { useState } from 'react';
import { ScrollView, TouchableOpacity, View, TextInput } from 'react-native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
  Stack,
  Text,
  Title,
  Paper,
  Badge,
  Group,
  createStyles,
} from 'react-native-mantine';
import type { RootStackParamList } from '../navigation/types';
import { componentCategories } from '../navigation/componentData';

type HomeScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Home'>;
};

export const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const { styles, theme } = useStyles();
  const [searchQuery, setSearchQuery] = useState('');

  const query = searchQuery.toLowerCase();

  const searchResults = query
    ? componentCategories.flatMap((category) =>
        category.components
          .filter(
            (c) =>
              c.name.toLowerCase().includes(query) ||
              c.description.toLowerCase().includes(query)
          )
          .map((c) => ({ ...c, categoryTitle: category.title }))
      )
    : [];

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
            {totalComponents} components ready to use
          </Text>
        </View>

        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search all components..."
            placeholderTextColor="rgba(255,255,255,0.6)"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      <View style={styles.content}>
        {query ? (
          <>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionDescription}>
                {searchResults.length} result{searchResults.length !== 1 ? 's' : ''} for "{searchQuery}"
              </Text>
            </View>

            <Stack spacing={10}>
              {searchResults.length > 0 ? (
                searchResults.map((component) => (
                  <TouchableOpacity
                    key={component.route}
                    onPress={() => navigation.navigate(component.route as any)}
                    activeOpacity={0.7}
                  >
                    <Paper p="lg" radius="md" shadow="xs" style={styles.resultCard}>
                      <Group position="apart">
                        <View style={styles.resultInfo}>
                          <Group spacing={8} style={{ marginBottom: 4 }}>
                            <Title order={4} style={styles.resultName}>
                              {component.name}
                            </Title>
                            <Badge size="xs" variant="light" color="blue">
                              {component.categoryTitle}
                            </Badge>
                          </Group>
                          <Text style={styles.resultDescription}>
                            {component.description}
                          </Text>
                        </View>
                        <View style={styles.arrowContainer}>
                          <Text style={styles.arrow}>›</Text>
                        </View>
                      </Group>
                    </Paper>
                  </TouchableOpacity>
                ))
              ) : (
                <Paper p="xl" radius="md" style={styles.emptyState}>
                  <Text style={styles.emptyText}>No components match your search</Text>
                </Paper>
              )}
            </Stack>
          </>
        ) : (
          <>
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
                      { backgroundColor: getCategoryColor(index, theme) },
                    ]}
                  >
                    <Group position="apart">
                      <View style={styles.categoryInfo}>
                        <Title order={3} style={styles.categoryTitle}>
                          {category.title}
                        </Title>
                        <Text style={styles.categoryDescription}>
                          {category.description}
                        </Text>
                      </View>
                      <Badge size="sm" variant="light" color="gray">
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
          </>
        )}
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
    paddingBottom: 24,
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
  searchContainer: {
    marginTop: 16,
  },
  searchInput: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 15,
    color: '#ffffff',
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
  resultCard: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: theme.colors.gray?.[2] || '#e9ecef',
  },
  resultInfo: {
    flex: 1,
    marginRight: 12,
  },
  resultName: {
    fontSize: 18,
    fontWeight: '700',
    color: theme.colors.gray?.[9] || '#212529',
  },
  resultDescription: {
    fontSize: 14,
    color: theme.colors.gray?.[6] || '#868e96',
    lineHeight: 20,
  },
  arrowContainer: {
    justifyContent: 'center',
    paddingLeft: 8,
  },
  arrow: {
    fontSize: 28,
    color: theme.colors.gray?.[4] || '#ced4da',
    fontWeight: '300',
  },
  emptyState: {
    backgroundColor: '#ffffff',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: theme.colors.gray?.[2] || '#e9ecef',
  },
  emptyText: {
    fontSize: 15,
    color: theme.colors.gray?.[6] || '#868e96',
    textAlign: 'center',
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
