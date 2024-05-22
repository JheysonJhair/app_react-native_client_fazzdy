import React from 'react';
import {View, TextInput, StyleSheet} from 'react-native';
import {Pencil } from 'lucide-react-native';
import {colors, fonts} from '../../theme/theme';

const InputCommon = ({
  placeholder,
  onChangeText,
  value,
  isVerified,
  keyboardType,
}) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={[styles.input, isVerified && styles.disabledInput]}
        placeholder={placeholder}
        onChangeText={onChangeText}
        value={value}
        placeholderTextColor="#A3AABF"
        editable={!isVerified}
        keyboardType={keyboardType}
      />
      {!isVerified && (
        <View style={styles.iconContainer}>
          <Pencil  size={20} color={colors.primary} strokeWidth={4} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    width: '100%',
  },
  input: {
    backgroundColor: 'transparent',
    borderColor: colors.white,
    borderWidth: .6,
    padding: 10,
    paddingStart: 18,
    borderRadius: 8,
    color: colors.white,
    fontSize: 14,
    width: '100%',
    marginBottom: 14,
    paddingRight: 40,
    fontFamily: fonts.mediumMt
  },
  disabledInput: {
    opacity: 0.6,
  },
  iconContainer: {
    position: 'absolute',
    right: 12,
    top: 15,
  },
});

export default InputCommon;
