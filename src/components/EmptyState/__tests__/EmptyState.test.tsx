import { StyleSheet, Text as RNText, View } from 'react-native';
import { render, screen } from '../../../__tests__/test-utils';
import {
  EmptyState,
  EmptyStateIndicator,
  EmptyStateTitle,
  EmptyStateDescription,
  EmptyStateActions,
} from '../index';
import { createTheme } from '../../../theme/create-theme';

const theme = createTheme();

describe('EmptyState', () => {
  it('exposes sub-components', () => {
    expect(EmptyState.Indicator).toBe(EmptyStateIndicator);
    expect(EmptyState.Title).toBe(EmptyStateTitle);
    expect(EmptyState.Description).toBe(EmptyStateDescription);
    expect(EmptyState.Actions).toBe(EmptyStateActions);
  });

  it('renders icon, title, description and children centered by default', () => {
    render(
      <EmptyState
        icon={<View testID="icon" />}
        title="Nothing here"
        description="Add something"
        testID="empty"
      >
        <EmptyState.Actions testID="actions">
          <RNText>Action</RNText>
        </EmptyState.Actions>
      </EmptyState>
    );

    expect(screen.getByTestId('empty')).toHaveStyle({ alignItems: 'center' });
    expect(screen.getByTestId('icon')).toBeTruthy();
    expect(screen.getByText('Nothing here')).toHaveStyle({
      fontSize: 18,
      textAlign: 'center',
    });
    expect(screen.getByText('Add something')).toHaveStyle({
      fontSize: theme.fontSizes.md,
      textAlign: 'center',
    });
    expect(screen.getByTestId('actions')).toHaveStyle({ justifyContent: 'center' });
    expect(screen.getByText('Action')).toBeTruthy();
  });

  it('omits optional parts when not provided', () => {
    render(<EmptyState testID="empty" />);
    expect(screen.getByTestId('empty')).toBeTruthy();
    expect(screen.getByTestId('empty').props.children[0]).toBeFalsy();
  });

  it('aligns content to the left and right', () => {
    const { rerender } = render(
      <EmptyState align="left" title="T" description="D" testID="empty">
        <EmptyState.Actions testID="actions" />
      </EmptyState>
    );
    expect(screen.getByTestId('empty')).toHaveStyle({ flexDirection: 'row' });
    expect(screen.getByText('T')).toHaveStyle({ textAlign: 'left' });
    expect(screen.getByText('D')).toHaveStyle({ textAlign: 'left' });
    expect(screen.getByTestId('actions')).toHaveStyle({ justifyContent: 'flex-start' });

    rerender(
      <EmptyState align="right" title="T" description="D" testID="empty">
        <EmptyState.Actions testID="actions" />
      </EmptyState>
    );
    expect(screen.getByTestId('empty')).toHaveStyle({ flexDirection: 'row-reverse' });
    expect(screen.getByText('T')).toHaveStyle({ textAlign: 'right' });
    expect(screen.getByText('D')).toHaveStyle({ textAlign: 'right' });
    expect(screen.getByTestId('actions')).toHaveStyle({ justifyContent: 'flex-end' });
  });

  it('sizes the indicator and title by size', () => {
    const indicatorSizes = { xs: 32, sm: 40, md: 48, lg: 60, xl: 72 };
    const titleSizes = { xs: 14, sm: 16, md: 18, lg: 20, xl: 24 };
    (Object.keys(indicatorSizes) as Array<keyof typeof indicatorSizes>).forEach((size) => {
      const { unmount } = render(
        <EmptyState size={size} icon={<View />} title="Title">
          <EmptyState.Indicator testID="indicator" />
        </EmptyState>
      );
      expect(screen.getByTestId('indicator')).toHaveStyle({
        width: indicatorSizes[size],
        borderRadius: indicatorSizes[size] / 2,
      });
      expect(screen.getByText('Title')).toHaveStyle({ fontSize: titleSizes[size] });
      unmount();
    });
  });

  it('applies indicator background for light and filled variants with colors', () => {
    const { rerender } = render(
      <EmptyState withIndicatorBackground color="red" variant="light">
        <EmptyState.Indicator testID="indicator" />
      </EmptyState>
    );
    const background = () =>
      StyleSheet.flatten(screen.getByTestId('indicator').props.style).backgroundColor;
    expect(background()).toBeTruthy();

    rerender(
      <EmptyState withIndicatorBackground variant="filled">
        <EmptyState.Indicator testID="indicator" />
      </EmptyState>
    );
    expect(background()).toBeTruthy();

    rerender(
      <EmptyState>
        <EmptyState.Indicator testID="indicator" />
      </EmptyState>
    );
    expect(background()).toBeUndefined();
  });

  it('applies textStyle and style to sub-components and works outside EmptyState', () => {
    render(
      <View>
        <EmptyStateTitle textStyle={{ letterSpacing: 1 }} style={{ margin: 1 }} testID="title">
          Solo title
        </EmptyStateTitle>
        <EmptyStateDescription
          textStyle={{ letterSpacing: 2 }}
          style={{ margin: 2 }}
          testID="description"
        >
          Solo description
        </EmptyStateDescription>
        <EmptyStateIndicator style={{ margin: 3 }} testID="indicator" />
        <EmptyStateActions style={{ margin: 4 }} testID="actions" />
      </View>
    );

    expect(screen.getByText('Solo title')).toHaveStyle({ letterSpacing: 1 });
    expect(screen.getByTestId('title')).toHaveStyle({ margin: 1 });
    expect(screen.getByText('Solo description')).toHaveStyle({ letterSpacing: 2 });
    expect(screen.getByTestId('description')).toHaveStyle({ margin: 2, maxWidth: 512 });
    expect(screen.getByTestId('indicator')).toHaveStyle({ margin: 3, width: 48 });
    expect(screen.getByTestId('actions')).toHaveStyle({ margin: 4 });
  });
});
