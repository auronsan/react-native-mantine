import { ExampleWrapper, ExampleSection, CodeBlock } from '../../components/ExampleWrapper';
import { PropsTable } from '../../components/PropsTable';
import { dataListProps } from '../../data/props/DataListProps';
import { Badge, DataList, Paper, Stack, Text } from 'react-native-mantine';

export const DataListExample = () => {
  return (
    <ExampleWrapper
      title="DataList"
      description="Display a list of label-value pairs"
    >
      <ExampleSection
        title="Basic Usage"
        description="Horizontal orientation renders the label column next to the value"
      >
        <Paper p="md" radius="md">
          <DataList>
            <DataList.Item>
              <DataList.ItemLabel>Name</DataList.ItemLabel>
              <DataList.ItemValue>John Doe</DataList.ItemValue>
            </DataList.Item>
            <DataList.Item>
              <DataList.ItemLabel>Email</DataList.ItemLabel>
              <DataList.ItemValue>john.doe@example.com</DataList.ItemValue>
            </DataList.Item>
            <DataList.Item>
              <DataList.ItemLabel>Role</DataList.ItemLabel>
              <DataList.ItemValue>Software Engineer</DataList.ItemValue>
            </DataList.Item>
          </DataList>
        </Paper>
      </ExampleSection>

      <ExampleSection
        title="Vertical Orientation"
        description="orientation='vertical' stacks the label on top of the value"
      >
        <Paper p="md" radius="md">
          <DataList orientation="vertical" gap="md">
            <DataList.Item>
              <DataList.ItemLabel>Shipping address</DataList.ItemLabel>
              <DataList.ItemValue>
                132 Example Street, Springfield, 62704
              </DataList.ItemValue>
            </DataList.Item>
            <DataList.Item>
              <DataList.ItemLabel>Billing address</DataList.ItemLabel>
              <DataList.ItemValue>Same as shipping address</DataList.ItemValue>
            </DataList.Item>
          </DataList>
        </Paper>
      </ExampleSection>

      <ExampleSection
        title="With Divider"
        description="withDivider separates items with a bottom border"
      >
        <Paper p="md" radius="md">
          <DataList withDivider>
            <DataList.Item>
              <DataList.ItemLabel>Version</DataList.ItemLabel>
              <DataList.ItemValue>0.1.15</DataList.ItemValue>
            </DataList.Item>
            <DataList.Item>
              <DataList.ItemLabel>License</DataList.ItemLabel>
              <DataList.ItemValue>MIT</DataList.ItemValue>
            </DataList.Item>
            <DataList.Item>
              <DataList.ItemLabel>Downloads</DataList.ItemLabel>
              <DataList.ItemValue>1,204 / week</DataList.ItemValue>
            </DataList.Item>
          </DataList>
        </Paper>
      </ExampleSection>

      <ExampleSection
        title="Custom Label Width"
        description="labelWidth controls the width of the label column in horizontal orientation"
        variant="showcase"
      >
        <Paper p="md" radius="md">
          <DataList labelWidth={70}>
            <DataList.Item>
              <DataList.ItemLabel>ID</DataList.ItemLabel>
              <DataList.ItemValue>#4821</DataList.ItemValue>
            </DataList.Item>
            <DataList.Item>
              <DataList.ItemLabel>Status</DataList.ItemLabel>
              <DataList.ItemValue>
                <Badge size="sm" color="green" variant="light">
                  Active
                </Badge>
              </DataList.ItemValue>
            </DataList.Item>
            <DataList.Item>
              <DataList.ItemLabel>Plan</DataList.ItemLabel>
              <DataList.ItemValue>Pro (annual)</DataList.ItemValue>
            </DataList.Item>
          </DataList>
        </Paper>
      </ExampleSection>

      <ExampleSection
        title="Sizes"
        description="size controls font size of labels and values"
      >
        <Paper p="md" radius="md">
          <Stack spacing={16}>
            <Stack spacing={4}>
              <Text size="xs" color="dimmed">
                size="xs"
              </Text>
              <DataList size="xs">
                <DataList.Item>
                  <DataList.ItemLabel>Created</DataList.ItemLabel>
                  <DataList.ItemValue>June 12, 2026</DataList.ItemValue>
                </DataList.Item>
              </DataList>
            </Stack>
            <Stack spacing={4}>
              <Text size="xs" color="dimmed">
                size="lg"
              </Text>
              <DataList size="lg">
                <DataList.Item>
                  <DataList.ItemLabel>Created</DataList.ItemLabel>
                  <DataList.ItemValue>June 12, 2026</DataList.ItemValue>
                </DataList.Item>
              </DataList>
            </Stack>
          </Stack>
        </Paper>
      </ExampleSection>

      <ExampleSection
        title="Component Props"
        description="Complete reference of all available DataList props"
      >
        <PropsTable props={dataListProps} />
      </ExampleSection>

      <ExampleSection
        title="Usage Example"
        description="Basic implementation code"
      >
        <CodeBlock
          code={`import { DataList } from 'react-native-mantine';

<DataList withDivider labelWidth={100} size="sm">
  <DataList.Item>
    <DataList.ItemLabel>Name</DataList.ItemLabel>
    <DataList.ItemValue>John Doe</DataList.ItemValue>
  </DataList.Item>
  <DataList.Item>
    <DataList.ItemLabel>Email</DataList.ItemLabel>
    <DataList.ItemValue>john.doe@example.com</DataList.ItemValue>
  </DataList.Item>
</DataList>

// Vertical orientation
<DataList orientation="vertical" gap="md">
  ...
</DataList>`}
        />
      </ExampleSection>
    </ExampleWrapper>
  );
};
