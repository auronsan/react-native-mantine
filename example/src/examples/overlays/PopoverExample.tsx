import { ExampleWrapper, ExampleSection, CodeBlock } from '../../components/ExampleWrapper';
import { PropsTable } from '../../components/PropsTable';
import { popoverProps } from '../../data/props/PopoverProps';
import { Button, Popover, Text, Paper, Stack, TextInput } from 'react-native-mantine';

export const PopoverExample = () => {
  return (
    <ExampleWrapper
      title="Popover"
      description="Rich content popover with flexible positioning"
    >
      <ExampleSection
        title="Basic Popover"
        description="Simple popover with content"
        variant="showcase"
      >
        <Popover>
          <Popover.Target>
            <Button>
              Open Popover
            </Button>
          </Popover.Target>

          <Popover.Dropdown>
            <Paper shadow="lg" p="md" radius="md">
              <Stack spacing={12}>
                <Text weight="600">Popover Title</Text>
                <Text size="sm">
                  This is a popover with rich content. It can contain any components you need.
                </Text>
                <Button size="sm" variant="light">
                  Action Button
                </Button>
              </Stack>
            </Paper>
          </Popover.Dropdown>
        </Popover>
      </ExampleSection>

      <ExampleSection
        title="Popover with Form"
        description="Popover containing form inputs"
        variant="showcase"
      >
        <Popover width={280}>
          <Popover.Target>
            <Button color="grape">
              Show Form Popover
            </Button>
          </Popover.Target>

          <Popover.Dropdown>
            <Paper shadow="lg" p="md" radius="md">
              <Stack spacing={12}>
                <Text weight="600">Quick Form</Text>
                <TextInput
                  label="Name"
                  placeholder="Enter your name"
                  size="sm"
                />
                <TextInput
                  label="Email"
                  placeholder="your@email.com"
                  size="sm"
                />
                <Button size="sm" fullWidth>
                  Submit
                </Button>
              </Stack>
            </Paper>
          </Popover.Dropdown>
        </Popover>
      </ExampleSection>

      <ExampleSection
        title="Information Popover"
        description="Popover for displaying additional information"
        variant="showcase"
      >
        <Popover>
          <Popover.Target>
            <Button color="teal" variant="light">
              More Info
            </Button>
          </Popover.Target>

          <Popover.Dropdown>
            <Paper shadow="lg" p="md" radius="md">
              <Stack spacing={8}>
                <Text weight="600" size="sm">Additional Information</Text>
                <Text size="xs">
                  Popovers are great for displaying contextual information,
                  forms, or interactive content without navigating away.
                </Text>
                <Text size="xs">
                  They automatically handle positioning and can be closed
                  by clicking outside.
                </Text>
              </Stack>
            </Paper>
          </Popover.Dropdown>
        </Popover>
      </ExampleSection>

      <ExampleSection
        title="Usage Example"
        description="Basic implementation code"
      >
        <CodeBlock
          code={`import { Popover, Button, Text, Paper } from 'react-native-mantine';

const MyComponent = () => {
  return (
    <Popover>
      <Popover.Target>
        <Button>Open Popover</Button>
      </Popover.Target>

      <Popover.Dropdown>
        <Paper shadow="lg" p="md">
          <Text>Popover content here</Text>
        </Paper>
      </Popover.Dropdown>
    </Popover>
  );
};`}
        />
      </ExampleSection>

      <ExampleSection
        title="Component Props"
        description="Complete reference of all available Popover props"
      >
        <PropsTable props={popoverProps} />
      </ExampleSection>
    </ExampleWrapper>
  );
};
