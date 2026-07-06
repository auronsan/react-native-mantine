import { useState } from 'react';
import { ExampleWrapper, ExampleSection, CodeBlock } from '../../components/ExampleWrapper';
import { PropsTable } from '../../components/PropsTable';
import { inputBaseProps } from '../../data/props/InputBaseProps';
import {
  Group,
  Icon,
  InputBase,
  Paper,
  Pill,
  Stack,
  Text,
} from 'react-native-mantine';

export const InputBaseExample = () => {
  const [pressCount, setPressCount] = useState(0);

  return (
    <ExampleWrapper
      title="InputBase"
      description="Standard input frame around arbitrary content, base for custom inputs"
    >
      <ExampleSection
        title="Custom Content"
        description="InputBase renders any children inside the input frame, here a row of pills"
        variant="showcase"
      >
        <Paper p="md" radius="md">
          <InputBase label="Technologies" description="Pills rendered inside the frame" multiline>
            <Group spacing={4}>
              <Pill size="sm">React</Pill>
              <Pill size="sm">React Native</Pill>
              <Pill size="sm">Expo</Pill>
            </Group>
          </InputBase>
        </Paper>
      </ExampleSection>

      <ExampleSection
        title="Variants"
        description="InputBase supports the same default, filled and unstyled variants as other inputs"
      >
        <Paper p="md" radius="md">
          <Stack spacing={12}>
            <InputBase label="Default variant" variant="default">
              <Text size="sm">Default frame</Text>
            </InputBase>
            <InputBase label="Filled variant" variant="filled">
              <Text size="sm">Filled frame</Text>
            </InputBase>
            <InputBase label="Unstyled variant" variant="unstyled">
              <Text size="sm">Unstyled frame</Text>
            </InputBase>
          </Stack>
        </Paper>
      </ExampleSection>

      <ExampleSection
        title="Icon and Right Section"
        description="icon is displayed on the left side, rightSection on the right side of the frame"
      >
        <Paper p="md" radius="md">
          <Stack spacing={12}>
            <InputBase label="With icon" icon={<Icon name="user" size={14} color="#868e96" />}>
              <Text size="sm">John Doe</Text>
            </InputBase>
            <InputBase
              label="With right section"
              rightSection={<Icon name="chevron-down" size={12} color="#868e96" />}
            >
              <Text size="sm">Pick a value</Text>
            </InputBase>
          </Stack>
        </Paper>
      </ExampleSection>

      <ExampleSection
        title="Error and Required"
        description="required displays an asterisk next to the label, error highlights the frame"
      >
        <Paper p="md" radius="md">
          <Stack spacing={12}>
            <InputBase label="Required field" required description="This field is required">
              <Text size="sm">Value</Text>
            </InputBase>
            <InputBase label="With error" error="Something went wrong">
              <Text size="sm">Invalid value</Text>
            </InputBase>
            <InputBase label="Disabled" disabled>
              <Text size="sm">You cannot interact with this</Text>
            </InputBase>
          </Stack>
        </Paper>
      </ExampleSection>

      <ExampleSection
        title="Pressable Frame"
        description="With onPress the whole frame becomes pressable, useful for picker-like inputs"
      >
        <Paper p="md" radius="md">
          <Stack spacing={12}>
            <InputBase
              label="Press me"
              onPress={() => setPressCount((current) => current + 1)}
              rightSection={<Icon name="hand-pointer-o" size={14} color="#868e96" />}
            >
              <Text size="sm">Pressed {pressCount} times</Text>
            </InputBase>
            <Text size="sm" color="dimmed">
              The frame acts as a button with accessibilityRole="button"
            </Text>
          </Stack>
        </Paper>
      </ExampleSection>

      <ExampleSection
        title="Multiline"
        description="multiline lets the frame grow with its content instead of a fixed height"
      >
        <Paper p="md" radius="md">
          <InputBase label="Multiline frame" multiline>
            <Group spacing={4}>
              <Pill size="sm">One</Pill>
              <Pill size="sm">Two</Pill>
              <Pill size="sm">Three</Pill>
              <Pill size="sm">Four</Pill>
              <Pill size="sm">Five</Pill>
              <Pill size="sm">Six</Pill>
              <Pill size="sm">Seven</Pill>
              <Pill size="sm">Eight</Pill>
            </Group>
          </InputBase>
        </Paper>
      </ExampleSection>

      <ExampleSection
        title="Component Props"
        description="Complete reference of all available InputBase props"
      >
        <PropsTable props={inputBaseProps} />
      </ExampleSection>

      <ExampleSection
        title="Usage Example"
        description="Basic implementation code"
      >
        <CodeBlock
          code={`import { InputBase, Pill, Group } from 'react-native-mantine';

// Custom content inside the input frame
<InputBase label="Technologies" multiline>
  <Group spacing={4}>
    <Pill size="sm">React</Pill>
    <Pill size="sm">React Native</Pill>
  </Group>
</InputBase>

// Pressable frame for picker-like inputs
<InputBase
  label="Pick a value"
  onPress={() => openPicker()}
  rightSection={<Icon name="chevron-down" size={12} />}
>
  <Text size="sm">{value ?? 'Nothing selected'}</Text>
</InputBase>`}
        />
      </ExampleSection>
    </ExampleWrapper>
  );
};
