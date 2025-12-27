import { ScrollView, View } from 'react-native';
import {
  Table,
  Paper,
  Title,
  Text,
  Badge,
  createStyles,
} from 'react-native-mantine';

/**
 * TableTestScreen - Comprehensive test file for Table component alignment
 *
 * This screen validates that the recent Table component fixes properly address
 * column alignment issues between headers (th) and data cells (td).
 *
 * Test Coverage:
 * 1. Basic alignment with consistent content
 * 2. Variable content lengths to stress-test alignment
 * 3. Visual borders to confirm alignment
 * 4. Empty cells edge case
 * 5. Very long content handling
 * 6. Mixed content types (text, numbers, badges)
 * 7. Multiple columns with different width requirements
 */
export const TableTestScreen = () => {
  const { styles } = useStyles();

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Title order={1} style={styles.pageTitle}>
          Table Alignment Tests
        </Title>
        <Text style={styles.pageSubtitle}>
          Comprehensive validation of column alignment fixes
        </Text>
      </View>

      <View style={styles.content}>
        {/* Test 1: Basic Alignment Test */}
        <View style={styles.testSection}>
          <Title order={2} style={styles.testTitle}>
            Test 1: Basic Column Alignment
          </Title>
          <Text style={styles.testDescription}>
            Validates that headers and data cells align vertically with
            consistent content. Each column should have uniform width across all
            rows.
          </Text>
          <Paper p="md" radius="md" withBorder style={styles.testCard}>
            <Table withBorder withColumnBorders>
              <Table.Thead>
                <Table.Tr>
                  <Table.Th>ID</Table.Th>
                  <Table.Th>Name</Table.Th>
                  <Table.Th>Age</Table.Th>
                  <Table.Th>City</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                <Table.Tr>
                  <Table.Td>001</Table.Td>
                  <Table.Td>Alice</Table.Td>
                  <Table.Td>28</Table.Td>
                  <Table.Td>New York</Table.Td>
                </Table.Tr>
                <Table.Tr>
                  <Table.Td>002</Table.Td>
                  <Table.Td>Bob</Table.Td>
                  <Table.Td>35</Table.Td>
                  <Table.Td>Chicago</Table.Td>
                </Table.Tr>
                <Table.Tr>
                  <Table.Td>003</Table.Td>
                  <Table.Td>Carol</Table.Td>
                  <Table.Td>42</Table.Td>
                  <Table.Td>Boston</Table.Td>
                </Table.Tr>
              </Table.Tbody>
            </Table>
            <Text style={styles.expectedResult}>
              ✓ Expected: All columns aligned, borders form perfect grid
            </Text>
          </Paper>
        </View>

        {/* Test 2: Variable Content Lengths */}
        <View style={styles.testSection}>
          <Title order={2} style={styles.testTitle}>
            Test 2: Variable Content Lengths
          </Title>
          <Text style={styles.testDescription}>
            Tests alignment with significantly different content lengths in each
            column. The widest content in each column should determine column
            width.
          </Text>
          <Paper p="md" radius="md" withBorder style={styles.testCard}>
            <Table withBorder withColumnBorders>
              <Table.Thead>
                <Table.Tr>
                  <Table.Th>Short</Table.Th>
                  <Table.Th>Medium Length Header</Table.Th>
                  <Table.Th>Very Long Header Text That Extends</Table.Th>
                  <Table.Th>ID</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                <Table.Tr>
                  <Table.Td>A</Table.Td>
                  <Table.Td>Medium</Table.Td>
                  <Table.Td>Short content here</Table.Td>
                  <Table.Td>1</Table.Td>
                </Table.Tr>
                <Table.Tr>
                  <Table.Td>AB</Table.Td>
                  <Table.Td>Med</Table.Td>
                  <Table.Td>
                    This is the longest content in this column and should set
                    width
                  </Table.Td>
                  <Table.Td>22</Table.Td>
                </Table.Tr>
                <Table.Tr>
                  <Table.Td>ABC</Table.Td>
                  <Table.Td>This is longest in this col</Table.Td>
                  <Table.Td>Short</Table.Td>
                  <Table.Td>333</Table.Td>
                </Table.Tr>
                <Table.Tr>
                  <Table.Td>D</Table.Td>
                  <Table.Td>Tiny</Table.Td>
                  <Table.Td>Medium length</Table.Td>
                  <Table.Td>4444</Table.Td>
                </Table.Tr>
              </Table.Tbody>
            </Table>
            <Text style={styles.expectedResult}>
              ✓ Expected: Columns expand to fit widest content, all cells in
              same column have equal width
            </Text>
          </Paper>
        </View>

        {/* Test 3: Empty Cells Edge Case */}
        <View style={styles.testSection}>
          <Title order={2} style={styles.testTitle}>
            Test 3: Empty Cells Handling
          </Title>
          <Text style={styles.testDescription}>
            Validates that empty cells maintain proper alignment and don't cause
            layout issues.
          </Text>
          <Paper p="md" radius="md" withBorder style={styles.testCard}>
            <Table withBorder withColumnBorders striped>
              <Table.Thead>
                <Table.Tr>
                  <Table.Th>Product</Table.Th>
                  <Table.Th>Description</Table.Th>
                  <Table.Th>Price</Table.Th>
                  <Table.Th>Notes</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                <Table.Tr>
                  <Table.Td>Widget A</Table.Td>
                  <Table.Td>Standard widget</Table.Td>
                  <Table.Td>$19.99</Table.Td>
                  <Table.Td>In stock</Table.Td>
                </Table.Tr>
                <Table.Tr>
                  <Table.Td>Widget B</Table.Td>
                  <Table.Td></Table.Td>
                  <Table.Td>$29.99</Table.Td>
                  <Table.Td></Table.Td>
                </Table.Tr>
                <Table.Tr>
                  <Table.Td></Table.Td>
                  <Table.Td>Premium widget with extra features</Table.Td>
                  <Table.Td></Table.Td>
                  <Table.Td>Limited availability</Table.Td>
                </Table.Tr>
                <Table.Tr>
                  <Table.Td>Widget C</Table.Td>
                  <Table.Td>Budget option</Table.Td>
                  <Table.Td>$9.99</Table.Td>
                  <Table.Td></Table.Td>
                </Table.Tr>
              </Table.Tbody>
            </Table>
            <Text style={styles.expectedResult}>
              ✓ Expected: Empty cells maintain column width, borders remain
              aligned
            </Text>
          </Paper>
        </View>

        {/* Test 4: Very Long Content */}
        <View style={styles.testSection}>
          <Title order={2} style={styles.testTitle}>
            Test 4: Very Long Content
          </Title>
          <Text style={styles.testDescription}>
            Tests how the table handles very long text content that could
            potentially break layout.
          </Text>
          <Paper p="md" radius="md" withBorder style={styles.testCard}>
            <Table withBorder withColumnBorders fontSize="sm">
              <Table.Thead>
                <Table.Tr>
                  <Table.Th>Short</Table.Th>
                  <Table.Th>Long Content Column</Table.Th>
                  <Table.Th>Normal</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                <Table.Tr>
                  <Table.Td>A1</Table.Td>
                  <Table.Td>
                    This is an extremely long piece of text content designed to
                    test how the table component handles very long strings that
                    might wrap or extend beyond normal bounds
                  </Table.Td>
                  <Table.Td>Normal</Table.Td>
                </Table.Tr>
                <Table.Tr>
                  <Table.Td>B2</Table.Td>
                  <Table.Td>Short text</Table.Td>
                  <Table.Td>Normal</Table.Td>
                </Table.Tr>
                <Table.Tr>
                  <Table.Td>C3</Table.Td>
                  <Table.Td>
                    Another extremely long piece of content that should maintain
                    consistent column width with the longest content above to
                    ensure proper alignment across all rows
                  </Table.Td>
                  <Table.Td>Normal</Table.Td>
                </Table.Tr>
              </Table.Tbody>
            </Table>
            <Text style={styles.expectedResult}>
              ✓ Expected: Long content determines column width, all cells in
              column match this width
            </Text>
          </Paper>
        </View>

        {/* Test 5: Mixed Content Types */}
        <View style={styles.testSection}>
          <Title order={2} style={styles.testTitle}>
            Test 5: Mixed Content Types
          </Title>
          <Text style={styles.testDescription}>
            Validates alignment with different content types including text,
            numbers, and components (Badges).
          </Text>
          <Paper p="md" radius="md" withBorder style={styles.testCard}>
            <Table withBorder withColumnBorders>
              <Table.Thead>
                <Table.Tr>
                  <Table.Th>Employee</Table.Th>
                  <Table.Th>Salary</Table.Th>
                  <Table.Th>Status</Table.Th>
                  <Table.Th>Rating</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                <Table.Tr>
                  <Table.Td>John Smith</Table.Td>
                  <Table.Td>$95,000</Table.Td>
                  <Table.Td>
                    <Badge color="green" size="sm">
                      Active
                    </Badge>
                  </Table.Td>
                  <Table.Td>4.8</Table.Td>
                </Table.Tr>
                <Table.Tr>
                  <Table.Td>Jane Doe</Table.Td>
                  <Table.Td>$110,000</Table.Td>
                  <Table.Td>
                    <Badge color="green" size="sm">
                      Active
                    </Badge>
                  </Table.Td>
                  <Table.Td>4.9</Table.Td>
                </Table.Tr>
                <Table.Tr>
                  <Table.Td>Bob Johnson</Table.Td>
                  <Table.Td>$85,000</Table.Td>
                  <Table.Td>
                    <Badge color="orange" size="sm">
                      On Leave
                    </Badge>
                  </Table.Td>
                  <Table.Td>4.5</Table.Td>
                </Table.Tr>
                <Table.Tr>
                  <Table.Td>Alice Williams</Table.Td>
                  <Table.Td>$105,000</Table.Td>
                  <Table.Td>
                    <Badge color="red" size="sm">
                      Inactive
                    </Badge>
                  </Table.Td>
                  <Table.Td>4.2</Table.Td>
                </Table.Tr>
              </Table.Tbody>
            </Table>
            <Text style={styles.expectedResult}>
              ✓ Expected: Mixed content types (text, formatted numbers, badges)
              maintain alignment
            </Text>
          </Paper>
        </View>

        {/* Test 6: Many Columns */}
        <View style={styles.testSection}>
          <Title order={2} style={styles.testTitle}>
            Test 6: Many Columns Test
          </Title>
          <Text style={styles.testDescription}>
            Tests alignment with many columns to ensure the width tracking
            system works at scale. Horizontal scrolling should work smoothly.
          </Text>
          <Paper p="md" radius="md" withBorder style={styles.testCard}>
            <Table withBorder withColumnBorders fontSize="xs">
              <Table.Thead>
                <Table.Tr>
                  <Table.Th>Col 1</Table.Th>
                  <Table.Th>Col 2</Table.Th>
                  <Table.Th>Col 3</Table.Th>
                  <Table.Th>Col 4</Table.Th>
                  <Table.Th>Col 5</Table.Th>
                  <Table.Th>Col 6</Table.Th>
                  <Table.Th>Col 7</Table.Th>
                  <Table.Th>Col 8</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                <Table.Tr>
                  <Table.Td>A1</Table.Td>
                  <Table.Td>B1 Long</Table.Td>
                  <Table.Td>C1</Table.Td>
                  <Table.Td>D1</Table.Td>
                  <Table.Td>E1</Table.Td>
                  <Table.Td>F1 Very Long Content</Table.Td>
                  <Table.Td>G1</Table.Td>
                  <Table.Td>H1</Table.Td>
                </Table.Tr>
                <Table.Tr>
                  <Table.Td>A2 Longer</Table.Td>
                  <Table.Td>B2</Table.Td>
                  <Table.Td>C2 Medium</Table.Td>
                  <Table.Td>D2</Table.Td>
                  <Table.Td>E2 Long Text</Table.Td>
                  <Table.Td>F2</Table.Td>
                  <Table.Td>G2</Table.Td>
                  <Table.Td>H2 Extra Long</Table.Td>
                </Table.Tr>
                <Table.Tr>
                  <Table.Td>A3</Table.Td>
                  <Table.Td>B3</Table.Td>
                  <Table.Td>C3</Table.Td>
                  <Table.Td>D3 Longest in Column</Table.Td>
                  <Table.Td>E3</Table.Td>
                  <Table.Td>F3</Table.Td>
                  <Table.Td>G3 Medium</Table.Td>
                  <Table.Td>H3</Table.Td>
                </Table.Tr>
              </Table.Tbody>
            </Table>
            <Text style={styles.expectedResult}>
              ✓ Expected: All 8 columns maintain alignment, scroll horizontally
              to view all columns
            </Text>
          </Paper>
        </View>

        {/* Test 7: With Footer and Different Spacing */}
        <View style={styles.testSection}>
          <Title order={2} style={styles.testTitle}>
            Test 7: Footer + Custom Spacing
          </Title>
          <Text style={styles.testDescription}>
            Validates alignment with footer section (Tfoot) and custom spacing
            settings. Footer cells should align with body and header cells.
          </Text>
          <Paper p="md" radius="md" withBorder style={styles.testCard}>
            <Table
              withBorder
              withColumnBorders
              horizontalSpacing="md"
              verticalSpacing="md"
              fontSize="md"
            >
              <Table.Thead>
                <Table.Tr>
                  <Table.Th>Category</Table.Th>
                  <Table.Th>Q1 Sales</Table.Th>
                  <Table.Th>Q2 Sales</Table.Th>
                  <Table.Th>Total</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                <Table.Tr>
                  <Table.Td>Electronics</Table.Td>
                  <Table.Td>$125,000</Table.Td>
                  <Table.Td>$135,000</Table.Td>
                  <Table.Td>$260,000</Table.Td>
                </Table.Tr>
                <Table.Tr>
                  <Table.Td>Clothing</Table.Td>
                  <Table.Td>$85,000</Table.Td>
                  <Table.Td>$92,000</Table.Td>
                  <Table.Td>$177,000</Table.Td>
                </Table.Tr>
                <Table.Tr>
                  <Table.Td>Home & Garden</Table.Td>
                  <Table.Td>$105,000</Table.Td>
                  <Table.Td>$98,000</Table.Td>
                  <Table.Td>$203,000</Table.Td>
                </Table.Tr>
              </Table.Tbody>
              <Table.Tfoot>
                <Table.Tr>
                  <Table.Th>Grand Total</Table.Th>
                  <Table.Th>$315,000</Table.Th>
                  <Table.Th>$325,000</Table.Th>
                  <Table.Th>$640,000</Table.Th>
                </Table.Tr>
              </Table.Tfoot>
            </Table>
            <Text style={styles.expectedResult}>
              ✓ Expected: Footer aligns with header and body columns, custom
              spacing applied uniformly
            </Text>
          </Paper>
        </View>

        {/* Test 8: Stress Test - Mixed Everything */}
        <View style={styles.testSection}>
          <Title order={2} style={styles.testTitle}>
            Test 8: Comprehensive Stress Test
          </Title>
          <Text style={styles.testDescription}>
            Ultimate test combining all edge cases: varying lengths, empty
            cells, mixed content, borders, striping, and footer. If this aligns
            correctly, the fix is robust.
          </Text>
          <Paper p="md" radius="md" withBorder style={styles.testCard}>
            <Table
              withBorder
              withColumnBorders
              striped
              caption="Complete Alignment Validation"
            >
              <Table.Thead>
                <Table.Tr>
                  <Table.Th>ID</Table.Th>
                  <Table.Th>Very Long Header Name</Table.Th>
                  <Table.Th>Type</Table.Th>
                  <Table.Th>Status</Table.Th>
                  <Table.Th>Value</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                <Table.Tr>
                  <Table.Td>1</Table.Td>
                  <Table.Td>Short</Table.Td>
                  <Table.Td>A</Table.Td>
                  <Table.Td>
                    <Badge color="blue" size="sm">
                      Pending
                    </Badge>
                  </Table.Td>
                  <Table.Td>$1,234.56</Table.Td>
                </Table.Tr>
                <Table.Tr>
                  <Table.Td>22</Table.Td>
                  <Table.Td>
                    This is extremely long content that tests width calculation
                  </Table.Td>
                  <Table.Td></Table.Td>
                  <Table.Td>
                    <Badge color="green" size="sm">
                      Approved
                    </Badge>
                  </Table.Td>
                  <Table.Td></Table.Td>
                </Table.Tr>
                <Table.Tr>
                  <Table.Td></Table.Td>
                  <Table.Td>Medium length text</Table.Td>
                  <Table.Td>Type B Extended</Table.Td>
                  <Table.Td>
                    <Badge color="red" size="sm">
                      Rejected
                    </Badge>
                  </Table.Td>
                  <Table.Td>$99.99</Table.Td>
                </Table.Tr>
                <Table.Tr>
                  <Table.Td>333</Table.Td>
                  <Table.Td></Table.Td>
                  <Table.Td>C</Table.Td>
                  <Table.Td>
                    <Badge color="yellow" size="sm">
                      Review
                    </Badge>
                  </Table.Td>
                  <Table.Td>$54,321.00</Table.Td>
                </Table.Tr>
                <Table.Tr>
                  <Table.Td>4444</Table.Td>
                  <Table.Td>Another entry</Table.Td>
                  <Table.Td>D</Table.Td>
                  <Table.Td></Table.Td>
                  <Table.Td>$777.77</Table.Td>
                </Table.Tr>
              </Table.Tbody>
              <Table.Tfoot>
                <Table.Tr>
                  <Table.Th>Total</Table.Th>
                  <Table.Th>5 Entries</Table.Th>
                  <Table.Th>-</Table.Th>
                  <Table.Th>-</Table.Th>
                  <Table.Th>$56,433.32</Table.Th>
                </Table.Tr>
              </Table.Tfoot>
            </Table>
            <Text style={styles.expectedResult}>
              ✓ Expected: Perfect alignment across all sections despite complex
              mixed content
            </Text>
          </Paper>
        </View>

        {/* Test Summary */}
        <View style={styles.summary}>
          <Paper p="lg" radius="md" style={styles.summaryCard}>
            <Title order={3} style={styles.summaryTitle}>
              Alignment Test Summary
            </Title>
            <Text style={styles.summaryText}>
              All tests validate the following fixes:
            </Text>
            <View style={styles.summaryList}>
              <Text style={styles.summaryItem}>
                • Removed flex: 1 from cells to prevent equal distribution
              </Text>
              <Text style={styles.summaryItem}>
                • Added column width tracking via onCellLayout callback
              </Text>
              <Text style={styles.summaryItem}>
                • Implemented automatic width calculation based on content
              </Text>
              <Text style={styles.summaryItem}>
                • Each column uses consistent width across all rows
              </Text>
              <Text style={styles.summaryItem}>
                • Column indices properly propagated via __columnIndex prop
              </Text>
            </View>
            <Text style={styles.summaryFooter}>
              If all vertical borders form perfect straight lines and cells in
              the same column have equal widths, the alignment fix is working
              correctly.
            </Text>
          </Paper>
        </View>
      </View>
    </ScrollView>
  );
};

const useStyles = createStyles((theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.gray?.[0] || '#f8f9fa',
  },
  header: {
    backgroundColor: theme.colors.blue?.[6] || '#228be6',
    paddingTop: 60,
    paddingBottom: 24,
    paddingHorizontal: 20,
  },
  pageTitle: {
    color: '#ffffff',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  pageSubtitle: {
    color: '#ffffff',
    fontSize: 14,
    opacity: 0.95,
    lineHeight: 20,
  },
  content: {
    padding: 16,
  },
  testSection: {
    marginBottom: 28,
  },
  testTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: theme.colors.gray?.[9] || '#212529',
    marginBottom: 8,
  },
  testDescription: {
    fontSize: 14,
    color: theme.colors.gray?.[7] || '#495057',
    lineHeight: 20,
    marginBottom: 12,
  },
  testCard: {
    backgroundColor: '#ffffff',
  },
  expectedResult: {
    fontSize: 12,
    color: theme.colors.green?.[7] || '#2f9e44',
    fontStyle: 'italic',
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: theme.colors.gray?.[3] || '#dee2e6',
  },
  summary: {
    marginTop: 8,
    marginBottom: 24,
  },
  summaryCard: {
    backgroundColor: theme.colors.blue?.[0] || '#e7f5ff',
    borderWidth: 1,
    borderColor: theme.colors.blue?.[3] || '#74c0fc',
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: theme.colors.blue?.[9] || '#1864ab',
    marginBottom: 12,
  },
  summaryText: {
    fontSize: 14,
    color: theme.colors.blue?.[8] || '#1971c2',
    marginBottom: 12,
    fontWeight: '600',
  },
  summaryList: {
    marginBottom: 12,
    paddingLeft: 8,
  },
  summaryItem: {
    fontSize: 13,
    color: theme.colors.blue?.[9] || '#1864ab',
    marginBottom: 6,
    lineHeight: 18,
  },
  summaryFooter: {
    fontSize: 13,
    color: theme.colors.blue?.[7] || '#1971c2',
    fontStyle: 'italic',
    lineHeight: 18,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: theme.colors.blue?.[2] || '#a5d8ff',
  },
}));
