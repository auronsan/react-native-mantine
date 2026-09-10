import { Text, View } from 'react-native';
import { render as rtlRender } from '@testing-library/react-native';
import { render, screen } from '../../../__tests__/test-utils';
import { ThemeProvider } from '../../../theme/theme-provider';
import { createTheme } from '../../../theme/create-theme';
import { Timeline, TimelineItem } from '../index';

const theme = createTheme();
const darkTheme = createTheme({ colorScheme: 'dark' });
const activeBlue = theme.fn.themeColor('blue');
const inactiveBorder = theme.fn.themeColor('gray', 3);
const inactiveBullet = theme.fn.themeColor('gray', 2);

type Instance = ReturnType<typeof screen.getByTestId>;

/** Direct host (native) children of a test instance, skipping composites */
const hostChildren = (instance: Instance): Instance[] =>
  instance.children.flatMap((child: Instance | string): Instance[] => {
    if (typeof child === 'string') {
      return [];
    }
    return typeof child.type === 'string' ? [child] : hostChildren(child);
  });

/** Returns bullet wrapper, bullet, line (if any) and body host views */
const getBulletParts = (itemTestID: string) => {
  const item = screen.getByTestId(itemTestID);
  const [wrapper, body] = hostChildren(item) as [Instance, Instance];
  const [bullet, line] = hostChildren(wrapper) as [Instance, Instance?];
  return { item, wrapper, bullet, line, body };
};

describe('Timeline', () => {
  it('renders items with titles and string content', () => {
    render(
      <Timeline testID="timeline">
        <Timeline.Item title="First">Content one</Timeline.Item>
        <Timeline.Item title="Second">Content two</Timeline.Item>
      </Timeline>
    );
    expect(screen.getByTestId('timeline')).toBeTruthy();
    expect(screen.getByText('First')).toBeTruthy();
    expect(screen.getByText('Content one')).toBeTruthy();
    expect(screen.getByText('Second')).toBeTruthy();
    expect(screen.getByText('Content two')).toBeTruthy();
  });

  it('exposes Timeline.Item and TimelineItem with displayNames', () => {
    expect(Timeline.Item).toBe(TimelineItem);
    expect(Timeline.displayName).toBe('Timeline');
    expect(Timeline.Item.displayName).toBe('Timeline.Item');
  });

  it('renders element title, element children and custom bullet', () => {
    render(
      <Timeline>
        <Timeline.Item
          title={<Text testID="custom-title">Custom</Text>}
          bullet={<View testID="custom-bullet" />}
        >
          <View testID="custom-body" />
        </Timeline.Item>
      </Timeline>
    );
    expect(screen.getByTestId('custom-title')).toBeTruthy();
    expect(screen.getByTestId('custom-bullet')).toBeTruthy();
    expect(screen.getByTestId('custom-body')).toBeTruthy();
  });

  it('renders an item without title or children', () => {
    render(
      <Timeline>
        <Timeline.Item testID="item" />
      </Timeline>
    );
    expect(screen.getByTestId('item')).toBeTruthy();
  });

  it('marks items up to active index as active', () => {
    render(
      <Timeline active={1}>
        <Timeline.Item testID="i0" title="A" />
        <Timeline.Item testID="i1" title="B" />
        <Timeline.Item testID="i2" title="C" />
      </Timeline>
    );
    expect(getBulletParts('i0').bullet).toHaveStyle({
      backgroundColor: activeBlue,
      borderColor: activeBlue,
    });
    expect(getBulletParts('i1').bullet).toHaveStyle({
      backgroundColor: activeBlue,
    });
    expect(getBulletParts('i2').bullet).toHaveStyle({
      backgroundColor: inactiveBullet,
      borderColor: inactiveBorder,
    });
    expect(getBulletParts('i0').line).toHaveStyle({
      borderLeftColor: activeBlue,
      borderLeftWidth: 2,
    });
  });

  it('no item is active by default', () => {
    render(
      <Timeline>
        <Timeline.Item testID="i0" title="A" />
        <Timeline.Item testID="i1" title="B" />
      </Timeline>
    );
    expect(getBulletParts('i0').bullet).toHaveStyle({
      backgroundColor: inactiveBullet,
    });
    expect(getBulletParts('i1').bullet).toHaveStyle({
      backgroundColor: inactiveBullet,
    });
  });

  it('highlights from the end with reverseActive', () => {
    render(
      <Timeline active={0} reverseActive>
        <Timeline.Item testID="i0" title="A" />
        <Timeline.Item testID="i1" title="B" />
        <Timeline.Item testID="i2" title="C" />
      </Timeline>
    );
    expect(getBulletParts('i0').bullet).toHaveStyle({
      backgroundColor: inactiveBullet,
    });
    expect(getBulletParts('i1').bullet).toHaveStyle({
      backgroundColor: inactiveBullet,
    });
    expect(getBulletParts('i2').bullet).toHaveStyle({
      backgroundColor: activeBlue,
    });
  });

  it('renders the connecting line for all but the last item', () => {
    render(
      <Timeline>
        <Timeline.Item testID="i0" title="A" />
        <Timeline.Item testID="i1" title="B" />
      </Timeline>
    );
    expect(getBulletParts('i0').line).toBeTruthy();
    expect(getBulletParts('i0').line).toHaveStyle({ position: 'absolute' });
    expect(getBulletParts('i1').line).toBeUndefined();
  });

  it('applies bulletSize, lineWidth and radius', () => {
    render(
      <Timeline bulletSize={30} lineWidth={4} radius="md">
        <Timeline.Item testID="i0" title="A" />
        <Timeline.Item testID="i1" title="B" bulletSize={12} />
      </Timeline>
    );
    const first = getBulletParts('i0');
    expect(first.bullet).toHaveStyle({
      width: 30,
      height: 30,
      borderRadius: theme.fn.radius('md'),
    });
    expect(first.wrapper).toHaveStyle({ width: 30 });
    expect(first.line).toHaveStyle({
      borderLeftWidth: 4,
      top: 30,
      left: 30 / 2 - 4 / 2,
    });
    expect(getBulletParts('i1').bullet).toHaveStyle({ width: 12, height: 12 });
  });

  it('uses default bullet size and line width', () => {
    render(
      <Timeline>
        <Timeline.Item testID="i0" title="A" />
        <Timeline.Item testID="i1" title="B" />
      </Timeline>
    );
    const first = getBulletParts('i0');
    expect(first.bullet).toHaveStyle({ width: 20, height: 20 });
    expect(first.line).toHaveStyle({ borderLeftWidth: 2 });
  });

  it('applies align left and right', () => {
    const { rerender } = render(
      <Timeline testID="timeline" align="left">
        <Timeline.Item testID="i0" title="A" />
      </Timeline>
    );
    expect(screen.getByTestId('timeline')).toHaveStyle({
      alignItems: 'flex-start',
    });
    expect(screen.getByTestId('i0')).toHaveStyle({ flexDirection: 'row' });
    expect(getBulletParts('i0').body).toHaveStyle({
      paddingLeft: theme.spacing.md,
    });

    rerender(
      <Timeline testID="timeline" align="right">
        <Timeline.Item testID="i0" title="A" />
      </Timeline>
    );
    expect(screen.getByTestId('timeline')).toHaveStyle({
      alignItems: 'flex-end',
    });
    expect(screen.getByTestId('i0')).toHaveStyle({
      flexDirection: 'row-reverse',
    });
    expect(getBulletParts('i0').body).toHaveStyle({
      paddingRight: theme.spacing.md,
    });
  });

  it('applies timeline color and item color override', () => {
    render(
      <Timeline active={1} color="red">
        <Timeline.Item testID="i0" title="A" />
        <Timeline.Item testID="i1" title="B" color="green" />
      </Timeline>
    );
    expect(getBulletParts('i0').bullet).toHaveStyle({
      backgroundColor: theme.fn.themeColor('red'),
    });
    expect(getBulletParts('i1').bullet).toHaveStyle({
      backgroundColor: theme.fn.themeColor('green'),
    });
  });

  it('applies lineVariant solid, dashed and dotted', () => {
    render(
      <Timeline>
        <Timeline.Item testID="solid" title="A" lineVariant="solid" />
        <Timeline.Item testID="dashed" title="B" lineVariant="dashed" />
        <Timeline.Item testID="dotted" title="C" lineVariant="dotted" />
        <Timeline.Item testID="last" title="D" />
      </Timeline>
    );
    const solidStyle = getBulletParts('solid').line?.props.style;
    expect(JSON.stringify(solidStyle)).not.toContain('borderStyle');
    expect(getBulletParts('dashed').line).toHaveStyle({
      borderStyle: 'dashed',
    });
    expect(getBulletParts('dotted').line).toHaveStyle({
      borderStyle: 'dotted',
    });
  });

  it('applies custom style on root and item and passes testID', () => {
    render(
      <Timeline testID="timeline" style={{ margin: 5 }}>
        <Timeline.Item testID="i0" title="A" style={{ padding: 3 }} />
      </Timeline>
    );
    expect(screen.getByTestId('timeline')).toHaveStyle({ margin: 5 });
    expect(screen.getByTestId('i0')).toHaveStyle({ padding: 3 });
  });

  it('last item has no bottom padding, others have spacing', () => {
    render(
      <Timeline>
        <Timeline.Item testID="i0" title="A" />
        <Timeline.Item testID="i1" title="B" />
      </Timeline>
    );
    expect(getBulletParts('i0').body).toHaveStyle({
      paddingBottom: theme.spacing.md,
    });
    expect(getBulletParts('i1').body).toHaveStyle({ paddingBottom: 0 });
  });

  it('passes through non-element children', () => {
    expect(() =>
      render(
        <Timeline>
          <Timeline.Item testID="i0" title="A" />
          {null}
          {false}
        </Timeline>
      )
    ).not.toThrow();
    expect(screen.getByTestId('i0')).toBeTruthy();
  });

  it('uses dark palette in dark color scheme', () => {
    rtlRender(
      <ThemeProvider theme={darkTheme} forceMode="dark">
        <Timeline active={0} lineWidth={3}>
          <Timeline.Item testID="i0" title="A" lineVariant="dashed">
            Body
          </Timeline.Item>
          <Timeline.Item testID="i1" title="B" />
        </Timeline>
      </ThemeProvider>
    );
    const first = getBulletParts('i0');
    expect(first.bullet).toHaveStyle({
      backgroundColor: darkTheme.fn.themeColor('blue'),
    });
    expect(getBulletParts('i1').bullet).toHaveStyle({
      backgroundColor: darkTheme.fn.themeColor('dark', 5),
      borderColor: darkTheme.fn.themeColor('dark', 4),
    });
    expect(screen.getByText('A')).toHaveStyle({ color: darkTheme.white });
    expect(screen.getByText('Body')).toHaveStyle({
      color: darkTheme.fn.themeColor('dark', 2),
    });
  });

  it('throws when Timeline.Item is rendered outside Timeline', () => {
    const spy = jest.spyOn(console, 'error').mockImplementation(() => {});
    expect(() => render(<Timeline.Item title="Orphan" />)).toThrow(
      'Timeline components must be used within Timeline'
    );
    spy.mockRestore();
  });

  it('supports accessibility props on items', () => {
    render(
      <Timeline>
        <Timeline.Item
          testID="i0"
          title="A"
          accessibilityLabel="Step one"
          accessibilityRole="text"
        />
      </Timeline>
    );
    expect(screen.getByLabelText('Step one')).toBeTruthy();
  });
});
