import { useState } from 'react';
import { ExampleWrapper, ExampleSection, CodeBlock } from '../../components/ExampleWrapper';
import { Button, Transition, Stack, Text, Paper, Group } from 'react-native-mantine';

export const TransitionExample = () => {
  const [fadeVisible, setFadeVisible] = useState(false);
  const [scaleVisible, setScaleVisible] = useState(false);
  const [slideVisible, setSlideVisible] = useState(false);
  const [popVisible, setPopVisible] = useState(false);
  const [rotateVisible, setRotateVisible] = useState(false);
  const [allVisible, setAllVisible] = useState(false);

  return (
    <ExampleWrapper
      title="Transition"
      description="Animated mount/unmount transitions for smooth UI changes"
    >
      <ExampleSection
        title="Fade Transition"
        description="Simple opacity fade in/out"
        variant="showcase"
      >
        <Stack spacing={12}>
          <Button onPress={() => setFadeVisible(!fadeVisible)}>
            {fadeVisible ? 'Hide' : 'Show'} Fade
          </Button>
          <Transition mounted={fadeVisible} transition="fade" duration={300}>
            <Paper p="md" radius="md" style={{ backgroundColor: '#228be6' }}>
              <Text style={{ color: 'white' }}>Fading content with smooth opacity transition</Text>
            </Paper>
          </Transition>
        </Stack>
      </ExampleSection>

      <ExampleSection
        title="Scale Transition"
        description="Scale up/down with fade"
        variant="showcase"
      >
        <Stack spacing={12}>
          <Button onPress={() => setScaleVisible(!scaleVisible)} color="grape">
            {scaleVisible ? 'Hide' : 'Show'} Scale
          </Button>
          <Transition mounted={scaleVisible} transition="scale" duration={300}>
            <Paper p="md" radius="md" style={{ backgroundColor: '#be4bdb' }}>
              <Text style={{ color: 'white' }}>Scaling animation from 75% to 100%</Text>
            </Paper>
          </Transition>
        </Stack>
      </ExampleSection>

      <ExampleSection
        title="Slide Transitions"
        description="Slide from different directions"
        variant="showcase"
      >
        <Stack spacing={12}>
          <Button onPress={() => setSlideVisible(!slideVisible)} color="teal">
            {slideVisible ? 'Hide' : 'Show'} Slide
          </Button>
          <Transition mounted={slideVisible} transition="slide-down" duration={300}>
            <Paper p="md" radius="md" style={{ backgroundColor: '#20c997' }}>
              <Text style={{ color: 'white' }}>Slides down from above</Text>
            </Paper>
          </Transition>
        </Stack>
      </ExampleSection>

      <ExampleSection
        title="Pop Transition"
        description="Pop effect from 0 to full scale"
        variant="showcase"
      >
        <Stack spacing={12}>
          <Button onPress={() => setPopVisible(!popVisible)} color="orange">
            {popVisible ? 'Hide' : 'Show'} Pop
          </Button>
          <Transition mounted={popVisible} transition="pop" duration={300}>
            <Paper p="md" radius="md" style={{ backgroundColor: '#fd7e14' }}>
              <Text style={{ color: 'white' }}>Pops into view with scale animation</Text>
            </Paper>
          </Transition>
        </Stack>
      </ExampleSection>

      <ExampleSection
        title="Rotate Transition"
        description="Rotate with fade effect"
        variant="showcase"
      >
        <Stack spacing={12}>
          <Button onPress={() => setRotateVisible(!rotateVisible)} color="red">
            {rotateVisible ? 'Hide' : 'Show'} Rotate
          </Button>
          <Transition mounted={rotateVisible} transition="rotate" duration={500}>
            <Paper p="md" radius="md" style={{ backgroundColor: '#fa5252' }}>
              <Text style={{ color: 'white' }}>Rotates 180 degrees while fading in</Text>
            </Paper>
          </Transition>
        </Stack>
      </ExampleSection>

      <ExampleSection
        title="Multiple Transitions"
        description="All transition types together"
        variant="showcase"
      >
        <Stack spacing={12}>
          <Button onPress={() => setAllVisible(!allVisible)} color="indigo">
            {allVisible ? 'Hide All' : 'Show All'}
          </Button>
          <Group spacing={8}>
            <Transition mounted={allVisible} transition="fade" duration={200}>
              <Paper p="sm" radius="sm" style={{ backgroundColor: '#228be6' }}>
                <Text style={{ color: 'white', fontSize: 12 }}>Fade</Text>
              </Paper>
            </Transition>
            <Transition mounted={allVisible} transition="scale" duration={250}>
              <Paper p="sm" radius="sm" style={{ backgroundColor: '#be4bdb' }}>
                <Text style={{ color: 'white', fontSize: 12 }}>Scale</Text>
              </Paper>
            </Transition>
            <Transition mounted={allVisible} transition="slide-up" duration={300}>
              <Paper p="sm" radius="sm" style={{ backgroundColor: '#20c997' }}>
                <Text style={{ color: 'white', fontSize: 12 }}>Slide</Text>
              </Paper>
            </Transition>
            <Transition mounted={allVisible} transition="pop" duration={350}>
              <Paper p="sm" radius="sm" style={{ backgroundColor: '#fd7e14' }}>
                <Text style={{ color: 'white', fontSize: 12 }}>Pop</Text>
              </Paper>
            </Transition>
          </Group>
        </Stack>
      </ExampleSection>

      <ExampleSection
        title="Usage Example"
        description="Basic implementation code"
      >
        <CodeBlock
          code={`import { useState } from 'react';
import { Transition, Button, Paper, Text } from 'react-native-mantine';

const MyComponent = () => {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <Button onPress={() => setVisible(!visible)}>
        Toggle
      </Button>

      <Transition
        mounted={visible}
        transition="scale"
        duration={300}
      >
        <Paper p="md">
          <Text>Animated content</Text>
        </Paper>
      </Transition>
    </>
  );
};

// Available transitions:
// - fade: Simple opacity
// - scale: Scale with fade
// - slide-down, slide-up, slide-left, slide-right
// - pop: Scale from 0
// - rotate: 180° rotation with fade`}
        />
      </ExampleSection>
    </ExampleWrapper>
  );
};
