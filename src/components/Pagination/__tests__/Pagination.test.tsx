import { Text } from 'react-native';
import { render, screen, fireEvent } from '../../../__tests__/test-utils';
import { Pagination } from '../index';
import { createTheme } from '../../../theme/create-theme';
import { rem } from '../../../theme/utils/rem';

const theme = createTheme();

const page = (n: number) => screen.getByLabelText(`Page ${n}`);
const pageLabels = () =>
  screen
    .getAllByRole('button')
    .map((el) => el.props.accessibilityLabel as string)
    .filter((label) => label.startsWith('Page '));

describe('Pagination', () => {
  it('renders all pages with defaults', () => {
    render(<Pagination total={5} testID="pagination" />);
    expect(screen.getByTestId('pagination')).toBeTruthy();
    expect(pageLabels()).toEqual([
      'Page 1',
      'Page 2',
      'Page 3',
      'Page 4',
      'Page 5',
    ]);
    expect(screen.getByText('<')).toBeTruthy();
    expect(screen.getByText('>')).toBeTruthy();
    expect(screen.queryByText('<<')).toBeNull();
    expect(screen.queryByText('>>')).toBeNull();
    expect(screen.queryByText('...')).toBeNull();
  });

  it('marks the first page as selected by default', () => {
    render(<Pagination total={3} />);
    expect(page(1).props.accessibilityState.selected).toBe(true);
    expect(page(1).props.accessibilityRole).toBe('button');
    expect(page(2).props.accessibilityState.selected).toBe(false);
    expect(page(1)).toHaveStyle({
      backgroundColor: theme.fn.themeColor('blue', 6),
    });
    expect(screen.getByLabelText('Previous page')).toBeDisabled();
    expect(screen.getByLabelText('Next page')).not.toBeDisabled();
  });

  it('changes page on press in uncontrolled mode', () => {
    const onChange = jest.fn();
    render(<Pagination total={5} onChange={onChange} />);
    fireEvent.press(page(3));
    expect(onChange).toHaveBeenCalledWith(3);
    expect(page(3).props.accessibilityState.selected).toBe(true);
    expect(page(1).props.accessibilityState.selected).toBe(false);
  });

  it('navigates with previous and next controls', () => {
    const onChange = jest.fn();
    render(<Pagination total={3} defaultValue={2} onChange={onChange} />);
    fireEvent.press(screen.getByLabelText('Next page'));
    expect(onChange).toHaveBeenCalledWith(3);
    expect(screen.getByLabelText('Next page')).toBeDisabled();

    fireEvent.press(screen.getByLabelText('Previous page'));
    expect(onChange).toHaveBeenLastCalledWith(2);
    fireEvent.press(screen.getByLabelText('Previous page'));
    expect(onChange).toHaveBeenLastCalledWith(1);
    expect(screen.getByLabelText('Previous page')).toBeDisabled();
  });

  it('renders and uses edge controls', () => {
    const onChange = jest.fn();
    render(<Pagination total={10} withEdges onChange={onChange} />);
    const first = screen.getByLabelText('First page');
    const last = screen.getByLabelText('Last page');
    expect(first).toBeDisabled();
    expect(screen.getByText('<<')).toBeTruthy();
    expect(screen.getByText('>>')).toBeTruthy();

    fireEvent.press(last);
    expect(onChange).toHaveBeenCalledWith(10);
    expect(screen.getByLabelText('Last page')).toBeDisabled();

    fireEvent.press(screen.getByLabelText('First page'));
    expect(onChange).toHaveBeenLastCalledWith(1);
  });

  it('hides controls when withControls is false', () => {
    render(<Pagination total={3} withControls={false} />);
    expect(screen.queryByLabelText('Previous page')).toBeNull();
    expect(screen.queryByLabelText('Next page')).toBeNull();
  });

  it('respects controlled value', () => {
    const onChange = jest.fn();
    render(<Pagination total={5} value={2} onChange={onChange} />);
    expect(page(2).props.accessibilityState.selected).toBe(true);
    fireEvent.press(page(4));
    expect(onChange).toHaveBeenCalledWith(4);
    expect(page(2).props.accessibilityState.selected).toBe(true);
    expect(page(4).props.accessibilityState.selected).toBe(false);
  });

  it('does nothing when disabled', () => {
    const onChange = jest.fn();
    render(
      <Pagination
        total={5}
        disabled
        withEdges
        onChange={onChange}
        testID="pagination"
      />
    );
    expect(screen.getByTestId('pagination')).toHaveStyle({ opacity: 0.5 });
    expect(page(3)).toBeDisabled();
    expect(screen.getByLabelText('Next page')).toBeDisabled();
    expect(screen.getByLabelText('Last page')).toBeDisabled();
    fireEvent.press(page(3));
    expect(onChange).not.toHaveBeenCalled();
  });

  it('renders right dots only near the start', () => {
    render(<Pagination total={20} />);
    expect(screen.getAllByText('...')).toHaveLength(1);
    expect(pageLabels()).toEqual([
      'Page 1',
      'Page 2',
      'Page 3',
      'Page 4',
      'Page 5',
      'Page 20',
    ]);
  });

  it('renders both dots in the middle', () => {
    render(<Pagination total={20} value={10} />);
    expect(screen.getAllByText('...')).toHaveLength(2);
    expect(pageLabels()).toEqual([
      'Page 1',
      'Page 9',
      'Page 10',
      'Page 11',
      'Page 20',
    ]);
  });

  it('renders left dots only near the end', () => {
    render(<Pagination total={20} value={19} />);
    expect(screen.getAllByText('...')).toHaveLength(1);
    expect(pageLabels()).toEqual([
      'Page 1',
      'Page 16',
      'Page 17',
      'Page 18',
      'Page 19',
      'Page 20',
    ]);
  });

  it('respects siblings and boundaries', () => {
    render(<Pagination total={30} value={15} siblings={2} boundaries={2} />);
    expect(pageLabels()).toEqual([
      'Page 1',
      'Page 2',
      'Page 13',
      'Page 14',
      'Page 15',
      'Page 16',
      'Page 17',
      'Page 29',
      'Page 30',
    ]);
  });

  it('renders custom icons', () => {
    render(
      <Pagination
        total={5}
        withEdges
        previousIcon="P"
        nextIcon="N"
        firstIcon={<Text>F</Text>}
        lastIcon={<Text>L</Text>}
      />
    );
    expect(screen.getByText('P')).toBeTruthy();
    expect(screen.getByText('N')).toBeTruthy();
    expect(screen.getByText('F')).toBeTruthy();
    expect(screen.getByText('L')).toBeTruthy();
  });

  it.each([
    ['xs', 24],
    ['sm', 28],
    ['md', 32],
    ['lg', 38],
    ['xl', 44],
  ] as const)('applies size %s', (size, height) => {
    render(<Pagination total={3} size={size} />);
    expect(page(1)).toHaveStyle({ height: rem(height) });
  });

  it('falls back to md size for unknown size', () => {
    render(<Pagination total={3} size={'giant' as any} />);
    expect(page(1)).toHaveStyle({ height: rem(32) });
  });

  it('applies color and radius', () => {
    render(<Pagination total={3} color="red" radius="xl" />);
    expect(page(1)).toHaveStyle({
      backgroundColor: theme.fn.themeColor('red', 6),
      borderRadius: theme.fn.radius('xl'),
    });
  });

  it('merges custom style', () => {
    render(<Pagination total={3} style={{ margin: 4 }} testID="pagination" />);
    expect(screen.getByTestId('pagination')).toHaveStyle({ margin: 4 });
  });
});
