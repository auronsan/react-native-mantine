import React from 'react';
import { render } from '@testing-library/react-native';
import { ThemeProvider } from '../theme/theme-provider';
import { createTheme } from '../theme/create-theme';

const theme = createTheme();

function AllProviders({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider theme={theme} forceMode="light">
      {children}
    </ThemeProvider>
  );
}

function customRender(ui: React.ReactElement, options?: any) {
  return render(ui, { wrapper: AllProviders, ...options });
}

export * from '@testing-library/react-native';
export { customRender as render };
