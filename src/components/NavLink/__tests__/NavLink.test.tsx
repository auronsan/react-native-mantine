import { Text, View } from 'react-native';
import { render, screen, fireEvent } from '../../../__tests__/test-utils';
import { NavLink } from '../index';
import { createTheme } from '../../../theme/create-theme';

const theme = createTheme();

// UnstyledButton renders the testID on the touchable and the styles on the
// inner BoxView, so style assertions target the first nested host View.
const styledRoot = (testID = 'navlink') => {
  const touchable = screen.getByTestId(testID);
  return touchable.findAll(
    (node: { type: unknown }) => node.type === 'View' && node !== touchable
  )[0]!;
};

describe('NavLink', () => {
  it('renders label with default props', () => {
    render(<NavLink label="Home" testID="navlink" />);
    expect(screen.getByTestId('navlink')).toBeTruthy();
    expect(screen.getByText('Home')).toBeTruthy();
  });

  it('applies label and description styles to the wrapping Text', () => {
    const { rerender } = render(
      <NavLink label="Home" description="Start page" onPress={() => {}} />
    );
    expect(screen.getByText('Home')).toHaveStyle({
      fontWeight: '500',
      color: theme.black,
    });
    expect(screen.getByText('Start page')).toHaveStyle({
      color: theme.fn.themeColor('gray', 6),
    });

    rerender(
      <NavLink label="Home" description="Start page" active onPress={() => {}} />
    );
    expect(screen.getByText('Home')).toHaveStyle({
      color: theme.fn.variant({ variant: 'light', color: 'blue' }).color,
    });
  });

  it('renders description, icon and rightSection', () => {
    render(
      <NavLink
        label="Settings"
        description="Manage your account"
        icon={<View testID="icon" />}
        rightSection={<View testID="right" />}
      />
    );
    expect(screen.getByText('Manage your account')).toBeTruthy();
    expect(screen.getByTestId('icon')).toBeTruthy();
    expect(screen.getByTestId('right')).toBeTruthy();
  });

  it('calls onPress when pressed', () => {
    const onPress = jest.fn();
    render(<NavLink label="Press me" onPress={onPress} testID="navlink" />);
    fireEvent.press(screen.getByTestId('navlink'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('uses button role with onPress and link role without', () => {
    const { rerender } = render(
      <NavLink label="Role" onPress={() => {}} testID="navlink" />
    );
    expect(screen.getByTestId('navlink').props.accessibilityRole).toBe(
      'button'
    );

    rerender(<NavLink label="Role" testID="navlink" />);
    expect(screen.getByTestId('navlink').props.accessibilityRole).toBe('link');
  });

  it('is disabled when no onPress is provided (disableIfNoPress)', () => {
    const { rerender } = render(<NavLink label="Static" testID="navlink" />);
    expect(
      screen.getByTestId('navlink').props.accessibilityState.disabled
    ).toBe(true);
    expect(styledRoot()).toHaveStyle({ opacity: 0.6 });

    rerender(
      <NavLink label="Static" disableIfNoPress={false} testID="navlink" />
    );
    expect(
      screen.getByTestId('navlink').props.accessibilityState.disabled
    ).toBe(false);
    expect(styledRoot()).toHaveStyle({ opacity: 1 });
  });

  it('does not call onPress when disabled', () => {
    const onPress = jest.fn();
    render(
      <NavLink label="Disabled" disabled onPress={onPress} testID="navlink" />
    );
    fireEvent.press(screen.getByTestId('navlink'));
    expect(onPress).not.toHaveBeenCalled();
    expect(
      screen.getByTestId('navlink').props.accessibilityState.disabled
    ).toBe(true);
    expect(styledRoot()).toHaveStyle({
      backgroundColor: 'transparent',
      opacity: 0.6,
    });
  });

  it('exposes active state through accessibilityState.selected', () => {
    const { rerender } = render(
      <NavLink label="Active" active onPress={() => {}} testID="navlink" />
    );
    expect(
      screen.getByTestId('navlink').props.accessibilityState.selected
    ).toBe(true);

    rerender(<NavLink label="Active" onPress={() => {}} testID="navlink" />);
    expect(
      screen.getByTestId('navlink').props.accessibilityState.selected
    ).toBe(false);
    expect(styledRoot()).toHaveStyle({
      backgroundColor: 'transparent',
    });
  });

  it('applies filled variant styles when active', () => {
    const variantStyles = theme.fn.variant({
      variant: 'filled',
      color: 'blue',
    });
    render(
      <NavLink
        label="Filled"
        active
        variant="filled"
        onPress={() => {}}
        testID="navlink"
      />
    );
    expect(styledRoot()).toHaveStyle({
      backgroundColor: variantStyles.background,
    });
  });

  it('applies light variant styles when active', () => {
    const variantStyles = theme.fn.variant({ variant: 'light', color: 'teal' });
    render(
      <NavLink
        label="Light"
        active
        variant="light"
        color="teal"
        onPress={() => {}}
        testID="navlink"
      />
    );
    expect(styledRoot()).toHaveStyle({
      backgroundColor: variantStyles.background,
    });
  });

  it('applies subtle variant styles when active', () => {
    const variantStyles = theme.fn.variant({
      variant: 'subtle',
      color: 'blue',
    });
    render(
      <NavLink
        label="Subtle"
        active
        variant="subtle"
        onPress={() => {}}
        testID="navlink"
      />
    );
    expect(styledRoot()).toHaveStyle({
      backgroundColor: variantStyles.background,
    });
  });

  it('falls back to light variant for unknown variants', () => {
    const variantStyles = theme.fn.variant({ variant: 'light', color: 'blue' });
    render(
      <NavLink
        label="Unknown"
        active
        variant="something-else"
        onPress={() => {}}
        testID="navlink"
      />
    );
    expect(styledRoot()).toHaveStyle({
      backgroundColor: variantStyles.background,
    });
  });

  it('uses label as accessibilityLabel and allows override', () => {
    const { rerender } = render(<NavLink label="Profile" onPress={() => {}} />);
    expect(screen.getByLabelText('Profile')).toBeTruthy();

    rerender(
      <NavLink
        label="Profile"
        accessibilityLabel="Go to profile"
        onPress={() => {}}
      />
    );
    expect(screen.getByLabelText('Go to profile')).toBeTruthy();
  });

  it('has no accessibilityLabel for element labels', () => {
    render(
      <NavLink
        label={<Text>Element label</Text>}
        withTextWrapper={false}
        onPress={() => {}}
        testID="navlink"
      />
    );
    expect(
      screen.getByTestId('navlink').props.accessibilityLabel
    ).toBeUndefined();
    expect(screen.getByText('Element label')).toBeTruthy();
  });

  it('renders nested children links', () => {
    render(
      <NavLink label="Parent" onPress={() => {}}>
        <NavLink label="Child" onPress={() => {}} testID="child" />
      </NavLink>
    );
    expect(screen.getByText('Child')).toBeTruthy();
    expect(screen.getByTestId('child')).toBeTruthy();
  });

  it('merges custom style', () => {
    render(
      <NavLink
        label="Styled"
        onPress={() => {}}
        style={{ marginBottom: 7 }}
        testID="navlink"
      />
    );
    expect(styledRoot()).toHaveStyle({ marginBottom: 7 });
  });

  it('has a displayName', () => {
    expect(NavLink.displayName).toBe('NavLink');
  });
});
