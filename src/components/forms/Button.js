import React from 'react';
import {TouchableOpacity, Text, StyleSheet, View} from 'react-native';
import {colors, fonts} from '../../theme/theme';
import {MoveRight} from 'lucide-react-native';

const Button = ({onPress, title, disabled}) => {
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={onPress}
      disabled={disabled}>
      <View
        style={[
          styles.buttonContent,
          {backgroundColor: disabled ? '#9E9E9E' : colors.secondary},
        ]}>
        <Text style={styles.buttonText}>{title}</Text>
        <MoveRight size={26} color={colors.white} strokeWidth={1.8} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: '100%',
  },
  buttonContent: {
    borderRadius: 10,
    paddingVertical: 15,
    marginTop: 5 ,
    paddingHorizontal: 20,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    marginEnd: 6,
    paddingBottom: 4,
    fontFamily: fonts.mediumMt,
  },
});

export default Button;
