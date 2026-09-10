import { Text } from 'react-native';
import { render, screen } from '../../../__tests__/test-utils';
import { Table } from '../index';

type ReactTestInstance = ReturnType<typeof screen.getByTestId>;

const getCell = (text: string): ReactTestInstance => {
  let current = screen.getByText(text).parent;
  while (current && typeof current.type !== 'string') {
    current = current.parent;
  }
  if (!current) {
    throw new Error(`cell for ${text} not found`);
  }
  return current;
};

const renderTable = (props: React.ComponentProps<typeof Table> = {}) =>
  render(
    <Table testID="table" {...props}>
      <Table.Caption testID="caption">Caption text</Table.Caption>
      <Table.THead testID="thead">
        <Table.Tr testID="head-row">
          <Table.Th testID="th-name">Name</Table.Th>
          <Table.Th colSpan={2}>Age</Table.Th>
        </Table.Tr>
      </Table.THead>
      <Table.TBody testID="tbody">
        <Table.Tr testID="row-0">
          <Table.Td testID="td-alice">Alice</Table.Td>
          <Table.Td colSpan={2}>30</Table.Td>
        </Table.Tr>
        <Table.Tr testID="row-1">
          <Table.Td>Bob</Table.Td>
          <Table.Td>25</Table.Td>
        </Table.Tr>
        <Table.Tr testID="row-2">
          <Table.Td>Carol</Table.Td>
          <Table.Td>41</Table.Td>
        </Table.Tr>
      </Table.TBody>
      <Table.TFoot testID="tfoot">
        <Table.Tr>
          <Table.Td>Total</Table.Td>
          <Table.Td>3</Table.Td>
        </Table.Tr>
      </Table.TFoot>
    </Table>
  );

describe('Table', () => {
  it('renders all sections, cells and caption on top by default', () => {
    renderTable();

    expect(screen.getByText('Caption text')).toBeTruthy();
    expect(screen.getByText('Name')).toBeTruthy();
    expect(screen.getByText('Alice')).toBeTruthy();
    expect(screen.getByText('Total')).toBeTruthy();

    const table = screen.getByTestId('table');
    expect(table).toHaveStyle({ borderWidth: 0 });
    expect(screen.getByTestId('thead')).toHaveStyle({
      flexDirection: 'column',
    });
    expect(screen.getByTestId('tbody')).toHaveStyle({
      flexDirection: 'column',
    });
    expect(screen.getByTestId('tfoot')).toHaveStyle({
      flexDirection: 'column',
    });
    expect(screen.getByTestId('head-row')).toHaveStyle({
      flexDirection: 'row',
    });

    const children = table.children as ReactTestInstance[];
    expect(children[0]?.props.testID).toBe('caption');
    expect(children[children.length - 1]?.props.testID).toBe('tfoot');
  });

  it('renders caption at the bottom when captionSide is bottom', () => {
    renderTable({ captionSide: 'bottom' });
    const children = screen.getByTestId('table')
      .children as ReactTestInstance[];
    expect(children[0]?.props.testID).toBe('thead');
    expect(children[children.length - 1]?.props.testID).toBe('caption');
  });

  it('applies border styles', () => {
    renderTable({ withBorder: true, withColumnBorders: true });
    expect(screen.getByTestId('table')).toHaveStyle({ borderWidth: 1 });
    expect(screen.getByTestId('th-name')).toHaveStyle({ borderRightWidth: 1 });
    expect(screen.getByTestId('td-alice')).toHaveStyle({ borderRightWidth: 1 });
  });

  it('does not apply column borders by default', () => {
    renderTable();
    expect(screen.getByTestId('th-name')).toHaveStyle({ borderRightWidth: 0 });
    expect(screen.getByTestId('td-alice')).toHaveStyle({ borderRightWidth: 0 });
  });

  it('stripes odd body rows when striped is set', () => {
    renderTable({ striped: true });
    expect(screen.getByTestId('row-0')).not.toHaveStyle({
      backgroundColor: '#f8f9fa',
    });
    expect(screen.getByTestId('row-1')).toHaveStyle({
      backgroundColor: '#f8f9fa',
    });
    expect(screen.getByTestId('row-2')).not.toHaveStyle({
      backgroundColor: '#f8f9fa',
    });
  });

  it('does not stripe rows by default', () => {
    renderTable();
    expect(screen.getByTestId('row-1')).not.toHaveStyle({
      backgroundColor: '#f8f9fa',
    });
  });

  it('applies spacing and font size from theme keys', () => {
    renderTable({
      horizontalSpacing: 'lg',
      verticalSpacing: 'sm',
      fontSize: 'lg',
    });
    expect(screen.getByTestId('td-alice')).toHaveStyle({
      paddingHorizontal: 20,
      paddingVertical: 12,
    });
    expect(screen.getByText('Alice')).toHaveStyle({ fontSize: 18 });
    expect(screen.getByText('Name')).toHaveStyle({ fontSize: 18 });
  });

  it('applies numeric spacing and font size', () => {
    renderTable({ horizontalSpacing: 3, verticalSpacing: 4, fontSize: 21 });
    expect(screen.getByTestId('td-alice')).toHaveStyle({
      paddingHorizontal: 3,
      paddingVertical: 4,
    });
    expect(screen.getByText('Alice')).toHaveStyle({ fontSize: 21 });
  });

  it('falls back to default spacing and font size for unknown keys', () => {
    renderTable({
      horizontalSpacing: 'nope' as never,
      fontSize: 'nope' as never,
    });
    expect(screen.getByTestId('td-alice')).toHaveStyle({
      paddingHorizontal: 10,
    });
    expect(screen.getByText('Alice')).toHaveStyle({ fontSize: 14 });
  });

  it('uses colSpan as flex value', () => {
    renderTable();
    expect(getCell('Age')).toHaveStyle({ flex: 2 });
    expect(getCell('30')).toHaveStyle({ flex: 2 });
    expect(screen.getByTestId('th-name')).toHaveStyle({ flex: 1 });
  });

  it('wraps in a horizontal ScrollView when horizontallyScrollable', () => {
    renderTable({ horizontallyScrollable: true });
    const scrollView = screen.UNSAFE_getByType('ScrollView' as never);
    expect(scrollView.props.horizontal).toBe(true);
    expect(screen.getByText('Alice')).toBeTruthy();
  });

  it('does not render a ScrollView by default', () => {
    renderTable();
    expect(screen.UNSAFE_queryByType('ScrollView' as never)).toBeNull();
  });

  it('accepts highlightOnHover and custom style', () => {
    renderTable({ highlightOnHover: true, style: { marginTop: 5 } });
    expect(screen.getByTestId('table')).toHaveStyle({ marginTop: 5 });
  });

  it('renders non-string children in Th and Caption directly', () => {
    render(
      <Table>
        <Table.Caption>
          <Text>Custom caption</Text>
        </Table.Caption>
        <Table.THead>
          <Table.Tr>
            <Table.Th>
              <Text>Custom header</Text>
            </Table.Th>
          </Table.Tr>
        </Table.THead>
      </Table>
    );

    expect(screen.getByText('Custom caption')).toBeTruthy();
    expect(screen.getByText('Custom header')).toBeTruthy();
  });

  it('removes the top border from every cell of the first body row only', () => {
    render(
      <Table>
        <Table.TBody>
          <Table.Tr testID="row-0">
            <Table.Td testID="r0c0">First</Table.Td>
            <Table.Td testID="r0c1">Second</Table.Td>
          </Table.Tr>
          <Table.Tr testID="row-1">
            <Table.Td testID="r1c0">Third</Table.Td>
          </Table.Tr>
        </Table.TBody>
        <Table.TFoot>
          <Table.Tr>
            <Table.Td testID="foot">Footer</Table.Td>
          </Table.Tr>
        </Table.TFoot>
      </Table>
    );

    expect(screen.getByTestId('r0c0')).toHaveStyle({ borderTopWidth: 0 });
    expect(screen.getByTestId('r0c1')).toHaveStyle({ borderTopWidth: 0 });
    expect(screen.getByTestId('r1c0')).toHaveStyle({ borderTopWidth: 1 });
    expect(screen.getByTestId('foot')).toHaveStyle({ borderTopWidth: 1 });
  });

  it('does not leak data-* props onto body rows', () => {
    render(
      <Table>
        <Table.TBody>
          <Table.Tr testID="row-0">
            <Table.Td>First</Table.Td>
          </Table.Tr>
        </Table.TBody>
      </Table>
    );

    const row = screen.getByTestId('row-0');
    expect(row.props).not.toHaveProperty('data-first');
    expect(row.props).not.toHaveProperty('data-index');
  });

  it('passes custom styles to sub-components', () => {
    render(
      <Table>
        <Table.THead style={{ padding: 1 }} testID="thead">
          <Table.Tr style={{ padding: 2 }} testID="tr">
            <Table.Th style={{ padding: 3 }} testID="th">
              H
            </Table.Th>
          </Table.Tr>
        </Table.THead>
        <Table.TBody style={{ padding: 4 }} testID="tbody">
          <Table.Tr>
            <Table.Td style={{ padding: 5 }} testID="td">
              D
            </Table.Td>
          </Table.Tr>
        </Table.TBody>
        <Table.TFoot style={{ padding: 6 }} testID="tfoot">
          <Table.Tr>
            <Table.Td>F</Table.Td>
          </Table.Tr>
        </Table.TFoot>
        <Table.Caption style={{ padding: 7 }} testID="caption">
          C
        </Table.Caption>
      </Table>
    );

    expect(screen.getByTestId('thead')).toHaveStyle({ padding: 1 });
    expect(screen.getByTestId('tr')).toHaveStyle({ padding: 2 });
    expect(screen.getByTestId('th')).toHaveStyle({ padding: 3 });
    expect(screen.getByTestId('tbody')).toHaveStyle({ padding: 4 });
    expect(screen.getByTestId('td')).toHaveStyle({ padding: 5 });
    expect(screen.getByTestId('tfoot')).toHaveStyle({ padding: 6 });
    expect(screen.getByTestId('caption')).toHaveStyle({ padding: 7 });
  });

  it('keeps non-element body children untouched', () => {
    render(
      <Table>
        <Table.TBody testID="tbody">
          {null}
          {'plain'}
          <Table.Tr>
            <Table.Td>Cell</Table.Td>
          </Table.Tr>
        </Table.TBody>
      </Table>
    );
    expect(screen.getByText('Cell')).toBeTruthy();
  });

  it('throws when compound components are used outside Table', () => {
    const consoleError = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    expect(() =>
      render(
        <Table.Tr>
          <Table.Td>Lonely</Table.Td>
        </Table.Tr>
      )
    ).toThrow('Table compound components must be used within Table');

    consoleError.mockRestore();
  });

  it('exposes compound components with display names', () => {
    expect(Table.displayName).toBe('Table');
    expect(Table.Caption.displayName).toBe('Table.Caption');
    expect(Table.THead.displayName).toBe('Table.THead');
    expect(Table.TBody.displayName).toBe('Table.TBody');
    expect(Table.TFoot.displayName).toBe('Table.TFoot');
    expect(Table.Tr.displayName).toBe('Table.Tr');
    expect(Table.Th.displayName).toBe('Table.Th');
    expect(Table.Td.displayName).toBe('Table.Td');
  });
});
