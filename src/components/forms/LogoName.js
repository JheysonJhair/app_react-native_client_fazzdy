import React from 'react';
import {View, StyleSheet, Text, Image} from 'react-native';
import {fonts, colors} from '../../theme/theme';

const LogoName = () => {
  return (
    <View style={styles.containerLogo}>
      <Image
        source={require('../../assets/Logo.png')}
        style={styles.logoImage}
      />
      <Text style={styles.containerLogoText}>FAZZDY</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  containerLogo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerLogoText: {
    color: colors.primary,
    fontSize: 29,
    fontFamily: fonts.boldMt,
  },
  logoImage: {
    width: 35,
    height: 25,
    marginRight: 10,
  },
});

export default LogoName;
