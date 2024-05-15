import React from 'react';
import {TouchableOpacity, Text, StyleSheet, View} from 'react-native';
import {colors, fonts} from '../../theme/theme';

const ButtonSecondary = ({onPress, title}) => {
  return (
    <TouchableOpacity style={styles.boton} onPress={onPress}>
      <View style={styles.content}>
        <Text style={styles.textoBoton}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  boton: {
    backgroundColor: 'transparent',
    borderColor: colors.border,
    borderWidth: 1,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
    width: '100%',
    alignSelf: 'center',
  },
  content: {
    width: '100%',
    alignItems: 'center',
  },
  textoBoton: {
    color: 'white',
    fontSize: 19,
    fontFamily: fonts.boldMt,
  },
});

export default ButtonSecondary;
