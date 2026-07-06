import { ExampleWrapper, ExampleSection, CodeBlock } from '../../components/ExampleWrapper';
import { PropsTable } from '../../components/PropsTable';
import { hoverCardProps } from '../../data/props/HoverCardProps';
import {
  Badge,
  Button,
  Group,
  HoverCard,
  Paper,
  Stack,
  Text,
} from 'react-native-mantine';

export const HoverCardExample = () => {
  return (
    <ExampleWrapper
      title="HoverCard"
      description="Display a dropdown with additional information when the target is activated"
    >
      <ExampleSection
        title="Basic Usage"
        description="HoverCard.Target wraps a single element, HoverCard.Dropdown holds the revealed content"
        variant="showcase"
      >
        <Stack spacing={12}>
          <HoverCard width={280} shadow="md">
            <HoverCard.Target>
              <Button>Press to reveal</Button>
            </HoverCard.Target>
            <HoverCard.Dropdown>
              <Paper shadow="lg" p="md" radius="md">
                <Stack spacing={8}>
                  <Text weight="600">HoverCard</Text>
                  <Text size="sm">
                    This dropdown can contain any content: text, images,
                    buttons and other components.
                  </Text>
                </Stack>
              </Paper>
            </HoverCard.Dropdown>
          </HoverCard>
          <Text size="sm" color="dimmed">
            Hover is not available on touch devices, so the dropdown opens when
            the target is pressed and closes on press outside.
          </Text>
        </Stack>
      </ExampleSection>

      <ExampleSection
        title="Open and Close Delays"
        description="openDelay and closeDelay postpone the state change in milliseconds, matching the Mantine web API"
        variant="showcase"
      >
        <Stack spacing={12}>
          <Group spacing={8}>
            <Badge size="sm" variant="light">
              openDelay: 500
            </Badge>
            <Badge size="sm" variant="light" color="orange">
              closeDelay: 300
            </Badge>
          </Group>
          <HoverCard width={260} shadow="md" openDelay={500} closeDelay={300}>
            <HoverCard.Target>
              <Button variant="light" color="grape">
                Press and wait 500ms
              </Button>
            </HoverCard.Target>
            <HoverCard.Dropdown>
              <Paper shadow="lg" p="md" radius="md">
                <Text size="sm">
                  This dropdown opened 500ms after the press and will close
                  300ms after pressing outside.
                </Text>
              </Paper>
            </HoverCard.Dropdown>
          </HoverCard>
        </Stack>
      </ExampleSection>

      <ExampleSection
        title="Position and Arrow"
        description="All Popover props are supported: position, width, shadow, withArrow and more"
        variant="showcase"
      >
        <HoverCard width={240} shadow="md" position="top" withArrow>
          <HoverCard.Target>
            <Button variant="outline" color="teal">
              Dropdown on top
            </Button>
          </HoverCard.Target>
          <HoverCard.Dropdown>
            <Paper shadow="lg" p="md" radius="md">
              <Text size="sm">
                Positioned above the target with a pointing arrow.
              </Text>
            </Paper>
          </HoverCard.Dropdown>
        </HoverCard>
      </ExampleSection>

      <ExampleSection
        title="Component Props"
        description="Complete reference of all available HoverCard props"
      >
        <PropsTable props={hoverCardProps} />
      </ExampleSection>

      <ExampleSection
        title="Usage Example"
        description="Basic implementation code"
      >
        <CodeBlock
          code={`import { HoverCard } from 'react-native-mantine';

// Opens on press (touch devices have no hover)
<HoverCard width={280} shadow="md">
  <HoverCard.Target>
    <Button>Press to reveal</Button>
  </HoverCard.Target>
  <HoverCard.Dropdown>
    <Text size="sm">Additional information</Text>
  </HoverCard.Dropdown>
</HoverCard>

// Delays and Popover props are supported
<HoverCard
  openDelay={500}
  closeDelay={300}
  position="top"
  withArrow
>
  {/* ... */}
</HoverCard>`}
        />
      </ExampleSection>
    </ExampleWrapper>
  );
};
