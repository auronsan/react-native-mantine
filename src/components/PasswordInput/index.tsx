import React, { forwardRef, useState } from 'react';
import { TextInput as RNTextInput, Pressable } from 'react-native';
import { TextInput, type TextInputProps } from '../TextInput';
import { Text } from '../Text';

export interface PasswordInputProps extends Omit<TextInputProps, 'rightSection' | 'type'> {
  /** Toggle button aria-label */
  visibilityToggleLabel?: string;

  /** Controlled visibility state */
  visible?: boolean;

  /** Called when visibility changes */
  onVisibilityChange?: (visible: boolean) => void;

  /** Custom visibility toggle icon */
  visibilityToggleIcon?: (visible: boolean) => React.ReactNode;
}

const defaultProps: Partial<PasswordInputProps> = {
  visibilityToggleLabel: 'Toggle password visibility',
};

const DefaultEyeIcon = ({ visible }: { visible: boolean }) => (
  <Text style={{ fontSize: 18 }}>{visible ? '👁️' : '👁️‍🗨️'}</Text>
);

export const PasswordInput = forwardRef<RNTextInput, PasswordInputProps>((props, ref) => {
  const {
    visibilityToggleLabel,
    visible: controlledVisible,
    onVisibilityChange,
    visibilityToggleIcon,
    ...others
  } = {
    ...defaultProps,
    ...props,
  };

  const [uncontrolledVisible, setUncontrolledVisible] = useState(false);
  const isControlled = controlledVisible !== undefined;
  const visible = isControlled ? controlledVisible : uncontrolledVisible;

  const handleToggle = () => {
    const newVisible = !visible;
    if (!isControlled) {
      setUncontrolledVisible(newVisible);
    }
    onVisibilityChange?.(newVisible);
  };

  const ToggleIcon = visibilityToggleIcon || DefaultEyeIcon;

  const toggleButton = (
    <Pressable
      onPress={handleToggle}
      accessibilityLabel={visibilityToggleLabel}
      accessibilityRole="button"
      style={{
        padding: 8,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <ToggleIcon visible={visible} />
    </Pressable>
  );

  return (
    <TextInput
      ref={ref}
      secureTextEntry={!visible}
      rightSection={toggleButton}
      rightSectionWidth={40}
      {...others}
    />
  );
});

PasswordInput.displayName = 'PasswordInput';
