import { ExampleWrapper, ExampleSection, CodeBlock } from '../../components/ExampleWrapper';
import { PropsTable } from '../../components/PropsTable';
import { pinInputProps } from '../../data/props/PinInputProps';
import { PinInput , Paper } from 'react-native-mantine';

export const PinInputExample = () => {
  return (
    <ExampleWrapper
      title="PinInput"
      description="PIN or OTP input with auto-focus"
    >
      <ExampleSection
        title="Basic Usage"
        description="PinInput component"
      >
        <Paper p="md" radius="md">
          <PinInput length={4} />
        </Paper>
      </ExampleSection>

      <ExampleSection
        title="Component Props"
        description="Complete reference of all available PinInput props"
      >
        <PropsTable props={pinInputProps} />
      </ExampleSection>

      <ExampleSection
        title="Usage Example"
        description="Basic implementation code"
      >
        <CodeBlock
          code={`import { PinInput } from 'react-native-mantine';

<PinInput
  length={6}
  type="number"
  mask={true}
  value={pin}
  onChange={setPin}
  onComplete={(value) => console.log('PIN complete:', value)}
/>`}
        />
      </ExampleSection>
    </ExampleWrapper>
  );
};
