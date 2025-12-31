import {
  ExampleWrapper,
  ExampleSection,
  CodeBlock,
} from '../../components/ExampleWrapper';
import { Button, Stack } from 'react-native-mantine';

export const GradientExample = () => {
  return (
    <ExampleWrapper
      title="Gradient Support"
      description="New gradient system for buttons and backgrounds - create beautiful color transitions"
    >
      <ExampleSection
        title="Gradient Buttons"
        description="Buttons with gradient backgrounds"
        variant="showcase"
      >
        <Stack spacing={12}>
          <Button
            variant="gradient"
            gradient={{ from: 'blue', to: 'cyan' }}
          >
            Blue to Cyan
          </Button>

          <Button
            variant="gradient"
            gradient={{ from: 'grape', to: 'pink' }}
          >
            Grape to Pink
          </Button>

          <Button
            variant="gradient"
            gradient={{ from: 'orange', to: 'red' }}
          >
            Orange to Red
          </Button>

          <Button
            variant="gradient"
            gradient={{ from: 'teal', to: 'lime' }}
          >
            Teal to Lime
          </Button>

          <Button
            variant="gradient"
            gradient={{ from: 'indigo', to: 'cyan' }}
          >
            Indigo to Cyan
          </Button>
        </Stack>
      </ExampleSection>

      <ExampleSection
        title="Gradient Angles"
        description="Control gradient direction with deg parameter"
      >
        <Stack spacing={12}>
          <Button
            variant="gradient"
            gradient={{ from: 'blue', to: 'cyan', deg: 0 }}
          >
            0° (Left to Right)
          </Button>

          <Button
            variant="gradient"
            gradient={{ from: 'blue', to: 'cyan', deg: 45 }}
          >
            45° (Diagonal)
          </Button>

          <Button
            variant="gradient"
            gradient={{ from: 'blue', to: 'cyan', deg: 90 }}
          >
            90° (Top to Bottom)
          </Button>

          <Button
            variant="gradient"
            gradient={{ from: 'blue', to: 'cyan', deg: 135 }}
          >
            135° (Diagonal)
          </Button>
        </Stack>
      </ExampleSection>

      <ExampleSection
        title="Gradient Sizes"
        description="Gradients work with all button sizes"
      >
        <Stack spacing={10}>
          <Button
            size="xs"
            variant="gradient"
            gradient={{ from: 'grape', to: 'pink' }}
          >
            Extra Small
          </Button>

          <Button
            size="sm"
            variant="gradient"
            gradient={{ from: 'grape', to: 'pink' }}
          >
            Small
          </Button>

          <Button
            size="md"
            variant="gradient"
            gradient={{ from: 'grape', to: 'pink' }}
          >
            Medium
          </Button>

          <Button
            size="lg"
            variant="gradient"
            gradient={{ from: 'grape', to: 'pink' }}
          >
            Large
          </Button>

          <Button
            size="xl"
            variant="gradient"
            gradient={{ from: 'grape', to: 'pink' }}
          >
            Extra Large
          </Button>
        </Stack>
      </ExampleSection>

      <ExampleSection
        title="More Gradient Combinations"
        description="Explore different color combinations"
        variant="showcase"
      >
        <Stack spacing={12}>
          <Button
            variant="gradient"
            gradient={{ from: 'yellow', to: 'orange', deg: 45 }}
          >
            Sunset Gradient
          </Button>

          <Button
            variant="gradient"
            gradient={{ from: 'violet', to: 'indigo', deg: 90 }}
          >
            Purple Dream
          </Button>

          <Button
            variant="gradient"
            gradient={{ from: 'lime', to: 'teal', deg: 135 }}
          >
            Fresh Mint
          </Button>

          <Button
            variant="gradient"
            gradient={{ from: 'pink', to: 'red', deg: 0 }}
          >
            Hot Pink
          </Button>
        </Stack>
      </ExampleSection>

      <ExampleSection
        title="Usage Example"
        description="How to use gradients in your components"
      >
        <CodeBlock
          code={`import { Button } from 'react-native-mantine';

// Basic gradient button
<Button
  variant="gradient"
  gradient={{ from: 'blue', to: 'cyan' }}
>
  Click Me
</Button>

// With custom angle
<Button
  variant="gradient"
  gradient={{
    from: 'orange',
    to: 'red',
    deg: 45  // Diagonal gradient
  }}
>
  Diagonal Gradient
</Button>

// Available colors:
// blue, cyan, grape, pink, orange, red,
// teal, lime, indigo, green, yellow, violet

// Angles: 0 = left to right
//         45 = diagonal
//         90 = top to bottom
//         135 = diagonal (reverse)`}
        />
      </ExampleSection>
    </ExampleWrapper>
  );
};
