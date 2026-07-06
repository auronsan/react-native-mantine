import { ExampleWrapper, ExampleSection, CodeBlock } from '../../components/ExampleWrapper';
import { PropsTable } from '../../components/PropsTable';
import { numberFormatterProps } from '../../data/props/NumberFormatterProps';
import { Group, NumberFormatter, Paper, Stack, Text } from 'react-native-mantine';

export const NumberFormatterExample = () => {
  return (
    <ExampleWrapper
      title="NumberFormatter"
      description="Format numbers with separators and affixes"
    >
      <ExampleSection
        title="Basic Usage"
        description="Format a number with a thousands separator"
      >
        <Paper p="md" radius="md">
          <Stack spacing={8}>
            <Group spacing={8}>
              <Text size="sm" color="dimmed">Without separator:</Text>
              <NumberFormatter value={1000000} />
            </Group>
            <Group spacing={8}>
              <Text size="sm" color="dimmed">With separator:</Text>
              <NumberFormatter value={1000000} thousandSeparator />
            </Group>
          </Stack>
        </Paper>
      </ExampleSection>

      <ExampleSection
        title="Prefix and Suffix"
        description="Add currency symbols or units around the formatted value"
      >
        <Paper p="md" radius="md">
          <Stack spacing={8}>
            <Group spacing={8}>
              <Text size="sm" color="dimmed">Prefix:</Text>
              <NumberFormatter prefix="$ " value={1234567.89} thousandSeparator />
            </Group>
            <Group spacing={8}>
              <Text size="sm" color="dimmed">Suffix:</Text>
              <NumberFormatter value={99.9} suffix=" %" />
            </Group>
            <Group spacing={8}>
              <Text size="sm" color="dimmed">Negative value:</Text>
              <NumberFormatter prefix="$ " value={-2500} thousandSeparator />
            </Group>
          </Stack>
        </Paper>
      </ExampleSection>

      <ExampleSection
        title="Custom Separators and Decimal Scale"
        description="Control thousands separator, decimal separator and number of decimals"
      >
        <Paper p="md" radius="md">
          <Stack spacing={8}>
            <Group spacing={8}>
              <Text size="sm" color="dimmed">Dot separator:</Text>
              <NumberFormatter
                value={1234567.891}
                thousandSeparator="."
                decimalSeparator=","
              />
            </Group>
            <Group spacing={8}>
              <Text size="sm" color="dimmed">Space separator:</Text>
              <NumberFormatter value={1234567} thousandSeparator=" " />
            </Group>
            <Group spacing={8}>
              <Text size="sm" color="dimmed">decimalScale={'{2}'}:</Text>
              <NumberFormatter value={5678.123} decimalScale={2} />
            </Group>
            <Group spacing={8}>
              <Text size="sm" color="dimmed">fixedDecimalScale:</Text>
              <NumberFormatter value={5678.1} decimalScale={2} fixedDecimalScale />
            </Group>
          </Stack>
        </Paper>
      </ExampleSection>

      <ExampleSection
        title="Component Props"
        description="Complete reference of all available NumberFormatter props"
      >
        <PropsTable props={numberFormatterProps} />
      </ExampleSection>

      <ExampleSection
        title="Usage Example"
        description="Basic implementation code"
      >
        <CodeBlock
          code={`import { NumberFormatter } from 'react-native-mantine';

<NumberFormatter
  prefix="$ "
  value={1234567.89}
  thousandSeparator
  decimalScale={2}
/>

// Custom separators
<NumberFormatter
  value={1234567.891}
  thousandSeparator="."
  decimalSeparator=","
  suffix=" EUR"
/>`}
        />
      </ExampleSection>
    </ExampleWrapper>
  );
};
