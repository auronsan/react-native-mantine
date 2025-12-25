import { ExampleWrapper, ExampleSection } from '../../components/ExampleWrapper';
import { ColorSwatch, Group , Paper } from 'react-native-mantine';

export const ColorSwatchExample = () => {
  return (
    <ExampleWrapper
      title="ColorSwatch"
      description="Color preview swatch"
    >
      <ExampleSection
        title="Basic Usage"
        description="ColorSwatch component"
      >
        <Paper p="md" radius="md">
          <Group spacing={8}>
            <ColorSwatch color="#228be6" />
            <ColorSwatch color="#fa5252" />
            <ColorSwatch color="#40c057" />
          </Group>
        </Paper>
      </ExampleSection>
    </ExampleWrapper>
  );
};
