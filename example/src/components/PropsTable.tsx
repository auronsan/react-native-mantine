import { View } from 'react-native';
import { Text, Title, Divider, createStyles, Paper, Badge } from 'react-native-mantine';

export interface PropDefinition {
  name: string;
  type: string;
  description: string;
  default?: string;
  required?: boolean;
}

interface PropsTableProps {
  props: PropDefinition[];
}

export const PropsTable: React.FC<PropsTableProps> = ({ props }) => {
  const { styles } = useStyles();

  return (
    <Paper p="md" radius="md" style={styles.propsTable}>
      <Title order={5} style={styles.propsTableTitle}>
        Component Props
      </Title>
      <Text style={styles.propsTableSubtitle}>
        All available props for this component
      </Text>
      {props.map((prop, index) => (
        <View key={prop.name} style={styles.propRow}>
          <View style={styles.propHeader}>
            <View style={styles.propNameContainer}>
              <Text style={styles.propName}>{prop.name}</Text>
              {prop.required && (
                <Badge size="xs" variant="filled" color="red" style={styles.requiredBadge}>
                  required
                </Badge>
              )}
            </View>
            <Badge size="xs" variant="light" color="blue">
              {prop.type}
            </Badge>
          </View>
          <Text style={styles.propDescription}>{prop.description}</Text>
          {prop.default && (
            <View style={styles.defaultContainer}>
              <Text style={styles.defaultLabel}>Default: </Text>
              <Text style={styles.defaultValue}>{prop.default}</Text>
            </View>
          )}
          {index < props.length - 1 && <Divider style={styles.propDivider} />}
        </View>
      ))}
    </Paper>
  );
};

const useStyles = createStyles((theme) => ({
  propsTable: {
    backgroundColor: theme.light.backgroundSecondary,
    borderWidth: 1,
    borderColor: theme.colors.gray?.[2] || '#e9ecef',
  },
  propsTableTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 4,
    color: theme.light.text,
  },
  propsTableSubtitle: {
    fontSize: 13,
    color: theme.colors.gray?.[6] || '#868e96',
    marginBottom: 16,
  },
  propRow: {
    paddingVertical: 12,
  },
  propHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: 6,
    flexWrap: 'wrap',
  },
  propNameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    flexShrink: 1,
    marginRight: 8,
  },
  propName: {
    fontSize: 15,
    fontWeight: '600',
    color: theme.colors.blue?.[7] || '#1c7ed6',
    fontFamily: 'Courier',
  },
  requiredBadge: {
    marginLeft: 4,
  },
  propDescription: {
    fontSize: 14,
    color: theme.colors.gray?.[7] || '#495057',
    lineHeight: 20,
    marginTop: 2,
    marginBottom: 6,
  },
  defaultContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.gray?.[0] || '#f8f9fa',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 4,
    marginTop: 4,
  },
  defaultLabel: {
    fontSize: 13,
    color: theme.colors.gray?.[6] || '#868e96',
    fontWeight: '600',
  },
  defaultValue: {
    fontSize: 13,
    color: theme.colors.blue?.[6] || '#228be6',
    fontFamily: 'Courier',
    fontWeight: '500',
  },
  propDivider: {
    marginTop: 12,
  },
}));
