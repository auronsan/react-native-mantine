import React from 'react';
import { Text, View } from 'react-native';
import { render, screen, fireEvent } from '../../../__tests__/test-utils';
import { createTheme } from '../../../theme/create-theme';
import { Stepper, Step, StepperCompleted } from '../index';

const theme = createTheme();
const blue = theme.fn.themeColor('blue');
const red = theme.fn.themeColor('red');
const inactiveBg = theme.fn.themeColor('gray', 1);
const inactiveBorder = theme.fn.themeColor('gray', 3);
const inactiveSeparator = theme.fn.themeColor('gray', 2);

type Instance = ReturnType<typeof screen.getByTestId>;

/** Closest host (native) ancestor of a test instance */
const hostParent = (node: Instance): Instance => {
  let current = node.parent;
  while (current && typeof current.type !== 'string') {
    current = current.parent;
  }
  if (!current) {
    throw new Error('host parent not found');
  }
  return current;
};

/** Direct host (native) children of a test instance, skipping composites */
const hostChildren = (node: Instance): Instance[] =>
  node.children.flatMap((child: Instance | string) => {
    if (typeof child === 'string') {
      return [];
    }
    return typeof child.type === 'string' ? [child] : hostChildren(child);
  });

/**
 * Returns the host views of a step by its number text:
 * icon (circle), iconWrapper, stepBody and separator (if any).
 */
const getStepParts = (stepNumber: number) => {
  const numberText = screen.getByText(String(stepNumber));
  const icon = hostParent(numberText);
  const iconWrapper = hostParent(icon);
  const stepBody = hostParent(iconWrapper);
  const [, separator] = hostChildren(stepBody);
  return { icon, iconWrapper, stepBody, separator };
};

const renderStepper = (
  props: Partial<React.ComponentProps<typeof Stepper>> = {}
) =>
  render(
    <Stepper active={1} testID="stepper" {...props}>
      <Step label="First" description="Create account" testID="s0">
        <Text>Step 1 content</Text>
      </Step>
      <Step label="Second" description="Verify email" testID="s1">
        <Text>Step 2 content</Text>
      </Step>
      <Step label="Third" testID="s2">
        <Text>Step 3 content</Text>
      </Step>
      <StepperCompleted>
        <Text>All done</Text>
      </StepperCompleted>
    </Stepper>
  );

describe('Stepper', () => {
  it('exposes compound components with display names', () => {
    expect(Stepper.Step).toBe(Step);
    expect(Stepper.Completed).toBe(StepperCompleted);
    expect(Stepper.displayName).toBe('Stepper');
    expect(Step.displayName).toBe('Stepper.Step');
    expect(StepperCompleted.displayName).toBe('Stepper.Completed');
  });

  it('renders through the typed compound API', () => {
    const onStepClick = jest.fn();
    const { rerender } = render(
      <Stepper active={0} onStepClick={onStepClick} testID="stepper">
        <Stepper.Step label="One" testID="one">
          <Text>One content</Text>
        </Stepper.Step>
        <Stepper.Step label="Two" testID="two">
          <Text>Two content</Text>
        </Stepper.Step>
        <Stepper.Completed>
          <Text>Done</Text>
        </Stepper.Completed>
      </Stepper>
    );

    expect(screen.getByText('One content')).toBeTruthy();
    fireEvent.press(screen.getByTestId('two'));
    expect(onStepClick).toHaveBeenCalledWith(1);

    rerender(
      <Stepper active={2} onStepClick={onStepClick} testID="stepper">
        <Stepper.Step label="One" testID="one">
          <Text>One content</Text>
        </Stepper.Step>
        <Stepper.Step label="Two" testID="two">
          <Text>Two content</Text>
        </Stepper.Step>
        <Stepper.Completed>
          <Text>Done</Text>
        </Stepper.Completed>
      </Stepper>
    );
    expect(screen.getByText('Done')).toBeTruthy();
  });

  it('renders steps, labels, descriptions and the active step content', () => {
    renderStepper();

    expect(screen.getByTestId('stepper')).toHaveStyle({ flexDirection: 'column' });
    expect(screen.getByText('First')).toBeTruthy();
    expect(screen.getByText('Second')).toBeTruthy();
    expect(screen.getByText('Third')).toBeTruthy();
    expect(screen.getByText('Create account')).toBeTruthy();
    expect(screen.getByText('Verify email')).toBeTruthy();
    expect(screen.getByText('1')).toBeTruthy();
    expect(screen.getByText('2')).toBeTruthy();
    expect(screen.getByText('3')).toBeTruthy();

    expect(screen.getByText('Step 2 content')).toBeTruthy();
    expect(screen.queryByText('Step 1 content')).toBeNull();
    expect(screen.queryByText('Step 3 content')).toBeNull();
    expect(screen.queryByText('All done')).toBeNull();
  });

  it('marks completed, active and pending steps with accessibility state', () => {
    renderStepper();

    expect(screen.getByTestId('s0').props.accessibilityState).toEqual({
      selected: false,
      disabled: false,
      busy: false,
    });
    expect(screen.getByTestId('s1').props.accessibilityState).toEqual({
      selected: true,
      disabled: false,
      busy: false,
    });
    expect(screen.getByTestId('s2').props.accessibilityState.selected).toBe(
      false
    );

    expect(screen.getByTestId('s0').props.accessibilityValue).toEqual({
      min: 1,
      max: 3,
      now: 1,
    });
    expect(screen.getByTestId('s2').props.accessibilityValue).toEqual({
      min: 1,
      max: 3,
      now: 3,
    });
    expect(screen.getAllByRole('button')).toHaveLength(3);
  });

  it('styles completed and active icons with the color and pending ones gray', () => {
    renderStepper();

    expect(getStepParts(1).icon).toHaveStyle({
      backgroundColor: blue,
      borderColor: blue,
    });
    expect(getStepParts(2).icon).toHaveStyle({
      backgroundColor: blue,
      borderColor: blue,
    });
    expect(getStepParts(3).icon).toHaveStyle({
      backgroundColor: inactiveBg,
      borderColor: inactiveBorder,
    });

    expect(screen.getByText('2')).toHaveStyle({ color: theme.white });
    expect(screen.getByText('3')).toHaveStyle({
      color: theme.fn.themeColor('gray', 6),
    });
    expect(screen.getByText('Second')).toHaveStyle({ fontWeight: '600' });
    expect(screen.getByText('First')).toHaveStyle({ fontWeight: '400' });
  });

  it('renders separators for all but the last step and colors completed ones', () => {
    renderStepper();

    const first = getStepParts(1);
    expect(first.separator).toBeTruthy();
    expect(first.separator).toHaveStyle({
      backgroundColor: blue,
      flex: 1,
      height: 2,
      marginTop: 36 / 2,
    });

    const second = getStepParts(2);
    expect(second.separator).toHaveStyle({
      backgroundColor: inactiveSeparator,
    });

    expect(getStepParts(3).separator).toBeUndefined();
  });

  it('calls onStepClick with the step index when a step is pressed', () => {
    const onStepClick = jest.fn();
    renderStepper({ onStepClick });

    fireEvent.press(screen.getByTestId('s2'));
    expect(onStepClick).toHaveBeenCalledWith(2);

    fireEvent.press(screen.getByTestId('s0'));
    expect(onStepClick).toHaveBeenLastCalledWith(0);
  });

  it('does not throw when pressed without onStepClick', () => {
    renderStepper();
    expect(() => fireEvent.press(screen.getByTestId('s2'))).not.toThrow();
  });

  it('prevents selecting steps ahead of active when allowNextStepsSelect is false', () => {
    const onStepClick = jest.fn();
    renderStepper({ onStepClick, allowNextStepsSelect: false });

    const next = screen.getByTestId('s2');
    expect(next.props.accessibilityRole).toBeUndefined();
    expect(next.props.accessibilityState.disabled).toBe(true);
    expect(next.props.onPress).toBeUndefined();
    fireEvent.press(next);
    expect(onStepClick).not.toHaveBeenCalled();

    const previous = screen.getByTestId('s0');
    expect(previous.props.accessibilityRole).toBe('button');
    fireEvent.press(previous);
    expect(onStepClick).toHaveBeenCalledWith(0);

    fireEvent.press(screen.getByTestId('s1'));
    expect(onStepClick).toHaveBeenLastCalledWith(1);
    expect(screen.getAllByRole('button')).toHaveLength(2);
  });

  it('prevents selecting a step with allowStepSelect={false}', () => {
    const onStepClick = jest.fn();
    render(
      <Stepper active={1} onStepClick={onStepClick}>
        <Step label="A" allowStepSelect={false} testID="a" />
        <Step label="B" testID="b" />
      </Stepper>
    );

    const a = screen.getByTestId('a');
    expect(a.props.accessibilityState.disabled).toBe(true);
    expect(a.props.accessibilityRole).toBeUndefined();
    fireEvent.press(a);
    expect(onStepClick).not.toHaveBeenCalled();

    fireEvent.press(screen.getByTestId('b'));
    expect(onStepClick).toHaveBeenCalledWith(1);
  });

  it('renders the Completed content when active is past the last step', () => {
    renderStepper({ active: 3 });
    expect(screen.getByText('All done')).toBeTruthy();
    expect(screen.queryByText('Step 3 content')).toBeNull();
    expect(getStepParts(3).icon).toHaveStyle({ backgroundColor: blue });
  });

  it('renders nothing in the content area when there is no matching step', () => {
    render(
      <Stepper active={5}>
        <Step label="Only" />
      </Stepper>
    );
    expect(screen.getByText('Only')).toBeTruthy();
    expect(screen.queryByText('All done')).toBeNull();
  });

  it('renders StepperCompleted with style and testID', () => {
    render(
      <Stepper active={1}>
        <Step label="Only" />
        <StepperCompleted style={{ padding: 9 }} testID="completed">
          <Text>Finished</Text>
        </StepperCompleted>
      </Stepper>
    );
    expect(screen.getByText('Finished')).toBeTruthy();
    expect(screen.getByTestId('completed')).toHaveStyle({ padding: 9 });
  });

  it('treats state="completed" steps as completed even when ahead of active', () => {
    render(
      <Stepper active={0}>
        <Step label="A" />
        <Step label="B" state="completed" />
        <Step label="C" />
      </Stepper>
    );
    expect(getStepParts(2).icon).toHaveStyle({ backgroundColor: blue });
    expect(getStepParts(2).separator).toHaveStyle({ backgroundColor: blue });
    expect(getStepParts(3).icon).toHaveStyle({ backgroundColor: inactiveBg });
  });

  it('reports busy state for loading steps', () => {
    render(
      <Stepper active={0}>
        <Step label="A" state="loading" testID="a" />
        <Step label="B" testID="b" />
      </Stepper>
    );
    expect(screen.getByTestId('a').props.accessibilityState.busy).toBe(true);
    expect(screen.getByTestId('b').props.accessibilityState.busy).toBe(false);
  });

  it('renders custom icons instead of the step number', () => {
    render(
      <Stepper active={0}>
        <Step label="A" icon={<View testID="custom-icon" />} />
        <Step label="B" />
      </Stepper>
    );
    expect(screen.getByTestId('custom-icon')).toBeTruthy();
    expect(screen.queryByText('1')).toBeNull();
    expect(screen.getByText('2')).toBeTruthy();
  });

  it('renders a step without label or description', () => {
    render(
      <Stepper active={0}>
        <Step testID="bare" />
      </Stepper>
    );
    expect(screen.getByTestId('bare')).toBeTruthy();
    expect(screen.getByText('1')).toBeTruthy();
  });

  it('applies vertical orientation styles', () => {
    renderStepper({ orientation: 'vertical' });
    expect(screen.getByTestId('stepper')).toHaveStyle({
      flexDirection: 'column',
    });
    expect(screen.getByTestId('s0')).toHaveStyle({
      flexDirection: 'row',
      alignItems: 'flex-start',
    });
    // The separator hangs centered below the icon (column layout), no offset needed
    expect(getStepParts(1).separator).toHaveStyle({
      width: 2,
      height: 24,
      marginVertical: theme.spacing.xs,
    });
  });

  it('applies horizontal step layout styles', () => {
    renderStepper();
    expect(screen.getByTestId('s0')).toHaveStyle({
      flex: 1,
      flexDirection: 'column',
      alignItems: 'center',
    });
  });

  it.each([
    ['xs', 28],
    ['sm', 32],
    ['md', 36],
    ['lg', 42],
    ['xl', 48],
  ] as const)('uses icon size for size=%s', (size, expected) => {
    renderStepper({ size });
    expect(getStepParts(1).icon).toHaveStyle({
      width: expected,
      height: expected,
    });
  });

  it('falls back to md icon size for unknown size and honors iconSize prop', () => {
    renderStepper({ size: 'huge' as any });
    expect(getStepParts(1).icon).toHaveStyle({ width: 36, height: 36 });

    screen.unmount();

    renderStepper({ iconSize: 50 });
    expect(getStepParts(1).icon).toHaveStyle({ width: 50, height: 50 });
    expect(getStepParts(1).separator).toHaveStyle({ marginTop: 25 });
  });

  it('applies stepper color and per-step color override', () => {
    render(
      <Stepper active={1} color="red">
        <Step label="A" />
        <Step label="B" color="blue" />
        <Step label="C" />
      </Stepper>
    );
    expect(getStepParts(1).icon).toHaveStyle({ backgroundColor: red });
    expect(getStepParts(2).icon).toHaveStyle({ backgroundColor: blue });
  });

  it('uses xl radius for step icons regardless of radius prop', () => {
    renderStepper({ radius: 'xs' });
    expect(getStepParts(1).icon).toHaveStyle({
      borderRadius: theme.radius.xl,
    });
  });

  it('passes custom style and accessibilityLabel through to steps', () => {
    render(
      <Stepper active={0} style={{ margin: 7 }} testID="stepper">
        <Step label="A" testID="a" accessibilityLabel="Custom step label" />
      </Stepper>
    );
    expect(screen.getByTestId('stepper')).toHaveStyle({ margin: 7 });
    expect(screen.getByTestId('a')).toBeTruthy();
  });

  it('ignores non-Step children when counting steps', () => {
    render(
      <Stepper active={0}>
        <Text>Not a step</Text>
        <Step label="A" testID="a" />
        {null}
        <Step label="B" testID="b" />
      </Stepper>
    );
    expect(screen.getByTestId('a').props.accessibilityValue).toEqual({
      min: 1,
      max: 2,
      now: 1,
    });
    expect(screen.getByTestId('b').props.accessibilityValue.now).toBe(2);
  });

  it('throws when Step is rendered outside Stepper', () => {
    const consoleError = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    expect(() => render(<Step label="Orphan" />)).toThrow(
      'Stepper components must be used within Stepper'
    );

    consoleError.mockRestore();
  });
});
