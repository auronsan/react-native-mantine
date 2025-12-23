import React from 'react';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
  Stack,
  Text,
  Title,
  Paper,
  createStyles,
  Divider,
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
  const { styles } = useStyles();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Title order={2} style={styles.title}>
          {category.title}
        </Title>
        <Text style={styles.description}>{category.description}</Text>
      </View>

      <Stack spacing={8} style={styles.componentsContainer}>
        {category.components.map((component, index) => (
          <React.Fragment key={component.route}>
            <TouchableOpacity
              onPress={() => navigation.navigate(component.route as any)}
              activeOpacity={0.7}
            >
              <Paper p="md" radius="md" style={styles.componentCard}>
                <Title order={4} style={styles.componentName}>
                  {component.name}
                </Title>
                <Text style={styles.componentDescription}>
                  {component.description}
                </Text>
              </Paper>
            </TouchableOpacity>
            {index < category.components.length - 1 && <Divider />}
          </React.Fragment>
        ))}
      </Stack>
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
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.gray?.[2] || '#e9ecef',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  description: {
    color: theme.colors.gray?.[6] || '#868e96',
    fontSize: 14,
    lineHeight: 20,
  },
  componentsContainer: {
    padding: 16,
  },
  componentCard: {
    borderWidth: 1,
    borderColor: theme.colors.gray?.[2] || '#e9ecef',
    backgroundColor: 'white',
  },
  componentName: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  componentDescription: {
    color: theme.colors.gray?.[6] || '#868e96',
    fontSize: 14,
    lineHeight: 18,
  },
}));
