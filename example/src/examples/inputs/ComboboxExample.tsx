import { useState } from 'react';
import { ExampleWrapper, ExampleSection, CodeBlock } from '../../components/ExampleWrapper';
import { PropsTable } from '../../components/PropsTable';
import {
  comboboxProps,
  comboboxOptionProps,
  useComboboxOptions,
} from '../../data/props/ComboboxProps';
import {
  Button,
  Combobox,
  Stack,
  Text,
  useCombobox,
} from 'react-native-mantine';

const frameworks = ['React', 'Vue', 'Angular', 'Svelte', 'Solid'];

const fruits = [
  'Apples',
  'Bananas',
  'Blueberries',
  'Cherries',
  'Grapes',
  'Mangoes',
  'Oranges',
  'Strawberries',
];

export const ComboboxExample = () => {
  const basicStore = useCombobox();
  const [framework, setFramework] = useState<string | null>(null);

  const searchStore = useCombobox();
  const [search, setSearch] = useState('');
  const [fruit, setFruit] = useState<string | null>(null);

  const [plan, setPlan] = useState<string | null>(null);

  const filteredFruits = fruits.filter((item) =>
    item.toLowerCase().includes(search.trim().toLowerCase())
  );

  return (
    <ExampleWrapper
      title="Combobox"
      description="Building blocks for custom select components with a bottom-sheet dropdown"
    >
      <ExampleSection
        title="Basic Usage"
        description="useCombobox creates a store with opened, open, close and toggle. Combobox.Target toggles the dropdown on press, onOptionSubmit receives the pressed option value"
        variant="showcase"
      >
        <Stack spacing={12}>
          <Combobox store={basicStore} onOptionSubmit={setFramework}>
            <Combobox.Target>
              <Button variant="outline">
                {framework ?? 'Pick a framework'}
              </Button>
            </Combobox.Target>
            <Combobox.Dropdown>
              <Combobox.Options>
                {frameworks.map((item) => (
                  <Combobox.Option key={item} value={item}>
                    {item}
                  </Combobox.Option>
                ))}
              </Combobox.Options>
            </Combobox.Dropdown>
          </Combobox>
          <Text size="sm" color="dimmed">
            {`Submitted value: ${framework ?? 'none'}`}
          </Text>
        </Stack>
      </ExampleSection>

      <ExampleSection
        title="Searchable Options"
        description="Combobox.Search is a TextInput, filter the options with local state and render Combobox.Empty when nothing matches"
        variant="showcase"
      >
        <Combobox
          store={searchStore}
          onOptionSubmit={(value) => {
            setFruit(value);
            setSearch('');
          }}
        >
          <Combobox.Target>
            <Button variant="light" color="teal">
              {fruit ?? 'Search fruits'}
            </Button>
          </Combobox.Target>
          <Combobox.Dropdown>
            <Combobox.Search
              placeholder="Search fruits"
              value={search}
              onChangeText={setSearch}
            />
            <Combobox.Options>
              {filteredFruits.length > 0 ? (
                filteredFruits.map((item) => (
                  <Combobox.Option key={item} value={item}>
                    {item}
                  </Combobox.Option>
                ))
              ) : (
                <Combobox.Empty>Nothing found</Combobox.Empty>
              )}
            </Combobox.Options>
          </Combobox.Dropdown>
        </Combobox>
      </ExampleSection>

      <ExampleSection
        title="Disabled Option"
        description="The store prop is optional, Combobox creates one internally. Disabled options cannot be submitted"
        variant="showcase"
      >
        <Combobox onOptionSubmit={setPlan}>
          <Combobox.Target>
            <Button variant="light" color="grape">
              {plan ?? 'Choose a plan'}
            </Button>
          </Combobox.Target>
          <Combobox.Dropdown>
            <Combobox.Options>
              <Combobox.Option value="Free">Free</Combobox.Option>
              <Combobox.Option value="Pro">Pro</Combobox.Option>
              <Combobox.Option value="Enterprise" disabled>
                Enterprise (contact sales)
              </Combobox.Option>
            </Combobox.Options>
          </Combobox.Dropdown>
        </Combobox>
      </ExampleSection>

      <ExampleSection
        title="Combobox Props"
        description="Complete reference of all available Combobox props"
      >
        <PropsTable props={comboboxProps} />
      </ExampleSection>

      <ExampleSection
        title="Combobox.Option Props"
        description="Options rendered inside Combobox.Options"
      >
        <PropsTable props={comboboxOptionProps} />
      </ExampleSection>

      <ExampleSection
        title="useCombobox Options"
        description="useCombobox(options) returns a store: { opened, open, close, toggle }"
      >
        <PropsTable props={useComboboxOptions} />
      </ExampleSection>

      <ExampleSection
        title="Usage Example"
        description="Basic implementation code"
      >
        <CodeBlock
          code={`import { Combobox, useCombobox } from 'react-native-mantine';

const store = useCombobox();
const [value, setValue] = useState<string | null>(null);

<Combobox store={store} onOptionSubmit={setValue}>
  <Combobox.Target>
    <Button>{value ?? 'Pick a value'}</Button>
  </Combobox.Target>
  <Combobox.Dropdown>
    <Combobox.Search
      placeholder="Search"
      value={search}
      onChangeText={setSearch}
    />
    <Combobox.Options>
      {filtered.map((item) => (
        <Combobox.Option key={item} value={item}>
          {item}
        </Combobox.Option>
      ))}
      {filtered.length === 0 && (
        <Combobox.Empty>Nothing found</Combobox.Empty>
      )}
    </Combobox.Options>
  </Combobox.Dropdown>
</Combobox>`}
        />
      </ExampleSection>
    </ExampleWrapper>
  );
};
