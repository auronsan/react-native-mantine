import { useState } from 'react';
import { ExampleWrapper, ExampleSection, CodeBlock } from '../../components/ExampleWrapper';
import { PropsTable } from '../../components/PropsTable';
import { fieldsetProps } from '../../data/props/FieldsetProps';
import { Fieldset, Paper, Stack, Switch, TextInput } from 'react-native-mantine';

export const FieldsetExample = () => {
  const [disabled, setDisabled] = useState(false);

  return (
    <ExampleWrapper
      title="Fieldset"
      description="Group form fields with legend"
    >
      <ExampleSection
        title="Basic Usage"
        description="Fieldset groups related form fields under a legend"
      >
        <Paper p="md" radius="md">
          <Fieldset legend="Personal information">
            <Stack spacing={12}>
              <TextInput label="Your name" placeholder="Your name" />
              <TextInput label="Email" placeholder="your@email.com" />
            </Stack>
          </Fieldset>
        </Paper>
      </ExampleSection>

      <ExampleSection
        title="Variants"
        description="Fieldset supports default, filled and unstyled variants"
      >
        <Paper p="md" radius="md">
          <Stack spacing={24}>
            <Fieldset legend="Default variant" variant="default">
              <TextInput label="Your name" placeholder="Your name" />
            </Fieldset>
            <Fieldset legend="Filled variant" variant="filled">
              <TextInput label="Your name" placeholder="Your name" />
            </Fieldset>
            <Fieldset legend="Unstyled variant" variant="unstyled">
              <TextInput label="Your name" placeholder="Your name" />
            </Fieldset>
          </Stack>
        </Paper>
      </ExampleSection>

      <ExampleSection
        title="Disabled State"
        description="Disabled fieldset blocks interaction with all fields inside"
        variant="showcase"
      >
        <Paper p="md" radius="md">
          <Stack spacing={16}>
            <Switch
              label="Disable fieldset"
              checked={disabled}
              onChange={setDisabled}
            />
            <Fieldset legend="Shipping address" disabled={disabled}>
              <Stack spacing={12}>
                <TextInput label="Street" placeholder="Street" />
                <TextInput label="City" placeholder="City" />
              </Stack>
            </Fieldset>
          </Stack>
        </Paper>
      </ExampleSection>

      <ExampleSection
        title="Component Props"
        description="Complete reference of all available Fieldset props"
      >
        <PropsTable props={fieldsetProps} />
      </ExampleSection>

      <ExampleSection
        title="Usage Example"
        description="Basic implementation code"
      >
        <CodeBlock
          code={`import { Fieldset, TextInput } from 'react-native-mantine';

<Fieldset legend="Personal information" variant="default" radius="md">
  <TextInput label="Your name" placeholder="Your name" />
  <TextInput label="Email" placeholder="your@email.com" />
</Fieldset>

// Disabled fieldset
<Fieldset legend="Shipping address" disabled>
  <TextInput label="Street" placeholder="Street" />
  <TextInput label="City" placeholder="City" />
</Fieldset>`}
        />
      </ExampleSection>
    </ExampleWrapper>
  );
};
