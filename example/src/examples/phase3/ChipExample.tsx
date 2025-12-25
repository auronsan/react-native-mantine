import { ExampleWrapper, ExampleSection } from '../../components/ExampleWrapper';
import { Chip, Group , Paper } from 'react-native-mantine';

export const ChipExample = () => {
  return (
    <ExampleWrapper
      title="Chip"
      description="Selectable tag with checkmark"
    >
      <ExampleSection
        title="Basic Usage"
        description="Chip component"
      >
        <Paper p="md" radius="md">
          <Group spacing={8}>
            <Chip>React</Chip>
            <Chip checked>Native</Chip>
            <Chip>Mantine</Chip>
          </Group>
        </Paper>
      </ExampleSection>
    </ExampleWrapper>
  );
};
