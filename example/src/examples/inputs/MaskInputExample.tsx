import { useState } from 'react';
import { ExampleWrapper, ExampleSection, CodeBlock } from '../../components/ExampleWrapper';
import { PropsTable } from '../../components/PropsTable';
import { maskInputProps } from '../../data/props/MaskInputProps';
import { Badge, Group, MaskInput, Paper, Stack, Text } from 'react-native-mantine';

export const MaskInputExample = () => {
  const [phone, setPhone] = useState('');
  const [phoneRaw, setPhoneRaw] = useState('');
  const [dateComplete, setDateComplete] = useState(false);

  return (
    <ExampleWrapper
      title="MaskInput"
      description="Format user input according to a mask pattern as they type"
    >
      <ExampleSection
        title="US Phone Number"
        description="# accepts a digit, other characters are inserted as literals"
        variant="showcase"
      >
        <Paper p="md" radius="md">
          <Stack spacing={12}>
            <MaskInput
              label="Phone"
              mask="+1 (###) ###-####"
              placeholder="+1 (555) 000-0000"
              value={phone}
              onChangeText={setPhone}
              onChangeRaw={(raw) => setPhoneRaw(raw)}
              keyboardType="phone-pad"
            />
            <Text size="sm" color="dimmed">
              Masked: {phone || '(empty)'} | Raw: {phoneRaw || '(empty)'}
            </Text>
          </Stack>
        </Paper>
      </ExampleSection>

      <ExampleSection
        title="Date with Mask Placeholder"
        description="showMask displays the mask skeleton as placeholder, onComplete fires when all slots are filled"
      >
        <Paper p="md" radius="md">
          <Stack spacing={12}>
            <MaskInput
              label="Date of birth"
              mask="##/##/####"
              showMask
              slotChar="_"
              keyboardType="number-pad"
              onComplete={() => setDateComplete(true)}
              onChangeRaw={(raw) => {
                if (raw.length < 8) {
                  setDateComplete(false);
                }
              }}
            />
            <Group spacing={8}>
              <Text size="sm" color="dimmed">
                Status:
              </Text>
              {dateComplete ? (
                <Badge color="green">Complete</Badge>
              ) : (
                <Badge color="gray" variant="outline">
                  Incomplete
                </Badge>
              )}
            </Group>
          </Stack>
        </Paper>
      </ExampleSection>

      <ExampleSection
        title="Letter and Alphanumeric Tokens"
        description="a accepts a letter, * accepts a letter or a digit"
      >
        <Paper p="md" radius="md">
          <Stack spacing={12}>
            <MaskInput
              label="License plate"
              description="Three letters, a dash and three digits"
              mask="aaa-###"
              showMask
              autoCapitalize="characters"
            />
            <MaskInput
              label="Product code"
              description="* accepts letters and digits"
              mask="**-****"
              showMask
              slotChar="•"
            />
          </Stack>
        </Paper>
      </ExampleSection>

      <ExampleSection
        title="Auto Clear"
        description="With autoClear, an incomplete value is cleared when the input loses focus"
      >
        <Paper p="md" radius="md">
          <MaskInput
            label="ZIP code"
            description="Type a partial value and blur the input to clear it"
            mask="#####"
            showMask
            autoClear
            keyboardType="number-pad"
          />
        </Paper>
      </ExampleSection>

      <ExampleSection
        title="Component Props"
        description="Complete reference of all available MaskInput props"
      >
        <PropsTable props={maskInputProps} />
      </ExampleSection>

      <ExampleSection
        title="Usage Example"
        description="Basic implementation code"
      >
        <CodeBlock
          code={`import { MaskInput } from 'react-native-mantine';

// Tokens: # digit, a letter, * alphanumeric
<MaskInput
  label="Phone"
  mask="+1 (###) ###-####"
  value={phone}
  onChangeText={setPhone}
  onChangeRaw={(raw, masked) => console.log(raw)}
  onComplete={(masked, raw) => console.log('done', raw)}
/>

// Mask skeleton as placeholder, clear incomplete value on blur
<MaskInput mask="##/##/####" showMask slotChar="_" autoClear />`}
        />
      </ExampleSection>
    </ExampleWrapper>
  );
};
