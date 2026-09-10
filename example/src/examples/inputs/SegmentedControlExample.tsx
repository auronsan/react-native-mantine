import { useState } from 'react';
import { ExampleWrapper, ExampleSection, CodeBlock } from '../../components/ExampleWrapper';
import { PropsTable } from '../../components/PropsTable';
import { segmentedControlProps } from '../../data/props/SegmentedControlProps';
import { SegmentedControl, Paper, Stack, Text } from 'react-native-mantine';

export const SegmentedControlExample = () => {
  const [framework, setFramework] = useState('React');
  const [alignment, setAlignment] = useState('left');
  const [size, setSize] = useState('md');

  return (
    <ExampleWrapper
      title="SegmentedControl"
      description="Segmented button group selector"
    >
      <ExampleSection
        title="Basic Usage"
        description="Simple segmented control"
        variant="showcase"
      >
        <Paper p="md" radius="md" withBorder>
          <Stack spacing={16}>
            <SegmentedControl
              value={framework}
              onChange={setFramework}
              data={['React', 'Angular', 'Vue', 'Svelte']}
            />
            <Text size="sm" align="center">
              Selected: {framework}
            </Text>
          </Stack>
        </Paper>
      </ExampleSection>

      <ExampleSection
        title="Usage"
        description="Minimal copy-pasteable example"
      >
        <CodeBlock
          code={`import { useState } from 'react';
import { SegmentedControl } from 'react-native-mantine';

const [value, setValue] = useState('react');

<SegmentedControl
  value={value}
  onChange={setValue}
  data={[
    { value: 'react', label: 'React' },
    { value: 'vue', label: 'Vue' },
    { value: 'svelte', label: 'Svelte' },
  ]}
  fullWidth
/>`}
        />
      </ExampleSection>

      <ExampleSection
        title="Full Width"
        description="SegmentedControl takes full width"
      >
        <Paper p="md" radius="md">
          <SegmentedControl
            value={alignment}
            onChange={setAlignment}
            data={['left', 'center', 'right', 'justify']}
            fullWidth
          />
        </Paper>
      </ExampleSection>

      <ExampleSection
        title="Sizes"
        description="Different size variants"
      >
        <Paper p="md" radius="md">
          <Stack spacing={20}>
            <Stack spacing={8}>
              <Text size="sm">Extra Small</Text>
              <SegmentedControl
                data={['XS', 'Option', 'Three']}
                size="xs"
                fullWidth
              />
            </Stack>
            <Stack spacing={8}>
              <Text size="sm">Small</Text>
              <SegmentedControl
                data={['SM', 'Option', 'Three']}
                size="sm"
                fullWidth
              />
            </Stack>
            <Stack spacing={8}>
              <Text size="sm">Medium</Text>
              <SegmentedControl
                value={size}
                onChange={setSize}
                data={['xs', 'sm', 'md', 'lg', 'xl']}
                size="md"
                fullWidth
              />
            </Stack>
            <Stack spacing={8}>
              <Text size="sm">Large</Text>
              <SegmentedControl
                data={['LG', 'Option', 'Three']}
                size="lg"
                fullWidth
              />
            </Stack>
          </Stack>
        </Paper>
      </ExampleSection>

      <ExampleSection
        title="Colors"
        description="Different color variants"
      >
        <Paper p="md" radius="md">
          <Stack spacing={16}>
            <SegmentedControl
              data={['Blue', 'Option 2', 'Option 3']}
              color="blue"
              fullWidth
            />
            <SegmentedControl
              data={['Grape', 'Option 2', 'Option 3']}
              color="grape"
              fullWidth
            />
            <SegmentedControl
              data={['Teal', 'Option 2', 'Option 3']}
              color="teal"
              fullWidth
            />
          </Stack>
        </Paper>
      </ExampleSection>

      <ExampleSection
        title="Custom Data"
        description="Using custom data objects"
      >
        <Paper p="md" radius="md">
          <SegmentedControl
            data={[
              { label: 'Preview', value: 'preview' },
              { label: 'Code', value: 'code' },
              { label: 'Export', value: 'export' },
            ]}
            fullWidth
          />
        </Paper>
      </ExampleSection>

      <ExampleSection
        title="Disabled"
        description="Disabled state and disabled options"
      >
        <Paper p="md" radius="md">
          <Stack spacing={16}>
            <SegmentedControl
              data={['Disabled', 'Control', 'Here']}
              disabled
              fullWidth
            />
            <SegmentedControl
              data={[
                { label: 'Enabled', value: 'enabled' },
                { label: 'Disabled', value: 'disabled', disabled: true },
                { label: 'Enabled', value: 'enabled2' },
              ]}
              fullWidth
            />
          </Stack>
        </Paper>
      </ExampleSection>

      <ExampleSection
        title="Vertical Orientation"
        description="Vertical segmented control"
      >
        <Paper p="md" radius="md">
          <SegmentedControl
            data={['Top', 'Center', 'Bottom']}
            orientation="vertical"
          />
        </Paper>
      </ExampleSection>

      <ExampleSection
        title="Component Props"
        description="Complete reference of all available SegmentedControl props"
      >
        <PropsTable props={segmentedControlProps} />
      </ExampleSection>
    </ExampleWrapper>
  );
};
