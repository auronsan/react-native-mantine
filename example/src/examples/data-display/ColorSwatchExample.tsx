import { ExampleWrapper, ExampleSection, CodeBlock } from '../../components/ExampleWrapper';
import { PropsTable } from '../../components/PropsTable';
import { colorSwatchProps } from '../../data/props/ColorSwatchProps';
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

      <ExampleSection
        title="Component Props"
        description="Complete reference of all available ColorSwatch props"
      >
        <PropsTable props={colorSwatchProps} />
      </ExampleSection>

      <ExampleSection
        title="Usage Example"
        description="Basic implementation code"
      >
        <CodeBlock
          code={`import { ColorSwatch, Group } from 'react-native-mantine';

<Group spacing={8}>
  <ColorSwatch color="#228be6" />
  <ColorSwatch color="#fa5252" />
  <ColorSwatch color="#40c057" />
</Group>

// With onPress and custom size
<ColorSwatch
  color="#228be6"
  size={40}
  onPress={() => console.log('Color selected')}
/>`}
        />
      </ExampleSection>
    </ExampleWrapper>
  );
};
