import { Text as RNText } from 'react-native';
import { render, screen, fireEvent } from '../../../__tests__/test-utils';
import { AspectRatio } from '../index';

describe('AspectRatio', () => {
  it('renders children and passes testID through', () => {
    render(
      <AspectRatio ratio={16 / 9} testID="ratio">
        <RNText>Content</RNText>
      </AspectRatio>
    );

    expect(screen.getByTestId('ratio')).toBeTruthy();
    expect(screen.getByText('Content')).toBeTruthy();
  });

  it('has zero height before layout and computes height from width and ratio', () => {
    render(
      <AspectRatio ratio={2} testID="ratio">
        <RNText>Content</RNText>
      </AspectRatio>
    );

    const root = screen.getByTestId('ratio');
    expect(root).toHaveStyle({ height: 0, width: '100%' });

    fireEvent(root, 'layout', { nativeEvent: { layout: { width: 300, height: 0 } } });
    expect(root).toHaveStyle({ height: 150 });
  });

  it('uses ratio 1 by default', () => {
    render(<AspectRatio ratio={undefined as any} testID="ratio" />);
    const root = screen.getByTestId('ratio');
    fireEvent(root, 'layout', { nativeEvent: { layout: { width: 120, height: 0 } } });
    expect(root).toHaveStyle({ height: 120 });
  });

  it('applies custom style', () => {
    render(<AspectRatio ratio={1} style={{ margin: 6 }} testID="ratio" />);
    expect(screen.getByTestId('ratio')).toHaveStyle({ margin: 6 });
  });
});
