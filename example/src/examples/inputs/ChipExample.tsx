import { ExampleWrapper, ExampleSection, CodeBlock } from '../../components/ExampleWrapper';
import { PropsTable } from '../../components/PropsTable';
import { chipProps, chipGroupProps } from '../../data/props/ChipProps';
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

      <ExampleSection
        title="Component Props"
        description="Complete reference of all available Chip props"
      >
        <PropsTable props={chipProps} />
      </ExampleSection>

      <ExampleSection
        title="Chip.Group Props"
        description="Props for managing multiple chips with selection state"
      >
        <PropsTable props={chipGroupProps} />
      </ExampleSection>

      <ExampleSection
        title="Usage Example"
        description="Basic implementation code"
      >
        <CodeBlock
          code={`import { Chip } from 'react-native-mantine';

<Chip
  checked={checked}
  onChange={setChecked}
  color="blue"
  size="sm"
>
  React Native
</Chip>

// With Group
<Chip.Group value={value} onChange={setValue}>
  <Chip value="react">React</Chip>
  <Chip value="vue">Vue</Chip>
  <Chip value="angular">Angular</Chip>
</Chip.Group>`}
        />
      </ExampleSection>
    </ExampleWrapper>
  );
};
