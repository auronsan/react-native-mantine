import { Text as RNText } from 'react-native';
import { render, screen, fireEvent } from '../../../__tests__/test-utils';
import {
  Accordion,
  AccordionItem,
  AccordionControl,
  AccordionPanel,
  SimpleAccordionItem,
} from '../index';

const Item = SimpleAccordionItem;

function expanded(label: string) {
  return screen.getByLabelText(label).props.accessibilityState.expanded;
}

describe('Accordion', () => {
  it('renders items with labels and passes testID through', () => {
    render(
      <Accordion testID="accordion">
        <Item value="a" label="First">
          <RNText>First content</RNText>
        </Item>
        <Item value="b" label="Second">
          <RNText>Second content</RNText>
        </Item>
      </Accordion>
    );

    expect(screen.getByTestId('accordion')).toBeTruthy();
    expect(screen.getByText('First')).toBeTruthy();
    expect(screen.getByText('Second')).toBeTruthy();
    expect(expanded('First')).toBe(false);
    expect(expanded('Second')).toBe(false);
  });

  it('opens the item with defaultValue (string) and toggles on press', () => {
    render(
      <Accordion defaultValue="a">
        <Item value="a" label="First">
          <RNText>First content</RNText>
        </Item>
        <Item value="b" label="Second">
          <RNText>Second content</RNText>
        </Item>
      </Accordion>
    );

    expect(expanded('First')).toBe(true);
    expect(screen.getByText('−')).toBeTruthy();

    fireEvent.press(screen.getByLabelText('First'));
    expect(expanded('First')).toBe(false);
    expect(screen.getAllByText('+')).toHaveLength(2);
  });

  it('accepts defaultValue as an array', () => {
    render(
      <Accordion defaultValue={['a', 'b']} multiple>
        <Item value="a" label="First" />
        <Item value="b" label="Second" />
      </Accordion>
    );

    expect(expanded('First')).toBe(true);
    expect(expanded('Second')).toBe(true);
  });

  it('only keeps one item open in single mode', () => {
    render(
      <Accordion>
        <Item value="a" label="First" />
        <Item value="b" label="Second" />
      </Accordion>
    );

    fireEvent.press(screen.getByLabelText('First'));
    expect(expanded('First')).toBe(true);

    fireEvent.press(screen.getByLabelText('Second'));
    expect(expanded('First')).toBe(false);
    expect(expanded('Second')).toBe(true);
  });

  it('keeps several items open in multiple mode', () => {
    const onChange = jest.fn();
    render(
      <Accordion multiple onChange={onChange}>
        <Item value="a" label="First" />
        <Item value="b" label="Second" />
      </Accordion>
    );

    fireEvent.press(screen.getByLabelText('First'));
    fireEvent.press(screen.getByLabelText('Second'));

    expect(expanded('First')).toBe(true);
    expect(expanded('Second')).toBe(true);
    expect(onChange).toHaveBeenLastCalledWith(['a', 'b']);

    fireEvent.press(screen.getByLabelText('First'));
    expect(onChange).toHaveBeenLastCalledWith(['b']);
  });

  it('works as a controlled component', () => {
    const onChange = jest.fn();
    const { rerender } = render(
      <Accordion value="a" onChange={onChange}>
        <Item value="a" label="First" />
        <Item value="b" label="Second" />
      </Accordion>
    );

    expect(expanded('First')).toBe(true);

    fireEvent.press(screen.getByLabelText('Second'));
    expect(onChange).toHaveBeenCalledWith('b');
    // Controlled: state does not change until the parent updates value
    expect(expanded('First')).toBe(true);
    expect(expanded('Second')).toBe(false);

    fireEvent.press(screen.getByLabelText('First'));
    expect(onChange).toHaveBeenCalledWith('');

    rerender(
      <Accordion value={['b']} onChange={onChange}>
        <Item value="a" label="First" />
        <Item value="b" label="Second" />
      </Accordion>
    );
    expect(expanded('Second')).toBe(true);
  });

  it('renders every variant and custom spacing', () => {
    const { rerender } = render(
      <Accordion variant="default" testID="acc">
        <Item value="a" label="First" />
      </Accordion>
    );
    expect(screen.getByTestId('acc')).toBeTruthy();

    rerender(
      <Accordion variant="contained" radius="md" testID="acc">
        <Item value="a" label="First" />
      </Accordion>
    );
    expect(screen.getByTestId('acc')).toHaveStyle({ borderWidth: 1 });

    rerender(
      <Accordion variant="separated" spacing={20} testID="acc">
        <Item value="a" label="First" />
      </Accordion>
    );
    expect(screen.getByTestId('acc')).toBeTruthy();

    rerender(
      <Accordion variant="separated" spacing="lg" testID="acc">
        <Item value="a" label="First" />
      </Accordion>
    );
    expect(screen.getByTestId('acc')).toBeTruthy();
  });

  it('supports custom label nodes and accessibility labels', () => {
    render(
      <Accordion>
        <Item
          value="a"
          label={<RNText>Custom label</RNText>}
          accessibilityLabel="Custom item"
        />
        <Item value="b" label={<RNText>Unnamed</RNText>} />
      </Accordion>
    );

    expect(screen.getByText('Custom label')).toBeTruthy();
    expect(screen.getByLabelText('Custom item').props.accessibilityRole).toBe(
      'button'
    );
    expect(screen.getByLabelText('Accordion item')).toBeTruthy();
  });

  it('renders the low-level Item, Control and Panel parts', () => {
    render(
      <Accordion>
        <AccordionItem testID="item" value="x">
          <AccordionControl testID="control">
            <RNText>Control</RNText>
          </AccordionControl>
          <AccordionPanel testID="panel">
            <RNText>Panel</RNText>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    );

    expect(screen.getByTestId('item')).toBeTruthy();
    expect(screen.getByTestId('control')).toBeTruthy();
    expect(screen.getByTestId('panel')).toBeTruthy();
    expect(screen.getByText('Control')).toBeTruthy();
    expect(screen.getByText('Panel')).toBeTruthy();
  });

  it('throws when Accordion.Item is rendered outside Accordion', () => {
    const spy = jest.spyOn(console, 'error').mockImplementation(() => {});
    expect(() => render(<Item value="a" label="Orphan" />)).toThrow(
      'Accordion components must be used within Accordion'
    );
    spy.mockRestore();
  });

  it('exposes sub-components on the Accordion namespace', () => {
    expect((Accordion as any).Item).toBe(SimpleAccordionItem);
    expect((Accordion as any).Control).toBe(AccordionControl);
    expect((Accordion as any).Panel).toBe(AccordionPanel);
  });
});
