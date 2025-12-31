import { useState } from 'react';
import { ExampleWrapper, ExampleSection, CodeBlock } from '../../components/ExampleWrapper';
import { PropsTable } from '../../components/PropsTable';
import { radioProps, radioGroupProps } from '../../data/props/RadioProps';
import { Radio, Stack, Paper, Text, Divider } from 'react-native-mantine';

export const RadioExample = () => {
  const [value, setValue] = useState('react');
  const [size, setSize] = useState('md');
  const [color, setColor] = useState('blue');

  return (
    <ExampleWrapper
      title="Radio"
      description="Radio button for exclusive selections"
    >
      <ExampleSection
        title="Basic Radio Group"
        description="Radio buttons with exclusive selection using Radio.Group"
      >
        <Paper p="md" radius="md">
          <Stack spacing={16}>
            <Text weight="500">Select your favorite framework:</Text>
            <Radio.Group value={value} onChange={setValue}>
              <Radio label="React" value="react" />
              <Radio label="Vue" value="vue" />
              <Radio label="Angular" value="angular" />
              <Radio label="Svelte" value="svelte" />
            </Radio.Group>
            <Divider />
            <Text size="sm" style={{ color: '#868e96' }}>
              Selected: {value}
            </Text>
          </Stack>
        </Paper>
      </ExampleSection>

      <ExampleSection
        title="Radio Sizes"
        description="Radio buttons in different sizes"
      >
        <Paper p="md" radius="md">
          <Stack spacing={16}>
            <Text weight="500">Select a size:</Text>
            <Radio.Group value={size} onChange={setSize}>
              <Radio label="Extra Small" value="xs" size="xs" />
              <Radio label="Small" value="sm" size="sm" />
              <Radio label="Medium (default)" value="md" size="md" />
              <Radio label="Large" value="lg" size="lg" />
              <Radio label="Extra Large" value="xl" size="xl" />
            </Radio.Group>
          </Stack>
        </Paper>
      </ExampleSection>

      <ExampleSection
        title="Radio Colors"
        description="Radio buttons with different colors"
      >
        <Paper p="md" radius="md">
          <Stack spacing={16}>
            <Text weight="500">Select a color:</Text>
            <Radio.Group value={color} onChange={setColor}>
              <Radio label="Blue" value="blue" color="blue" />
              <Radio label="Red" value="red" color="red" />
              <Radio label="Green" value="green" color="green" />
              <Radio label="Yellow" value="yellow" color="yellow" />
              <Radio label="Violet" value="violet" color="violet" />
            </Radio.Group>
          </Stack>
        </Paper>
      </ExampleSection>

      <ExampleSection
        title="Disabled State"
        description="Radio buttons in disabled state"
      >
        <Paper p="md" radius="md">
          <Stack spacing={16}>
            <Radio label="Enabled option" value="enabled" checked={true} />
            <Radio label="Disabled option (unchecked)" value="disabled1" disabled />
            <Radio label="Disabled option (checked)" value="disabled2" checked disabled />
          </Stack>
        </Paper>
      </ExampleSection>

      <ExampleSection
        title="Group Size and Color"
        description="Set size and color for entire group"
      >
        <Paper p="md" radius="md">
          <Stack spacing={16}>
            <Text weight="500">Large green radios:</Text>
            <Radio.Group value={value} onChange={setValue} size="lg" color="green">
              <Radio label="Option 1" value="1" />
              <Radio label="Option 2" value="2" />
              <Radio label="Option 3" value="3" />
            </Radio.Group>
          </Stack>
        </Paper>
      </ExampleSection>

      <ExampleSection
        title="Custom Spacing"
        description="Radio group with custom spacing between items"
      >
        <Paper p="md" radius="md">
          <Stack spacing={16}>
            <Text weight="500">Tight spacing:</Text>
            <Radio.Group value={value} onChange={setValue} spacing={4}>
              <Radio label="Option A" value="a" />
              <Radio label="Option B" value="b" />
              <Radio label="Option C" value="c" />
            </Radio.Group>
            <Divider />
            <Text weight="500">Loose spacing:</Text>
            <Radio.Group value={value} onChange={setValue} spacing={24}>
              <Radio label="Option X" value="x" />
              <Radio label="Option Y" value="y" />
              <Radio label="Option Z" value="z" />
            </Radio.Group>
          </Stack>
        </Paper>
      </ExampleSection>

      <ExampleSection
        title="Standalone Radio"
        description="Radio without group using checked prop and onChange"
      >
        <Paper p="md" radius="md">
          <Stack spacing={16}>
            <Text size="sm" style={{ color: '#868e96' }}>
              Note: When not using Radio.Group, you must manually manage the checked state
            </Text>
            <Radio
              label="Standalone radio"
              value="standalone"
              checked={true}
              onChange={(val) => console.log('Changed to:', val)}
            />
          </Stack>
        </Paper>
      </ExampleSection>

      <ExampleSection
        title="Radio Props"
        description="Complete reference of all available Radio props"
      >
        <PropsTable props={radioProps} />
      </ExampleSection>

      <ExampleSection
        title="Radio.Group Props"
        description="Complete reference of all available Radio.Group props"
      >
        <PropsTable props={radioGroupProps} />
      </ExampleSection>

      <ExampleSection
        title="Usage Example"
        description="Basic implementation code"
      >
        <CodeBlock
          code={`import { Radio } from 'react-native-mantine';

// Radio with Radio.Group
<Radio.Group value={value} onChange={setValue}>
  <Radio label="React" value="react" />
  <Radio label="Vue" value="vue" />
  <Radio label="Angular" value="angular" />
</Radio.Group>

// Group with custom size and color
<Radio.Group
  value={value}
  onChange={setValue}
  size="lg"
  color="green"
  spacing={16}
>
  <Radio label="Option 1" value="1" />
  <Radio label="Option 2" value="2" />
</Radio.Group>

// Standalone radio
<Radio
  label="Accept terms"
  value="terms"
  checked={accepted}
  onChange={handleChange}
/>`}
        />
      </ExampleSection>
    </ExampleWrapper>
  );
};
