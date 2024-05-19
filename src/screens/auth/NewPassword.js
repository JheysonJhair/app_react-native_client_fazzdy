import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  Platform,
  Image,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';

import Button from '../../components/forms/Button';
import InputForgetPassword from '../../components/forms//InputForgetPassword';
import StatusModal from '../../components/modals/StatusModal ';

import {updatePassword} from '../../services/apiUser';
import {colors, fonts} from '../../theme/theme';

const NewPassword = () => {
  const navigation = useNavigation();
  const [modal, setModal] = useState({
    visible: false,
    status: 'error',
    title: '',
    subtitle: '',
  });
  const route = useRoute();

  const email = route.params?.email || '';
  const [confirmPassword, setConfirmPassword] = useState('');
  const [password, setPassword] = useState('');

  const onHandleNewPassword = async () => {
    if (!password || !confirmPassword) {
      setModal({
        visible: true,
        status: 'error',
        title: 'Campos vacios',
        subtitle: 'Complete todos los campos, es necesario!',
      });
      return;
    }
    if (password !== confirmPassword) {
      setModal({
        visible: true,
        status: 'warning',
        title: 'Advertencia',
        subtitle: 'Las contraseñas no coinciden!',
      });
      return;
    }

    try {
      //   const response = await updatePassword({
      //     Email: email,
      //     Password: password,
      //   });
      //   if (response.success) {
      //     setModal({
      //       visible: true,
      //       status: 'success',
      //       title: 'Advertencia',
      //       subtitle: 'Su contraseña se actualizo satisfactoriamente!.',
      //     });
      //     setTimeout(() => {
      //       navigation.navigate('Login');
      //     }, 3000);
      //   } else {
      //     setModal({
      //       visible: true,
      //       status: 'error',
      //       title: 'Error',
      //       subtitle: response.msg,
      //     });
      //   }
      navigation.navigate('Login');
    } catch (error) {
      console.error('CODE: Error al registrar el usuario:', error);
    }
  };

  //Modal
  useEffect(() => {
    if (modal.visible) {
      const timeout = setTimeout(
        () => setModal({...modal, visible: false}),
        2000,
      );
      return () => clearTimeout(timeout);
    }
  }, [modal]);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}>
      <Image
        source={require('../../assets/Logo.png')}
        style={styles.logoImage}
      />
      <Text style={styles.h1}>Contraseña olvidada</Text>
      <Text style={styles.h2}>Tú identidad ah sido verificada!</Text>

      <View style={styles.formContainer}>
        <InputForgetPassword
          placeholder="Nueva contraseña"
          onChangeText={text => setPassword(text)}
          value={password}
          editable={true}
        />
        <InputForgetPassword
          placeholder="Confirmar contraseña"
          onChangeText={text => setConfirmPassword(text)}
          value={confirmPassword}
          editable={true}
        />
        <Button
          title="Cambiar contraseña"
          onPress={() => onHandleNewPassword()}
        />
      </View>
      <StatusModal
        visible={modal.visible}
        status={modal.status}
        title={modal.title}
        subtitle={modal.subtitle}
      />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  formContainer: {
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoImage: {
    width: 45,
    height: 35,
    marginBottom: 10,
  },
  h1: {
    fontFamily: fonts.boldMt,
    color: '#fff',
    width: '80%',
    fontSize: 24,
    marginTop: 5,
    marginBottom: 5,
    textAlign: 'center',
  },
  h2: {
    fontFamily: fonts.semiBoldMt,
    color: '#fff',
    width: '80%',
    fontSize: 15,
    marginTop: 5,
    marginBottom: 25,
    textAlign: 'center',
  },
  texto: {
    marginTop: 25,
  },
  span: {
    color: colors.primary,
  },
  // Linea
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 15,
  },
  dividerLine: {
    width: '36%',
    height: 1,
    backgroundColor: colors.border,
  },
  dividerText: {
    color: '#000',
    marginHorizontal: 10,
    fontFamily: fonts.semiBoldMt,
  },
  // Google y Facebook
  socialButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
});

export default NewPassword;
