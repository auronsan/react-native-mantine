import { View } from 'react-native';
import { useState } from 'react';
import {
  ExampleWrapper,
  ExampleSection,
  CodeBlock,
} from '../../components/ExampleWrapper';
import { PropsTable } from '../../components/PropsTable';
import { buttonProps } from '../../data/props/ButtonProps';
import { Button, Stack , Badge } from 'react-native-mantine';

export const ButtonExample = () => {
  const [clickCount, setClickCount] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleAsyncClick = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setClickCount((prev) => prev + 1);
    }, 2000);
  };

  return (
    <ExampleWrapper
      title="Button"
      description="Full-featured interactive button with variants, sizes, and loading states"
    >
      <ExampleSection
        title="Button Variants"
        description="Different visual styles for various use cases"
        variant="showcase"
      >
        <Stack spacing={12}>
          <Button variant="filled">Filled Button</Button>
          <Button variant="outline">Outline Button</Button>
          <Button variant="light">Light Button</Button>
          <Button variant="subtle">Subtle Button</Button>
        </Stack>
      </ExampleSection>

      <ExampleSection
        title="Button Sizes"
        description="Available sizes from xs to xl"
      >
        <Stack spacing={10}>
          <Button size="xs">Extra Small</Button>
          <Button size="sm">Small</Button>
          <Button size="md">Medium (Default)</Button>
          <Button size="lg">Large</Button>
          <Button size="xl">Extra Large</Button>
        </Stack>
      </ExampleSection>

      <ExampleSection
        title="Button Colors"
        description="Theme colors available for buttons"
      >
        <Stack spacing={10}>
          <Button color="blue">Blue</Button>
          <Button color="red">Red</Button>
          <Button color="green">Green</Button>
          <Button color="orange">Orange</Button>
          <Button color="grape">Grape</Button>
        </Stack>
      </ExampleSection>

      <ExampleSection
        title="Loading State"
        description="Interactive loading demonstration"
        variant="showcase"
      >
        <Stack spacing={12}>
          <Button loading={loading} onPress={handleAsyncClick}>
            {loading ? 'Processing...' : 'Click Me'}
          </Button>
          {clickCount > 0 && (
            <View style={{ alignItems: 'center' }}>
              <Badge size="lg">Clicked {clickCount} times</Badge>
            </View>
          )}
        </Stack>
      </ExampleSection>

      <ExampleSection
        title="Disabled State"
        description="Buttons in disabled state"
      >
        <Stack spacing={10}>
          <Button disabled>Disabled Filled</Button>
          <Button variant="outline" disabled>
            Disabled Outline
          </Button>
        </Stack>
      </ExampleSection>

      <ExampleSection
        title="Full Width"
        description="Button that takes full width of container"
      >
        <Button fullWidth>Full Width Button</Button>
      </ExampleSection>

      <ExampleSection
        title="Compact Mode"
        description="Reduced padding for space-constrained layouts"
      >
        <Stack spacing={10}>
          <Button compact>Compact Button</Button>
          <Button>Regular Button</Button>
        </Stack>
      </ExampleSection>

      <ExampleSection
        title="Uppercase Text"
        description="Transform button text to uppercase"
      >
        <Button uppercase>Uppercase Button</Button>
      </ExampleSection>

      <ExampleSection
        title="With Icons"
        description="Buttons with left and right icons"
      >
        <Stack spacing={10}>
          <Button leftIcon={<View style={{ width: 16, height: 16, backgroundColor: 'white', borderRadius: 2 }} />}>
            Left Icon
          </Button>
          <Button rightIcon={<View style={{ width: 16, height: 16, backgroundColor: 'white', borderRadius: 2 }} />}>
            Right Icon
          </Button>
        </Stack>
      </ExampleSection>

      <ExampleSection
        title="Gradient Variant"
        description="Button with gradient background"
      >
        <Stack spacing={10}>
          <Button variant="gradient" gradient={{ from: 'blue', to: 'cyan', deg: 45 }}>
            Blue to Cyan
          </Button>
          <Button variant="gradient" gradient={{ from: 'grape', to: 'pink', deg: 90 }}>
            Grape to Pink
          </Button>
        </Stack>
      </ExampleSection>

      <ExampleSection
        title="Component Props"
        description="Complete reference of all available Button props"
      >
        <PropsTable props={buttonProps} />
      </ExampleSection>

      <ExampleSection
        title="Usage Example"
        description="Basic implementation code"
      >
        <CodeBlock
          code={`import { Button } from 'react-native-mantine';

<Button
  variant="filled"
  color="blue"
  size="md"
  onPress={() => console.log('Clicked!')}
>
  Click Me
</Button>

// With loading state
<Button
  loading={isLoading}
  loaderPosition="left"
  onPress={handleSubmit}
>
  Submit
</Button>

// Gradient button
<Button
  variant="gradient"
  gradient={{ from: 'blue', to: 'cyan', deg: 45 }}
>
  Gradient Button
</Button>`}
        />
      </ExampleSection>
    </ExampleWrapper>
  );
};
