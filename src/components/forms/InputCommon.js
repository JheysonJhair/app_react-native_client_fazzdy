import React from 'react';
import {TextInput, StyleSheet} from 'react-native';
import {colors, fonts} from '../../theme/theme';

const InputCommon = ({
  placeholder,
  onChangeText,
  value,
  isVerified,
  keyboardType,
}) => {
  return (
    <TextInput
      style={[styles.input, isVerified && styles.disabledInput]}
      placeholder={placeholder}
      onChangeText={onChangeText}
      value={value}
      placeholderTextColor="#A3AABF"
      editable={!isVerified}
      keyboardType={keyboardType}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    backgroundColor: colors.other,
    borderColor: colors.other,
    borderWidth: 1,
    padding: 10,
    paddingStart: 18,
    borderRadius: 8,
    color: '#40A5E7',
    fontSize: 16,
    width: '100%',
    marginBottom: 8,
  },
  disabledInput: {
    opacity: 0.6,
  },
});

export default InputCommon;
