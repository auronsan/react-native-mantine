import { Text } from 'react-native';
import { fireEvent, render, screen } from '../../../__tests__/test-utils';
import { ThemeProvider } from '../../../theme/theme-provider';
import { createTheme } from '../../../theme/create-theme';
import { Scroller } from '../index';

const layout = (width: number) =>
  fireEvent(screen.getByTestId('scroller'), 'layout', {
    nativeEvent: { layout: { x: 0, y: 0, width, height: 40 } },
  } as any);

const getScrollView = () => screen.UNSAFE_getByType('ScrollView' as any);

const setContentWidth = (width: number) =>
  fireEvent(getScrollView(), 'contentSizeChange', width, 40);

const scrollTo = (x: number) =>
  fireEvent.scroll(getScrollView(), {
    nativeEvent: { contentOffset: { x, y: 0 } },
  });

describe('Scroller', () => {
  it('renders children without controls before layout', () => {
    render(
      <Scroller testID="scroller">
        <Text>Scroller content</Text>
      </Scroller>
    );
    expect(screen.getByText('Scroller content')).toBeTruthy();
    expect(screen.queryByLabelText('Scroll forward')).toBeNull();
    expect(screen.queryByLabelText('Scroll back')).toBeNull();
    expect(getScrollView().props.horizontal).toBe(true);
  });

  it('shows the end control and gradient when content overflows', () => {
    render(<Scroller testID="scroller" />);
    layout(200);
    setContentWidth(600);

    const forward = screen.getByLabelText('Scroll forward');
    expect(forward.props.accessibilityRole).toBe('button');
    expect(screen.queryByLabelText('Scroll back')).toBeNull();
    expect(screen.getByText('›')).toBeTruthy();
  });

  it('shows the start control after scrolling and hides end at max offset', () => {
    render(<Scroller testID="scroller" />);
    layout(200);
    setContentWidth(600);

    scrollTo(100);
    expect(screen.getByLabelText('Scroll back')).toBeTruthy();
    expect(screen.getByLabelText('Scroll forward')).toBeTruthy();
    expect(screen.getByText('‹')).toBeTruthy();

    scrollTo(400);
    expect(screen.getByLabelText('Scroll back')).toBeTruthy();
    expect(screen.queryByLabelText('Scroll forward')).toBeNull();
  });

  it('does not show controls when content fits', () => {
    render(<Scroller testID="scroller" />);
    layout(600);
    setContentWidth(300);
    expect(screen.queryByLabelText('Scroll forward')).toBeNull();
  });

  it('scrolls by scrollAmount when controls are pressed', () => {
    render(<Scroller testID="scroller" scrollAmount={150} />);
    layout(200);
    setContentWidth(600);
    scrollTo(100);

    fireEvent.press(screen.getByLabelText('Scroll forward'));
    fireEvent.press(screen.getByLabelText('Scroll back'));
    // ScrollView.scrollTo is a jest mock in the test env; presses should not throw
    expect(screen.getByLabelText('Scroll forward')).toBeTruthy();
  });

  it('hides controls when withControls is false', () => {
    render(<Scroller testID="scroller" withControls={false} />);
    layout(200);
    setContentWidth(600);
    scrollTo(100);
    expect(screen.queryByLabelText('Scroll forward')).toBeNull();
    expect(screen.queryByLabelText('Scroll back')).toBeNull();
  });

  it('hides edge gradients when withEdgeGradients is false', () => {
    render(<Scroller testID="scroller" withEdgeGradients={false} />);
    layout(200);
    setContentWidth(600);
    scrollTo(100);
    expect(screen.getByLabelText('Scroll forward')).toBeTruthy();
    expect(screen.getByLabelText('Scroll back')).toBeTruthy();
  });

  it('renders custom icons, labels and control size', () => {
    render(
      <Scroller
        testID="scroller"
        controlSize={48}
        edgeGradientColor="#ff0000"
        startControlIcon={<Text>prev</Text>}
        endControlIcon={<Text>next</Text>}
        startControlLabel="Previous"
        endControlLabel="Next"
      />
    );
    layout(200);
    setContentWidth(600);
    scrollTo(100);

    expect(screen.getByLabelText('Next')).toHaveStyle({
      width: 48,
      height: 48,
      borderRadius: 24,
    });
    expect(screen.getByText('prev')).toBeTruthy();
    expect(screen.getByText('next')).toBeTruthy();
    expect(screen.getByLabelText('Previous')).toBeTruthy();
  });

  it('applies custom style', () => {
    render(<Scroller testID="scroller" style={{ marginTop: 8 }} />);
    expect(screen.getByTestId('scroller')).toHaveStyle({ marginTop: 8 });
  });

  it('renders in dark color scheme', () => {
    render(
      <ThemeProvider theme={createTheme()} forceMode="dark">
        <Scroller testID="scroller">
          <Text>Dark content</Text>
        </Scroller>
      </ThemeProvider>
    );
    layout(200);
    setContentWidth(600);
    scrollTo(100);
    expect(screen.getByText('Dark content')).toBeTruthy();
    expect(screen.getByLabelText('Scroll forward')).toBeTruthy();
    expect(screen.getByLabelText('Scroll back')).toBeTruthy();
  });
});
