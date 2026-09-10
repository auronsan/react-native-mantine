import { useState } from 'react';
import { ExampleWrapper, ExampleSection, CodeBlock } from '../../components/ExampleWrapper';
import { PropsTable } from '../../components/PropsTable';
import { multiSelectProps } from '../../data/props/MultiSelectProps';
import { MultiSelect, Paper, Stack, Text } from 'react-native-mantine';

export const MultiSelectExample = () => {
  const [frameworks, setFrameworks] = useState<string[]>([]);
  const [languages, setLanguages] = useState<string[]>(['typescript', 'javascript']);
  const [skills, setSkills] = useState<string[]>([]);

  return (
    <ExampleWrapper
      title="MultiSelect"
      description="Multi-option select with tags"
    >
      <ExampleSection
        title="Basic Usage"
        description="Select multiple frameworks"
        variant="showcase"
      >
        <Paper p="md" radius="md" withBorder>
          <MultiSelect
            label="Choose frameworks"
            description="Select your favorite frameworks"
            data={['React', 'Angular', 'Vue', 'Svelte', 'Next.js', 'Gatsby', 'Remix', 'Astro']}
            placeholder="Pick multiple"
            value={frameworks}
            onChange={setFrameworks}
          />
          <Stack spacing={8} mt="md">
            <Text size="sm" weight="600">Selected:</Text>
            <Text size="sm" color="dimmed">
              {frameworks.length > 0 ? frameworks.join(', ') : 'None selected'}
            </Text>
          </Stack>
        </Paper>
      </ExampleSection>

      <ExampleSection
        title="Usage"
        description="Minimal copy-pasteable example"
      >
        <CodeBlock
          code={`import { useState } from 'react';
import { MultiSelect } from 'react-native-mantine';

const [value, setValue] = useState<string[]>([]);

<MultiSelect
  label="Choose frameworks"
  placeholder="Pick multiple"
  data={['React', 'Angular', 'Vue', 'Svelte']}
  value={value}
  onChange={setValue}
  searchable
  clearable
/>`}
        />
      </ExampleSection>

      <ExampleSection
        title="Searchable"
        description="MultiSelect with search functionality"
      >
        <Paper p="md" radius="md">
          <MultiSelect
            label="Programming Languages"
            data={[
              'TypeScript',
              'JavaScript',
              'Python',
              'Java',
              'Go',
              'Rust',
              'C++',
              'C#',
              'Ruby',
              'PHP',
              'Swift',
              'Kotlin',
            ]}
            placeholder="Search and select languages"
            searchable
            value={languages}
            onChange={setLanguages}
            clearable
          />
        </Paper>
      </ExampleSection>

      <ExampleSection
        title="With Groups"
        description="Grouped options with custom data"
      >
        <Paper p="md" radius="md">
          <MultiSelect
            label="Skills"
            data={[
              { value: 'react', label: 'React', group: 'Frontend' },
              { value: 'vue', label: 'Vue', group: 'Frontend' },
              { value: 'angular', label: 'Angular', group: 'Frontend' },
              { value: 'node', label: 'Node.js', group: 'Backend' },
              { value: 'express', label: 'Express', group: 'Backend' },
              { value: 'django', label: 'Django', group: 'Backend' },
              { value: 'postgres', label: 'PostgreSQL', group: 'Database' },
              { value: 'mongodb', label: 'MongoDB', group: 'Database' },
              { value: 'redis', label: 'Redis', group: 'Database' },
            ]}
            placeholder="Select your skills"
            value={skills}
            onChange={setSkills}
            searchable
            maxSelectedValues={3}
          />
        </Paper>
      </ExampleSection>

      <ExampleSection
        title="Colors"
        description="Different color variants"
      >
        <Paper p="md" radius="md">
          <Stack spacing={16}>
            <MultiSelect
              label="Grape"
              data={['Option 1', 'Option 2', 'Option 3']}
              placeholder="Select options"
              color="grape"
            />
            <MultiSelect
              label="Teal"
              data={['Option 1', 'Option 2', 'Option 3']}
              placeholder="Select options"
              color="teal"
            />
          </Stack>
        </Paper>
      </ExampleSection>

      <ExampleSection
        title="Component Props"
        description="Complete reference of all available MultiSelect props"
      >
        <PropsTable props={multiSelectProps} />
      </ExampleSection>
    </ExampleWrapper>
  );
};
