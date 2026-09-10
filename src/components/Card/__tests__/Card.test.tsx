import { Text as RNText } from 'react-native';
import { render, screen } from '../../../__tests__/test-utils';
import { Card, CardSection } from '../index';
import { createTheme } from '../../../theme/create-theme';

const theme = createTheme();

describe('Card', () => {
  it('renders children', () => {
    render(
      <Card>
        <RNText>Card body</RNText>
      </Card>
    );
    expect(screen.getByText('Card body')).toBeTruthy();
  });

  it('exposes Section as a sub-component', () => {
    expect((Card as any).Section).toBe(CardSection);
  });

  it('renders sections and passes testID through to them', () => {
    render(
      <Card>
        <CardSection testID="section">
          <RNText>Section</RNText>
        </CardSection>
      </Card>
    );

    expect(screen.getByText('Section')).toBeTruthy();
    expect(screen.getByTestId('section')).toHaveStyle({ padding: 0 });
  });

  it('lets sections inherit card padding (key and numeric)', () => {
    const { rerender } = render(
      <Card padding="lg">
        <CardSection inheritPadding testID="section" />
      </Card>
    );
    expect(screen.getByTestId('section')).toHaveStyle({
      padding: theme.spacing.lg,
    });

    rerender(
      <Card padding={24}>
        <CardSection inheritPadding testID="section" />
      </Card>
    );
    expect(screen.getByTestId('section')).toHaveStyle({ padding: 24 });

    rerender(
      <Card padding={'weird' as any}>
        <CardSection inheritPadding testID="section" />
      </Card>
    );
    expect(screen.getByTestId('section')).toHaveStyle({
      padding: theme.spacing.md,
    });
  });

  it('supports explicit section padding, border and style', () => {
    const { rerender } = render(
      <Card>
        <CardSection padding="sm" withBorder style={{ opacity: 0.5 }} testID="section" />
      </Card>
    );
    expect(screen.getByTestId('section')).toHaveStyle({
      padding: theme.spacing.sm,
      borderTopWidth: 1,
      borderBottomWidth: 1,
      opacity: 0.5,
    });

    rerender(
      <Card>
        <CardSection padding={9} testID="section" />
      </Card>
    );
    expect(screen.getByTestId('section')).toHaveStyle({ padding: 9 });

    rerender(
      <Card>
        <CardSection padding={'weird' as any} testID="section" />
      </Card>
    );
    expect(screen.getByTestId('section')).toHaveStyle({ padding: 0 });
  });

  it('renders a section outside of a Card', () => {
    render(<CardSection inheritPadding testID="section" />);
    expect(screen.getByTestId('section')).toHaveStyle({ padding: 0 });
  });

  it('forwards testID and accessibility props to the root through Paper', () => {
    render(
      <Card testID="card" accessibilityLabel="Card label">
        <RNText>Body</RNText>
      </Card>
    );

    const root = screen.getByTestId('card');
    expect(root.props.accessibilityLabel).toBe('Card label');
    expect(root).toHaveStyle({ padding: theme.spacing.md });
  });

  it('accepts Paper props (radius, shadow, withBorder, p) and style', () => {
    render(
      <Card radius="lg" shadow="md" withBorder p="xs" style={{ margin: 1 }}>
        <RNText>Paper card</RNText>
      </Card>
    );
    expect(screen.getByText('Paper card')).toBeTruthy();
  });
});
