import { useState, useEffect } from 'react';
import {
  ExampleWrapper,
  ExampleSection,
  CodeBlock,
} from '../../components/ExampleWrapper';
import { PropsTable } from '../../components/PropsTable';
import { progressProps } from '../../data/props/ProgressProps';
import { Progress, Stack, Paper, Text } from 'react-native-mantine';

const AnimatedProgressExample = () => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setValue((prev) => {
        if (prev >= 100) return 0;
        return prev + 10;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Paper p="md" radius="md">
      <Stack spacing={12}>
        <Text>Animated progress: {value}%</Text>
        <Progress value={value} color="blue" />
      </Stack>
    </Paper>
  );
};

export const ProgressExample = () => {
  return (
    <ExampleWrapper
      title="Progress"
      description="Progress bar with animations and multi-section support"
    >
      <ExampleSection
        title="Progress Colors"
        description="Different theme colors"
      >
        <Paper p="md" radius="md">
          <Stack spacing={16}>
            <Stack spacing={4}>
              <Text size="sm" style={{ color: '#868e96' }}>
                Blue - 25%
              </Text>
              <Progress value={25} color="blue" />
            </Stack>
            <Stack spacing={4}>
              <Text size="sm" style={{ color: '#868e96' }}>
                Green - 50%
              </Text>
              <Progress value={50} color="green" />
            </Stack>
            <Stack spacing={4}>
              <Text size="sm" style={{ color: '#868e96' }}>
                Orange - 75%
              </Text>
              <Progress value={75} color="orange" />
            </Stack>
            <Stack spacing={4}>
              <Text size="sm" style={{ color: '#868e96' }}>
                Red - 100%
              </Text>
              <Progress value={100} color="red" />
            </Stack>
          </Stack>
        </Paper>
      </ExampleSection>

      <ExampleSection
        title="Progress Sizes"
        description="Different height options"
      >
        <Paper p="md" radius="md">
          <Stack spacing={16}>
            <Stack spacing={4}>
              <Text size="sm" style={{ color: '#868e96' }}>
                xs
              </Text>
              <Progress value={60} size="xs" />
            </Stack>
            <Stack spacing={4}>
              <Text size="sm" style={{ color: '#868e96' }}>
                sm
              </Text>
              <Progress value={60} size="sm" />
            </Stack>
            <Stack spacing={4}>
              <Text size="sm" style={{ color: '#868e96' }}>
                md
              </Text>
              <Progress value={60} size="md" />
            </Stack>
            <Stack spacing={4}>
              <Text size="sm" style={{ color: '#868e96' }}>
                lg
              </Text>
              <Progress value={60} size="lg" />
            </Stack>
            <Stack spacing={4}>
              <Text size="sm" style={{ color: '#868e96' }}>
                xl
              </Text>
              <Progress value={60} size="xl" />
            </Stack>
          </Stack>
        </Paper>
      </ExampleSection>

      <ExampleSection
        title="Progress Radius"
        description="Different border radius options"
      >
        <Paper p="md" radius="md">
          <Stack spacing={16}>
            <Progress value={70} radius="xs" size="lg" />
            <Progress value={70} radius="sm" size="lg" />
            <Progress value={70} radius="md" size="lg" />
            <Progress value={70} radius="lg" size="lg" />
            <Progress value={70} radius="xl" size="lg" />
          </Stack>
        </Paper>
      </ExampleSection>

      <ExampleSection
        title="Multi-section Progress"
        description="Progress bar with multiple colored sections"
      >
        <Paper p="md" radius="md">
          <Stack spacing={16}>
            <Stack spacing={8}>
              <Text size="sm" style={{ color: '#868e96' }}>
                Task completion breakdown
              </Text>
              <Progress
                sections={[
                  { value: 30, color: 'green', label: 'Completed' },
                  { value: 20, color: 'orange', label: 'In Progress' },
                  { value: 15, color: 'blue', label: 'Review' },
                ]}
                size="lg"
              />
              <Text size="xs" style={{ color: '#868e96' }}>
                Green: 30% | Orange: 20% | Blue: 15%
              </Text>
            </Stack>
          </Stack>
        </Paper>
      </ExampleSection>

      <ExampleSection
        title="Animated Progress"
        description="Progress bar with automatic animation"
        variant="showcase"
      >
        <AnimatedProgressExample />
      </ExampleSection>

      <ExampleSection
        title="Component Props"
        description="Complete reference of all available Progress props"
      >
        <PropsTable props={progressProps} />
      </ExampleSection>

      <ExampleSection
        title="Usage Example"
        description="Basic implementation code"
      >
        <CodeBlock
          code={`import { Progress } from 'react-native-mantine';

// Basic progress
<Progress value={60} color="blue" />

// Large progress bar
<Progress
  value={75}
  color="green"
  size="lg"
  radius="xl"
/>

// Multi-section progress
<Progress
  sections={[
    { value: 30, color: 'green' },
    { value: 20, color: 'orange' },
    { value: 15, color: 'blue' },
  ]}
  size="lg"
/>`}
        />
      </ExampleSection>
    </ExampleWrapper>
  );
};
