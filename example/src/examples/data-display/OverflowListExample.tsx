import { ExampleWrapper, ExampleSection, CodeBlock } from '../../components/ExampleWrapper';
import { PropsTable } from '../../components/PropsTable';
import { overflowListProps } from '../../data/props/OverflowListProps';
import { Badge, OverflowList, Paper, Pill, Stack, Text } from 'react-native-mantine';

const technologies = [
  'React',
  'React Native',
  'TypeScript',
  'Mantine',
  'Node.js',
  'GraphQL',
  'PostgreSQL',
  'Docker',
];

export const OverflowListExample = () => {
  return (
    <ExampleWrapper
      title="OverflowList"
      description="Render items in a single row and collapse the ones that do not fit"
    >
      <ExampleSection
        title="Basic Usage"
        description="Items that do not fit into the row are collapsed into the default +N indicator"
        variant="showcase"
      >
        <Paper p="md" radius="md">
          <OverflowList
            data={technologies}
            getItemKey={(item) => item}
            renderItem={(item) => (
              <Badge size="sm" variant="light">
                {item}
              </Badge>
            )}
          />
        </Paper>
      </ExampleSection>

      <ExampleSection
        title="Custom Overflow Indicator"
        description="renderOverflow receives the hidden items, render anything you want"
      >
        <Paper p="md" radius="md">
          <OverflowList
            data={technologies}
            getItemKey={(item) => item}
            renderItem={(item) => (
              <Badge size="sm" color="teal" variant="light">
                {item}
              </Badge>
            )}
            renderOverflow={(hiddenItems) => (
              <Badge size="sm" color="gray" variant="outline">
                +{hiddenItems.length} more
              </Badge>
            )}
          />
        </Paper>
      </ExampleSection>

      <ExampleSection
        title="Max Visible Items"
        description="maxVisibleItems limits the number of visible items regardless of available space"
      >
        <Paper p="md" radius="md">
          <OverflowList
            data={technologies}
            maxVisibleItems={3}
            getItemKey={(item) => item}
            renderItem={(item) => (
              <Badge size="sm" variant="light">
                {item}
              </Badge>
            )}
          />
        </Paper>
      </ExampleSection>

      <ExampleSection
        title="Collapse From Start"
        description="collapseFrom='start' keeps the last items visible and collapses the first ones"
      >
        <Paper p="md" radius="md">
          <OverflowList
            data={technologies}
            collapseFrom="start"
            maxVisibleItems={4}
            getItemKey={(item) => item}
            renderItem={(item) => (
              <Badge size="sm" color="grape" variant="light">
                {item}
              </Badge>
            )}
          />
        </Paper>
      </ExampleSection>

      <ExampleSection
        title="With Pills and Custom Gap"
        description="Any element can be rendered as an item, gap controls the spacing between them"
      >
        <Paper p="md" radius="md">
          <Stack spacing={8}>
            <OverflowList
              data={technologies}
              gap="sm"
              getItemKey={(item) => item}
              renderItem={(item) => <Pill size="sm">{item}</Pill>}
              renderOverflow={(hiddenItems) => (
                <Text size="sm" color="dimmed">
                  and {hiddenItems.length} more
                </Text>
              )}
            />
          </Stack>
        </Paper>
      </ExampleSection>

      <ExampleSection
        title="Component Props"
        description="Complete reference of all available OverflowList props"
      >
        <PropsTable props={overflowListProps} />
      </ExampleSection>

      <ExampleSection
        title="Usage Example"
        description="Basic implementation code"
      >
        <CodeBlock
          code={`import { OverflowList, Badge } from 'react-native-mantine';

const technologies = ['React', 'React Native', 'TypeScript'];

<OverflowList
  data={technologies}
  getItemKey={(item) => item}
  renderItem={(item) => (
    <Badge size="sm" variant="light">{item}</Badge>
  )}
  renderOverflow={(hiddenItems) => (
    <Badge size="sm" variant="outline">
      +{hiddenItems.length} more
    </Badge>
  )}
  maxVisibleItems={5}
  collapseFrom="end"
  gap="xs"
/>`}
        />
      </ExampleSection>
    </ExampleWrapper>
  );
};
