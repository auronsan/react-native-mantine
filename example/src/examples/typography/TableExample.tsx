import { ScrollView } from 'react-native';
import { ExampleWrapper, ExampleSection, CodeBlock } from '../../components/ExampleWrapper';
import { PropsTable } from '../../components/PropsTable';
import { Table, Paper, Badge, Text, Stack } from 'react-native-mantine';

const tableProps = [
  {
    name: 'striped',
    type: 'boolean',
    default: 'false',
    description: 'If true, every odd row will have a gray background color',
  },
  {
    name: 'highlightOnHover',
    type: 'boolean',
    default: 'false',
    description: 'If true, rows will have a hover color (note: limited on mobile)',
  },
  {
    name: 'captionSide',
    type: "'top' | 'bottom'",
    default: "'top'",
    description: 'Table caption position',
  },
  {
    name: 'horizontalSpacing',
    type: 'MantineNumberSize',
    default: "'xs'",
    description: 'Horizontal cells spacing from theme.spacing or any valid value',
  },
  {
    name: 'verticalSpacing',
    type: 'MantineNumberSize',
    default: '7',
    description: 'Vertical cells spacing from theme.spacing or any valid value',
  },
  {
    name: 'fontSize',
    type: 'MantineNumberSize',
    default: "'sm'",
    description: 'Sets font size of all text inside table',
  },
  {
    name: 'withBorder',
    type: 'boolean',
    default: 'false',
    description: 'Add border to table',
  },
  {
    name: 'withColumnBorders',
    type: 'boolean',
    default: 'false',
    description: 'Add border to columns',
  },
  {
    name: 'horizontallyScrollable',
    type: 'boolean',
    default: 'false',
    description: 'Enable horizontal scrolling for wide tables',
  },
];

const elements = [
  { position: 6, mass: 12.011, symbol: 'C', name: 'Carbon' },
  { position: 7, mass: 14.007, symbol: 'N', name: 'Nitrogen' },
  { position: 39, mass: 88.906, symbol: 'Y', name: 'Yttrium' },
  { position: 56, mass: 137.33, symbol: 'Ba', name: 'Barium' },
  { position: 58, mass: 140.12, symbol: 'Ce', name: 'Cerium' },
];

export const TableExample = () => {
  return (
    <ExampleWrapper
      title="Table"
      description="Render data in rows and columns with support for styling and borders"
    >
      <ScrollView>
        <ExampleSection
          title="Basic Usage"
          description="Simple table with headers and data cells"
        >
          <Paper p="md" radius="md">
            <Table>
              <Table.THead>
                <Table.Tr>
                  <Table.Th>Element</Table.Th>
                  <Table.Th>Symbol</Table.Th>
                  <Table.Th>Mass</Table.Th>
                </Table.Tr>
              </Table.THead>
              <Table.TBody>
                <Table.Tr>
                  <Table.Td>Carbon</Table.Td>
                  <Table.Td>C</Table.Td>
                  <Table.Td>12.011</Table.Td>
                </Table.Tr>
                <Table.Tr>
                  <Table.Td>Nitrogen</Table.Td>
                  <Table.Td>N</Table.Td>
                  <Table.Td>14.007</Table.Td>
                </Table.Tr>
                <Table.Tr>
                  <Table.Td>Yttrium</Table.Td>
                  <Table.Td>Y</Table.Td>
                  <Table.Td>88.906</Table.Td>
                </Table.Tr>
              </Table.TBody>
            </Table>
          </Paper>
        </ExampleSection>

        <ExampleSection
          title="With Border"
          description="Add borders to table"
        >
          <Paper p="md" radius="md">
            <Table withBorder>
              <Table.THead>
                <Table.Tr>
                  <Table.Th>Name</Table.Th>
                  <Table.Th>Symbol</Table.Th>
                  <Table.Th>Mass</Table.Th>
                </Table.Tr>
              </Table.THead>
              <Table.TBody>
                {elements.map((element) => (
                  <Table.Tr key={element.name}>
                    <Table.Td>{element.name}</Table.Td>
                    <Table.Td>{element.symbol}</Table.Td>
                    <Table.Td>{element.mass}</Table.Td>
                  </Table.Tr>
                ))}
              </Table.TBody>
            </Table>
          </Paper>
        </ExampleSection>

        <ExampleSection
          title="Striped Rows"
          description="Alternate row background colors"
        >
          <Paper p="md" radius="md">
            <Table striped withBorder>
              <Table.THead>
                <Table.Tr>
                  <Table.Th>Position</Table.Th>
                  <Table.Th>Name</Table.Th>
                  <Table.Th>Symbol</Table.Th>
                  <Table.Th>Mass</Table.Th>
                </Table.Tr>
              </Table.THead>
              <Table.TBody>
                {elements.map((element) => (
                  <Table.Tr key={element.name}>
                    <Table.Td>{element.position}</Table.Td>
                    <Table.Td>{element.name}</Table.Td>
                    <Table.Td>{element.symbol}</Table.Td>
                    <Table.Td>{element.mass}</Table.Td>
                  </Table.Tr>
                ))}
              </Table.TBody>
            </Table>
          </Paper>
        </ExampleSection>

        <ExampleSection
          title="With Column Borders"
          description="Add vertical borders between columns"
        >
          <Paper p="md" radius="md">
            <Table withBorder withColumnBorders>
              <Table.THead>
                <Table.Tr>
                  <Table.Th>Element</Table.Th>
                  <Table.Th>Symbol</Table.Th>
                  <Table.Th>Mass</Table.Th>
                </Table.Tr>
              </Table.THead>
              <Table.TBody>
                {elements.slice(0, 3).map((element) => (
                  <Table.Tr key={element.name}>
                    <Table.Td>{element.name}</Table.Td>
                    <Table.Td>{element.symbol}</Table.Td>
                    <Table.Td>{element.mass}</Table.Td>
                  </Table.Tr>
                ))}
              </Table.TBody>
            </Table>
          </Paper>
        </ExampleSection>

        <ExampleSection
          title="Custom Spacing"
          description="Control horizontal and vertical cell spacing"
        >
          <Paper p="md" radius="md">
            <Table
              withBorder
              horizontalSpacing="xl"
              verticalSpacing="md"
            >
              <Table.THead>
                <Table.Tr>
                  <Table.Th>Element</Table.Th>
                  <Table.Th>Symbol</Table.Th>
                </Table.Tr>
              </Table.THead>
              <Table.TBody>
                <Table.Tr>
                  <Table.Td>Carbon</Table.Td>
                  <Table.Td>C</Table.Td>
                </Table.Tr>
                <Table.Tr>
                  <Table.Td>Nitrogen</Table.Td>
                  <Table.Td>N</Table.Td>
                </Table.Tr>
              </Table.TBody>
            </Table>
          </Paper>
        </ExampleSection>

        <ExampleSection
          title="Custom Font Size"
          description="Adjust text size within table"
        >
          <Paper p="md" radius="md">
            <Stack spacing={16}>
              <Table withBorder fontSize="xs">
                <Table.THead>
                  <Table.Tr>
                    <Table.Th>Small Text (xs)</Table.Th>
                    <Table.Th>Symbol</Table.Th>
                  </Table.Tr>
                </Table.THead>
                <Table.TBody>
                  <Table.Tr>
                    <Table.Td>Carbon</Table.Td>
                    <Table.Td>C</Table.Td>
                  </Table.Tr>
                </Table.TBody>
              </Table>

              <Table withBorder fontSize="lg">
                <Table.THead>
                  <Table.Tr>
                    <Table.Th>Large Text (lg)</Table.Th>
                    <Table.Th>Symbol</Table.Th>
                  </Table.Tr>
                </Table.THead>
                <Table.TBody>
                  <Table.Tr>
                    <Table.Td>Carbon</Table.Td>
                    <Table.Td>C</Table.Td>
                  </Table.Tr>
                </Table.TBody>
              </Table>
            </Stack>
          </Paper>
        </ExampleSection>

        <ExampleSection
          title="With Caption"
          description="Add a caption to describe the table"
        >
          <Paper p="md" radius="md">
            <Table withBorder captionSide="top">
              <Table.Caption>Chemical Elements</Table.Caption>
              <Table.THead>
                <Table.Tr>
                  <Table.Th>Element</Table.Th>
                  <Table.Th>Symbol</Table.Th>
                </Table.Tr>
              </Table.THead>
              <Table.TBody>
                <Table.Tr>
                  <Table.Td>Carbon</Table.Td>
                  <Table.Td>C</Table.Td>
                </Table.Tr>
                <Table.Tr>
                  <Table.Td>Nitrogen</Table.Td>
                  <Table.Td>N</Table.Td>
                </Table.Tr>
              </Table.TBody>
            </Table>
          </Paper>
        </ExampleSection>

        <ExampleSection
          title="Caption at Bottom"
          description="Position caption below the table"
        >
          <Paper p="md" radius="md">
            <Table withBorder captionSide="bottom">
              <Table.Caption>Source: Periodic Table of Elements</Table.Caption>
              <Table.THead>
                <Table.Tr>
                  <Table.Th>Element</Table.Th>
                  <Table.Th>Symbol</Table.Th>
                </Table.Tr>
              </Table.THead>
              <Table.TBody>
                <Table.Tr>
                  <Table.Td>Carbon</Table.Td>
                  <Table.Td>C</Table.Td>
                </Table.Tr>
              </Table.TBody>
            </Table>
          </Paper>
        </ExampleSection>

        <ExampleSection
          title="With Custom Content"
          description="Use React Native components inside table cells"
        >
          <Paper p="md" radius="md">
            <Table withBorder>
              <Table.THead>
                <Table.Tr>
                  <Table.Th>Element</Table.Th>
                  <Table.Th>Symbol</Table.Th>
                  <Table.Th>Status</Table.Th>
                </Table.Tr>
              </Table.THead>
              <Table.TBody>
                <Table.Tr>
                  <Table.Td>
                    <Text weight={600}>Carbon</Text>
                  </Table.Td>
                  <Table.Td>C</Table.Td>
                  <Table.Td>
                    <Badge color="green" variant="filled">Active</Badge>
                  </Table.Td>
                </Table.Tr>
                <Table.Tr>
                  <Table.Td>
                    <Text weight={600}>Nitrogen</Text>
                  </Table.Td>
                  <Table.Td>N</Table.Td>
                  <Table.Td>
                    <Badge color="blue" variant="filled">Stable</Badge>
                  </Table.Td>
                </Table.Tr>
                <Table.Tr>
                  <Table.Td>
                    <Text weight={600}>Yttrium</Text>
                  </Table.Td>
                  <Table.Td>Y</Table.Td>
                  <Table.Td>
                    <Badge color="orange" variant="filled">Rare</Badge>
                  </Table.Td>
                </Table.Tr>
              </Table.TBody>
            </Table>
          </Paper>
        </ExampleSection>

        <ExampleSection
          title="Horizontally Scrollable"
          description="Enable horizontal scrolling for wide tables"
        >
          <Paper p="md" radius="md">
            <Table withBorder horizontallyScrollable>
              <Table.THead>
                <Table.Tr>
                  <Table.Th>Position</Table.Th>
                  <Table.Th>Element Name</Table.Th>
                  <Table.Th>Symbol</Table.Th>
                  <Table.Th>Atomic Mass</Table.Th>
                  <Table.Th>Discovered</Table.Th>
                  <Table.Th>Category</Table.Th>
                </Table.Tr>
              </Table.THead>
              <Table.TBody>
                <Table.Tr>
                  <Table.Td>6</Table.Td>
                  <Table.Td>Carbon</Table.Td>
                  <Table.Td>C</Table.Td>
                  <Table.Td>12.011</Table.Td>
                  <Table.Td>Ancient</Table.Td>
                  <Table.Td>Nonmetal</Table.Td>
                </Table.Tr>
                <Table.Tr>
                  <Table.Td>7</Table.Td>
                  <Table.Td>Nitrogen</Table.Td>
                  <Table.Td>N</Table.Td>
                  <Table.Td>14.007</Table.Td>
                  <Table.Td>1772</Table.Td>
                  <Table.Td>Nonmetal</Table.Td>
                </Table.Tr>
              </Table.TBody>
            </Table>
          </Paper>
        </ExampleSection>

        <ExampleSection
          title="Component Props"
          description="Complete reference of all available Table props"
        >
          <PropsTable props={tableProps} />
        </ExampleSection>

        <ExampleSection
          title="Usage Example"
          description="Basic implementation code"
        >
          <CodeBlock
            code={`import { Table } from 'react-native-mantine';

// Basic table
<Table>
  <Table.THead>
    <Table.Tr>
      <Table.Th>Name</Table.Th>
      <Table.Th>Symbol</Table.Th>
      <Table.Th>Mass</Table.Th>
    </Table.Tr>
  </Table.THead>
  <Table.TBody>
    <Table.Tr>
      <Table.Td>Carbon</Table.Td>
      <Table.Td>C</Table.Td>
      <Table.Td>12.011</Table.Td>
    </Table.Tr>
    <Table.Tr>
      <Table.Td>Nitrogen</Table.Td>
      <Table.Td>N</Table.Td>
      <Table.Td>14.007</Table.Td>
    </Table.Tr>
  </Table.TBody>
</Table>

// With all features
<Table
  striped
  withBorder
  withColumnBorders
  horizontalSpacing="md"
  verticalSpacing="sm"
  fontSize="md"
>
  <Table.Caption>Chemical Elements</Table.Caption>
  <Table.THead>
    <Table.Tr>
      <Table.Th>Element</Table.Th>
      <Table.Th>Symbol</Table.Th>
    </Table.Tr>
  </Table.THead>
  <Table.TBody>
    {elements.map((element) => (
      <Table.Tr key={element.name}>
        <Table.Td>{element.name}</Table.Td>
        <Table.Td>{element.symbol}</Table.Td>
      </Table.Tr>
    ))}
  </Table.TBody>
</Table>`}
          />
        </ExampleSection>
      </ScrollView>
    </ExampleWrapper>
  );
};
