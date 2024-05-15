import React, {useRef, useState} from 'react';
import {View, TextInput, StyleSheet} from 'react-native';
import {colors, fonts} from '../../theme/theme';

const VerificationCodeInput = ({code, setCode}) => {
  const inputs = useRef([]);

  const handleChange = (text, index) => {
    const newCode = [...code];
    newCode[index] = text;
    setCode(newCode);

    if (text.length === 1 && index < 3) {
      inputs.current[index + 1].focus();
    }
  };

  const handleKeyPress = (e, index) => {
    if (e.nativeEvent.key === 'Backspace' && code[index] === '' && index > 0) {
      inputs.current[index - 1].focus();
    }
  };

  return (
    <View style={styles.container}>
      {code.map((_, index) => (
        <TextInput
          key={index}
          ref={el => (inputs.current[index] = el)}
          style={styles.input}
          keyboardType="numeric"
          maxLength={1}
          onChangeText={text => handleChange(text, index)}
          onKeyPress={e => handleKeyPress(e, index)}
          value={code[index]}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
  },
  input: {
    width: '20%',
    height: 70,
    borderRadius: 10,
    borderColor: colors.primary,
    borderWidth: 1,
    textAlign: 'center',
    color: '#000000',
    fontSize: 18,
    fontFamily: fonts.semiBoldMt,
  },
});

export default VerificationCodeInput;
