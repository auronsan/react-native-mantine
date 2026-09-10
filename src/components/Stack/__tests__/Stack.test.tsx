import { Text } from 'react-native';
import { render, screen } from '../../../__tests__/test-utils';
import { Stack } from '../index';

describe('Stack', () => {
  it('renders children in a column with default spacing', () => {
    render(
      <Stack testID="stack">
        <Text>First</Text>
        <Text>Second</Text>
      </Stack>
    );

    expect(screen.getByText('First')).toBeTruthy();
    expect(screen.getByText('Second')).toBeTruthy();
    expect(screen.getByTestId('stack')).toHaveStyle({
      flexDirection: 'column',
      gap: 15,
    });
  });

  it('applies custom spacing', () => {
    render(<Stack spacing={4} testID="stack" />);
    expect(screen.getByTestId('stack')).toHaveStyle({ gap: 4 });
  });

  it('centers items when position is center', () => {
    render(<Stack position="center" testID="stack" />);
    expect(screen.getByTestId('stack')).toHaveStyle({ alignItems: 'center' });
  });

  it('does not center items for other positions', () => {
    render(<Stack position="left" testID="stack" />);
    expect(screen.getByTestId('stack')).not.toHaveStyle({
      alignItems: 'center',
    });
  });

  it('merges custom style and forwards view props', () => {
    render(
      <Stack
        style={{ padding: 3, gap: 1 }}
        testID="stack"
        accessibilityLabel="stack label"
      />
    );
    const stack = screen.getByTestId('stack');
    expect(stack).toHaveStyle({ padding: 3, gap: 1 });
    expect(screen.getByLabelText('stack label')).toBeTruthy();
  });
});
