import { ExampleWrapper, ExampleSection, CodeBlock } from '../../components/ExampleWrapper';
import { PropsTable } from '../../components/PropsTable';
import { themeIconProps } from '../../data/props/ThemeIconProps';
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

      <ExampleSection
        title="Component Props"
        description="Complete reference of all available ThemeIcon props"
      >
        <PropsTable props={themeIconProps} />
      </ExampleSection>

      <ExampleSection
        title="Usage Example"
        description="Basic implementation code"
      >
        <CodeBlock
          code={`import { ThemeIcon, Icon } from 'react-native-mantine';

// Filled variant (default)
<ThemeIcon color="blue" size="lg">
  <Icon name="heart" size={20} color="white" />
</ThemeIcon>

// Light variant
<ThemeIcon color="red" variant="light" size="md">
  ❤️
</ThemeIcon>

// Gradient variant
<ThemeIcon
  variant="gradient"
  gradient={{ from: 'blue', to: 'cyan', deg: 45 }}
  size="xl"
>
  📧
</ThemeIcon>`}
        />
      </ExampleSection>
    </ExampleWrapper>
  );
};
