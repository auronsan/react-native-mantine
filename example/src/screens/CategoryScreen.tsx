import React, { useState } from 'react';
import { ScrollView, TouchableOpacity, View, TextInput } from 'react-native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
  Stack,
  Text,
  Title,
  Paper,
  createStyles,
  Badge,
  Group,
} from 'react-native-mantine';
import type { RootStackParamList, ComponentCategory } from '../navigation/types';

type CategoryScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList>;
  category: ComponentCategory;
};

export const CategoryScreen: React.FC<CategoryScreenProps> = ({
  navigation,
  category,
}) => {
  const { styles, theme } = useStyles();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredComponents = category.components.filter((component) =>
    component.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    component.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Title order={2} style={styles.title}>
          {category.title}
        </Title>
        <Text style={styles.description}>{category.description}</Text>
        <Badge size="lg" variant="filled" style={styles.badge}>
          {category.components.length} Components
        </Badge>
      </View>

      <View style={styles.content}>
        {category.components.length > 5 && (
          <View style={styles.searchContainer}>
            <TextInput
              style={styles.searchInput}
              placeholder="Search components..."
              placeholderTextColor={theme.colors.gray?.[5] || '#adb5bd'}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
        )}

        <Stack spacing={10}>
          {filteredComponents.length > 0 ? (
            filteredComponents.map((component) => (
              <TouchableOpacity
                key={component.route}
                onPress={() => navigation.navigate(component.route as any)}
                activeOpacity={0.7}
              >
                <Paper
                  p="lg"
                  radius="md"
                  shadow="xs"
                  style={styles.componentCard}
                >
                  <Group position="apart">
                    <View style={styles.componentInfo}>
                      <Title order={4} style={styles.componentName}>
                        {component.name}
                      </Title>
                      <Text style={styles.componentDescription}>
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
              <Text style={styles.emptyStateText}>
                No components match your search
              </Text>
              <Text style={styles.emptyStateSubtext}>
                Try a different search term
              </Text>
            </Paper>
          )}
        </Stack>

        {filteredComponents.length > 0 && (
          <View style={styles.footer}>
            <Text style={styles.footerText}>
              Showing {filteredComponents.length} of {category.components.length} components
            </Text>
          </View>
        )}
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
    paddingTop: 24,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.gray?.[2] || '#e9ecef',
  },
  title: {
    fontSize: 26,
    fontWeight: '600',
    color: theme.colors.gray?.[9] || '#212529',
    marginBottom: 8,
  },
  description: {
    fontSize: 15,
    color: theme.colors.gray?.[6] || '#868e96',
    lineHeight: 22,
    marginBottom: 12,
  },
  badge: {
    alignSelf: 'flex-start',
  },
  content: {
    padding: 16,
    paddingTop: 20,
  },
  searchContainer: {
    marginBottom: 16,
  },
  searchInput: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: theme.colors.gray?.[3] || '#dee2e6',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 15,
    color: theme.colors.gray?.[9] || '#212529',
  },
  componentCard: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: theme.colors.gray?.[2] || '#e9ecef',
  },
  componentInfo: {
    flex: 1,
    marginRight: 12,
  },
  componentName: {
    fontSize: 18,
    fontWeight: '600',
    color: theme.colors.gray?.[9] || '#212529',
    marginBottom: 6,
  },
  componentDescription: {
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
  emptyStateText: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.gray?.[7] || '#495057',
    marginBottom: 4,
    textAlign: 'center',
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: theme.colors.gray?.[5] || '#adb5bd',
    textAlign: 'center',
  },
  footer: {
    marginTop: 20,
    alignItems: 'center',
    paddingBottom: 10,
  },
  footerText: {
    fontSize: 13,
    color: theme.colors.gray?.[6] || '#868e96',
    fontStyle: 'italic',
  },
}));
