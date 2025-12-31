import { useState } from 'react';
import { ExampleWrapper, ExampleSection } from '../../components/ExampleWrapper';
import { RingProgress, Paper, Button, Stack, Text, Group } from 'react-native-mantine';

export const RingProgressExample = () => {
  const [progress, setProgress] = useState([
    { value: 40, color: 'blue' as const },
    { value: 30, color: 'orange' as const },
    { value: 15, color: 'green' as const },
  ]);

  const increaseProgress = () => {
    setProgress(prev => prev.map(section => ({
      ...section,
      value: Math.min(100, section.value + 10),
    })));
  };

  const resetProgress = () => {
    setProgress([
      { value: 40, color: 'blue' },
      { value: 30, color: 'orange' },
      { value: 15, color: 'green' },
    ]);
  };

  return (
    <ExampleWrapper
      title="RingProgress"
      description="Circular progress indicator with smooth animations"
    >
      <ExampleSection
        title="Basic Usage"
        description="RingProgress with multiple sections"
        variant="showcase"
      >
        <Paper p="md" radius="md" withBorder>
          <Stack spacing={16}>
            <RingProgress
              sections={[
                { value: 40, color: 'blue' },
                { value: 30, color: 'orange' },
                { value: 15, color: 'green' },
              ]}
            />
            <Group spacing={8}>
              <Text size="sm" weight="600" style={{ color: '#228be6' }}>Blue: 40%</Text>
              <Text size="sm" weight="600" style={{ color: '#fd7e14' }}>Orange: 30%</Text>
              <Text size="sm" weight="600" style={{ color: '#40c057' }}>Green: 15%</Text>
            </Group>
          </Stack>
        </Paper>
      </ExampleSection>

      <ExampleSection
        title="With Label"
        description="RingProgress with center label"
      >
        <Paper p="md" radius="md">
          <Stack spacing={16}>
            <RingProgress
              sections={[{ value: 75, color: 'cyan' }]}
              label={<Text size="lg" weight="700">75%</Text>}
            />
          </Stack>
        </Paper>
      </ExampleSection>

      <ExampleSection
        title="Animated"
        description="Click buttons to see smooth animations"
      >
        <Paper p="md" radius="md">
          <Stack spacing={16}>
            <RingProgress sections={progress} />
            <Group spacing={12}>
              <Button size="sm" onPress={increaseProgress}>
                Increase
              </Button>
              <Button size="sm" variant="outline" onPress={resetProgress}>
                Reset
              </Button>
            </Group>
            <Group spacing={8}>
              <Text size="sm">Blue: {progress[0]?.value ?? 0}%</Text>
              <Text size="sm">Orange: {progress[1]?.value ?? 0}%</Text>
              <Text size="sm">Green: {progress[2]?.value ?? 0}%</Text>
            </Group>
          </Stack>
        </Paper>
      </ExampleSection>

      <ExampleSection
        title="Custom Size & Thickness"
        description="RingProgress with custom dimensions"
      >
        <Paper p="md" radius="md">
          <Group spacing={20} position="center">
            <Stack spacing={8}>
              <RingProgress
                sections={[{ value: 65, color: 'grape' }]}
                size={80}
                thickness={8}
              />
              <Text size="xs">Small</Text>
            </Stack>
            <Stack spacing={8}>
              <RingProgress
                sections={[{ value: 65, color: 'violet' }]}
                size={160}
                thickness={16}
              />
              <Text size="xs">Large</Text>
            </Stack>
          </Group>
        </Paper>
      </ExampleSection>
    </ExampleWrapper>
  );
};
