import React from 'react';
import {
  Modal as RNModal,
  ScrollView,
  StyleSheet,
  Text as RNText,
  TouchableOpacity,
  View,
} from 'react-native';
import { render as rtlRender } from '@testing-library/react-native';
import { render, screen, fireEvent, act } from '../../../__tests__/test-utils';
import { ThemeProvider } from '../../../theme/theme-provider';
import { createTheme } from '../../../theme/create-theme';
import { rem } from '../../../theme/utils/rem';
import { Modal } from '../index';

const theme = createTheme();

type ModalProps = React.ComponentProps<typeof Modal>;

const renderModal = (props: Partial<ModalProps> = {}) =>
  render(
    <Modal
      opened
      onClose={() => {}}
      title="Dialog title"
      testID="modal"
      {...props}
    >
      <RNText>Modal body</RNText>
    </Modal>
  );

// KeyboardAvoidingView's onLayout calls event.persist() when the event
// bubbles up, so the synthetic event needs a persist stub.
const layout = (height: number) =>
  ({
    persist: () => {},
    nativeEvent: { layout: { x: 0, y: 0, width: 300, height } },
  }) as never;

// KeyboardAvoidingView also has an onLayout host, so take the innermost
// (last) match, which is the content wrapper inside the ScrollView.
const getContentWrapper = () => {
  const matches = screen.UNSAFE_root.findAll(
    (node: any) =>
      typeof node.type === 'string' && typeof node.props.onLayout === 'function'
  );
  const wrapper = matches[matches.length - 1];
  if (!wrapper) {
    throw new Error('content wrapper not found');
  }
  return wrapper;
};

const getScrollViewStyle = () =>
  StyleSheet.flatten(screen.UNSAFE_getByType(ScrollView).props.style);

const getOuterOverlayStyle = () =>
  StyleSheet.flatten(
    screen.UNSAFE_getAllByType(TouchableOpacity)[0]!.props.style
  );

describe('Modal', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('renders nothing when closed', () => {
    renderModal({ opened: false });
    expect(screen.queryByText('Dialog title')).toBeNull();
    expect(screen.queryByText('Modal body')).toBeNull();
    expect(screen.queryByTestId('modal')).toBeNull();
  });

  it('renders title, body and close button when opened', () => {
    renderModal();
    expect(screen.getByText('Dialog title')).toBeTruthy();
    expect(screen.getByText('Modal body')).toBeTruthy();
    expect(screen.getByTestId('modal')).toBeTruthy();

    const close = screen.getByLabelText('Close');
    expect(close.props.accessibilityRole).toBe('button');

    const modal = screen.UNSAFE_getByType(RNModal);
    expect(modal.props.transparent).toBe(true);
    expect(modal.props.visible).toBe(true);
    expect(modal.props.accessibilityViewIsModal).toBe(true);
  });

  it('calls onClose when the close button is pressed', () => {
    const onClose = jest.fn();
    renderModal({ onClose });
    fireEvent.press(screen.getByLabelText('Close'));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('calls onClose on hardware back / request close', () => {
    const onClose = jest.fn();
    renderModal({ onClose });
    act(() => {
      screen.UNSAFE_getByType(RNModal).props.onRequestClose();
    });
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('closes when the overlay backdrop is pressed', () => {
    const onClose = jest.fn();
    renderModal({ onClose });
    fireEvent.press(screen.getByLabelText('Dismiss'));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('closes when the outer container area is pressed', () => {
    const onClose = jest.fn();
    renderModal({ onClose, withOverlay: false });
    expect(screen.queryByLabelText('Dismiss')).toBeNull();

    const [outer] = screen.UNSAFE_getAllByType(TouchableOpacity);
    fireEvent.press(outer!);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('does not close on outside press when closeOnClickOutside is false', () => {
    const onClose = jest.fn();
    renderModal({ onClose, closeOnClickOutside: false });

    fireEvent.press(screen.getByLabelText('Dismiss'));
    const [outer] = screen.UNSAFE_getAllByType(TouchableOpacity);
    fireEvent.press(outer!);

    expect(onClose).not.toHaveBeenCalled();
  });

  it('stops propagation when the modal content is pressed', () => {
    const onClose = jest.fn();
    renderModal({ onClose });

    const stopPropagation = jest.fn();
    fireEvent.press(screen.getByText('Modal body'), { stopPropagation });

    expect(stopPropagation).toHaveBeenCalledTimes(1);
    expect(onClose).not.toHaveBeenCalled();
  });

  it('renders a header with only the close button when title is omitted', () => {
    renderModal({ title: undefined });
    expect(screen.getByLabelText('Close')).toBeTruthy();
    expect(screen.queryByText('Dialog title')).toBeNull();
  });

  it('renders a header with only the title when withCloseButton is false', () => {
    renderModal({ withCloseButton: false });
    expect(screen.getByText('Dialog title')).toBeTruthy();
    expect(screen.queryByLabelText('Close')).toBeNull();
  });

  it('renders no header when there is no title and no close button', () => {
    renderModal({ title: undefined, withCloseButton: false });
    expect(screen.queryByLabelText('Close')).toBeNull();
    expect(screen.UNSAFE_getAllByType(TouchableOpacity)).toHaveLength(2);
    expect(screen.getByText('Modal body')).toBeTruthy();
  });

  it('renders a custom title node', () => {
    renderModal({ title: <View testID="custom-title" /> });
    expect(screen.getByTestId('custom-title')).toBeTruthy();
  });

  it('passes accessibilityLabel to the container and falls back to the title', () => {
    renderModal({ accessibilityLabel: 'Settings dialog' });
    expect(screen.getByTestId('modal').props.accessibilityLabel).toBe(
      'Settings dialog'
    );

    renderModal({ title: 'Fallback title', testID: 'modal-2' });
    expect(screen.getByTestId('modal-2').props.accessibilityLabel).toBe(
      'Fallback title'
    );
  });

  it('applies default size, radius and light colors', () => {
    renderModal();
    expect(screen.getByTestId('modal')).toHaveStyle({
      width: rem(440),
      borderRadius: theme.fn.radius('md'),
      backgroundColor: theme.white,
      maxWidth: '90%',
      maxHeight: '90%',
    });
  });

  it.each([
    ['xs', rem(320)],
    ['sm', rem(380)],
    ['lg', rem(620)],
    ['xl', rem(780)],
    ['full', '100%'],
    [500, rem(500)],
    ['unknown', rem(440)],
  ] as const)('applies size %s', (size, width) => {
    renderModal({ size: size as ModalProps['size'] });
    expect(screen.getByTestId('modal')).toHaveStyle({ width });
  });

  it('applies fullScreen styles and always enables scrolling', () => {
    renderModal({ fullScreen: true });
    expect(screen.getByTestId('modal')).toHaveStyle({
      width: '100%',
      height: '100%',
      maxWidth: '100%',
      maxHeight: '100%',
      borderRadius: 0,
    });
    expect(getScrollViewStyle().maxHeight).toBeUndefined();
    expect(screen.UNSAFE_getByType(ScrollView).props.scrollEnabled).toBe(
      true
    );
  });

  it('applies custom radius and merges custom style', () => {
    renderModal({ radius: 'xl', style: { marginTop: 7 } });
    expect(screen.getByTestId('modal')).toHaveStyle({
      borderRadius: theme.fn.radius('xl'),
      marginTop: 7,
    });
  });

  it('positions content at the top by default and centers with centered', () => {
    renderModal();
    expect(getOuterOverlayStyle()).toMatchObject({
      justifyContent: 'flex-start',
      paddingTop: rem(60),
    });

    renderModal({ centered: true, testID: 'centered' });
    expect(getOuterOverlayStyle()).toMatchObject({
      justifyContent: 'center',
      paddingTop: 0,
    });
  });

  it.each([
    ['md', theme.spacing.md],
    ['lg', theme.spacing.lg],
    [24, rem(24)],
    ['nope', theme.spacing.md],
  ] as const)('applies padding %s to the body', (padding, expected) => {
    renderModal({ padding: padding as ModalProps['padding'] });
    expect(getScrollViewStyle().padding).toBe(expected);
  });

  it('only enables scrolling when the content is taller than maxHeight', () => {
    renderModal();
    const scrollView = () => screen.UNSAFE_getByType(ScrollView);
    expect(scrollView().props.scrollEnabled).toBe(false);
    expect(scrollView().props.showsVerticalScrollIndicator).toBe(false);
    expect(getScrollViewStyle().maxHeight).toBe(300);

    fireEvent(getContentWrapper(), 'layout', layout(100));
    expect(scrollView().props.scrollEnabled).toBe(false);

    fireEvent(getContentWrapper(), 'layout', layout(800));
    expect(scrollView().props.scrollEnabled).toBe(true);
    expect(scrollView().props.showsVerticalScrollIndicator).toBe(true);
  });

  it('passes overlay opacity and color to the overlay', () => {
    renderModal({ overlayOpacity: 0.3, overlayColor: 'red' });
    expect(screen.getByLabelText('Dismiss')).toHaveStyle({
      opacity: 0.3,
      backgroundColor: 'red',
    });
  });

  it('runs open and close transitions', () => {
    const { rerender } = renderModal({ transitionDuration: 50 });
    act(() => {
      jest.runAllTimers();
    });
    expect(screen.getByText('Modal body')).toBeTruthy();

    rerender(
      <Modal
        opened={false}
        onClose={() => {}}
        title="Dialog title"
        testID="modal"
        transitionDuration={50}
      >
        <RNText>Modal body</RNText>
      </Modal>
    );
    act(() => {
      jest.runAllTimers();
    });
    expect(screen.queryByText('Modal body')).toBeNull();
  });

  it('accepts a forwarded ref', () => {
    const ref = React.createRef<any>();
    render(
      <Modal opened onClose={() => {}} ref={ref} testID="modal">
        <RNText>Body</RNText>
      </Modal>
    );
    expect(screen.getByTestId('modal')).toBeTruthy();
    expect(screen.getByText('Body')).toBeTruthy();
  });

  it('uses dark colors in dark color scheme', () => {
    rtlRender(
      <ThemeProvider theme={theme} forceMode="dark">
        <Modal opened onClose={() => {}} title="Dark" testID="modal">
          <RNText>Body</RNText>
        </Modal>
      </ThemeProvider>
    );
    expect(screen.getByTestId('modal')).toHaveStyle({
      backgroundColor: theme.colors.dark![7],
    });
    expect(screen.getByLabelText('Close')).toHaveStyle({
      backgroundColor: theme.colors.dark![5],
    });
  });

  it('has displayName', () => {
    expect(Modal.displayName).toBe('Modal');
  });
});
