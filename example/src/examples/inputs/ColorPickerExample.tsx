import { useState } from 'react';
import { ExampleWrapper, ExampleSection, CodeBlock } from '../../components/ExampleWrapper';
import { PropsTable } from '../../components/PropsTable';
import { colorPickerProps } from '../../data/props/ColorPickerProps';
import {
  ColorPicker,
  ColorSwatch,
  Group,
  Paper,
  Stack,
  Text,
} from 'react-native-mantine';

const swatches = [
  '#25262b',
  '#868e96',
  '#fa5252',
  '#e64980',
  '#be4bdb',
  '#7950f2',
  '#4c6ef5',
  '#228be6',
  '#15aabf',
  '#12b886',
  '#40c057',
  '#82c91e',
  '#fab005',
  '#fd7e14',
];

export const ColorPickerExample = () => {
  const [hex, setHex] = useState('#228be6');
  const [rgba, setRgba] = useState('rgba(34, 139, 230, 0.6)');
  const [swatchValue, setSwatchValue] = useState('#12b886');

  return (
    <ExampleWrapper
      title="ColorPicker"
      description="Pick a color with saturation area, hue and alpha sliders and swatches"
    >
      <ExampleSection
        title="Basic Usage"
        description="Drag on the saturation area and the hue slider to pick a hex color"
        variant="showcase"
      >
        <Paper p="md" radius="md">
          <Stack spacing={12}>
            <ColorPicker value={hex} onChange={setHex} />
            <Group spacing={8}>
              <ColorSwatch color={hex} size={24} />
              <Text size="sm">{hex}</Text>
            </Group>
          </Stack>
        </Paper>
      </ExampleSection>

      <ExampleSection
        title="Alpha Channel"
        description="format='rgba' (or hexa/hsla) adds an alpha slider"
      >
        <Paper p="md" radius="md">
          <Stack spacing={12}>
            <ColorPicker format="rgba" value={rgba} onChange={setRgba} />
            <Group spacing={8}>
              <ColorSwatch color={rgba} size={24} />
              <Text size="sm">{rgba}</Text>
            </Group>
          </Stack>
        </Paper>
      </ExampleSection>

      <ExampleSection
        title="With Swatches"
        description="swatches displays predefined colors under the pickers, swatchesPerRow controls the grid"
      >
        <Paper p="md" radius="md">
          <ColorPicker
            defaultValue="#fa5252"
            swatches={swatches}
            swatchesPerRow={7}
          />
        </Paper>
      </ExampleSection>

      <ExampleSection
        title="Full Width"
        description="fullWidth makes the picker take 100% of the available width"
      >
        <Paper p="md" radius="md">
          <ColorPicker fullWidth defaultValue="#7950f2" size="lg" />
        </Paper>
      </ExampleSection>

      <ExampleSection
        title="Swatches Only"
        description="withPicker={false} hides the pickers, useful for restricted palettes"
      >
        <Paper p="md" radius="md">
          <Stack spacing={12}>
            <ColorPicker
              withPicker={false}
              fullWidth
              value={swatchValue}
              onChange={setSwatchValue}
              swatches={swatches}
              swatchesPerRow={7}
              onColorSwatchClick={(color) => setSwatchValue(color)}
            />
            <Group spacing={8}>
              <ColorSwatch color={swatchValue} size={24} />
              <Text size="sm">{swatchValue}</Text>
            </Group>
          </Stack>
        </Paper>
      </ExampleSection>

      <ExampleSection
        title="Component Props"
        description="Complete reference of all available ColorPicker props"
      >
        <PropsTable props={colorPickerProps} />
      </ExampleSection>

      <ExampleSection
        title="Usage Example"
        description="Basic implementation code"
      >
        <CodeBlock
          code={`import { ColorPicker } from 'react-native-mantine';

// Hex picker
<ColorPicker value={value} onChange={setValue} />

// Alpha slider with rgba output
<ColorPicker format="rgba" onChangeEnd={setValue} />

// Swatches-only palette
<ColorPicker
  withPicker={false}
  swatches={['#fa5252', '#228be6', '#12b886']}
  swatchesPerRow={7}
  onColorSwatchClick={(color) => console.log(color)}
/>

// HueSlider and AlphaSlider are also exported standalone
import { HueSlider, AlphaSlider } from 'react-native-mantine';`}
        />
      </ExampleSection>
    </ExampleWrapper>
  );
};
