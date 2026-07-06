import { Text as RNText } from 'react-native';
import { ExampleWrapper, ExampleSection, CodeBlock } from '../../components/ExampleWrapper';
import { PropsTable } from '../../components/PropsTable';
import { emptyStateProps } from '../../data/props/EmptyStateProps';
import { Button, EmptyState, Icon, Paper, Stack } from 'react-native-mantine';

export const EmptyStateExample = () => {
  return (
    <ExampleWrapper
      title="EmptyState"
      description="Tell the user that there is no content to display"
    >
      <ExampleSection
        title="Basic Usage"
        description="Title and description rendered without an icon"
      >
        <Paper p="md" radius="md">
          <EmptyState
            title="No results found"
            description="Try adjusting your search or removing some filters to see more results."
          />
        </Paper>
      </ExampleSection>

      <ExampleSection
        title="With Icon"
        description="Pass any element to the icon prop, it is rendered inside the indicator"
      >
        <Paper p="md" radius="md">
          <EmptyState
            title="Inbox is empty"
            description="Messages you receive will show up here."
            icon={<Icon name="inbox" size={28} color="#228be6" />}
          />
        </Paper>
      </ExampleSection>

      <ExampleSection
        title="With Actions"
        description="Use EmptyState.Actions to display buttons below the description"
        variant="showcase"
      >
        <Paper p="md" radius="md">
          <EmptyState
            title="No projects yet"
            description="Create your first project to get started."
            icon={<RNText style={{ fontSize: 28 }}>📁</RNText>}
          >
            <EmptyState.Actions>
              <Button size="xs">Create project</Button>
              <Button size="xs" variant="outline">
                Import
              </Button>
            </EmptyState.Actions>
          </EmptyState>
        </Paper>
      </ExampleSection>

      <ExampleSection
        title="Indicator Background"
        description="withIndicatorBackground adds a colored circle behind the icon, color controls its color"
      >
        <Paper p="md" radius="md">
          <Stack spacing={16}>
            <EmptyState
              title="Nothing here"
              description="Light variant with teal indicator background."
              icon={<Icon name="search" size={24} color="#12b886" />}
              withIndicatorBackground
              color="teal"
            />
            <EmptyState
              title="Connection lost"
              description="Filled variant with red indicator background."
              icon={<Icon name="plug" size={24} color="#ffffff" />}
              withIndicatorBackground
              variant="filled"
              color="red"
            />
          </Stack>
        </Paper>
      </ExampleSection>

      <ExampleSection
        title="Alignment"
        description="align='left' places the indicator next to the content, align='right' mirrors it"
      >
        <Paper p="md" radius="md">
          <Stack spacing={16}>
            <EmptyState
              align="left"
              title="No notifications"
              description="Left aligned empty state."
              icon={<Icon name="bell" size={22} color="#228be6" />}
              withIndicatorBackground
            />
            <EmptyState
              align="right"
              title="No bookmarks"
              description="Right aligned empty state."
              icon={<Icon name="bookmark" size={22} color="#228be6" />}
              withIndicatorBackground
            />
          </Stack>
        </Paper>
      </ExampleSection>

      <ExampleSection
        title="Sizes"
        description="size controls icon, title and description sizes"
      >
        <Paper p="md" radius="md">
          <Stack spacing={16}>
            <EmptyState
              size="xs"
              title="Extra small"
              description="size='xs' empty state."
              icon={<Icon name="star-o" size={16} color="#228be6" />}
              withIndicatorBackground
            />
            <EmptyState
              size="xl"
              title="Extra large"
              description="size='xl' empty state."
              icon={<Icon name="star-o" size={32} color="#228be6" />}
              withIndicatorBackground
            />
          </Stack>
        </Paper>
      </ExampleSection>

      <ExampleSection
        title="Component Props"
        description="Complete reference of all available EmptyState props"
      >
        <PropsTable props={emptyStateProps} />
      </ExampleSection>

      <ExampleSection
        title="Usage Example"
        description="Basic implementation code"
      >
        <CodeBlock
          code={`import { EmptyState, Button, Icon } from 'react-native-mantine';

<EmptyState
  title="No projects yet"
  description="Create your first project to get started."
  icon={<Icon name="inbox" size={28} color="#228be6" />}
  withIndicatorBackground
  color="blue"
  size="md"
  align="center"
>
  <EmptyState.Actions>
    <Button size="xs">Create project</Button>
    <Button size="xs" variant="outline">Import</Button>
  </EmptyState.Actions>
</EmptyState>

// Compound components are also available:
// EmptyState.Indicator, EmptyState.Title,
// EmptyState.Description, EmptyState.Actions`}
        />
      </ExampleSection>
    </ExampleWrapper>
  );
};
