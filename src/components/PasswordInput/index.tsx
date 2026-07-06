import React, { forwardRef, useState } from 'react';
import { TextInput as RNTextInput, Pressable } from 'react-native';
import { TextInput, type TextInputProps } from '../TextInput';
import { Icon } from '../Icon';

export interface PasswordInputProps extends Omit<TextInputProps, 'rightSection' | 'type'> {
  /** Toggle button aria-label */
  visibilityToggleLabel?: string;

  /** Controlled visibility state */
  visible?: boolean;

  /** Called when visibility changes */
  onVisibilityChange?: (visible: boolean) => void;

  /** Custom visibility toggle icon */
  visibilityToggleIcon?: (visible: boolean) => React.ReactNode;

  /** Accessibility label for the password input */
  accessibilityLabel?: string;

  /** Accessibility hint for the password input */
  accessibilityHint?: string;
}

const defaultProps: Partial<PasswordInputProps> = {
  visibilityToggleLabel: 'Toggle password visibility',
  accessibilityLabel: 'Password',
};

const DefaultEyeIcon = ({ visible }: { visible: boolean }) => (
  <Icon name={visible ? 'eye' : 'eye-slash'} size={16} useThemeColor />
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

  const toggleButton = (
    <Pressable
      onPress={handleToggle}
      accessibilityLabel={visible ? 'Hide password' : 'Show password'}
      accessibilityRole="button"
      accessibilityHint={visibilityToggleLabel}
      style={{
        padding: 8,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {visibilityToggleIcon ? visibilityToggleIcon(visible) : <DefaultEyeIcon visible={visible} />}
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
