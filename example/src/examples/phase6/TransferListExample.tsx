import { ExampleWrapper, ExampleSection, CodeBlock } from '../../components/ExampleWrapper';
import { Text, Paper, Stack } from 'react-native-mantine';

export const TransferListExample = () => {
  return (
    <ExampleWrapper
      title="TransferList"
      description="Dual-list selection transfer"
    >
      <ExampleSection
        title="Component Status"
        description="TransferList implementation status"
        variant="showcase"
      >
        <Paper p="md" radius="md" withBorder>
          <Stack spacing={12}>
            <Text weight="600">TransferList Component</Text>
            <Text size="sm">
              TransferList is a dual-list selection component that allows users to move items between two lists.
              This component is planned for a future release of React Native Mantine.
            </Text>
            <Text size="sm" color="dimmed">
              Features will include: item selection, multi-select support, search/filter, custom item rendering,
              and animated transfers between lists.
            </Text>
          </Stack>
        </Paper>
      </ExampleSection>

      <ExampleSection
        title="Planned Usage"
        description="How TransferList will be used"
      >
        <CodeBlock
          code={`import { useState } from 'react';
import { TransferList } from 'react-native-mantine';

const MyComponent = () => {
  const [data, setData] = useState([
    [
      { value: '1', label: 'Item 1' },
      { value: '2', label: 'Item 2' },
    ],
    [
      { value: '3', label: 'Item 3' },
    ],
  ]);

  return (
    <TransferList
      value={data}
      onChange={setData}
      titles={['Available', 'Selected']}
      searchable
    />
  );
};`}
        />
      </ExampleSection>
    </ExampleWrapper>
  );
};
