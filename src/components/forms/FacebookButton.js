import React from 'react';
import {TouchableOpacity, StyleSheet, Image} from 'react-native';
import GoogleIcon from '../../assets/images/facebook.png';
import {colors} from '../../theme/theme';

const FacebookButton = ({onPress}) => {
  return (
    <TouchableOpacity
      style={styles.socialButton}
      onPress={() => {
        onPress && onPress();
      }}>
      <Image source={GoogleIcon} style={styles.socialButtonIcon} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  socialButton: {
    backgroundColor: colors.background,
    borderRadius: 25,
    width: 38,
    height: 38,
    alignItems: 'center',
    justifyContent: 'center',
    marginEnd: 12,
  },
  socialButtonIcon: {
    width: 24,
    height: 24,
    tintColor: '#fff',
  },
});

export default FacebookButton;
