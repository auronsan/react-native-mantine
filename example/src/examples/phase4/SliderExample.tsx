import { useState } from 'react';
import { ExampleWrapper, ExampleSection } from '../../components/ExampleWrapper';
import { Slider, Paper, Stack, Text } from 'react-native-mantine';

export const SliderExample = () => {
  const [value, setValue] = useState(50);
  const [rangeValue, setRangeValue] = useState(30);

  return (
    <ExampleWrapper
      title="Slider"
      description="Range slider with marks and labels"
    >
      <ExampleSection
        title="Basic Usage"
        description="Simple slider with value display"
        variant="showcase"
      >
        <Paper p="md" radius="md" withBorder>
          <Stack spacing={16}>
            <Slider
              value={value}
              onChange={setValue}
              label={(val) => `${val}%`}
            />
            <Text size="sm" align="center">
              Current value: {value}
            </Text>
          </Stack>
        </Paper>
      </ExampleSection>

      <ExampleSection
        title="With Marks"
        description="Slider with custom marks and labels"
      >
        <Paper p="md" radius="md">
          <Slider
            defaultValue={50}
            marks={[
              { value: 0, label: '0%' },
              { value: 25, label: '25%' },
              { value: 50, label: '50%' },
              { value: 75, label: '75%' },
              { value: 100, label: '100%' },
            ]}
            label={(val) => `${val}%`}
          />
        </Paper>
      </ExampleSection>

      <ExampleSection
        title="Custom Range"
        description="Slider with custom min, max, and step"
      >
        <Paper p="md" radius="md">
          <Stack spacing={16}>
            <Slider
              value={rangeValue}
              onChange={setRangeValue}
              min={0}
              max={50}
              step={5}
              marks={[
                { value: 0, label: '0' },
                { value: 10, label: '10' },
                { value: 20, label: '20' },
                { value: 30, label: '30' },
                { value: 40, label: '40' },
                { value: 50, label: '50' },
              ]}
            />
            <Text size="sm" align="center">
              Value: {rangeValue} (step: 5)
            </Text>
          </Stack>
        </Paper>
      </ExampleSection>

      <ExampleSection
        title="Sizes"
        description="Different slider sizes"
      >
        <Paper p="md" radius="md">
          <Stack spacing={24}>
            <Stack spacing={8}>
              <Text size="sm">Extra Small</Text>
              <Slider defaultValue={40} size="xs" />
            </Stack>
            <Stack spacing={8}>
              <Text size="sm">Small</Text>
              <Slider defaultValue={50} size="sm" />
            </Stack>
            <Stack spacing={8}>
              <Text size="sm">Medium</Text>
              <Slider defaultValue={60} size="md" />
            </Stack>
            <Stack spacing={8}>
              <Text size="sm">Large</Text>
              <Slider defaultValue={70} size="lg" />
            </Stack>
          </Stack>
        </Paper>
      </ExampleSection>

      <ExampleSection
        title="Colors"
        description="Slider with different colors"
      >
        <Paper p="md" radius="md">
          <Stack spacing={20}>
            <Slider defaultValue={40} color="grape" label={(val) => `${val}%`} />
            <Slider defaultValue={60} color="teal" label={(val) => `${val}%`} />
            <Slider defaultValue={80} color="orange" label={(val) => `${val}%`} />
          </Stack>
        </Paper>
      </ExampleSection>

      <ExampleSection
        title="Disabled"
        description="Disabled slider state"
      >
        <Paper p="md" radius="md">
          <Slider defaultValue={50} disabled />
        </Paper>
      </ExampleSection>
    </ExampleWrapper>
  );
};
