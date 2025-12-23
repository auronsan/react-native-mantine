import { ScrollView, View } from 'react-native';
import { Text, Title, Divider, createStyles } from 'react-native-mantine';

interface ExampleWrapperProps {
  title: string;
  children: React.ReactNode;
}

export const ExampleWrapper: React.FC<ExampleWrapperProps> = ({
  title,
  children,
}) => {
  const { styles } = useStyles();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Title order={2}>{title}</Title>
      </View>
      <View style={styles.content}>{children}</View>
    </ScrollView>
  );
};

interface ExampleSectionProps {
  title: string;
  description?: string;
  children: React.ReactNode;
}

export const ExampleSection: React.FC<ExampleSectionProps> = ({
  title,
  description,
  children,
}) => {
  const { styles } = useStyles();

  return (
    <View style={styles.section}>
      <Title order={4} style={styles.sectionTitle}>
        {title}
      </Title>
      {description && (
        <Text style={styles.sectionDescription}>{description}</Text>
      )}
      <View style={styles.sectionContent}>{children}</View>
      <Divider style={styles.divider} />
    </View>
  );
};

const useStyles = createStyles((theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.gray?.[0] || '#f8f9fa',
  },
  header: {
    padding: 20,
    paddingTop: 16,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.gray?.[2] || '#e9ecef',
  },
  content: {
    padding: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  sectionDescription: {
    color: theme.colors.gray?.[6] || '#868e96',
    fontSize: 14,
    marginBottom: 12,
    lineHeight: 20,
  },
  sectionContent: {
    marginBottom: 16,
  },
  divider: {
    marginTop: 8,
  },
}));
