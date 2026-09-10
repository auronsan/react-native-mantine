import { Linking, Text as RNText } from 'react-native';
import { render, screen, fireEvent, waitFor } from '../../../__tests__/test-utils';
import { Anchor } from '../index';
import { createTheme } from '../../../theme/create-theme';

const theme = createTheme();

describe('Anchor', () => {
  afterEach(() => {
    jest.restoreAllMocks();
    // Linking.openURL is already a shared jest.fn in the RN preset
    (Linking.openURL as jest.Mock).mockReset();
  });

  it('renders children with default link styles and passes testID through', () => {
    render(<Anchor testID="anchor">Mantine</Anchor>);

    const anchor = screen.getByTestId('anchor');
    expect(screen.getByText('Mantine')).toBeTruthy();
    expect(anchor).toHaveStyle({
      textDecorationLine: 'underline',
      color: theme.colors.blue![6],
      fontWeight: '400',
    });
  });

  it('calls onPress when pressed', () => {
    const onPress = jest.fn();
    render(
      <Anchor onPress={onPress} href="https://mantine.dev">
        Press me
      </Anchor>
    );

    fireEvent.press(screen.getByText('Press me'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('opens href with Linking when no onPress is given', () => {
    const openURL = jest
      .spyOn(Linking, 'openURL')
      .mockImplementation(() => Promise.resolve(true));

    render(<Anchor href="https://mantine.dev">Link</Anchor>);
    fireEvent.press(screen.getByText('Link'));

    expect(openURL).toHaveBeenCalledWith('https://mantine.dev');
  });

  it('logs an error when the URL cannot be opened', async () => {
    jest
      .spyOn(Linking, 'openURL')
      .mockImplementation(() => Promise.reject(new Error('nope')));
    const error = jest.spyOn(console, 'error').mockImplementation(() => {});

    render(<Anchor href="bad://url">Broken</Anchor>);
    fireEvent.press(screen.getByText('Broken'));

    await waitFor(() => expect(error).toHaveBeenCalled());
  });

  it('does nothing on press without onPress or href', () => {
    const openURL = jest.spyOn(Linking, 'openURL');
    render(<Anchor>Inert</Anchor>);
    fireEvent.press(screen.getByText('Inert'));
    expect(openURL).not.toHaveBeenCalled();
  });

  it('renders text variant, unknown variant and underline=false', () => {
    const { rerender } = render(
      <Anchor variant="text" testID="anchor">
        Text
      </Anchor>
    );
    expect(screen.getByTestId('anchor')).toHaveStyle({
      textDecorationLine: 'none',
      color: theme.black,
    });

    rerender(
      <Anchor variant="link" underline={false} color="red" testID="anchor">
        No underline
      </Anchor>
    );
    expect(screen.getByTestId('anchor')).toHaveStyle({
      textDecorationLine: 'none',
      color: theme.colors.red![6],
    });

    rerender(
      <Anchor variant={'custom' as any} color="green" testID="anchor">
        Custom
      </Anchor>
    );
    expect(screen.getByTestId('anchor')).toHaveStyle({
      textDecorationLine: 'underline',
      color: theme.colors.green![6],
    });
  });

  it('renders every size and a custom weight', () => {
    (['xs', 'sm', 'md', 'lg', 'xl'] as const).forEach((size) => {
      const { unmount } = render(
        <Anchor size={size} weight="700" testID={size}>
          {size}
        </Anchor>
      );
      expect(screen.getByTestId(size)).toHaveStyle({ fontWeight: '700' });
      unmount();
    });

    render(
      <Anchor size={'huge' as any} testID="fallback">
        fallback
      </Anchor>
    );
    expect(screen.getByTestId('fallback')).toHaveStyle({ fontSize: 16 });
  });

  it('returns children untouched when withTextWrapper is false', () => {
    render(
      <Anchor withTextWrapper={false} testID="anchor">
        <RNText>Raw child</RNText>
      </Anchor>
    );

    expect(screen.getByText('Raw child')).toBeTruthy();
    expect(screen.queryByTestId('anchor')).toBeNull();
  });

  it('applies custom style', () => {
    render(
      <Anchor style={{ marginLeft: 3 }} testID="anchor">
        Styled
      </Anchor>
    );
    expect(screen.getByTestId('anchor')).toHaveStyle({ marginLeft: 3 });
  });
});
