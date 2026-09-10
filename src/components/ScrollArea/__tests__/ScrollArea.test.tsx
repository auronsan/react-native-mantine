import { Text } from 'react-native';
import { fireEvent, render, screen } from '../../../__tests__/test-utils';
import { ScrollArea } from '../index';

describe('ScrollArea', () => {
  it('renders children with default props', () => {
    render(
      <ScrollArea testID="scroll">
        <Text>Content</Text>
      </ScrollArea>
    );
    const scroll = screen.getByTestId('scroll');
    expect(screen.getByText('Content')).toBeTruthy();
    expect(scroll.props.horizontal).toBe(false);
    expect(scroll.props.showsVerticalScrollIndicator).toBe(true);
    expect(scroll.props.showsHorizontalScrollIndicator).toBe(true);
    expect(scroll.props.scrollEventThrottle).toBe(16);
    expect(scroll.props.onScroll).toBeUndefined();
  });

  it('hides indicators when type is never', () => {
    render(<ScrollArea type="never" testID="scroll" />);
    const scroll = screen.getByTestId('scroll');
    expect(scroll.props.showsVerticalScrollIndicator).toBe(false);
    expect(scroll.props.showsHorizontalScrollIndicator).toBe(false);
  });

  it.each(['auto', 'always', 'scroll', 'hover'] as const)(
    'shows indicators for type %s',
    (type) => {
      render(<ScrollArea type={type} testID="scroll" />);
      expect(
        screen.getByTestId('scroll').props.showsVerticalScrollIndicator
      ).toBe(true);
    }
  );

  it('supports horizontal scrolling', () => {
    render(<ScrollArea horizontal testID="scroll" />);
    expect(screen.getByTestId('scroll').props.horizontal).toBe(true);
  });

  it('reports scroll position via onScrollPositionChange', () => {
    const onScrollPositionChange = jest.fn();
    render(
      <ScrollArea
        testID="scroll"
        onScrollPositionChange={onScrollPositionChange}
      />
    );
    fireEvent.scroll(screen.getByTestId('scroll'), {
      nativeEvent: { contentOffset: { x: 5, y: 120 } },
    });
    expect(onScrollPositionChange).toHaveBeenCalledWith({ x: 5, y: 120 });
  });

  it('forwards the raw onScroll event', () => {
    const onScroll = jest.fn();
    render(<ScrollArea testID="scroll" onScroll={onScroll} />);
    fireEvent.scroll(screen.getByTestId('scroll'), {
      nativeEvent: { contentOffset: { x: 0, y: 10 } },
    });
    expect(onScroll).toHaveBeenCalledTimes(1);
    expect(onScroll.mock.calls[0]?.[0].nativeEvent.contentOffset.y).toBe(10);
  });

  it('calls both onScroll and onScrollPositionChange', () => {
    const onScroll = jest.fn();
    const onScrollPositionChange = jest.fn();
    render(
      <ScrollArea
        testID="scroll"
        onScroll={onScroll}
        onScrollPositionChange={onScrollPositionChange}
      />
    );
    fireEvent.scroll(screen.getByTestId('scroll'), {
      nativeEvent: { contentOffset: { x: 1, y: 2 } },
    });
    expect(onScroll).toHaveBeenCalledTimes(1);
    expect(onScrollPositionChange).toHaveBeenCalledWith({ x: 1, y: 2 });
  });

  it('applies custom style', () => {
    render(<ScrollArea testID="scroll" style={{ height: 100 }} />);
    expect(screen.getByTestId('scroll')).toHaveStyle({ height: 100 });
  });

  it('passes ScrollView props through', () => {
    render(
      <ScrollArea testID="scroll" bounces={false} accessibilityLabel="List" />
    );
    expect(screen.getByTestId('scroll').props.bounces).toBe(false);
    expect(screen.getByLabelText('List')).toBeTruthy();
  });

  describe('ScrollArea.Autosize', () => {
    it('applies maxHeight and flexGrow 0', () => {
      render(
        <ScrollArea.Autosize maxHeight={200} testID="autosize">
          <Text>Autosized</Text>
        </ScrollArea.Autosize>
      );
      expect(screen.getByText('Autosized')).toBeTruthy();
      expect(screen.getByTestId('autosize')).toHaveStyle({
        maxHeight: 200,
        flexGrow: 0,
      });
    });

    it('merges custom style', () => {
      render(
        <ScrollArea.Autosize
          maxHeight={150}
          style={{ marginTop: 4 }}
          type="never"
          testID="autosize"
        />
      );
      const scroll = screen.getByTestId('autosize');
      expect(scroll).toHaveStyle({ maxHeight: 150, marginTop: 4 });
      expect(scroll.props.showsVerticalScrollIndicator).toBe(false);
    });

    it('exposes display names', () => {
      expect(ScrollArea.displayName).toBe('ScrollArea');
      expect(ScrollArea.Autosize.displayName).toBe('ScrollArea.Autosize');
    });
  });
});
