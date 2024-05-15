import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import Button from '../../components/forms/Button';
import Input from '../../components/forms/Input';
import VerificationCodeInput from '../../components/forms/VerificationCodeInput';
import GoogleButton from '../../components/forms/GoogleButton';
import FacebookButton from '../../components/forms/FacebookButton';
import StatusModal from '../../components/modals/StatusModal ';

import {verifyEmail, verifyCode} from '../../services/apiUser';
import LogoName from '../../components/forms/LogoName';
import {colors, fonts} from '../../theme/theme';

const RegisterEmail = () => {
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
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <View style={styles.containerWhite}>
        <LogoName />

        {!emailVerified ? (
          <>
            <Text style={styles.h2}>
              Recibiras un código para validar tu identidad
            </Text>
            <View style={styles.formContainer}>
              <Input
                placeholder="Correo electrónico"
                onChangeText={text => setEmail(text)}
                value={email}
              />
              <Button
                title="Continuar"
                onPress={() => getEmailVerificate(email)}
              />
            </View>
            <View style={styles.texto}>
              <Text style={styles.h3}>
                ¿Ya tienes cuenta?{' '}
                <Text
                  style={styles.span}
                  onPress={() => navigation.navigate('Login')}>
                  Ingresar
                </Text>
              </Text>
            </View>
            <View style={styles.dividerContainer}>
              <View style={styles.dividerLine}></View>
              <Text style={styles.dividerText}>O</Text>
              <View style={styles.dividerLine}></View>
            </View>
            <View style={styles.socialButtonsContainer}>
              <FacebookButton
                onPress={() => console.log('Botón de Facebook presionado')}
              />
              <GoogleButton
                onPress={() => console.log('Botón de Google presionado')}
              />
            </View>
          </>
        ) : (
          <>
            <Text style={styles.h2}>Código de verificación</Text>
            <Text style={styles.h3}>
              Enviado a <Text style={styles.span}>{email}</Text>
            </Text>
            <View style={styles.formContainer}>
              <VerificationCodeInput
                code={verificationCode}
                setCode={setVerificationCode}
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
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingTop: '56%',
  },
  containerWhite: {
    flex: 1,
    borderTopEndRadius: 20,
    borderTopStartRadius: 20,
    backgroundColor: colors.white,
    alignItems: 'center',
    paddingTop: 70,
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

export default RegisterEmail;
