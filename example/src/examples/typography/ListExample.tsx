import { ExampleWrapper, ExampleSection, CodeBlock } from '../../components/ExampleWrapper';
import { PropsTable } from '../../components/PropsTable';
import { listProps, listItemProps } from '../../data/props/ListProps';
import { List , Paper } from 'react-native-mantine';

export const ListExample = () => {
  return (
    <ExampleWrapper
      title="List"
      description="Ordered and unordered lists"
    >
      <ExampleSection
        title="Basic Usage"
        description="List component"
      >
        <Paper p="md" radius="md">
          <List>
            <List.Item>First item</List.Item>
            <List.Item>Second item</List.Item>
            <List.Item>Third item</List.Item>
          </List>
        </Paper>
      </ExampleSection>

      <ExampleSection
        title="Component Props"
        description="Complete reference of all available List props"
      >
        <PropsTable props={listProps} />
      </ExampleSection>

      <ExampleSection
        title="List.Item Props"
        description="Props for individual list items"
      >
        <PropsTable props={listItemProps} />
      </ExampleSection>

      <ExampleSection
        title="Usage Example"
        description="Basic implementation code"
      >
        <CodeBlock
          code={`import { List } from 'react-native-mantine';

// Unordered list
<List>
  <List.Item>First item</List.Item>
  <List.Item>Second item</List.Item>
  <List.Item>Third item</List.Item>
</List>

// Ordered list
<List type="ordered" listStyleType="decimal">
  <List.Item>First item</List.Item>
  <List.Item>Second item</List.Item>
  <List.Item>Third item</List.Item>
</List>`}
        />
      </ExampleSection>
    </ExampleWrapper>
  );
};
