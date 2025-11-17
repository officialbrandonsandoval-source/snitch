import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';

export type TriggerButtonProps = {
  label?: string;
  onTrigger: () => void;
  disabled?: boolean;
};

export default function TriggerButton({ label = 'Hold for Snitch', onTrigger, disabled }: TriggerButtonProps) {
  return (
    <Pressable
      style={({ pressed }) => [styles.button, pressed && styles.pressed, disabled && styles.disabled]}
      onPress={onTrigger}
      disabled={disabled}
    >
      <Text style={styles.label}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#ff3b30',
    paddingVertical: 18,
    paddingHorizontal: 32,
    borderRadius: 999,
    elevation: 4
  },
  pressed: {
    opacity: 0.8
  },
  disabled: {
    opacity: 0.4
  },
  label: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center'
  }
});
