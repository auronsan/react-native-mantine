import { useState } from 'react';
import { ExampleWrapper, ExampleSection, CodeBlock } from '../../components/ExampleWrapper';
import { PropsTable } from '../../components/PropsTable';
import { tableOfContentsProps } from '../../data/props/TableOfContentsProps';
import {
  Badge,
  Group,
  Stack,
  TableOfContents,
  Text,
} from 'react-native-mantine';

const tocData = [
  { id: 'introduction', value: 'Introduction', depth: 1 },
  { id: 'installation', value: 'Installation', depth: 2 },
  { id: 'usage', value: 'Usage', depth: 2 },
  { id: 'basic-usage', value: 'Basic usage', depth: 3 },
  { id: 'advanced-usage', value: 'Advanced usage', depth: 3 },
  { id: 'api-reference', value: 'API reference', depth: 1 },
  { id: 'props', value: 'Props', depth: 2 },
];

export const TableOfContentsExample = () => {
  const [active, setActive] = useState('introduction');

  return (
    <ExampleWrapper
      title="TableOfContents"
      description="Display a list of links to page sections with depth offsets"
    >
      <ExampleSection
        title="Basic Usage"
        description="data items require id, value and depth. Nested headings are offset by depthOffset px per depth level"
        variant="showcase"
      >
        <TableOfContents data={tocData} defaultActive="introduction" />
      </ExampleSection>

      <ExampleSection
        title="Controlled Active Item"
        description="Control the active item with active and onActiveChange, then scroll to the matching section in your app"
        variant="showcase"
      >
        <Stack spacing={12}>
          <Group spacing={8}>
            <Text size="sm" color="dimmed">
              Active:
            </Text>
            <Badge size="sm" variant="light" color="teal">
              {active}
            </Badge>
          </Group>
          <TableOfContents
            data={tocData}
            active={active}
            onActiveChange={setActive}
          />
        </Stack>
      </ExampleSection>

      <ExampleSection
        title="Filled Variant with Color"
        description="variant='filled' highlights the active control with a solid background, color picks the theme color"
        variant="showcase"
      >
        <TableOfContents
          data={tocData}
          defaultActive="usage"
          variant="filled"
          color="grape"
          size="sm"
          radius="md"
          depthOffset={28}
        />
      </ExampleSection>

      <ExampleSection
        title="Component Props"
        description="Complete reference of all available TableOfContents props"
      >
        <PropsTable props={tableOfContentsProps} />
      </ExampleSection>

      <ExampleSection
        title="Usage Example"
        description="Basic implementation code"
      >
        <CodeBlock
          code={`import { TableOfContents } from 'react-native-mantine';

const data = [
  { id: 'introduction', value: 'Introduction', depth: 1 },
  { id: 'installation', value: 'Installation', depth: 2 },
  { id: 'usage', value: 'Usage', depth: 3 },
];

// Uncontrolled
<TableOfContents data={data} defaultActive="introduction" />

// Controlled, scroll to the pressed section
<TableOfContents
  data={data}
  active={active}
  onActiveChange={(id) => scrollToSection(id)}
  variant="filled"
  color="grape"
/>`}
        />
      </ExampleSection>
    </ExampleWrapper>
  );
};
