import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';

import Button from '../../components/forms/Button';
import Input from '../../components/forms/Input';
import InputPassword from '../../components/forms/InputPassword';
import StatusModal from '../../components/modals/StatusModal ';

import {verifyEmail, verifyCode} from '../../services/apiUser';
import LogoName from '../../components/forms/LogoName';
import {colors, fonts} from '../../theme/theme';

const RegisterData = () => {
  const navigation = useNavigation();
  const [modal, setModal] = useState({
    visible: false,
    status: 'error',
    title: '',
    subtitle: '',
  });
  const route = useRoute();

  const email = route.params?.email || '';
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const [verificationCode, setVerificationCode] = useState(['', '', '', '']);
  const [emailVerified, setEmailVerified] = useState(false);

  const getEmailVerificate = async email => {
    try {
      // const emailRegex = /\S+@\S+\.\S+/;
      // if (!emailRegex.test(email)) {
      //   setModal({
      //     visible: true,
      //     status: 'error',
      //     title: 'Correo invalido',
      //     subtitle: 'Por favor, utiliza una cuenta de Gmail.',
      //   });
      //   return;
      // }

      // const user = await verifyEmail(email);

      // if (user.success) {
      //   setModal({
      //     visible: true,
      //     status: 'success',
      //     title: 'Enviado correctamente!',
      //     subtitle: 'Por favor verifique eh ingrese el código enviado.',
      //   });
      //   setEmailVerified(true);
      // }
      setEmailVerified(true);
    } catch (error) {
      console.error('CODE: Error al verificar email:', error);
    }
  };
  const getCodeVerificate = async (email, code) => {
    try {
      // const codeFormated = code.join('');
      // const codeRegex = /^\d{4}$/;
      // if (!codeRegex.test(codeFormated)) {
      //   setModal({
      //     visible: true,
      //     status: 'error',
      //     title: 'Código no valido!',
      //     subtitle: 'Por favor ingrese un código valido.',
      //   });
      //   return;
      // }
      // const user = await verifyCode(email, codeFormated);

      // if (user.success) {
      //   setModal({
      //     visible: true,
      //     status: 'loading',
      //     title: 'Verificando...',
      //     subtitle:
      //       'Te hemos enviado un código a tu correo. Por favor, verifica en la carpeta de spam si no lo encuentras en la bandeja de entrada.',
      //   });
      //   navigation.navigate('RegisterData', {email});
      // } else {
      //   setModal({
      //     visible: true,
      //     status: 'error',
      //     title: 'Error!',
      //     subtitle:
      //       'Hubo un problema al verificar el codigo. Por favor, inténtalo de nuevo.',
      //   });
      // }
      navigation.navigate('RegisterData', {email});
    } catch (error) {
      console.error('CODE: Error al enviar el codigo:', error);
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
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
    >
      <View style={styles.containerWhite}>
        <LogoName />

        <Text style={styles.h2}>Complete los campos</Text>
        <View style={styles.formContainer}>
          <Input
            placeholder="Correo electrónico"
            value={email}
            editable={false}
            keyboardType="email-address"
          />
          <Input
            placeholder="Nombres"
            onChangeText={text => setName(text)}
            value={name}
          />
          <Input
            placeholder="Apellidos"
            onChangeText={text => setLastName(text)}
            value={lastName}
          />
          <Input
            placeholder="Número de celular"
            onChangeText={text => setPhone(text)}
            value={phone}
            keyboardType="numeric"
          />
          <InputPassword
            placeholder="Contraseña"
            onChangeText={text => setPassword(text)}
            value={password}
            editable={true}
          />
          <Button title="Continuar" onPress={() => getEmailVerificate(email)} />
        </View>

        <StatusModal
          visible={modal.visible}
          status={modal.status}
          title={modal.title}
          subtitle={modal.subtitle}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingTop: '20%',
  },
  containerWhite: {
    flex: 1,
    borderTopEndRadius: 20,
    borderTopStartRadius: 20,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  formContainer: {
    marginTop: 20,
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  h2: {
    fontFamily: fonts.semiBoldMt,
    color: '#000',
    width: '80%',
    fontSize: 16,
    marginTop: 5,
    marginBottom: 5,
    textAlign: 'center',
  },
  h3: {
    fontFamily: fonts.semiBoldMt,
    fontSize: 14,
    color: '#000',
    width: '80%',
    textAlign: 'left',
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

export default RegisterData;
