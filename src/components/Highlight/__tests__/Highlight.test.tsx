import { render, screen } from '../../../__tests__/test-utils';
import { Highlight } from '../index';
import { createTheme } from '../../../theme/create-theme';

const theme = createTheme();

describe('Highlight', () => {
  it('highlights a substring case-insensitively and passes testID through', () => {
    render(
      <Highlight highlight="world" testID="highlight">
        Hello World, hello world
      </Highlight>
    );

    expect(screen.getByTestId('highlight')).toBeTruthy();
    const parts = screen.getAllByText(/world/i);
    // root text plus two highlighted parts
    expect(parts.length).toBeGreaterThanOrEqual(2);
    const highlighted = screen.getAllByText('World');
    expect(highlighted[0]).toHaveStyle({ backgroundColor: theme.colors.yellow![2] });
  });

  it('highlights several substrings', () => {
    render(<Highlight highlight={['foo', 'bar']}>foo and bar and baz</Highlight>);

    expect(screen.getByText('foo')).toHaveStyle({
      backgroundColor: theme.colors.yellow![2],
    });
    expect(screen.getByText('bar')).toHaveStyle({
      backgroundColor: theme.colors.yellow![2],
    });
    expect(screen.queryByText('baz')).toBeNull();
  });

  it('renders plain text when there is nothing to highlight', () => {
    const { rerender } = render(
      <Highlight highlight="" style={{ margin: 1 }}>
        Nothing
      </Highlight>
    );
    expect(screen.getByText('Nothing')).toHaveStyle({ margin: 1 });

    rerender(<Highlight highlight={['', '']}>Still nothing</Highlight>);
    expect(screen.getByText('Still nothing')).toBeTruthy();

    rerender(<Highlight highlight="zzz">No match</Highlight>);
    expect(screen.getByText('No match')).toBeTruthy();
  });

  it('escapes regex special characters', () => {
    render(<Highlight highlight="(a+b)">Sum (a+b) here</Highlight>);
    expect(screen.getByText('(a+b)')).toHaveStyle({
      backgroundColor: theme.colors.yellow![2],
    });
  });

  it('supports highlightColor and highlightStyles', () => {
    const { rerender } = render(
      <Highlight highlight="x" highlightColor="red">
        x marks
      </Highlight>
    );
    expect(screen.getByText('x')).toHaveStyle({ backgroundColor: theme.colors.red![2] });

    rerender(
      <Highlight highlight="x" highlightStyles={{ backgroundColor: '#abc', color: '#def' }}>
        x marks
      </Highlight>
    );
    expect(screen.getByText('x')).toHaveStyle({ backgroundColor: '#abc', color: '#def' });
  });
});
