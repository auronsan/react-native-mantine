import { Text as RNText } from 'react-native';
import { render, screen } from '../../../__tests__/test-utils';
import { Breadcrumbs } from '../index';

describe('Breadcrumbs', () => {
  it('renders items separated by the default separator and passes testID through', () => {
    render(
      <Breadcrumbs testID="crumbs">
        <RNText>Home</RNText>
        <RNText>Library</RNText>
        <RNText>Data</RNText>
      </Breadcrumbs>
    );

    expect(screen.getByTestId('crumbs')).toBeTruthy();
    expect(screen.getByText('Home')).toBeTruthy();
    expect(screen.getByText('Library')).toBeTruthy();
    expect(screen.getByText('Data')).toBeTruthy();
    expect(screen.getAllByText('/')).toHaveLength(2);
  });

  it('supports string and node separators', () => {
    const { rerender } = render(
      <Breadcrumbs separator="→">
        <RNText>A</RNText>
        <RNText>B</RNText>
      </Breadcrumbs>
    );
    expect(screen.getAllByText('→')).toHaveLength(1);

    rerender(
      <Breadcrumbs separator={<RNText testID="sep">»</RNText>}>
        <RNText>A</RNText>
        <RNText>B</RNText>
        <RNText>C</RNText>
      </Breadcrumbs>
    );
    expect(screen.getAllByTestId('sep')).toHaveLength(2);
  });

  it('renders no separator for a single item or empty children', () => {
    const { rerender } = render(
      <Breadcrumbs>
        <RNText>Only</RNText>
      </Breadcrumbs>
    );
    expect(screen.queryByText('/')).toBeNull();

    rerender(<Breadcrumbs testID="empty" />);
    expect(screen.getByTestId('empty')).toBeTruthy();
  });

  it('has list accessibility role with default and custom labels', () => {
    const { rerender } = render(
      <Breadcrumbs testID="crumbs">
        <RNText>Home</RNText>
      </Breadcrumbs>
    );
    const crumbs = screen.getByTestId('crumbs');
    expect(crumbs.props.accessibilityRole).toBe('list');
    expect(crumbs.props.accessibilityLabel).toBe('Breadcrumb navigation');

    rerender(
      <Breadcrumbs accessibilityLabel="Path" testID="crumbs">
        <RNText>Home</RNText>
      </Breadcrumbs>
    );
    expect(screen.getByLabelText('Path')).toBeTruthy();
  });

  it('applies custom style', () => {
    render(
      <Breadcrumbs style={{ padding: 2 }} testID="crumbs">
        <RNText>Home</RNText>
      </Breadcrumbs>
    );
    expect(screen.getByTestId('crumbs')).toHaveStyle({ padding: 2 });
  });
});
