import { ScrollView, View } from 'react-native';
import {
  Text,
  Title,
  Divider,
  createStyles,
  Paper,
  Badge,
} from 'react-native-mantine';

interface ExampleWrapperProps {
  title: string;
  description?: string;
  children: React.ReactNode;
}

export const ExampleWrapper: React.FC<ExampleWrapperProps> = ({
  title,
  description,
  children,
}) => {
  const { styles } = useStyles();

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Title order={2} style={styles.title}>
          {title}
        </Title>
        {description && <Text style={styles.description}>{description}</Text>}
      </View>
      <View style={styles.content}>{children}</View>
    </ScrollView>
  );
};

interface ExampleSectionProps {
  title: string;
  description?: string;
  variant?: 'default' | 'showcase';
  children: React.ReactNode;
}

export const ExampleSection: React.FC<ExampleSectionProps> = ({
  title,
  description,
  variant = 'default',
  children,
}) => {
  const { styles } = useStyles();

  return (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Title order={4} style={styles.sectionTitle}>
          {title}
        </Title>
        {variant === 'showcase' && (
          <Badge size="sm" variant="outline" color="blue">
            Demo
          </Badge>
        )}
      </View>
      {description && (
        <Text style={styles.sectionDescription}>{description}</Text>
      )}
      <Paper p="md" radius="md" style={styles.sectionContent}>
        {children}
      </Paper>
      <Divider style={styles.divider} />
    </View>
  );
};

interface CodeBlockProps {
  code: string;
  language?: string;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({
  code,
  language = 'tsx',
}) => {
  const { styles } = useStyles();

  return (
    <Paper p="md" radius="md" style={styles.codeBlock}>
      <View style={styles.codeHeader}>
        <Badge size="xs" variant="filled" color="gray">
          {language}
        </Badge>
      </View>
      <Text style={styles.codeText}>{code}</Text>
    </Paper>
  );
};

interface PropsTableProps {
  props: Array<{
    name: string;
    type: string;
    description: string;
    default?: string;
  }>;
}

export const PropsTable: React.FC<PropsTableProps> = ({ props }) => {
  const { styles } = useStyles();

  return (
    <Paper p="md" radius="md" style={styles.propsTable}>
      <Title order={5} style={styles.propsTableTitle}>
        Component Props
      </Title>
      {props.map((prop, index) => (
        <View key={prop.name} style={styles.propRow}>
          <View style={styles.propHeader}>
            <Text style={styles.propName}>{prop.name}</Text>
            <Badge size="xs" variant="light">
              {prop.type}
            </Badge>
          </View>
          <Text style={styles.propDescription}>{prop.description}</Text>
          {prop.default && (
            <Text style={styles.propDefault}>Default: {prop.default}</Text>
          )}
          {index < props.length - 1 && <Divider style={styles.propDivider} />}
        </View>
      ))}
    </Paper>
  );
};

const useStyles = createStyles((theme) => ({
  container: {
    flex: 1,
    backgroundColor:
      theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
  },
  header: {
    padding: 20,
    paddingTop: 20,
    backgroundColor:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[6]
        : theme.colors.gray[0],
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.gray?.[2] || '#e9ecef',
  },
  title: {
    fontSize: 26,
    fontWeight: '600',
    color:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[0]
        : theme.colors.gray[9],
    marginBottom: 6,
  },
  description: {
    fontSize: 15,
    color: theme.colors.gray?.[6] || '#868e96',
    lineHeight: 22,
  },
  content: {
    padding: 16,
    paddingTop: 20,
  },
  section: {
    marginBottom: 28,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 19,
    fontWeight: '600',
    color:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[0]
        : theme.colors.gray[9],
  },
  sectionDescription: {
    color: theme.colors.gray?.[6] || '#868e96',
    fontSize: 14,
    marginBottom: 14,
    lineHeight: 20,
  },
  sectionContent: {
    backgroundColor:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[6]
        : theme.colors.gray[0],
    borderWidth: 1,
    borderColor: theme.colors.gray?.[2] || '#e9ecef',
    marginBottom: 12,
    width: '100%',
  },
  divider: {
    marginTop: 4,
  },
  codeBlock: {
    backgroundColor: theme.colors.gray?.[9] || '#212529',
    borderWidth: 1,
    borderColor: theme.colors.gray?.[7] || '#495057',
  },
  codeHeader: {
    marginBottom: 8,
  },
  codeText: {
    fontFamily: 'Courier',
    fontSize: 13,
    color: '#e7f5ff',
    lineHeight: 18,
  },
  propsTable: {
    backgroundColor:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[6]
        : theme.colors.gray[0],
    borderWidth: 1,
    borderColor: theme.colors.gray?.[2] || '#e9ecef',
    width: '100%',
  },
  propsTableTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
    color:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[0]
        : theme.colors.gray[9],
  },
  propRow: {
    paddingVertical: 8,
  },
  propHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  propName: {
    fontSize: 15,
    fontWeight: '600',
    color:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[0]
        : theme.colors.gray[9],
  },
  propDescription: {
    fontSize: 14,
    color: theme.colors.gray?.[7] || '#495057',
    lineHeight: 19,
    marginTop: 2,
  },
  propDefault: {
    fontSize: 13,
    color: theme.colors.blue?.[6] || '#228be6',
    marginTop: 4,
    fontStyle: 'italic',
  },
  propDivider: {
    marginTop: 8,
  },
}));
