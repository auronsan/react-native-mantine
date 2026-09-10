import { Text as RNText } from 'react-native';
import { render, screen } from '../../../__tests__/test-utils';
import { Center } from '../index';

describe('Center', () => {
  it('renders children centered and passes testID through', () => {
    render(
      <Center testID="center">
        <RNText>Centered</RNText>
      </Center>
    );

    expect(screen.getByText('Centered')).toBeTruthy();
    expect(screen.getByTestId('center')).toHaveStyle({
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
    });
  });

  it('merges custom style and ignores the inline prop', () => {
    render(<Center inline style={{ padding: 4 }} testID="center" />);
    const center = screen.getByTestId('center');
    expect(center).toHaveStyle({ padding: 4 });
    expect(center.props.inline).toBeUndefined();
  });

  it('supports BoxView spacing props', () => {
    render(<Center p="md" m={2} testID="center" />);
    expect(screen.getByTestId('center')).toHaveStyle({ padding: 12, margin: 2 });
  });
});
