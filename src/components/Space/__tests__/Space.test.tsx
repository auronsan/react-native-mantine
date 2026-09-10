import { render, screen } from '../../../__tests__/test-utils';
import { Space } from '../index';

describe('Space', () => {
  it('renders with default props and passes testID through', () => {
    render(<Space testID="space" />);
    const space = screen.getByTestId('space');
    expect(space).toBeTruthy();
    expect(space).not.toHaveStyle({ width: expect.anything() });
    expect(space).not.toHaveStyle({ height: expect.anything() });
  });

  it('resolves width from theme spacing key', () => {
    render(<Space w="md" testID="space" />);
    expect(screen.getByTestId('space')).toHaveStyle({ width: 16 });
  });

  it('resolves height from theme spacing key', () => {
    render(<Space h="xl" testID="space" />);
    expect(screen.getByTestId('space')).toHaveStyle({ height: 24 });
  });

  it('uses numeric values directly', () => {
    render(<Space w={42} h={7} testID="space" />);
    expect(screen.getByTestId('space')).toHaveStyle({ width: 42, height: 7 });
  });

  it('falls back to 0 for unknown spacing keys', () => {
    render(<Space w={'unknown' as never} testID="space" />);
    expect(screen.getByTestId('space')).toHaveStyle({ width: 0 });
  });

  it('merges custom style with computed dimensions', () => {
    render(
      <Space
        w="sm"
        style={{ backgroundColor: 'red', width: 99 }}
        testID="space"
      />
    );
    expect(screen.getByTestId('space')).toHaveStyle({
      backgroundColor: 'red',
      width: 99,
    });
  });

  it('forwards other View props', () => {
    render(<Space testID="space" accessibilityLabel="spacer" />);
    expect(screen.getByLabelText('spacer')).toBeTruthy();
  });
});
