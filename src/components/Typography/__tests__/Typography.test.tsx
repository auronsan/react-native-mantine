import React from 'react';
import { Text, View } from 'react-native';
import { render as rtlRender } from '@testing-library/react-native';
import { render, screen } from '../../../__tests__/test-utils';
import { ThemeProvider } from '../../../theme/theme-provider';
import { createTheme } from '../../../theme/create-theme';
import { Typography } from '../index';

describe('Typography', () => {
  it('wraps string children in Text', () => {
    render(<Typography testID="typo">Hello world</Typography>);
    expect(screen.getByTestId('typo')).toBeTruthy();
    expect(screen.getByText('Hello world')).toBeTruthy();
  });

  it('wraps number children in Text', () => {
    render(<Typography>{42}</Typography>);
    expect(screen.getByText('42')).toBeTruthy();
  });

  it('renders element children as-is', () => {
    render(
      <Typography>
        <View testID="child" />
        <Text>Paragraph</Text>
      </Typography>
    );
    expect(screen.getByTestId('child')).toBeTruthy();
    expect(screen.getByText('Paragraph')).toBeTruthy();
  });

  it('renders mixed children', () => {
    render(
      <Typography>
        Intro
        <Text>Body</Text>
      </Typography>
    );
    expect(screen.getByText('Intro')).toBeTruthy();
    expect(screen.getByText('Body')).toBeTruthy();
  });

  it('applies textStyle to string children', () => {
    render(<Typography textStyle={{ color: 'red' }}>Styled</Typography>);
    expect(screen.getByText('Styled')).toHaveStyle({ color: 'red' });
  });

  it('applies custom style to root', () => {
    render(
      <Typography testID="typo" style={{ padding: 7 }}>
        Text
      </Typography>
    );
    expect(screen.getByTestId('typo')).toHaveStyle({ padding: 7 });
  });

  it('renders without children', () => {
    render(<Typography testID="typo" />);
    expect(screen.getByTestId('typo')).toBeTruthy();
  });

  it('accepts a ref without throwing', () => {
    const ref = React.createRef<View>();
    expect(() => render(<Typography ref={ref}>Text</Typography>)).not.toThrow();
  });

  it('uses light text color in dark color scheme', () => {
    const darkTheme = createTheme({ colorScheme: 'dark' });
    rtlRender(
      <ThemeProvider theme={darkTheme} forceMode="dark">
        <Typography>Dark text</Typography>
      </ThemeProvider>
    );
    expect(screen.getByText('Dark text')).toHaveStyle({
      color: darkTheme.fn.themeColor('dark', 0),
    });
  });

  it('has displayName', () => {
    expect(Typography.displayName).toBe('Typography');
  });
});
