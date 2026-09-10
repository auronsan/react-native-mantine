import { Text as RNText } from 'react-native';
import { render, screen } from '../../../__tests__/test-utils';
import { BoxView } from '../index';

describe('BoxView', () => {
  it('renders children and passes testID and other View props through', () => {
    render(
      <BoxView testID="box" accessibilityLabel="Box">
        <RNText>Child</RNText>
      </BoxView>
    );

    expect(screen.getByText('Child')).toBeTruthy();
    expect(screen.getByLabelText('Box')).toBeTruthy();
    const box = screen.getByTestId('box');
    expect(box.props.style.flat().some((s: any) => s && Object.keys(s).length)).toBe(false);
  });

  it('applies fullWidth and fullHeight', () => {
    render(<BoxView fullWidth fullHeight testID="box" />);
    expect(screen.getByTestId('box')).toHaveStyle({ width: '100%', height: '100%' });
  });

  it('resolves padding shorthands from theme keys', () => {
    render(<BoxView p="xs" px="sm" py="md" pt="lg" pb="xl" pl="xs" pr="sm" testID="box" />);

    expect(screen.getByTestId('box')).toHaveStyle({
      padding: 4,
      paddingHorizontal: 8,
      paddingVertical: 12,
      paddingTop: 16,
      paddingBottom: 20,
      paddingLeft: 4,
      paddingRight: 8,
    });
  });

  it('resolves margin shorthands from numbers', () => {
    render(<BoxView m={1} mx={2} my={3} mt={4} mb={5} ml={6} mr={7} testID="box" />);

    expect(screen.getByTestId('box')).toHaveStyle({
      margin: 1,
      marginHorizontal: 2,
      marginVertical: 3,
      marginTop: 4,
      marginBottom: 5,
      marginLeft: 6,
      marginRight: 7,
    });
  });

  it('falls back to 0 for unknown spacing keys', () => {
    render(<BoxView p="huge" m="tiny" testID="box" />);
    expect(screen.getByTestId('box')).toHaveStyle({ padding: 0, margin: 0 });
  });

  it('merges custom style after spacing styles', () => {
    render(<BoxView p="md" style={{ padding: 30, opacity: 0.5 }} testID="box" />);
    expect(screen.getByTestId('box')).toHaveStyle({ padding: 30, opacity: 0.5 });
  });
});
