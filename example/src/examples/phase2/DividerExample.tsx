import {
  ExampleWrapper,
  ExampleSection,
  CodeBlock,
} from '../../components/ExampleWrapper';
import { PropsTable } from '../../components/PropsTable';
import { dividerProps } from '../../data/props/DividerProps';
import { Divider, Stack, Text, Paper } from 'react-native-mantine';

export const DividerExample = () => {
  return (
    <ExampleWrapper
      title="Divider"
      description="Visual separator with label support and customizable styles"
    >
      <ExampleSection
        title="Basic Divider"
        description="Simple horizontal divider"
      >
        <Paper p="md" radius="md">
          <Stack spacing={16}>
            <Text>Content above divider</Text>
            <Divider />
            <Text>Content below divider</Text>
          </Stack>
        </Paper>
      </ExampleSection>

      <ExampleSection
        title="Divider Variants"
        description="Different line styles"
      >
        <Paper p="md" radius="md">
          <Stack spacing={20}>
            <Stack spacing={8}>
              <Text size="sm" style={{ color: '#868e96' }}>
                Solid
              </Text>
              <Divider variant="solid" />
            </Stack>
            <Stack spacing={8}>
              <Text size="sm" style={{ color: '#868e96' }}>
                Dashed
              </Text>
              <Divider variant="dashed" />
            </Stack>
            <Stack spacing={8}>
              <Text size="sm" style={{ color: '#868e96' }}>
                Dotted
              </Text>
              <Divider variant="dotted" />
            </Stack>
          </Stack>
        </Paper>
      </ExampleSection>

      <ExampleSection
        title="Divider with Labels"
        description="Dividers with text labels"
      >
        <Paper p="md" radius="md">
          <Stack spacing={20}>
            <Stack spacing={8}>
              <Divider label="Center Label" />
            </Stack>
            <Stack spacing={8}>
              <Divider label="Left Label" labelPosition="left" />
            </Stack>
            <Stack spacing={8}>
              <Divider label="Right Label" labelPosition="right" />
            </Stack>
          </Stack>
        </Paper>
      </ExampleSection>

      <ExampleSection
        title="Divider Sizes"
        description="Different thickness options"
      >
        <Paper p="md" radius="md">
          <Stack spacing={20}>
            <Stack spacing={8}>
              <Text size="sm" style={{ color: '#868e96' }}>
                xs
              </Text>
              <Divider size="xs" />
            </Stack>
            <Stack spacing={8}>
              <Text size="sm" style={{ color: '#868e96' }}>
                sm
              </Text>
              <Divider size="sm" />
            </Stack>
            <Stack spacing={8}>
              <Text size="sm" style={{ color: '#868e96' }}>
                md
              </Text>
              <Divider size="md" />
            </Stack>
            <Stack spacing={8}>
              <Text size="sm" style={{ color: '#868e96' }}>
                lg
              </Text>
              <Divider size="lg" />
            </Stack>
            <Stack spacing={8}>
              <Text size="sm" style={{ color: '#868e96' }}>
                xl
              </Text>
              <Divider size="xl" />
            </Stack>
          </Stack>
        </Paper>
      </ExampleSection>

      <ExampleSection
        title="Divider Colors"
        description="Theme colors for dividers"
        variant="showcase"
      >
        <Paper p="md" radius="md">
          <Stack spacing={16}>
            <Divider color="blue" label="Blue" />
            <Divider color="red" label="Red" />
            <Divider color="green" label="Green" />
            <Divider color="orange" label="Orange" />
          </Stack>
        </Paper>
      </ExampleSection>

      <ExampleSection
        title="Component Props"
        description="Complete reference of all available Divider props"
      >
        <PropsTable props={dividerProps} />
      </ExampleSection>

      <ExampleSection
        title="Usage Example"
        description="Basic implementation code"
      >
        <CodeBlock
          code={`import { Divider, Stack, Text } from 'react-native-mantine';

// Basic divider
<Stack spacing={16}>
  <Text>Section 1</Text>
  <Divider />
  <Text>Section 2</Text>
</Stack>

// Divider with label
<Divider label="Section Title" labelPosition="center" />

// Styled divider
<Divider
  variant="dashed"
  color="blue"
  size="md"
  label="Optional Label"
/>`}
        />
      </ExampleSection>
    </ExampleWrapper>
  );
};
