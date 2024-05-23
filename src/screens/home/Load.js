import React, {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {View, StyleSheet, Image} from 'react-native';

import * as Animatable from 'react-native-animatable';
import {AsyncStorage} from 'react-native';

import {loginUser} from '../../services/apiLogin';
import {colors, fonts} from '../../theme/theme';

const Load = () => {
  const navigation = useNavigation();

  const retrieveUserData = async () => {
    try {
      const userData = await AsyncStorage.getItem('userData');
      if (userData !== null) {
        const {email: savedEmail, password: savedPassword} =
          JSON.parse(userData);

        const user = await loginUser(savedEmail, savedPassword);
        if (user.msg === 'Ingreso correctamente') {
          navigation.navigate('Home');
        } else {
          navigation.navigate('Login');
        }
      } else {
        navigation.navigate('Login');
      }
    } catch (error) {
      navigation.navigate('Login');
      console.error(
        'Local storage: Error al recuperar datos del usuario.  :',
        error,
      );
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      retrieveUserData();
    }, 700);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.containerLogo}>
        <Image
          source={require('../../assets/Logo.png')}
          style={styles.logoImage}
        />
        <Animatable.Text animation="flipInX" style={styles.containerLogoText}>
          FAZZDY
        </Animatable.Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  containerLogo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerLogoText: {
    color: '#fff',
    fontSize: 29,
    fontFamily: fonts.boldMt,
  },
  logoImage: {
    width: 35,
    height: 25,
    marginRight: 10,
  },
});

export default Load;
