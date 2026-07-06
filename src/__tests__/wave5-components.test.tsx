import { Text as RNText, View } from 'react-native';
import { render, fireEvent, act } from './test-utils';
import {
  Affix,
  AppShell,
  Button,
  HoverCard,
  Portal,
  PortalHost,
  PortalProvider,
  ScrollArea,
  Text,
} from '../index';

describe('Portal', () => {
  it('renders children into the provider overlay', () => {
    const { getByText } = render(
      <PortalProvider>
        <View>
          <Portal>
            <RNText>Portaled content</RNText>
          </Portal>
        </View>
      </PortalProvider>
    );

    expect(getByText('Portaled content')).toBeTruthy();
  });

  it('renders children into a named host', () => {
    const { getByText } = render(
      <PortalProvider>
        <View>
          <Portal target="custom-host">
            <RNText>Hosted content</RNText>
          </Portal>
        </View>
        <PortalHost name="custom-host" />
      </PortalProvider>
    );

    expect(getByText('Hosted content')).toBeTruthy();
  });

  it('falls back to inline rendering without a provider', () => {
    const { getByText } = render(
      <Portal>
        <RNText>Inline fallback</RNText>
      </Portal>
    );

    expect(getByText('Inline fallback')).toBeTruthy();
  });
});

describe('Affix', () => {
  it('renders children with absolute positioning inside the portal overlay', () => {
    const { getByText } = render(
      <PortalProvider>
        <Affix position={{ bottom: 20, right: 20 }}>
          <RNText>Affixed</RNText>
        </Affix>
      </PortalProvider>
    );

    expect(getByText('Affixed')).toBeTruthy();
  });
});

describe('ScrollArea', () => {
  it('renders content and reports scroll position', () => {
    const onScrollPositionChange = jest.fn();
    const { getByText, getByTestId } = render(
      <ScrollArea
        testID="scroll-area"
        onScrollPositionChange={onScrollPositionChange}
      >
        <RNText>Scrollable content</RNText>
      </ScrollArea>
    );

    expect(getByText('Scrollable content')).toBeTruthy();

    fireEvent.scroll(getByTestId('scroll-area'), {
      nativeEvent: { contentOffset: { x: 0, y: 120 } },
    });

    expect(onScrollPositionChange).toHaveBeenCalledWith({ x: 0, y: 120 });
  });

  it('renders Autosize variant', () => {
    const { getByText } = render(
      <ScrollArea.Autosize maxHeight={200}>
        <RNText>Autosized</RNText>
      </ScrollArea.Autosize>
    );

    expect(getByText('Autosized')).toBeTruthy();
  });
});

describe('HoverCard', () => {
  it('opens the dropdown when the target is pressed', () => {
    jest.useFakeTimers();

    const { getByText, queryByText } = render(
      <HoverCard openDelay={0} closeDelay={0}>
        <HoverCard.Target>
          <Button>Hover target</Button>
        </HoverCard.Target>
        <HoverCard.Dropdown>
          <Text>Card details</Text>
        </HoverCard.Dropdown>
      </HoverCard>
    );

    expect(queryByText('Card details')).toBeNull();

    fireEvent.press(getByText('Hover target'));
    act(() => {
      jest.runAllTimers();
    });

    expect(getByText('Card details')).toBeTruthy();

    jest.useRealTimers();
  });
});

describe('AppShell', () => {
  it('renders all sections', () => {
    const { getByText } = render(
      <AppShell
        header={{ height: 60 }}
        footer={{ height: 40 }}
        navbar={{ width: 200 }}
        aside={{ width: 150 }}
      >
        <AppShell.Header>
          <RNText>Header</RNText>
        </AppShell.Header>
        <AppShell.Navbar>
          <RNText>Navbar</RNText>
        </AppShell.Navbar>
        <AppShell.Aside>
          <RNText>Aside</RNText>
        </AppShell.Aside>
        <AppShell.Main>
          <RNText>Main content</RNText>
        </AppShell.Main>
        <AppShell.Footer>
          <RNText>Footer</RNText>
        </AppShell.Footer>
      </AppShell>
    );

    expect(getByText('Header')).toBeTruthy();
    expect(getByText('Navbar')).toBeTruthy();
    expect(getByText('Aside')).toBeTruthy();
    expect(getByText('Main content')).toBeTruthy();
    expect(getByText('Footer')).toBeTruthy();
  });

  it('hides collapsed navbar', () => {
    const { queryByText } = render(
      <AppShell navbar={{ width: 200, collapsed: true }}>
        <AppShell.Navbar>
          <RNText>Hidden navbar</RNText>
        </AppShell.Navbar>
        <AppShell.Main>
          <RNText>Main content</RNText>
        </AppShell.Main>
      </AppShell>
    );

    expect(queryByText('Hidden navbar')).toBeNull();
  });
});
