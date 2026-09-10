import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { render, screen } from '../../../__tests__/test-utils';
import { createTheme } from '../../../theme/create-theme';
import { Title } from '../index';

const theme = createTheme();

describe('Title', () => {
  it('renders children with default order 1', () => {
    render(<Title testID="title">Heading</Title>);
    const el = screen.getByTestId('title');
    expect(el).toBeTruthy();
    expect(screen.getByText('Heading')).toBeTruthy();
    expect(el).toHaveStyle({ fontSize: theme.headings.sizes.h1.fontSize });
  });

  it.each([1, 2, 3, 4, 5, 6] as const)(
    'applies heading styles for order %s',
    (order) => {
      render(
        <Title order={order} testID="title">
          Heading
        </Title>
      );
      const key = `h${order}` as keyof typeof theme.headings.sizes;
      expect(screen.getByTestId('title')).toHaveStyle({
        fontSize: theme.headings.sizes[key].fontSize,
      });
    }
  );

  it('orders produce decreasing font sizes', () => {
    render(
      <>
        <Title order={1} testID="h1">
          A
        </Title>
        <Title order={6} testID="h6">
          B
        </Title>
      </>
    );
    const h1Size = StyleSheet.flatten(screen.getByTestId('h1').props.style)
      .fontSize as number;
    const h6Size = StyleSheet.flatten(screen.getByTestId('h6').props.style)
      .fontSize as number;
    expect(h1Size).toBeGreaterThan(h6Size);
  });

  it('custom style overrides heading styles', () => {
    render(
      <Title order={2} style={{ fontSize: 99, color: 'red' }} testID="title">
        Heading
      </Title>
    );
    expect(screen.getByTestId('title')).toHaveStyle({
      fontSize: 99,
      color: 'red',
    });
  });

  it('passes Text props such as numberOfLines and align', () => {
    render(
      <Title testID="title" numberOfLines={1} align="center" color="red">
        Long heading
      </Title>
    );
    const el = screen.getByTestId('title');
    expect(el.props.numberOfLines).toBe(1);
    expect(el).toHaveStyle({
      textAlign: 'center',
      color: theme.fn.themeColor('red'),
    });
  });

  it('renders children without a Text wrapper when withTextWrapper is false', () => {
    render(
      <View>
        <Title withTextWrapper={false}>
          <Text testID="raw">Raw</Text>
        </Title>
      </View>
    );
    expect(screen.getByTestId('raw')).toBeTruthy();
    expect(screen.queryByTestId('title')).toBeNull();
  });

  it('supports accessibilityRole header', () => {
    render(
      <Title accessibilityRole="header" testID="title">
        Heading
      </Title>
    );
    expect(screen.getByRole('header')).toBeTruthy();
  });

  it('accepts a ref without throwing', () => {
    const ref = React.createRef<Text>();
    expect(() => render(<Title ref={ref}>Heading</Title>)).not.toThrow();
  });

  it('has displayName', () => {
    expect(Title.displayName).toBe('Title');
  });
});
