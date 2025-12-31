import { useState } from 'react';
import { ExampleWrapper, ExampleSection } from '../../components/ExampleWrapper';
import { TransferList, Text, Paper, Stack } from 'react-native-mantine';
import type { TransferListData } from 'react-native-mantine';

const initialData: [TransferListData, TransferListData] = [
  {
    items: [
      { value: 'react', label: 'React' },
      { value: 'vue', label: 'Vue' },
      { value: 'angular', label: 'Angular' },
      { value: 'svelte', label: 'Svelte' },
      { value: 'solid', label: 'Solid' },
      { value: 'ember', label: 'Ember' },
      { value: 'preact', label: 'Preact' },
      { value: 'lit', label: 'Lit' },
    ],
    selectedValues: [],
  },
  {
    items: [
      { value: 'next', label: 'Next.js' },
      { value: 'gatsby', label: 'Gatsby' },
    ],
    selectedValues: [],
  },
];

export const TransferListExample = () => {
  const [data, setData] = useState<[TransferListData, TransferListData]>(initialData);
  const [searchableData, setSearchableData] = useState<[TransferListData, TransferListData]>([
    {
      items: [
        { value: 'typescript', label: 'TypeScript' },
        { value: 'javascript', label: 'JavaScript' },
        { value: 'python', label: 'Python' },
        { value: 'java', label: 'Java' },
        { value: 'go', label: 'Go' },
        { value: 'rust', label: 'Rust' },
      ],
      selectedValues: [],
    },
    {
      items: [
        { value: 'cpp', label: 'C++' },
      ],
      selectedValues: [],
    },
  ]);

  return (
    <ExampleWrapper
      title="TransferList"
      description="Dual-list selection transfer"
    >
      <ExampleSection
        title="Basic Usage"
        description="Transfer items between two lists"
        variant="showcase"
      >
        <Paper p="md" radius="md" withBorder>
          <TransferList
            value={data}
            onChange={setData}
            titles={['Available Frameworks', 'Selected Frameworks']}
            listHeight={250}
          />
          <Stack spacing={8} mt="md">
            <Text size="sm" weight="600">Selected items:</Text>
            <Text size="sm" color="dimmed">
              {data[1].items.length > 0
                ? data[1].items.map(item => item.label).join(', ')
                : 'None selected'}
            </Text>
          </Stack>
        </Paper>
      </ExampleSection>

      <ExampleSection
        title="Searchable"
        description="TransferList with search functionality"
      >
        <Paper p="md" radius="md">
          <TransferList
            value={searchableData}
            onChange={setSearchableData}
            titles={['Available Languages', 'Preferred Languages']}
            searchable
            searchPlaceholder="Search languages..."
            listHeight={200}
          />
        </Paper>
      </ExampleSection>

      <ExampleSection
        title="Customized"
        description="TransferList with custom styling"
      >
        <Paper p="md" radius="md">
          <TransferList
            value={data}
            onChange={setData}
            titles={['Source', 'Destination']}
            color="grape"
            radius="md"
            listHeight={220}
          />
        </Paper>
      </ExampleSection>
    </ExampleWrapper>
  );
};
