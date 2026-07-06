import { useState } from 'react';
import { ExampleWrapper, ExampleSection, CodeBlock } from '../../components/ExampleWrapper';
import { PropsTable } from '../../components/PropsTable';
import { semiCircleProgressProps } from '../../data/props/SemiCircleProgressProps';
import {
  Button,
  Group,
  Paper,
  SemiCircleProgress,
  Stack,
  Text,
} from 'react-native-mantine';

export const SemiCircleProgressExample = () => {
  const [value, setValue] = useState(25);

  return (
    <ExampleWrapper
      title="SemiCircleProgress"
      description="Represent a value as a semicircular gauge"
    >
      <ExampleSection
        title="Basic Usage"
        description="SemiCircleProgress with a value between 0 and 100"
      >
        <Paper p="md" radius="md">
          <SemiCircleProgress value={40} label="40%" />
        </Paper>
      </ExampleSection>

      <ExampleSection
        title="Segment Colors"
        description="Customize filled and empty segment colors"
      >
        <Paper p="md" radius="md">
          <Stack spacing={16}>
            <SemiCircleProgress
              value={65}
              filledSegmentColor="green"
              label="Green filled segment"
            />
            <SemiCircleProgress
              value={65}
              filledSegmentColor="orange"
              emptySegmentColor="yellow"
              label="Orange on yellow"
            />
          </Stack>
        </Paper>
      </ExampleSection>

      <ExampleSection
        title="Size and Thickness"
        description="Control the gauge diameter and ring thickness"
      >
        <Paper p="md" radius="md">
          <Group spacing={20} position="center">
            <Stack spacing={8}>
              <SemiCircleProgress value={70} size={120} thickness={8} />
              <Text size="xs">size=120, thickness=8</Text>
            </Stack>
            <Stack spacing={8}>
              <SemiCircleProgress value={70} size={180} thickness={20} />
              <Text size="xs">size=180, thickness=20</Text>
            </Stack>
          </Group>
        </Paper>
      </ExampleSection>

      <ExampleSection
        title="Fill Direction"
        description="Fill the arc from the right side instead of the left"
      >
        <Paper p="md" radius="md">
          <SemiCircleProgress
            value={35}
            fillDirection="right-to-left"
            label="right-to-left"
          />
        </Paper>
      </ExampleSection>

      <ExampleSection
        title="Orientation"
        description="Flip the semicircle upside down"
      >
        <Paper p="md" radius="md">
          <SemiCircleProgress value={60} orientation="down" label="down" />
        </Paper>
      </ExampleSection>

      <ExampleSection
        title="Label Position"
        description="Display the label in the center of the gauge or below it"
      >
        <Paper p="md" radius="md">
          <Stack spacing={16}>
            <SemiCircleProgress
              value={55}
              label="Center label"
              labelPosition="center"
            />
            <SemiCircleProgress
              value={55}
              label="Bottom label"
              labelPosition="bottom"
            />
          </Stack>
        </Paper>
      </ExampleSection>

      <ExampleSection
        title="Animated"
        description="Set transitionDuration to animate value changes"
        variant="showcase"
      >
        <Paper p="md" radius="md">
          <Stack spacing={16}>
            <SemiCircleProgress
              value={value}
              transitionDuration={250}
              label={`${value}%`}
              labelPosition="center"
            />
            <Group spacing={8} position="center">
              <Button size="xs" variant="light" onPress={() => setValue(25)}>
                25
              </Button>
              <Button size="xs" variant="light" onPress={() => setValue(50)}>
                50
              </Button>
              <Button size="xs" variant="light" onPress={() => setValue(75)}>
                75
              </Button>
              <Button size="xs" variant="light" onPress={() => setValue(100)}>
                100
              </Button>
            </Group>
          </Stack>
        </Paper>
      </ExampleSection>

      <ExampleSection
        title="Component Props"
        description="Complete reference of all available SemiCircleProgress props"
      >
        <PropsTable props={semiCircleProgressProps} />
      </ExampleSection>

      <ExampleSection
        title="Usage Example"
        description="Basic implementation code"
      >
        <CodeBlock
          code={`import { SemiCircleProgress } from 'react-native-mantine';

<SemiCircleProgress
  value={40}
  size={200}
  thickness={12}
  label="40%"
  labelPosition="center"
/>

// Animated with custom colors
<SemiCircleProgress
  value={value}
  transitionDuration={250}
  filledSegmentColor="green"
  fillDirection="right-to-left"
/>`}
        />
      </ExampleSection>
    </ExampleWrapper>
  );
};
