import { StyleSheet, Text as RNText, View } from 'react-native';
import { render, screen } from '../../../__tests__/test-utils';
import {
  DataList,
  DataListItem,
  DataListItemLabel,
  DataListItemValue,
} from '../index';
import { createTheme } from '../../../theme/create-theme';

const theme = createTheme();

describe('DataList', () => {
  it('exposes sub-components', () => {
    expect(DataList.Item).toBe(DataListItem);
    expect(DataList.ItemLabel).toBe(DataListItemLabel);
    expect(DataList.ItemValue).toBe(DataListItemValue);
  });

  it('renders label/value pairs horizontally by default and passes testIDs through', () => {
    render(
      <DataList testID="list">
        <DataList.Item testID="item">
          <DataList.ItemLabel testID="label">Name</DataList.ItemLabel>
          <DataList.ItemValue testID="value">Mantine</DataList.ItemValue>
        </DataList.Item>
      </DataList>
    );

    expect(screen.getByTestId('list')).toHaveStyle({ gap: theme.spacing.sm });
    expect(screen.getByTestId('item')).toHaveStyle({ flexDirection: 'row' });
    expect(screen.getByTestId('label')).toHaveStyle({ width: 120 });
    expect(screen.getByTestId('value')).toHaveStyle({ flex: 1 });
    expect(screen.getByText('Name')).toHaveStyle({
      fontSize: theme.fontSizes.sm,
    });
    expect(screen.getByText('Mantine')).toHaveStyle({ color: theme.black });
  });

  it('supports vertical orientation, dividers, custom label width and sizes', () => {
    render(
      <DataList orientation="vertical" withDivider labelWidth={80} size="lg" gap={4}>
        <DataList.Item testID="item">
          <DataList.ItemLabel testID="label">Name</DataList.ItemLabel>
          <DataList.ItemValue testID="value">{42}</DataList.ItemValue>
        </DataList.Item>
      </DataList>
    );

    const item = screen.getByTestId('item');
    expect(item).toHaveStyle({ borderBottomWidth: 1 });
    expect(item.props.style.flat().some((s: any) => s && s.flexDirection === 'row')).toBe(
      false
    );
    expect(StyleSheet.flatten(screen.getByTestId('label').props.style).width).toBeUndefined();
    expect(StyleSheet.flatten(screen.getByTestId('value').props.style).flex).toBeUndefined();
    expect(screen.getByText('42')).toHaveStyle({ fontSize: theme.fontSizes.lg });
  });

  it('resolves gap from theme keys, numbers and unknown keys', () => {
    const { rerender } = render(<DataList gap="xl" testID="list" />);
    expect(screen.getByTestId('list')).toHaveStyle({ gap: theme.spacing.xl });

    rerender(<DataList gap={'nope' as any} testID="list" />);
    expect(screen.getByTestId('list')).toHaveStyle({ gap: theme.spacing.sm });
  });

  it('renders node children and applies textStyle and style', () => {
    render(
      <DataList style={{ margin: 1 }} testID="list">
        <DataList.Item style={{ padding: 1 }}>
          <DataList.ItemLabel textStyle={{ letterSpacing: 2 }} style={{ margin: 2 }}>
            Label
          </DataList.ItemLabel>
          <DataList.ItemValue textStyle={{ letterSpacing: 3 }} style={{ margin: 3 }}>
            Value
          </DataList.ItemValue>
        </DataList.Item>
        <DataList.Item>
          <DataList.ItemLabel>
            <View testID="label-node" />
          </DataList.ItemLabel>
          <DataList.ItemValue>
            <RNText>Node value</RNText>
          </DataList.ItemValue>
        </DataList.Item>
      </DataList>
    );

    expect(screen.getByTestId('list')).toHaveStyle({ margin: 1 });
    expect(screen.getByText('Label')).toHaveStyle({ letterSpacing: 2 });
    expect(screen.getByText('Value')).toHaveStyle({ letterSpacing: 3 });
    expect(screen.getByTestId('label-node')).toBeTruthy();
    expect(screen.getByText('Node value')).toBeTruthy();
  });

  it('renders sub-components with context defaults outside DataList', () => {
    render(
      <DataListItem testID="item">
        <DataListItemLabel testID="label">Solo</DataListItemLabel>
        <DataListItemValue>Value</DataListItemValue>
      </DataListItem>
    );

    expect(screen.getByTestId('item')).toHaveStyle({ flexDirection: 'row' });
    expect(screen.getByTestId('label')).toHaveStyle({ width: 120 });
  });
});
