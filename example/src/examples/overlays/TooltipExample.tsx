import { ExampleWrapper, ExampleSection, CodeBlock } from '../../components/ExampleWrapper';
import { PropsTable } from '../../components/PropsTable';
import { tooltipProps } from '../../data/props/TooltipProps';
import { Button, Tooltip, Text, Paper, Stack, Group } from 'react-native-mantine';

export const TooltipExample = () => {
  return (
    <ExampleWrapper
      title="Tooltip"
      description="Contextual tooltip popup on press or long press"
    >
      <ExampleSection
        title="Long Press Tooltip (Default)"
        description="Tooltip appears on long press"
        variant="showcase"
      >
        <Stack spacing={12}>
          <Text size="sm">Long press the button to see the tooltip:</Text>
          <Tooltip label="This is a helpful tooltip message!">
            <Button>
              Long Press Me
            </Button>
          </Tooltip>
        </Stack>
      </ExampleSection>

      <ExampleSection
        title="Press Tooltip"
        description="Tooltip appears on regular press"
        variant="showcase"
      >
        <Stack spacing={12}>
          <Text size="sm">Press the button to see the tooltip:</Text>
          <Tooltip label="Tooltip on press!" trigger="press">
            <Button color="grape">
              Press Me
            </Button>
          </Tooltip>
        </Stack>
      </ExampleSection>

      <ExampleSection
        title="Colored Tooltips"
        description="Tooltips with different colors"
        variant="showcase"
      >
        <Group spacing={12}>
          <Tooltip label="Blue tooltip" color="blue">
            <Button color="blue" size="sm">
              Blue
            </Button>
          </Tooltip>
          <Tooltip label="Green tooltip" color="green">
            <Button color="green" size="sm">
              Green
            </Button>
          </Tooltip>
          <Tooltip label="Red tooltip" color="red">
            <Button color="red" size="sm">
              Red
            </Button>
          </Tooltip>
        </Group>
      </ExampleSection>

      <ExampleSection
        title="Multiline Tooltip"
        description="Tooltip with multiple lines of text"
        variant="showcase"
      >
        <Tooltip
          label="This is a longer tooltip message that spans multiple lines. It provides more detailed information to the user."
          multiline
          width={200}
        >
          <Button color="teal">
            Long Press for Details
          </Button>
        </Tooltip>
      </ExampleSection>

      <ExampleSection
        title="Tooltip on Text"
        description="Tooltip can wrap any component"
        variant="showcase"
      >
        <Paper p="md" radius="md" withBorder>
          <Stack spacing={12}>
            <Text>
              Long press on the{' '}
              <Tooltip label="This is an inline tooltip">
                <Text style={{ textDecorationLine: 'underline' }}>
                  underlined text
                </Text>
              </Tooltip>
              {' '}to see more information.
            </Text>
          </Stack>
        </Paper>
      </ExampleSection>

      <ExampleSection
        title="Usage Example"
        description="Basic implementation code"
      >
        <CodeBlock
          code={`import { Tooltip, Button } from 'react-native-mantine';

const MyComponent = () => {
  return (
    <Tooltip label="Helpful message">
      <Button>Long Press Me</Button>
    </Tooltip>

    // Or with press trigger
    <Tooltip label="Helpful message" trigger="press">
      <Button>Press Me</Button>
    </Tooltip>
  );
};`}
        />
      </ExampleSection>

      <ExampleSection
        title="Component Props"
        description="Complete reference of all available Tooltip props"
      >
        <PropsTable props={tooltipProps} />
      </ExampleSection>
    </ExampleWrapper>
  );
};
