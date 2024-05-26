import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  Image,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import Button from '../../components/forms/Button';
import InputForget from '../../components/forms/InputForget';
import StatusModal from '../../components/modals/StatusModal';
import VerificationCodeInput from '../../components/forms/VerificationCodeInput';

import {colors, fonts} from '../../theme/theme';

const ForgetPassword = () => {
  const navigation = useNavigation();
  const [modal, setModal] = useState({
    visible: false,
    status: 'error',
    title: '',
    subtitle: '',
  });

  const [email, setEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState(['', '', '', '']);
  const [emailVerified, setEmailVerified] = useState(false);

  const getEmailVerificate = async email => {
    try {
      const emailRegex = /\S+@\S+\.\S+/;
      if (!emailRegex.test(email)) {
        setModal({
          visible: true,
          status: 'error',
          title: 'Correo invalido',
          subtitle: 'Por favor, utiliza una cuenta de Gmail.',
        });
        return;
      }

      const user = await verifyEmail(email);

      if (user.success) {
        setModal({
          visible: true,
          status: 'success',
          title: 'Enviado correctamente!',
          subtitle: 'Por favor verifique eh ingrese el código enviado.',
        });
        setEmailVerified(true);
      }
      setEmailVerified(true);
    } catch (error) {
      console.error('CODE: Error al verificar email de ForgetPassword:', error);
    }
  };
  const getCodeVerificate = async (email, code) => {
    try {
      const codeFormated = code.join('');
      const codeRegex = /^\d{4}$/;
      if (!codeRegex.test(codeFormated)) {
        setModal({
          visible: true,
          status: 'error',
          title: 'Código no valido!',
          subtitle: 'Por favor ingrese un código valido.',
        });
        return;
      }
      const user = await verifyCode(email, codeFormated);

      if (user.success) {
        setModal({
          visible: true,
          status: 'loading',
          title: 'Verificando...',
          subtitle:
            'Te hemos enviado un código a tu correo. Por favor, verifica en la carpeta de spam si no lo encuentras en la bandeja de entrada.',
        });
        navigation.navigate('RegisterData', {email});
      } else {
        setModal({
          visible: true,
          status: 'error',
          title: 'Error!',
          subtitle:
            'Hubo un problema al verificar el codigo. Por favor, inténtalo de nuevo.',
        });
      }
      navigation.navigate('NewPassword', {email});
    } catch (error) {
      console.error(
        'CODE: Error al enviar el codigo de ForgetPassword:',
        error,
      );
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
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      {!emailVerified ? (
        <>
          <Image
            source={require('../../assets/Logo.png')}
            style={styles.logoImage}
          />
          <Text style={styles.h1}>Contraseña olvidada</Text>
          <Text style={styles.h2}>
            Te enviaremos tu código de recuperación a tu correo electronico
          </Text>

          <View style={styles.formContainer}>
            <InputForget
              placeholder="Email"
              onChangeText={text => setEmail(text)}
              value={email}
            />
            <Button
              title="Continuar"
              onPress={() => getEmailVerificate(email)}
            />
          </View>
        </>
      ) : (
        <>
          <Image
            source={require('../../assets/Logo.png')}
            style={styles.logoImage}
          />
          <Text style={styles.h1}>Contraseña olvidada</Text>
          <Text style={styles.h2}>Ingrese el código de recuperación</Text>
          <View style={styles.formContainer}>
            <VerificationCodeInput
              code={verificationCode}
              setCode={setVerificationCode}
              textColor="#FFFFFF"
            />
            <Button
              title="Continuar"
              onPress={() => getCodeVerificate(email, verificationCode)}
            />
          </View>
        </>
      )}
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
    width: '80%',
    color: '#fff',
    fontSize: 24,
    marginTop: 5,
    marginBottom: 5,
    textAlign: 'center',
  },
  h2: {
    fontFamily: fonts.semiBoldMt,
    width: '80%',
    color: '#fff',
    fontSize: 15,
    marginTop: 5,
    marginBottom: 25,
    textAlign: 'center',
  },
  texto: {
    marginTop: 25,
  },
  h3: {
    fontSize: 13,
    fontFamily: fonts.semiBoldMt,
  },
  span: {
    color: colors.primary,
  },
  //Linea
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
  //Google y Facebook
  socialButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
});
export default ForgetPassword;
