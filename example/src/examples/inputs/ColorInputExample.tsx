import { useState } from 'react';
import { ExampleWrapper, ExampleSection, CodeBlock } from '../../components/ExampleWrapper';
import { PropsTable } from '../../components/PropsTable';
import { colorInputProps } from '../../data/props/ColorInputProps';
import { ColorInput, Paper, Stack, Text } from 'react-native-mantine';

const swatches = [
  '#fa5252',
  '#e64980',
  '#be4bdb',
  '#7950f2',
  '#4c6ef5',
  '#228be6',
  '#12b886',
];

export const ColorInputExample = () => {
  const [value, setValue] = useState('#228be6');

  return (
    <ExampleWrapper
      title="ColorInput"
      description="Text input for color values with a color picker bottom sheet"
    >
      <ExampleSection
        title="Basic Usage"
        description="Type a color or press the swatch on the right to open the picker"
        variant="showcase"
      >
        <Paper p="md" radius="md">
          <Stack spacing={12}>
            <ColorInput
              label="Brand color"
              placeholder="#228be6"
              value={value}
              onChange={setValue}
            />
            <Text size="sm" color="dimmed">
              Value: {value || '(empty)'}
            </Text>
          </Stack>
        </Paper>
      </ExampleSection>

      <ExampleSection
        title="RGBA Format"
        description="format='rgba' adds an alpha slider to the picker and outputs rgba strings"
      >
        <Paper p="md" radius="md">
          <ColorInput
            label="Overlay color"
            format="rgba"
            defaultValue="rgba(34, 139, 230, 0.5)"
          />
        </Paper>
      </ExampleSection>

      <ExampleSection
        title="With Swatches"
        description="Swatches are displayed in the picker, closeOnColorSwatchClick closes the sheet on pick"
      >
        <Paper p="md" radius="md">
          <ColorInput
            label="Palette color"
            placeholder="Pick from swatches"
            defaultValue="#12b886"
            swatches={swatches}
            swatchesPerRow={7}
            closeOnColorSwatchClick
          />
        </Paper>
      </ExampleSection>

      <ExampleSection
        title="Disallow Input"
        description="disallowInput prevents typing, pressing the input opens the picker instead"
      >
        <Paper p="md" radius="md">
          <ColorInput
            label="Picker only"
            description="Press the input to open the picker"
            defaultValue="#be4bdb"
            disallowInput
          />
        </Paper>
      </ExampleSection>

      <ExampleSection
        title="Label, Description and Error"
        description="ColorInput supports the same wrapper props as TextInput, fixOnBlur reverts invalid values"
      >
        <Paper p="md" radius="md">
          <Stack spacing={12}>
            <ColorInput
              label="Required color"
              description="Invalid values revert on blur (fixOnBlur)"
              placeholder="#000000"
              defaultValue="#fd7e14"
              required
            />
            <ColorInput
              label="With error"
              placeholder="#000000"
              error="Color is required"
            />
            <ColorInput label="Without preview" withPreview={false} defaultValue="#fab005" />
          </Stack>
        </Paper>
      </ExampleSection>

      <ExampleSection
        title="Disabled"
        description="disabled prevents typing and opening the picker"
      >
        <Paper p="md" radius="md">
          <ColorInput label="Disabled" defaultValue="#868e96" disabled />
        </Paper>
      </ExampleSection>

      <ExampleSection
        title="Component Props"
        description="Complete reference of all available ColorInput props"
      >
        <PropsTable props={colorInputProps} />
      </ExampleSection>

      <ExampleSection
        title="Usage Example"
        description="Basic implementation code"
      >
        <CodeBlock
          code={`import { ColorInput } from 'react-native-mantine';

<ColorInput
  label="Brand color"
  placeholder="#228be6"
  value={value}
  onChange={setValue}
  format="hex"
  swatches={['#fa5252', '#228be6', '#12b886']}
  closeOnColorSwatchClick
/>

// Picker only, no typing
<ColorInput disallowInput defaultValue="#be4bdb" />`}
        />
      </ExampleSection>
    </ExampleWrapper>
  );
};
