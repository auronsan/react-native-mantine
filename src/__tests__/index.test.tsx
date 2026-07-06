import { Text, Button, Badge, Switch, TextInput } from '../index';

describe('react-native-mantine exports', () => {
  it('exports core components', () => {
    expect(Text).toBeDefined();
    expect(Button).toBeDefined();
    expect(Badge).toBeDefined();
    expect(Switch).toBeDefined();
    expect(TextInput).toBeDefined();
  });
});
