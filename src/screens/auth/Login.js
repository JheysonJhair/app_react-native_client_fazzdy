import React, {useState, useEffect} from 'react';
import CheckBox from '@react-native-community/checkbox';
import {StyleSheet, Text, View, KeyboardAvoidingView} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Button from '../../components/forms/Button';
import Input from '../../components/forms/Input';
import InputPassword from '../../components/forms/InputPassword';
import GoogleButton from '../../components/forms/GoogleButton';
import FacebookButton from '../../components/forms/FacebookButton';
import StatusModal from '../../components/modals/StatusModal';

import {loginUser} from '../../services/apiLogin';
import {useUser} from '../../hooks/UserContext';
import LogoName from '../../components/forms/LogoName';
import {colors, fonts} from '../../theme/theme';

const Login = () => {
  const navigation = useNavigation();
  const [modal, setModal] = useState({
    visible: false,
    status: 'error',
    title: '',
    subtitle: '',
  });

  const {setUserInfo} = useUser();
  const [isChecked, setChecked] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  //Login
  const onHandleLogin = async (email, password) => {
    try {
      if (!email || !password) {
        setModal({
          visible: true,
          status: 'error',
          title: 'Campos vacios',
          subtitle: 'Complete todos los campos, es necesario!',
        });
        return;
      }

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

      const user = await loginUser(email, password);
      setModal({
        visible: true,
        status: 'loading',
        title: 'Campos vacios',
        subtitle: 'Complete todos los campos, es necesario!',
      });
      if (user.msg == 'Ingreso correctamente') {
        if (isChecked) {
          saveUserData();
        }
        setUserInfo({
          IdUser: user.value.IdUser,
          Email: user.value.Email,
          Contrasena: user.value.Contrasena,
          Nombre: user.value.Nombre,
          Apellido: user.value.Apellido,
          Telefono: user.value.Telefono,
        });
        navigation.navigate('Steps');
      } else {
        setModal({
          visible: true,
          status: 'error',
          title: 'Error de ingreso',
          subtitle: 'Crea una cuenta, es muy rápido!',
        });
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      setModal({
        visible: true,
        status: 'error',
        title: 'Ooppss, Algo salio mal!',
        subtitle: 'Estamos solucionando el problema.',
      });
    }
  };

  //Local Storage
  const saveUserData = async () => {
    try {
      await AsyncStorage.setItem('userData', JSON.stringify({email, password}));
      console.error('Guardado correctamente el user data');
    } catch (error) {
      console.error('Error al guardar datos de usuario:', error);
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
        <View style={styles.dragHandle} />
        <LogoName />
        <Text style={styles.h2}>Inicia Sesión para continuar</Text>

        <View style={styles.formContainer}>
          <Input
            placeholder="Email"
            onChangeText={text => setEmail(text)}
            value={email}
          />
          <InputPassword
            placeholder="Contraseña"
            onChangeText={text => setPassword(text)}
            value={password}
            editable={true}
          />
          <View style={styles.checkboxContainer}>
            <View style={styles.rowContainer}>
              <View style={styles.izquierda}>
                <CheckBox
                  value={isChecked}
                  onValueChange={setChecked}
                  tintColors={{true: colors.primary, false: undefined}}
                />
                <Text style={styles.checkboxLabel}>Recuérdame</Text>
              </View>
              <View style={styles.derecha}>
                <Text
                  style={styles.forgotPassword}
                  onPress={() => navigation.navigate('ForgetPassword')}>
                  Olvidaste tu contraseña?
                </Text>
              </View>
            </View>
          </View>
          <Button
            title="Continuar"
            onPress={() => onHandleLogin(email, password)}
          />
        </View>

        <View style={styles.texto}>
          <Text style={styles.h3}>
            No tienes cuenta?{' '}
            <Text
              style={styles.span}
              onPress={() => navigation.navigate('Register')}>
              Regístrate
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
    paddingTop: '34%',
  },
  containerWhite: {
    flex: 1,
    borderTopEndRadius: 15,
    borderTopStartRadius: 15,
    backgroundColor: colors.white,
    alignItems: 'center',
    paddingTop: 25,
  },
  dragHandle: {
    width: 35,
    height: 4,
    borderRadius: 2.5,
    backgroundColor: '#CCC',
    marginBottom: 50,
  },
  formContainer: {
    width: '85%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  h2: {
    fontFamily: fonts.semiBoldMt,
    color: '#000',
    fontSize: 15,
    marginTop: 5,
    marginBottom: 25,
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
  //checkbox
  checkboxContainer: {
    marginTop: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  izquierda: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  derecha: {
    width: 200,
    alignItems: 'flex-end',
  },
  checkboxLabel: {
    color: '#000',
    fontSize: 13,
    fontFamily: fonts.semiBoldMt,
  },
  forgotPassword: {
    color: '#000',
    fontSize: 13,
    fontFamily: fonts.semiBoldMt,
  },
  //Linea
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 15,
  },
  dividerLine: {
    width: '39%',
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
export default Login;
