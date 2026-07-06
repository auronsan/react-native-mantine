import { useState } from 'react';
import { ExampleWrapper, ExampleSection, CodeBlock } from '../../components/ExampleWrapper';
import { PropsTable } from '../../components/PropsTable';
import { pillsInputProps, pillsInputFieldProps } from '../../data/props/PillsInputProps';
import { Paper, Pill, PillsInput, PillsInputField, Stack } from 'react-native-mantine';

export const PillsInputExample = () => {
  const [keywords, setKeywords] = useState<string[]>(['first', 'second']);
  const [search, setSearch] = useState('');

  const addKeyword = () => {
    const value = search.trim();
    if (value.length > 0 && !keywords.includes(value)) {
      setKeywords((current) => [...current, value]);
    }
    setSearch('');
  };

  return (
    <ExampleWrapper
      title="PillsInput"
      description="Input container for pills with free text field"
    >
      <ExampleSection
        title="Basic Usage"
        description="PillsInput with static pills and a free text field"
      >
        <Paper p="md" radius="md">
          <PillsInput label="Frameworks" description="Pills inside an input">
            <Pill>React</Pill>
            <Pill>Native</Pill>
            <Pill>Mantine</Pill>
            <PillsInputField placeholder="Enter frameworks" />
          </PillsInput>
        </Paper>
      </ExampleSection>

      <ExampleSection
        title="Removable Pills"
        description="Type a keyword and submit to add it, press the cross to remove"
        variant="showcase"
      >
        <Paper p="md" radius="md">
          <PillsInput
            label="Keywords"
            description={`${keywords.length} keyword(s) added`}
          >
            {keywords.map((keyword) => (
              <Pill
                key={keyword}
                withRemoveButton
                onRemove={() =>
                  setKeywords((current) =>
                    current.filter((item) => item !== keyword)
                  )
                }
              >
                {keyword}
              </Pill>
            ))}
            <PillsInputField
              placeholder="Add keyword"
              value={search}
              onChangeText={setSearch}
              onSubmitEditing={addKeyword}
              blurOnSubmit={false}
            />
          </PillsInput>
        </Paper>
      </ExampleSection>

      <ExampleSection
        title="Variants and States"
        description="PillsInput supports default, filled and unstyled variants, error and disabled states"
      >
        <Paper p="md" radius="md">
          <Stack spacing={16}>
            <PillsInput label="Filled variant" variant="filled">
              <Pill>Filled</Pill>
              <PillsInputField placeholder="Filled input" />
            </PillsInput>
            <PillsInput label="With error" error="At least one pill is required" required>
              <PillsInputField placeholder="Required input" />
            </PillsInput>
            <PillsInput label="Disabled" disabled>
              <Pill disabled>Locked</Pill>
              <PillsInputField placeholder="Disabled input" />
            </PillsInput>
          </Stack>
        </Paper>
      </ExampleSection>

      <ExampleSection
        title="Component Props"
        description="Complete reference of all available PillsInput props"
      >
        <PropsTable props={pillsInputProps} />
      </ExampleSection>

      <ExampleSection
        title="PillsInput.Field Props"
        description="Props for the free text field, extends React Native TextInput props"
      >
        <PropsTable props={pillsInputFieldProps} />
      </ExampleSection>

      <ExampleSection
        title="Usage Example"
        description="Basic implementation code"
      >
        <CodeBlock
          code={`import { Pill, PillsInput, PillsInputField } from 'react-native-mantine';

<PillsInput label="Keywords" description="Add up to 5 keywords">
  {keywords.map((keyword) => (
    <Pill
      key={keyword}
      withRemoveButton
      onRemove={() => removeKeyword(keyword)}
    >
      {keyword}
    </Pill>
  ))}

  <PillsInputField
    placeholder="Add keyword"
    value={search}
    onChangeText={setSearch}
    onSubmitEditing={addKeyword}
  />
</PillsInput>`}
        />
      </ExampleSection>
    </ExampleWrapper>
  );
};
