import { Text, View } from 'react-native';
import { render, screen } from '../../../__tests__/test-utils';
import {
  DEFAULT_PORTAL_HOST,
  Portal,
  PortalHost,
  PortalProvider,
} from '../index';

describe('Portal', () => {
  let warnSpy: jest.SpyInstance;

  beforeEach(() => {
    warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
  });

  afterEach(() => {
    warnSpy.mockRestore();
  });

  it('exports the default host name', () => {
    expect(DEFAULT_PORTAL_HOST).toBe('default');
  });

  it('renders children into the provider overlay', () => {
    render(
      <PortalProvider>
        <View testID="app">
          <Portal>
            <Text>Portaled content</Text>
          </Portal>
        </View>
      </PortalProvider>
    );

    expect(screen.getByText('Portaled content')).toBeTruthy();
    // content is rendered in the overlay, not inside the app subtree
    expect(
      screen.queryByText('Portaled content', { includeHiddenElements: true })
    ).toBeTruthy();
    expect(warnSpy).not.toHaveBeenCalled();
  });

  it('renders children into a named PortalHost', () => {
    render(
      <PortalProvider>
        <View>
          <Portal target="custom-host">
            <Text>Hosted content</Text>
          </Portal>
        </View>
        <View testID="host-wrapper">
          <PortalHost name="custom-host" />
        </View>
      </PortalProvider>
    );

    expect(screen.getByText('Hosted content')).toBeTruthy();
  });

  it('does not render content targeting a host that is not mounted', () => {
    render(
      <PortalProvider>
        <Portal target="missing-host">
          <Text>Orphan content</Text>
        </Portal>
      </PortalProvider>
    );

    expect(screen.queryByText('Orphan content')).toBeNull();
  });

  it('PortalHost renders nothing when no portal targets it', () => {
    render(
      <PortalProvider>
        <View testID="wrapper">
          <PortalHost name="empty-host" />
        </View>
      </PortalProvider>
    );

    expect(screen.getByTestId('wrapper')).toBeEmptyElement();
  });

  it('renders multiple portals into the same host', () => {
    render(
      <PortalProvider>
        <Portal>
          <Text>First</Text>
        </Portal>
        <Portal>
          <Text>Second</Text>
        </Portal>
      </PortalProvider>
    );

    expect(screen.getByText('First')).toBeTruthy();
    expect(screen.getByText('Second')).toBeTruthy();
  });

  it('updates portal content when children change', () => {
    const { rerender } = render(
      <PortalProvider>
        <Portal>
          <Text>Version 1</Text>
        </Portal>
      </PortalProvider>
    );

    expect(screen.getByText('Version 1')).toBeTruthy();

    rerender(
      <PortalProvider>
        <Portal>
          <Text>Version 2</Text>
        </Portal>
      </PortalProvider>
    );

    expect(screen.queryByText('Version 1')).toBeNull();
    expect(screen.getByText('Version 2')).toBeTruthy();
  });

  it('removes portal content from the host on unmount', () => {
    const Wrapper = ({ show }: { show: boolean }) => (
      <PortalProvider>
        <Portal>
          <Text>Persistent</Text>
        </Portal>
        {show && (
          <Portal>
            <Text>Temporary</Text>
          </Portal>
        )}
      </PortalProvider>
    );

    const { rerender } = render(<Wrapper show />);
    expect(screen.getByText('Temporary')).toBeTruthy();

    rerender(<Wrapper show={false} />);
    expect(screen.queryByText('Temporary')).toBeNull();
    expect(screen.getByText('Persistent')).toBeTruthy();
  });

  it('removes content from a named host on unmount', () => {
    const Wrapper = ({ show }: { show: boolean }) => (
      <PortalProvider>
        {show && (
          <Portal target="named">
            <Text>Named content</Text>
          </Portal>
        )}
        <PortalHost name="named" />
      </PortalProvider>
    );

    const { rerender } = render(<Wrapper show />);
    expect(screen.getByText('Named content')).toBeTruthy();

    rerender(<Wrapper show={false} />);
    expect(screen.queryByText('Named content')).toBeNull();
  });

  it('renders children in place and warns once without a provider', () => {
    render(
      <View>
        <Portal>
          <Text>Inline fallback</Text>
        </Portal>
        <Portal>
          <Text>Second inline</Text>
        </Portal>
      </View>
    );

    expect(screen.getByText('Inline fallback')).toBeTruthy();
    expect(screen.getByText('Second inline')).toBeTruthy();
    expect(warnSpy).toHaveBeenCalledTimes(1);
    expect(warnSpy.mock.calls[0]?.[0]).toMatch(/no PortalProvider found/);
  });

  it('does not warn again on subsequent renders without a provider', () => {
    render(
      <Portal>
        <Text>Another inline</Text>
      </Portal>
    );

    expect(screen.getByText('Another inline')).toBeTruthy();
    expect(warnSpy).not.toHaveBeenCalled();
  });

  it('exposes display names', () => {
    expect(Portal.displayName).toBe('Portal');
    expect(PortalHost.displayName).toBe('PortalHost');
    expect(PortalProvider.displayName).toBe('PortalProvider');
  });
});
