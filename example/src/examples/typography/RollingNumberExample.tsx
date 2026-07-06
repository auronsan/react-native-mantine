import { useState } from 'react';
import { ExampleWrapper, ExampleSection, CodeBlock } from '../../components/ExampleWrapper';
import { PropsTable } from '../../components/PropsTable';
import { rollingNumberProps } from '../../data/props/RollingNumberProps';
import {
  Button,
  Group,
  Paper,
  RollingNumber,
  Stack,
  Text,
} from 'react-native-mantine';

export const RollingNumberExample = () => {
  const [value, setValue] = useState(24815);

  return (
    <ExampleWrapper
      title="RollingNumber"
      description="Display numbers with a rolling digit animation"
    >
      <ExampleSection
        title="Basic Usage"
        description="Press the button to see digits roll to the new value"
        variant="showcase"
      >
        <Paper p="md" radius="md">
          <Stack spacing={16}>
            <RollingNumber
              value={value}
              thousandSeparator
              textStyle={{ fontSize: 28, fontWeight: '700' }}
            />
            <Group spacing={8}>
              <Button
                size="xs"
                onPress={() => setValue(Math.floor(Math.random() * 100000))}
              >
                Randomize
              </Button>
              <Button
                size="xs"
                variant="outline"
                onPress={() => setValue((current) => current + 1)}
              >
                +1
              </Button>
            </Group>
          </Stack>
        </Paper>
      </ExampleSection>

      <ExampleSection
        title="Prefix, Suffix and Separator"
        description="Format the value like NumberFormatter"
      >
        <Paper p="md" radius="md">
          <Stack spacing={8}>
            <Group spacing={8}>
              <Text size="sm" color="dimmed">Prefix:</Text>
              <RollingNumber value={1234567} prefix="$ " thousandSeparator />
            </Group>
            <Group spacing={8}>
              <Text size="sm" color="dimmed">Suffix:</Text>
              <RollingNumber value={120} suffix=" km/h" />
            </Group>
            <Group spacing={8}>
              <Text size="sm" color="dimmed">Space separator:</Text>
              <RollingNumber value={9876543} thousandSeparator=" " />
            </Group>
          </Stack>
        </Paper>
      </ExampleSection>

      <ExampleSection
        title="Decimal Scale"
        description="Limit decimals and pad them with fixedDecimalScale"
      >
        <Paper p="md" radius="md">
          <Stack spacing={8}>
            <Group spacing={8}>
              <Text size="sm" color="dimmed">decimalScale={'{2}'}:</Text>
              <RollingNumber value={3.14159} decimalScale={2} />
            </Group>
            <Group spacing={8}>
              <Text size="sm" color="dimmed">fixedDecimalScale:</Text>
              <RollingNumber value={5.1} decimalScale={3} fixedDecimalScale />
            </Group>
          </Stack>
        </Paper>
      </ExampleSection>

      <ExampleSection
        title="Custom Text Style"
        description="Apply a larger font size with textStyle"
      >
        <Paper p="md" radius="md">
          <RollingNumber
            value={2026}
            textStyle={{ fontSize: 42, fontWeight: '700', color: '#228be6' }}
          />
        </Paper>
      </ExampleSection>

      <ExampleSection
        title="Component Props"
        description="Complete reference of all available RollingNumber props"
      >
        <PropsTable props={rollingNumberProps} />
      </ExampleSection>

      <ExampleSection
        title="Usage Example"
        description="Basic implementation code"
      >
        <CodeBlock
          code={`import { RollingNumber } from 'react-native-mantine';

<RollingNumber
  value={value}
  prefix="$ "
  thousandSeparator
  decimalScale={2}
  textStyle={{ fontSize: 28, fontWeight: '700' }}
/>

// Change the value to trigger the rolling animation
setValue(Math.floor(Math.random() * 100000));`}
        />
      </ExampleSection>
    </ExampleWrapper>
  );
};
