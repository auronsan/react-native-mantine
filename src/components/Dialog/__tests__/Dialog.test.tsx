import { Dimensions, Text as RNText } from 'react-native';
import { render, screen } from '../../../__tests__/test-utils';
import { Dialog } from '../index';

describe('Dialog', () => {
  it('renders nothing when closed', () => {
    render(
      <Dialog opened={false} testID="dialog">
        <RNText>Hidden</RNText>
      </Dialog>
    );

    expect(screen.queryByTestId('dialog')).toBeNull();
    expect(screen.queryByText('Hidden')).toBeNull();
  });

  it('renders content with alert role, label and default position when opened', () => {
    render(
      <Dialog opened accessibilityLabel="Notice" testID="dialog">
        <RNText>Visible</RNText>
      </Dialog>
    );

    const dialog = screen.getByTestId('dialog');
    expect(screen.getByText('Visible')).toBeTruthy();
    expect(dialog.props.accessibilityRole).toBe('alert');
    expect(dialog.props.accessibilityLabel).toBe('Notice');
    expect(dialog).toHaveStyle({
      position: 'absolute',
      width: 360,
      bottom: 20,
      right: 20,
      zIndex: 1000,
    });
  });

  it('supports named, numeric and unknown sizes', () => {
    const expected = { xs: 200, sm: 280, md: 360, lg: 440, xl: 560 };
    (Object.keys(expected) as Array<keyof typeof expected>).forEach((size) => {
      const { unmount } = render(<Dialog opened size={size} testID={size} />);
      expect(screen.getByTestId(size)).toHaveStyle({ width: expected[size] });
      unmount();
    });

    render(<Dialog opened size={123} testID="numeric" />);
    expect(screen.getByTestId('numeric')).toHaveStyle({ width: 123 });

    render(<Dialog opened size={'giant' as any} testID="unknown" />);
    expect(screen.getByTestId('unknown')).toHaveStyle({ width: 360 });
  });

  it('positions from the position prop and adjusts max height', () => {
    const screenHeight = Dimensions.get('window').height;
    const { rerender } = render(
      <Dialog opened position={{ top: 30, left: 10 }} testID="dialog" />
    );
    expect(screen.getByTestId('dialog')).toHaveStyle({
      top: 30,
      left: 10,
      maxHeight: screenHeight - 30 - 40,
    });

    rerender(<Dialog opened position={{ bottom: 50, right: 5 }} testID="dialog" />);
    expect(screen.getByTestId('dialog')).toHaveStyle({
      bottom: 50,
      right: 5,
      maxHeight: screenHeight - 50 - 40,
    });

    rerender(<Dialog opened position={{}} testID="dialog" />);
    expect(screen.getByTestId('dialog')).toHaveStyle({
      maxHeight: screenHeight - 40,
    });
  });

  it('centers on screen when centered is set', () => {
    render(<Dialog opened centered testID="dialog" />);
    expect(screen.getByTestId('dialog')).toHaveStyle({
      left: '5%',
      right: '5%',
      top: '50%',
    });
  });

  it('accepts padding, radius, shadow and border options', () => {
    render(
      <Dialog
        opened
        padding="lg"
        radius="xl"
        withShadow={false}
        withBorder
        transitionDuration={10}
        style={{ margin: 2 }}
        testID="dialog"
      >
        <RNText>Styled</RNText>
      </Dialog>
    );

    expect(screen.getByText('Styled')).toBeTruthy();
    expect(screen.getByTestId('dialog')).toHaveStyle({ margin: 2 });
  });

  it('runs the closing animation when opened turns false', () => {
    const { rerender } = render(
      <Dialog opened testID="dialog">
        <RNText>Content</RNText>
      </Dialog>
    );
    expect(screen.getByTestId('dialog')).toBeTruthy();

    rerender(
      <Dialog opened={false} testID="dialog">
        <RNText>Content</RNText>
      </Dialog>
    );
    expect(screen.queryByTestId('dialog')).toBeNull();
  });
});
