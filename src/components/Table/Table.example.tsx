import { View } from 'react-native';
import { Table } from './index';

/**
 * Example demonstrating the Table component with proper column alignment and flex support.
 *
 * Features demonstrated:
 * 1. Proper column alignment using automatic width calculation
 * 2. Flex props support to expand table to fill available container space vertically
 * 3. Each column uses the maximum width of all cells in that column
 * 4. Columns align properly across all rows (thead, tbody, tfoot)
 * 5. Horizontal scrolling enabled for tables wider than container
 * 6. Proper flex layout with wrapper BoxView and inner ScrollView
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

/**
 * Example demonstrating flex props to make table expand to fill container.
 * The table wrapper will stretch to fill the available vertical space when flex={1} is set.
 * The outer BoxView wrapper receives the flex properties, allowing proper vertical expansion.
 */
export function TableWithFlexContainer() {
  return (
    <View style={{ flex: 1, padding: 20, backgroundColor: '#f0f0f0' }}>
      {/* Container with fixed height to demonstrate flex behavior */}
      <View style={{ height: 400, backgroundColor: '#fff', borderRadius: 8, overflow: 'hidden' }}>
        <Table
          flex={1}
          verticalSpacing="sm"
          horizontalSpacing="sm"
          fontSize="sm"
          withBorder
          withColumnBorders
          striped
        >
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Product</Table.Th>
              <Table.Th>Category</Table.Th>
              <Table.Th>Price</Table.Th>
              <Table.Th>Stock</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            <Table.Tr>
              <Table.Td>Widget A</Table.Td>
              <Table.Td>Electronics</Table.Td>
              <Table.Td>$29.99</Table.Td>
              <Table.Td>150</Table.Td>
            </Table.Tr>
            <Table.Tr>
              <Table.Td>Widget B</Table.Td>
              <Table.Td>Hardware</Table.Td>
              <Table.Td>$49.99</Table.Td>
              <Table.Td>75</Table.Td>
            </Table.Tr>
            <Table.Tr>
              <Table.Td>Widget C</Table.Td>
              <Table.Td>Software</Table.Td>
              <Table.Td>$99.99</Table.Td>
              <Table.Td>200</Table.Td>
            </Table.Tr>
          </Table.Tbody>
        </Table>
      </View>
    </View>
  );
}

/**
 * Example demonstrating different flex configurations.
 * Shows how flexGrow, flexShrink, and flexBasis can be used for fine-tuned control.
 */
export function TableWithAdvancedFlex() {
  return (
    <View style={{ flex: 1, padding: 20, backgroundColor: '#f5f5f5' }}>
      {/* Container with fixed height to demonstrate flex behavior */}
      <View style={{ height: 600, flexDirection: 'column', gap: 16 }}>
        {/* Table 1: Using flex={1} - takes 1 part of available space */}
        <View style={{ flex: 1, backgroundColor: '#fff', borderRadius: 8, overflow: 'hidden' }}>
          <Table
            flex={1}
            withBorder
            withColumnBorders
            caption="Table with flex={1}"
          >
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Name</Table.Th>
                <Table.Th>Status</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              <Table.Tr>
                <Table.Td>Item 1</Table.Td>
                <Table.Td>Active</Table.Td>
              </Table.Tr>
              <Table.Tr>
                <Table.Td>Item 2</Table.Td>
                <Table.Td>Pending</Table.Td>
              </Table.Tr>
            </Table.Tbody>
          </Table>
        </View>

        {/* Table 2: Using flex={2} - takes 2 parts of available space */}
        <View style={{ flex: 2, backgroundColor: '#fff', borderRadius: 8, overflow: 'hidden' }}>
          <Table
            flex={1}
            withBorder
            withColumnBorders
            striped
            caption="Table with flex={1} (in flex: 2 container)"
          >
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Task</Table.Th>
                <Table.Th>Priority</Table.Th>
                <Table.Th>Assignee</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              <Table.Tr>
                <Table.Td>Design review</Table.Td>
                <Table.Td>High</Table.Td>
                <Table.Td>Alice</Table.Td>
              </Table.Tr>
              <Table.Tr>
                <Table.Td>Code review</Table.Td>
                <Table.Td>Medium</Table.Td>
                <Table.Td>Bob</Table.Td>
              </Table.Tr>
              <Table.Tr>
                <Table.Td>Testing</Table.Td>
                <Table.Td>Low</Table.Td>
                <Table.Td>Carol</Table.Td>
              </Table.Tr>
            </Table.Tbody>
          </Table>
        </View>
      </View>
    </View>
  );
}
