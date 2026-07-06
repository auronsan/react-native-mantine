import { useState } from 'react';
import { ExampleWrapper, ExampleSection, CodeBlock } from '../../components/ExampleWrapper';
import { PropsTable } from '../../components/PropsTable';
import { tagsInputProps } from '../../data/props/TagsInputProps';
import { Paper, Stack, TagsInput, Text } from 'react-native-mantine';

export const TagsInputExample = () => {
  const [tags, setTags] = useState<string[]>(['react', 'react-native']);

  return (
    <ExampleWrapper
      title="TagsInput"
      description="Enter tags with suggestions support"
    >
      <ExampleSection
        title="Basic Usage"
        description="Type a tag and press enter or a comma to add it"
      >
        <Paper p="md" radius="md">
          <TagsInput
            label="Press enter to add a tag"
            description="Backspace removes the last tag"
            placeholder="Enter tag"
            defaultValue={['first', 'second']}
          />
        </Paper>
      </ExampleSection>

      <ExampleSection
        title="Controlled with Suggestions"
        description="TagsInput with controlled value, suggestions dropdown and clear button"
        variant="showcase"
      >
        <Paper p="md" radius="md">
          <TagsInput
            label="Technologies"
            placeholder="Pick or type technologies"
            data={['React', 'Angular', 'Vue', 'Svelte', 'Solid', 'Qwik']}
            value={tags}
            onChange={setTags}
            clearable
            nothingFoundMessage="Nothing found..."
          />
          <Stack spacing={8} mt="md">
            <Text size="sm" weight="600">Selected tags:</Text>
            <Text size="sm" color="dimmed">
              {tags.length > 0 ? tags.join(', ') : 'No tags yet'}
            </Text>
          </Stack>
        </Paper>
      </ExampleSection>

      <ExampleSection
        title="Max Tags and Split Characters"
        description="Limit the number of tags and split input on custom characters"
      >
        <Paper p="md" radius="md">
          <Stack spacing={16}>
            <TagsInput
              label="Up to 3 tags"
              description="No more than 3 tags are accepted"
              placeholder="Enter tag"
              maxTags={3}
            />
            <TagsInput
              label="Split on comma, space and pipe"
              placeholder="Enter tag"
              splitChars={[',', ' ', '|']}
            />
            <TagsInput
              label="With error"
              placeholder="Enter tag"
              error="Invalid tags"
              required
            />
          </Stack>
        </Paper>
      </ExampleSection>

      <ExampleSection
        title="Component Props"
        description="Complete reference of all available TagsInput props"
      >
        <PropsTable props={tagsInputProps} />
      </ExampleSection>

      <ExampleSection
        title="Usage Example"
        description="Basic implementation code"
      >
        <CodeBlock
          code={`import { TagsInput } from 'react-native-mantine';

const [tags, setTags] = useState<string[]>([]);

<TagsInput
  label="Technologies"
  placeholder="Pick or type technologies"
  data={['React', 'Angular', 'Vue', 'Svelte']}
  value={tags}
  onChange={setTags}
  maxTags={5}
  splitChars={[',', ' ']}
  clearable
  nothingFoundMessage="Nothing found..."
/>`}
        />
      </ExampleSection>
    </ExampleWrapper>
  );
};
