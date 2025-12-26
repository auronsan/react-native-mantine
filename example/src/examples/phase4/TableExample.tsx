import { ExampleWrapper, ExampleSection } from '../../components/ExampleWrapper';
import { Table, Paper, Badge } from 'react-native-mantine';

// Sample data
const employees = [
  { id: 1, name: 'John Doe', position: 'Software Engineer', department: 'Engineering', salary: 95000, status: 'Active' },
  { id: 2, name: 'Jane Smith', position: 'Product Manager', department: 'Product', salary: 110000, status: 'Active' },
  { id: 3, name: 'Bob Johnson', position: 'Designer', department: 'Design', salary: 85000, status: 'Active' },
  { id: 4, name: 'Alice Williams', position: 'Data Scientist', department: 'Engineering', salary: 105000, status: 'On Leave' },
  { id: 5, name: 'Charlie Brown', position: 'DevOps Engineer', department: 'Engineering', salary: 98000, status: 'Active' },
];

const products = [
  { name: 'React Native Mantine', category: 'Library', downloads: '10K+', rating: 4.8 },
  { name: 'TypeScript', category: 'Language', downloads: '100M+', rating: 4.9 },
  { name: 'Expo', category: 'Framework', downloads: '50M+', rating: 4.7 },
  { name: 'React Navigation', category: 'Library', downloads: '75M+', rating: 4.8 },
];

export const TableExample = () => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'green';
      case 'On Leave': return 'orange';
      default: return 'gray';
    }
  };

  return (
    <ExampleWrapper
      title="Table"
      description="Styled data table for displaying tabular data"
    >
      <ExampleSection
        title="Basic Table"
        description="Simple table with headers and data"
        variant="showcase"
      >
        <Paper p="md" radius="md" withBorder>
          <Table>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Name</Table.Th>
                <Table.Th>Category</Table.Th>
                <Table.Th>Downloads</Table.Th>
                <Table.Th>Rating</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {products.map((product, index) => (
                <Table.Tr key={index}>
                  <Table.Td>{product.name}</Table.Td>
                  <Table.Td>{product.category}</Table.Td>
                  <Table.Td>{product.downloads}</Table.Td>
                  <Table.Td>{product.rating}</Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        </Paper>
      </ExampleSection>

      <ExampleSection
        title="With Border"
        description="Table with borders and column borders"
      >
        <Paper p="md" radius="md">
          <Table withBorder withColumnBorders>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>ID</Table.Th>
                <Table.Th>Name</Table.Th>
                <Table.Th>Position</Table.Th>
                <Table.Th>Department</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {employees.slice(0, 3).map((employee) => (
                <Table.Tr key={employee.id}>
                  <Table.Td>{employee.id}</Table.Td>
                  <Table.Td>{employee.name}</Table.Td>
                  <Table.Td>{employee.position}</Table.Td>
                  <Table.Td>{employee.department}</Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        </Paper>
      </ExampleSection>

      <ExampleSection
        title="Striped Rows"
        description="Table with alternating row colors"
      >
        <Paper p="md" radius="md">
          <Table striped>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Name</Table.Th>
                <Table.Th>Position</Table.Th>
                <Table.Th>Salary</Table.Th>
                <Table.Th>Status</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {employees.map((employee) => (
                <Table.Tr key={employee.id}>
                  <Table.Td>{employee.name}</Table.Td>
                  <Table.Td>{employee.position}</Table.Td>
                  <Table.Td>${employee.salary.toLocaleString()}</Table.Td>
                  <Table.Td>
                    <Badge color={getStatusColor(employee.status)} size="sm">
                      {employee.status}
                    </Badge>
                  </Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        </Paper>
      </ExampleSection>

      <ExampleSection
        title="With Caption"
        description="Table with caption at top"
      >
        <Paper p="md" radius="md">
          <Table caption="Employee Directory" withBorder>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Name</Table.Th>
                <Table.Th>Department</Table.Th>
                <Table.Th>Position</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {employees.slice(0, 3).map((employee) => (
                <Table.Tr key={employee.id}>
                  <Table.Td>{employee.name}</Table.Td>
                  <Table.Td>{employee.department}</Table.Td>
                  <Table.Td>{employee.position}</Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        </Paper>
      </ExampleSection>

      <ExampleSection
        title="Custom Spacing"
        description="Table with custom horizontal and vertical spacing"
      >
        <Paper p="md" radius="md">
          <Table
            horizontalSpacing="lg"
            verticalSpacing="md"
            fontSize="md"
            withBorder
          >
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Product</Table.Th>
                <Table.Th>Category</Table.Th>
                <Table.Th>Rating</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {products.slice(0, 3).map((product, index) => (
                <Table.Tr key={index}>
                  <Table.Td>{product.name}</Table.Td>
                  <Table.Td>{product.category}</Table.Td>
                  <Table.Td>⭐ {product.rating}</Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        </Paper>
      </ExampleSection>

      <ExampleSection
        title="With Footer"
        description="Table with footer section"
      >
        <Paper p="md" radius="md">
          <Table withBorder>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Department</Table.Th>
                <Table.Th>Employees</Table.Th>
                <Table.Th>Avg Salary</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              <Table.Tr>
                <Table.Td>Engineering</Table.Td>
                <Table.Td>3</Table.Td>
                <Table.Td>$99,333</Table.Td>
              </Table.Tr>
              <Table.Tr>
                <Table.Td>Product</Table.Td>
                <Table.Td>1</Table.Td>
                <Table.Td>$110,000</Table.Td>
              </Table.Tr>
              <Table.Tr>
                <Table.Td>Design</Table.Td>
                <Table.Td>1</Table.Td>
                <Table.Td>$85,000</Table.Td>
              </Table.Tr>
            </Table.Tbody>
            <Table.Tfoot>
              <Table.Tr>
                <Table.Th>Total</Table.Th>
                <Table.Th>5</Table.Th>
                <Table.Th>$98,600</Table.Th>
              </Table.Tr>
            </Table.Tfoot>
          </Table>
        </Paper>
      </ExampleSection>
    </ExampleWrapper>
  );
};
