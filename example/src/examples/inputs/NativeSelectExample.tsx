import { ExampleWrapper, ExampleSection, CodeBlock } from '../../components/ExampleWrapper';
import { PropsTable } from '../../components/PropsTable';
import { nativeSelectProps } from '../../data/props/NativeSelectProps';
import { NativeSelect , Paper } from 'react-native-mantine';

export const NativeSelectExample = () => {
  return (
    <ExampleWrapper
      title="NativeSelect"
      description="Platform-native dropdown select"
    >
      <ExampleSection
        title="Basic Usage"
        description="NativeSelect component"
      >
        <Paper p="md" radius="md">
          <NativeSelect
            label="Select option"
            data={['Option 1', 'Option 2', 'Option 3']}
          />
        </Paper>
      </ExampleSection>

      <ExampleSection
        title="Component Props"
        description="Complete reference of all available NativeSelect props"
      >
        <PropsTable props={nativeSelectProps} />
      </ExampleSection>

      <ExampleSection
        title="Usage Example"
        description="Basic implementation code"
      >
        <CodeBlock
          code={`import { NativeSelect } from 'react-native-mantine';

<NativeSelect
  label="Choose a framework"
  placeholder="Select an option"
  data={[
    { value: 'react', label: 'React' },
    { value: 'vue', label: 'Vue' },
    { value: 'angular', label: 'Angular' }
  ]}
  value={value}
  onChange={setValue}
/>`}
        />
      </ExampleSection>
    </ExampleWrapper>
  );
};
