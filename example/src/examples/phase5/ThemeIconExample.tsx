import { ExampleWrapper, ExampleSection } from '../../components/ExampleWrapper';
import { Group, ThemeIcon , Paper } from 'react-native-mantine';

export const ThemeIconExample = () => {
  return (
    <ExampleWrapper
      title="ThemeIcon"
      description="Icon with themed background"
    >
      <ExampleSection
        title="Basic Usage"
        description="ThemeIcon component"
      >
        <Paper p="md" radius="md">
          <Group spacing={16}>
            <ThemeIcon color="blue" size="lg">📧</ThemeIcon>
            <ThemeIcon color="red" size="lg">❤️</ThemeIcon>
            <ThemeIcon color="green" size="lg">✓</ThemeIcon>
          </Group>
        </Paper>
      </ExampleSection>
    </ExampleWrapper>
  );
};
