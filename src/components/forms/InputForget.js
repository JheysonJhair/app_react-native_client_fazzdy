import React from 'react';
import {TextInput, StyleSheet} from 'react-native';
import {colors} from '../../theme/theme';

const InputForget = ({placeholder, onChangeText, value, isVerified}) => {
  return (
    <TextInput
      style={[styles.input, isVerified && styles.disabledInput]}
      placeholder={placeholder}
      onChangeText={onChangeText}
      value={value}
      autoCapitalize="none"
      placeholderTextColor={colors.other}
      editable={!isVerified}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    backgroundColor: '#fff',
    borderColor: colors.border,
    borderWidth: 1,
    padding: 11,
    borderRadius: 6,
    color: '#000000',
    fontSize: 16,
    width: '100%',
    marginBottom: 18,
  },
  disabledInput: {
    opacity: 0.6,
  },
});

export default InputForget;
