import { useState } from 'react';
import { ExampleWrapper, ExampleSection, CodeBlock } from '../../components/ExampleWrapper';
import { PropsTable } from '../../components/PropsTable';
import { angleSliderProps } from '../../data/props/AngleSliderProps';
import { AngleSlider, Group, Paper, Stack, Text } from 'react-native-mantine';

export const AngleSliderExample = () => {
  const [angle, setAngle] = useState(180);

  return (
    <ExampleWrapper
      title="AngleSlider"
      description="Pick an angle value between 0 and 360 degrees"
    >
      <ExampleSection
        title="Basic Usage"
        description="Uncontrolled AngleSlider with a default value"
      >
        <Paper p="md" radius="md">
          <Group position="center">
            <AngleSlider defaultValue={45} size={100} />
          </Group>
        </Paper>
      </ExampleSection>

      <ExampleSection
        title="Controlled"
        description="Drag the thumb to update the value in state"
        variant="showcase"
      >
        <Paper p="md" radius="md">
          <Stack spacing={12}>
            <Group position="center">
              <AngleSlider value={angle} onChange={setAngle} size={100} />
            </Group>
            <Text size="sm" align="center">
              Current value: {Math.round(angle)}°
            </Text>
          </Stack>
        </Paper>
      </ExampleSection>

      <ExampleSection
        title="Format Label"
        description="Use formatLabel to customize the label content"
      >
        <Paper p="md" radius="md">
          <Group position="center">
            <AngleSlider
              defaultValue={90}
              size={100}
              formatLabel={(value) =>
                `${Math.round((value / 360) * 100)}%`
              }
            />
          </Group>
        </Paper>
      </ExampleSection>

      <ExampleSection
        title="Marks"
        description="Snap the value to the closest mark with restrictToMarks"
      >
        <Paper p="md" radius="md">
          <Group position="center">
            <AngleSlider
              defaultValue={90}
              size={100}
              marks={[
                { value: 0 },
                { value: 45 },
                { value: 90 },
                { value: 135 },
                { value: 180 },
                { value: 225 },
                { value: 270 },
                { value: 315 },
              ]}
              restrictToMarks
            />
          </Group>
        </Paper>
      </ExampleSection>

      <ExampleSection
        title="Without Label"
        description="Hide the value label inside the slider"
      >
        <Paper p="md" radius="md">
          <Group position="center">
            <AngleSlider defaultValue={135} size={100} withLabel={false} />
          </Group>
        </Paper>
      </ExampleSection>

      <ExampleSection
        title="Disabled"
        description="Disabled slider does not respond to touch"
      >
        <Paper p="md" radius="md">
          <Group position="center">
            <AngleSlider defaultValue={60} size={100} disabled />
          </Group>
        </Paper>
      </ExampleSection>

      <ExampleSection
        title="Component Props"
        description="Complete reference of all available AngleSlider props"
      >
        <PropsTable props={angleSliderProps} />
      </ExampleSection>

      <ExampleSection
        title="Usage Example"
        description="Basic implementation code"
      >
        <CodeBlock
          code={`import { AngleSlider } from 'react-native-mantine';

<AngleSlider
  value={angle}
  onChange={setAngle}
  onChangeEnd={(value) => console.log(value)}
  size={100}
/>

// Snap to marks
<AngleSlider
  defaultValue={90}
  marks={[
    { value: 0 },
    { value: 90 },
    { value: 180 },
    { value: 270 },
  ]}
  restrictToMarks
/>`}
        />
      </ExampleSection>
    </ExampleWrapper>
  );
};
