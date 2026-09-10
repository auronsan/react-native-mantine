import { Modal, ScrollView, StyleSheet, Text as RNText, View } from 'react-native';
import { render, screen, fireEvent, act } from '../../../__tests__/test-utils';
import { Drawer } from '../index';
import { Overlay } from '../../Overlay';
import { createTheme } from '../../../theme/create-theme';

const theme = createTheme();

describe('Drawer', () => {
  it('renders nothing when closed', () => {
    render(
      <Drawer opened={false} onClose={() => {}} title="Menu">
        <RNText>Body</RNText>
      </Drawer>
    );

    expect(screen.queryByText('Menu')).toBeNull();
    expect(screen.queryByText('Body')).toBeNull();
  });

  it('renders title, content, close button and passes testID through when opened', () => {
    const onClose = jest.fn();
    render(
      <Drawer opened onClose={onClose} title="Menu" accessibilityLabel="Navigation" testID="drawer">
        <RNText>Body</RNText>
      </Drawer>
    );

    expect(screen.getByText('Menu')).toBeTruthy();
    expect(screen.getByText('Body')).toBeTruthy();
    const drawer = screen.getByTestId('drawer');
    expect(drawer.props.accessibilityLabel).toBe('Navigation');
    expect(drawer).toHaveStyle({ width: 320 });

    const close = screen.getByLabelText('Close');
    expect(close.props.accessibilityRole).toBe('button');
    fireEvent.press(close);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('closes from the overlay only when closeOnClickOutside is set', () => {
    const onClose = jest.fn();
    const { rerender } = render(
      <Drawer opened onClose={onClose}>
        <RNText>Body</RNText>
      </Drawer>
    );

    fireEvent.press(screen.UNSAFE_getByType(Overlay));
    expect(onClose).toHaveBeenCalledTimes(1);

    rerender(
      <Drawer opened onClose={onClose} closeOnClickOutside={false}>
        <RNText>Body</RNText>
      </Drawer>
    );
    fireEvent.press(screen.UNSAFE_getByType(Overlay));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('closes on hardware back through the modal', () => {
    const onClose = jest.fn();
    render(
      <Drawer opened onClose={onClose}>
        <RNText>Body</RNText>
      </Drawer>
    );

    act(() => {
      screen.UNSAFE_getByType(Modal).props.onRequestClose();
    });
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('hides the overlay and header when disabled', () => {
    render(
      <Drawer opened onClose={() => {}} withOverlay={false} withCloseButton={false}>
        <RNText>Body</RNText>
      </Drawer>
    );

    expect(screen.UNSAFE_queryByType(Overlay)).toBeNull();
    expect(screen.queryByLabelText('Close')).toBeNull();
  });

  it('renders a node title without close button', () => {
    render(
      <Drawer
        opened
        onClose={() => {}}
        withCloseButton={false}
        title={<View testID="title-node" />}
      />
    );
    expect(screen.getByTestId('title-node')).toBeTruthy();
  });

  it('supports every position and an unknown position', () => {
    (['left', 'right', 'top', 'bottom', 'weird'] as const).forEach((position) => {
      const { unmount } = render(
        <Drawer opened onClose={() => {}} position={position as any} testID="drawer" />
      );
      expect(screen.getByTestId('drawer')).toBeTruthy();
      unmount();
    });
  });

  it('supports named, numeric and unknown sizes', () => {
    const { rerender } = render(
      <Drawer opened onClose={() => {}} size="xl" testID="drawer" />
    );
    expect(screen.getByTestId('drawer')).toHaveStyle({ width: 560 });

    rerender(<Drawer opened onClose={() => {}} size={200} position="top" testID="drawer" />);
    expect(screen.getByTestId('drawer')).toHaveStyle({ height: 200 });

    rerender(<Drawer opened onClose={() => {}} size={'giant' as any} testID="drawer" />);
    expect(screen.getByTestId('drawer')).toHaveStyle({ width: 320 });
  });

  it('resolves padding from keys, numbers and unknown keys', () => {
    const bodyPadding = () =>
      StyleSheet.flatten(screen.UNSAFE_getByType(ScrollView).props.style).padding;

    const { rerender } = render(
      <Drawer opened onClose={() => {}} padding="xl" title="T" />
    );
    expect(bodyPadding()).toBe(theme.spacing.xl);

    rerender(<Drawer opened onClose={() => {}} padding={5} title="T" />);
    expect(bodyPadding()).toBe(5);

    rerender(<Drawer opened onClose={() => {}} padding={'nope' as any} title="T" />);
    expect(bodyPadding()).toBe(theme.spacing.md);

    rerender(<Drawer opened onClose={() => {}} padding={undefined as any} title="T" />);
    expect(bodyPadding()).toBe(theme.spacing.md);
  });

  it('applies overlay options, custom style and re-runs animation when toggled', () => {
    const { rerender } = render(
      <Drawer
        opened
        onClose={() => {}}
        overlayOpacity={0.3}
        overlayColor="#111"
        transitionDuration={10}
        zIndex={5}
        style={{ margin: 2 }}
        testID="drawer"
      />
    );
    expect(screen.getByTestId('drawer')).toHaveStyle({ margin: 2 });

    rerender(<Drawer opened={false} onClose={() => {}} testID="drawer" />);
    expect(screen.queryByTestId('drawer')).toBeNull();

    rerender(<Drawer opened onClose={() => {}} testID="drawer" />);
    expect(screen.getByTestId('drawer')).toBeTruthy();
  });
});
