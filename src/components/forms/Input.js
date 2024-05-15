import React from 'react';
import { TextInput, StyleSheet } from 'react-native';
import { colors } from '../../theme/theme';

const Input = ({ placeholder, onChangeText, value, editable = true, keyboardType = 'default' }) => {
  return (
    <TextInput
      style={[styles.input, !editable && styles.disabledInput]}
      placeholder={placeholder}
      onChangeText={onChangeText}
      value={value}
      autoCapitalize="none"
      placeholderTextColor={colors.other}
      editable={editable}
      keyboardType={keyboardType}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    backgroundColor: 'transparent',
    borderColor: colors.border,
    borderWidth: 1,
    padding: 13,
    borderRadius: 6,
    color: '#000000',
    fontSize: 16,
    width: '100%',
    marginBottom: 12,
  },
  disabledInput: {
    opacity: 0.4,
  },
});

export default Input;
