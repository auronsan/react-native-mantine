import { useState } from 'react';
import { SafeAreaView, ScrollView, StatusBar, useColorScheme } from 'react-native';
import {
  Theme,
  Title,
  Text,
  Button,
  Group,
  Stack,
  Card,
  Badge,
  Switch,
  TextInput,
  Select,
  Progress,
  RingProgress,
  Stepper,
} from 'react-native-mantine';

export default function App() {
  const system = useColorScheme();
  const [dark, setDark] = useState(system === 'dark');
  const [step, setStep] = useState(1);
  const [framework, setFramework] = useState(null);

  return (
    <Theme forceMode={dark ? 'dark' : 'light'}>
      <SafeAreaView style={{ flex: 1, paddingTop: StatusBar.currentHeight ?? 0 }}>
      <ScrollView contentContainerStyle={{ padding: 24, gap: 24 }}>
        <Group position="apart" align="center">
          <Title order={2}>React Native Mantine</Title>
          <Switch checked={dark} onChange={setDark} label="Dark" />
        </Group>

        <Card shadow="sm" p="lg" radius="md" withBorder>
          <Stack spacing={12}>
            <Group position="apart">
              <Text weight={600}>Buttons</Text>
              <Badge color="blue" variant="light">
                8 variants
              </Badge>
            </Group>
            <Group spacing={8}>
              <Button>Filled</Button>
              <Button variant="light">Light</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="subtle">Subtle</Button>
            </Group>
          </Stack>
        </Card>

        <Card shadow="sm" p="lg" radius="md" withBorder>
          <Stack spacing={12}>
            <Text weight={600}>Inputs</Text>
            <TextInput label="Email" placeholder="you@example.com" />
            <Select
              label="Framework"
              placeholder="Pick one"
              data={['Expo', 'React Native CLI']}
              value={framework}
              onChange={setFramework}
            />
          </Stack>
        </Card>

        <Card shadow="sm" p="lg" radius="md" withBorder>
          <Stack spacing={12}>
            <Text weight={600}>Progress</Text>
            <Progress value={65} />
            <Group position="center">
              <RingProgress
                size={120}
                sections={[
                  { value: 40, color: 'blue' },
                  { value: 30, color: 'orange' },
                  { value: 15, color: 'green' },
                ]}
              />
            </Group>
          </Stack>
        </Card>

        <Card shadow="sm" p="lg" radius="md" withBorder>
          <Stack spacing={12}>
            <Text weight={600}>Stepper</Text>
            <Stepper active={step} onStepClick={setStep}>
              <Stepper.Step label="Account" description="Create account" />
              <Stepper.Step label="Verify" description="Verify email" />
              <Stepper.Step label="Done" description="Get full access" />
            </Stepper>
            <Group position="right">
              <Button variant="default" onPress={() => setStep((s) => Math.max(0, s - 1))}>
                Back
              </Button>
              <Button onPress={() => setStep((s) => Math.min(3, s + 1))}>Next</Button>
            </Group>
          </Stack>
        </Card>
      </ScrollView>
      </SafeAreaView>
    </Theme>
  );
}
