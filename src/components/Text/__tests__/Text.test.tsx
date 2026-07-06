import { render, screen } from '../../../__tests__/test-utils';
import { Text } from '../index';

describe('Text', () => {
  it('renders children text', () => {
    render(<Text>Hello World</Text>);
    expect(screen.getByText('Hello World')).toBeTruthy();
  });

  it('renders with different sizes', () => {
    const { rerender } = render(<Text size="xs">Extra Small</Text>);
    expect(screen.getByText('Extra Small')).toBeTruthy();

    rerender(<Text size="sm">Small</Text>);
    expect(screen.getByText('Small')).toBeTruthy();

    rerender(<Text size="md">Medium</Text>);
    expect(screen.getByText('Medium')).toBeTruthy();

    rerender(<Text size="lg">Large</Text>);
    expect(screen.getByText('Large')).toBeTruthy();

    rerender(<Text size="xl">Extra Large</Text>);
    expect(screen.getByText('Extra Large')).toBeTruthy();
  });

  it('renders with different colors', () => {
    render(
      <Text color="red" testID="red-text">
        Red Text
      </Text>
    );
    expect(screen.getByTestId('red-text')).toBeTruthy();

    render(
      <Text color="blue" testID="blue-text">
        Blue Text
      </Text>
    );
    expect(screen.getByTestId('blue-text')).toBeTruthy();
  });

  it('renders with white prop', () => {
    render(
      <Text white testID="white-text">
        White Text
      </Text>
    );
    const textElement = screen.getByTestId('white-text');
    expect(textElement).toBeTruthy();
    expect(textElement.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ color: 'white' }),
      ])
    );
  });

  it('renders with weight prop', () => {
    const { rerender } = render(<Text weight="bold">Bold Text</Text>);
    expect(screen.getByText('Bold Text')).toBeTruthy();

    rerender(<Text weight="600">SemiBold Text</Text>);
    expect(screen.getByText('SemiBold Text')).toBeTruthy();
  });

  it('renders with bold prop', () => {
    render(<Text bold>Bold Text</Text>);
    const textElement = screen.getByText('Bold Text');
    expect(textElement.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ fontWeight: expect.any(String) }),
      ])
    );
  });

  it('renders with semiBold prop', () => {
    render(<Text semiBold>SemiBold Text</Text>);
    const textElement = screen.getByText('SemiBold Text');
    expect(textElement.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ fontWeight: expect.any(String) }),
      ])
    );
  });

  it('renders with align prop', () => {
    const { rerender } = render(<Text align="left">Left Aligned</Text>);
    expect(screen.getByText('Left Aligned')).toBeTruthy();

    rerender(<Text align="center">Center Aligned</Text>);
    expect(screen.getByText('Center Aligned')).toBeTruthy();

    rerender(<Text align="right">Right Aligned</Text>);
    expect(screen.getByText('Right Aligned')).toBeTruthy();

    rerender(<Text align="justify">Justified</Text>);
    expect(screen.getByText('Justified')).toBeTruthy();
  });

  it('renders with italic prop', () => {
    render(<Text italic>Italic Text</Text>);
    const textElement = screen.getByText('Italic Text');
    expect(textElement.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ fontStyle: 'italic' }),
      ])
    );
  });

  it('renders with underline prop', () => {
    render(<Text underline>Underlined Text</Text>);
    const textElement = screen.getByText('Underlined Text');
    expect(textElement.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ textDecorationLine: 'underline' }),
      ])
    );
  });

  it('renders with strikethrough prop', () => {
    render(<Text strikethrough>Strikethrough Text</Text>);
    const textElement = screen.getByText('Strikethrough Text');
    expect(textElement.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ textDecorationLine: 'line-through' }),
      ])
    );
  });

  it('renders with transform prop', () => {
    const { rerender } = render(<Text transform="uppercase">Uppercase</Text>);
    const textElement = screen.getByText('Uppercase');
    expect(textElement.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ textTransform: 'uppercase' }),
      ])
    );

    rerender(<Text transform="lowercase">Lowercase</Text>);
    expect(screen.getByText('Lowercase')).toBeTruthy();

    rerender(<Text transform="capitalize">Capitalize</Text>);
    expect(screen.getByText('Capitalize')).toBeTruthy();
  });

  it('renders with inherit prop', () => {
    render(<Text inherit>Inherited Text</Text>);
    expect(screen.getByText('Inherited Text')).toBeTruthy();
  });

  it('renders with monospace prop', () => {
    render(<Text monospace>Monospace Text</Text>);
    const textElement = screen.getByText('Monospace Text');
    expect(textElement).toBeTruthy();
  });

  it('renders with lineHeight prop', () => {
    render(<Text lineHeight="md">Text with Line Height</Text>);
    expect(screen.getByText('Text with Line Height')).toBeTruthy();
  });

  it('renders with custom style', () => {
    render(
      <Text style={{ marginTop: 10 }} testID="custom-style">
        Custom Style
      </Text>
    );
    const textElement = screen.getByTestId('custom-style');
    expect(textElement.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ marginTop: 10 }),
      ])
    );
  });
});
