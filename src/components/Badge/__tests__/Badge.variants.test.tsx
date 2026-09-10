import React from 'react';
import { Text as RNText } from 'react-native';
import { render as rtlRender } from '@testing-library/react-native';
import { render, screen } from '../../../__tests__/test-utils';
import { Badge } from '../index';
import { ThemeProvider } from '../../../theme/theme-provider';
import { createTheme } from '../../../theme/create-theme';

const theme = createTheme();

function renderWith(
  ui: React.ReactElement,
  options: { mode?: 'light' | 'dark'; components?: Record<string, any> } = {}
) {
  const customTheme = createTheme({ components: options.components } as any);
  return rtlRender(
    <ThemeProvider theme={customTheme} forceMode={options.mode ?? 'light'}>
      {ui}
    </ThemeProvider>
  );
}

describe('Badge variants and theme defaults', () => {
  it('passes testID through', () => {
    render(<Badge testID="badge">New</Badge>);
    expect(screen.getByTestId('badge')).toBeTruthy();
  });

  it('falls back to filled styles for an unknown variant and md for an unknown size', () => {
    render(
      <Badge variant={'weird' as any} size={'giant' as any} testID="badge">
        Odd
      </Badge>
    );

    expect(screen.getByTestId('badge')).toHaveStyle({ height: 20 });
    expect(screen.getByText('Odd')).toBeTruthy();
  });

  it('renders the dot variant with dark color scheme colors', () => {
    renderWith(
      <Badge variant="dot" testID="badge">
        Online
      </Badge>,
      { mode: 'dark' }
    );

    expect(screen.getByTestId('badge')).toHaveStyle({
      backgroundColor: theme.colors.dark![5],
      borderColor: theme.colors.dark![4],
    });
  });

  it('falls back to its own defaults when theme defaultProps are null', () => {
    renderWith(
      <Badge testID="badge">Themed</Badge>,
      {
        components: {
          Badge: {
            defaultProps: {
              color: null,
              radius: null,
              fullWidth: null,
              variant: null,
              size: null,
            },
          },
        },
      }
    );

    expect(screen.getByTestId('badge')).toHaveStyle({
      height: 20,
      borderRadius: theme.radius.xl,
    });
    expect(screen.getByText('Themed')).toBeTruthy();
  });

  it('accepts theme defaultProps as a function', () => {
    renderWith(<Badge testID="badge">Fn</Badge>, {
      components: {
        Badge: { defaultProps: () => ({ variant: 'dot', color: null }) },
      },
    });

    expect(screen.getByTestId('badge')).toHaveStyle({ borderWidth: 1 });
  });

  it('renders raw children when withTextWrapper is false', () => {
    render(
      <Badge withTextWrapper={false}>
        <RNText>Raw</RNText>
      </Badge>
    );
    expect(screen.getByText('Raw')).toBeTruthy();
  });
});
