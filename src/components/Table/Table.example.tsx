import { View } from 'react-native';
import { Table } from './index';

/**
 * Example demonstrating the fixed Table component with proper column alignment.
 *
 * The fix addresses the following issues:
 * 1. Removed flex: 1 from cells which caused equal spacing regardless of content
 * 2. Implemented automatic column width calculation using onLayout callbacks
 * 3. Each column now uses the maximum width of all cells in that column
 * 4. Columns align properly across all rows (thead, tbody, tfoot)
 */

const elements = [
  { position: 6, mass: 12.011, symbol: 'C', name: 'Carbon' },
  { position: 7, mass: 14.007, symbol: 'N', name: 'Nitrogen' },
  { position: 39, mass: 88.906, symbol: 'Y', name: 'Yttrium' },
  { position: 56, mass: 137.33, symbol: 'Ba', name: 'Barium' },
  { position: 58, mass: 140.12, symbol: 'Ce', name: 'Cerium' },
];

export function TableExample() {
  return (
    <View style={{ padding: 40 }}>
      <Table
        verticalSpacing="md"
        horizontalSpacing="md"
        fontSize="sm"
        striped
        withBorder
        withColumnBorders
      >
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Element position</Table.Th>
            <Table.Th>Element name</Table.Th>
            <Table.Th>Symbol</Table.Th>
            <Table.Th>Atomic mass</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {elements.map((element) => (
            <Table.Tr key={element.name}>
              <Table.Td>{element.position}</Table.Td>
              <Table.Td>{element.name}</Table.Td>
              <Table.Td>{element.symbol}</Table.Td>
              <Table.Td>{element.mass}</Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </View>
  );
}

export function TableWithVariableContent() {
  return (
    <View style={{ padding: 40 }}>
      <Table withBorder withColumnBorders>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Short</Table.Th>
            <Table.Th>Medium length header</Table.Th>
            <Table.Th>Very long header text that spans multiple words</Table.Th>
            <Table.Th>ID</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          <Table.Tr>
            <Table.Td>A</Table.Td>
            <Table.Td>Medium content here</Table.Td>
            <Table.Td>Short</Table.Td>
            <Table.Td>1</Table.Td>
          </Table.Tr>
          <Table.Tr>
            <Table.Td>B</Table.Td>
            <Table.Td>Short</Table.Td>
            <Table.Td>This is a very long content that should make the column wider</Table.Td>
            <Table.Td>2</Table.Td>
          </Table.Tr>
        </Table.Tbody>
      </Table>
    </View>
  );
}
