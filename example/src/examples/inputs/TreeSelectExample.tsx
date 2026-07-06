import { useState } from 'react';
import { ExampleWrapper, ExampleSection, CodeBlock } from '../../components/ExampleWrapper';
import { PropsTable } from '../../components/PropsTable';
import { treeSelectProps } from '../../data/props/TreeSelectProps';
import { Paper, Stack, Text, TreeSelect } from 'react-native-mantine';
import type { TreeNodeData } from 'react-native-mantine';

const data: TreeNodeData[] = [
  {
    value: 'frontend',
    label: 'Frontend',
    children: [
      { value: 'react', label: 'React' },
      { value: 'react-native', label: 'React Native' },
      { value: 'vue', label: 'Vue' },
    ],
  },
  {
    value: 'backend',
    label: 'Backend',
    children: [
      { value: 'node', label: 'Node.js' },
      { value: 'go', label: 'Go' },
      {
        value: 'databases',
        label: 'Databases',
        children: [
          { value: 'postgres', label: 'PostgreSQL' },
          { value: 'sqlite', label: 'SQLite' },
        ],
      },
    ],
  },
  { value: 'devops', label: 'DevOps' },
];

export const TreeSelectExample = () => {
  const [single, setSingle] = useState<string | null>(null);
  const [multiple, setMultiple] = useState<string[]>(['react', 'vue', 'node']);
  const [checked, setChecked] = useState<string[]>([]);

  return (
    <ExampleWrapper
      title="TreeSelect"
      description="Pick one or more values from a hierarchical data set"
    >
      <ExampleSection
        title="Single Mode"
        description="Press the input to open the options in a bottom sheet, pressing a node selects it and closes the sheet"
        variant="showcase"
      >
        <Paper p="md" radius="md">
          <Stack spacing={12}>
            <TreeSelect
              label="Technology"
              placeholder="Pick one technology"
              data={data}
              value={single}
              onChange={(value) =>
                setSingle(typeof value === 'string' ? value : null)
              }
            />
            <Text size="sm" color="dimmed">
              Value: {single ?? 'null'}
            </Text>
          </Stack>
        </Paper>
      </ExampleSection>

      <ExampleSection
        title="Searchable"
        description="With searchable, a search input filters the tree, matching parents keep their children"
      >
        <Paper p="md" radius="md">
          <TreeSelect
            label="Searchable"
            placeholder="Search technologies"
            data={data}
            searchable
            searchPlaceholder="Type to filter..."
            nothingFoundMessage="No technology found"
            defaultExpandAll
          />
        </Paper>
      </ExampleSection>

      <ExampleSection
        title="Multiple Mode"
        description="mode='multiple' allows picking any nodes, maxDisplayedValues collapses the rest into +N"
      >
        <Paper p="md" radius="md">
          <Stack spacing={12}>
            <TreeSelect
              label="Stack"
              placeholder="Pick technologies"
              data={data}
              mode="multiple"
              value={multiple}
              onChange={(value) =>
                setMultiple(Array.isArray(value) ? value : [])
              }
              maxDisplayedValues={2}
              defaultExpandAll
            />
            <Text size="sm" color="dimmed">
              Selected: {multiple.length} values
            </Text>
          </Stack>
        </Paper>
      </ExampleSection>

      <ExampleSection
        title="Checkbox Mode"
        description="mode='checkbox' displays checkboxes, checking a parent checks all of its leaf nodes"
      >
        <Paper p="md" radius="md">
          <Stack spacing={12}>
            <TreeSelect
              label="Permissions"
              placeholder="Pick permissions"
              data={data}
              mode="checkbox"
              value={checked}
              onChange={(value) =>
                setChecked(Array.isArray(value) ? value : [])
              }
              defaultExpandAll
            />
            <Text size="sm" color="dimmed">
              Checked leaves: {checked.join(', ') || 'none'}
            </Text>
          </Stack>
        </Paper>
      </ExampleSection>

      <ExampleSection
        title="Clearable"
        description="With clearable, a clear option is displayed at the top of the dropdown when a value is selected"
      >
        <Paper p="md" radius="md">
          <TreeSelect
            label="Clearable"
            placeholder="Pick one technology"
            data={data}
            defaultValue="react"
            clearable
            clearButtonLabel="Clear selection"
            defaultExpandedValues={['frontend']}
          />
        </Paper>
      </ExampleSection>

      <ExampleSection
        title="With Description and Error"
        description="TreeSelect supports the same wrapper props as other inputs"
      >
        <Paper p="md" radius="md">
          <Stack spacing={12}>
            <TreeSelect
              label="Required field"
              description="Pick the main technology of your project"
              placeholder="Pick one technology"
              data={data}
              required
            />
            <TreeSelect
              label="With error"
              placeholder="Pick one technology"
              data={data}
              error="This field is required"
            />
            <TreeSelect
              label="Disabled"
              placeholder="You cannot open this"
              data={data}
              disabled
            />
          </Stack>
        </Paper>
      </ExampleSection>

      <ExampleSection
        title="Component Props"
        description="Complete reference of all available TreeSelect props"
      >
        <PropsTable props={treeSelectProps} />
      </ExampleSection>

      <ExampleSection
        title="Usage Example"
        description="Basic implementation code"
      >
        <CodeBlock
          code={`import { TreeSelect } from 'react-native-mantine';
import type { TreeNodeData } from 'react-native-mantine';

const data: TreeNodeData[] = [
  {
    value: 'frontend',
    label: 'Frontend',
    children: [
      { value: 'react', label: 'React' },
      { value: 'vue', label: 'Vue' },
    ],
  },
];

// Single mode
<TreeSelect
  label="Technology"
  placeholder="Pick one technology"
  data={data}
  value={value}
  onChange={setValue}
  searchable
  clearable
/>

// Checkbox mode, parent checks all leaves
<TreeSelect
  data={data}
  mode="checkbox"
  defaultExpandAll
  maxDisplayedValues={2}
/>`}
        />
      </ExampleSection>
    </ExampleWrapper>
  );
};
