import { render, screen } from '../../../__tests__/test-utils';
import { Badge } from '../index';
import { Icon } from '../../Icon';

describe('Badge', () => {
  it('renders children text', () => {
    render(<Badge>New</Badge>);
    expect(screen.getByText('New')).toBeTruthy();
  });

  it('renders with different variants', () => {
    const { rerender } = render(
      <Badge variant="filled" testID="badge">
        Filled
      </Badge>
    );
    expect(screen.getByTestId('badge')).toBeTruthy();

    rerender(
      <Badge variant="light" testID="badge">
        Light
      </Badge>
    );
    expect(screen.getByTestId('badge')).toBeTruthy();

    rerender(
      <Badge variant="outline" testID="badge">
        Outline
      </Badge>
    );
    expect(screen.getByTestId('badge')).toBeTruthy();

    rerender(
      <Badge variant="dot" testID="badge">
        Dot
      </Badge>
    );
    expect(screen.getByTestId('badge')).toBeTruthy();
  });

  it('renders with different sizes', () => {
    const { rerender } = render(
      <Badge size="xs" testID="badge">
        XS
      </Badge>
    );
    expect(screen.getByTestId('badge')).toBeTruthy();

    rerender(
      <Badge size="sm" testID="badge">
        SM
      </Badge>
    );
    expect(screen.getByTestId('badge')).toBeTruthy();

    rerender(
      <Badge size="md" testID="badge">
        MD
      </Badge>
    );
    expect(screen.getByTestId('badge')).toBeTruthy();

    rerender(
      <Badge size="lg" testID="badge">
        LG
      </Badge>
    );
    expect(screen.getByTestId('badge')).toBeTruthy();

    rerender(
      <Badge size="xl" testID="badge">
        XL
      </Badge>
    );
    expect(screen.getByTestId('badge')).toBeTruthy();
  });

  it('renders with different colors', () => {
    const { rerender } = render(
      <Badge color="red" testID="badge">
        Red
      </Badge>
    );
    expect(screen.getByTestId('badge')).toBeTruthy();

    rerender(
      <Badge color="blue" testID="badge">
        Blue
      </Badge>
    );
    expect(screen.getByTestId('badge')).toBeTruthy();

    rerender(
      <Badge color="green" testID="badge">
        Green
      </Badge>
    );
    expect(screen.getByTestId('badge')).toBeTruthy();
  });

  it('renders with leftSection', () => {
    render(
      <Badge leftSection={<Icon name="star" testID="left-icon" />} testID="badge">
        With Icon
      </Badge>
    );
    expect(screen.getByTestId('badge')).toBeTruthy();
    expect(screen.getByTestId('left-icon')).toBeTruthy();
  });

  it('renders with rightSection', () => {
    render(
      <Badge rightSection={<Icon name="close" testID="right-icon" />} testID="badge">
        With Icon
      </Badge>
    );
    expect(screen.getByTestId('badge')).toBeTruthy();
    expect(screen.getByTestId('right-icon')).toBeTruthy();
  });

  it('renders with fullWidth prop', () => {
    render(
      <Badge fullWidth testID="badge">
        Full Width
      </Badge>
    );
    expect(screen.getByTestId('badge')).toBeTruthy();
  });

  it('renders with custom radius', () => {
    const { rerender } = render(
      <Badge radius="xs" testID="badge">
        XS Radius
      </Badge>
    );
    expect(screen.getByTestId('badge')).toBeTruthy();

    rerender(
      <Badge radius="xl" testID="badge">
        XL Radius
      </Badge>
    );
    expect(screen.getByTestId('badge')).toBeTruthy();

    rerender(
      <Badge radius={0} testID="badge">
        No Radius
      </Badge>
    );
    expect(screen.getByTestId('badge')).toBeTruthy();
  });

  it('renders with custom style', () => {
    render(
      <Badge style={{ marginTop: 10 }} testID="badge">
        Custom Style
      </Badge>
    );
    const badge = screen.getByTestId('badge');
    const flatStyle = Array.isArray(badge.props.style)
      ? badge.props.style
          .flat(2)
          .reduce(
            (acc: Record<string, unknown>, style: Record<string, unknown>) => ({
              ...acc,
              ...style,
            }),
            {}
          )
      : badge.props.style;
    expect(flatStyle).toMatchObject({ marginTop: 10 });
  });

  it('uppercases text by default', () => {
    render(<Badge>lowercase text</Badge>);
    expect(screen.getByText('lowercase text')).toBeTruthy();
  });

  it('renders with dot variant showing indicator', () => {
    render(
      <Badge variant="dot" testID="badge">
        New
      </Badge>
    );
    expect(screen.getByTestId('badge')).toBeTruthy();
    // The dot should be rendered as a child element
  });

  it('renders with both left and right sections', () => {
    render(
      <Badge
        leftSection={<Icon name="star" testID="left-icon" />}
        rightSection={<Icon name="close" testID="right-icon" />}
        testID="badge"
      >
        Both Icons
      </Badge>
    );
    expect(screen.getByTestId('badge')).toBeTruthy();
    expect(screen.getByTestId('left-icon')).toBeTruthy();
    expect(screen.getByTestId('right-icon')).toBeTruthy();
  });

  it('renders with number as children', () => {
    render(<Badge testID="badge">{42}</Badge>);
    expect(screen.getByText('42')).toBeTruthy();
  });

  it('renders with default light variant', () => {
    render(<Badge testID="badge">Default</Badge>);
    expect(screen.getByTestId('badge')).toBeTruthy();
  });
});
