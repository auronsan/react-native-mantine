import { Text as RNText, View } from 'react-native';
import { render, screen } from '../../../__tests__/test-utils';
import { List, ListItem } from '../index';
import { createTheme } from '../../../theme/create-theme';

const theme = createTheme();

describe('List', () => {
  it('exposes Item as a sub-component', () => {
    expect(List.Item).toBe(ListItem);
  });

  it('renders an unordered list with bullet markers and passes testID through', () => {
    render(
      <List testID="list">
        <List.Item testID="item">First</List.Item>
        <List.Item>Second</List.Item>
        {null}
      </List>
    );

    expect(screen.getByTestId('list')).toBeTruthy();
    expect(screen.getByTestId('item')).toHaveStyle({ alignItems: 'flex-start' });
    expect(screen.getByText('First')).toBeTruthy();
    expect(screen.getByText('Second')).toBeTruthy();
    expect(screen.getAllByText('•')).toHaveLength(2);
  });

  it('applies content text styles to wrapped item text', () => {
    render(
      <List size="xl">
        <List.Item>Big</List.Item>
      </List>
    );

    const text = screen.getByText('Big');
    expect(text).toHaveStyle({ fontSize: 18, color: theme.black, lineHeight: 27 });
    expect(text.props.fontSize).toBeUndefined();
    expect(text.props.color).toBeUndefined();
  });

  it('renders ordered markers for every list style type and start index', () => {
    const cases: Array<[any, string[]]> = [
      ['decimal', ['1.', '2.', '3.']],
      ['lower-alpha', ['a.', 'b.', 'c.']],
      ['upper-alpha', ['A.', 'B.', 'C.']],
      ['lower-roman', ['i.', 'ii.', 'iii.']],
      ['upper-roman', ['I.', 'II.', 'III.']],
      ['weird', ['1.', '2.', '3.']],
    ];

    cases.forEach(([listStyleType, markers]) => {
      const { unmount } = render(
        <List type="ordered" listStyleType={listStyleType}>
          <List.Item>a</List.Item>
          <List.Item>b</List.Item>
          <List.Item>c</List.Item>
        </List>
      );
      markers.forEach((marker) => expect(screen.getByText(marker)).toBeTruthy());
      unmount();
    });

    render(
      <List type="ordered" startIndex={11} listStyleType="upper-roman">
        <List.Item>k</List.Item>
      </List>
    );
    expect(screen.getByText('11.')).toBeTruthy();
  });

  it('uses list and item icons instead of markers', () => {
    render(
      <List icon={<View testID="list-icon" />}>
        <List.Item>Default icon</List.Item>
        <List.Item icon={<View testID="item-icon" />}>Own icon</List.Item>
      </List>
    );

    expect(screen.getByTestId('list-icon')).toBeTruthy();
    expect(screen.getByTestId('item-icon')).toBeTruthy();
    expect(screen.queryByText('•')).toBeNull();
  });

  it('applies center, withPadding, spacing and size', () => {
    const { rerender } = render(
      <List center withPadding spacing="lg" size="xl" testID="list">
        <List.Item testID="item">Centered</List.Item>
      </List>
    );
    expect(screen.getByTestId('list')).toHaveStyle({ paddingLeft: theme.spacing.md });
    expect(screen.getByTestId('item')).toHaveStyle({ alignItems: 'center' });

    rerender(
      <List spacing={30} size="xs" testID="list">
        <List.Item testID="item">Tiny</List.Item>
      </List>
    );
    expect(screen.getByTestId('list')).toBeTruthy();

    rerender(
      <List spacing={'weird' as any} testID="list">
        <List.Item testID="item">Fallback</List.Item>
      </List>
    );
    expect(screen.getByTestId('list')).toBeTruthy();
  });

  it('renders raw children when withTextWrapper is false and merges styles', () => {
    render(
      <List style={{ margin: 1 }} testID="list">
        <List.Item withTextWrapper={false} style={{ margin: 2 }} testID="item">
          <RNText>Raw</RNText>
        </List.Item>
      </List>
    );

    expect(screen.getByText('Raw')).toBeTruthy();
    expect(screen.getByTestId('list')).toHaveStyle({ margin: 1 });
    expect(screen.getByTestId('item')).toHaveStyle({ margin: 2 });
  });

  it('throws when List.Item is rendered outside List', () => {
    const spy = jest.spyOn(console, 'error').mockImplementation(() => {});
    expect(() => render(<ListItem>Orphan</ListItem>)).toThrow(
      'List components must be used within List'
    );
    spy.mockRestore();
  });
});
